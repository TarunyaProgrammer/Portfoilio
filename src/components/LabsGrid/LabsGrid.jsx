import { motion } from "framer-motion";

const LabsGrid = () => {
  // Generate some dummy lab items
  const labs = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    title: `EXP_0${i + 1}`,
    type: i % 2 === 0 ? "UI" : "ALGO",
  }));

  return (
    <section className="section-spacing bg-bg border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl font-heading font-bold text-text">
            Labs{" "}
            <span className="text-sm font-mono text-gray-500 font-normal">
              / Experiments
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 0.98, filter: "hue-rotate(90deg)" }}
              className="aspect-square glass-panel rounded-lg flex flex-col items-center justify-center cursor-pointer group hover:bg-grid/40 transition-colors relative overflow-hidden"
            >
              <span className="font-mono text-xs text-neon mb-2 opacity-50 text-center">
                {lab.type}
              </span>
              <span className="font-heading font-bold text-lg text-text group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
                {lab.title}
              </span>

              {/* Glitch Overlay (Simulated) */}
              <div className="absolute inset-0 bg-neon/10 translate-y-full group-hover:translate-y-0 transition-transform duration-100 mix-blend-overlay"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabsGrid;
