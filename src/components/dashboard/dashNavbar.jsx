"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Users, ChevronDown, Search,CircleUserRound } from "lucide-react";
import { Input } from "../ui/input";
import { useSnapshot } from 'valtio';
import globalState from "@/globalstate/page";
import Image from "next/image";

const DashNavbar= () => {
  const snap = useSnapshot(globalState)
  const navigate = useRouter();
  const avatarUrl = `https://cdn.discordapp.com/avatars/${snap?.user?.discordId || ''}/${snap?.user?.avatar || ''}.webp?size=80` ;

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
        <div className="flex items-center space-x-3">
             
            <Button 
              className="bg-discord hover:bg-discord-dark cursor-pointer text-white"
              onClick={() => navigate.push("#")}
            >
              <Image src={avatarUrl} alt="Avatar" className="h-5 w-5 rounded-full mr-2" width={32}
  height={32} />
              {snap?.user?.username || ''}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          
        </div>
      </div>
    </header>
  );
};

export default DashNavbar;