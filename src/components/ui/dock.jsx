import React, { createContext, useContext, useRef, useState, useCallback, useImperativeHandle } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 66;
const DEFAULT_DISTANCE = 130;

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
            "flex h-[62px] items-end gap-2.5 rounded-2xl bg-zinc-950/80 px-3.5 pb-2.5 pt-2",
            "backdrop-blur-2xl border border-white/[0.16]",
            "shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.22)]",
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

    // Smooth distance from cursor to icon center
    const distanceCalc = useTransform(activeMouseX, (val) => {
      if (val === Infinity || !internalRef.current) return distance;
      const rect = internalRef.current.getBoundingClientRect();
      return val - (rect.left + rect.width / 2);
    });

    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [40, magnification, 40]
    );

    // Silky macOS spring physics
    const width = useSpring(widthSync, {
      mass: 0.08,
      stiffness: 280,
      damping: 18,
    });

    return (
      <motion.div
        ref={internalRef}
        style={{ width, height: width, willChange: "transform, width, height" }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileTap={{ scale: 0.85 }}
        className={cn(
          "relative flex aspect-square cursor-pointer items-center justify-center rounded-2xl",
          "bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.10] hover:border-white/[0.25]",
          "backdrop-blur-md transition-colors shadow-md group select-none shrink-0",
          isActive && "bg-white/[0.16] border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]",
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="w-full h-full flex items-center justify-center p-2.5 pointer-events-none">
          {children}
        </div>

        {/* ═══ MACOS FLOATING TOOLTIP ═══ */}
        <AnimatePresence>
          {isHovered && label && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: -46, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.9 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-zinc-900/95 border border-white/20 text-[11px] font-mono font-medium text-white shadow-2xl backdrop-blur-xl pointer-events-none whitespace-nowrap z-50 flex items-center gap-1"
            >
              <span>{label}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ MACOS ACTIVE INDICATOR PILL ═══ */}
        {isActive && (
          <span
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          />
        )}
      </motion.div>
    );
  }
);

DockIcon.displayName = "DockIcon";
