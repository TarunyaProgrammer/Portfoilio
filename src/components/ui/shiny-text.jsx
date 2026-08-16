import React from "react";
import { cn } from "@/lib/utils";

export const ShinyText = ({
  children,
  className,
  shimmerWidth = 100,
}) => {
  return (
    <span
      style={{
        "--shiny-width": `${shimmerWidth}px`,
      }}
      className={cn(
        "inline-block bg-gradient-to-r from-neutral-200 via-white to-neutral-400 bg-clip-text text-transparent animate-shine bg-[length:200%_100%]",
        className
      )}
    >
      {children}
    </span>
  );
};
