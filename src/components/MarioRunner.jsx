import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { audioSynth } from "../utils/audioSynth";

const MarioRunner = () => {
  const location = useLocation();
  
  if (location.pathname !== "/") {
    return null;
  }

  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasReachedFinish, setHasReachedFinish] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runFrame, setRunFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const confettiCanvasRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const animFrameRef = useRef(null);
  const hasPlayedFanfareRef = useRef(false);

  // Drag state refs (mutable, avoid re-renders during fast drag)
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollProgressRef = useRef(0);

  useEffect(() => {
    let lastTime = Date.now();

    const updateScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
        setScrollProgress(progress);

        const delta = Math.abs(currentScroll - lastScrollYRef.current);
        if (delta > 0.5) {
          setIsRunning(true);
          const now = Date.now();
          if (now - lastTime > 120) {
            setRunFrame((prev) => (prev + 1) % 2);
            lastTime = now;
          }
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            if (!isDraggingRef.current) setIsRunning(false);
          }, 100);
        }
        lastScrollYRef.current = currentScroll;

        if (progress > 0.94) {
          setHasReachedFinish(true);
          if (!hasPlayedFanfareRef.current) {
            hasPlayedFanfareRef.current = true;
            audioSynth.playStageClearSound();
            triggerConfetti();
          }
        } else if (progress < 0.85) {
          setHasReachedFinish(false);
          hasPlayedFanfareRef.current = false;
        }
      }

      animFrameRef.current = requestAnimationFrame(updateScroll);
    };

    animFrameRef.current = requestAnimationFrame(updateScroll);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      audioSynth.stopAllSounds();
    };
  }, []);

  // --- DRAG-TO-SCROLL LOGIC ---
  const getClientX = (e) =>
    e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;

  const handleDragStart = (e) => {
    e.preventDefault();
    isDraggingRef.current = true;
    setIsDragging(true);
    setIsRunning(true);
    dragStartXRef.current = getClientX(e);
    dragStartScrollProgressRef.current =
      window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  };

  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();

      const deltaX = getClientX(e) - dragStartXRef.current;
      const trackWidth = window.innerWidth - 100;
      const progressDelta = deltaX / trackWidth;
      const newProgress = Math.min(
        Math.max(dragStartScrollProgressRef.current + progressDelta, 0),
        1
      );
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: newProgress * totalHeight, behavior: "instant" });
      setRunFrame((prev) => (prev + 1) % 2);
    };

    const handleDragEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      setIsRunning(false);
    };

    window.addEventListener("mousemove", handleDragMove, { passive: false });
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragMove, { passive: false });
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, []);

  // Pixel Confetti Cannon
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff0033", "#00ff66", "#fbd000", "#0055ff", "#ffffff", "#ff6600"];
    const particles = Array.from({ length: 120 }, () => ({
      x: canvas.width * (0.8 + Math.random() * 0.18),
      y: canvas.height - 80,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 18 - 8,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 14,
    }));

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.rotation += p.vRot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      frame++;
      if (frame < 150) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
  };

  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
  const marioXPosition = (windowWidth - 100) * scrollProgress + 10;

  return (
    <>
      {/* Fullscreen Canvas for Footer Confetti */}
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />

      {/* Global grabbing cursor override while dragging */}
      {isDragging && (
        <style>{`* { cursor: grabbing !important; user-select: none !important; }`}</style>
      )}

      {/* Draggable Mario Character */}
      <div
        className="fixed bottom-12 left-0 select-none z-[9990] flex flex-col items-center will-change-transform"
        style={{
          transform: `translate3d(${marioXPosition}px, 0, 0)`,
          transition: "none",
          cursor: isDragging ? "grabbing" : "grab",
          pointerEvents: "auto",
          touchAction: "none",
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        title="Drag to scroll"
        aria-label="Drag Mario left or right to scroll the page"
      >
        {/* Dynamic Action Speech Bubble */}
        {hasReachedFinish ? (
          <div className="bg-[#ff2a2a] text-white font-mono text-[11px] font-black px-3 py-1 border-2 border-white shadow-[0_0_20px_rgba(255,42,42,0.9)] animate-bounce mb-1">
            STAGE CLEAR! ★
          </div>
        ) : isDragging ? (
          <div className="bg-[#00e5ff] text-black font-mono text-[10px] font-black px-2.5 py-0.5 border border-black mb-1 shadow-md">
            SCROLLING {Math.round(scrollProgress * 100)}%
          </div>
        ) : isRunning ? (
          <div className="bg-[#00ff66] text-black font-mono text-[10px] font-bold px-2.5 py-0.5 border border-black mb-1 animate-pulse shadow-md">
            RUNNING... {Math.round(scrollProgress * 100)}%
          </div>
        ) : scrollProgress < 0.01 ? (
          <div className="bg-[#fbd000] text-black font-mono text-[10px] font-bold px-2.5 py-0.5 border border-black mb-1 shadow-md animate-pulse">
            ← DRAG ME →
          </div>
        ) : (
          <div className="bg-[#fbd000] text-black font-mono text-[10px] font-bold px-2.5 py-0.5 border border-black mb-1 shadow-md">
            READY {Math.round(scrollProgress * 100)}%
          </div>
        )}

        {/* 8-Bit Mario Sprite */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] bg-[#161922] rounded-full p-1 border-2 border-[#fbd000]">
          <svg viewBox="0 0 16 16" className="w-full h-full" style={{ shapeRendering: "crispEdges" }}>
            <rect x="3" y="1" width="7" height="2" fill="#ff0033" />
            <rect x="2" y="3" width="11" height="1" fill="#ff0033" />
            <rect x="2" y="4" width="3" height="2" fill="#8d4004" />
            <rect x="5" y="4" width="4" height="2" fill="#ffe0b2" />
            <rect x="9" y="4" width="1" height="3" fill="#8d4004" />
            <rect x="10" y="4" width="1" height="1" fill="#ffe0b2" />
            <rect x="6" y="6" width="4" height="1" fill="#8d4004" />
            <rect x="3" y="7" width="8" height="3" fill="#ff0033" />
            <rect x="4" y="7" width="2" height="4" fill="#0055ff" />
            <rect x="8" y="7" width="2" height="4" fill="#0055ff" />
            <rect x="4" y="8" width="1" height="1" fill="#ffd700" />
            <rect x="9" y="8" width="1" height="1" fill="#ffd700" />
            {!isRunning ? (
              <>
                <rect x="1" y="8" width="2" height="3" fill="#ff0033" />
                <rect x="11" y="8" width="2" height="3" fill="#ff0033" />
              </>
            ) : runFrame === 0 ? (
              <>
                <rect x="0" y="7" width="3" height="2" fill="#ff0033" />
                <rect x="11" y="9" width="3" height="2" fill="#ff0033" />
              </>
            ) : (
              <>
                <rect x="1" y="9" width="3" height="2" fill="#ff0033" />
                <rect x="10" y="7" width="3" height="2" fill="#ff0033" />
              </>
            )}
            {!isRunning ? (
              <>
                <rect x="3" y="11" width="4" height="2" fill="#0055ff" />
                <rect x="8" y="11" width="4" height="2" fill="#0055ff" />
                <rect x="2" y="13" width="4" height="2" fill="#8d4004" />
                <rect x="8" y="13" width="4" height="2" fill="#8d4004" />
              </>
            ) : runFrame === 0 ? (
              <>
                <rect x="1" y="11" width="5" height="2" fill="#0055ff" />
                <rect x="9" y="11" width="4" height="2" fill="#0055ff" />
                <rect x="0" y="13" width="5" height="2" fill="#8d4004" />
                <rect x="9" y="13" width="4" height="2" fill="#8d4004" />
              </>
            ) : (
              <>
                <rect x="3" y="11" width="4" height="2" fill="#0055ff" />
                <rect x="8" y="11" width="5" height="2" fill="#0055ff" />
                <rect x="3" y="13" width="4" height="2" fill="#8d4004" />
                <rect x="9" y="13" width="5" height="2" fill="#8d4004" />
              </>
            )}
          </svg>
        </div>
      </div>

      {/* Fixed Bottom Race Track HUD */}
      <div className="fixed bottom-0 left-0 right-0 z-[9980] pointer-events-none select-none h-12 bg-[#0f1117] border-t-4 border-[#ff0033] shadow-[0_-4px_12px_rgba(0,0,0,0.8)] font-pixelify">
        <div
          className="absolute top-0 left-0 right-0 h-2 bg-[#ff0033]"
          style={{
            backgroundImage: "linear-gradient(90deg, #ff0033 50%, #fbd000 50%)",
            backgroundSize: "16px 100%",
          }}
        />
        <div className="relative w-full h-full max-w-7xl mx-auto px-8 flex items-center justify-between text-[10px] font-mono font-bold text-white uppercase">
          <span className="flex items-center gap-1.5 bg-[#161922] px-2 py-0.5 border border-white/20">
            <span className="w-2.5 h-2.5 bg-[#ff0033] inline-block" /> 1. START
          </span>
          <span className="hidden sm:flex items-center gap-1.5 bg-[#161922] px-2 py-0.5 border border-white/20">
            <span className="w-2.5 h-2.5 bg-[#fbd000] inline-block" /> 2. SKILLS
          </span>
          <span className="hidden md:flex items-center gap-1.5 bg-[#161922] px-2 py-0.5 border border-white/20">
            <span className="w-2.5 h-2.5 bg-[#00ff66] inline-block" /> 3. PROJECTS
          </span>
          <span className="hidden lg:flex items-center gap-1.5 bg-[#161922] px-2 py-0.5 border border-white/20">
            <span className="w-2.5 h-2.5 bg-[#0055ff] inline-block" /> 4. LOGS
          </span>
          <span className="flex items-center gap-1.5 bg-[#ff0033] text-white font-bold px-2.5 py-0.5 border border-white shadow-[0_0_10px_rgba(255,0,51,0.6)] font-pixel">
            <span className="w-2.5 h-2.5 bg-[#fbd000] inline-block animate-ping" /> FINISH 🏁
          </span>
        </div>
      </div>
    </>
  );
};

export default MarioRunner;
