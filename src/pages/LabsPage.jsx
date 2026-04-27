import LabsGrid from "../components/LabsGrid.jsx";
import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const LabsPage = () => {
  useDocumentSEO({
    title: "The Laboratory — Tarunya Kesharwani",
    description:
      "Experimental interface designs, micro-interactions, and technical prototypes exploring the boundaries of code.",
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
          experimental R&D
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-black leading-none mb-8 tracking-tighter">
          The <br />
          <span className="italic font-normal opacity-20">Laboratory</span>
        </h1>
        <p className="text-black/60 text-xl font-medium max-w-2xl leading-relaxed">
          A collection of experimental interface designs, procedural 
          animations, and technical prototypes. This is a space for 
          unfettered inquiry into the boundaries of digital experience.
        </p>
      </div>
      <LabsGrid hideTitle={true} />
    </motion.div>
  );
};

export default LabsPage;
