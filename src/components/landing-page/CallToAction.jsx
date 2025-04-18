"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const CallToAction = () => {
  const navigate = useRouter();

  return (
    <section className="py-16 bg-[#4752C4]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build better teams?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get started today and simplify your cohort team management.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-[#5865F2] cursor-pointer hover:bg-gray-100 text-lg"
            onClick={() => navigate.push("/login")}
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign in with Discord
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;