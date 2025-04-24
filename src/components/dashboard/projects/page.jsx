"use client"
import CreateProjectModal from '@/components/models/createProject';
import Table from '@/components/shared/Table'
import React, {useState} from 'react'

const headers = ["s.no", "projects", "Server Id", "max team", "total team", "Created  at"];

const data = [
  {
    "s.no": 1,
    "projects": "AI Chat App",
    "Server Id": "srv-8271",
    "max team": 6,
    "total team": 4,
    "Created  at": "2025-04-01",
    
  },
  {
    "s.no": 2,
    "projects": "Crypto Tracker",
    "Server Id": "srv-1938",
    "max team": 5,
    "total team": 3,
    "Created  at": "2025-03-28",
    
  },
  {
    "s.no": 3,
    "projects": "Food Delivery",
    "Server Id": "srv-5532",
    "max team": 7,
    "total team": 6,
    "Created  at": "2025-03-30",
    
  },
  {
    "s.no": 4,
    "projects": "Edu Platform",
    "Server Id": "srv-2374",
    "max team": 6,
    "total team": 6,
    "Created  at": "2025-04-02",
    
  },
  {
    "s.no": 5,
    "projects": "Portfolio Builder",
    "Server Id": "srv-2847",
    "max team": 4,
    "total team": 2,
    "Created  at": "2025-03-25",
    
  },
  {
    "s.no": 6,
    "projects": "News Aggregator",
    "Server Id": "srv-6712",
    "max team": 5,
    "total team": 5,
    "Created  at": "2025-04-01",
    
  },
  {
    "s.no": 7,
    "projects": "Voice Assistant",
    "Server Id": "srv-1823",
    "max team": 6,
    "total team": 4,
    "Created  at": "2025-04-03",
    
  },
  {
    "s.no": 8,
    "projects": "Fitness Tracker",
    "Server Id": "srv-5544",
    "max team": 3,
    "total team": 2,
    "Created  at": "2025-04-04",
    
  },
  {
    "s.no": 9,
    "projects": "Stock Insights",
    "Server Id": "srv-6718",
    "max team": 5,
    "total team": 4,
    "Created  at": "2025-03-27",
    
  },
  {
    "s.no": 10,
    "projects": "Chat with PDF",
    "Server Id": "srv-8374",
    "max team": 4,
    "total team": 3,
    "Created  at": "2025-04-01",
    
  },
  {
    "s.no": 11,
    "projects": "Task Scheduler",
    "Server Id": "srv-2291",
    "max team": 6,
    "total team": 6,
    "Created  at": "2025-04-02",
    
  },
  {
    "s.no": 12,
    "projects": "Job Board",
    "Server Id": "srv-9984",
    "max team": 5,
    "total team": 4,
    "Created  at": "2025-03-26",
    
  },
  {
    "s.no": 13,
    "projects": "Resume Parser",
    "Server Id": "srv-4482",
    "max team": 4,
    "total team": 2,
    "Created  at": "2025-03-29",
    
  },
  {
    "s.no": 14,
    "projects": "Game Lobby",
    "Server Id": "srv-3221",
    "max team": 7,
    "total team": 6,
    "Created  at": "2025-04-03",
    
  },
  {
    "s.no": 15,
    "projects": "E-Commerce Store",
    "Server Id": "srv-8327",
    "max team": 6,
    "total team": 5,
    "Created  at": "2025-03-30",
    
  },
  {
    "s.no": 16,
    "projects": "Language Tutor",
    "Server Id": "srv-7191",
    "max team": 5,
    "total team": 4,
    "Created  at": "2025-03-31",
    
  },
  {
    "s.no": 17,
    "projects": "Virtual Museum",
    "Server Id": "srv-1593",
    "max team": 4,
    "total team": 3,
    "Created  at": "2025-03-25",
    
  },
  {
    "s.no": 18,
    "projects": "Voice Notes",
    "Server Id": "srv-7724",
    "max team": 5,
    "total team": 5,
    "Created  at": "2025-04-01",
    
  },
  {
    "s.no": 19,
    "projects": "Budget App",
    "Server Id": "srv-4912",
    "max team": 4,
    "total team": 2,
    "Created  at": "2025-03-28",
    
  },
  {
    "s.no": 20,
    "projects": "Study Tracker",
    "Server Id": "srv-9312",
    "max team": 6,
    "total team": 5,
    "Created  at": "2025-04-02",
    
  },
];

const Projects = () => {
    const [open, setOpen] = useState(false);
    const handleCreateProject = () => setOpen((prev) => !prev)
  
  return (
    <div>
    <Table headers={headers} data={data} createproject={handleCreateProject}  />
    <CreateProjectModal open={open} onClose={handleCreateProject} />
    </div>
  )
}

export default Projects