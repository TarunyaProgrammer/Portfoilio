import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Volume2, VolumeX, ArrowDown } from "lucide-react";

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

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-8 lg:p-10 overflow-hidden border-b border-white/10 select-none"
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

      {/* ═══ CINEMATIC WIDESCREEN HUD BOTTOM BAR ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-zinc-950/60 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          {/* Left: Identity Metadata */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex flex-col">
              <span className="text-white font-sans font-bold text-sm sm:text-base tracking-tight">
                {portfolioData.personal.name}
              </span>
              <span className="text-[11px] text-zinc-400">
                Systems Architect &bull; GSoC &apos;26 @ C2SI
              </span>
            </div>
          </div>

          {/* Center: Minimalist Scroll Prompt */}
          <button
            onClick={scrollToAbout}
            className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer text-[11px]"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-3 h-3 text-blue-400 animate-bounce" />
          </button>

          {/* Right: Telemetry & Audio Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-2 md:pt-0">
            <span className="text-[11px] text-zinc-500 font-mono">
              IST: <strong className="text-zinc-300">{time || "22:33"}</strong>
            </span>

            <button
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute Hero Video" : "Mute Hero Video"}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all cursor-pointer text-[11px]"
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
      </div>
    </section>
  );
};
