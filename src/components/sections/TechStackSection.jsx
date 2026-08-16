import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import {
  Server,
  Cpu,
  Layout,
  Database,
  Terminal,
  Zap,
  ShieldCheck,
  Code2,
  Workflow,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const TechStackSection = () => {
  const backendEvents = [
    { title: "Hono Edge Worker", status: "Sub-5ms response", tag: "Cloudflare" },
    { title: "Webhook Dispatcher", status: "Event-driven", tag: "GSoC '26" },
    { title: "Octokit Caching", status: "60% query savings", tag: "Redis/KV" },
    { title: "WebSocket Channel", status: "Zero-lag sync", tag: "Socket.IO" },
    { title: "NestJS Microservice", status: "Type-safe RPC", tag: "PostgreSQL" },
  ];

  const aiModules = [
    { name: "Gemini 2.5 Flash", desc: "Multimodal fast inference" },
    { name: "Google Antigravity SDK", desc: "Autonomous agent workflows" },
    { name: "Deterministic RAG", desc: "Zero hallucination grounding" },
    { name: "LangChain Pipelines", desc: "Structured tool invocation" },
    { name: "Structured JSON Output", desc: "Strict schema compliance" },
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
    { label: "GitHub Actions CI", status: "Automated Build Passing", color: "text-emerald-400" },
    { label: "Supabase PostgreSQL", status: "Row-Level Security Active", color: "text-blue-400" },
    { label: "Cloudflare Workers", status: "Global Edge Caching", color: "text-amber-400" },
    { label: "Docker Containers", status: "Immutable Production Builds", color: "text-violet-400" },
  ];

  const bentoFeatures = [
    // 1. Distributed Backends (col-span-3 lg:col-span-2)
    {
      Icon: Server,
      name: "Distributed Backends & Edge APIs",
      description:
        "Architecting resilient event-driven microservices, Cloudflare edge workers, and sub-50ms WebSockets with persistent caching.",
      href: "#projects",
      cta: "Explore Systems",
      className: "col-span-3 lg:col-span-2 min-h-[320px]",
      background: (
        <div className="absolute top-4 right-4 left-4 h-44 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)] pointer-events-none opacity-85">
          <div className="space-y-2 font-mono text-[11px]">
            {backendEvents.map((evt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/80 border border-white/10 text-zinc-300 shadow-md backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">{evt.title}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500">
                  <span>{evt.status}</span>
                  <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-[10px] text-blue-400">
                    {evt.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // 2. Deterministic AI (col-span-3 lg:col-span-1)
    {
      Icon: Cpu,
      name: "Deterministic AI & Agentic Workflows",
      description:
        "Engineering autonomous agents, structured JSON output validation, and multimodal RAG pipelines.",
      href: "#projects",
      cta: "View AI Architecture",
      className: "col-span-3 lg:col-span-1 min-h-[320px]",
      background: (
        <div className="absolute top-2 inset-x-0 h-44 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_40%,transparent_100%)] pointer-events-none">
          <Marquee pauseOnHover className="[--duration:22s] py-2">
            {aiModules.map((m, idx) => (
              <div
                key={idx}
                className="w-36 p-3 mx-2 rounded-xl bg-zinc-950/90 border border-white/10 text-left font-mono text-xs shadow-md"
              >
                <div className="text-blue-400 font-semibold text-[11px] truncate">
                  {m.name}
                </div>
                <div className="text-[10px] text-zinc-400 mt-1 leading-tight">
                  {m.desc}
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      ),
    },

    // 3. Reactive Frontend Systems (col-span-3 lg:col-span-1)
    {
      Icon: Layout,
      name: "Reactive Frontend Architecture",
      description:
        "Sub-second interactive interfaces engineered with React 19, TypeScript, Framer Motion, and Lenis momentum scrolling.",
      href: "#projects",
      cta: "Inspect Components",
      className: "col-span-3 lg:col-span-1 min-h-[320px]",
      background: (
        <div className="absolute top-4 inset-x-4 h-40 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_40%,transparent_100%)] pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {frontendChips.map((chip, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-zinc-950/90 border border-white/10 font-mono text-[11px] text-zinc-300 shadow-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ),
    },

    // 4. Cloud DevOps & Enterprise Storage (col-span-3 lg:col-span-2)
    {
      Icon: Database,
      name: "Cloud DevOps & Distributed Storage",
      description:
        "Automated CI/CD pipelines, PostgreSQL with Row-Level Security, Redis edge caching, and containerized deployments.",
      href: "#projects",
      cta: "Review Infrastructure",
      className: "col-span-3 lg:col-span-2 min-h-[320px]",
      background: (
        <div className="absolute top-4 right-4 left-4 h-44 overflow-hidden [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)] pointer-events-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
            {infraChecks.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between shadow-md"
              >
                <span className="text-white font-medium text-[11px]">{item.label}</span>
                <span className={cn("text-[10px] mt-1 font-semibold", item.color)}>
                  &check; {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              02 // CAPABILITIES &amp; ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Tech Stack Bento Matrix.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Modular capabilities across distributed backend services, reactive frontend interfaces, deterministic AI pipelines, and cloud DevOps.
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-400 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 self-start md:self-auto">
            ARCHITECTURE: <span className="text-blue-400 font-semibold">PRODUCTION-VERIFIED</span>
          </div>
        </div>

        {/* ═══ MAGIC UI BENTO GRID ═══ */}
        <BentoGrid className="grid-cols-3 gap-6">
          {bentoFeatures.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>

        {/* Continuous Magic UI Marquee Ticker */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950/40 border border-white/10 py-3 mt-6">
          <Marquee pauseOnHover className="[--duration:35s]">
            {portfolioData.skills.flatMap((s) => s.items).map((skill, i) => (
              <div
                key={`${skill}-${i}`}
                className="mx-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 font-mono shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{skill}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
