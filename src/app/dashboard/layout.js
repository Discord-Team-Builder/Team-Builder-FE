"use client";

import DashNavbar from "@/components/dashboard/dashNavbar";
import SidebarNavigation from "@/components/dashboard/sidebarNavigation";


export default function DashboardLayout({ children }) {
  return (
   
      
<>
      {/* Main Content (right) */}
      <div className="h-[100dvh] flex flex-col overflow-hidden">
        <DashNavbar />
        <div className="flex flex-1 overflow-hidden">
        <SidebarNavigation />
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 bg-gray-100 dark:bg-[#1e1e2f]">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
