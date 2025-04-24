"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle,  CardContent } from '@/components/ui/card'
import { Crown, EditIcon, Trash2, User, Users } from 'lucide-react'
import React, {useState} from 'react'

const teamData = [
  {
    id: 1,
    name: 'Team Alpha',
    members: [
      {
        id: 1,
        name: 'USER1',
        discordTag: '@user#3413',
        isLeader: false,
      },
      {
        id: 2,
        name: 'USER2',
        discordTag: '@user#3483',
        isLeader: true,
      },
      {
        id: 3,
        name: 'USER3',
        discordTag: '@user#8964',
        isLeader: false,
      },
      {
        id: 4,
        name: 'USER4',
        discordTag: '@user#8774',
        isLeader: false,
      },
      {
        id: 5,
        name: 'USER5',
        discordTag: '@user#1526',
        isLeader: false,
      },
      // Add more users here as needed
    ],
  },
  {
    id: 2,
    name: 'Team Beta',
    members: [
      {
        id: 1,
        name: 'USER1',
        discordTag: '@user#3413',
        isLeader: false,
      },
      {
        id: 2,
        name: 'USER2',
        discordTag: '@user#3483',
        isLeader: false,
      },
      {
        id: 3,
        name: 'USER3',
        discordTag: '@user#8964',
        isLeader: false,
      },
      {
        id: 4,
        name: 'USER4',
        discordTag: '@user#8774',
        isLeader: true,
      },
      {
        id: 5,
        name: 'USER5',
        discordTag: '@user#1526',
        isLeader: false,
      },
      // Add more users here as needed
    ],
  },
  {
    id: 3,
    name: 'Team Gama',
    members: [
      {
        id: 1,
        name: 'USER1',
        discordTag: '@user#3413',
        isLeader: true,
      },
      {
        id: 2,
        name: 'USER2',
        discordTag: '@user#3483',
        isLeader: false,
      },
      {
        id: 3,
        name: 'USER3',
        discordTag: '@user#8964',
        isLeader: false,
      },
      {
        id: 4,
        name: 'USER4',
        discordTag: '@user#8774',
        isLeader: false,
      },
      {
        id: 5,
        name: 'USER5',
        discordTag: '@user#1526',
        isLeader: false,
      },
      // Add more users here as needed
    ],
  },
  // Add more teams here
]

const Teams = () => {
  const [teams, setTeams] = useState(teamData)
  const [editTeamId, setEditTeamId] = useState(null)
  const [editedName, setEditedName] = useState('')

  const handleEditClick = (teamId, currentName) => {
    setEditTeamId(teamId)
    setEditedName(currentName)
  }

  const handleNameChange = (e) => {
    setEditedName(e.target.value)
  }

  const handleRename = (teamId) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId ? { ...team, name: editedName } : team
      )
    )
    setEditTeamId(null)
    setEditedName('')
  }

  const handleKeyDown = (e, teamId) => {
    if (e.key === 'Enter') {
      handleRename(teamId)
    }
  }

  return (
    <div className='py-4'>
      <div className='flex gap-2 items-center'>
        <Users className='bg-discord-light/20 text-discord p-1 rounded-sm' /> 
        <strong className='text-2xl'>Web Development bootcamp</strong><span className='text-gray-500'>(5/7 teams)</span>
      </div>
      <div className='flex flex-wrap justify-center gap-4 py-4'>
      {teams.map((team) => (
          <Card key={team.id} className='md:w-[500px] w-full'>
            <CardHeader>
              <CardTitle className='flex gap-2 items-center'>
                <Users className='bg-discord-light/20 text-discord p-1 rounded-sm' />
                 {editTeamId === team.id ? (
                  <input
                    autoFocus
                    value={editedName}
                    onChange={handleNameChange}
                    onKeyDown={(e) => handleKeyDown(e, team.id)}
                    onBlur={() => handleRename(team.id)}
                    className='text-2xl font-bold text-gray-700 border-b border-gray-300 bg-transparent outline-none'
                  />
                ) : (
                  <>
                    <strong className='text-2xl text-gray-700'>
                      {team.name}
                    </strong>
                    <EditIcon
                      className='cursor-pointer'
                      onClick={() => handleEditClick(team.id, team.name)}
                    />
                  </>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className='md:px-14 px-4'>
              <ul>
                {team.members.map((member) => (
                  <li key={member.id} className='flex items-start justify-between mb-2'>
                    <div className='flex gap-2 items-start'>
                      <User className='text-discord p-1 rounded-sm' />
                      <div className='flex flex-col'>
                        <p className='flex items-center gap-1'>
                          {member.name}
                          {member.isLeader && <Crown className='text-amber-500' />}
                        </p>
                        <p className='text-sm text-gray-400'>{member.discordTag}</p>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button disabled={member.isLeader} type='button' varient='outline' className='cursor-pointer font-bold text-discord'>
                        Promote
                      </Button>
                      <Button type='button' variant='destructive' className='cursor-pointer  font-bold'>
                      <span className='hidden sm:inline'>Remove</span>
                      <Trash2 className='inline sm:hidden w-4 h-4' />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Teams