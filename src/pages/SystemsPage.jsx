import SystemsGrid from "../components/SystemsGrid/SystemsGrid";
import { motion } from "framer-motion";

const SystemsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 min-h-screen bg-bg"
    >
      <div className="container mx-auto px-6 mb-12">
        <h1 className="text-6xl font-heading font-bold mb-4">
          Systems Registry
        </h1>
        <p className="text-gray-400 max-w-xl">
          Comprehensive documentation of engineered solutions. Explore
          architecture patterns, performance metrics, and technological choices.
        </p>
      </div>
      <SystemsGrid />
    </motion.div>
  );
};

export default SystemsPage;
