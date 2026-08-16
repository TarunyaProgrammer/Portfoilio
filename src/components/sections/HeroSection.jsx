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
          className="w-full h-full object-cover filter brightness-[0.80] contrast-105"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/70 pointer-events-none" />
      </div>

      {/* Top Spacer */}
      <div className="relative z-10 pt-20" />

      {/* ═══ SEAMLESS CORNER OVERLAYS (BLENDED WITH BACKGROUND) ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
        {/* Bottom-Left: Seamless Typography Directly on Video */}
        <div className="flex flex-col drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          <h1 className="text-white font-sans font-bold text-xl sm:text-3xl tracking-tight leading-tight">
            {portfolioData.personal.name}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-mono mt-1 tracking-wide">
            Systems Architect &bull; GSoC &apos;26 @ C2SI
          </p>
        </div>

        {/* Bottom-Right: Seamless Timestamp & Audio Control */}
        <div className="flex items-center gap-4 self-end sm:self-auto font-mono text-xs drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
          <span className="hidden sm:inline-block text-zinc-300 font-medium">
            IST: <strong className="text-white">{time || "22:45"}</strong>
          </span>

          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
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
