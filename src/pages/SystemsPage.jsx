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
      className="min-h-screen bg-[#0d0d0f] text-white pt-32 md:pt-44 selection:bg-[#ff2a2a] selection:text-white font-pixelify"
    >
      <div className="container mx-auto px-8 mb-16 space-y-4">
        <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.4em]">
          CURATED COLLECTION
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-none tracking-tight uppercase font-pixelify">
          Systems <br />
          <span className="font-normal italic text-[#0066ff]">Archive</span>
        </h1>
        <p className="text-white/80 font-sans text-lg font-medium max-w-2xl leading-relaxed">
          A meticulous documentation of engineered solutions cataloguing architecture patterns, performance metrics, and technological rationale.
        </p>
      </div>
      <SystemsGrid limit={Infinity} hideTitle={true} />
    </motion.div>
  );
};

export default SystemsPage;
