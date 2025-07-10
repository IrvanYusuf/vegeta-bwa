import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCheckoutSkeleton = () => {
  return (
    <div className="flex lg:items-center items-start gap-6">
      <Skeleton className="w-6 h-6 rounded" />
      <Skeleton className="w-[80px] h-[80px]" />
      <div className="flex flex-1 gap-2 lg:flex-row flex-col">
        <div className="flex-1 space-y-2">
          <Skeleton className="lg:w-[100%] w-[80px] h-4" />
          <Skeleton className="lg:w-1/4 w-[80px] h-4" />
        </div>
        <Skeleton className="w-[100px] h-10" />
        <Skeleton className="lg:w-[60px] w-[100%] h-10" />
      </div>
    </div>
  );
};

export default ProductCheckoutSkeleton;
