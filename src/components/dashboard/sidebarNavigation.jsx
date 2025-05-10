"use client"

import { useMemo,useState } from "react"
import { cn } from "@/lib/utils"
import { useRouter, useParams, usePathname  } from "next/navigation";
import { Button } from "@/components/ui/button"
import { useSnapshot } from 'valtio';
import globalState from '@/globalstate/page';
import { Home, FolderOpen, Users, Settings, Sidebar, Lock, LogOut } from "lucide-react"
import { logout } from "@/api/APICall";
import Image from "next/image";

const SidebarNavigation = () => {
  const { projectId, user } = useSnapshot(globalState);
  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); 
  const activeTab = pathname;
  const currentProjectId = params.projectid?.toString() || projectId[0]?.toString();

  const navItems = useMemo(() => [
    { id: "/dashboard", icon: Home, label: "Dashboard", path: "/dashboard" },
    { id: "/dashboard/projects", icon: FolderOpen, label: "Projects", path: "/dashboard/projects" },
    { id: `/dashboard/${currentProjectId}/teams`, icon: Users, label: "Teams", path: `/dashboard/${currentProjectId}/teams` },
    { id: "/dashboard/accounts", icon: Lock, label: "Accounts", path: "/dashboard/accounts" },
    { id: "/dashboard/settings", icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ], [currentProjectId]);

  const avatarUrl = useMemo(() => (
    `https://cdn.discordapp.com/avatars/${user?.discordId || ''}/${user?.avatar || ''}.webp?size=80`
  ), [user?.discordId, user?.avatar]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => router.push(path);

  const handleLogout = () => {
    logout().then(() => router.push("/login"));
  };

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
              pathname === item.path && // 👈 activeTab ki jagah pathname use karo
                "bg-white text-slate-800 hover:bg-white/90 hover:text-slate-800",
              pathname !== item.path && "text-white hover:bg-slate-700"
            )}
            onClick={() => handleNavigation(item.path)}
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
            <Image src={avatarUrl} alt="Avatar" className="h-5 w-5 rounded-full mr-2" width={32}
  height={32} />
            <span className="text-sm">{user?.username || ''}</span>
          </div>}
          <LogOut onClick={handleLogout} className="h-5 w-5 cursor-pointer" />
        </div>
      </div>
      </div>
      </>
  )
}

export default SidebarNavigation
