import { motion } from "framer-motion";
import { useGitHubProjects } from "../hooks/useGitHubProjects";
import SystemCard from "./SystemCard";

const SystemsGrid = ({ limit = 6, hideTitle = false }) => {
  const { projects, loading, error } = useGitHubProjects();
  
  if (loading) {
    return (
      <div className="py-48 flex flex-col items-center justify-center gap-6">
        <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em]">Syncing Archive...</span>
      </div>
    );
  }

  // Safety check: ensure projects is an array
  const safeProjects = Array.isArray(projects) ? projects : [];
  const displayedSystems = safeProjects.slice(0, limit);

  return (
    <section className="py-36 md:py-52 bg-white relative z-10">
      <div className="container mx-auto px-8">
        {!hideTitle && (
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-32 border-b border-black/10 pb-12">
            <h2 className="text-4xl md:text-8xl font-bold text-black tracking-tighter leading-none">
              System <br />
              <span className="italic font-normal opacity-20 text-4xl md:text-6xl">Archives.</span>
            </h2>
            <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em] mt-8 md:mt-0">
               Open Protocol / 01 &mdash; 0{displayedSystems.length}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
          {displayedSystems.map((system, index) => (
            <SystemCard key={system.id} system={system} index={index} />
          ))}
        </div>

        <div className="mt-32 flex justify-center">
           <a 
            href="/systems"
            className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/40 hover:text-black transition-all border-b border-black/10 pb-2 hover:border-black"
           >
             Access Complete Archive &rarr;
           </a>
        </div>
      </div>
    </section>
  );
};

export default SystemsGrid;
