import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import EngageCard from "../components/EngageCard";
import { engageOptions } from "../data/engage";

// Extracted for testability & cleaner main component
const ContactForm = ({ selectedOption, onSubmitSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle"); // idle, sending, sent, error
  const inputRef = useRef(null);

  // Focus name input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    if (name.trim().length < 2 || summary.trim().length < 10 || !email.includes("@")) {
      // Form validation handles visual cues, this is a safety check
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          summary: summary.trim(),
          projectTitle: selectedOption.title,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setName("");
      setEmail("");
      setPhone("");
      setSummary("");
      setStatus("sent");
      
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div 
        role="status" 
        aria-live="polite" 
        className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500"
      >
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
          MESSAGE QUEUED
        </h4>
        <p className="text-gray-400">
          Transmission received. I will analyze your request and respond shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-xs font-mono text-neon hover:underline underline-offset-4"
        >
          SEND ANOTHER MESSAGE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-busy={status === "sending"}>
      <div>
        <label 
          htmlFor="name-input"
          className="block text-xs font-mono text-gray-500 mb-2"
        >
          IDENTITY / NAME <span className="text-neon">*</span>
        </label>
        <input
          id="name-input"
          ref={inputRef}
          type="text"
          required
          minLength={2}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "sending"}
          className={`w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-gray-700 invalid:border-red-500/50 ${
            status === "sending" ? "opacity-60 cursor-not-allowed" : ""
          }`}
          placeholder="John Doe"
          aria-invalid={name.length > 0 && name.length < 2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="email-input"
            className="block text-xs font-mono text-gray-500 mb-2"
          >
            EMAIL ADDRESS <span className="text-neon">*</span>
          </label>
          <input
            id="email-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "sending"}
            className={`w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-gray-700 invalid:border-red-500/50 ${
              status === "sending" ? "opacity-60 cursor-not-allowed" : ""
            }`}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label 
            htmlFor="phone-input"
            className="block text-xs font-mono text-gray-500 mb-2"
          >
            PHONE (OPTIONAL)
          </label>
          <input
            id="phone-input"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={status === "sending"}
            className={`w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-gray-700 ${
              status === "sending" ? "opacity-60 cursor-not-allowed" : ""
            }`}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label 
          htmlFor="summary-input"
          className="block text-xs font-mono text-gray-500 mb-2"
        >
          BRIEFING <span className="text-neon">*</span>
        </label>
        <textarea
          id="summary-input"
          required
          minLength={10}
          rows={4}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          disabled={status === "sending"}
          className={`w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-neon transition-colors placeholder:text-gray-700 resize-none invalid:border-red-500/50 ${
            status === "sending" ? "opacity-60 cursor-not-allowed" : ""
          }`}
          placeholder="Briefly describe your project requirements..."
          aria-invalid={summary.length > 0 && summary.length < 10}
        />
      </div>

      <div className="pt-4" aria-live="polite">
        {status === "error" && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-200 text-sm">
            <span className="font-bold">TRANSMISSION FAILED</span> — Something went wrong. 
            <br/>You can email me directly below.
          </div>
        )}
        
        <button
          type="submit"
          disabled={status === "sending"}
          aria-disabled={status === "sending"}
          className={`w-full bg-neon text-black font-bold py-4 rounded hover:bg-white transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-2 ${
             status === "sending" ? "opacity-70 pointer-events-none" : ""
          }`}
        >
          {status === "sending" ? (
             <>
               <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
               TRANSMITTING...
             </>
          ) : (
            "INITIATE CONTACT"
          )}
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
  );
};

const Engage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const gridRef = useRef(null);
  const lastFocusedCard = useRef(null);

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

  // Handle Esc to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && selectedOption) {
        closePanel();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedOption]);

  const handleCardClick = (option, e) => {
    // Store the button that triggered the opening to restore focus later
    lastFocusedCard.current = e.currentTarget;
    setSelectedOption(option);
  };

  const closePanel = () => {
    setSelectedOption(null);
    // Restore focus to the card that opened the panel
    if (lastFocusedCard.current) {
      setTimeout(() => lastFocusedCard.current.focus(), 100);
    }
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
            onClick={(opt) => {
                // We wrap this to pass the event object if EngageCard supports it, 
                // but EngageCard onClick prop signature might just trigger with option.
                // Fixing EngageCard to pass event is ideal, but here we can find the button via DOM if needed
                // For now assuming EngageCard isn't passing 'e' directly, we'll direct-click handle it or
                // update EngageCard.
                // Let's assume standard behavior for now but we might need to patch EngageCard
                // to pass the event.
                // Actually, let's fix EngageCard to pass event up or just capture activeElement
                lastFocusedCard.current = document.activeElement; 
                setSelectedOption(opt);
            }}
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
              aria-labelledby="panel-title"
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
                    className="text-gray-500 hover:text-white transition-colors text-sm font-mono tracking-wider"
                    aria-label="Close panel"
                  >
                    CLOSE [ESC]
                  </button>
                </div>

                <div className="mb-12">
                  <h3 id="panel-title" className="text-3xl font-heading font-bold text-white mb-2">
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

                <ContactForm selectedOption={selectedOption} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Engage;
