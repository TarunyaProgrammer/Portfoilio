import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Highlighter = ({
  children,
  action = "highlight", // "highlight" | "underline"
  color = "rgba(59, 130, 246, 0.25)",
  className,
}) => {
  if (action === "underline") {
    return (
      <span className={cn("relative inline-block whitespace-nowrap", className)}>
        <span>{children}</span>
        <svg
          className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
          height="6"
          viewBox="0 0 100 6"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 3 Q 50 6 100 3"
            fill="none"
            stroke={color}
            strokeWidth="3"
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

  return (
    <span className={cn("relative inline-block px-1.5 py-0.5 rounded-md", className)}>
      <motion.span
        className="absolute inset-0 rounded-md -z-10 pointer-events-none"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <span className="relative z-10 text-white font-medium">{children}</span>
    </span>
  );
};
