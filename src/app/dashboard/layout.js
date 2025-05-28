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
            projects: Array.isArray(response?.projects) ? response.projects : []
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
    </>
  );
}
