import { motion } from "framer-motion";
import ConnectTerminal from "../components/ConnectTerminal/ConnectTerminal";

const Connect = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 min-h-screen bg-bg"
    >
      <div className="container mx-auto px-6 mb-12 text-center">
        <h1 className="text-6xl font-heading font-bold mb-4">Uplink</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Establish a secure connection. Available for consulting, architectural
          reviews, and collaborative engineering.
        </p>
      </div>

      <ConnectTerminal />

      <div className="container mx-auto px-6 mt-12 text-center">
        <div className="flex justify-center gap-8 font-mono text-sm">
          <a
            href="mailto:tarunya@example.com"
            className="text-gray-400 hover:text-neon transition-colors"
          >
            EMAIL
          </a>
          <a
            href="https://github.com/TarunyaProgrammer"
            className="text-gray-400 hover:text-neon transition-colors"
          >
            GITHUB
          </a>
          <a
            href="https://linkedin.com/in/tarunya"
            className="text-gray-400 hover:text-neon transition-colors"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Connect;
