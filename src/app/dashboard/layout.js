"use client";

import React, { useState, useEffect } from "react";
import DashNavbar from "@/components/dashboard/dashNavbar";
import SidebarNavigation from "@/components/dashboard/sidebarNavigation";
import { getGuilds, getME, getAllProject } from "@/api/APICall";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import globalState from "@/globalstate/page";
import { useSnapshot } from "valtio";


export default function DashboardLayout({ children }) {
  const snap = useSnapshot(globalState);

  // const isLoggedIn = snap.isLoggedIn;
  const [loading, setLoading] = useState(true);
    const router = useRouter();

    

    useEffect(() => {

      // if (!isLoggedIn) {
      //   router.replace("/login");
      //   return;
      // }
      getME()
        .then((response) => {
          globalState.user = {...globalState.user, 
            _id: response?._id || null,
            username: response?.username || '',
            globalName: response?.globalName || '',
            avatar: response?.avatar || '',
            email: response?.email || '',
            discordId: response?.discordId || '',
            projects: Array.isArray(response?.projects) ? response.projects : []
          }
          setLoading(false);
          
        })
        .catch((error) => {
          const status = error?.response?.status;
         
          if (status === 401) {
            setLoading(false);
            router.replace('/login'); // silently redirect to login
          } else {
            console.error("Error fetching user data:", error);
            setLoading(false); 
          }
        });
      getGuilds()
        .then((response) => {
          globalState.guilds = response || [];
        })
        .catch((error) => {
          console.error("Error fetching guilds data:", error);
        });
      getAllProject()
    }, []);

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
