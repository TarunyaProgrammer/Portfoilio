import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic.jsx";

const Nav = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [time, setTime] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    if (!menuOpen) return;
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, [menuOpen]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { to: "/systems", label: "Projects" },
    { to: "/blogs", label: "Blogs" },
    { to: "/resume", label: "Resume" },
  ];

  return (
    <>
      <nav
        style={{ height: "var(--nav-height)" }}
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 flex justify-between items-center bg-white/90 backdrop-blur-md"
      >
        <div className="flex items-center gap-16">
          <Link
            to="/"
            className="flex flex-col group relative"
          >
            <span 
              style={{ fontFamily: "'Ephesis', cursive" }}
              className="text-4xl text-black group-hover:scale-105 transition-transform duration-500 leading-none ephesis-regular"
            >
              Tarunya
            </span>
            <span className="text-[9px] font-bold text-black/20 uppercase tracking-[0.3em] mt-0.5 group-hover:text-black transition-colors">
              Systems Architect
            </span>
          </Link>
          <div className="hidden md:flex gap-10 font-bold text-[11px] tracking-[0.1em] items-center">
            {navLinks.map((link) => (
              <Magnetic key={link.to}>
                <Link
                  to={link.to}
                  className="text-black/40 hover:text-black transition-all hover:tracking-[0.2em] duration-500 uppercase px-4 py-2"
                >
                  {link.label}
                </Link>
              </Magnetic>
            ))}
          </div>
        </div>

        <div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/connect"
              className="text-sm font-bold border-b-2 border-black pb-1 hover:pb-2 transition-all flex items-center gap-2 group"
            >
              Book A Call
              <motion.svg 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[6px] z-50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-[1.5px] transition-all duration-500 ${
              menuOpen ? "rotate-45 translate-y-[7.5px] bg-white" : "bg-black"
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-500 ${
              menuOpen ? "opacity-0 bg-white" : "bg-black"
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-500 ${
              menuOpen ? "-rotate-45 -translate-y-[7.5px] bg-white" : "bg-black"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] text-white md:hidden flex flex-col px-10 pt-36 justify-between overflow-hidden"
          >
            {/* Holographic grid background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-screen"
              style={{
                backgroundImage: `
                  linear-gradient(to right, white 1px, transparent 1px),
                  linear-gradient(to bottom, white 1px, transparent 1px)
                `,
                backgroundSize: "30px 30px"
              }}
            />

            <div className="relative z-10 w-full">
              <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mb-10">
                navigation
              </div>
              <div className="flex flex-col items-start gap-6 text-4xl font-extrabold tracking-tighter w-full">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                    className="w-full flex justify-between items-baseline border-b border-white/5 pb-4 group"
                  >
                    <Link
                      to={link.to}
                      className="hover:text-[#D8F1A0] transition-colors flex items-baseline gap-4"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-[10px] font-mono font-bold text-white/30">0{i + 1}.</span>
                      <span>{link.label}</span>
                    </Link>
                    <span className="text-[9px] font-mono font-bold text-white/10 uppercase tracking-widest group-hover:text-[#D8F1A0]/30 transition-colors">
                      [NAV_ENTRY]
                    </span>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 + navLinks.length * 0.08, duration: 0.5 }}
                  className="w-full mt-6"
                >
                  <Link
                    to="/connect"
                    className="block w-full text-center py-4 bg-[#D8F1A0] hover:bg-white text-black font-extrabold text-xs uppercase tracking-[0.4em] transition-all duration-300 relative"
                    onClick={() => setMenuOpen(false)}
                  >
                    Inquiry Protocol &rarr;
                  </Link>
                </motion.div>
              </div>
            </div>
            
            <div className="relative z-10 pb-10 border-t border-white/5 pt-6 flex flex-col gap-4">
              <div className="flex justify-between items-center text-[8px] font-mono font-bold text-white/20 uppercase tracking-[0.4em]">
                <span>SYS_LOC: PORTFOLIO_V1.0</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  ACTIVE_SYNC
                </span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.3em]">
                <span>SYSTEM TIME: {time || "00:00:00"}</span>
                <div className="flex gap-4">
                  <a href="https://github.com/TarunyaProgrammer" target="_blank" rel="noreferrer" className="hover:text-[#D8F1A0] transition-colors">GH</a>
                  <a href="https://www.linkedin.com/in/tarunyakesharwani" target="_blank" rel="noreferrer" className="hover:text-[#D8F1A0] transition-colors">LN</a>
                  <a href="https://x.com/TarunyaKesh" target="_blank" rel="noreferrer" className="hover:text-[#D8F1A0] transition-colors">X</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
