"use client"
import CreateProjectModal from '@/components/models/createProject';
import Table from '@/components/shared/Table'
import globalState from '@/globalstate/page';
import React, {useState} from 'react'
import { useSnapshot } from 'valtio';

const headers = ["s.no", "projects", "Server Id", "max team", "total team", "createdBy"];


const Projects = () => {
    const {projects} = useSnapshot(globalState)
    const [open, setOpen] = useState(false);
    const handleCreateProject = () => setOpen((prev) => !prev)
    console.log("projects data:", projects?.projects || []); 
    console.log("projects length:", projects?.projects?.length || 0);
  
  return (
    <div>
    <Table key={projects.projects.length}  headers={headers} data={projects} createproject={handleCreateProject}  />
    <CreateProjectModal open={open} onClose={handleCreateProject} />
    </div>
  )
}

export default Projects