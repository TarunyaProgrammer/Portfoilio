import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Volume2, VolumeX } from "lucide-react";

export const HeroSection = () => {
  const videoRef = useRef(null);
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

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden border-b border-white/10 select-none"
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
          className="w-full h-full object-cover filter brightness-[0.80] contrast-105"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/70 pointer-events-none" />
      </div>

      {/* Top Spacer */}
      <div className="relative z-10 pt-20" />

      {/* ═══ INDEPENDENT CORNER FLOATING ISLANDS ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
        {/* Bottom-Left Independent Island: Name & Role */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col font-mono">
          <span className="text-white font-sans font-bold text-base sm:text-lg tracking-tight">
            {portfolioData.personal.name}
          </span>
          <span className="text-xs text-zinc-400 mt-0.5">
            Systems Architect &bull; GSoC &apos;26 @ C2SI
          </span>
        </div>

        {/* Bottom-Right Independent Island: Clock & Sound Toggle */}
        <div className="flex items-center gap-3 self-end sm:self-auto font-mono text-xs">
          <span className="hidden sm:inline-block px-3.5 py-2 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md text-zinc-400 shadow-2xl">
            IST: <strong className="text-white">{time || "22:45"}</strong>
          </span>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md text-zinc-300 hover:text-white hover:border-white/30 hover:bg-zinc-900 transition-all cursor-pointer shadow-2xl"
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
