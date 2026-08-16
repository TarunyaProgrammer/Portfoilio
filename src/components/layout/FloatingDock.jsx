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

export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Tech Stack", icon: Cpu },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "writing", label: "Writings", icon: PenTool },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto">
        <Dock className="bg-zinc-950/85 backdrop-blur-xl border border-white/15 p-1.5 shadow-2xl shadow-black/80 rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <DockIcon
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative group p-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

                {/* Floating Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/15 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                  {item.label}
                </span>

                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-sm bg-white/80" />
                )}
              </DockIcon>
            );
          })}

          <div className="w-[1px] h-6 bg-white/15 my-auto mx-1" />

          {/* Direct Resume Link */}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tarunya_Kesharwani_Resume.pdf"
            className="flex items-center"
          >
            <DockIcon className="relative group p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <FileText className="w-5 h-5 transition-transform group-hover:scale-110 text-emerald-400" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/15 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                Resume (PDF)
              </span>
            </DockIcon>
          </a>
        </Dock>
      </div>
    </div>
  );
};
