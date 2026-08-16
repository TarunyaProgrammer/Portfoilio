import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShieldCheck, Zap, Code2, Award, ExternalLink } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold tracking-wider uppercase">
            Profile &amp; Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering for Reliability.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            I specialize in full-stack architecture, real-time event-driven systems, and deterministic AI applications that thrive under production load.
          </p>
        </div>

        {/* 2-Column Grid: Bio Left, Philosophy Cards Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-5 text-zinc-300 leading-relaxed font-normal text-sm sm:text-base">
              <p>
                Currently developing as a <strong className="text-white font-semibold">Google Summer of Code (GSoC &apos;26)</strong> contributor for C2SI, architecting webhook-driven backends, caching protocols, and distributed services.
              </p>
              <p>
                Pursuing <strong className="text-white font-semibold">B.Tech in Computer Science &amp; Artificial Intelligence</strong> at Newton School of Technology (8.83 CGPA). My focus bridges system design, low-latency APIs, and human-centric developer experiences.
              </p>
              <p>
                I thrive in the messy reality of engineering—unclear edge cases, evolving data pipelines, and building software that feels <span className="text-blue-400 font-medium">calm, fast, and trustworthy</span>.
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 font-mono text-xs">
                <a
                  href="https://github.com/TarunyaProgrammer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://www.linkedin.com/in/tarunyakesharwani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
                <span className="text-zinc-600">&bull;</span>
                <a
                  href="https://x.com/TarunyaKesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                >
                  <span>Twitter / X</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            {/* Quick Merit Badge */}
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs text-emerald-300">
                <span className="font-semibold text-emerald-200">GSoC 2026 Developer</span> &bull; 93%ile JEE Mains &bull; 94.6% CBSE Boards
              </div>
            </div>
          </div>

          {/* Right Column: Work Philosophy Cards */}
          <div className="lg:col-span-7 space-y-4">
            {portfolioData.personal.philosophy.map((item, index) => {
              const icons = [Code2, ShieldCheck, Zap];
              const Icon = icons[index % icons.length];
              return (
                <SpotlightCard
                  key={item.title}
                  spotlightColor="rgba(59, 130, 246, 0.12)"
                  className="p-6 sm:p-7 border border-white/10 hover:border-white/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-white/10 text-blue-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-base sm:text-lg text-white">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
