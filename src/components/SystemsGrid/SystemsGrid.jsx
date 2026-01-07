import { motion } from "framer-motion";
import SystemCard from "../SystemCard/SystemCard";

const systems = [
  {
    id: 1,
    title: "Distributed Analytics Engine",
    slug: "analytics-engine",
    tech: ["Rust", "Kafka", "ClickHouse"],
    description: "Real-time event processing at scale with sub-second latency.",
    color: "#c8ff00", // Neon
  },
  {
    id: 2,
    title: "Microservices Orch",
    slug: "microservices-orch",
    tech: ["Go", "Kubernetes", "gRPC"],
    description:
      "Self-healing service mesh implementation for high availability.",
    color: "#7dd3fc", // SysBlue
  },
  {
    id: 3,
    title: "Fintech Ledger Core",
    slug: "ledger-core",
    tech: ["Java", "PostgreSQL", "AWS"],
    description: "Double-entry accounting system with immutable audit logs.",
    color: "#ff5470", // Signal
  },
];

const SystemsGrid = () => {
  return (
    <section className="py-24 bg-bg relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-4">
              Core Systems
            </h2>
            <p className="text-gray-400 font-mono">
              /Architecture /Engineering /Scale
            </p>
          </div>
          <a
            href="/systems"
            className="hidden md:block text-neon font-mono hover:underline decoration-neon underline-offset-4"
          >
            View All Modules -&gt;
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
