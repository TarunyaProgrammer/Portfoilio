import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import {
  Server,
  Cpu,
  Layout,
  Database,
  Code2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const TechStackSection = () => {
  const smoothEase = [0.22, 1, 0.36, 1];

  const backendEvents = [
    { title: "Hono Edge Worker", status: "Edge route", tag: "Cloudflare" },
    { title: "Webhook Dispatcher", status: "Event-Driven", tag: "GSoC '26" },
    { title: "Octokit Caching", status: "Fewer API calls", tag: "Redis/KV" },
    { title: "WebSocket Sync", status: "Low-latency sync", tag: "Socket.IO" },
  ];

  const aiModules = [
    { name: "Gemini 2.5 Flash", desc: "Fast multimodal inference" },
    { name: "Google Antigravity SDK", desc: "Autonomous agent workflows" },
    { name: "Grounded retrieval", desc: "Context with clear boundaries" },
    { name: "Structured JSON Output", desc: "Strict schema validation" },
  ];

  const frontendChips = [
    "React 19 / 18",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Lenis Smooth Scroll",
    "TanStack Query",
    "Zustand State",
    "Vite 6 Fast HMR",
  ];

  const infraChecks = [
    { label: "GitHub Actions CI", status: "Repeatable checks", color: "text-emerald-400" },
    { label: "Supabase PostgreSQL", status: "Protected data access", color: "text-blue-400" },
    { label: "Cloudflare Workers", status: "Edge-ready delivery", color: "text-blue-300" },
    { label: "Docker Containers", status: "Reproducible builds", color: "text-blue-200" },
  ];

  const bentoFeatures = [
    // 1. Distributed Backends (col-span-1 md:col-span-2)
    {
      Icon: Server,
      name: "Backends that stay dependable",
      description:
        "Event-driven services, edge workers, and persistent caching shaped around reliable data flow.",
      href: "#projects",
      cta: "See selected work",
      className: "col-span-1 md:col-span-2 lg:col-span-2",
      background: (
        <div className="w-full h-full flex flex-col justify-center gap-2 font-mono text-[11px]">
          {backendEvents.map((evt, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-white/10 text-zinc-300 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{evt.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">{evt.status}</span>
                <span className="px-1.5 py-0.5 rounded bg-zinc-950 border border-white/10 text-[10px] text-blue-400">
                  {evt.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    // 2. Deterministic AI (col-span-1)
    {
      Icon: Cpu,
      name: "AI workflows with guardrails",
      description:
        "Structured outputs, grounded retrieval, and automation that stays close to the rules of the product.",
      href: "#projects",
      cta: "View AI work",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      background: (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s] py-1">
            {aiModules.map((m, idx) => (
              <div
                key={idx}
                className="w-36 p-2.5 mx-1.5 rounded-xl bg-zinc-900/90 border border-white/10 text-left font-mono text-xs shadow-sm"
              >
                <div className="text-white font-semibold text-[11px] truncate">
                  {m.name}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5 leading-tight">
                  {m.desc}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      ),
    },

    // 3. Reactive Frontend Systems (col-span-1)
    {
      Icon: Layout,
      name: "Interfaces that feel immediate",
      description:
        "Responsive interfaces built with React and TypeScript, with motion used to clarify the experience.",
      href: "#projects",
      cta: "Inspect interfaces",
      className: "col-span-1 md:col-span-1 lg:col-span-1",
      background: (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {frontendChips.map((chip, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-[11px] text-zinc-200 shadow-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ),
    },

    // 4. Cloud DevOps & Enterprise Storage (col-span-1 md:col-span-2)
    {
      Icon: Database,
      name: "Deployment and data foundations",
      description:
        "CI/CD, protected data, edge delivery, and containerized builds that give teams a steadier path to production.",
      href: "#projects",
      cta: "Review foundations",
      className: "col-span-1 md:col-span-2 lg:col-span-2",
      background: (
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs items-center">
          {infraChecks.map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-zinc-900/90 border border-white/10 flex flex-col justify-between shadow-sm"
            >
              <span className="text-white font-medium text-[11px]">{item.label}</span>
              <span className={cn("text-[10px] mt-0.5 font-semibold flex items-center gap-1", item.color)}>
                <Check className="w-3 h-3" /> {item.status}
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-14">
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
              <span>Tools behind the work</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              The tools are chosen for the constraints.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed">
              I choose tools for the problem at hand: clear interfaces, dependable data flow, and AI that stays inside useful boundaries.
            </p>
          </div>

          {/* Quick SLA / Value Metric Badge */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs self-start md:self-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-300 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>Performance-minded builds</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-300 flex items-center gap-2 shadow-sm">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Production-focused delivery</span>
            </div>
          </div>
        </motion.div>

        {/* ═══ MAGIC UI BENTO GRID (FLOWS IN WITH STAGGER) ═══ */}
        <BentoGrid className="gap-6">
          {bentoFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: idx * 0.12, ease: smoothEase }}
              className={feature.className}
            >
              <BentoCard {...feature} className="h-full" />
            </motion.div>
          ))}
        </BentoGrid>

        {/* Continuous Magic UI Marquee Ticker (Flows in from bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }}
          className="relative overflow-hidden rounded-2xl bg-zinc-950/40 border border-white/10 py-3 mt-6"
        >
          <div aria-hidden="true">
            <Marquee pauseOnHover className="[--duration:35s]">
              {portfolioData.skills.flatMap((s) => s.items).map((skill, i) => (
                <div
                  key={`${skill}-${i}`}
                  className="mx-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-mono text-zinc-300 shadow-sm"
                >
                  <Code2 className="h-3.5 w-3.5 text-zinc-400" />
                  <span>{skill}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
