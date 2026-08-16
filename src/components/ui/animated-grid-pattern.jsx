import React, { useId, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const AnimatedGridPattern = ({
  width = 48,
  height = 48,
  strokeDasharray = 0,
  numSquares = 40,
  className,
  maxOpacity = 0.18,
  duration = 4,
  ...props
}) => {
  const id = useId();
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const updateGrid = () => {
      const cols = Math.ceil(window.innerWidth / width) + 2;
      const rows = Math.ceil(window.innerHeight / height) + 2;

      const generated = Array.from({ length: numSquares }, (_, i) => ({
        id: i,
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 3,
        repeatDelay: 1.5 + Math.random() * 2,
      }));
      setSquares(generated);
    };

    updateGrid();
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [width, height, numSquares]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full stroke-white/[0.06] fill-none"
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>

        {/* ═══ SILKY AMBIENT DRIFTING GRID BASE ═══ */}
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill={`url(#${id})`}
        />

        {/* ═══ RESPONSIVE GLOWING AMBIENT CELLS ═══ */}
        <svg className="overflow-visible">
          {squares.map(({ id: sqId, x: sqX, y: sqY, delay, duration: sqDuration, repeatDelay: sqRepeatDelay }) => (
            <motion.rect
              key={`${sqX}-${sqY}-${sqId}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, maxOpacity, 0],
                scale: [0.98, 1, 0.98],
              }}
              transition={{
                duration: sqDuration || duration,
                repeat: Infinity,
                delay: delay,
                repeatDelay: sqRepeatDelay || 2,
                ease: "easeInOut",
              }}
              width={width - 1}
              height={height - 1}
              x={sqX * width + 1}
              y={sqY * height + 1}
              fill="rgba(59, 130, 246, 0.35)"
              strokeWidth="0"
            />
          ))}
        </svg>
      </svg>
    </div>
  );
};
