import { motion } from "framer-motion";
import SystemCard from "../SystemCard/SystemCard";

const systems = [
  {
    id: 1,
    title: "RFP Velocity",
    slug: "rfp-velocity",
    tech: ["React", "Node", "LLM", "PDF Parsing"],
    description:
      "AI system converting RFP documents into structured proposals.",
    color: "#c8ff00", // Neon
  },
  {
    id: 2,
    title: "Budgettt",
    slug: "budgettt",
    tech: ["PWA", "IndexedDB", "Firebase"],
    description: "Offline-first, privacy-focused student expense tracker PWA.",
    color: "#7dd3fc", // SysBlue
  },
  {
    id: 3,
    title: "PaperLess",
    slug: "paperless",
    tech: ["React", "Tailwind", "UX Systems"],
    description:
      "Minimal AI-assisted note system for distraction-free thinking.",
    color: "#ff5470", // Signal
  },
];

const SystemsGrid = () => {
  return (
    <section className="section-spacing bg-bg relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-24"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
              Core Systems
            </h2>
            <p className="text-gray-400 font-mono text-sm tracking-wide">
              / ARCHITECTURE / ENGINEERING / SCALE
            </p>
          </div>
          <a
            href="/systems"
            className="hidden md:block text-neon font-mono hover:underline decoration-neon underline-offset-4 text-sm"
          >
            VIEW ALL MODULES &rarr;
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <SystemCard key={system.id} system={system} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a
            href="/systems"
            className="text-neon font-mono hover:underline decoration-neon underline-offset-4"
          >
            View All Modules -&gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default SystemsGrid;
