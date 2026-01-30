import { FileSearch, Search } from "lucide-react";
import React from "react";

export const SearchProduct = ({ pSearchInputs }) => {
  return (
    <div className="flex">
      <button className=" flex justify-center px-3 py-2 items-center bg-white cursor-pointer rounded-l-full">
        <Search size={16} strokeWidth={1.25} />
      </button>
      <input
        className="rounded-r-full py-2 outline-0 font-montserrat bg-white text-xs"
        type="text"
        onChange={(e) => pSearchInputs(e.target.value)}
        placeholder="Search products..."
      />
    </div>
  );
};
