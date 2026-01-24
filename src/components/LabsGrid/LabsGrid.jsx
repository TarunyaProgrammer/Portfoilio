import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { labs } from "../../data/labs"; // Import real data
import LabBackground from "./LabBackground";

const LabsGrid = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="section-spacing bg-bg border-t border-white/5 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-heading font-bold text-text">
            Labs{" "}
            <span className="text-sm font-mono text-gray-500 font-normal">
              / Experiments
            </span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {labs.map((lab) => (
            <motion.div
              layoutId={`card-${lab.id}`}
              key={lab.id}
              onClick={() => setSelectedId(lab.id)}
              whileHover={{ scale: 0.98, filter: "hue-rotate(90deg)" }}
              className="aspect-square glass-panel rounded-lg flex flex-col items-center justify-center cursor-pointer group hover:bg-grid/40 transition-colors relative overflow-hidden"
            >
              <motion.span
                layoutId={`type-${lab.id}`}
                className="font-mono text-xs text-neon mb-2 opacity-50 text-center"
              >
                {lab.type}
              </motion.span>
              <motion.span
                layoutId={`title-${lab.id}`}
                className="font-heading font-bold text-lg text-text text-center px-4"
              >
                {lab.title}
              </motion.span>

              {/* Status Indicator */}
              <div className="mt-4 px-3 py-1 rounded-full border border-white/10 bg-black/20 text-xs font-mono text-gray-400">
                {lab.status}
              </div>

              {/* Glitch Overlay */}
              <div className="absolute inset-0 bg-neon/10 translate-y-full group-hover:translate-y-0 transition-transform duration-100 mix-blend-overlay pointer-events-none"></div>

              {/* Background Visual */}
              <LabBackground id={lab.id} />
            </motion.div>
          ))}
        </div>

        {/* Expanded View Overlay */}
        <AnimatePresence>
          {selectedId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Expanded Card */}
              <motion.div
                layoutId={`card-${selectedId}`}
                className="w-full max-w-2xl bg-[#0a0a0a] border border-neon/30 rounded-xl p-8 relative z-10 shadow-2xl shadow-neon/10 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {(() => {
                  const lab = labs.find((l) => l.id === selectedId);
                  return (
                    <div className="flex flex-col h-full">
                      <motion.span
                        layoutId={`type-${lab.id}`}
                        className="font-mono text-xs text-neon mb-2 opacity-50"
                      >
                        {lab.type}
                      </motion.span>
                      <motion.h3
                        layoutId={`title-${lab.id}`}
                        className="font-heading font-bold text-3xl text-white mb-8"
                      >
                        {lab.title}
                      </motion.h3>

                      {/* Details Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        <div>
                          <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Problem
                          </h4>
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {lab.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Hypothesis
                          </h4>
                          <p className="text-gray-300 leading-relaxed text-sm">
                            {lab.hypothesis}
                          </p>
                        </div>
                        <div className="md:col-span-2 p-4 bg-white/5 rounded border border-white/10">
                          <h4 className="font-mono text-xs text-neon uppercase tracking-widest mb-2">
                            Active Prototype
                          </h4>
                          <p className="text-white font-mono text-sm">
                            {lab.prototype}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Status
                          </h4>
                          <span className="inline-block px-2 py-1 bg-neon/10 text-neon text-xs font-mono rounded border border-neon/20">
                            {lab.status}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LabsGrid;

