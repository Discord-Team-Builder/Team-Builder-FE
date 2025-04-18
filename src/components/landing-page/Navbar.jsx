"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LayoutGrid, Users, LogIn } from "lucide-react";

const Navbar= ({ isAuthenticated = false }) => {
  const navigate = useRouter();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-[#5865F2]" />
          <span className="font-bold text-xl">TeamBuilder</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-lg font-medium text-gray-600 hover:text-[#7289DA] transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-lg font-medium text-gray-600 hover:text-[#7289DA] transition-colors">
            How It Works
          </a>
          <a href="#faq" className="text-lg font-medium text-gray-600 hover:text-[#7289DA] transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex items-center gap-2"
                onClick={() => navigate.push("/dashboard")}
              >
                <LayoutGrid className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer "
                onClick={() => navigate.push("/dashboard")}
              >
                My Projects
              </Button>
            </>
          ) : (
            <Button 
              className="bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer text-white"
              onClick={() => navigate.push("/login")}
            >
              <LogIn className="h-4 w-4" />
              Sign in with Discord
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;