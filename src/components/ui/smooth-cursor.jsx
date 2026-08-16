import React, { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export const SmoothCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Precision spring configuration for instant, zero-lag response with subtle silky momentum
  const springConfig = { damping: 30, stiffness: 650, mass: 0.25 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverElements = () => {
      const interactives = document.querySelectorAll(
        "a, button, input, select, textarea, [role='button'], [tabindex='0']"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    handleHoverElements();

    const observer = new MutationObserver(handleHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 999999,
        transform: `translate3d(${smoothX.get()}px, ${smoothY.get()}px, 0)`,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        willChange: "transform",
      }}
      className="hidden md:block"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `scale(${isHovered ? 1.2 : 1})`,
          transition: "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
          filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7))",
          transformOrigin: "3px 2.5px",
        }}
      >
        <path
          d="M3 2.5V19.5L7.8 14.8L14.8 14.8L3 2.5Z"
          fill="#09090b"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
