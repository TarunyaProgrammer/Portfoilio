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
    "github-analyzer": [
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
    "echo-chat": [
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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
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
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-400 hover:text-white px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/25 transition-all self-start md:self-auto"
          >
            <Github className="w-4 h-4 text-zinc-300" />
            <span>GitHub Profile (45+ Repos)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* ═══ TOP 3 FLAGSHIP SHOWCASE (FLOWS IN WITH STAGGER) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {portfolioData.flagshipProjects.map((project, index) => {
            const isTreeOpen = activeTreeProject === project.id;
            const treeData = projectArchitectures[project.id];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 60, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: smoothEase,
                }}
                className="h-full"
              >
                <MagicCard
                  glowFrom="rgba(255, 255, 255, 0.05)"
                  glowTo="rgba(255, 255, 255, 0.01)"
                  borderGlow="rgba(255, 255, 255, 0.16)"
                  size={400}
                  className="p-6 sm:p-8 flex flex-col justify-between h-full"
                >
                  <div className="space-y-6">
                    {/* Top Category & Badge Row */}
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <span className="text-[11px] font-mono font-medium text-zinc-400 uppercase tracking-wide">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
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
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 font-mono text-xs text-zinc-300">
                      <span>{project.metrics}</span>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-zinc-900 text-[11px] font-mono font-medium text-zinc-300 border border-white/10"
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
                          className="w-full inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <FolderTree className="w-3.5 h-3.5 text-zinc-400" />
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
                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4 text-zinc-400" />
                      <span>Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 transition-all font-semibold shadow-sm"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
          className="space-y-6 pt-6"
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
