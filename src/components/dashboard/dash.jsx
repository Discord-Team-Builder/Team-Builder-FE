import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
  import { Users, FolderOpen, Settings, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { getRoleStyles } from "./state";
import CreateProjectCard from "./createProjectCard";


// Sample Data
const courseData = [
  {
    title: "Web developemt Bootcamp",
    role: "Admin",
    teams: 7,
  },
  {
    title: "UI/UX Design Course",
    role: "Leader",
    teams: 4,
  },
  {
    title: "Backend Bootcamp",
    role: "Admin",
    teams: 9,
  },
  {
    title: "AI Mastery",
    role: "Mentor",
    teams: 6,
  },
];
  
  const data = [
    {
      title: "Users",
      icon: Users,
      number: 1200,
    },
    {
      title: "Projects",
      icon: FolderOpen,
      number: 87,
    },
    {
      title: "Settings",
      icon: Settings,
      number: 5,
    },
  ];
  
 const Dash  = () => {
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
      {courseData.map((course, index) => (
        <Card key={index} className="p-4 space-y-2">
          <CardHeader className="flex flex-row  items-start  p-0">
            <div className="bg-violet-100 p-1.5 rounded-md">
              <FolderOpen className="w-4 h-4 text-violet-600" />
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-sm font-semibold leading-tight">
                {course.title}
              </CardTitle>
              <div className=" text-sm text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4 opacity-40" />
            <span className="opacity-40">{course.teams} teams</span>
          </div>
            </div>
            <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${getRoleStyles(course.role)}`}>
              {course.role}
            </span>
          </CardHeader>

          

          <div className="flex gap-2 pt-2 justify-end">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-100 hover:bg-blue-50 px-3 h-7 text-sm"
            >
              View
            </Button>
            <Button
              variant="outline"
              className="text-red-600 border-red-100 hover:bg-red-50 px-3 h-7 text-sm"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </Card>
      ))}
      <CreateProjectCard/>
    </div>
      </>
    );
  }

  export default Dash
  