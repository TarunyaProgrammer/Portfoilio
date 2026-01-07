import { motion } from "framer-motion";

const SystemCard = ({ system, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative glass-panel rounded-card p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] perspective-1000 cursor-pointer"
    >
      {/* Neon Border Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 30px ${system.color}15`,
          border: `1px solid ${system.color}40`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold font-heading text-text group-hover:text-neon transition-colors duration-300">
            {system.title}
          </h3>
          <span className="text-xs font-mono text-gray-500/50">
            0{system.id}
          </span>
        </div>

        <p className="text-sm text-gray-400 mb-8 leading-relaxed font-light">
          {system.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {system.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-400 group-hover:bg-neon/10 group-hover:border-neon/30 group-hover:text-neon transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SystemCard;
