import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Highlighter = ({
  children,
  action = "highlight", // "highlight" | "underline"
  color,
  className,
}) => {
  if (action === "underline") {
    const strokeColor = color || "#60a5fa";
    return (
      <span className={cn("relative inline-block whitespace-nowrap", className)}>
        <span className="text-white font-medium">{children}</span>
        <svg
          className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
          height="8"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 4 Q 50 8 100 4"
            fill="none"
            stroke={strokeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>
      </span>
    );
  }

  // Vivid, radiant highlight with glowing backdrop and subtle border
  return (
    <span
      className={cn(
        "relative inline-flex items-center px-2 py-0.5 rounded-md font-semibold text-white",
        "bg-blue-600/30 border border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.35)]",
        className
      )}
    >
      <motion.span
        className="absolute inset-0 rounded-md bg-blue-500/20 pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <span className="relative z-10 text-white font-semibold tracking-tight">{children}</span>
    </span>
  );
};
