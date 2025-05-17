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
import Teams from '@/components/dashboard/teams/page';
import CreateTeamModal from '@/components/models/createTeam';
import { getProjectsData } from '@/lib/getProjectsData';

export default function TeamsPage() {

    const router = useRouter();

  const pathname = useParams()
  const projectid = pathname.projectid?.toString() || "";
  console.log("projectid:", projectid)
  console.log("pathname:", pathname)
  const snap = useSnapshot(globalState)
  const projects = getProjectsData(snap.projects);
  const [selectedProjectId, setSelectedProjectId] =  useState("");
  console.log(" snap.projects:",  projects)
  console.log("projects:", projects[0]?._id)
  console.log("selectedProjectId:", selectedProjectId)
  const project = snap.projects.find((p) => p._id === projectid)
  const teams = project?.teams || []
  console.log("teams:", teams)

  useEffect(() => {
  
  if (!selectedProjectId && projects.length > 0) {
    setSelectedProjectId(projectid || projects[0]._id);
  }
}, [projects, projectid]);

  const handleProjectChange = (value) => {
    console.log("onValueChange value:", value, typeof value);
    router.push(`/dashboard/${value}/teams`); // dynamic route update
    setSelectedProjectId(value);
  };

  const [open, setOpen] = useState(false);
  const handleCreateTeam = () => setOpen((prev) => !prev)

  return (
    <div >
      <div>
        <Button type='button' variant='outline' onClick={() => router.back()} className="cursor-pointer" > <MoveLeft/> Back</Button>
      </div>
      <div className='flex justify-between py-2'>
      <div className='flex md:flex-row flex-col gap-2 '>

      <Select
        value={selectedProjectId}
        onValueChange={handleProjectChange}
        disabled={!selectedProjectId}
      >
      <SelectTrigger className="md:w-[200px] w-full">
        <SelectValue placeholder="Select a Projects" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black">
        <SelectGroup>
          <SelectLabel>Projects</SelectLabel>
          {projects.map((p) => (
                <SelectItem key={p._id} value={p._id}>
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
        <SelectContent className="bg-white text-black">
            <SelectGroup>
            <SelectLabel>Teams</SelectLabel>
            {teams.map((team) => (
                    <SelectItem key={team._id} value={team._id}>
                    {team.name}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
        </Select>


        
      </div>
      <Button onClick={handleCreateTeam} type='button' className="cursor-pointer bg-discord hover:bg-discord-dark text-white" > Create new team + </Button>
      </div>
      <Teams  project={project}/>
      <CreateTeamModal open={open} onClose={handleCreateTeam}/>
    </div>
  );
}
