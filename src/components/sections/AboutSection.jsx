import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Highlighter } from "@/components/ui/highlighter";
import {
  ShieldCheck,
  Zap,
  Code2,
  Award,
  Terminal,
  Flame,
  GitPullRequest,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  const iconMap = {
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    Code2: Code2,
  };

  const smoothEase = [0.22, 1, 0.36, 1];

  const achievements = [
    {
      icon: Award,
      org: "Newton School of Technology",
      score: "8.83 CGPA",
      desc: "B.Tech in Computer Science & Artificial Intelligence (2024 \u2013 2028)",
      tag: "Academic Honors",
    },
    {
      icon: Flame,
      org: "Google Summer of Code '26",
      score: "Selected Developer",
      desc: "C2SI contributor architecting telemetry & serverless webhook engines",
      tag: "Open Source",
    },
    {
      icon: GitPullRequest,
      org: "GSSoC & SSoC Mentorship",
      score: "100+ Mentored",
      desc: "Guided 100+ developers on distributed git workflows and architecture",
      tag: "Leadership",
    },
    {
      icon: Trophy,
      org: "Competitive Problem Solving",
      score: "939+ Rating",
      desc: "Active competitive programmer on Codeforces & LeetCode in DSA & graphs",
      tag: "Algorithms",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ═══ TELEMETRY METRIC STRIP (FLOWS IN WITH STAGGER) ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono">
          {portfolioData.metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: smoothEase }}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center shadow-lg hover:border-white/20 transition-colors"
            >
              <span className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs text-zinc-400 font-sans mt-0.5 font-medium">
                {metric.label}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 font-semibold uppercase tracking-wider">
                {metric.highlight}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="space-y-3"
        >
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            01 // PROFILE &amp; PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering for Reliability.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            I specialize in full-stack architecture, real-time event-driven systems, and deterministic AI applications that thrive under production load.
          </p>
        </motion.div>

        {/* 2-Column Grid: Bio & Achievements Left, Philosophy Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio + 4 Key Honors */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Bio Narrative Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-5 text-zinc-300 leading-relaxed font-normal text-sm sm:text-base shadow-xl">
              <p>
                Currently developing as a{" "}
                <Highlighter action="highlight" color="rgba(59, 130, 246, 0.25)">
                  Google Summer of Code (GSoC &apos;26)
                </Highlighter>{" "}
                contributor for C2SI, architecting webhook-driven backends, caching protocols, and distributed services.
              </p>
              <p>
                Pursuing <strong className="text-white font-semibold">B.Tech in Computer Science &amp; Artificial Intelligence</strong> at Newton School of Technology (8.83 CGPA). My focus bridges system design, low-latency APIs, and human-centric developer experiences.
              </p>
              <p>
                I thrive in the messy reality of engineering—unclear edge cases, evolving data pipelines, and building software that feels{" "}
                <Highlighter action="underline" color="#60a5fa">
                  deterministic, instant, and impossible to break
                </Highlighter>.
              </p>
            </div>

            {/* ═══ EXPANDED ACHIEVEMENTS & HONORS MATRIX ═══ */}
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Key Credentials &amp; Milestones
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievements.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.org}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                      className="p-4 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-2.5 font-mono text-xs shadow-md"
                    >
                      <div className="flex items-center justify-between gap-1 text-zinc-400 border-b border-white/5 pb-2">
                        <span className="text-white font-semibold flex items-center gap-1.5 truncate text-[11px]">
                          <Icon className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                          <span className="truncate">{item.org}</span>
                        </span>
                        <span className="text-emerald-400 font-bold text-[11px] shrink-0">
                          {item.score}
                        </span>
                      </div>
                      <p className="text-zinc-400 font-sans text-[11px] leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Philosophy Cards Flow in from Right */}
          <div className="lg:col-span-7 space-y-4">
            {(portfolioData.personal?.philosophy || portfolioData.philosophy || []).map((item, index) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: index * 0.12, ease: smoothEase }}
                >
                  <SpotlightCard
                    spotlightColor="rgba(59, 130, 246, 0.12)"
                    className="p-6 sm:p-7 border border-white/10 hover:border-white/20 bg-zinc-900/60 backdrop-blur-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-zinc-800 border border-white/10 text-white shrink-0 mt-0.5">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="font-semibold text-base sm:text-lg text-white tracking-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
