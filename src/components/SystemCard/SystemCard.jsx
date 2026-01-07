import { motion } from "framer-motion";

const SystemCard = ({ system, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-grid/30 rounded-card p-6 border border-white/5 overflow-hidden transition-colors duration-300 hover:border-gray-600 perspective-1000 cursor-pointer"
    >
      {/* Neon Border Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${system.color}20`,
          border: `1px solid ${system.color}`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold font-heading text-text group-hover:text-neon transition-colors duration-300">
            {system.title}
          </h3>
          <span className="text-xs font-mono text-gray-500">0{system.id}</span>
        </div>

        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          {system.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {system.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-1 rounded bg-bg border border-white/10 text-gray-300 group-hover:border-neon/50 group-hover:text-neon transition-colors duration-300"
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
