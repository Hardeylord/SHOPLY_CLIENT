import {
  BadgeDollarSign,
  BanknoteArrowDown,
  BellDot,
  ChartArea,
  ChevronLeft,
  CreditCard,
  LogOut,
  MessagesSquare,
  PackageSearch,
  SquareKanban,
  SquaresExclude,
  Undo2,
} from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from '../Authentication/AuthContext'

export const DashsideBar = () => {
  const {LogOutUser2}=useContext(userContext)
  

  return (
    <div className="text-[#3d3d3d]">
      <Link to='/'>
      <div className="flex relative justify-center mb-2">
        <img src="/logo.svg" className="size-7" alt="" />
        <p className="font-oswald text-xl">Shoply</p>
        <section className="p-0.5 absolute -right-7 z-20 bg-[#efefef] rounded-full cursor-pointer">
        <ChevronLeft/>
        </section>
      </div>
      </Link>
      {/* main men */}
      <div className="space-y-1">
        <p>Main Menu</p>
        <div className="ml-3.5 space-y-2 text-black font-oswald">
        <Link to="/dashboard/admin">
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <SquareKanban size={16} strokeWidth={1.25} />
            <p>Overview</p>
          </section>
          </Link>
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <ChartArea size={16} strokeWidth={1.25} />
            <p>Analytics</p>
          </section>

          <Link to="/dashboard/addproduct">
            <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
              <PackageSearch size={16} strokeWidth={1.25} />
              <p>Product </p>
            </section>
          </Link>

          <Link to="/dashboard/sales">
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <BadgeDollarSign size={16} strokeWidth={1.25} />
            <p>Sales</p>
          </section>
          </Link>
        </div>
      </div>
      {/* Transaction */}
      <div className="space-y-3">
        <p>Transaction</p>
        <div className="ml-3.5 space-y-2 text-black font-oswald">
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <CreditCard size={16} strokeWidth={1.25} />
            <p>Payment</p>
          </section>
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <BanknoteArrowDown size={16} strokeWidth={1.25} />
            <p>Refunds</p>
          </section>
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <SquaresExclude size={16} strokeWidth={1.25} />
            <p>Invoice</p>
          </section>
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <Undo2 size={16} strokeWidth={1.25} />
            <p>Returns</p>
          </section>
        </div>
      </div>
      {/* General */}
      <div className="space-y-3">
        <p>Settings</p>
        <div className="ml-3.5 space-y-2 text-black font-oswald">
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <BellDot size={16} strokeWidth={1.25} />
            <p>Notification</p>
          </section>
          <section className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <MessagesSquare size={16} strokeWidth={1.25} />
            <p>Feedback</p>
          </section >
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full h-0.5 border border-dashed border-[#989898]"></div>
        <div className="ml-3.5 space-y-2 text-black font-oswald">
          <section onClick={()=>LogOutUser2()} className="flex cursor-pointer hover:bg-green-300 transition-all duration-300 p-1.5 rounded-[5px] space-x-2 items-center">
            <LogOut size={16} strokeWidth={1.25} />
            <p>Log Out</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashsideBar;
