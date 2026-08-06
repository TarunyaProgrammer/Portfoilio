import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState("philosophy");

  const mindspaceData = {
    philosophy: {
      title: "Work Principles",
      subtitle: "The rules I build by.",
      items: [
        {
          label: "Readable > Clever",
          desc: "Code is read 10x more than it's written. Optimize for the engineer who inherits it.",
        },
        {
          label: "Design for Change",
          desc: "Build systems that are easy to refactor, not systems that try to predict the next two years.",
        },
        {
          label: "Interfaces are Systems",
          desc: "UX state, font scaling, and network latency are architectural details, not polishes.",
        },
        {
          label: "Observe first",
          desc: "Half of the interesting engineering problems start with watching how people actually use the product.",
        },
      ],
    },
    friction: {
      title: "Things I Avoid",
      subtitle: "Friction that compromises long-term systems.",
      items: [
        {
          label: "Magic numbers",
          desc: "Hardcoded assumptions that break when the screen scales or requirements pivot.",
        },
        {
          label: "Works on my machine",
          desc: "If a system can't be set up in a single command, the developer experience is broken.",
        },
        {
          label: "SaaS buzzwords",
          desc: "Corporate filler over authentic execution. Build what is needed.",
        },
        {
          label: "Clever over engineering",
          desc: "Adding complexity to solve an edge-case that could be handled by simple logic.",
        },
      ],
    },
    software: {
      title: "Good Software",
      subtitle: "What digital systems should feel like.",
      items: [
        {
          label: "Predictable Failure",
          desc: "Explain error states clearly. Don't leave users with an infinite spinner.",
        },
        {
          label: "Calmness",
          desc: "Predictable, fast, and does not demand constant user attention.",
        },
        {
          label: "Graceful Aging",
          desc: "Can be updated months later without breaking three unrelated modules.",
        },
        {
          label: "Self-explanatory UI",
          desc: "Let the layout, hierarchy, and micro-interactions tell the story.",
        },
      ],
    },
    rabbitHoles: {
      title: "Current Focus",
      subtitle: "Topics I'm currently exploring.",
      items: [
        {
          label: "Local-First Syncing",
          desc: "CRDTs, optimistic UI updates, and building truly robust offline states.",
        },
        {
          label: "Browser Capabilities",
          desc: "WASM SQLite databases, container queries, and CSS anchor positioning.",
        },
        {
          label: "Layout Stability",
          desc: "Eliminating Cumulative Layout Shift (CLS) on dynamic content streams.",
        },
        {
          label: "Vestibular Accessibility",
          desc: "Configuring animations that honor prefers-reduced-motion media query variables.",
        },
      ],
    },
  };

  return (
    <section className="py-28 md:py-40 bg-[#0d0d0f] text-white relative z-10 overflow-hidden font-pixelify border-b border-white/10 selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8 font-pixelify">
              About <span className="text-[#ff2a2a]">Me</span>
            </h2>
            <div className="space-y-6 max-w-xl font-sans">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                I like building things that survive real usage. Not demo-day
                perfect. Not <strong className="text-[#fbd000] font-bold bg-[#ff2a2a]/20 px-1.5 py-0.5 border border-[#ff2a2a]/40">“works on my machine”</strong> perfect. The kind of systems
                people slowly start depending on without thinking about it.
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                I enjoy the <strong className="text-[#00ff66] font-bold bg-[#00ff66]/10 px-1.5 py-0.5 border border-[#00ff66]/30">messy side of engineering</strong> — unclear requirements,
                evolving products, edge cases nobody planned for, and figuring
                out how to keep things understandable as they grow.
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                Most of my interest sits somewhere between engineering, product
                decisions, and interface design. I care a lot about clarity — in
                code, spacing, naming, and user experience.
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium">
                I’m less interested in building “impressive” software and more
                interested in building products that feel <strong className="text-white font-bold bg-[#ff2a2a] px-1.5 py-0.5">calm, fast,
                predictable, and easy to trust</strong>.
              </p>

              <div className="flex gap-8 pt-6 font-mono text-xs font-bold">
                <a
                  href="https://github.com/TarunyaProgrammer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#ff2a2a] uppercase tracking-[0.2em] border-b border-white/20 hover:border-[#ff2a2a] pb-1 transition-all"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/tarunyakesharwani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#0066ff] uppercase tracking-[0.2em] border-b border-white/20 hover:border-[#0066ff] pb-1 transition-all"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Workbench Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="border-2 border-white/20 p-6 md:p-10 bg-[#141417] relative flex flex-col justify-between min-h-[500px] shadow-[4px_4px_0px_#ff2a2a] rounded-none">
              {/* Technical corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#ff2a2a]" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#ff2a2a]" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#ff2a2a]" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#ff2a2a]" />

              <div>
                <span className="text-[10px] font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.4em] block mb-6">
                  WORKBENCH MATRIX v2.0
                </span>

                {/* Tabs Row */}
                <div className="flex flex-wrap gap-2 mb-8 font-mono">
                  {Object.keys(mindspaceData).map((tabKey) => {
                    const labelMap = {
                      philosophy: "Principles",
                      friction: "Friction",
                      software: "Good Software",
                      rabbitHoles: "Current Focus"
                    };
                    return (
                      <button
                        key={tabKey}
                        onClick={() => setActiveTab(tabKey)}
                        className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all ${
                          activeTab === tabKey
                            ? "bg-[#ff2a2a] text-white border-white shadow-md"
                            : "bg-[#0d0d0f] text-white/50 border-white/10 hover:border-white/40 hover:text-white"
                        }`}
                      >
                        {labelMap[tabKey]}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-1 font-pixelify">
                        {mindspaceData[activeTab].title}
                      </h3>
                      <p className="text-xs font-mono text-[#fbd000]">
                        {mindspaceData[activeTab].subtitle}
                      </p>
                    </div>

                    {/* 2x2 grid layout for card stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 font-sans">
                      {mindspaceData[activeTab].items.map((item, index) => (
                        <div
                          key={index}
                          className="group/item border border-white/10 p-4 bg-[#0d0d0f] hover:border-[#ff2a2a] transition-all duration-300 relative flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex justify-between items-baseline mb-2">
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                                {item.label}
                              </h4>
                              <span className="text-[9px] font-mono text-[#00ff66]">
                                [0{index + 1}]
                              </span>
                            </div>
                            <p className="text-xs font-medium text-white/70 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Status bar */}
              <div className="border-t border-white/10 pt-4 mt-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-white/40">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00ff66] rounded-full animate-pulse" />
                  STATUS: OPERATIONAL
                </span>
                <span className="text-[#ff2a2a]">COORD: [45.10.CF]</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
