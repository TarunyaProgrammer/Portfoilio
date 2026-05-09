import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-white flex items-start lg:items-center pt-40 pb-20 lg:pt-32 lg:pb-0 overflow-hidden">
      {/* Side Metadata (Vertical) */}
      <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-24 py-12">
        <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
          System Architect & Engineer
        </span>
        <div className="w-[1px] h-32 bg-black/5"></div>
        <span className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
          2026 Archive
        </span>
      </div>

      <div className="container mx-auto px-8 md:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="lg:col-span-7 z-10">
          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-16 mb-16"
          >
            <div>
              <div className="text-5xl font-bold text-black leading-none mb-1">+45</div>
              <div className="text-[10px] font-medium text-black/40 uppercase tracking-widest">Projects completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-black leading-none mb-1">+30</div>
              <div className="text-[10px] font-medium text-black/40 uppercase tracking-widest">Inventions shipped</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <h1 className="text-7xl md:text-[14rem] lg:text-[18rem] font-bold leading-[0.75] tracking-tighter text-black mb-8 flex overflow-hidden">
              {"Hello".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.1,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-black/60 font-medium max-w-lg leading-relaxed flex items-center gap-4">
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-[2px] bg-black/10"
              ></motion.span>
              Building robust, offline-first, and real-time systems.
            </p>
          </motion.div>

          <div className="mt-32 flex flex-col md:flex-row items-start md:items-center gap-12">
            <motion.div
              whileHover={{ 
                x: [0, -5, 5, -5, 5, 0],
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                to="/systems"
                className="inline-block px-10 py-5 bg-black text-white text-xs font-bold uppercase tracking-widest transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Archive</span>
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="absolute inset-0 bg-white/20"
                />
              </Link>
              {/* Architectural Accent */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-black/20" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-black/20" />
            </motion.div>

            <button className="text-sm font-bold text-black/30 flex items-center gap-3 hover:text-black transition-colors group">
              <span className="group-hover:mr-2 transition-all duration-300">Scroll down</span>
              <motion.svg 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Right: Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="aspect-[4/5] overflow-hidden grayscale contrast-125">
            <img
              src="/webme1.webp"
              alt="Portrait"
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-cover object-top scale-110"
            />
          </div>
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
