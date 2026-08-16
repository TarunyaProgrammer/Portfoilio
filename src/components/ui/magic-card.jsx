import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const MagicCard = ({
  children,
  className,
  mode = "orb",
  glowFrom = "rgba(255, 255, 255, 0.3)",
  glowTo = "rgba(161, 161, 170, 0.1)",
  size = 350,
  ...props
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Use motion template to dynamically interpolate the coordinates at 120fps
  const orbGradient = useMotionTemplate`radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${glowFrom}, ${glowTo} 45%, transparent 80%)`;
  const borderGradient = useMotionTemplate`radial-gradient(${size * 0.8}px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.4), transparent 75%)`;

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
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 transition-all duration-300 hover:border-white/25 shadow-xl",
        className
      )}
      {...props}
    >
      {/* ═══ MAGIC UI ORB GLOW (MOTION TEMPLATE INTERPOLATED) ═══ */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: orbGradient }}
      />

      {/* ═══ HIGH-DEFINITION BORDER LIGHT MOUSE TRACKER ═══ */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: borderGradient, maskImage: "linear-gradient(black, black)" }}
      />

      {/* ═══ SOFT AMBIENT AMBIENCE ORB BEHIND CONTENT ═══ */}
      <motion.div
        className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-60 blur-xl z-0"
        style={{ background: orbGradient }}
      />

      {/* Card Content Stage */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
