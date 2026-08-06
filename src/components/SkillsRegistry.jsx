import React from "react";
import { motion } from "framer-motion";
import { audioSynth } from "../utils/audioSynth";

// Professional Vector SVG Icons (Zero Emojis)
const FrontendIcon = () => (
  <svg className="w-5 h-5 text-[#ff2a2a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const BackendIcon = () => (
  <svg className="w-5 h-5 text-[#00e5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-5 h-5 text-[#00ff66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const DevOpsIcon = () => (
  <svg className="w-5 h-5 text-[#fbd000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const skillCategories = [
  {
    title: "Frontend Systems",
    icon: <FrontendIcon />,
    skills: [
      { name: "React 18", level: "99%", tag: "UI CORE" },
      { name: "TypeScript", level: "95%", tag: "TYPE SAFETY" },
      { name: "Vite & Next.js", level: "92%", tag: "BUNDLING" },
      { name: "Tailwind CSS", level: "98%", tag: "ATOMIC STYLES" },
      { name: "Framer Motion & GSAP", level: "90%", tag: "KINETIC MOTION" },
      { name: "Lenis", level: "88%", tag: "SMOOTH SCROLL" },
    ],
  },
  {
    title: "Backend & Microservices",
    icon: <BackendIcon />,
    skills: [
      { name: "Node.js & Express", level: "96%", tag: "RUNTIME" },
      { name: "NestJS", level: "90%", tag: "ARCHITECTURE" },
      { name: "Rust", level: "85%", tag: "LOW LATENCY" },
      { name: "REST & WebSockets", level: "94%", tag: "REAL-TIME I/O" },
      { name: "Zero-Copy Parsing", level: "88%", tag: "PERFORMANCE" },
      { name: "Nodemailer", level: "90%", tag: "EMAIL INFRA" },
    ],
  },
  {
    title: "AI & Autonomous Agents",
    icon: <AIIcon />,
    skills: [
      { name: "Google Antigravity (AGY)", level: "98%", tag: "MULTI-AGENT" },
      { name: "Gemini API & Firebase AI", level: "95%", tag: "MULTIMODAL" },
      { name: "LangChain", level: "90%", tag: "AGENTIC CHAINS" },
      { name: "Structured Outputs", level: "92%", tag: "JSON SCHEMAS" },
      { name: "Vector Databases", level: "88%", tag: "RAG & MEMORY" },
      { name: "Prompt Engineering", level: "96%", tag: "SYSTEM LOGIC" },
    ],
  },
  {
    title: "Cloud, Databases & DevOps",
    icon: <DevOpsIcon />,
    skills: [
      { name: "Cloud Firestore & SQL", level: "92%", tag: "DATABASES" },
      { name: "MongoDB", level: "90%", tag: "NOSQL" },
      { name: "Docker & Containers", level: "88%", tag: "CONTAINERS" },
      { name: "Vercel & App Hosting", level: "96%", tag: "DEPLOYMENT" },
      { name: "GitHub Actions", level: "90%", tag: "CI/CD PIPELINES" },
      { name: "Content Security Policy", level: "94%", tag: "SECURITY" },
    ],
  },
];

const SkillsRegistry = () => {
  return (
    <section className="py-24 md:py-36 bg-[#0d0d0f] text-white border-b border-white/10 font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00ff66] rounded-none inline-block animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#00ff66] uppercase tracking-widest">
                SYSTEM CAPABILITIES MATRIX
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-pixelify uppercase">
              Tech Stack & <span className="text-[#ff2a2a]">Capabilities</span>
            </h2>
          </div>
          <div className="text-xs font-mono font-bold bg-[#141417] text-[#fbd000] px-4 py-2 border border-white/20">
            STATUS: 100% UNLOCKED
          </div>
        </div>

        {/* Clean Unified Monochromatic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="border-2 border-white/20 bg-[#141417] p-6 md:p-8 space-y-6 shadow-[4px_4px_0px_#000]"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#0d0d0f] border border-white/10">
                    {category.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-pixelify text-white uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#0d0d0f] text-white/60 px-2.5 py-1 border border-white/10">
                  {category.skills.length} MODULES
                </span>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => audioSynth.playCoinSound()}
                    className="border border-white/10 bg-[#0d0d0f] hover:border-white hover:bg-[#1a1a1e] p-3.5 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-xs font-sans text-white group-hover:text-[#ff2a2a]">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-bold text-[#00ff66]">
                        {skill.level}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-white/40 group-hover:text-white/80 mt-2 uppercase">
                      [{skill.tag}]
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsRegistry;
