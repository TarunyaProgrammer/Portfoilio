import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gridRows = 12;
  const gridCols = 24;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center px-8 md:px-24 relative overflow-hidden selection:bg-white selection:text-black">
      {/* Background Interactive Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div 
          className="grid gap-4 p-8"
          style={{ 
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, 1fr)`
          }}
        >
          {Array.from({ length: gridRows * gridCols }).map((_, i) => {
            const row = Math.floor(i / gridCols);
            const col = i % gridCols;
            
            return (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-none bg-white"
                animate={{
                  opacity: Math.max(0.1, 1 - (Math.abs(col * 50 - mousePos.x / 20) + Math.abs(row * 50 - mousePos.y / 20)) / 100),
                  scale: Math.max(0.5, 1.5 - (Math.abs(col * 50 - mousePos.x / 20) + Math.abs(row * 50 - mousePos.y / 20)) / 100)
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="w-2 h-2 bg-orange-500"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">System Error / 404</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase mb-12"
        >
          These are not the <br />
          <span className="italic opacity-30">droids</span> you are <br />
          looking for...
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-white/40 font-medium max-w-2xl leading-relaxed mb-16 tracking-tight"
        >
          The architectural path you followed does not exist in this archive. 
          The system boundary has been reached. Please return to the core.
        </motion.p>

        <div className="flex flex-wrap gap-8 items-center">
          <Link
            to="/"
            className="bg-white text-black px-12 py-6 text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all border border-white"
          >
            Back to Home &rarr;
          </Link>

          <nav className="flex gap-8">
            <Link to="/systems" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Portfolio</Link>
            <Link to="/labs" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Laboratory</Link>
            <Link to="/blogs" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">Thought Archive</Link>
          </nav>
        </div>
      </div>

      {/* Side Watermark */}
      <div className="absolute right-[-5%] bottom-[-5%] rotate-90 origin-bottom-right hidden lg:block">
        <span className="text-[15rem] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none">
          Tarunya Systems
        </span>
      </div>
    </div>
  );
};

export default NotFound;
