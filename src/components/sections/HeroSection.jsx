import React from "react";
import { CinematicHeroEngine } from "@/components/ui/cinematic-hero-engine";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-between overflow-hidden border-b border-white/10 select-none"
    >
      {/* ═══ NATIVE V3 HIGH-ENERGY CINEMATIC HERO BACKGROUND ENGINE ═══ */}
      <CinematicHeroEngine className="absolute inset-0 w-full h-full z-0" />
    </section>
  );
};
