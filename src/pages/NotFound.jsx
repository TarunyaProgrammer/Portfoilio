import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

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
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    />
  );
};

const NotFound = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Parallax and Rotation transforms
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
  const spacing = 40;
  for (let x = 0; x < 1400; x += spacing) {
    for (let y = 0; y < 1000; y += spacing) {
      dots.push({ x, y });
    }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-white text-black flex flex-col justify-center px-8 md:px-24 relative overflow-hidden selection:bg-black selection:text-white"
    >
      {/* Physics-based Dot Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        {dots.map((dot, i) => (
          <Dot key={i} x={dot.x} y={dot.y} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="w-12 h-[1px] bg-black/20"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Boundary Reached / 404</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-7xl md:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase mb-16"
        >
          System <br />
          <span className="italic font-light opacity-10">Out of</span> <br />
          Bounds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-3xl text-black/40 font-medium max-w-2xl leading-tight mb-20 tracking-tighter italic"
        >
          The architectural coordinates you provided do not resolve to any known module in this archive.
        </motion.p>

        <div className="flex flex-wrap gap-12 items-center">
          <Link
            to="/"
            className="group relative inline-block bg-black text-white px-16 py-8 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all duration-700 overflow-hidden"
          >
            <span className="relative z-10">Return to Core &rarr;</span>
            <motion.div 
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-0 bg-white"
            />
          </Link>

          <nav className="flex gap-10">
            {['Portfolio', 'Blogs'].map((item) => (
              <Link 
                key={item}
                to={item === 'Portfolio' ? '/systems' : '/blogs'} 
                className="text-[10px] font-black uppercase tracking-widest text-black/20 hover:text-black transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Right Side: 3D System Artifact */}
      <div className="absolute right-[10%] lg:right-[15%] top-1/2 -translate-y-1/2 hidden md:block perspective-[2000px] z-20">
        <motion.div
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            x: smoothTransX,
            y: smoothTransY,
          }}
          className="w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] relative preserve-3d"
        >
          {/* Wireframe Cube Faces - Outer */}
          {[
            { rotateY: 0, translateZ: 200 },
            { rotateY: 90, translateZ: 200 },
            { rotateY: 180, translateZ: 200 },
            { rotateY: 270, translateZ: 200 },
            { rotateX: 90, translateZ: 200 },
            { rotateX: -90, translateZ: 200 },
          ].map((face, i) => (
            <div
              key={`outer-${i}`}
              className="absolute inset-0 border-[0.5px] border-black/10 bg-black/[0.01] backdrop-blur-[1px] flex items-center justify-center overflow-hidden"
              style={{
                transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.translateZ}px)`,
              }}
            >
              <div className="text-[8px] font-black uppercase tracking-widest opacity-5 rotate-45 select-none">
                System Boundary // Archive Lost // 404 Error
              </div>
            </div>
          ))}
          
          {/* Inner Core - Secondary Structure */}
          {[
            { rotateY: 45, translateZ: 100 },
            { rotateY: 135, translateZ: 100 },
            { rotateX: 45, translateZ: 100 },
            { rotateX: -45, translateZ: 100 },
          ].map((face, i) => (
            <div
              key={`inner-${i}`}
              className="absolute inset-[25%] border-[1px] border-black/20 bg-black/5"
              style={{
                transform: `rotateY(${face.rotateY || 0}deg) rotateX(${face.rotateX || 0}deg) translateZ(${face.translateZ}px)`,
              }}
            />
          ))}

          {/* Center Point */}
          <div className="absolute inset-[45%] bg-black flex items-center justify-center">
             <div className="w-4 h-4 bg-white/20 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Massive 404 Watermark */}
      <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 rotate-90 select-none pointer-events-none z-0">
        <span className="text-[40rem] font-black text-black/[0.015] leading-none tracking-tighter">
          404
        </span>
      </div>
      
      {/* System Metadata Decor */}
      <div className="absolute left-8 bottom-8 flex gap-12 items-center opacity-10 hidden md:flex">
        <div className="text-[9px] font-black uppercase tracking-widest">Lat: 40.7128° N</div>
        <div className="text-[9px] font-black uppercase tracking-widest">Lon: 74.0060° W</div>
        <div className="text-[9px] font-black uppercase tracking-widest">Status: DIVERGENT</div>
      </div>
    </div>
  );
};

export default NotFound;
