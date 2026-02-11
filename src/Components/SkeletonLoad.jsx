import React from "react";
import { Skeleton } from "@/Components/ui/skeleton";

export const SkeletonLoad = ({cols}) => {

  return (
    <>
      {Array(cols).fill().map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <div>
            <Skeleton className="w-full h-75 rounded-3xl" />
          </div>
          <div className="text-black space-y-1.5">
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-62.5" />
            <div className="flex flex-row justify-between">
              <Skeleton className="h-4 w-50" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
