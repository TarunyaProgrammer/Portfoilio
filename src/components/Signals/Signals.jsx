import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGitHubSignals } from "../../hooks/useGitHubSignals";
import { useCodeforcesSignals } from "../../hooks/useCodeforcesSignals";
import { formatDistanceToNow } from "date-fns";

const SignalCard = ({ label, value, subtext, loading, delay, connectionState }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col p-4 border-l border-white/10 relative overflow-hidden"
  >
    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1 z-10 relative">
      {label}
    </span>
    
    <div className="relative z-10 h-8 flex items-center">
      {loading ? (
         <span className="text-xs font-mono text-neon/50 animate-pulse tracking-widest">
            {connectionState || "INITIALIZING"}...
         </span>
      ) : (
        <span className="text-2xl font-mono font-bold text-white">
          {value !== undefined && value !== null ? value : "---"}
        </span>
      )}
    </div>

    {subtext && !loading && (
      <span className="text-[10px] font-mono text-gray-600 mt-1 z-10 relative">
        {subtext}
      </span>
    )}
  </motion.div>
);

const Signals = () => {
  const { data: github, loading: ghLoading } = useGitHubSignals();
  const { data: cf, loading: cfLoading } = useCodeforcesSignals();
  const [systemState, setSystemState] = useState("CONNECTING");

  // Simulate a realistic connection sequence
  useEffect(() => {
    if (ghLoading || cfLoading) {
        const states = ["CONNECTING", "HANDSHAKE", "SYNCING"];
        let i = 0;
        const interval = setInterval(() => {
            setSystemState(states[i % states.length]);
            i++;
        }, 800);
        return () => clearInterval(interval);
    } else {
        setSystemState("STREAM STABLE");
    }
  }, [ghLoading, cfLoading]);


  const lastActiveGH = github?.lastActive 
    ? formatDistanceToNow(new Date(github.lastActive), { addSuffix: true }) 
    : "Syncing...";

  const lastActiveCF = cf?.lastContest
    ? formatDistanceToNow(new Date(cf.lastContest), { addSuffix: true })
    : "Syncing...";

  return (
    <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${ghLoading || cfLoading ? "bg-yellow-500 animate-pulse" : "bg-neon"}`}></span>
                System Telemetry
            </h3>
            <span className="hidden md:block text-[10px] font-mono text-gray-600 uppercase">
                STATUS: {systemState}
            </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* GitHub Signals */}
            <SignalCard 
                label="Repositories" 
                value={github?.totalRepos} 
                loading={ghLoading} 
                connectionState="FETCHING"
                delay={0.1} 
            />
             <SignalCard 
                label="Active Systems" 
                value={github?.activeSystems} 
                loading={ghLoading} 
                connectionState="ANALYZING"
                delay={0.2} 
            />
             <SignalCard 
                label="Total Stars" 
                value={github?.totalStars} 
                loading={ghLoading} 
                connectionState="COUNTING"
                delay={0.3} 
            />
            
            {/* Codeforces Signals */}
             <SignalCard 
                label="CF MAX RATING" 
                value={cf?.maxRating} 
                subtext={cf?.rank ? `Rank: ${cf.rank}` : null}
                loading={cfLoading} 
                connectionState="PIGGYBACK"
                delay={0.4} 
            />
             <SignalCard 
                label="SOLVED (UNIQUE)" 
                value={cf?.uniqueSolved} 
                subtext={cf?.totalContests ? `${cf.totalContests} Contests` : null}
                loading={cfLoading} 
                connectionState="PARSING"
                delay={0.5} 
            />
            
            {/* Activity Timestamps */}
            <div className="col-span-2 md:col-span-1 flex flex-col justify-center pl-4 border-l border-neon/20">
                 <span className="text-[10px] font-mono text-gray-500 uppercase">Last Activity</span>
                 <div className="flex flex-col gap-1 mt-2">
                    <div className="flex justify-between text-xs font-mono text-gray-300">
                        <span>GIT</span>
                        <span>{ghLoading ? "..." : lastActiveGH}</span>
                    </div>
                     <div className="flex justify-between text-xs font-mono text-gray-300">
                        <span>CF</span>
                         <span>{cfLoading ? "..." : lastActiveCF}</span>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Signals;
