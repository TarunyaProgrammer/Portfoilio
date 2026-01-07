import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";

const CaseStudy = ({ system }) => {
  // If used as a component with props (e.g. in a modal)
  if (system) {
    return (
      <motion.div
        layoutId={`system-${system.id}`}
        className="bg-bg w-full h-full p-8 overflow-y-auto"
      >
        <h2 className="text-4xl font-heading mb-4">{system.title}</h2>
        <div className="flex gap-2 mb-8">
          {system.tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-white/10 rounded">
              {t}
            </span>
          ))}
        </div>
        <p>{system.description}</p>
      </motion.div>
    );
  }

  // Standard fallback if no system prop
  return null;
};

export default CaseStudy;
