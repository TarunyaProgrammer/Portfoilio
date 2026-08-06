import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { audioSynth } from "../utils/audioSynth";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-GB")); // 24-hr format e.g. 23:38:52
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/TarunyaProgrammer",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/tarunyakesharwani",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "X",
      url: "https://x.com/TarunyaKesh",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  // ═══════════════════════════════════════════════════════════════
  // OTHER PAGES: SHORT MINIMALIST FOOTER
  // ═══════════════════════════════════════════════════════════════
  if (!isHomePage) {
    return (
      <footer className="w-full bg-[#0d0d0f] text-white py-6 px-6 md:px-12 border-t border-white/10 font-mono text-xs select-none relative z-20 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-white/70">
            <span>&copy; 2026 TARUNYA SYSTEMS</span>
            <span>&middot;</span>
            <span className="text-[#00ff66] font-bold">{timeStr || "LIVE"}</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white/60">BUILT BY TARUNYA KESHARWANI</span>
            <Link
              to="/connect"
              onClick={() => audioSynth.playClickSound()}
              className="text-[#ff2a2a] font-bold hover:underline"
            >
              ALL SYSTEMS GO ↗
            </Link>
          </div>
        </div>
      </footer>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // HOME PAGE: 100VH 100VW RETRO PIXEL CANVAS FOOTER
  // ═══════════════════════════════════════════════════════════════
  return (
    <footer className="w-full min-h-screen bg-black text-white p-8 md:p-16 relative overflow-hidden font-pixel select-none border-t-4 border-[#ff2a2a] flex flex-col justify-between pb-24 md:pb-28">
      {/* 1. Top Metadata Header */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-white/80">
        {/* Left Side: © 2026 • Time • Location • Prominent Social Icons */}
        <div className="flex items-center gap-6 flex-wrap">
          <span>&copy; 2026</span>
          <span className="text-[#00ff66] font-bold">{timeStr || "23:38:52"}</span>
          <span>India</span>

          {/* Large Visible Social Icons */}
          <div className="flex items-center gap-3 ml-2">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => audioSynth.playClickSound()}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-white/10 hover:bg-[#ff2a2a] border border-white/30 flex items-center justify-center text-white transition-all shadow-[3px_3px_0px_#000]"
                aria-label={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Built by Tarunya Kesharwani */}
        <div className="text-white/70 font-mono">
          Built by <span className="text-white font-bold">Tarunya Kesharwani</span>
        </div>
      </div>

      {/* 2. Middle Visual Accent: Glowing Pink/Neon Pixel Cube (Floating Right) */}
      <div className="w-full max-w-7xl mx-auto flex justify-end pr-8 md:pr-24 my-auto">
        <div className="w-20 h-20 sm:w-32 sm:h-32 bg-[#ff66cc] border-4 border-white shadow-[0_0_40px_#ff66cc] animate-pulse" />
      </div>

      {/* 3. Bottom Row: 2-Line Headline (Bottom-Left) & Sharp Contact Button (Bottom-Right) */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 pt-8 border-t border-white/10">
        {/* Bottom Left: Headline Strictly in 2 Lines */}
        <div className="max-w-4xl text-left">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white uppercase tracking-tight leading-[1.05] font-pixel">
            LET'S HAVE FUN WITH YOUR <br />
            DESIGNS, SAY HI!
          </h2>
        </div>

        {/* Bottom Right: Sharp 8-Bit Retro Contact Button */}
        <div className="shrink-0">
          <Link
            to="/connect"
            onClick={() => audioSynth.playCoinSound()}
            className="inline-block bg-white text-black font-pixel text-xs sm:text-sm px-8 py-4 border-2 border-white shadow-[4px_4px_0px_#ff2a2a] hover:bg-[#ff2a2a] hover:text-white transition-all uppercase rounded-none"
          >
            Contact Me ↗
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
