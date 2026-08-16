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
  glowFrom = "rgba(255, 255, 255, 0.08)",
  glowTo = "rgba(255, 255, 255, 0.01)",
  borderGlow = "rgba(255, 255, 255, 0.18)",
  size = 400,
  ...props
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-size);
  const mouseY = useMotionValue(-size);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle, soft radial gradient for surface sheen that blends seamlessly with dark theme
  const surfaceGradient = useMotionTemplate`radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${glowFrom}, ${glowTo} 60%, transparent 100%)`;
  // Sleek border highlight that softly tracks the cursor along the rim
  const borderGradient = useMotionTemplate`radial-gradient(${size * 0.7}px circle at ${smoothX}px ${smoothY}px, ${borderGlow}, transparent 75%)`;

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
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 transition-all duration-300 hover:border-white/20 shadow-xl",
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
