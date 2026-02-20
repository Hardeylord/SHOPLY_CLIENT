import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { Account_sidebar } from "../Components/Account_sidebar";
export const AccountLayout = () => {

  return (
    <>
      <div className="flex px-2 space-x-2 w-full min-h-screen">
        <SidebarProvider >
          <Account_sidebar  />
          <main className="flex-1 relative py-16 bg-[#FAFAFA] border  p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </>
  );
};
