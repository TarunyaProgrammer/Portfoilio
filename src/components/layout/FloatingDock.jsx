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

const NAV_ITEMS = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "Profile & Philosophy", icon: User },
  { id: "skills", label: "Capabilities & Stack", icon: Cpu },
  { id: "projects", label: "Flagship Products", icon: FolderGit2 },
  { id: "experience", label: "Experience & Milestones", icon: Briefcase },
  { id: "writing", label: "Technical Writings", icon: PenTool },
  { id: "contact", label: "Transmission & Inquiry", icon: Mail },
];

export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      for (const item of NAV_ITEMS) {
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
        <Dock className="gap-2 sm:gap-2.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <DockIcon
                key={item.id}
                label={item.label}
                isActive={isActive}
                onClick={() => scrollTo(item.id)}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                  }`}
                />
              </DockIcon>
            );
          })}

          {/* Authentic macOS Dock Separator Bar */}
          <div className="w-[1px] h-7 bg-white/20 my-auto mx-1 self-center rounded-full" />

          {/* Direct Resume Download App Tile */}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tarunya_Kesharwani_Resume.pdf"
            className="flex items-center"
          >
            <DockIcon label="Download Resume (PDF)">
              <FileText className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            </DockIcon>
          </a>
        </Dock>
      </div>
    </div>
  );
};
