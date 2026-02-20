import {
  BadgeDollarSign,
  BadgeInfo,
  BadgeQuestionMark,
  Box,
  ChartLine,
  CircleFadingArrowUp,
  InboxIcon,
  MessagesSquare,
  SquareKanban,
} from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
export const AccountBar = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(userContext);

  function navigateToAdminDashboard() {
    navigate("/dashboard/admin");
  }
  return (
    <div className="text-[#3d3d3d] space-y-4">
      {/* main men */}
      <div className="space-y-4">
        <p>My Shoply Account</p>
        <div className="ml-3.5 space-y-2 text-black font-oswald">
          {/* <Link to="/dashboard/admin"> */}
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <Box size={16} strokeWidth={1.25} />
            <p>Orders</p>
          </section>
          {/* </Link> */}
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <InboxIcon size={16} strokeWidth={1.25} />
            <p>Inbox</p>
          </section>

          {userRole === "USER" && (
            <Link to="/user/accountupgrade">
              <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
                <CircleFadingArrowUp size={16} strokeWidth={1.25} />
                <p>Upgrade Account </p>
              </section>
            </Link>
          )}

          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <BadgeDollarSign size={16} strokeWidth={1.25} />
            <p>Sales</p>
          </section>
        </div>
      </div>
      {/* General */}
      <div className="space-y-4">
        <p>Need Assitance?</p>
        <div className="ml-3.5 space-y-2 text-black font-oswald">
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <SquareKanban size={16} strokeWidth={1.25} />
            <p>Help & support</p>
          </section>
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <MessagesSquare size={16} strokeWidth={1.25} />
            <p>Feedback</p>
          </section>
        </div>
      </div>

      {userRole === "ADMIN" ||
        (userRole === "EDITOR" && (
          <div className="space-y-4">
            <p>Products Management</p>
            <div className="ml-3.5 space-y-2 text-black font-oswald">
              <section
                onClick={() => navigateToAdminDashboard()}
                className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center"
              >
                <ChartLine size={16} strokeWidth={1.25} />
                <p>Product Dashboard</p>
              </section>
            </div>
          </div>
        ))}
    </div>
  );
};
