"use client";

import DashNavbar from "@/components/dashboard/dashNavbar";
import SidebarNavigation from "@/components/dashboard/sidebarNavigation";


export default function DashboardLayout({ children }) {
  return (
   
      
<>
      {/* Main Content (right) */}
      <div className="flex flex-col flex-1">
        <DashNavbar />
        <div className="flex h-[100dvh]">
        <SidebarNavigation/>
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-[#1e1e2f]">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
