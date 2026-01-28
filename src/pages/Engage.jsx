import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import EngageCard from "../components/EngageCard";
import { engageOptions } from "../data/engage";

const Engage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({ name: "", summary: "" });
  const [formState, setFormState] = useState("idle"); // idle, sending, sent, error
  const location = useLocation();
  const gridRef = useRef(null);
  const firstCardRef = useRef(null);

  // Auto-scroll to grid if hash is #what
  useEffect(() => {
    if (location.hash === "#what" && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
      // Optional: focus first card after scroll
      setTimeout(() => {
        const firstBtn = document.querySelector("button[aria-expanded]");
        if (firstBtn) firstBtn.focus();
      }, 800);
    }
  }, [location]);

  const handleCardClick = (option) => {
    setSelectedOption(option);
    setFormState("idle");
  };

  const closePanel = () => {
    setSelectedOption(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.length < 2 || formData.summary.length < 10) return;

    setFormState("sending");
    
    // Simulate API call
    setTimeout(() => {
      setFormState("sent");
      // Reset after 3 seconds
      setTimeout(() => {
        closePanel();
        setFormData({ name: "", summary: "" });
        setFormState("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden selection:bg-neon selection:text-black pt-32 pb-20">
      {/* Compact Hero */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-heading font-bold text-text mb-6 tracking-tight"
        >
          I build fast, production-ready <br />
          <span className="text-neon text-neon-glow">web systems</span> for
          startups.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 font-mono text-sm md:text-base tracking-wide mb-8"
        >
          From design &rarr; React &rarr; Docker &rarr; deployment.
        </motion.p>
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
        >
             <Link to="/" className="text-xs text-gray-500 hover:text-white transition-colors underline underline-offset-4">
                &larr; Back to profile
            </Link>
        </motion.div>
      </section>

      {/* Options Grid */}
      <section
        id="what"
        ref={gridRef}
        className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {engageOptions.map((option) => (
          <EngageCard
            key={option.id}
            option={option}
            onClick={handleCardClick}
            isSelected={selectedOption?.id === option.id}
          />
        ))}
      </section>

      {/* Slide-Over Panel */}
      <AnimatePresence>
        {selectedOption && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-bg border-l border-white/10 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="font-mono text-neon text-sm uppercase tracking-widest">
                    Initialize Engagement
                  </h2>
                  <button
                    onClick={closePanel}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    CLOSE [ESC]
                  </button>
                </div>

                <div className="mb-12">
                  <h3 className="text-3xl font-heading font-bold text-white mb-2">
                    {selectedOption.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {selectedOption.description}
                  </p>
                  <div className="p-4 bg-grid/20 border border-white/5 rounded-lg">
                    <span className="block text-xs font-mono text-gray-500 mb-1">
                      Outcome
                    </span>
                    <p className="text-sm text-neon/90">
                      {selectedOption.outcome}
                    </p>
                  </div>
                </div>

                {formState === "sent" ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full border border-neon flex items-center justify-center mb-6">
                      <svg
                        className="w-8 h-8 text-neon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">
                      Transmission Received
                    </h4>
                    <p className="text-gray-400">
                      I will analyze your request and respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">
                        IDENTITY / NAME
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-gray-700"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 mb-2">
                        BRIEFING
                      </label>
                      <textarea
                        required
                        minLength={10}
                        rows={4}
                        value={formData.summary}
                        onChange={(e) =>
                          setFormData({ ...formData, summary: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-gray-700 resize-none"
                        placeholder="Briefly describe your project requirements..."
                      />
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={formState === "sending"}
                        className="w-full bg-neon text-black font-bold py-4 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                      >
                        {formState === "sending"
                          ? "Transmitting..."
                          : "Initiate Contact"}
                      </button>
                    </div>
                    
                    <div className="text-center pt-4">
                        <p className="text-xs text-gray-600">
                            Or email directly at{" "}
                            <a href="mailto:tarunya.programmer@gmail.com" className="text-gray-400 hover:text-neon transition-colors">
                                tarunya.programmer@gmail.com
                            </a>
                        </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Engage;
