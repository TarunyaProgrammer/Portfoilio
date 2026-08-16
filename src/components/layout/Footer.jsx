import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Github,
  Linkedin,
  Twitter,
  BookOpen,
  FileText,
  ArrowUp,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const columns = [
    {
      title: "SYSTEMS/",
      links: [
        { label: "Vyay (AI Cost Audit)", href: "#projects" },
        { label: "GithubAnalyzer (GSoC '26)", href: "#projects" },
        { label: "Echo (Real-Time Chat)", href: "#projects" },
        { label: "WebiU Architecture", href: "#projects" },
        { label: "Streakly Protocol", href: "#projects" },
        { label: "RFP ResponseBuilder", href: "#projects" },
        { label: "Extended Archive (45+)", href: "https://github.com/TarunyaProgrammer", external: true },
      ],
    },
    {
      title: "CAPABILITIES/",
      links: [
        { label: "Frontend Systems (React 19)", href: "#skills" },
        { label: "Distributed APIs & WebSockets", href: "#skills" },
        { label: "Deterministic AI / LLMs", href: "#skills" },
        { label: "Edge Workers & Caching", href: "#skills" },
        { label: "PostgreSQL & Supabase RLS", href: "#skills" },
        { label: "Low-Latency Microservices", href: "#skills" },
      ],
    },
    {
      title: "BACKGROUND/",
      links: [
        { label: "Google Summer of Code '26", href: "#experience" },
        { label: "C2SI Open Source Contributor", href: "#experience" },
        { label: "GSSoC & SSoC Mentorship", href: "#experience" },
        { label: "CNCF Ecosystem (Meshery)", href: "#experience" },
        { label: "B.Tech CS & AI (8.83 CGPA)", href: "#experience" },
        { label: "Smart India Hackathon '25", href: "#experience" },
      ],
    },
    {
      title: "RESOURCES/",
      links: [
        { label: "Multi-Agent Systems (Medium)", href: "https://medium.com/@tarunyakesh", external: true },
        { label: "Zero-Copy Microservices (DEV.to)", href: "https://dev.to/tarunya", external: true },
        { label: "Deterministic AI Audits", href: "https://medium.com/@tarunyakesh", external: true },
        { label: "Curriculum Vitae (PDF)", href: "/Resume.pdf", external: true },
        { label: "Direct Inquiries", href: "#contact" },
      ],
    },
    {
      title: "NETWORK/",
      links: [
        { label: "GitHub (@TarunyaProgrammer)", href: "https://github.com/TarunyaProgrammer", external: true },
        { label: "LinkedIn (@tarunyakesharwani)", href: "https://www.linkedin.com/in/tarunyakesharwani/", external: true },
        { label: "X / Twitter (@TarunyaKesh)", href: "https://x.com/TarunyaKesh", external: true },
        { label: "DEV.to (@tarunya)", href: "https://dev.to/tarunya", external: true },
        { label: "Medium (@tarunyakesh)", href: "https://medium.com/@tarunyakesh", external: true },
        { label: "Codeforces (939+ Rating)", href: "https://codeforces.com/profile/tarunya.programmer", external: true },
      ],
    },
  ];

  return (
    <footer className="relative w-full min-h-[80vh] bg-black text-zinc-400 font-mono text-xs pt-24 pb-36 px-6 sm:px-12 lg:px-20 border-t border-white/10 overflow-hidden select-none flex flex-col justify-between">
      <div className="max-w-7xl w-full mx-auto space-y-16 relative z-20">
        {/* ═══ TOP BRAND HEADER ═══ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("hero");
              }}
              className="inline-block group"
            >
              <h2 className="font-signature text-5xl sm:text-7xl font-normal text-white group-hover:text-blue-300 transition-colors leading-none tracking-wide pt-2">
                Tarunya k
              </h2>
            </a>
            <p className="text-sm font-mono text-zinc-400 max-w-lg">
              Full-Stack Systems Architect &bull; GSoC &apos;26 Developer @ C2SI &bull; AI Engineering
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-xs">
            <div className="flex items-center gap-2 text-zinc-400">
              <span>IST: <strong className="text-white">{time || "22:40:00"}</strong></span>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/30 transition-all cursor-pointer shadow-md"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ═══ 5-COLUMN DIRECTORY TREE ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-12">
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="font-semibold text-white tracking-widest text-xs uppercase border-b border-white/10 pb-2">
                {col.title}
              </h4>
              <ul className="space-y-2 font-mono text-xs">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                      >
                        <span className="text-zinc-600 group-hover:text-blue-400 transition-colors select-none font-bold">
                          └──
                        </span>
                        <span>{link.label}</span>
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href.replace("#", ""));
                        }}
                        className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
                      >
                        <span className="text-zinc-600 group-hover:text-blue-400 transition-colors select-none font-bold">
                          └──
                        </span>
                        <span>{link.label}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ═══ SOCIAL ICONS & COPYRIGHT ═══ */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: "https://github.com/TarunyaProgrammer", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/tarunyakesharwani/", label: "LinkedIn" },
              { icon: Twitter, href: "https://x.com/TarunyaKesh", label: "Twitter" },
              { icon: BookOpen, href: "https://dev.to/tarunya", label: "DEV.to" },
              { icon: FileText, href: "https://medium.com/@tarunyakesh", label: "Medium" },
              { icon: Mail, href: "mailto:tarunyaprogrammer@gmail.com", label: "Email" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-zinc-900/90 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/40 hover:bg-zinc-800 transition-all shadow-md"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            &copy; 2026 Tarunya Kesharwani. All rights reserved. &bull; CC BY-NC-ND 4.0
          </div>
        </div>
      </div>

      {/* ═══ SUI-INSPIRED IMPRESSIVE 80VH EQUALIZER & SKY PILLARS ═══ */}
      <div className="absolute inset-x-0 bottom-0 h-[480px] pointer-events-none z-10 overflow-hidden">
        {/* Dotted Grid Columns */}
        <div className="absolute inset-0 flex justify-between px-6 sm:px-20 opacity-30">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="w-[1px] h-full border-r border-dotted border-blue-400/50"
            />
          ))}
        </div>

        {/* Grand Shimmering Blue Aurora Pillars (Staggered Heights & Glows) */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end gap-4 sm:gap-8 px-4">
          <div className="w-20 sm:w-36 h-48 bg-gradient-to-t from-blue-600/60 via-blue-500/25 to-transparent blur-2xl rounded-t-full" />
          <div className="w-24 sm:w-44 h-72 bg-gradient-to-t from-blue-500/75 via-blue-400/35 to-transparent blur-2xl rounded-t-full" />
          <div className="w-32 sm:w-60 h-96 bg-gradient-to-t from-blue-400/90 via-blue-500/50 to-transparent blur-3xl rounded-t-full" />
          <div className="w-24 sm:w-44 h-80 bg-gradient-to-t from-blue-500/75 via-blue-400/35 to-transparent blur-2xl rounded-t-full" />
          <div className="w-20 sm:w-36 h-52 bg-gradient-to-t from-blue-600/60 via-blue-500/25 to-transparent blur-2xl rounded-t-full" />
        </div>

        {/* Ambient Ground Horizon Glow */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-blue-600/50 via-blue-500/20 to-transparent" />
      </div>
    </footer>
  );
};
