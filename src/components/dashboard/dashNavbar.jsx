"use client";
import React, {useRef, useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Users, ChevronDown, Search,CircleUserRound } from "lucide-react";
import { Input } from "../ui/input";
import { useSnapshot } from 'valtio';
import globalState from "@/globalstate/page";
import Image from "next/image";
import  Avatar from '@/components/baseComponents/Avatar'
import { getInitials } from '@/lib/getInitials'
import { logout } from "@/api/APICall";

const DashNavbar= () => {
  const snap = useSnapshot(globalState)
  console.log("snap", snap.user);
  const router = useRouter();
  const avatarUrl = `https://cdn.discordapp.com/avatars/${snap?.user?.discordId || ''}/${snap?.user?.avatar || ''}.webp?size=80` ;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout().then(() => router.push("/login"));
  };

  return (
    <header className="border-b bg-white sticky top-0 z-10 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-[#5865F2]" />
          <span className="font-bold text-xl">TeamBuilder</span>
        </div>

        <div className="relative hidden md:flex max-w-96 w-full">
          <Input
            name="search"
            type="text"
            placeholder="Search..."
            className="pr-10" 
          />
          <Search className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <div className="relative inline-block text-left" ref={containerRef}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-discord hover:bg-discord-dark text-white flex items-center gap-2 px-4 py-2 rounded-lg"
          >
            {snap?.user?.avatar && snap?.user?.discordId ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                className="h-5 w-5 rounded-full"
                width={24}
                height={24}
              />
            ) : (
              <Avatar text={getInitials(snap?.user?.globalName || 'TB')} size="sm" />
            )}
            <span>{snap?.user?.username || ''}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
              <p className="text-gray-800 font-medium mb-2">
                {snap?.user?.globalName || 'Unknown'}
              </p>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:text-red-600 font-semibold cursor-pointer flex items-center gap-2 px-2 py-1 rounded-lg transition duration-200 ease-in-out"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashNavbar;