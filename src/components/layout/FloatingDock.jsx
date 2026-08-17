import React, { useState, useEffect } from "react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  Briefcase,
  PenTool,
  Mail,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero",       label: "Home",       icon: Home       },
  { id: "about",      label: "Profile",    icon: User       },
  { id: "skills",     label: "Tech",       icon: Cpu        },
  { id: "projects",   label: "Projects",   icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase  },
  { id: "writing",    label: "Writing",    icon: PenTool    },
  { id: "contact",    label: "Contact",    icon: Mail       },
];

// ── Detect pointer capability (runs once, stable) ──────────────────────────
const IS_POINTER_FINE =
  typeof window !== "undefined"
    ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
    : true;

// ══════════════════════════════════════════════════════════
//  MOBILE: Instagram-style full-width pill nav bar
// ══════════════════════════════════════════════════════════
const MobileNav = ({ activeSection, onNav }) => {
  // Show only 7 icons + resume = 8 items; spread equally across full width
  const items = [
    ...NAV_ITEMS,
    { id: "__resume__", label: "Resume", icon: FileText, isResume: true },
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pointer-events-none"
      style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom, 16px))" }}
    >
      <motion.div
        className="pointer-events-auto w-full"
        style={{ maxWidth: "min(96vw, 520px)" }}
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Pill container */}
        <div
          className="relative flex items-center justify-between rounded-2xl px-2 py-2"
          style={{
            background: "rgba(9,9,11,0.82)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(28px) saturate(1.6)",
            WebkitBackdropFilter: "blur(28px) saturate(1.6)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.7), inset 0 1px 1px rgba(255,255,255,0.1)",
          }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;

            if (item.isResume) {
              return (
                <a
                  key="resume"
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Tarunya_Kesharwani_Resume.pdf"
                  className="relative flex flex-col items-center justify-center flex-1 py-1 group"
                  aria-label="Download Resume"
                >
                  <div className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-150">
                    <Icon className="w-[18px] h-[18px] text-emerald-400 transition-all duration-150" />
                  </div>
                </a>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                aria-label={item.label}
                className="relative flex flex-col items-center justify-center flex-1 py-1 group cursor-pointer"
              >
                {/* Active background pill */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-active-pill"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <div className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-150">
                  <Icon
                    className={`w-[18px] h-[18px] transition-all duration-200 ${
                      isActive ? "text-white" : "text-zinc-500 group-active:text-white"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.7}
                  />
                </div>

                {/* Active glow dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="mobile-glow-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                      style={{ boxShadow: "0 0 6px 2px rgba(255,255,255,0.7)" }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ type: "spring", stiffness: 520, damping: 28 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
//  DESKTOP: macOS magnification dock (unchanged)
// ══════════════════════════════════════════════════════════
const DesktopDock = ({ activeSection, onNav }) => (
  <div
    className="fixed inset-x-0 z-50 flex justify-center px-3 pointer-events-none"
    style={{ bottom: "max(24px, env(safe-area-inset-bottom, 24px))" }}
  >
    <div className="pointer-events-auto w-full flex justify-center" style={{ maxWidth: "min(96vw, 520px)" }}>
      <Dock>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <DockIcon
              key={item.id}
              label={item.label}
              isActive={isActive}
              onClick={() => onNav(item.id)}
            >
              <Icon
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                  isActive ? "text-white" : "text-zinc-400"
                }`}
              />
            </DockIcon>
          );
        })}

        <div className="w-px h-5 sm:h-6 bg-white/20 mx-0.5 sm:mx-1 shrink-0 rounded-full" />

        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Tarunya_Kesharwani_Resume.pdf"
          className="flex items-center"
        >
          <DockIcon label="Resume PDF">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 transition-colors" />
          </DockIcon>
        </a>
      </Dock>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════
//  ROOT: Switches between Mobile and Desktop nav
// ══════════════════════════════════════════════════════════
export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(item.id);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return IS_POINTER_FINE ? (
    <DesktopDock activeSection={activeSection} onNav={scrollTo} />
  ) : (
    <MobileNav activeSection={activeSection} onNav={scrollTo} />
  );
};
