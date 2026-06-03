import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Redux", "Zustand", "Tailwind", "PWAs"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Socket.io", "REST APIs", "JWT"] },
  { category: "Tooling", items: ["Vite", "Vercel", "Netlify", "Firebase", "Git", "Figma"] },
  { category: "Real-time", items: ["WebSockets", "Live Presence", "Secure Sessions", "Instant Delivery"] },
  { category: "Languages", items: ["JavaScript", "TypeScript", "HTML5", "CSS3"] },
  { category: "Core", items: ["Offline-first", "Local-first", "Scalable", "Production-ready"] },
];

const skillDetails = {
  // Frontend
  "React": { level: 95, metric: "Render latency: 0.12ms", logs: ["SYSTEM: Initialising React client", "PROP: Synchronizing state trees", "HOOK: Component mount complete", "STATUS: Render lifecycle normal"] },
  "TypeScript": { level: 92, metric: "Type integrity: 100%", logs: ["COMPILER: Checking static AST", "WARN: 0 errors, 0 warnings", "TYPES: Generics validated", "STATUS: Compile verification OK"] },
  "Redux": { level: 85, metric: "State flow: Unidirectional", logs: ["STORE: Creating global store", "MIDDLEWARE: Injecting Thunk/Saga", "ACTION: Dispatch channel ready", "STATUS: Store synced"] },
  "Zustand": { level: 90, metric: "Footprint: 1.2kB", logs: ["ZUSTAND: Initialising hook store", "STORE: Selectors memoized", "STATE: Transient updates active", "STATUS: Dispatch loop optimized"] },
  "Tailwind": { level: 95, metric: "JIT Compiler: Active", logs: ["TAILWIND: Purging unused styles", "BUILD: CSS payload 4.2kB", "MEDIA: Responsive breakpoints set", "STATUS: Style utility loaded"] },
  "PWAs": { level: 80, metric: "Offline Cache: Ready", logs: ["SW: Registering service worker", "CACHE: Pre-caching static assets", "SYNC: Background sync channel open", "STATUS: Client offline-enabled"] },
  
  // Backend
  "Node.js": { level: 92, metric: "Loop latency: 0.8ms", logs: ["NODE: Launching V8 execution", "THREAD: Worker pool active", "EVENT: Event loop running", "STATUS: Async IO operational"] },
  "Express": { level: 90, metric: "Middleware stack: 4 layers", logs: ["EXPRESS: Binding Router modules", "CORS: Policy headers set", "PARSER: Body-parser initialized", "STATUS: Listening on port 3000"] },
  "MongoDB": { level: 85, metric: "Query speed: 1.5ms", logs: ["MONGO: Establishing connection pool", "INDEX: Scanned database collections", "SHARD: Primary node replication active", "STATUS: Query response OK"] },
  "Socket.io": { level: 92, metric: "Socket latency: 6ms", logs: ["SOCKET: WebSocket handshake accepted", "ROOM: Joined client session rooms", "PULSE: Broadcasting state updates", "STATUS: Direct socket connection online"] },
  "REST APIs": { level: 95, metric: "Compliance: OpenAPI v3", logs: ["API: Mapping REST endpoints", "AUTH: Token-based middleware set", "RESPONSE: Status 200 payload valid", "STATUS: Gateway operational"] },
  "JWT": { level: 90, metric: "Cipher: RS256 signing", logs: ["JWT: Verifying authorization headers", "DECODE: Payload parsed", "EXPIRY: Token lifetime valid", "STATUS: Session auth valid"] },
  
  // Tooling
  "Vite": { level: 95, metric: "Cold start: 8ms", logs: ["VITE: Initialising bundler", "HMR: Socket server listening", "DEPS: Pre-bundling dependencies", "STATUS: Hot Module Replacement online"] },
  "Vercel": { level: 90, metric: "Edge response: 12ms", logs: ["VERCEL: Compiling edge routing", "DEPLOY: Syncing build artifacts", "CDN: Global edge cache flushed", "STATUS: Edge functions warm"] },
  "Netlify": { level: 85, metric: "Build SLA: 99.9%", logs: ["NETLIFY: Webhook trigger accepted", "ASSETS: Image optimization ready", "HEADERS: Redirect rules verified", "STATUS: Deployed build live"] },
  "Firebase": { level: 88, metric: "Firestore sync: 4ms", logs: ["FIREBASE: Checking SDK config", "AUTH: Anon sign-in validated", "SYNC: Firestore listeners active", "STATUS: DB socket connected"] },
  "Git": { level: 90, metric: "Branch strategy: Trunk", logs: ["GIT: Fetching origin metadata", "HEAD: Rebase successful", "INTEGRITY: Trees validation correct", "STATUS: Working directory clean"] },
  "Figma": { level: 80, metric: "Design tokens: Synced", logs: ["FIGMA: Pulling style declarations", "VECTORS: Rendering SVG paths", "LAYOUT: Autolayout rules applied", "STATUS: Assets synchronized"] },
  
  // Real-time
  "WebSockets": { level: 95, metric: "Data frame loss: 0%", logs: ["WS: Establishing connection", "UPGRADE: HTTP connection upgraded", "FRAMES: Bi-directional socket open", "STATUS: Packet transmission active"] },
  "Live Presence": { level: 90, metric: "Heartbeat cycle: 5s", logs: ["PRESENCE: Broadcasting online status", "PEERS: Syncing client node list", "STATUS: Active user count synced"] },
  "Secure Sessions": { level: 92, metric: "Key exchange: ECDHE", logs: ["SECURE: TLS 1.3 handshake complete", "CIPHER: AES-256-GCM encrypted", "STATUS: Session secure"] },
  "Instant Delivery": { level: 90, metric: "Throughput: 15k/s", logs: ["QUEUE: Processing delivery pipeline", "ACK: Packet delivery receipt read", "STATUS: Pipeline clear"] },
  
  // Languages
  "JavaScript": { level: 95, metric: "Engine: Chrome V8", logs: ["JS: Compiling JIT byte-code", "GC: Memory sweep finished", "RUNTIME: ESNext features active", "STATUS: Thread execution stable"] },
  "HTML5": { level: 95, metric: "Semantic index: 100%", logs: ["DOM: Validating HTML hierarchy", "ARIA: Accessibility trees built", "STATUS: DOM compilation valid"] },
  "CSS3": { level: 90, metric: "Render cycles: 60fps", logs: ["CSS: Parsing styles declaration", "GPU: Layer composition enabled", "STATUS: Stylesheet paint complete"] },
  
  // Core
  "Offline-first": { level: 92, metric: "Sync strategy: Optimistic", logs: ["OFFLINE: Service worker intercepting", "DB: Initialising IndexedDB storage", "SYNC: Local queue synchronized", "STATUS: Offline mode operational"] },
  "Local-first": { level: 90, metric: "Latency: 0ms (local)", logs: ["LOCAL: Local replication online", "CRDT: Syncing state resolution", "STATUS: Zero-network operations valid"] },
  "Scalable": { level: 95, metric: "Availability: 99.99%", logs: ["SCALE: Balancing horizontal clusters", "MONITOR: Latency metrics recorded", "STATUS: Node pool scaling stable"] },
  "Production-ready": { level: 95, metric: "Test coverage: 95%", logs: ["PROD: Run production sanity tests", "SENTRY: Error tracking reporting active", "STATUS: Build verification complete"] }
};

