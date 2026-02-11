import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  SidebarHeader,
} from "@/Components/ui/sidebar";
import { SidebarHeaderComp } from "./dashboardComponent/SidebarHeaderComp";
import {
  BadgeDollarSign,
  BanknoteArrowDown,
  BellDot,
  Blend,
  ChartArea,
  CreditCard,
  MessagesSquare,
  PackageSearch,
  Settings2,
  SquareKanban,
  SquareMenu,
  SquaresExclude,
  Undo2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SideBarFooter } from "./dashboardComponent/SideBarFooter";
export function AppSidebar() {

  const btnColor="cursor-pointer hover:bg-green-300 transition-all duration-300"

  const mainMenu = [
    {
      link: "/dashboard/admin",
      icon: SquareKanban,
      text: "Overview",
      toolTip: "Overview",
    },
    {
      link: "/dashboard/admin",
      icon: ChartArea,
      text: "Analytics",
      toolTip: "Analytics",
    },
    {
      link: "/dashboard/addproduct",
      icon: PackageSearch,
      text: "Products",
      toolTip: "Products",
    },
    {
      link: "/dashboard/sales",
      icon: BadgeDollarSign,
      text: "Sales",
      toolTip: "Sales",
    },
  ];

  const Transaction = [
    {
      link: "/dashboard/admin",
      icon: CreditCard,
      text: "Payment",
      toolTip: "Payment",
    },
    {
      link: "/dashboard/admin",
      icon: BanknoteArrowDown,
      text: "Refunds",
      toolTip: "Refunds",
    },
    {
      link: "/dashboard/addproduct",
      icon: SquaresExclude,
      text: "Invoice",
      toolTip: "Invoice",
    },
    {
      link: "/dashboard/sales",
      icon: Undo2,
      text: "Returns",
      toolTip: "Returns",
    },
  ];

  const General = [
    {
      link: "/dashboard/admin",
      icon: BellDot,
      text: "Notification",
      toolTip: "Notification",
    },
    {
      link: "/dashboard/admin",
      icon: MessagesSquare,
      text: "Feedback",
      toolTip: "Feedback",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeaderComp />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-oswald">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupAction>
            <SquareMenu /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenu.map((project) => (
                <SidebarMenuItem key={project.text}>
                  <SidebarMenuButton className={`${btnColor}`} tooltip={project.toolTip} asChild>
                    <Link to={project.link}>
                      <project.icon size={16} strokeWidth={1.25} />
                      <span>{project.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/* cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] */}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-oswald">
            Transactions
          </SidebarGroupLabel>
          <SidebarGroupAction>
            <Blend />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {Transaction.map((project) => (
                <SidebarMenuItem key={project.text}>
                  <SidebarMenuButton className={`${btnColor}`} tooltip={project.toolTip} asChild>
                    <Link to={project.link}>
                      <project.icon size={16} strokeWidth={1.25} />
                      <span>{project.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/* cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] */}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="font-oswald">
          General
          </SidebarGroupLabel>
          <SidebarGroupAction>
            <Settings2 />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {General.map((project) => (
                <SidebarMenuItem key={project.text}>
                  <SidebarMenuButton className={`${btnColor}`} tooltip={project.toolTip} asChild>
                    <Link to={project.link}>
                      <project.icon size={16} strokeWidth={1.25} />
                      <span>{project.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/* cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] */}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
