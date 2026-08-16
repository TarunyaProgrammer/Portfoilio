import React from "react";
import { cn } from "@/lib/utils";

export const ShimmerButton = React.forwardRef(
  (
    {
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border border-white/20 bg-zinc-900/90 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-blue-400/50 hover:bg-zinc-800 hover:shadow-blue-500/10 hover:scale-[1.03] active:scale-[0.97]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
