import React, { useState, useRef } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Volume2, VolumeX, ArrowDown, Sparkles } from "lucide-react";

export const HeroSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-white/10 select-none"
    >
      {/* ═══ CINEMATIC HERO VIDEO BACKGROUND (UNOBSTRUCTED) ═══ */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          aria-label="Tarunya Kesharwani Hero Cinematic Video"
          className="w-full h-full object-cover filter brightness-[0.75] contrast-110"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>

        {/* Minimal Gradient Vignette for UI Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60 pointer-events-none" />
      </div>

      {/* Top Spacer to account for Header */}
      <div className="relative z-10 pt-16" />

      {/* ═══ MINIMALIST BOTTOM OVERLAY BAR ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-6">
        {/* Bottom Left: Sleek Identity Badge & Status */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/15 backdrop-blur-xl shadow-2xl space-y-2 max-w-md">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] text-emerald-400 font-semibold tracking-wider uppercase">
              GSoC &apos;26 Developer @ C2SI
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
            {portfolioData.personal.name}
          </h1>

          <p className="text-xs font-mono text-zinc-300">
            {portfolioData.personal.role}
          </p>

          <div className="pt-1">
            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-white transition-colors"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Bottom Right: Interactive Sound Control Toggle */}
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
          className="group inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-950/80 border border-white/20 backdrop-blur-xl text-white hover:border-white/40 hover:bg-zinc-900 transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer font-mono text-xs"
        >
          {isMuted ? (
            <>
              <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                <VolumeX className="w-3.5 h-3.5" />
              </div>
              <span className="text-zinc-300 font-medium">SOUND: OFF</span>
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <span className="text-blue-400 font-semibold flex items-center gap-1">
                <span>SOUND: ON</span>
                <span className="inline-flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2 bg-blue-400 animate-pulse"></span>
                  <span className="w-0.5 h-3 bg-blue-400 animate-pulse" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-0.5 h-1.5 bg-blue-400 animate-pulse" style={{ animationDelay: "300ms" }}></span>
                </span>
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
