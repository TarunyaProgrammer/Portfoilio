import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
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

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden border-b border-white/10 select-none"
    >
      {/* ═══ CINEMATIC HERO BACKGROUND VIDEO LAYER ═══ */}
      <CinematicHeroEngine
        ref={engineRef}
        isMuted={isMuted}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Top Spacer */}
      <div className="relative z-10 pt-20" />

      {/* ═══ SEAMLESS CORNER OVERLAYS (BLENDED ON TOP OF VIDEO) ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Bottom-Left: Restored Intro Typography Line */}
        <div className="flex flex-col drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          <h1 className="text-white font-sans font-bold text-xl sm:text-3xl tracking-tight leading-tight">
            {portfolioData.personal.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-mono mt-1 tracking-wide">
            Systems Architect &bull; GSoC &apos;26 @ C2SI
          </p>
        </div>

        {/* Bottom-Right: Repeat and Mute/Unmute Controls + Clock */}
        <div className="flex items-center gap-3 font-mono text-xs drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          <span className="hidden sm:inline-block text-zinc-300 font-medium">
            IST: <strong className="text-white">{time || "23:45"}</strong>
          </span>

          {/* Repeat Button */}
          <button
            onClick={handleReplay}
            aria-label="Replay Hero Video"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repeat</span>
          </button>

          {/* Mute / Unmute Button */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? "Unmute Hero Audio" : "Mute Hero Audio"}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-sm"
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
