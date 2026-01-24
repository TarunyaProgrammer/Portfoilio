import { motion } from "framer-motion";
import { useGitHubSignals } from "../../hooks/useGitHubSignals";
import { useCodeforcesSignals } from "../../hooks/useCodeforcesSignals";
import { formatDistanceToNow } from "date-fns";

const SignalCard = ({ label, value, subtext, loading, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col p-4 border-l border-white/10"
  >
    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">
      {label}
    </span>
    {loading ? (
      <div className="h-8 w-24 bg-white/5 animate-pulse rounded" />
    ) : (
      <span className="text-2xl font-mono font-bold text-white">
        {value}
      </span>
    )}
    {subtext && (
      <span className="text-[10px] font-mono text-gray-600 mt-1">
        {subtext}
      </span>
    )}
  </motion.div>
);

const Signals = () => {
  const { data: github, loading: ghLoading } = useGitHubSignals();
  const { data: cf, loading: cfLoading } = useCodeforcesSignals();

  const lastActiveGH = github?.lastActive 
    ? formatDistanceToNow(new Date(github.lastActive), { addSuffix: true }) 
    : "Syncing...";

  const lastActiveCF = cf?.lastContest
    ? formatDistanceToNow(new Date(cf.lastContest), { addSuffix: true })
    : "Offline";

  return (
    <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm relative z-20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h3 className="font-mono text-xs text-neon uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse"></span>
                System Telemetry
            </h3>
            <span className="hidden md:block text-[10px] font-mono text-gray-600">
                LIVE_DATA_STREAM // GITHUB_CF
            </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* GitHub Signals */}
            <SignalCard 
                label="Repositories" 
                value={github?.totalRepos || 0} 
                loading={ghLoading} 
                delay={0.1} 
            />
             <SignalCard 
                label="Active Systems" 
                value={github?.activeSystems || 0} 
                loading={ghLoading} 
                delay={0.2} 
            />
             <SignalCard 
                label="Total Stars" 
                value={github?.totalStars || 0} 
                loading={ghLoading} 
                delay={0.3} 
            />
            
            {/* Divider for mobile logic implied by grid, or explicitly separate if needed */}
            
            {/* Codeforces Signals */}
             <SignalCard 
                label="CF Rating" 
                value={cf?.rating || "---"} 
                subtext={cf?.rank ? `Rank: ${cf.rank}` : null}
                loading={cfLoading} 
                delay={0.4} 
            />
             <SignalCard 
                label="Contests" 
                value={cf?.totalContests || 0} 
                loading={cfLoading} 
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
