import { motion } from "framer-motion";

const OpenSource = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-6xl font-heading font-bold mb-8">Open Source</h1>

        <div className="space-y-8">
          <div className="p-8 border border-white/10 rounded-lg bg-grid/10 hover:border-sysblue transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold group-hover:text-sysblue transition-colors">
                Distributed-Locker
              </h2>
              <span className="font-mono text-sm text-gray-500">★ 1.2k</span>
            </div>
            <p className="text-gray-400 mb-6">
              A high-performance distributed locking mechanism for microservices
              architecture using Redis and Lua scripts.
            </p>
            <a
              href="#"
              className="font-mono text-sm text-sysblue hover:underline"
            >
              View Repository &rarr;
            </a>
          </div>

          <div className="p-8 border border-white/10 rounded-lg bg-grid/10 hover:border-neon transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold group-hover:text-neon transition-colors">
                React-Particles-X
              </h2>
              <span className="font-mono text-sm text-gray-500">★ 840</span>
            </div>
            <p className="text-gray-400 mb-6">
              Lightweight particle animation library for React with WebGL
              acceleration.
            </p>
            <a href="#" className="font-mono text-sm text-neon hover:underline">
              View Repository &rarr;
            </a>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl font-heading font-bold mb-8">Learning Log</h2>
          <ul className="space-y-4 font-mono text-sm text-gray-400">
            <li className="flex gap-4">
              <span className="text-gray-600">2026-01-02</span>
              <span>Exploring agentic workflows with LLMs.</span>
            </li>
            <li className="flex gap-4">
              <span className="text-gray-600">2023-12-15</span>
              <span>Deep dive into Rust ownership model.</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default OpenSource;
