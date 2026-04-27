import { motion } from "framer-motion";

const EngageCard = ({ option, onClick, isSelected }) => {
  return (
    <motion.button
      layout
      onClick={() => onClick(option)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      aria-expanded={isSelected}
      className={`relative w-full text-left p-12 transition-all duration-700 bg-white border border-black/5 shadow-xl hover:shadow-2xl group ${
        isSelected ? "ring-2 ring-accent" : ""
      }`}
    >
      <div className="flex flex-col h-full justify-between gap-12">
        <div>
          <div className="text-[10px] font-bold text-accent/40 mb-4 uppercase tracking-[0.4em]">
            service module
          </div>
          <h3
            className={`font-heading font-black text-3xl mb-6 transition-all duration-700 leading-none ${
              isSelected ? "italic text-accent" : "text-text group-hover:italic"
            }`}
          >
            {option.title}
          </h3>
          <p className="text-text/60 font-body text-lg leading-relaxed mb-8">
            {option.description}
          </p>
          <div className="text-[10px] font-bold text-text/30 uppercase tracking-widest">
            {option.stack}
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col gap-4">
          <span className="text-sm italic font-body text-text/50">
            {option.outcome}
          </span>
          <span
            className={`text-xs font-black tracking-widest uppercase transition-colors duration-700 underline underline-offset-8 ${
              isSelected ? "text-accent" : "text-text/30 group-hover:text-text"
            }`}
          >
            {option.cta}
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export default EngageCard;
