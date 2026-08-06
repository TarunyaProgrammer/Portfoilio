import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { audioSynth } from "../utils/audioSynth";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(audioSynth.isMuted());
  const [time, setTime] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (!menuOpen) return;
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSoundToggle = () => {
    const isMutedNow = audioSynth.toggleMute();
    setMuted(isMutedNow);
  };

  const iconNavLinks = [
    {
      to: "/",
      label: "Home",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-white stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: "/systems",
      label: "Projects",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-white stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      to: "/blogs",
      label: "Blogs",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-white stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      to: "/resume",
      label: "Resume",
      icon: (
        <svg className="w-6 h-6 shrink-0 text-white stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* 1. TOP-LEFT: Pixelated Logo */}
      <div className="fixed top-6 left-6 md:left-10 z-[10000] select-none">
        <Link
          to="/"
          onClick={() => audioSynth.playClickSound()}
          className="group flex items-center bg-[#141417] px-4 py-2 border-2 border-white shadow-[3px_3px_0px_#000]"
          aria-label="Tarunya Home Page"
        >
          <span className="font-pixel font-bold text-xs sm:text-sm text-white group-hover:text-[#ff2a2a] transition-colors uppercase tracking-widest leading-none font-['Press_Start_2P']">
            TARUNYA KESH
          </span>
        </Link>
      </div>

      {/* 2. TOP-RIGHT: Book Call CTA Button */}
      <div className="fixed top-6 right-6 md:right-10 z-[10000] select-none flex items-center gap-3">
        <Link
          to="/connect"
          onClick={() => audioSynth.playCoinSound()}
          className="font-pixel text-xs bg-white text-black px-5 py-2.5 border-2 border-white shadow-[3px_3px_0px_#ff2a2a] hover:bg-[#ff2a2a] hover:text-white transition-all uppercase rounded-none font-bold"
        >
          Book Call ↗
        </Link>

        {/* Mobile Menu Toggle (Visible on Small Screens) */}
        <button
          onClick={() => {
            audioSynth.playClickSound();
            setMenuOpen((prev) => !prev);
          }}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-menu"
          className="md:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 bg-[#ff2a2a] text-white border-2 border-white rounded-none shadow-[2px_2px_0px_#000]"
        >
          <span className="block w-4 h-0.5 bg-white" />
          <span className="block w-4 h-0.5 bg-white" />
          <span className="block w-4 h-0.5 bg-white" />
        </button>
      </div>

      {/* 3. LEFT-SIDE: Prominent, Crisp Icon-Only Always-Visible Island Navigation */}
      <nav
        aria-label="Main Navigation"
        className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[10000] hidden md:flex flex-col gap-2.5 bg-[#141417] border-2 border-white p-2.5 shadow-[4px_4px_0px_#000] select-none font-pixelify rounded-none"
      >
        {/* Retro Corner Markers */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#ff2a2a] pointer-events-none" />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff2a2a] pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#ff2a2a] pointer-events-none" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#ff2a2a] pointer-events-none" />

        {iconNavLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <div key={link.to} className="relative group/tooltip">
              <Link
                to={link.to}
                onClick={() => audioSynth.playClickSound()}
                className={`w-11 h-11 flex items-center justify-center transition-all rounded-none border ${
                  isActive
                    ? "bg-[#ff2a2a] text-white border-white shadow-[2px_2px_0px_#000]"
                    : "bg-[#0d0d0f] text-white border-white/30 hover:text-white hover:bg-[#ff2a2a] hover:border-white"
                }`}
                aria-label={link.label}
              >
                {link.icon}
              </Link>
              {/* Tooltip on Hover */}
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover/tooltip:block bg-[#00ff66] text-black font-mono font-bold text-[10px] px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] whitespace-nowrap uppercase tracking-widest pointer-events-none z-[10005]">
                {link.label}
              </div>
            </div>
          );
        })}
      </nav>

      {/* 4. BOTTOM-RIGHT: Mute ON/OFF Option */}
      <div className="fixed bottom-6 right-6 md:right-10 z-[10000] select-none">
        <button
          onClick={handleSoundToggle}
          aria-label={muted ? "Enable Synthesizer Sound Effects" : "Mute Synthesizer Sound Effects"}
          className={`px-4 py-2 font-pixel text-xs uppercase border-2 transition-all rounded-none flex items-center gap-2 shadow-[3px_3px_0px_#000] ${
            muted
              ? "bg-[#18181c] text-white/60 border-white/30 hover:border-[#ff2a2a] hover:text-white"
              : "bg-[#141417] text-[#00ff66] border-[#00ff66] hover:bg-[#ff2a2a] hover:text-white hover:border-white"
          }`}
        >
          {muted ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
          <span>{muted ? "MUTE: OFF" : "SOUND: ON"}</span>
        </button>
      </div>


      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[9995] bg-[#0d0d0f] text-white md:hidden flex flex-col px-8 pt-28 pb-20 justify-between overflow-y-auto font-pixelify"
          >
            <div className="space-y-8">
              <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-widest border-b-2 border-white/20 pb-3 flex items-center justify-between">
                <span>NAVIGATION WARP</span>
                <span className="text-[#00ff66]">ACTIVE</span>
              </div>

              <div className="flex flex-col gap-4 font-pixel">
                {iconNavLinks.map((link, i) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => {
                      audioSynth.playClickSound();
                      setMenuOpen(false);
                    }}
                    className="flex justify-between items-center p-4 border-2 border-white/20 bg-[#141417] rounded-none hover:bg-[#ff2a2a] hover:text-white transition-all group shadow-[3px_3px_0px_#ff2a2a]"
                  >
                    <span className="text-sm">0{i + 1}. {link.label}</span>
                    <span className="font-mono text-xs text-[#00ff66] group-hover:text-white">WARP ↗</span>
                  </Link>
                ))}

                <Link
                  to="/connect"
                  onClick={() => {
                    audioSynth.playCoinSound();
                    setMenuOpen(false);
                  }}
                  className="block text-center p-4 bg-white text-black font-pixel text-xs uppercase tracking-widest border-2 border-white rounded-none shadow-[4px_4px_0px_#ff2a2a] hover:bg-[#ff2a2a] hover:text-white"
                >
                  Book A Call ↗
                </Link>
              </div>
            </div>

            <div className="border-t-2 border-white/20 pt-6 font-mono text-xs text-white/50 space-y-2">
              <div className="flex justify-between">
                <span>RUNTIME STATUS</span>
                <span className="text-[#ff2a2a] font-bold">{time || "LIVE"}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
