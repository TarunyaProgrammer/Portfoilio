import { useEffect, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDocumentSEO from "../hooks/useDocumentSEO";
import Hero from "../components/Hero.jsx";
import Signals from "../components/Signals.jsx";
import About from "../components/About.jsx";

// Lazy loaded components
const SystemsGrid = lazy(() => import("../components/SystemsGrid.jsx"));
const Journey = lazy(() => import("../components/Journey.jsx"));
const Promo = lazy(() => import("../components/Promo.jsx"));
const Insights = lazy(() => import("../components/Insights.jsx"));
const ConnectTerminal = lazy(() => import("../components/ConnectTerminal.jsx"));
const ServicesSection = lazy(() => import("../components/ServicesSection.jsx"));
const SkillsArchive = lazy(() => import("../components/SkillsRegistry.jsx"));

const Home = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useDocumentSEO({
    title: "TK. Systems — Digital System Architect & Full-Stack Engineer",
    description:
      "Tarunya Kesharwani builds high-performance digital systems, AI-powered tools, and scalable web applications. Explore the 2026 Architectural Archive.",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Grid Background
      gsap.to(gridRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

      // Pin Hero Section (Only on Desktop)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        ScrollTrigger.create({
          trigger: ".hero-container",
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false
        });
      });

      const sections = containerRef.current.querySelectorAll("section");
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // About Text Scroll Reveal
      gsap.utils.toArray(".about-text p").forEach((p) => {
        gsap.to(p, {
          color: "rgba(255, 255, 255, 0.95)",
          scrollTrigger: {
            trigger: p,
            start: "top 80%",
            end: "top 40%",
            scrub: true
          }
        });
      });
    }, containerRef);

    const refreshScroll = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refreshScroll);
    };
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-[#0d0d0f] text-white min-h-screen relative overflow-hidden selection:bg-[#ff2a2a] selection:text-white">
      {/* GSAP Parallax Blueprint Grid */}
      <div 
        ref={gridRef}
        className="fixed inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          height: "150%" // Taller for parallax room
        }}
      />

      <div className="relative z-10">
        <div className="hero-container">
          <Hero />
        </div>
        <Signals />
        <About />
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-black/20">Initialising System Modules...</div>}>
          <SkillsArchive />
          <SystemsGrid limit={3} />
          <ServicesSection />
          <Journey />
          <Promo />
          <Insights />
          <ConnectTerminal />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
