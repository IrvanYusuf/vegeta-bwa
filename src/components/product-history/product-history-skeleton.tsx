import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductHistorySkeleton = () => {
  return (
    <>
      <div className="w-[100%]">
        <div className="mt-6">
          <div className="border w-[100%] rounded-xl p-4 flex flex-col gap-4">
            <div className="w-[100%]">
              <Skeleton className="w-[40%] h-[20px]" />
            </div>
            <div className="flex lg:flex-row flex-col gap-6 w-[100%] justify-between">
              <div className="flex-2 w-[100%] flex flex-col gap-1">
                <Skeleton className="h-4 w-[30%]" />
                <Skeleton className="h-4 w-[50%]" />
              </div>
              <div className="flex w-[100%] lg:flex-row flex-col gap-y-3 lg:gap-y-0 gap-x-3">
                <div className="flex flex-col w-[100%] gap-2 lg:border-r">
                  <div className="flex gap-4 items-baseline">
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[40%]" />
                  </div>
                  <Skeleton className="h-4 w-[50%]" />
                </div>
                <div className="w-[100%] flex flex-col gap-2">
                  <Skeleton className="h-4 w-[40%]" />
                  <Skeleton className="h-4 w-[50%]" />
                </div>
              </div>
            </div>
            <div className="flex w-[100%] lg:justify-end">
              <Skeleton className="h-8 lg:w-[20%] w-[100%]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductHistorySkeleton;
