import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const ResumePage = () => {
  useDocumentSEO({
    title: "Resume — Tarunya Kesharwani",
    description:
      "View and download the resume of Tarunya Kesharwani, Full-Stack Engineer & Systems Architect.",
  });

  const [isHovering, setIsHovering] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <main className="w-full bg-bg min-h-screen pt-8 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="font-mono text-neon text-xs tracking-[0.3em] uppercase mb-4">
            // credentials
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-white leading-tight mb-6">
            My <span className="text-neon text-neon-glow">Resume</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            A snapshot of systems built, skills acquired, and contributions
            made. Download or view it directly below.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
          {/* PDF Preview — left col */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer"
              style={{ aspectRatio: "8.5 / 11", maxHeight: "80vh" }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Loading skeleton */}
              {!iframeLoaded && (
                <div className="absolute inset-0 bg-[#10121e] flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-neon border-t-transparent rounded-full animate-spin" />
                    <p className="font-mono text-xs text-gray-500 tracking-widest">
                      LOADING RESUME...
                    </p>
                  </div>
                </div>
              )}

              {/* Neon glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border border-neon/0 group-hover:border-neon/40 transition-all duration-500 z-20 pointer-events-none shadow-[0_0_0px_rgba(200,255,0,0)] group-hover:shadow-[0_0_40px_rgba(200,255,0,0.1)]" />

              {/* PDF iframe */}
              <iframe
                src="/Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                title="Tarunya Kesharwani Resume"
                className="w-full h-full border-0 bg-[#10121e]"
                onLoad={() => setIframeLoaded(true)}
              />

              {/* Hover Overlay */}
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 bg-bg/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center gap-5"
                  >
                    {/* PDF Icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="w-16 h-16 rounded-full border border-neon/40 bg-neon/10 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-8 h-8 text-neon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                    </motion.div>

                    <motion.a
                      href="/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-neon text-black font-bold font-mono text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(200,255,0,0.4)]"
                    >
                      View Full PDF
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle caption */}
            <p className="font-mono text-xs text-gray-600 mt-3 text-center tracking-widest">
              HOVER TO OPEN · SCROLL TO BROWSE
            </p>
          </motion.div>

          {/* Right Col — Info + Action buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-6 lg:sticky lg:top-28"
          >
            {/* Stats / Tags */}
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <p className="font-mono text-xs text-neon tracking-[0.25em] uppercase mb-4">
                Quick Facts
              </p>
              <ul className="space-y-3">
                {[
                  ["Role", "Full-Stack Engineer"],
                  ["Focus", "Systems & AI-Powered Products"],
                  ["Stack", "React · Node · Python · Docker"],
                  ["Open to", "Full-time & Contract"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex justify-between items-start gap-4"
                  >
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-wider shrink-0">
                      {label}
                    </span>
                    <span className="font-mono text-xs text-gray-300 text-right">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {/* View Full PDF */}
              <motion.a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between px-6 py-4 bg-neon text-black font-bold font-mono text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_30px_rgba(200,255,0,0.5)]"
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                      fillRule="evenodd"
                      d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z"
                      clipRule="evenodd"
                    />
                  </svg>
                  View Full PDF
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>

              {/* Download PDF */}
              <motion.a
                href="/Resume.pdf"
                download="Tarunya_Kesharwani_Resume.pdf"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between px-6 py-4 bg-transparent border border-neon text-neon font-mono text-sm tracking-widest uppercase hover:bg-neon/10 transition-colors duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  Download PDF
                </span>
                <span className="text-gray-500 text-xs font-mono">PDF</span>
              </motion.a>

              {/* Divider */}
              <div className="border-t border-white/10 my-1" />

              {/* Connect CTA */}
              <motion.a
                href="/connect"
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border border-white/10 text-gray-400 font-mono text-sm tracking-widest uppercase hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <span>Let's Work Together</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
            </div>

            {/* Last Updated note */}
            <p className="font-mono text-xs text-gray-600 tracking-widest text-center">
              LAST UPDATED · FEB 2026
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ResumePage;
