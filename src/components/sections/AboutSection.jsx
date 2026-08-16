import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Highlighter } from "@/components/ui/highlighter";
import {
  ShieldCheck,
  Zap,
  Code2,
  Award,
  Flame,
  GitPullRequest,
  Trophy,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        {/* ═══ TOP TELEMETRY METRICS ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono">
          {portfolioData.metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
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

        {/* 2-Column Split: Bio Narrative & Architecture Philosophy Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="lg:col-span-5 h-full"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-5 text-zinc-300 leading-relaxed font-normal text-sm sm:text-base shadow-xl h-full flex flex-col justify-between">
              <p>
                Currently developing as a{" "}
                <Highlighter action="highlight">
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
          </motion.div>

          {/* Right Column: Philosophy Cards */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            {(portfolioData.personal?.philosophy || portfolioData.philosophy || []).map((item, index) => {
              const Icon = iconMap[item.icon] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: smoothEase }}
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

        {/* ═══ FULL-WIDTH WIDESCREEN ACHIEVEMENTS & HONORS MATRIX ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="space-y-4 pt-4"
        >
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Key Credentials &amp; Honors
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.org}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: smoothEase }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="h-full"
                >
                  <SpotlightCard
                    spotlightColor="rgba(245, 158, 11, 0.22)"
                    className={cn(
                      "h-full p-5 rounded-2xl bg-gradient-to-b from-zinc-900/60 to-zinc-950/80",
                      "border border-white/10 hover:border-amber-500/45 hover:shadow-[0_14px_35px_-8px_rgba(245,158,11,0.25)]",
                      "transition-all duration-300 flex flex-col justify-between space-y-3 font-mono text-xs group cursor-default backdrop-blur-md"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 group-hover:border-amber-500/25 transition-colors">
                      <span className="text-white font-semibold flex items-center gap-2 text-xs">
                        <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300 shrink-0">
                          <Icon className="w-4 h-4 text-amber-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                        </span>
                        <span className="group-hover:text-amber-100 transition-colors leading-snug">{item.org}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs shrink-0 shadow-sm group-hover:bg-amber-500/25 group-hover:border-amber-400/60 group-hover:text-amber-100 group-hover:shadow-[0_0_14px_rgba(245,158,11,0.4)] transition-all duration-300">
                        {item.score}
                      </span>
                    </div>
                    <p className="text-zinc-400 font-sans text-xs leading-relaxed group-hover:text-zinc-300 transition-colors">
                      {item.desc}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
