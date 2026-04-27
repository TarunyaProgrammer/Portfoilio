import SystemsGrid from "../components/SystemsGrid.jsx";
import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const SystemsPage = () => {
  useDocumentSEO({
    title: "Systems Archive — Tarunya Kesharwani",
    description:
      "Comprehensive documentation of engineered solutions. Explore architecture patterns, performance metrics, and technological choices.",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 md:pt-48"
    >
      <div className="container mx-auto px-8 mb-24">
        <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
          curated collection
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-black leading-none mb-8 tracking-tighter">
          Systems <br />
          <span className="italic font-normal opacity-20">Archive</span>
        </h1>
        <p className="text-black/60 text-xl font-medium max-w-2xl leading-relaxed">
          A meticulous documentation of engineered solutions. This archive 
          catalogues architecture patterns, performance metrics, and the 
          technological rationale behind every build.
        </p>
      </div>
      <SystemsGrid limit={Infinity} hideTitle={true} />
    </motion.div>
  );
};

export default SystemsPage;
