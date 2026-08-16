import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Marquee } from "@/components/ui/marquee";
import {
  Layout,
  Server,
  Cpu,
  Database,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const TechStackSection = () => {
  const iconMap = {
    Layout: Layout,
    Server: Server,
    Cpu: Cpu,
    Database: Database,
  };

  const allSkillsFlat = portfolioData.skills.flatMap((s) => s.items);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold tracking-wider uppercase">
              System Capabilities Matrix
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Tech Stack &amp; Specializations
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Curated competencies across distributed backends, modern frontend frameworks, multimodal AI pipelines, and containerized DevOps.
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-400 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10">
            STATUS: <span className="text-emerald-400 font-semibold">PRODUCTION-TESTED</span>
          </div>
        </div>

        {/* 4-Card Bento Grid with Spotlight Physics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.skills.map((category, index) => {
            const Icon = iconMap[category.icon] || Cpu;
            const spotlightColors = [
              "rgba(59, 130, 246, 0.15)", // Blue
              "rgba(16, 185, 129, 0.15)", // Emerald
              "rgba(139, 92, 246, 0.15)", // Violet
              "rgba(245, 158, 11, 0.15)", // Amber
            ];
            const color = spotlightColors[index % spotlightColors.length];

            return (
              <SpotlightCard
                key={category.category}
                spotlightColor={color}
                className="p-6 sm:p-8 border border-white/10 hover:border-white/20 bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-zinc-800/80 border border-white/10 text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-lg text-white tracking-tight">
                        {category.category}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {category.items.length} Modules
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {category.description}
                  </p>

                  {/* Badges Grid */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-white/10 text-xs font-mono font-medium text-zinc-200 hover:border-white/25 hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Magic UI Infinite Marquee */}
        <div className="space-y-4 pt-4">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest text-center">
            &bull; Live Ecosystem Skills Ticker &bull;
          </div>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-950/40 border border-white/10 py-3">
            <Marquee pauseOnHover className="[--duration:30s]">
              {allSkillsFlat.map((skill, i) => (
                <div
                  key={`${skill}-${i}`}
                  className="mx-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-medium text-zinc-300 font-mono shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
};
