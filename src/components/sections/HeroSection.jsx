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
        {/* Bottom Left: Seamless Ethereal Identity Overlay */}
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="tracking-wider uppercase font-medium">
              GSoC &apos;26 Developer @ C2SI
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
            {portfolioData.personal.name}
          </h1>

          <p className="text-xs sm:text-sm font-mono text-zinc-300 drop-shadow">
            {portfolioData.personal.role}
          </p>

          <div className="pt-2">
            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group cursor-pointer"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5 text-blue-400 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom Right: Interactive Sound Control Toggle */}
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white hover:border-white/30 hover:bg-black/60 transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono text-xs shadow-lg"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-zinc-400 group-hover:text-zinc-200 text-[11px] font-medium">Sound: Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 font-semibold text-[11px]">Sound: On</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
};
