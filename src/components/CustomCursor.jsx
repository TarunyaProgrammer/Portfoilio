import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on mobile/touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] mix-blend-difference items-center justify-center hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Central Point */}
      <div className="w-1 h-1 bg-white rounded-full" />
      
      {/* Outer Crosshair Circle */}
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : 1,
          rotate: isHovered ? 90 : 0,
          opacity: isHovered ? 1 : 0.5,
        }}
        className="absolute inset-0 border border-white rounded-full flex items-center justify-center"
      >
        {/* Surgical Crosshair lines */}
        <div className="absolute top-0 w-[1px] h-2 bg-white" />
        <div className="absolute bottom-0 w-[1px] h-2 bg-white" />
        <div className="absolute left-0 h-[1px] w-2 bg-white" />
        <div className="absolute right-0 h-[1px] w-2 bg-white" />
      </motion.div>

      {/* Trailing Hexagon for "System" feel */}
      <motion.div
        animate={{
          scale: isHovered ? 2 : 0,
          opacity: isHovered ? 0.2 : 0,
        }}
        className="absolute inset-0 border border-white [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)]"
      />
    </motion.div>
  );
};

export default CustomCursor;
