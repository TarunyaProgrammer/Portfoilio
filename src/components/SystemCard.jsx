import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SystemCard = memo(({ system, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/systems/${system.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-black/5 mb-8 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-700">
          <img
            src={system.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"}
            alt={system.title}
            loading="lazy"
            width="1280"
            height="720"
            crossOrigin="anonymous"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
          />
          
          {/* Overlay Number */}
          <div className="absolute top-6 right-6 text-[40px] font-bold text-white/20 group-hover:text-white/40 transition-colors tracking-tighter leading-none z-20 font-mono">
             0{index + 1}
          </div>

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-sm z-10">
             <div className="text-white text-[10px] font-bold uppercase tracking-[0.6em] border border-white/20 px-6 py-3">
                Protocol Access
             </div>
          </div>

          {/* Technical Corner Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-black/10 group-hover:border-white/40 transition-all duration-700" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-black/10 group-hover:border-white/40 transition-all duration-700" />
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-baseline mb-4">
             <div className="text-[9px] font-bold text-black/30 uppercase tracking-[0.4em]">
                {system.category || "General System"}
             </div>
             <div className="text-[11px] font-bold text-black tracking-tighter">
                ★ {system.stars || 0}
             </div>
          </div>
          
          <h3 className="text-2xl font-bold text-black tracking-tighter mb-4 group-hover:italic transition-all">
            {system.title}
          </h3>
          
          <p className="text-[13px] text-black/50 font-medium leading-relaxed line-clamp-2 group-hover:text-black/80 transition-colors">
            {system.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

export default SystemCard;
