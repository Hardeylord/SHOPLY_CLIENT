import { Outlet } from "react-router-dom";
import { AppSidebar } from "../Components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
function DashboardLayout() {
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
