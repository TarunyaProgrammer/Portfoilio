import React, { createContext, useContext, useRef, useState, useCallback, useImperativeHandle } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 64;
const DEFAULT_DISTANCE = 140;

const DockContext = createContext({
  mouseX: null,
  magnification: DEFAULT_MAGNIFICATION,
  distance: DEFAULT_DISTANCE,
});

export const Dock = React.forwardRef(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const handleMouseMove = useCallback((e) => {
      mouseX.set(e.clientX);
    }, [mouseX]);

    const handleMouseLeave = useCallback(() => {
      mouseX.set(Infinity);
    }, [mouseX]);

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          {...props}
          className={cn(
            "flex h-[58px] items-end gap-1.5 sm:gap-2 rounded-2xl bg-zinc-950/70 px-3 pb-2 pt-1.5",
            "backdrop-blur-2xl border border-white/[0.14]",
            "shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)]",
            className
          )}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export const DockIcon = React.forwardRef(
  (
    {
      className,
      children,
      onClick,
      label,
      isActive = false,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef(null);
    useImperativeHandle(forwardedRef, () => internalRef.current);

    const [isHovered, setIsHovered] = useState(false);
    const { mouseX, magnification, distance } = useContext(DockContext);
    const fallbackMouseX = useMotionValue(Infinity);
    const activeMouseX = mouseX || fallbackMouseX;

    // Smooth distance calculation from mouse to icon center
    const distanceCalc = useTransform(activeMouseX, (val) => {
      if (val === Infinity || !internalRef.current) return distance;
      const rect = internalRef.current.getBoundingClientRect();
      return val - (rect.left + rect.width / 2);
    });

    // Width magnification curve
    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [38, magnification, 38]
    );

    // Subtle macOS vertical lift elevation on focus
    const ySync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [0, -6, 0]
    );

    // Ultra-fluid macOS spring physics
    const width = useSpring(widthSync, {
      mass: 0.08,
      stiffness: 260,
      damping: 17,
    });

    const y = useSpring(ySync, {
      mass: 0.08,
      stiffness: 260,
      damping: 17,
    });

    return (
      <motion.div
        ref={internalRef}
        style={{
          width,
          height: width,
          y,
          willChange: "transform, width, height",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.86 }}
        className={cn(
          "relative flex aspect-square cursor-pointer items-center justify-center rounded-xl",
          "hover:bg-white/[0.08] transition-colors select-none shrink-0",
          className
        )}
        {...props}
      >
        {/* Icon (Borderless & Crisp) */}
        <div className="w-full h-full flex items-center justify-center p-2 pointer-events-none">
          {children}
        </div>

        {/* ═══ MACOS FLOATING TOOLTIP ═══ */}
        <AnimatePresence>
          {isHovered && label && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }}
              animate={{ opacity: 1, y: -44, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.92 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-white/20 text-[11px] font-mono font-medium text-white shadow-2xl backdrop-blur-xl pointer-events-none whitespace-nowrap z-50 flex items-center gap-1"
            >
              <span>{label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ MACOS ACTIVE INDICATOR PILL ═══ */}
        {isActive && (
          <span
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-0.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]"
          />
        )}
      </motion.div>
    );
  }
);

DockIcon.displayName = "DockIcon";
