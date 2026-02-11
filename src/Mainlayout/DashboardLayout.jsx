import { Outlet } from "react-router-dom";
import DashsideBar from "./DashsideBar";
import { useState } from "react";
import { MiniSidebar } from "./MiniSidebar";
import { AppSidebar } from "../Components/app-sidebar";
import { Sidebar } from "@/Components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
function DashboardLayout() {
  const [sideWidth, setSideWidth] = useState(20);
  return (
    <>
      <div className="flex px-2 space-x-2 w-full min-h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 relative bg-[#FAFAFA] border  p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
}

export default DashboardLayout;
