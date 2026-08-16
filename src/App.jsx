import React, { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingDock } from "@/components/layout/FloatingDock";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { FlagshipProjects } from "@/components/sections/FlagshipProjects";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export function App() {
  // Initialize Lenis smooth inertial scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans selection:bg-blue-500/40 selection:text-white overflow-x-hidden">
      {/* Magic UI Animated Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatedGridPattern
          numSquares={45}
          maxOpacity={0.16}
          duration={3.5}
          className="[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_90%)] inset-0 w-full h-full"
        />
      </div>

      {/* Top Navbar */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <TechStackSection />
        <FlagshipProjects />
        <ExperienceTimeline />
        <PublicationsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Center macOS Dock */}
      <FloatingDock />
    </div>
  );
}

export default App;
