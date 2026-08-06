import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { audioSynth } from "../utils/audioSynth";

const ResumePage = () => {
  useDocumentSEO({
    title: "Curriculum Vitae — Tarunya Kesharwani",
    description:
      "A comprehensive record of systems built, technical contributions, and professional experience.",
  });

  const [isHovering, setIsHovering] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <main className="w-full bg-[#0d0d0f] text-white min-h-screen pt-32 md:pt-44 pb-32 px-6 md:px-12 selection:bg-[#ff2a2a] selection:text-white font-pixelify">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-2 border-white/20 bg-[#141417] p-8 md:p-12 shadow-[4px_4px_0px_#ff2a2a] space-y-4 rounded-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00ff66] rounded-none inline-block animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#fbd000] uppercase tracking-[0.5em]">
              PROFESSIONAL ARCHIVE LOG // RESUME.PDF
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none tracking-tight uppercase font-pixelify">
            Curriculum <br />
            <span className="font-normal italic text-[#ff2a2a] text-3xl sm:text-5xl md:text-7xl">Vitae.</span>
          </h1>
          <p className="text-white/80 font-sans text-base md:text-lg max-w-2xl leading-relaxed">
            A comprehensive record of system architecture, engineering initiatives, and technical contributions in the digital space.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* PDF Preview Frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="relative bg-[#141417] border-2 border-white/20 shadow-[6px_6px_0px_#00e5ff] overflow-hidden group cursor-pointer rounded-none"
              style={{ aspectRatio: "1 / 1.414" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Loading skeleton */}
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-[#0d0d0f] flex items-center justify-center z-10 font-pixelify">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-[#ff2a2a] border-t-transparent rounded-none animate-spin" />
                    <p className="text-xs font-mono font-bold text-[#fbd000] tracking-widest uppercase">
                      SYNCING RESUME.PDF...
                    </p>
                  </div>
                </div>
              )}

              {/* PDF object preview */}
              <object
                data="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                type="application/pdf"
                title="Tarunya Kesharwani Resume"
                className="w-full h-full border-0 bg-white"
                onLoad={() => setIframeLoaded(true)}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-[#0d0d0f] text-center font-pixelify">
                  <p className="text-white/80 font-sans font-medium mb-6">PDF preview is not supported natively by your browser.</p>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => audioSynth.playClickSound()}
                    className="px-6 py-3 bg-[#ff2a2a] text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black transition-all border-2 border-white shadow-[3px_3px_0px_#fff]"
                  >
                    Open PDF directly ↗
                  </a>
                </div>
              </object>

              {/* Hover Overlay */}
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#0d0d0f]/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-6"
                  >
                    <motion.a
                      href="/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioSynth.playCoinSound()}
                      className="px-8 py-4 bg-[#ff2a2a] text-white font-pixel text-xs uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_#fff] hover:bg-[#00e5ff] hover:text-black transition-all"
                    >
                      OPEN DOCUMENT ↗
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Col — Info + Retro Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8 lg:sticky lg:top-32 font-mono"
          >
            {/* Stats / Tags */}
            <div className="border-2 border-white/20 bg-[#141417] p-6 space-y-6 shadow-[4px_4px_0px_#fbd000]">
              <p className="text-xs font-mono font-bold text-[#fbd000] uppercase tracking-widest border-b border-white/10 pb-3">
                CORE COMPETENCIES
              </p>
              <ul className="space-y-4 font-mono">
                {[
                  ["Role", "Full-Stack Engineer"],
                  ["Specialization", "System Architecture & AI"],
                  ["Primary Stack", "React, Node & Rust"],
                  ["Availability", "Consultation & Projects"],
                ].map(([label, value]) => (
                  <li key={label} className="flex flex-col gap-1 border-b border-white/10 pb-2">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 font-mono text-xs">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioSynth.playCoinSound()}
                className="flex items-center justify-between px-6 py-4 bg-[#ff2a2a] text-white font-bold uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black transition-all border-2 border-white shadow-[4px_4px_0px_#fff]"
              >
                <span>View PDF Document</span>
                <span>↗</span>
              </a>

              <a
                href="/Resume.pdf"
                download="Tarunya_Kesharwani_Resume.pdf"
                onClick={() => audioSynth.playCoinSound()}
                className="flex items-center justify-between px-6 py-4 bg-[#141417] border-2 border-white/30 text-[#00ff66] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_#00ff66]"
              >
                <span>Download PDF File</span>
                <span>↓</span>
              </a>
            </div>

            <div className="border-2 border-white/10 bg-[#141417] p-4 text-center font-mono text-[10px] font-bold text-white/50 uppercase">
              LAST SYNCHRONIZED &middot; 2026 ARCHIVE
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ResumePage;
