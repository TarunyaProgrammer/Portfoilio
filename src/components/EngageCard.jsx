import { motion } from "framer-motion";

const EngageCard = ({ option, onClick, isSelected }) => {
  return (
    <motion.button
      layout
      onClick={() => onClick(option)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      aria-expanded={isSelected}
      className={`relative w-full text-left bg-grid/10 border p-6 rounded-xl transition-all duration-300 group ${
        isSelected
          ? "border-neon bg-neon/5 ring-1 ring-neon/20 z-10"
          : "border-white/5 hover:border-neon/50 hover:bg-grid/30"
      }`}
    >
      <div className="flex flex-col h-full justify-between gap-4">
        <div>
          <h3
            className={`font-heading font-bold text-xl mb-2 transition-colors duration-300 ${
              isSelected ? "text-neon" : "text-white group-hover:text-neon"
            }`}
          >
            {option.title}
          </h3>
          <p className="text-gray-400 font-light text-sm leading-relaxed mb-4">
            {option.description}
          </p>
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
            {option.stack}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-gray-300 font-mono">
            {option.outcome}
          </span>
          <span
            className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${
              isSelected ? "text-neon" : "text-gray-500 group-hover:text-neon"
            }`}
          >
            {option.cta} &rarr;
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export default EngageCard;