const SkillsArchive = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const activeSkillsList = skills.find(s => s.category === activeCategory)?.items || [];
  const [activeSkill, setActiveSkill] = useState(activeSkillsList[0] || "");
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [logTrigger, setLogTrigger] = useState(0);

  // Sync active skill when category changes
  useEffect(() => {
    const list = skills.find(s => s.category === activeCategory)?.items || [];
    if (list.length > 0) {
      setActiveSkill(list[0]);
    }
  }, [activeCategory]);

  // Simulate console diagnostic typewriter log streams
  useEffect(() => {
    setDisplayedLogs([]);
    const activeData = skillDetails[activeSkill] || {
      level: 80,
      metric: "System metric: Active",
      logs: ["SYS: Initialising module...", "CHECK: Loading resources...", "STATUS: Active"]
    };
    
    let currentLineIndex = 0;
    const logsToPrint = activeData.logs;
    
    const interval = setInterval(() => {
      if (currentLineIndex < logsToPrint.length) {
        setDisplayedLogs(prev => [...prev, logsToPrint[currentLineIndex]]);
        currentLineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [activeSkill, logTrigger]);

  const activeSkillData = skillDetails[activeSkill] || {
    level: 80,
    metric: "System metric: Active",
    logs: ["SYS: Initialising module...", "CHECK: Loading resources...", "STATUS: Active"]
  };

  const getLedBars = (level) => {
    // Return filled vs empty indicator segments (out of 10)
    const filledCount = Math.round(level / 10);
    return Array.from({ length: 10 }, (_, i) => i < filledCount);
  };

  return (
    <section className="py-20 md:py-52 bg-white border-t border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-16">
        <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-8 md:mb-12">
          Technical Inventory
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-black tracking-tighter mb-16 md:mb-24 leading-[0.85]">
          Language & <br />
          <span className="italic font-normal opacity-20">Protocols.</span>
        </h2>

        {/* Tactile Category Selector Tabs */}
        <div className="flex border-b border-black/10 pb-2 mb-16 overflow-x-auto scrollbar-none gap-8 md:gap-12 select-none">
          {skills.map((s) => {
            const isActive = s.category === activeCategory;
            return (
              <button
                key={s.category}
                onClick={() => setActiveCategory(s.category)}
                className={`relative pb-4 text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? "text-black" : "text-black/30 hover:text-black/60"
                }`}
              >
                {s.category}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Double-Column Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Interactive Skills Selector Board */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-widest mb-2 px-2 flex justify-between">
              <span>System Register // Index</span>
              <span>Metric</span>
            </div>
            
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-2"
                >
                  {activeSkillsList.map((item) => {
                    const isSelected = activeSkill === item;
                    const itemData = skillDetails[item] || { level: 80 };
                    return (
                      <button
                        key={item}
                        onClick={() => {
                          setActiveSkill(item);
                          setLogTrigger(prev => prev + 1); // re-trigger logs typewriter animation on click
                        }}
                        className={`w-full p-4 md:p-6 text-left border flex items-center justify-between gap-4 transition-all duration-300 group rounded-none relative overflow-hidden ${
                          isSelected
                             ? "bg-black border-black text-white"
                             : "bg-zinc-50/50 border-black/5 hover:border-black/20 text-black/80 hover:bg-zinc-50"
                        }`}
                      >
                        {/* Interactive hover line */}
                        {!isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black/0 group-hover:bg-black/20 transition-colors" />
                        )}
                        
                        <div className="flex flex-col gap-2 z-10 min-w-0">
                          <span className="text-sm md:text-base font-bold font-mono tracking-tight group-hover:pl-1 transition-all duration-300 truncate">
                            {item}
                          </span>
                          
                          {/* Segmented LED matrix indicator */}
                          <div className="flex gap-0.5 md:gap-1 items-center overflow-x-auto scrollbar-none">
                            {getLedBars(itemData.level).map((filled, idx) => (
                              <span
                                key={idx}
                                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-none transition-colors duration-300 shrink-0 ${
                                  isSelected
                                    ? filled ? "bg-white" : "bg-white/20"
                                    : filled ? "bg-black" : "bg-black/10"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-wider opacity-60 group-hover:opacity-100 transition-opacity z-10 shrink-0 uppercase">
                          {(skillDetails[item] || { metric: "Active" }).metric.split(":")[0]}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Telemetry Monitor Console */}
          <div className="lg:col-span-7 border border-black/10 bg-zinc-50/20 p-5 md:p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Grid Pattern Accent */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, black 1px, transparent 1px),
                  linear-gradient(to bottom, black 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px"
              }}
            />

            <div className="relative z-10 space-y-8">
              
              {/* Header Telemetry Telemetry Bar */}
              <div className="flex justify-between items-center border-b border-black/5 pb-4">
                <span className="text-[8px] md:text-[10px] font-mono font-bold tracking-widest text-black/40">
                  SYSTEM DIAGNOSTIC CONSOLE v1.0.42
                </span>
                <div className="flex items-center gap-2">
                  <motion.span 
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span className="text-[8px] md:text-[9px] font-mono font-bold text-green-600 uppercase tracking-widest">
                    Telemetry
                  </span>
                </div>
              </div>

              {/* Title and stats layout */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-black/30 uppercase tracking-[0.3em]">
                    Active Module
                  </span>
                  <h3 className="text-3xl md:text-5xl font-mono font-bold text-black tracking-tighter">
                    {activeSkill}
                  </h3>
                  <div className="text-xs font-mono text-black/50 font-bold tracking-wide">
                    Category: <span className="text-black uppercase">{activeCategory}</span>
                  </div>
                </div>

                {/* SVG Radial proficiency loader */}
                <div className="flex items-center gap-4 bg-white border border-black/5 p-4 self-start md:self-auto">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="rgba(0, 0, 0, 0.04)"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="black"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 26}
                        initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - activeSkillData.level / 100) }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute text-xs font-mono font-bold text-black">
                      {activeSkillData.level}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[8px] font-mono font-bold text-black/30 uppercase tracking-widest">Utilisation</span>
                    <span className="text-xs font-mono font-bold text-black">Core Strength</span>
                  </div>
                </div>
              </div>

              {/* Performance logs output block */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-widest">
                  Diagnostic Log Output
                </span>
                <div className="w-full bg-black p-4 md:p-6 font-mono text-[11px] md:text-xs text-zinc-400 min-h-[160px] flex flex-col justify-start gap-2 select-text selection:bg-zinc-800">
                  {displayedLogs.map((log, i) => (
                    <div key={i} className="flex gap-2 items-baseline">
                      <span className="text-green-500 opacity-60 shrink-0">&gt;</span>
                      <span className="break-all">{log}</span>
                    </div>
                  ))}
                  {displayedLogs.length < (activeSkillData.logs || []).length && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-1.5 h-3 bg-zinc-400 inline-block self-end mt-1"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Visual Hardware Bench Coordinates and Metric Footer */}
            <div className="border-t border-black/5 pt-6 mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative">
              <div className="flex flex-col font-mono text-[10px] text-black/40 font-bold">
                <span>PRIMARY METRIC:</span>
                <span className="text-black font-extrabold uppercase tracking-wide mt-1">
                  {activeSkillData.metric}
                </span>
              </div>
              <div className="flex gap-1.5 self-end md:self-auto select-none opacity-40 hover:opacity-100 transition-opacity">
                {Array.from({ length: 4 }).map((_, r) => (
                  <div key={r} className="flex flex-col gap-1.5">
                    {Array.from({ length: 4 }).map((_, c) => {
                      const isActivePoint = (r + c) % 3 === 0;
                      return (
                        <span
                          key={c}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActivePoint ? "bg-black animate-pulse" : "bg-black/10"
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsArchive;
