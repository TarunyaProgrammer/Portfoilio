import { useState, useEffect, startTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGitHubSignals } from "../hooks/useGitHubSignals";
import { useCodeforcesSignals } from "../hooks/useCodeforcesSignals";
import { formatDistanceToNow } from "date-fns";
import CountUpNumber from "./CountUpNumber";

const SignalCard = ({ label, value, subtext, loading, delay, fallback = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="flex flex-col pr-4 sm:pr-8 border-r border-white/10 md:border-r"
  >
    <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.4em] mb-4">
      {label}
    </span>
    
    <div className="flex items-baseline gap-3">
      {loading ? (
        <span className="text-xs font-mono font-bold text-[#ff2a2a] animate-pulse tracking-widest uppercase">
          Syncing
        </span>
      ) : (
        <span className="text-4xl font-pixelify font-black text-white tracking-tight">
          {typeof value === "number" ? (
            <CountUpNumber target={value} duration={1.5} fallback={fallback} />
          ) : (
            value || "---"
          )}
        </span>
      )}
      {subtext && !loading && (
        <span className="text-[10px] font-mono font-bold text-[#fbd000] uppercase tracking-widest">
          {subtext}
        </span>
      )}
    </div>
  </motion.div>
);

const Signals = () => {
  const { data: github, loading: ghLoading } = useGitHubSignals();
  const { data: cf, loading: cfLoading } = useCodeforcesSignals();
  const [systemState, setSystemState] = useState("SYNCING");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (ghLoading || cfLoading) {
      startTransition(() => setSystemState("SYNCING"));
    } else {
      startTransition(() => setSystemState("LIVE TELEMETRY"));
    }
  }, [ghLoading, cfLoading]);

  const lastActiveGH = github?.lastActive 
    ? formatDistanceToNow(new Date(github.lastActive), { addSuffix: true }) 
    : "Syncing...";

  const lastActiveCF = cf?.lastContest
    ? formatDistanceToNow(new Date(cf.lastContest), { addSuffix: true })
    : "Syncing...";

  return (
    <section className="bg-[#141417] text-white relative z-20 border-b border-white/10 overflow-hidden font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      {/* Scanning Line Effect */}
      {!shouldReduceMotion && (
        <motion.div 
          className="absolute inset-x-0 h-[1px] bg-[#ff2a2a]/30 z-30 pointer-events-none"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      <div className="container mx-auto px-4 sm:px-8 md:px-16 py-12 sm:py-20 md:py-24 relative">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <motion.span 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-3 h-3 ${ghLoading || cfLoading ? "bg-gray-500" : "bg-[#00ff66]"}`}
            />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-[0.4em]">
              Real-time Protocol Signals
            </h3>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.2em] sm:tracking-[0.4em]">
            <span className="hidden sm:inline">{systemState} &middot; SOURCE: SYSTEM_API_V3</span>
            <span className="sm:hidden">SYSTEM_API_V3</span>
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12">
          <SignalCard 
            label="Repositories" 
            value={github?.totalRepos ?? 45} 
            loading={ghLoading} 
            delay={0.1} 
            fallback={45}
          />
          <SignalCard 
            label="Systems" 
            value={github?.activeSystems ?? 42} 
            loading={ghLoading} 
            delay={0.2} 
            fallback={42}
          />
          <SignalCard 
            label="Stargazers" 
            value={github?.totalStars ?? 284} 
            loading={ghLoading} 
            delay={0.3} 
            fallback={284}
          />
          <SignalCard 
            label="CF MAX" 
            value={cf?.maxRating ?? 939} 
            subtext={cf?.rank || "NEWBIE"}
            loading={cfLoading} 
            delay={0.4} 
            fallback={939}
          />
          <SignalCard 
            label="Solved" 
            value={cf?.uniqueSolved ?? 88} 
            loading={cfLoading} 
            delay={0.5} 
            fallback={88}
          />
          
          <div className="flex flex-col justify-end lg:pl-8 lg:border-l border-white/10">
            <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.4em] mb-3">Pulse</span>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between items-center gap-4 text-white/80 uppercase">
                <span>GitHub</span>
                <span className="text-[#00ff66]">{ghLoading ? "..." : lastActiveGH}</span>
              </div>
              <div className="flex justify-between items-center gap-4 text-white/80 uppercase">
                <span>Codeforces</span>
                <span className="text-[#fbd000]">{cfLoading ? "..." : lastActiveCF}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signals;
