import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGitHubSignals } from "../hooks/useGitHubSignals";
import { audioSynth } from "../utils/audioSynth";
import CountUpNumber from "./CountUpNumber";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
};

const Hero = () => {
  const { data } = useGitHubSignals();

  const totalReposNum = typeof data?.totalRepos === "number" && !isNaN(data.totalRepos) ? data.totalRepos : 45;
  const activeSystemsNum = typeof data?.activeSystems === "number" && !isNaN(data.activeSystems) ? data.activeSystems : 42;

  const reposTarget = Math.floor(totalReposNum / 5) * 5;
  const systemsTarget = Math.floor(activeSystemsNum / 5) * 5;

  return (
    <section className="relative w-full min-h-screen bg-[#0d0d0f] text-white flex flex-col items-center justify-center pt-20 sm:pt-28 pb-24 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-white/10 selection:bg-[#ff2a2a] selection:text-white font-pixelify">
      
      {/* 1. CINEMATIC RETRO BACKGROUND VIDEO BACKDROP */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover filter blur-[2px] brightness-[0.65] contrast-110 scale-105 pointer-events-none"
        >
          <source src="/bg_video.mp4" type="video/mp4" />
        </video>

        {/* Soft Dark Vignette for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/40 to-[#0d0d0f]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0d0d0f]/30 to-[#0d0d0f]/70" />

        {/* Retro CRT Scanline Lines */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))`,
            backgroundSize: "100% 4px, 6px 100%"
          }}
        />

        {/* Subtle Architectural Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "45px 45px"
          }}
        />
      </div>

      {/* 2. CENTERED HIGH-CRAFT CONTENT CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl text-center space-y-9 flex flex-col items-center my-auto"
      >
        
        {/* Top Telemetry Status Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 bg-[#141417]/90 text-[#00ff66] px-3 sm:px-5 py-2 text-xs font-mono font-bold border-2 border-white/20 shadow-[3px_3px_0px_#000]">
            <span className="w-2 h-2 bg-[#00ff66] animate-pulse inline-block shrink-0" />
            <span className="uppercase tracking-widest text-[10px] sm:text-[11px]">
              <span className="hidden sm:inline">SYSTEM STATUS: OPERATIONAL // LATENCY: 12MS</span>
              <span className="sm:hidden">ONLINE // 12MS</span>
            </span>
          </div>
        </motion.div>

        {/* Bespoke 8-Bit Pixel Headline */}
        <motion.div variants={itemVariants} className="space-y-3">
          <div className="relative inline-block">
            <h1 className="text-5xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.85] tracking-tight text-white uppercase font-pixelify drop-shadow-[4px_4px_0px_#ff2a2a]">
              Hello<span className="text-[#00ff66]">!</span>
            </h1>
          </div>
          
          <div className="text-base sm:text-2xl md:text-5xl font-black text-[#00e5ff] tracking-tight uppercase font-pixelify italic">
            Full-Stack Developer & Craftsman
          </div>
        </motion.div>

        {/* High-Impact High-Readability Subline */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-xl md:text-2xl font-sans text-white/90 font-medium max-w-3xl leading-relaxed tracking-normal"
        >
          Crafting high-throughput web applications, autonomous agentic workflows, and production-ready digital tools with zero compromise.
        </motion.p>

        {/* Bespoke Telemetry Cards */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-10 pt-2 w-full sm:w-auto"
        >
          {/* Projects Completed Card */}
          <div className="bg-[#141417]/95 border-2 border-white/20 p-4 sm:p-6 rounded-none shadow-[4px_4px_0px_#ff2a2a] text-center w-full sm:min-w-[200px]">
            <div className="text-3xl sm:text-5xl font-pixelify font-black text-[#ff2a2a] leading-none mb-1">
              <CountUpNumber target={reposTarget} prefix="+" duration={1.5} fallback={45} />
            </div>
            <div className="text-[11px] font-mono font-bold text-white/70 uppercase tracking-wider">
              Projects Completed
            </div>
          </div>

          {/* Inventions Shipped Card */}
          <div className="bg-[#141417]/95 border-2 border-white/20 p-4 sm:p-6 rounded-none shadow-[4px_4px_0px_#00e5ff] text-center w-full sm:min-w-[200px]">
            <div className="text-3xl sm:text-5xl font-pixelify font-black text-[#00e5ff] leading-none mb-1">
              <CountUpNumber target={systemsTarget} prefix="+" duration={1.5} fallback={40} />
            </div>
            <div className="text-[11px] font-mono font-bold text-white/70 uppercase tracking-wider">
              Inventions Shipped
            </div>
          </div>
        </motion.div>

        {/* Bespoke Interactive Command CTA */}
        <motion.div variants={itemVariants} className="pt-4">
          <Link
            to="/systems"
            onClick={() => audioSynth.playCoinSound()}
            className="group relative inline-flex items-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-[#ff2a2a] text-white font-pixel text-xs sm:text-sm uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black transition-all border-2 border-white shadow-[5px_5px_0px_#fff]"
          >
            <span>Explore System Archives</span>
            <span className="group-hover:translate-x-1 transition-transform">➔</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
