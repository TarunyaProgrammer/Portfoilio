import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Volume2, VolumeX, RotateCcw, ArrowUpRight, Linkedin } from "lucide-react";
import { CinematicHeroEngine } from "@/components/ui/cinematic-hero-engine";

export const HeroSection = () => {
  const engineRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReplay = () => {
    engineRef.current?.replay();
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const linkedinUrl = portfolioData.socials.find((social) => social.name === "LinkedIn")?.url;

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] flex flex-col justify-between p-5 sm:p-10 lg:p-14 pb-28 sm:pb-10 overflow-hidden border-b border-white/10 select-none"
    >
      {/* ═══ CINEMATIC HERO BACKGROUND VIDEO LAYER ═══ */}
      <CinematicHeroEngine
        ref={engineRef}
        isMuted={isMuted}
        className="absolute inset-0 w-full h-full z-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#050507]/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[58%] bg-gradient-to-t from-[#050507]/95 via-[#050507]/65 to-transparent"
      />

      {/* Top Spacer */}
      <div className="relative z-10 pt-20" />

      {/* ═══ SEAMLESS CORNER OVERLAYS (BLENDED ON TOP OF VIDEO) ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Bottom-Left: Clear positioning over the cinematic layer */}
        <div
          itemScope
          itemType="https://schema.org/Person"
          className="flex max-w-2xl flex-col drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)] space-y-3"
        >
          <div className="inline-flex items-center gap-2 self-start rounded-md border border-blue-300/30 bg-black/65 px-3 py-1 text-[11px] font-mono text-blue-100 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-300" />
            <span>{portfolioData.personal.statusText}</span>
          </div>

          <h1
            itemProp="name"
            className="text-white font-sans font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight"
          >
            {portfolioData.personal.name}
          </h1>
          <p className="max-w-xl text-lg font-medium leading-tight tracking-[-0.02em] text-white sm:text-2xl lg:text-3xl">
            {portfolioData.personal.tagline}
          </p>
          <p
            itemProp="jobTitle"
            className="text-xs sm:text-sm text-zinc-300 font-mono tracking-wide"
          >
            {portfolioData.personal.role} &bull; {portfolioData.personal.gsocBadge}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[#07111f] shadow-[0_10px_30px_-12px_rgba(96,165,250,0.8)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-blue-100 hover:shadow-[0_14px_34px_-12px_rgba(96,165,250,0.95)] active:translate-y-px"
            >
              <span>View selected work</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/45 px-3.5 py-2 text-zinc-100 backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 hover:border-blue-200/60 hover:bg-black/65 active:translate-y-px"
              >
                <Linkedin className="h-3.5 w-3.5 text-blue-200" aria-hidden="true" />
                <span>Connect on LinkedIn</span>
              </a>
            )}
          </div>
        </div>

        {/* Bottom-Right: Repeat and Mute/Unmute Controls + Clock */}
        <div className="flex items-center flex-wrap gap-2 font-mono text-xs drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          <span className="hidden sm:inline-block text-zinc-300 font-medium px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-sm">
            IST: <strong className="text-white">{time || "23:45"}</strong>
          </span>

          {/* Repeat Button */}
          <button
            onClick={handleReplay}
            aria-label="Replay Hero Video"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-[color,border-color,background-color] cursor-pointer backdrop-blur-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repeat</span>
          </button>

          {/* Mute / Unmute Button */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute Hero Audio" : "Mute Hero Audio"}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-[color,border-color,background-color] cursor-pointer backdrop-blur-sm"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span>Audio: Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-400 font-medium">Audio: On</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
