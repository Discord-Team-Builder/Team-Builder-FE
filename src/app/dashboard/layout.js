"use client";

import React, { useState, useEffect } from "react";
import DashNavbar from "@/components/dashboard/dashNavbar";
import SidebarNavigation from "@/components/dashboard/sidebarNavigation";
import { getGuilds, getME, getAllProject } from "@/api/APICall";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import globalState from "@/globalstate/page";
import useAuthorised from "@/lib/isAuthorised";


export default function DashboardLayout({ children }) {
  const { isLoggedIn, loading } = useAuthorised();
  const router = useRouter();

    

  useEffect(() => {
    // Redirect to login if not logged in and not loading
    if (!loading && isLoggedIn === false) {
      router.replace("/login");
    }
  }, [isLoggedIn, loading, router]);

  useEffect(() => {
  const fetchData = async () => {
      try {
        if (!globalState.user || !globalState.user._id) {
          const response = await getME();
          globalState.user = {
            ...globalState.user,
            _id: response?._id || null,
            username: response?.username || '',
            globalName: response?.globalName || '',
            avatar: response?.avatar || '',
            email: response?.email || '',
            discordId: response?.discordId || '',
            projects: Array.isArray(response?.projects) ? response.projects : [],
            bio: response?.bio || "",
            skills: Array.isArray(response?.skills) ? response.skills : [],
            github: response?.github ||  "",
            hashnode: response?.hashnode ||  "",
            peerlist: response?.peerlist || "",
          };
        }
        if (!globalState.guilds || globalState.guilds.length === 0) {
          const guilds = await getGuilds();
          globalState.guilds = guilds || [];
        }
        // You can do similar check for projects if needed
        await getAllProject();
       
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401) {
          router.replace('/login');
        } else {
          console.error("Error fetching user data:", error);
        
        }
      } 
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [router, isLoggedIn]);

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
  // If not loading, render the main layout
  return (   
    <>
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 via-primary-medium/5 to-primary-dark/10">
      {/* Colorful background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-green-400/20 to-teal-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-red-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
      {/* Main Content (right) */}
      <div className="h-[100dvh] flex flex-col overflow-hidden">
        <DashNavbar />
        <div className="flex flex-1 overflow-hidden">
        <SidebarNavigation />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4  dark:bg-[#1e1e2f]">
          {children}
        </main>
      </div>
      </div>
      </div>
    </div>
    </>
  );
}
