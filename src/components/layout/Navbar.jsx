import React, { useState, useEffect } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { portfolioData } from "@/data/portfolioData";
import { Download, ArrowUpRight } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Monogram & Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="group flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center font-mono font-bold text-sm text-white group-hover:border-blue-500/60 group-hover:bg-blue-500/10 transition-all duration-300 shadow-md">
            TK
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-zinc-100 group-hover:text-white transition-colors">
              {portfolioData.personal.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
              Systems Architect &bull; GSoC &apos;26
            </span>
          </div>
        </a>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Resume PDF Download */}
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Tarunya_Kesharwani_Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-zinc-900/90 border border-white/10 hover:border-white/25 hover:text-white transition-all duration-200"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>CV</span>
          </a>

          {/* Hire Me Shimmer CTA */}
          <ShimmerButton
            onClick={() => scrollToSection("contact")}
            shimmerColor="#60a5fa"
            shimmerDuration="2.5s"
            background="rgba(18, 18, 22, 0.95)"
            className="px-4 py-2 text-xs font-medium tracking-wide shadow-md"
          >
            <span className="flex items-center gap-1.5 font-medium text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Hire Me
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </ShimmerButton>
        </div>
      </div>
    </header>
  );
};
