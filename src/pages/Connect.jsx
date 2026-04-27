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
      className="min-h-screen bg-white pt-32 md:pt-48"
    >
      <div className="container mx-auto px-8 mb-24">
        <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
          secure channel
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-black leading-none mb-8 tracking-tighter">
          Establish <br />
          <span className="italic font-normal opacity-20">Connection</span>
        </h1>
        <p className="text-black/60 font-medium text-xl max-w-2xl leading-relaxed">
          Available for technical consultation, architectural reviews, and 
          ambitious collaborative ventures. Please use the inquiry sheet below 
          to initiate correspondence.
        </p>
      </div>

      <ConnectTerminal />
    </motion.div>
  );
};

export default Connect;
