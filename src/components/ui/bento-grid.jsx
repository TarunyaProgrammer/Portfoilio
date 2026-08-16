import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto",
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
        "bg-zinc-900/70 border border-white/10 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-zinc-900 shadow-xl",
        className
      )}
    >
      {/* ═══ TOP VISUAL CONTAINER (SEPARATED TO PREVENT TEXT OVERLAP) ═══ */}
      <div className="relative w-full h-40 sm:h-44 mb-6 overflow-hidden rounded-xl bg-zinc-950/60 border border-white/5 flex items-center justify-center p-3">
        {background}
      </div>

      {/* ═══ BOTTOM TEXT CONTENT (100% CRISP & READABLE) ═══ */}
      <div className="flex flex-col justify-between flex-1 space-y-4 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="p-2 rounded-lg bg-zinc-800 border border-white/10 text-zinc-300 group-hover:text-white group-hover:border-white/20 transition-all">
                <Icon className="h-4 w-4" />
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {children}

        {cta && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-xs">
            <a
              href={href || "#projects"}
              className="text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <span>{cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
