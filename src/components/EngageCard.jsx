import { motion } from "framer-motion";
import { audioSynth } from "../utils/audioSynth";

const EngageCard = ({ option, onClick, isSelected }) => {
  return (
    <motion.button
      layout
      onClick={() => {
        audioSynth.playClickSound();
        onClick(option);
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      aria-expanded={isSelected}
      className={`relative w-full text-left p-8 sm:p-10 transition-all duration-300 bg-[#141417] border-2 border-white/20 shadow-[4px_4px_0px_#ff2a2a] hover:border-white font-pixelify rounded-none ${
        isSelected ? "border-[#ff2a2a] shadow-[6px_6px_0px_#00ff66]" : ""
      }`}
    >
      <div className="flex flex-col h-full justify-between gap-8">
        <div>
          <div className="text-xs font-mono font-bold text-[#ff2a2a] mb-3 uppercase tracking-[0.4em]">
            SERVICE MODULE
          </div>
          <h3
            className={`font-pixelify font-black text-2xl sm:text-3xl mb-4 transition-all uppercase leading-tight ${
              isSelected ? "text-[#00ff66]" : "text-white group-hover:text-[#ff2a2a]"
            }`}
          >
            {option.title}
          </h3>
          <p className="text-white/80 font-sans text-sm leading-relaxed mb-6">
            {option.description}
          </p>
          <div className="text-xs font-mono font-bold text-[#fbd000] uppercase tracking-wider">
            {option.stack}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono">
          <span className="text-xs text-white/60">
            {option.outcome}
          </span>
          <span
            className={`text-xs font-bold tracking-widest uppercase transition-colors ${
              isSelected ? "text-[#00ff66]" : "text-[#ff2a2a] group-hover:text-white"
            }`}
          >
            {option.cta} ↗
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export default EngageCard;
