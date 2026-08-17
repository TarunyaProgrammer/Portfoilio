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
  ExternalLink,
  MapPin,
  Clock,
} from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/TarunyaProgrammer",              label: "GitHub"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/tarunyakesharwani/",    label: "LinkedIn" },
  { icon: Twitter,  href: "https://x.com/TarunyaKesh",                        label: "Twitter"  },
  { icon: BookOpen, href: "https://dev.to/tarunya",                            label: "DEV.to"   },
  { icon: FileText, href: "https://medium.com/@tarunyakesh",                   label: "Medium"   },
  { icon: Mail,     href: "mailto:tarunyaprogrammer@gmail.com",                label: "Email"    },
];

const NAV_COLS = [
  {
    title: "Work",
    links: [
      { label: "Flagship Projects",        href: "projects" },
      { label: "Tech Stack & Skills",      href: "skills"   },
      { label: "Experience & Timeline",    href: "experience" },
      { label: "Publications",             href: "writing"  },
      { label: "Contact Me",              href: "contact"  },
    ],
  },
  {
    title: "Open Source",
    links: [
      { label: "GitHub (45+ repos)",        href: "https://github.com/TarunyaProgrammer",          ext: true },
      { label: "GSoC '26 @ C2SI",           href: "https://summerofcode.withgoogle.com/",          ext: true },
      { label: "Codeforces 939+",           href: "https://codeforces.com/profile/tarunya.programmer", ext: true },
      { label: "DEV.to Articles",           href: "https://dev.to/tarunya",                        ext: true },
      { label: "Medium Blog",               href: "https://medium.com/@tarunyakesh",               ext: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Download CV (PDF)",  href: "/Resume.pdf",                         ext: true },
      { label: "LinkedIn Profile",   href: "https://www.linkedin.com/in/tarunyakesharwani/", ext: true },
      { label: "Multi-Agent Article",href: "https://medium.com/@tarunyakesh",    ext: true },
      { label: "Zero-Copy Post",     href: "https://dev.to/tarunya",             ext: true },
    ],
  },
];

export const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative w-full bg-[#050507] border-t border-white/[0.08] overflow-hidden select-none"
      style={{ paddingBottom: "calc(7rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* ── Background: subtle grid lines ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 flex justify-between px-4 sm:px-16 opacity-[0.06]">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-px h-full bg-blue-400" />
          ))}
        </div>
      </div>

      {/* ── Aurora glow — CSS only, no heavy blur on mobile ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[280px] sm:h-[400px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.06) 50%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* ══════════ TOP: Brand + CTA ══════════ */}
        <div className="pt-14 sm:pt-20 pb-10 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
              className="group inline-block"
              aria-label="Back to top"
            >
              <span className="font-signature text-[clamp(2.5rem,8vw,4.5rem)] leading-none tracking-wide text-white group-hover:text-blue-300 transition-colors duration-300">
                Tarunya k
              </span>
            </a>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-zinc-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-blue-400/70" />
                India · Open to Global Remote
              </span>
              <span className="hidden sm:flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-blue-400/70" />
                IST {time || "—"}
              </span>
              <span className="flex items-center gap-1.5 sm:hidden">
                <Clock className="w-3 h-3 text-blue-400/70" />
                {time || "—"}
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-sans max-w-sm leading-relaxed">
              Systems Architect · GSoC '26 @ C2SI · Building from code to production.
            </p>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Tarunya_Kesharwani_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/25 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              Resume
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/25 transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              Top
            </button>
          </div>
        </div>

        {/* ══════════ MIDDLE: Nav columns ══════════ */}
        <div className="py-10 sm:py-14 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10 border-b border-white/[0.08]">
          {NAV_COLS.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) =>
                  link.ext ? (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors duration-150"
                      >
                        <span className="w-3 h-px bg-zinc-700 group-hover:bg-blue-400 transition-colors shrink-0" />
                        <span className="leading-tight">{link.label}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-zinc-600 group-hover:text-blue-400 shrink-0 transition-colors" />
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <a
                        href={`#${link.href}`}
                        onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                        className="group flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors duration-150 cursor-pointer"
                      >
                        <span className="w-3 h-px bg-zinc-700 group-hover:bg-blue-400 transition-colors shrink-0" />
                        <span className="leading-tight">{link.label}</span>
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* ══════════ BOTTOM: Socials + Copyright ══════════ */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Social icons — 44px tap targets */}
          <div className="flex items-center flex-wrap gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-500 hover:text-white hover:border-white/30 hover:bg-zinc-800 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[10px] font-mono text-zinc-600 leading-relaxed">
            © 2026 Tarunya Kesharwani · CC BY-NC-ND 4.0
          </p>
        </div>
      </div>
    </footer>
  );
};
