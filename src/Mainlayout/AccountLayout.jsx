import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AccountBar } from "./AccountBar";
import { LogOut } from "lucide-react";
import { userContext } from "../Authentication/AuthContext";
export const AccountLayout = () => {
  const { LogOutUser2 } = useContext(userContext);

  return (
    <>
      <div className="flex flex-row p-2  space-x-2 w-full min-h-[screen]">
        <div className="w-64 flex flex-col justify-between sticky h-[90vh] top-2 self-start bg-[#e7e7e7] rounded-[10px] text-white p-4">
          <AccountBar />
          <button
            onClick={() => LogOutUser2()}
            className="flex text-black cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center"
          >
            <LogOut size={16} strokeWidth={1.25} />
            <p>Log Out</p>
          </button>
        </div>
        <div className="w-full p-4 relative bg-[#e7e7e7] rounded-[10px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
