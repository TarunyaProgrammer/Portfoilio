import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export const CountUpNumber = ({
  target,
  prefix = "",
  suffix = "",
  duration = 1.5,
  fallback = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const numTarget = typeof target === "number" && !isNaN(target) && target >= 0 ? target : fallback;

  useEffect(() => {
    if (!isInView || numTarget <= 0) {
      if (isInView) setCount(numTarget);
      return;
    }

    let frameId;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out curve for smooth retro arcade count-up
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutProgress * numTarget);

      setCount(currentVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(numTarget);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, numTarget, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {isInView ? count : 0}
      {suffix}
    </span>
  );
};

export default CountUpNumber;
