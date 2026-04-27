import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { labs } from "../data/labs";

const LabsGrid = ({ hideTitle = false }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section className="py-48 md:py-64 bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-8">
        {!hideTitle && (
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-32 gap-8">
            <h2 className="text-6xl md:text-8xl font-heading font-black text-black leading-none tracking-tighter">
              Experimental <br />
              <span className="italic font-normal opacity-20">Laboratory.</span>
            </h2>
            <div className="text-script text-black/40 text-3xl transform rotate-2">
              where curiosity meets code
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-black/10">
          {labs.map((lab) => (
            <motion.div
              layoutId={`card-${lab.id}`}
              key={lab.id}
              onClick={() => setSelectedId(lab.id)}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              className="aspect-square border-r border-b border-black/10 flex flex-col p-12 cursor-pointer group transition-all duration-700 relative bg-white"
            >
              <motion.span
                layoutId={`type-${lab.id}`}
                className="text-[10px] font-black tracking-[0.4em] text-black/40 uppercase mb-auto"
              >
                {lab.type}
              </motion.span>
              
              <motion.span
                layoutId={`title-${lab.id}`}
                className="font-heading font-black text-3xl text-black leading-none group-hover:italic transition-all"
              >
                {lab.title}
              </motion.span>

              {/* Status Indicator */}
              <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-black/60 border-b border-black/5 pb-1">
                {lab.status}
              </div>

              {/* Decorative background element */}
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-black/5 group-hover:bg-black transition-colors"></div>
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
                className="absolute inset-0 bg-white/95 backdrop-blur-xl"
              />

              {/* Expanded Card */}
              <motion.div
                layoutId={`card-${selectedId}`}
                className="w-full max-w-4xl bg-white border border-black/10 p-16 md:p-24 relative z-10 shadow-[0_100px_80px_-40px_rgba(0,0,0,0.2)] overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-12 right-12 text-black/50 hover:text-black transition-all scale-125"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                        className="text-xs font-black text-black/30 uppercase tracking-[0.5em] mb-8"
                      >
                        {lab.type}
                      </motion.span>
                      <motion.h3
                        layoutId={`title-${lab.id}`}
                        className="font-heading font-black text-6xl md:text-8xl text-black mb-20 leading-none italic tracking-tighter"
                      >
                        {lab.title}
                      </motion.h3>

                      {/* Details Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-20"
                      >
                        <div>
                          <h4 className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em] mb-6">
                            Architectural Inquiry
                          </h4>
                          <p className="text-black/80 leading-relaxed text-xl font-body italic border-l-2 border-black/5 pl-8">
                            {lab.problem}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black text-black/30 uppercase tracking-[0.4em] mb-6">
                            Core Hypothesis
                          </h4>
                          <p className="text-black/80 leading-relaxed text-xl font-body">
                            {lab.hypothesis}
                          </p>
                        </div>
                        <div className="md:col-span-2 border-t border-black/10 pt-16">
                          <h4 className="text-[10px] font-black text-black/40 uppercase tracking-[0.5em] mb-6">
                            Current Evolutionary Stage
                          </h4>
                          <p className="text-black text-3xl font-heading font-black">
                            {lab.prototype}
                          </p>
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

