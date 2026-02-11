import React, { useContext } from "react";
import { userContext } from "../../Authentication/AuthContext";
import { LogOut } from "lucide-react";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
} from "@/Components/ui/sidebar";
export const SideBarFooter = () => {
  const { LogOutUser2 } = useContext(userContext);

  return (
    // <div className="space-y-2">
    //   <div className="ml-3.5 space-y-2 text-black font-oswald">
    //     <section
    //       onClick={() => LogOutUser2()}
    //       className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center"
    //     >
    //       <LogOut size={16} strokeWidth={1.25} />
    //       <p>Log Out</p>
    //     </section>
    //   </div>
    // </div>

    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => LogOutUser2()}
          tooltip="logout"
          asChild
          className="cursor-pointer hover:bg-green-300 transition-all duration-300"
        >
          <div>
            <LogOut size={16} strokeWidth={1.25} />
            <span>Log Out</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
