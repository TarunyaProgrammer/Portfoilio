import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Reusable pointer capability check
const isPointerFine = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export const MagicCard = ({
  children,
  className,
  glowFrom = "rgba(255, 255, 255, 0.08)",
  glowTo = "rgba(255, 255, 255, 0.01)",
  borderGlow = "rgba(255, 255, 255, 0.18)",
  size = 400,
  ...props
}) => {
  const cardRef = useRef(null);

  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const surfaceGradient = useMotionTemplate`radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${glowFrom}, ${glowTo} 60%, transparent 100%)`;
  const borderGradient = useMotionTemplate`radial-gradient(${size * 0.7}px circle at ${smoothX}px ${smoothY}px, ${borderGlow}, transparent 75%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isPointerFine()) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-size);
    mouseY.set(-size);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-white/20 shadow-xl",
        className
      )}
      {...props}
    >
      {/* ═══ SUBTLE BORDER MOUSE ILLUMINATION ═══ */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: borderGradient }}
      />

      {/* ═══ SOFT BLENDED SURFACE SHEEN (NON-DISTRACTING) ═══ */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{ background: surfaceGradient }}
      />

      {/* Card Content Stage (High Contrast & 100% Readable) */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
