import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { MagicCard } from "@/components/ui/magic-card";
import { Tree } from "@/components/ui/file-tree";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  FolderTree,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

export const FlagshipProjects = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeTreeProject, setActiveTreeProject] = useState(null);
  const smoothEase = [0.22, 1, 0.36, 1];

  const projectArchitectures = {
    vyay: [
      {
        id: "src",
        name: "src",
        type: "folder",
        children: [
          { id: "audit-engine", name: "audit-engine.ts", tag: "Deterministic" },
          { id: "gemini-flash", name: "gemini-flash.ts", tag: "Gemini 2.5" },
          { id: "supabase-client", name: "supabase.ts", tag: "Supabase RLS" },
        ],
      },
      { id: "package", name: "package.json", tag: "Vite + React" },
    ],
    "github-analyzer": [
      {
        id: "worker-src",
        name: "src",
        type: "folder",
        children: [
          { id: "hono-router", name: "router.ts", tag: "Hono Edge" },
          { id: "octokit-cache", name: "octokit.ts", tag: "60% Query Drop" },
          { id: "telemetry", name: "telemetry.ts", tag: "Live Analytics" },
        ],
      },
      { id: "wrangler", name: "wrangler.toml", tag: "Cloudflare Workers" },
    ],
    cabin: [
      {
        id: "cabin-apps",
        name: "apps/desktop",
        type: "folder",
        children: [
          { id: "electron-main", name: "main.ts", tag: "Electron IPC & Git" },
          { id: "preload-bridge", name: "preload.ts", tag: "CLI Spawner" },
        ],
      },
      {
        id: "cabin-pkgs",
        name: "packages",
        type: "folder",
        children: [
          { id: "review-engine", name: "review-engine/", tag: "Pipeline Orchestrator" },
          { id: "workers", name: "workers/", tag: "CI / DCO / Merge" },
          { id: "database", name: "database/", tag: "SQLite Controller" },
        ],
      },
      { id: "cabin-root", name: "package.json", tag: "NPM Monorepo" },
    ],
  };

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-14 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2.5">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span>03 // FLAGSHIP ENGINEERING SHOWCASE</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Flagship Production Systems.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed">
              High-impact platforms engineered for deterministic AI financial auditing, sub-5ms serverless edge telemetry, and local-first developer infrastructure.
            </p>
          </div>

          <a
            href="https://github.com/TarunyaProgrammer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-300 hover:text-white px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/25 transition-all self-start md:self-auto shadow-sm"
          >
            <Github className="w-4 h-4 text-zinc-300" />
            <span>GitHub (45+ Repos)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* ═══ TOP 3 FLAGSHIP SHOWCASE (MINIMALIST & CRISP) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {portfolioData.flagshipProjects.map((project, index) => {
            const isTreeOpen = activeTreeProject === project.id;
            const treeData = projectArchitectures[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: smoothEase,
                }}
                className="h-full"
              >
                <MagicCard
                  glowFrom="rgba(255, 255, 255, 0.05)"
                  glowTo="rgba(255, 255, 255, 0.01)"
                  borderGlow="rgba(255, 255, 255, 0.16)"
                  size={400}
                  className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6"
                >
                  <div className="space-y-4">
                    {/* Top Category & Status Header */}
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 font-mono text-[11px]">
                      <span className="text-zinc-400 uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 font-medium">
                        {project.badge}
                      </span>
                    </div>

                    {/* Clean Title */}
                    <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                      {project.title}
                    </h3>

                    {/* Single Crisp Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Performance Metric Pill */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/80 border border-white/10 font-mono text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{project.metrics}</span>
                    </div>

                    {/* Tech Stack Pills (4 core tags) */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md bg-zinc-900/90 text-[11px] font-mono font-medium text-zinc-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Architecture Blueprint Tree Toggle */}
                    {treeData && (
                      <div className="pt-1">
                        <button
                          onClick={() => setActiveTreeProject(isTreeOpen ? null : project.id)}
                          className="w-full inline-flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 text-[11px] font-mono text-zinc-400 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <FolderTree className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Architecture Blueprint</span>
                          </span>
                          {isTreeOpen ? (
                            <ChevronUp className="w-3 h-3 text-zinc-500" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-zinc-500" />
                          )}
                        </button>

                        {/* Expandable Tree */}
                        {isTreeOpen && (
                          <div className="mt-2 transition-all">
                            <Tree elements={treeData} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4 text-zinc-400" />
                      <span>Repository</span>
                      <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 transition-all font-semibold shadow-sm text-xs"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ EXPANDABLE ARCHIVE EXPLORER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="space-y-6 pt-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Curated Open Source Archive
            </h3>

            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white font-medium transition-colors cursor-pointer"
            >
              <span>{showAll ? "Collapse Archive" : "Expand All 45+ Repositories"}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {((showAll
              ? portfolioData.archivedProjects
              : (portfolioData.archivedProjects || []).slice(0, 6)) || []
            ).map((item, aIdx) => (
              <motion.a
                key={item.name}
                href={item.link || item.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (aIdx % 3) * 0.08 }}
                className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-white/20 hover:bg-zinc-900 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white group-hover:text-zinc-200 transition-colors">
                      {item.name}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
