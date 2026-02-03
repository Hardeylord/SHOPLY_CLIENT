import { Outlet } from "react-router-dom";
import DashsideBar from "./DashsideBar";

function DashboardLayout() {
  return (
    <>
      <div className="flex flex-row p-2  space-x-2 w-full min-h-screen">
        <div className="w-64 sticky h-fit top-2 self-start bg-[#e7e7e7] rounded-[10px] text-white p-4">
          <DashsideBar />
        </div>
        <div className="w-full p-4 relative bg-[#e7e7e7] rounded-[10px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
