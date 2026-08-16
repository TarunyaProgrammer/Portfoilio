import React, { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedGridPattern = ({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 30,
  className,
  maxOpacity = 0.15,
  duration = 3,
  repeatDelay = 1,
  ...props
}) => {
  const id = useId();
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    // Generate random square positions across a 30x30 virtual grid
    const generated = Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 30) - 5,
      y: Math.floor(Math.random() * 30) - 5,
      delay: Math.random() * 3,
    }));
    setSquares(generated);
  }, [numSquares]);

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-white/5 stroke-white/[0.07]",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ id: sqId, x: sqX, y: sqY, delay }) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, maxOpacity, 0] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              repeatDelay: repeatDelay,
              ease: "easeInOut",
            }}
            key={`${sqX}-${sqY}-${sqId}`}
            width={width - 1}
            height={height - 1}
            x={sqX * width + 1}
            y={sqY * height + 1}
            fill="rgba(59, 130, 246, 0.4)"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
};
