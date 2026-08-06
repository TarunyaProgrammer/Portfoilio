import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGitHubProjects } from "../hooks/useGitHubProjects";
import SystemCard from "./SystemCard";
import { audioSynth } from "../utils/audioSynth";

const SystemsGrid = ({ limit = 3, hideTitle = false }) => {
  const { projects, loading } = useGitHubProjects();
  
  if (loading) {
    return (
      <div className="py-48 flex flex-col items-center justify-center gap-6 bg-[#0d0d0f] text-white font-pixelify">
        <div className="w-12 h-12 border-4 border-[#ff2a2a] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono font-bold text-[#fbd000] uppercase tracking-[0.5em]">SYNCING ARCADE ARCHIVE...</span>
      </div>
    );
  }

  const safeProjects = Array.isArray(projects) ? projects : [];
  const displayedSystems = safeProjects.slice(0, limit);

  return (
    <section className="py-24 md:py-36 bg-[#0d0d0f] text-white relative z-10 font-pixelify border-b border-white/10 selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-8">
        {!hideTitle && (
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 border-b border-white/10 pb-8">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase font-pixelify">
              System <br />
              <span className="font-normal italic text-[#ff2a2a] text-3xl md:text-5xl">Archives.</span>
            </h2>
            <div className="text-xs font-mono font-bold text-[#00ff66] uppercase tracking-[0.4em] mt-6 md:mt-0 bg-[#141417] px-4 py-2 border border-white/20">
               ARCADE PROTOCOL / 01 &mdash; 0{displayedSystems.length}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedSystems.map((system, index) => (
            <SystemCard key={system.id} system={system} index={index} />
          ))}
        </div>

        {limit < safeProjects.length && (
          <div className="mt-16 flex justify-center font-mono">
            <Link 
              to="/systems"
              onClick={() => audioSynth.playCoinSound()}
              className="text-xs font-bold uppercase tracking-[0.3em] bg-[#141417] text-[#fbd000] px-8 py-4 border-2 border-white/20 hover:bg-[#ff2a2a] hover:text-white transition-all shadow-[4px_4px_0px_#fbd000] rounded-none"
            >
              Access Complete Archive (45+ Projects) &rrarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemsGrid;
