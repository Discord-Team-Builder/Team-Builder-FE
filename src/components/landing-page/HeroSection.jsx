"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const HeroSection = () => {
  const navigate = useRouter();

  return (
    <section className="relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 bg-[#4752C4] opacity-60 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')] bg-cover bg-center opacity-10 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Building teams made simple for cohort students
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Automatically assign students to balanced teams and manage them through Discord with just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white cursor-pointer text-lg"
              onClick={() => navigate.push("/login")}
            >
              <LogIn className="h-5 w-5" />
              Sign in with Discord
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;