import React, { createContext, useContext, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 60;
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
      direction = "bottom",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          {...props}
          className={cn(
            "flex h-14 items-center gap-2 rounded-2xl bg-zinc-900/80 px-3 py-2 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 transition-all",
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

export const DockIcon = ({
  size,
  className,
  children,
  onClick,
  ...props
}) => {
  const ref = useRef(null);
  const { mouseX, magnification, distance } = useContext(DockContext);
  const fallbackMouseX = useMotionValue(Infinity);
  const activeMouseX = mouseX || fallbackMouseX;

  const distanceCalc = useTransform(activeMouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onClick={onClick}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-xl transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";
