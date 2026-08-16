import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const MagicCard = ({
  children,
  className,
  mode = "orb",
  glowFrom = "rgba(255, 255, 255, 0.15)",
  glowTo = "rgba(255, 255, 255, 0.02)",
  size = 350,
  ...props
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(-size);
    mouseY.set(-size);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 transition-colors duration-300 hover:border-white/20",
        className
      )}
      {...props}
    >
      {/* ═══ MOUSE-FOLLOWING MONOTONE ORB GLOW ═══ */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-0"
        style={{
          background: `radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${glowFrom}, ${glowTo} 80%, transparent 100%)`,
        }}
      />

      {/* Ambient Inner Dark Backdrop for Contrast */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
