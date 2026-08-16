import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Flame,
} from "lucide-react";

export const FlagshipProjects = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold tracking-wider uppercase">
              Flagship Engineering Showcase
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Top 3 Flagship Products.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Production-ready applications architected for deterministic AI audits, high-throughput serverless telemetry, and sub-50ms messaging.
            </p>
          </div>

          <a
            href="https://github.com/TarunyaProgrammer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-white/25 transition-all self-start md:self-auto"
          >
            <Github className="w-4 h-4 text-zinc-300" />
            <span>GitHub Profile (45+ Repos)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ═══ TOP 3 FLAGSHIP SHOWCASE WITH BORDER BEAMS ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {portfolioData.flagshipProjects.map((project, index) => {
            const beamColors = [
              { from: "#3b82f6", to: "#8b5cf6" }, // Blue to Violet
              { from: "#10b981", to: "#3b82f6" }, // Emerald to Blue
              { from: "#8b5cf6", to: "#ec4899" }, // Violet to Pink
            ];
            const colors = beamColors[index % beamColors.length];

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-zinc-900/80 border border-white/15 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-zinc-900 shadow-2xl flex flex-col justify-between overflow-hidden"
              >
                {/* Magic UI Border Beam */}
                <BorderBeam
                  size={250}
                  duration={10 + index * 2}
                  colorFrom={colors.from}
                  colorTo={colors.to}
                  borderWidth={1.5}
                />

                <div className="space-y-6 relative z-10">
                  {/* Top Category & Badge Row */}
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wide">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-950 border border-white/10 text-[10px] font-mono font-medium text-emerald-400">
                      <Flame className="w-3 h-3 text-amber-400" />
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 leading-snug">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Highlight Metric */}
                  <div className="p-3 rounded-xl bg-zinc-950/70 border border-white/10 font-mono text-xs text-zinc-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>{project.metrics}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-zinc-950 text-[11px] font-mono font-medium text-zinc-400 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Links */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs relative z-10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-zinc-400" />
                    <span>Repository</span>
                    <ExternalLink className="w-3 h-3 text-zinc-500" />
                  </a>

                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 hover:text-white transition-all font-medium"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══ OTHER NOTABLE REPOSITORIES ACCORDION ═══ */}
        <div className="pt-6 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>Extended Systems &amp; Experiments Archive</span>
            </h4>

            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>{showAll ? "Collapse Archive" : "Expand All Archive"}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showAll && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolioData.otherProjects.map((p) => (
                <div
                  key={p.title}
                  className="p-5 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-white text-sm">{p.title}</h5>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase bg-zinc-950 px-2 py-0.5 rounded border border-white/10">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                      {p.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 font-mono text-[11px]">
                    <div className="flex gap-1.5">
                      {p.stack.map((s) => (
                        <span key={s} className="text-zinc-500">
                          #{s}
                        </span>
                      ))}
                    </div>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Code</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
