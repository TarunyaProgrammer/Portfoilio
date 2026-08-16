import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children,
}) => {
  return (
    <div
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-zinc-900/50 border border-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80 shadow-lg",
        className
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-2 transition-all duration-300 group-hover:-translate-y-1">
        {Icon && <Icon className="h-8 w-8 origin-left text-zinc-300 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-blue-400 mb-2" />}
        <h3 className="text-xl font-semibold text-zinc-100">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-zinc-400 leading-relaxed font-normal">{description}</p>
      </div>

      {children}

      {cta && (
        <div className="pointer-events-none z-10 flex transform-gpu flex-row items-center pt-4 transition-all duration-300">
          <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
            {cta} &rarr;
          </span>
        </div>
      )}
    </div>
  );
};
