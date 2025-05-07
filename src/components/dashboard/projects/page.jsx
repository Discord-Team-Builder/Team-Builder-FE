"use client"
import CreateProjectModal from '@/components/models/createProject';
import Table from '@/components/shared/Table'
import globalState from '@/globalstate/page';
import React, {useState} from 'react'
import { useSnapshot } from 'valtio';

const headers = ["s.no", "projects", "Server Id", "max team", "total team", "createdBy"];


const Projects = () => {
    const snap = useSnapshot(globalState)
    const projects = snap.projects
    const [open, setOpen] = useState(false);
    const handleCreateProject = () => setOpen((prev) => !prev)
  
  return (
    <div>
    <Table headers={headers} data={projects} createproject={handleCreateProject}  />
    <CreateProjectModal open={open} onClose={handleCreateProject} />
    </div>
  )
}

export default Projects