import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const ResumePage = () => {
  useDocumentSEO({
    title: "Curriculum Vitae — Tarunya Kesharwani",
    description:
      "A comprehensive record of systems built, technical contributions, and professional experience.",
  });

  const [isHovering, setIsHovering] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <main className="w-full bg-white min-h-screen pt-32 md:pt-48 pb-32 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-24 text-center md:text-left"
        >
          <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
            professional record
          </div>
          <h1 className="text-6xl md:text-9xl font-bold text-black leading-none mb-8 tracking-tighter">
            Curriculum <br />
            <span className="italic font-normal opacity-20">Vitae</span>
          </h1>
          <p className="text-black/60 font-medium text-xl max-w-2xl leading-relaxed">
            A comprehensive record of system architecture, engineering initiatives, 
            and technical contributions in the digital space.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-24 items-start">
          {/* PDF Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div
              className="relative bg-white border border-black/10 shadow-2xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: "1 / 1.414" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Loading skeleton */}
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-bold text-black/30 tracking-widest uppercase">
                      Document Syncing
                    </p>
                  </div>
                </div>
              )}

              {/* PDF iframe */}
              <iframe
                src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                title="Tarunya Kesharwani Resume"
                className="w-full h-full border-0 bg-white"
                onLoad={() => setIframeLoaded(true)}
              />

              {/* Hover Overlay */}
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-8"
                  >
                    <motion.a
                      href="/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-12 py-5 bg-black text-white font-bold text-lg uppercase tracking-widest hover:bg-black/90 transition-all"
                    >
                      Open Document
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Col — Info + Action buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-12 lg:sticky lg:top-32"
          >
            {/* Stats / Tags */}
            <div className="border-t border-black/10 pt-8">
              <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em] mb-6">
                Core Competencies
              </p>
              <ul className="space-y-6">
                {[
                  ["Role", "Full-Stack Engineer"],
                  ["Specialization", "System Architecture & AI"],
                  ["Primary Stack", "React & Node.js Ecosystem"],
                  ["Availability", "Consultation & Projects"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider">
                      {label}
                    </span>
                    <span className="text-xl font-bold text-black tracking-tight">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-8 py-6 bg-black text-white font-bold text-lg uppercase tracking-widest hover:bg-black/90 transition-all"
              >
                View PDF
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              <a
                href="/Resume.pdf"
                download="Tarunya_Kesharwani_Resume.pdf"
                className="flex items-center justify-between px-8 py-6 border-2 border-black text-black font-bold text-lg uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                Download
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>

            <div className="border-t border-black/10 pt-8">
              <p className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em] text-center">
                Last updated &middot; February 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ResumePage;
