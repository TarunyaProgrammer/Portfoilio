import LabsGrid from "../components/LabsGrid/LabsGrid";
import { motion } from "framer-motion";

const LabsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 min-h-screen bg-bg"
    >
      <div className="container mx-auto px-6 mb-12">
        <h1 className="text-6xl font-heading font-bold mb-4">Laboratory</h1>
        <p className="text-gray-400 max-w-xl">
          Experimental interface designs, micro-interactions, and unfinished
          prototypes.
          <b> Caution: Unstable.</b>
        </p>
      </div>
      <LabsGrid />
    </motion.div>
  );
};

export default LabsPage;
