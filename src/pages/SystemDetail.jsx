import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const SystemDetail = () => {
  const { slug } = useParams();

  // In a real app, fetch data based on slug.
  // For demo, we just display static content matching the theme.

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg pt-48 pb-20"
    >
      <div className="container mx-auto px-6">
        <Link
          to="/systems"
          className="text-neon font-mono mb-8 inline-block hover:underline"
        >
          &larr; Back to Registry
        </Link>

        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 capitalize">
          {slug.replace("-", " ")}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-grid/20 p-8 rounded-panel border border-white/5">
              <h2 className="text-2xl font-bold mb-4 text-sysblue">
                Architecture Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This system leverages a distributed event-driven architecture to
                ensure high availability and fault tolerance. Utilizing a
                combination of synchronous REST APIs for immediate feedback and
                asynchronous message queues for heavy processing.
              </p>
            </div>

            <div className="bg-grid/20 p-8 rounded-panel border border-white/5">
              <h2 className="text-2xl font-bold mb-4 text-signal">
                Performance Metrics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono">
                <div>
                  <div className="text-3xl font-bold text-white">99.99%</div>
                  <div className="text-sm text-gray-500">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">45ms</div>
                  <div className="text-sm text-gray-500">Avg Latency</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-sm text-gray-500">RPS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 border border-white/10 rounded-lg">
              <h3 className="font-mono text-sm text-gray-500 mb-4">
                TECH STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "PostgreSQL", "Redis", "Docker"].map(
                  (t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded text-sm text-gray-300"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="p-6 border border-white/10 rounded-lg">
              <h3 className="font-mono text-sm text-gray-500 mb-4">
                RESOURCES
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-neon hover:underline">
                    View Source Code
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neon hover:underline">
                    Live Deployment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-neon hover:underline">
                    API Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SystemDetail;
