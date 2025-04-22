"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname  } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  FolderOpen,
  Users,
  Settings,
  Sidebar,
    Lock,
    LogOut,
    Headphones,
} from "lucide-react"

const SidebarNavigation = () =>  {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(pathname)
  const router = useRouter()
  

  console.log("path:", pathname)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { id: "/dashboard", icon: Home, label: "Dashboard", path: "/dashboard" },
    { id: "/dashboard/projects", icon: FolderOpen, label: "Projects", path: "/dashboard/projects" },
    { id: "/dashboard/teams", icon: Users, label: "Teams", path: "/dashboard/teams" },
    { id: "/dashboard/accounts", icon: Lock, label: "Accounts", path: "/dashboard/accounts" },
    { id: "/dashboard/settings", icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ]

  const handleNavigation = (id, path) => {
    setActiveTab(id)
    router.push(path)
    
  }

  const handleLogout = ()=>{
    router.push("/")
  }

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "sticky top-0 left-0 h-100dvh  bg-discord text-white transition-all duration-300 ease-in-out flex flex-col rounded-tr-[20px] rounded-br-[20px]",
          isOpen ? "w-64" : "w-16",
        )}
      >
        {/* Logo area */}
        <div className="p-4 flex items-center justify-between ">
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-slate-700 rounded-full ml-auto"
          >
            <Sidebar className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3 py-6 transition-all",
              isOpen ? "text-left" : "justify-center",
              activeTab === item.id &&
                "bg-white text-slate-800 hover:bg-white/90 hover:text-slate-800",
              activeTab !== item.id && "text-white hover:bg-slate-700"
            )}
            onClick={() => handleNavigation(item.id, item.path)}
            title={!isOpen ? item.label : ""}
          >
            <item.icon className={cn("h-5 w-5", !isOpen && "mx-auto")} />
            {isOpen && <span>{item.label}</span>}
          </Button>
          ))}
        </nav>
        <div className="p-4 border-t border-indigo-500/30">
        <div className="flex items-center justify-between">
          {isOpen && <div className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            <span className="text-sm">UserName#123</span>
          </div>}
          <LogOut onClick={handleLogout} className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
      </div>
      </>
  )
}

export default SidebarNavigation
