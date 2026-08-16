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
  Sparkles,
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

  const columns = [
    {
      title: "SYSTEMS/",
      links: [
        { label: "Vyay (AI Cost Audit)", href: "#projects" },
        { label: "GithubAnalyzer (GSoC '26)", href: "#projects" },
        { label: "Echo (Real-Time Chat)", href: "#projects" },
        { label: "WebiU Next-Gen", href: "#projects" },
        { label: "Streakly Protocol", href: "#projects" },
        { label: "RFP ResponseBuilder", href: "#projects" },
        { label: "GitHub Archive (45+)", href: "https://github.com/TarunyaProgrammer", external: true },
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
        { label: "Low-Latency Deserialization", href: "#skills" },
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
    <footer className="relative w-full bg-black text-zinc-400 font-mono text-xs pt-20 pb-36 px-4 sm:px-8 lg:px-16 border-t border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto space-y-16 relative z-20">
        {/* Top Monogram / Logo */}
        <div className="flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("hero");
            }}
            className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 group-hover:border-blue-400/80 transition-all bg-zinc-900 flex items-center justify-center">
              <img
                src="/webme1.png"
                alt="Tarunya Kesharwani"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-signature text-3xl font-normal text-white group-hover:text-blue-300 leading-none">
                Tarunya K.
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                Systems Architecture
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>IST: <strong className="text-zinc-300">{time || "21:50:00"}</strong></span>
          </div>
        </div>

        {/* 5-Column Directory Tree Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="font-semibold text-white tracking-widest text-[11px] uppercase">
                {col.title}
              </h4>
              <ul className="space-y-1.5 font-mono text-[11px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <span className="text-zinc-600 font-bold select-none group-hover:text-blue-400 transition-colors">
                          └─
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
                        className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 group cursor-pointer"
                      >
                        <span className="text-zinc-600 font-bold select-none group-hover:text-blue-400 transition-colors">
                          └─
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

        {/* Social Icons & Copyright Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Social Icon Badges */}
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
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 hover:bg-zinc-800 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Copyright & Legal Note */}
          <div className="text-[11px] text-zinc-500 font-mono">
            &copy; 2026 Tarunya Kesharwani. All rights reserved. &bull; CC BY-NC-ND 4.0
          </div>
        </div>
      </div>

      {/* ═══ SUI-INSPIRED AMBIENT BLUE EQUALIZER / PILLARS ARTWORK ═══ */}
      <div className="absolute inset-x-0 bottom-0 h-72 pointer-events-none z-10 overflow-hidden">
        {/* Dotted Grid Columns */}
        <div className="absolute inset-0 flex justify-between px-6 sm:px-16 opacity-35">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-[1px] h-full border-r border-dotted border-blue-400/40"
            />
          ))}
        </div>

        {/* Shimmering Blue Gradient Pillars (Staggered Heights & Glows) */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end gap-3 sm:gap-6 px-4">
          <div className="w-16 sm:w-28 h-28 bg-gradient-to-t from-blue-600/50 via-blue-500/20 to-transparent blur-xl rounded-t-full" />
          <div className="w-20 sm:w-36 h-48 bg-gradient-to-t from-blue-500/70 via-blue-400/30 to-transparent blur-xl rounded-t-full" />
          <div className="w-24 sm:w-48 h-64 bg-gradient-to-t from-blue-400/80 via-blue-500/40 to-transparent blur-2xl rounded-t-full" />
          <div className="w-20 sm:w-36 h-52 bg-gradient-to-t from-blue-500/70 via-blue-400/30 to-transparent blur-xl rounded-t-full" />
          <div className="w-16 sm:w-28 h-32 bg-gradient-to-t from-blue-600/50 via-blue-500/20 to-transparent blur-xl rounded-t-full" />
        </div>

        {/* Intense Bottom Ambient Ground Glow */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-600/40 via-blue-500/20 to-transparent" />
      </div>
    </footer>
  );
};
