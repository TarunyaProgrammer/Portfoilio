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
        {/* Left: Classy Avatar & Cursive Brand Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="group flex items-center gap-3.5 cursor-pointer select-none"
        >
          {/* Photo Avatar with Elegant Ring */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-blue-400/80 transition-all duration-300 shadow-md bg-zinc-900 flex items-center justify-center group-hover:scale-105">
              <img
                src="/webme1.png"
                alt="Tarunya Kesharwani"
                className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Classy Cursive Name & Subtitle */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-signature text-3xl sm:text-4xl lg:text-[40px] font-normal text-white group-hover:text-blue-300 transition-colors leading-none tracking-wide pt-1">
                Tarunya k
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase hidden sm:inline leading-tight mt-0.5">
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

          {/* Hire Me CTA */}
          <ShimmerButton
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 text-xs font-medium tracking-wide shadow-md"
          >
            <span className="flex items-center gap-1.5 font-medium text-white">
              <span>Hire Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </ShimmerButton>
        </div>
      </div>
    </header>
  );
};
