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
    <section className="py-36 md:py-52 bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-12">
              About Me
            </h2>
            <div className="space-y-10 max-w-xl about-text">
              <p className="text-lg md:text-xl text-black/20 leading-relaxed font-medium">
                I like building things that survive real usage. Not demo-day
                perfect. Not <strong className="text-black font-extrabold bg-[#D8F1A0]/30 px-1.5 py-0.5 border-b border-black/10">“works on my machine”</strong> perfect. The kind of systems
                people slowly start depending on without thinking about it.
              </p>
              <p className="text-lg md:text-xl text-black/20 leading-relaxed font-medium">
                I enjoy the <strong className="text-black font-extrabold bg-[#D8F1A0]/30 px-1.5 py-0.5 border-b border-black/10">messy side of engineering</strong> — unclear requirements,
                evolving products, edge cases nobody planned for, and figuring
                out how to keep things understandable as they grow.
              </p>
              <p className="text-lg md:text-xl text-black/20 leading-relaxed font-medium">
                Most of my interest sits somewhere between engineering, product
                decisions, and interface design. I care a lot about clarity — in
                code, spacing, naming, and user experience.
              </p>
              <p className="text-lg md:text-xl text-black/20 leading-relaxed font-medium">
                I’m less interested in building “impressive” software and more
                interested in building products that feel <strong className="text-black font-extrabold bg-[#D8F1A0]/30 px-1.5 py-0.5 border-b border-black/10">calm, fast,
                predictable, and easy to trust</strong>.
              </p>

              <div className="flex gap-8 pt-8">
                <a
                  href="https://github.com/TarunyaProgrammer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-black/5 hover:border-black pb-1 transition-all"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tarunyakesharwani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-black/5 hover:border-black pb-1 transition-all"
                >
                  LinkedIn
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
            <div className="border border-black/10 p-8 md:p-12 bg-white relative flex flex-col justify-between min-h-[500px] shadow-2xl">
              {/* Technical corner brackets */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-black/20" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-black/20" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-black/20" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-black/20" />

              <div>
                <span className="text-[9px] font-black text-black/30 uppercase tracking-[0.5em] block mb-8">
                  Mindspace / Workbench v1.0
                </span>

                {/* Tabs Row (Folder Tab styling) */}
                <div className="flex flex-wrap gap-2 mb-10">
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
                        className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
                          activeTab === tabKey
                            ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
                            : "bg-zinc-50 text-black/40 border-black/10 hover:border-black/30 hover:text-black/60"
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
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-2xl font-bold uppercase tracking-tighter text-black mb-1">
                        {mindspaceData[activeTab].title}
                      </h3>
                      <p className="text-xs font-semibold text-black/40 italic">
                        {mindspaceData[activeTab].subtitle}
                      </p>
                    </div>

                    {/* 2x2 tactile grid layout for card stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      {mindspaceData[activeTab].items.map((item, index) => (
                        <div
                          key={index}
                          className="group/item border border-black/[0.06] p-6 bg-zinc-50/50 hover:bg-white hover:border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-500 relative flex flex-col justify-between"
                        >
                          {/* Card Corner Brackets on Hover */}
                          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

                          <div>
                            <div className="flex justify-between items-baseline mb-3">
                              <h4 className="text-xs font-black text-black uppercase tracking-wider">
                                {item.label}
                              </h4>
                              <span className="text-[9px] font-mono font-bold text-black/20 group-hover/item:text-black/40 transition-colors">
                                [0{index + 1}]
                              </span>
                            </div>
                            <p className="text-[11px] font-medium text-black/50 leading-relaxed">
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
              <div className="border-t border-black/5 pt-6 mt-12 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-black/20">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  STATUS: OPERATIONAL
                </span>
                <span>COORD: [45.10.CF]</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
