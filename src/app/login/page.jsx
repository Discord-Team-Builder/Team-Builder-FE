"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAuthorised from "@/lib/isAuthorised";
import { ThreeDots } from "react-loader-spinner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://team-builder-be-8trjtbq8su.dcdeploy.cloud';

const Login = () => {
  const router = useRouter();
  const {isLoggedIn, loading} = useAuthorised();
  
  const handleDiscordLogin = () => {
    if (isLoggedIn){
      toast.error("You are already logged in");
      router.push("/dashboard");
      return;
    }
    
    window.location.href = `${API_BASE}/api/v1/auth/discord`;
    // For demonstration, we'll just show a toast
    toast.success("Redirecting to Discord for authentication...");
  }

  if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#5865F2"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border border-gray-300/10 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in to TeamBuilder</CardTitle>
            <CardDescription className="text-center text-sm text-gray-500">
              Connect with Discord to manage cohort teams
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="mb-8 mt-2 w-full max-w-xs">
              <img 
                src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" 
                alt="Discord Logo" 
                className="mx-auto h-16 mb-4"
              />
              <p className="text-sm text-gray-500 text-center mb-6">
                TeamBuilder uses Discord for authentication. No additional account needed.
              </p>
              <Button 
               
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] cursor-pointer text-white justify-center py-6 text-base"
                onClick={handleDiscordLogin}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Continue with Discord
              </Button>
            </div>
            
            <div className="text-xs text-gray-500 text-center w-full mt-4">
              By continuing, you agree to TeamBuilder's{" "}
              <a href="#" className="text-[#5865F2] hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-[#5865F2] hover:underline">Privacy Policy</a>.
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center">
          <Button 
            variant="link" 
            className="text-gray-600 hover:text-[#5865F2] cursor-pointer"
            onClick={() => router.push("/")}
          >
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
