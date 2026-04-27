import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDocumentSEO from "../hooks/useDocumentSEO";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import SystemsGrid from "../components/SystemsGrid.jsx";
import Journey from "../components/Journey.jsx";
import Promo from "../components/Promo.jsx";
import Insights from "../components/Insights.jsx";
import Signals from "../components/Signals.jsx";
import ConnectTerminal from "../components/ConnectTerminal.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import SkillsArchive from "../components/SkillsRegistry.jsx";

const Home = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  useDocumentSEO({
    title: "TK. Systems — Digital System Architect & Full-Stack Engineer",
    description:
      "Tarunya Kesharwani builds high-performance digital systems, AI-powered tools, and scalable web applications. Explore the 2026 Architectural Archive.",
  });

  useEffect(() => {
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

    // Reveal Sections on Scroll
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
        color: "rgba(0, 0, 0, 1)",
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          end: "top 40%",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="w-full bg-white min-h-screen relative overflow-hidden">
      {/* GSAP Parallax Blueprint Grid */}
      <div 
        ref={gridRef}
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
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
        <SkillsArchive />
        <SystemsGrid limit={6} />
        <ServicesSection />
        <Journey />
        <Promo />
        <Insights />
        <ConnectTerminal />
      </div>
    </main>
  );
};

export default Home;
