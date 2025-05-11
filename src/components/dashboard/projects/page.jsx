"use client"
import CreateProjectModal from '@/components/models/createProject';
import Table from '@/components/shared/Table'
import globalState from '@/globalstate/page';
import { getProjectsData } from '@/lib/getProjectsData';
import React, {useState} from 'react'
import { useSnapshot } from 'valtio';

const headers = ["s.no", "projects", "Server Id", "max team", "total team", "createdBy"];


const Projects = () => {
    const snap = useSnapshot(globalState)
    const [open, setOpen] = useState(false);
    const handleCreateProject = () => setOpen((prev) => !prev)
    const projectsData = getProjectsData(snap.projects);
  return (
    <div>
    <Table key={projectsData.length}  headers={headers} data={projectsData} createproject={handleCreateProject}  />
    <CreateProjectModal open={open} onClose={handleCreateProject} />
    </div>
  )
}

export default Projects