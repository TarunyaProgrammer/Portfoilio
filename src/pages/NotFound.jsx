import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { audioSynth } from "../utils/audioSynth";

const Dot = ({ x, y, mouseX, mouseY }) => {
  const dotX = useMotionValue(x);
  const dotY = useMotionValue(y);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(dotX, springConfig);
  const springY = useSpring(dotY, springConfig);

  useEffect(() => {
    const unsubscribeX = mouseX.on("change", (latestX) => {
      const dx = x - latestX;
      const dy = y - mouseY.get();
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const angle = Math.atan2(dy, dx);
        const push = (150 - distance) * 0.5;
        dotX.set(x + Math.cos(angle) * push);
        dotY.set(y + Math.sin(angle) * push);
      } else {
        dotX.set(x);
        dotY.set(y);
      }
    });

    return () => unsubscribeX();
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      style={{ 
        position: "absolute",
        left: springX,
        top: springY,
        width: 2,
        height: 2,
        backgroundColor: "rgba(255,42,42,0.2)",
      }}
    />
  );
};

const NotFound = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const rotateX = useTransform(mouseY, [0, 800], [20, -20]);
  const rotateY = useTransform(mouseX, [0, 1200], [-20, 20]);
  const transX = useTransform(mouseX, [0, 1200], [10, -10]);
  const transY = useTransform(mouseY, [0, 800], [10, -10]);

  const smoothRotateX = useSpring(rotateX, { damping: 20, stiffness: 100 });
  const smoothRotateY = useSpring(rotateY, { damping: 20, stiffness: 100 });
  const smoothTransX = useSpring(transX, { damping: 20, stiffness: 100 });
  const smoothTransY = useSpring(transY, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const dots = [];
  const spacing = 45;
  for (let x = 0; x < 1400; x += spacing) {
    for (let y = 0; y < 1000; y += spacing) {
      dots.push({ x, y });
    }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0d0d0f] text-white flex flex-col justify-center px-8 md:px-24 relative overflow-hidden selection:bg-[#ff2a2a] selection:text-white font-pixelify"
    >
      {/* Physics-based Dot Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        {dots.map((dot, i) => (
          <Dot key={i} x={dot.x} y={dot.y} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <span className="w-12 h-[2px] bg-[#ff2a2a]"></span>
          <span className="text-xs font-mono font-bold uppercase tracking-[0.5em] text-[#ff2a2a]">BOUNDARY REACHED // 404 GAME OVER</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-6xl sm:text-8xl md:text-[11rem] font-black leading-[0.85] tracking-tight uppercase font-pixelify"
        >
          System <br />
          <span className="text-[#00e5ff] italic font-normal text-4xl sm:text-7xl md:text-[8rem]">Out of</span> <br />
          Bounds.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl text-white/80 font-sans font-medium max-w-2xl leading-relaxed tracking-normal"
        >
          The architectural coordinates you provided do not resolve to any active module in this archive.
        </motion.p>

        <div className="pt-6 flex flex-wrap gap-8 items-center font-mono">
          <Link
            to="/"
            onClick={() => audioSynth.playCoinSound()}
            className="inline-block px-10 py-5 bg-[#ff2a2a] text-white font-pixel text-xs uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black transition-all border-2 border-white shadow-[4px_4px_0px_#fff]"
          >
            Return to Core ➔
          </Link>

          <nav className="flex gap-8">
            {['Projects', 'Blogs'].map((item) => (
              <Link 
                key={item}
                to={item === 'Projects' ? '/systems' : '/blogs'} 
                onClick={() => audioSynth.playClickSound()}
                className="text-xs font-bold uppercase tracking-widest text-[#fbd000] hover:text-white border-b border-white/20 pb-1 hover:border-[#ff2a2a] transition-all"
              >
                {item} ↗
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Right Side: 3D System Artifact */}
      <div className="absolute right-[8%] lg:right-[12%] top-1/2 -translate-y-1/2 hidden md:block perspective-[2000px] z-20">
        <motion.div
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            x: smoothTransX,
            y: smoothTransY,
          }}
          className="w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] relative preserve-3d"
        >
          {/* Wireframe Cube Faces - Outer */}
          {[
            { rotateY: 0, translateZ: 180 },
            { rotateY: 90, translateZ: 180 },
            { rotateY: 180, translateZ: 180 },
            { rotateY: 270, translateZ: 180 },
            { rotateX: 90, translateZ: 180 },
            { rotateX: -90, translateZ: 180 },
          ].map((face, i) => (
            <div
              key={`outer-${i}`}
              className="absolute inset-0 border-2 border-[#ff2a2a]/40 bg-[#141417]/80 backdrop-blur-[2px] flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,42,42,0.2)]"
              style={{
                transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.translateZ}px)`,
              }}
            >
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00ff66] rotate-45 select-none">
                BOUNDARY // ARCHIVE LOST // 404
              </div>
            </div>
          ))}
          
          {/* Inner Core */}
          {[
            { rotateY: 45, translateZ: 90 },
            { rotateY: 135, translateZ: 90 },
            { rotateX: 45, translateZ: 90 },
            { rotateX: -45, translateZ: 90 },
          ].map((face, i) => (
            <div
              key={`inner-${i}`}
              className="absolute inset-[25%] border-2 border-[#fbd000] bg-[#ff2a2a]/10"
              style={{
                transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.translateZ}px)`,
              }}
            />
          ))}

          {/* Center Point */}
          <div className="absolute inset-[45%] bg-[#ff2a2a] flex items-center justify-center">
             <div className="w-5 h-5 bg-[#00ff66] animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Massive 404 Watermark */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 rotate-90 select-none pointer-events-none z-0">
        <span className="text-[35rem] font-pixelify font-black text-white/[0.02] leading-none tracking-tighter">
          404
        </span>
      </div>
    </div>
  );
};

export default NotFound;
