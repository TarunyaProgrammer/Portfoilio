import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { audioSynth } from "../utils/audioSynth";

const SystemCard = memo(({ system, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative border-2 border-white/20 bg-[#141417] p-6 sm:p-8 rounded-none shadow-[4px_4px_0px_#000] hover:border-[#ff2a2a] hover:shadow-[4px_4px_0px_#ff2a2a] transition-all font-pixelify flex flex-col justify-between"
    >
      {/* Retro Pixel Corner Accents (Clean Neutral White) */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-[#ff2a2a] transition-colors" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-[#ff2a2a] transition-colors" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-[#ff2a2a] transition-colors" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-[#ff2a2a] transition-colors" />

      <Link
        to={`/systems/${system.slug}`}
        onClick={() => audioSynth.playCoinSound()}
        className="block space-y-5"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between font-mono text-xs border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#0d0d0f] text-white/80 border border-white/20 font-pixel text-[9px] uppercase tracking-wider group-hover:bg-[#ff2a2a] group-hover:text-white transition-colors">
              LEVEL 0{index + 1}
            </span>
            <span className="font-bold text-[#00ff66] uppercase tracking-wider bg-[#0d0d0f] px-2 py-0.5 border border-white/10">
              {system.category || "General"}
            </span>
          </div>

          <div className="font-bold text-[#fbd000] bg-[#0d0d0f] px-2.5 py-1 border border-white/10">
            ★ {system.stars || 0}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-[#ff2a2a] transition-colors font-pixelify uppercase leading-tight">
          {system.title}
        </h3>

        {/* High-Readability Inter Body Description */}
        <p className="text-sm font-sans font-normal text-white/80 leading-relaxed line-clamp-3">
          {system.description}
        </p>

        {/* Action Button */}
        <div className="pt-4 flex justify-between items-center font-mono">
          <div className="text-xs font-bold bg-[#0d0d0f] text-white/80 group-hover:bg-[#ff2a2a] group-hover:text-white px-4 py-2 border border-white/20 transition-all flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[#00ff66] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>LAUNCH SYSTEM</span>
            <span>↗</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
});

export default SystemCard;
