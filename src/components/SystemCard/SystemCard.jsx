import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const SystemCard = ({ system, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        layout: { duration: 0.4, ease: "anticipate" },
      }}
      whileHover={{
        y: isExpanded ? 0 : -4,
        scale: isExpanded ? 1 : 1.01,
      }}
      className={`group relative glass-panel rounded-card overflow-hidden transition-all duration-500 perspective-1000 cursor-pointer ${
        isExpanded
          ? "z-50 ring-1 ring-white/10 bg-bg"
          : "hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-grid/20"
      }`}
      style={{
        borderColor: isExpanded ? system.color : "",
      }}
    >
      {/* Neon Border Effect (Hover Only, Hidden on Expanded) */}
      {!isExpanded && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${system.color}15`,
            border: `1px solid ${system.color}40`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-8">
        <div className="flex justify-between items-start mb-2">
          {/* Title & Tagline */}
          <div className="flex-1">
            <motion.h3
              layout="position"
              className={`font-bold font-heading text-text group-hover:text-neon transition-colors duration-300 ${
                isExpanded ? "text-3xl mb-2" : "text-2xl"
              }`}
            >
              {system.title}
            </motion.h3>
            <motion.p
              layout="position"
              className={`font-mono text-gray-400 ${
                isExpanded ? "text-sm text-neon" : "text-xs opacity-60"
              }`}
            >
              {system.tagline || system.description}
            </motion.p>
          </div>

          <span className="text-xs font-mono text-gray-500/50 shrink-0 ml-4">
            0{system.id}
          </span>
        </div>

        {/* Collapsed View Tech Stack */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {system.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-1 bg-white/5 rounded text-gray-500"
              >
                {tech}
              </span>
            ))}
            {system.tech.length > 3 && (
              <span className="text-[10px] font-mono px-2 py-1 text-gray-600">
                +{system.tech.length - 3}
              </span>
            )}
          </motion.div>
        )}

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-8"
            >
              {/* Analysis Grid */}
              <div className="grid gap-6 border-t border-white/5 pt-6">
                <div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    Problem
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {system.problem}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    Solution
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {system.solution}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1">
                    Impact
                  </span>
                  <p className="text-neon text-sm leading-relaxed">
                    {system.impact}
                  </p>
                </div>
              </div>

              {/* Features & Stack */}
              <div className="grid md:grid-cols-2 gap-8 border-t border-white/5 pt-6">
                <div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-3">
                    Key Features
                  </span>
                  <ul className="space-y-2">
                    {system.features?.map((feat) => (
                      <li
                        key={feat}
                        className="text-sm text-gray-400 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-neon rounded-full"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-3">
                    Technology
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {system.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-white/5">
                <a
                  href={system.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 bg-white/5 hover:bg-neon hover:text-black text-neon px-6 py-3 rounded-md font-mono text-sm transition-all duration-300 border border-neon/30"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                  INITIALIZE SYSTEM -&gt;
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SystemCard;
