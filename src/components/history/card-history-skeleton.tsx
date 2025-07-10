import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { FC } from "react";

export const CardProductHistorySkeleton = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center justify-between mb-3">
      <div className="flex w-[100%] items-center gap-4">
        {/* Gambar */}
        <div className="w-[80px] h-[80px] flex items-center justify-center">
          <Skeleton className="h-[80px] w-[80px] rounded-xl" />
        </div>

        {/* Teks (category + name) */}
        <div className="flex flex-col w-[100%] items-start gap-2">
          <div className="text-sm w-[100%] text-muted-foreground uppercase">
            <Skeleton className="h-[14px] w-[30%] rounded-xl" />
          </div>
          <div className="text-base w-[100%] font-semibold">
            <Skeleton className="h-[14px] w-[70%] rounded-xl" />
          </div>
        </div>
      </div>

      <div className="flex w-[100%] items-center gap-x-4 lg:gap-x-10 mt-3">
        <div className="flex items-center w-[40%] gap-x-2">
          <Skeleton className="h-[14px] w-[100%] rounded-xl" />
        </div>
        <div className="w-[100%]">
          <Skeleton className="h-[14px] w-[60%] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

interface ICardCustomerInformationSkeletonProps {
  length: number;
  className?: string;
}

export const CardCustomerInformationSkeleton: FC<
  ICardCustomerInformationSkeletonProps
> = ({ length, className }) => {
  return (
    <div className="mt-3 w-[100%]">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={cn(
            className,
            `flex w-[100%] items-center gap-x-2 ${
              index === 0 ? "mt-0" : "mt-3"
            } `
          )}
        >
          <Skeleton className="h-[28px] w-[28px] " />
          <Skeleton className="h-[28px] w-[50%] " />
        </div>
      ))}
    </div>
  );
};
