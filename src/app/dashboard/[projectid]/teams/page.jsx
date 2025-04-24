"use client"
import {useEffect, useState} from 'react'
import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { useSnapshot } from 'valtio';
import globalState from '@/globalstate/page';
import { useParams, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function TeamsPage() {

    const router = useRouter();

  const pathname = useParams()
  const projectid = pathname.projectid
  const snap = useSnapshot(globalState)
  const projects = snap.projects
  const [selectedProjectId, setSelectedProjectId] =  useState(projects[0]?.id || "");

  const project = snap.projects.find((p) => p.id === projectid)
  const teams = project?.teams || []

  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const handleProjectChange = (value) => {
    router.push(`/dashboard/${value}/teams`); // dynamic route update
    setSelectedProjectId(value);
  };

  return (
    <div >
      <div>
        <Button type='button' variant='outline' className="cursor-pointer" > <MoveLeft/> Back</Button>
      </div>
      <div className='flex justify-between py-2'>
      <div className='flex md:flex-row flex-col gap-2 '>

      <Select value={selectedProjectId} onValueChange={handleProjectChange}>
      <SelectTrigger className="md:w-[200px] w-full">
        <SelectValue placeholder="Select a Projects" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>

      <Select>
        <SelectTrigger className="md:w-[200px] w-full">
            <SelectValue placeholder="Select a teams" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Teams</SelectLabel>
            {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                    {team.name}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
        </Select>


        
      </div>
      <Button type='button' className="cursor-pointer bg-discord hover:bg-discord-dark text-white" > Create new team + </Button>
      </div>
    </div>
  );
}
