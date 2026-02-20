import React, { useContext } from "react";
import {
  BadgeInfo,
  BadgeQuestionMark,
  Box,
  ChartLine,
  CircleFadingArrowUp,
  InboxIcon,
  MessagesSquare,
  Sparkles,
  SquareKanban,
  SquareMenu,
} from "lucide-react";
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
import { Link } from "react-router-dom";
import { userContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { SidebarHeaderComp } from "./dashboardComponent/SidebarHeaderComp";
import AcctFooter from "../Pages/Accounts/AcctFooter";
export const Account_sidebar = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(userContext);

  function navigateToAdminDashboard() {
    navigate("/dashboard/admin");
  }
  const btnColor =
    "cursor-pointer hover:bg-green-300 transition-all duration-300";

  const mainMenu = [
    {
      link: "/user/orders",
      icon: Box,
      text: "Orders",
      toolTip: "Orders",
    },
    {
      link: "#",
      icon: InboxIcon,
      text: "Inbox",
      toolTip: "Inbox",
    },
  ];

  const act = [
    {
      link: "/user/accountupgrade",
      icon: CircleFadingArrowUp,
      text: "Upgrade Account",
      toolTip: "Upgrade Account",
    },
  ];

  const general = [
    {
      link: "/user/accountupgrade",
      icon: BadgeInfo,
      text: "Help & support",
      toolTip: "Help & support",
    },
    {
      link: "/user/accountupgrade",
      icon: MessagesSquare,
      text: "Feedback",
      toolTip: "Feedback",
    },
  ];

  const Management = [
    {
      link: "/dashboard/admin",
      icon: ChartLine,
      text: "Product Dashboard",
      toolTip: "Product Dashboard",
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
                  <SidebarMenuButton
                    className={`${btnColor}`}
                    tooltip={project.toolTip}
                    asChild
                  >
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
            Need Assitance?
          </SidebarGroupLabel>
          <SidebarGroupAction>
            <BadgeQuestionMark />
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {general.map((project) => (
                <SidebarMenuItem key={project.text}>
                  <SidebarMenuButton
                    className={`${btnColor}`}
                    tooltip={project.toolTip}
                    asChild
                  >
                    <Link to={project.link}>
                      <project.icon size={16} strokeWidth={1.25} />
                      <span>{project.text}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "USER" && (
          <SidebarGroup>
            <SidebarGroupLabel className="font-oswald">
              Upgrade Account
            </SidebarGroupLabel>
            <SidebarGroupAction>
              <Sparkles /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {act.map((project) => (
                  <SidebarMenuItem key={project.text}>
                    <SidebarMenuButton
                      className={`${btnColor}`}
                      tooltip={project.toolTip}
                      asChild
                    >
                      <Link to={project.link}>
                        <project.icon size={16} strokeWidth={1.25} />
                        <span>{project.text}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "ADMIN" ||
          (userRole === "EDITOR" && (
            <SidebarGroup>
              <SidebarGroupLabel className="font-oswald">
                Products Management
              </SidebarGroupLabel>
              <SidebarGroupAction>
                <SquareKanban />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Management.map((project) => (
                    <SidebarMenuItem key={project.text}>
                      <SidebarMenuButton
                        className={`${btnColor}`}
                        tooltip={project.toolTip}
                        asChild
                      >
                        <Link to={project.link}>
                          <project.icon size={16} strokeWidth={1.25} />
                          <span>{project.text}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
      </SidebarContent>

      <SidebarFooter>
        <AcctFooter />
      </SidebarFooter>
    </Sidebar>
  );
};
