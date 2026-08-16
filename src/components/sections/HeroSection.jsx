import React from "react";
import { ShinyText } from "@/components/ui/shiny-text";
import { portfolioData } from "@/data/portfolioData";
import { ArrowRight, Sparkles, Terminal, FileCode2 } from "lucide-react";

export const HeroSection = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-20 overflow-hidden border-b border-white/10"
    >
      {/* ═══ CINEMATIC HERO VIDEO BACKGROUND ═══ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover filter brightness-[0.45] contrast-125 scale-105"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>

        {/* High-Readability Soft Dark Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-[#09090b]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#09090b]/40 to-[#09090b]/90" />

        {/* Subtle Architectural Blueprint Dot Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ═══ HERO CONTENT ═══ */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center my-auto space-y-8">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-white/15 backdrop-blur-md shadow-lg shadow-black/40 text-xs font-medium text-zinc-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-emerald-400 font-semibold tracking-wide">
            AVAILABLE FOR ROLES &middot; GSOC &apos;26 DEVELOPER
          </span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
            Architecting <br />
            <ShinyText className="bg-gradient-to-r from-blue-400 via-emerald-300 to-violet-400 bg-clip-text text-transparent">
              High-Throughput Systems
            </ShinyText>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-zinc-300 font-normal max-w-2xl mx-auto leading-relaxed">
            {portfolioData.personal.tagline}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
          <button
            onClick={() => scrollTo("projects")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-xl shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Flagship Systems</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900/90 text-zinc-200 font-medium text-sm border border-white/15 hover:border-white/30 hover:bg-zinc-800/90 hover:text-white transition-all duration-200 backdrop-blur-md"
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Initiate Inquiry</span>
          </button>
        </div>

        {/* Quick Telemetry Metric Bar */}
        <div className="pt-8 w-full max-w-4xl border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 font-mono">
          {portfolioData.metrics.map((metric) => (
            <div
              key={metric.label}
              className="p-3 sm:p-4 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center"
            >
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {metric.value}
              </span>
              <span className="text-[11px] text-zinc-400 font-sans mt-0.5 font-medium">
                {metric.label}
              </span>
              <span className="text-[10px] text-emerald-400 font-mono mt-1 font-semibold uppercase tracking-wider">
                {metric.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
