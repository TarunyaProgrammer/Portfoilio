import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useGitHubSignals } from "../hooks/useGitHubSignals";
import { useCodeforcesSignals } from "../hooks/useCodeforcesSignals";
import { formatDistanceToNow } from "date-fns";

const SignalCard = ({ label, value, subtext, loading, delay }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="flex flex-col pr-12 md:border-r border-black/5 last:border-r-0"
  >
    <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
      {label}
    </span>
    
    <div className="flex items-baseline gap-3">
      {loading ? (
         <span className="text-xs font-bold text-black/10 animate-pulse tracking-widest uppercase">
            Syncing
         </span>
      ) : (
        <span className="text-4xl font-bold text-black tracking-tighter">
          {value !== undefined && value !== null ? value : "---"}
        </span>
      )}
      {subtext && !loading && (
        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">
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
        setSystemState("SYNCING");
    } else {
        setSystemState("LIVE TELEMETRY");
    }
  }, [ghLoading, cfLoading]);

  const lastActiveGH = github?.lastActive 
    ? formatDistanceToNow(new Date(github.lastActive), { addSuffix: true }) 
    : "Syncing...";

  const lastActiveCF = cf?.lastContest
    ? formatDistanceToNow(new Date(cf.lastContest), { addSuffix: true })
    : "Syncing...";

  return (
    <section className="bg-white relative z-20 border-b border-black/5 overflow-hidden">
      {/* Scanning Line Effect */}
      {!shouldReduceMotion && (
        <motion.div 
          className="absolute inset-x-0 h-[1px] bg-black/5 z-30"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      <div className="container mx-auto px-8 md:px-16 py-24 md:py-28 relative">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6">
            <div className="flex items-center gap-6">
                <motion.span 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`w-3 h-3 rounded-full ${ghLoading || cfLoading ? "bg-black/10" : "bg-black"}`}
                ></motion.span>
                <h3 className="text-[10px] font-bold text-black/60 uppercase tracking-[0.6em]">
                    Real-time Protocol Signals
                </h3>
            </div>
            <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.6em]">
                {systemState} &middot; SOURCE: SYSTEM_API_V3
            </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-16">
            <SignalCard 
                label="Repositories" 
                value={github?.totalRepos} 
                loading={ghLoading} 
                delay={0.1} 
            />
             <SignalCard 
                label="Systems" 
                value={github?.activeSystems} 
                loading={ghLoading} 
                delay={0.2} 
            />
             <SignalCard 
                label="Stargazers" 
                value={github?.totalStars} 
                loading={ghLoading} 
                delay={0.3} 
            />
             <SignalCard 
                label="CF MAX" 
                value={cf?.maxRating} 
                subtext={cf?.rank}
                loading={cfLoading} 
                delay={0.4} 
            />
             <SignalCard 
                label="Solved" 
                value={cf?.uniqueSolved} 
                loading={cfLoading} 
                delay={0.5} 
            />
            
            <div className="flex flex-col justify-end lg:pl-12 lg:border-l lg:border-black/5">
                 <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">Pulse</span>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center gap-6 text-[10px] font-bold text-black/60 uppercase tracking-widest">
                        <span>GitHub</span>
                        <span className="italic">{ghLoading ? "..." : lastActiveGH}</span>
                    </div>
                     <div className="flex justify-between items-center gap-6 text-[10px] font-bold text-black/60 uppercase tracking-widest">
                        <span>Codeforces</span>
                         <span className="italic">{cfLoading ? "..." : lastActiveCF}</span>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Signals;
