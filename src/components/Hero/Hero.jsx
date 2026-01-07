import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useCallback, useState } from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

const Hero = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    let x = (clientX - left) / width;
    let y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-bg"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-neon"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#ffffff",
              distance: 150,
              opacity: 0.1,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "bounce" },
            },
            number: { density: { enable: true, area: 800 }, value: 40 },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: y1 }}
          className="text-left"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ transform: "scale(0.96)" }}
              animate={{ transform: "scale(1)" }}
              transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-bold leading-[0.9] tracking-tighter text-text mb-8"
            >
              PORTFOLIO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-sysblue">
                SYSTEMS
              </span>
            </motion.h1>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
            Engineering precision meets diverse aesthetics. Exploring the
            intersection of rigorous architecture and fluid user experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/systems"
              className="px-8 py-4 bg-transparent border border-neon text-neon font-mono text-sm tracking-widest uppercase hover:bg-neon hover:text-bg transition-colors duration-300"
            >
              Explore Systems
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/connect"
              className="px-8 py-4 bg-grid/50 border border-transparent text-text font-mono text-sm tracking-widest uppercase hover:bg-grid hover:border-gray-600 transition-all duration-300"
            >
              Terminal Access
            </motion.a>
          </div>
        </motion.div>

        {/* Visual/Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            y: y2,
            x: useTransform(mouseX, [0, 1], [-20, 20]),
            rotate: useTransform(mouseY, [0, 1], [-10, 10]),
          }}
          className="relative hidden lg:flex justify-center items-center"
        >
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-neon/10 to-sysblue/10 backdrop-blur-3xl border border-white/5 shadow-[0_0_100px_rgba(200,255,0,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-neon/20 rounded-full blur-[50px] animate-pulse"></div>
            <div className="absolute inset-0 border border-neon/20 rounded-full scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
