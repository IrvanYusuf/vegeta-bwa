import * as React from "react";

import { cn } from "@/lib/utils";
import { IconEye, IconMagnifier } from "../icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
  error?: string;
  onPressSuffix?: () => void;
}

const _renderIcon = (iconType: string) => {
  if (iconType === "Magnifier")
    return <IconMagnifier className="w-5 h-5" stroke="ring" />;
  if (iconType === "Eye") return <IconEye className="w-5 h-5" fill="ring" />;
};

const _renderPrefixSuffix = (item: string) => {
  if (item.includes("text-")) return <>{item.split("-")[1]}</>;
  return _renderIcon(item);
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, error, onPressSuffix, prefix, suffix, ...props },
    ref
  ) => {
    return (
      <>
        <div className="relative flex justify-center items-center">
          <input
            type={type}
            className={cn(
              "flex px-3 py-2 h-10 w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
              { "pl-10": !!prefix },
              { "pr-10": !!suffix }
            )}
            ref={ref}
            {...props}
          />

          {prefix && (
            <div className="absolute top-1/2 py-[10px] px-3 text-sm">
              {_renderPrefixSuffix(prefix)}
            </div>
          )}

          {suffix && (
            <div
              className={cn("absolute px-3 right-0 text-sm", {
                "cursor-pointer": !!onPressSuffix,
              })}
              onClick={() => onPressSuffix?.()}
            >
              {_renderPrefixSuffix(suffix)}
            </div>
          )}
        </div>
        <small className="text-red-500 mt-1">{error}</small>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
