import React from "react";
import { Link } from "react-router-dom";
export const SidebarHeaderComp = () => {
  return (
    <Link to='/'>
      <div className="flex mt-4 relative justify-center mb-2">
        <img src="/logo.svg" className="size-7" alt="" />
        {/* <p className="font-oswald text-xl">Shoply</p> */}
      </div>
      </Link>
  );
};
