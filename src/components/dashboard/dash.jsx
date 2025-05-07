import React, {useState} from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
import { Users, FolderOpen, Server, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { getRoleStyles } from "./state";
import CreateProjectCard from "./createProjectCard";
import DialogDeleteConfirm from "../models/deleteConfirm";
import { toast } from 'sonner';
import showToast from '../shared/showToast';
import { useSnapshot } from 'valtio';
import globalState from '@/globalstate/page';
  
 const Dash  = () => {
  const snap = useSnapshot(globalState)
  const projects = snap.projects?.projects || []; 
  const servers = snap.guilds || []; 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // State for delete loading

  const data = [
    {
      title: "Users",
      icon: Users,
      number: projects?.teams?.member || 1,
    },
    {
      title: "Projects",
      icon: FolderOpen,
      number: projects?.length || 0,
    },
    {
      title: "Servers",
      icon: Server,
      number: servers?.length || 0,
    },
  ];

  const openDeleteModal = (project) => {
    setItemToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDelete = async (project) => {
    if (project) {
      setIsDeleting(true);
      console.log("Deleting:", project);
     
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsDeleting(false);
      closeDeleteModal();
      showToast('success', `${project.name} deleted successfully`)
    }
  };

    return (
      <>
      <div className="flex flex-col md:flex-row gap-4">
        {data.map((item, index) => (
          <Card key={index} className="w-full md:w-1/3">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-blue-100 text-discord rounded-full">
                <item.icon className="w-6 h-6" />
              </div>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent >
              <p className="text-3xl font-bold">{item.number}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between py-10 ">
        <h3 className="text-bold text-2xl">Your Projects</h3>
        <Button className="text-bold text-2xl cursor-pointer bg-gray-100 hover:bg-gray-200">View All</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <Card key={index} className="p-4 space-y-2">
          <CardHeader className="flex flex-row  items-start  p-0">
            <div className="bg-violet-100 p-1.5 rounded-md">
              <FolderOpen className="w-4 h-4 text-violet-600" />
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-sm font-semibold leading-tight">
                {project.name}
              </CardTitle>
              <div className=" text-sm text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4 opacity-40" />
            <span className="opacity-40">{project.teams.length } teams</span>
          </div>
            </div>
            <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${getRoleStyles(project.role || 'admin')}`}>
              {project.roles || 'admin'}
            </span>
          </CardHeader>

          

          <div className="flex gap-2 pt-2 justify-end">
            <Button
              variant="outline"
              className="text-blue-600 cursor-pointer border-blue-100 hover:bg-blue-50 px-3 h-7 text-sm"
            >
              View
            </Button>
            <Button
              variant="outline"
              className="text-red-600 cursor-pointer border-red-100 hover:bg-red-50 px-3 h-7 text-sm"
              onClick={() => openDeleteModal(project)} 
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </Card>
      ))}
      <CreateProjectCard/>
    </div>
    <DialogDeleteConfirm
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        project={itemToDelete}
        isDeleting={isDeleting}
      />
      </>
    );
  }

  export default Dash
  