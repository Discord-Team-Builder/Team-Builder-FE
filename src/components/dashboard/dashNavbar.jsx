"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LayoutGrid, Users, ChevronDown, Search,CircleUserRound } from "lucide-react";
import { Input } from "../ui/input";

const DashNavbar= () => {
  const navigate = useRouter();

  return (
    <header className="border-b bg-white sticky top-0 z-10 ">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-[#5865F2]" />
          <span className="font-bold text-xl">TeamBuilder</span>
        </div>

        <div className="relative hidden md:flex max-w-96 w-full">
          <Input
            type="text"
            placeholder="Search..."
            className="pr-10" // Padding for icon
          />
          <Search className="absolute right-3 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <div className="flex items-center space-x-3">
             
            <Button 
              className="bg-discord hover:bg-discord-dark cursor-pointer text-white"
              onClick={() => navigate.push("#")}
            >
              <CircleUserRound className="h-4 w-4" />
              user#123
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          
        </div>
      </div>
    </header>
  );
};

export default DashNavbar;