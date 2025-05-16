"use client"
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle,  CardContent } from '@/components/ui/card'
import { Crown, EditIcon, Trash2, User, Users } from 'lucide-react'
import React, {useState} from 'react'
import Image from 'next/image'
import  Avatar from '@/components/baseComponents/Avatar'
import { getInitials } from '@/lib/getInitials'


const Teams = ({project}) => {
  console.log('project2:', project)
  const teams = project?.teams || []
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

  console.log('teams2:', teams)

  return (
    <div className='py-4'>
      <div className='flex gap-2 items-center'>
        <Users className='bg-discord-light/20 text-discord p-1 rounded-sm' /> 
        <strong className='text-2xl'>Web Development bootcamp</strong><span className='text-gray-500'>(5/7 teams)</span>
      </div>
      <div className='flex flex-wrap justify-center gap-4 py-4'>
       
      {teams.map((team) => (  
          <Card key={team._id} className='md:w-[500px] w-full'>
            <CardHeader>
              <CardTitle className='flex gap-2 items-center'>
                <Users className='bg-discord-light/20 text-discord p-1 rounded-sm' />
                 {editTeamId === team._id ? (
                  <input
                    autoFocus
                    value={editedName}
                    onChange={handleNameChange}
                    onKeyDown={(e) => handleKeyDown(e, team._id)}
                    onBlur={() => handleRename(team._id)}
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
                  <li key={member._id} className='flex items-start justify-between mb-2'>
                    <div className='flex gap-2 items-start'>
                     {member?.user?.avatar && member?.user?.discordId ? (
                        <Image
                          src={`https://cdn.discordapp.com/avatars/${member?.user?.discordId}/${member?.user?.avatar}.webp?size=80`}
                          alt='Avatar'
                          className='h-8 w-8 rounded-full'
                          width={32}
                          height={32}
                        />
                      ) : (
                        <Avatar text={getInitials(member?.user?.globalName || 'TB')} size='sm' />
                      )}
                      <div className='flex flex-col'>
                        <p className='flex items-center gap-1'>
                          {member?.user?.globalName || ''}
                          {member?.role === 'leader' && <Crown className='text-amber-500' />}
                        </p>
                        <p className='text-sm text-gray-400'>@{member?.user?.username || ''}</p>
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <Button disabled={member?.role === 'leader'} type='button' varient='outline' className='cursor-pointer font-bold text-discord'>
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