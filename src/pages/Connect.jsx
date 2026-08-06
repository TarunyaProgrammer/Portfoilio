import { motion } from "framer-motion";
import ConnectTerminal from "../components/ConnectTerminal.jsx";
import useDocumentSEO from "../hooks/useDocumentSEO";

const Connect = () => {
  useDocumentSEO({
    title: "Connect — Tarunya Kesharwani",
    description:
      "Establish a connection for architectural reviews, consulting, or collaborative engineering initiatives.",
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
          SECURE CHANNEL
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white leading-none tracking-tight uppercase font-pixelify">
          Establish <br />
          <span className="font-normal italic text-[#00ff66]">Connection</span>
        </h1>
        <p className="text-white/80 font-sans text-lg font-medium max-w-2xl leading-relaxed">
          Available for technical consultation, architectural reviews, and ambitious collaborative ventures.
        </p>
      </div>

      <ConnectTerminal />
    </motion.div>
  );
};

export default Connect;
