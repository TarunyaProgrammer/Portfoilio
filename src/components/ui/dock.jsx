import React, { createContext, useContext, useRef, useState, useCallback, useImperativeHandle, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 62;
const DEFAULT_DISTANCE = 130;
const TOUCH_ICON_SIZE = 32;   // 9 items × 32 = 288px — fits 320px at gap-0
const DESKTOP_ICON_SIZE = 38; // comfortable on larger screens

const DockContext = createContext({
  mouseX: null,
  magnification: DEFAULT_MAGNIFICATION,
  distance: DEFAULT_DISTANCE,
  isPointerFine: true,
});

// Detect pointer capability once
function usePointerFine() {
  const [isPointerFine, setIsPointerFine] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : true
  );
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e) => setIsPointerFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isPointerFine;
}

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
    const isPointerFine = usePointerFine();
    const mouseX = useMotionValue(Infinity);

    const handleMouseMove = useCallback((e) => {
      if (isPointerFine) mouseX.set(e.clientX);
    }, [mouseX, isPointerFine]);

    const handleMouseLeave = useCallback(() => {
      mouseX.set(Infinity);
    }, [mouseX]);

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance, isPointerFine }}>
        <motion.div
          ref={ref}
          onMouseMove={isPointerFine ? handleMouseMove : undefined}
          onMouseLeave={isPointerFine ? handleMouseLeave : undefined}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          {...props}
          className={cn(
            "flex rounded-2xl bg-zinc-950/70 border border-white/[0.14]",
            "backdrop-blur-2xl",
            "shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)]",
            isPointerFine
              // Desktop: bottom-aligned so magnification grows upward
              ? "h-[58px] items-end gap-1 px-3 pb-2 pt-1.5"
              // Touch: center-aligned — no magnification, all icons same height
              : "h-[54px] items-center gap-0 px-2 py-0",
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
    const [tapLabel, setTapLabel] = useState(false);
    const { mouseX, magnification, distance, isPointerFine } = useContext(DockContext);
    const fallbackMouseX = useMotionValue(Infinity);
    const activeMouseX = mouseX || fallbackMouseX;

    // Icon size: smaller on touch to fit 9 items on 320px
    const iconSize = isPointerFine ? DESKTOP_ICON_SIZE : TOUCH_ICON_SIZE;

    // Smooth distance calculation from mouse to icon center
    const distanceCalc = useTransform(activeMouseX, (val) => {
      if (!isPointerFine || val === Infinity || !internalRef.current) return distance;
      const rect = internalRef.current.getBoundingClientRect();
      return val - (rect.left + rect.width / 2);
    });

    // Width magnification curve — only active on pointer:fine
    const widthSync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      isPointerFine ? [iconSize, magnification, iconSize] : [iconSize, iconSize, iconSize]
    );

    const ySync = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      isPointerFine ? [0, -6, 0] : [0, 0, 0]
    );

    const width = useSpring(widthSync, { mass: 0.08, stiffness: 260, damping: 17 });
    const y = useSpring(ySync, { mass: 0.08, stiffness: 260, damping: 17 });

    const handleClick = () => {
      if (!isPointerFine && label) {
        setTapLabel((p) => !p);
      }
      onClick?.();
    };

    return (
      <motion.div
        ref={internalRef}
        style={{
          width: isPointerFine ? width : iconSize,
          height: isPointerFine ? width : iconSize,
          y: isPointerFine ? y : 0,
          willChange: "transform, width, height",
          minWidth: iconSize,
          minHeight: iconSize,
          flexShrink: 0,
        }}
        onClick={handleClick}
        onMouseEnter={isPointerFine ? () => setIsHovered(true) : undefined}
        onMouseLeave={isPointerFine ? () => setIsHovered(false) : undefined}
        whileTap={{ scale: 0.86 }}
        className={cn(
          "relative flex aspect-square cursor-pointer items-center justify-center rounded-xl",
          "hover:bg-white/[0.08] transition-colors select-none shrink-0",
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className="w-full h-full flex items-center justify-center p-2 pointer-events-none">
          {children}
        </div>

        {/* Hover tooltip — pointer:fine only */}
        <AnimatePresence>
          {isPointerFine && isHovered && label && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }}
              animate={{ opacity: 1, y: -44, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.92 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-white/20 text-[11px] font-mono font-medium text-white shadow-2xl backdrop-blur-xl pointer-events-none whitespace-nowrap z-50"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap label — touch only */}
        <AnimatePresence>
          {!isPointerFine && tapLabel && label && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.92 }}
              animate={{ opacity: 1, y: -44, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.92 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/95 border border-white/20 text-[10px] font-mono font-medium text-white shadow-2xl backdrop-blur-xl pointer-events-none whitespace-nowrap z-50"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active indicator pill */}
        {isActive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-0.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
        )}
      </motion.div>
    );
  }
);

DockIcon.displayName = "DockIcon";
