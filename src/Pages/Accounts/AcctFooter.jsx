import React, { useContext } from 'react'
import { userContext } from "../../Authentication/AuthContext";
import { LogOut } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@/Components/ui/sidebar";
const AcctFooter = () => {
    const { LogOutUser2 } = useContext(userContext);
  
  return (
    <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="logout"
              asChild
              onClick={() => LogOutUser2()}
              className="cursor-pointer hover:bg-green-300 transition-all duration-300"
            >
              <div>
                <LogOut size={16} strokeWidth={1.25} />
                <span>Log Out</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
  )
}

export default AcctFooter