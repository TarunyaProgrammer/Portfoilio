import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { BorderBeam } from "@/components/ui/border-beam";
import { Tree } from "@/components/ui/file-tree";
import {
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  Flame,
  FolderTree,
} from "lucide-react";

export const FlagshipProjects = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeTreeProject, setActiveTreeProject] = useState(null);

  const projectArchitectures = {
    vyay: [
      {
        id: "src",
        name: "src",
        type: "folder",
        children: [
          {
            id: "core",
            name: "core",
            type: "folder",
            children: [
              { id: "audit-engine", name: "audit-engine.ts", tag: "Deterministic" },
              { id: "cost-analyzer", name: "cost-analyzer.ts", tag: "Rule-Based" },
            ],
          },
          {
            id: "ai",
            name: "ai",
            type: "folder",
            children: [
              { id: "gemini-flash", name: "gemini-flash.ts", tag: "Gemini 2.5" },
              { id: "prompt-guard", name: "prompt-guard.ts", tag: "Safety" },
            ],
          },
          {
            id: "db",
            name: "db",
            type: "folder",
            children: [
              { id: "supabase-client", name: "supabase.ts", tag: "Supabase RLS" },
              { id: "schema", name: "schema.sql", tag: "PostgreSQL" },
            ],
          },
          { id: "mailer", name: "mailer.ts", tag: "Resend" },
          { id: "test", name: "audit.test.ts", tag: "Vitest 100%" },
        ],
      },
      { id: "package", name: "package.json", tag: "Vite + React 19" },
    ],
    github: [
      {
        id: "worker-src",
        name: "src",
        type: "folder",
        children: [
          {
            id: "handlers",
            name: "handlers",
            type: "folder",
            children: [
              { id: "hono-router", name: "router.ts", tag: "Hono Edge" },
              { id: "webhooks", name: "webhooks.ts", tag: "Event-Driven" },
            ],
          },
          {
            id: "cache",
            name: "cache",
            type: "folder",
            children: [
              { id: "octokit-cache", name: "octokit.ts", tag: "60% Query Drop" },
              { id: "redis-edge", name: "kv-store.ts", tag: "Sub-5ms" },
            ],
          },
          { id: "telemetry", name: "telemetry.ts", tag: "Prometheus" },
        ],
      },
      { id: "wrangler", name: "wrangler.toml", tag: "Cloudflare" },
    ],
    echo: [
      {
        id: "echo-src",
        name: "src",
        type: "folder",
        children: [
          {
            id: "sockets",
            name: "sockets",
            type: "folder",
            children: [
              { id: "socket-manager", name: "socket-manager.ts", tag: "Socket.IO" },
              { id: "heartbeat", name: "heartbeat.ts", tag: "Ping/Pong" },
            ],
          },
          {
            id: "auth",
            name: "auth",
            type: "folder",
            children: [
              { id: "jwt-verifier", name: "jwt.ts", tag: "HMAC-SHA256" },
              { id: "middleware", name: "auth.middleware.ts", tag: "Guards" },
            ],
          },
          { id: "db-conn", name: "mongodb.ts", tag: "Mongoose Pool" },
        ],
      },
      { id: "server", name: "server.ts", tag: "Node + Express" },
    ],
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              03 // FLAGSHIP ENGINEERING SHOWCASE
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
            const isTreeOpen = activeTreeProject === project.id;
            const treeData = projectArchitectures[project.id];

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
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
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

                  {/* Interactive Architecture Blueprint Button */}
                  {treeData && (
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveTreeProject(isTreeOpen ? null : project.id)}
                        className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-xs font-mono text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <FolderTree className="w-3.5 h-3.5 text-blue-400" />
                          <span>Architecture Blueprint</span>
                        </span>
                        {isTreeOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </button>

                      {/* Expandable Magic UI Tree */}
                      {isTreeOpen && (
                        <div className="mt-3 transition-all animate-fadeIn">
                          <Tree elements={treeData} />
                        </div>
                      )}
                    </div>
                  )}
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

        {/* ═══ EXPANDABLE ARCHIVE EXPLORER ═══ */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Curated Open Source Archive
            </h3>

            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <span>{showAll ? "Collapse Archive" : "Expand All 45+ Repositories"}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {((showAll
              ? portfolioData.archivedProjects
              : (portfolioData.archivedProjects || []).slice(0, 6)) || []
            ).map((item) => (
              <a
                key={item.name}
                href={item.link || item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-zinc-900/50 border border-white/10 hover:border-white/20 hover:bg-zinc-900 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500 bg-zinc-950 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
