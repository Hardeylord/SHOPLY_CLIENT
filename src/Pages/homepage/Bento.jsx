import { MoveRight } from "lucide-react";
import React from "react";

const Bento = ({themes}) => {
  return (
    <div className={`${themes === "light" ? "" : "dark2"} text-[rgb(var(--textColor))] md:mt-20 font-oswald px-8 md:px-10 space-y-3`}>
      <p className="text-3xl">ELEVATE YOUR ELEGANT FASHION</p>
      <p className="font-light">
        Daily Classics Let You Make Them Yours Every Day. Redefining
        contemporary fashion through minimal elegant silhouettes
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4">
        <div className="col-span-2 bg-[url(/ps.jpg)] h-[70vh] bg-cover bg-center rounded-3xl"></div>
        <div className={`${themes === "light" ? "" : "bg-[rgb(174,157,108)]"} bg-[#101923] col-span-2 md:col-span-1 text-white rounded-3xl p-4 flex flex-col justify-end space-y-2.5`}>
          <p className="text-4xl">BUILT BY THE STREETS, MADE FOR YOU</p>
          <p className="font-light">Wear the movement, break the mold</p>

          <section className=" md:w-[50%] bg-white rounded-full  pl-8 flex justify-between items-center p-1">
            <p className="text-[#101923] text-[17px]">Read Our Story</p>
            <button className="rounded-full bg-[#101923] p-2 cursor-pointer">
            <MoveRight strokeWidth={1.5} />
            </button>
          </section>
        </div>
{/* bottom grid */}
        <div className="col-span-2 md:col-span-1  bg-muted rounded-3xl p-4 flex flex-col justify-end space-y-2.5">
        <p className="text-4xl text-[#101923]">BUILT BY THE STREETS, MADE FOR YOU</p>
          <p className="font-light text-[#101923]">Wear the movement, break the mold</p>

          <section className="md:w-[50%] bg-[#101923] rounded-full  pl-8 flex justify-between items-center p-1">
            <p className="text-white text-[17px]">Read Our Story</p>
            <button className="rounded-full bg-white p-2 cursor-pointer">
            <MoveRight strokeWidth={1.5} />
            </button>
          </section>
        </div>
        <div className="col-span-2 bg-[url(/grid2.jpg)] bg-cover bg-center rounded-3xl h-[70vh]">
          </div>
      </div>
    </div>
  );
};

export default Bento;
