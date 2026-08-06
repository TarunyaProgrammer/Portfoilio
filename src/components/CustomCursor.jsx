import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// Pixel-Perfect 8-Bit Arcade Sword SVG
const PixelSwordSVG = ({ isHovered, isClicking }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
  >
    {/* 8-Bit Sword Tip & Blade (Pointing Top-Left) */}
    {/* Tip */}
    <rect x="2" y="2" width="3" height="3" fill="#ffffff" />
    <rect x="2" y="2" width="1" height="1" fill="#00e5ff" />
    
    {/* Blade Core */}
    <rect x="5" y="2" width="3" height="3" fill="#e2e8f0" />
    <rect x="2" y="5" width="3" height="3" fill="#cbd5e1" />
    
    <rect x="5" y="5" width="3" height="3" fill="#ffffff" />
    <rect x="8" y="5" width="3" height="3" fill="#cbd5e1" />
    <rect x="5" y="8" width="3" height="3" fill="#94a3b8" />
    
    <rect x="8" y="8" width="3" height="3" fill="#ffffff" />
    <rect x="11" y="8" width="3" height="3" fill="#cbd5e1" />
    <rect x="8" y="11" width="3" height="3" fill="#94a3b8" />
    
    <rect x="11" y="11" width="3" height="3" fill="#ffffff" />
    <rect x="14" y="11" width="3" height="3" fill="#cbd5e1" />
    <rect x="11" y="14" width="3" height="3" fill="#94a3b8" />
    
    <rect x="14" y="14" width="3" height="3" fill="#ffffff" />
    
    {/* Crossguard (Red / Gold 8-Bit Guard) */}
    <rect x="11" y="17" width="3" height="3" fill={isHovered ? "#00ff66" : "#ff2a2a"} />
    <rect x="14" y="17" width="3" height="3" fill={isHovered ? "#00ff66" : "#ff2a2a"} />
    <rect x="17" y="17" width="3" height="3" fill={isHovered ? "#00ff66" : "#ff2a2a"} />
    <rect x="17" y="14" width="3" height="3" fill={isHovered ? "#00ff66" : "#ff2a2a"} />
    <rect x="17" y="11" width="3" height="3" fill={isHovered ? "#00ff66" : "#ff2a2a"} />
    
    {/* Guard Outlines */}
    <rect x="8" y="20" width="3" height="3" fill="#fbd000" />
    <rect x="20" y="8" width="3" height="3" fill="#fbd000" />
    
    {/* Grip / Hilt Handle */}
    <rect x="17" y="20" width="3" height="3" fill="#78350f" />
    <rect x="20" y="20" width="3" height="3" fill="#451a03" />
    <rect x="20" y="23" width="3" height="3" fill="#78350f" />
    
    {/* Pommel Knob */}
    <rect x="23" y="23" width="3" height="3" fill="#fbd000" />
    <rect x="23" y="26" width="3" height="3" fill="#b45309" />
  </svg>
);

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Fast, tight spring physics (zero lag)
  const springConfig = { damping: 28, stiffness: 450 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList?.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block select-none"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-2px", // Tip aligns precisely with mouse position
        translateY: "-2px",
      }}
    >
      {/* 8-Bit Pixel Sword Motion Container */}
      <motion.div
        animate={{
          scale: isClicking ? 0.85 : isHovered ? 1.25 : 1,
          rotate: isClicking ? -25 : isHovered ? 15 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="relative flex items-center"
      >
        <PixelSwordSVG isHovered={isHovered} isClicking={isClicking} />

        {/* Hover Action Badge */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 16 }}
            className="bg-[#00ff66] text-black font-mono font-bold text-[9px] px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] whitespace-nowrap uppercase tracking-wider"
          >
            ATTACK ➔
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
