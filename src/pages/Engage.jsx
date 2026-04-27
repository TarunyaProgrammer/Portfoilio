import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import EngageCard from "../components/EngageCard";
import { engageOptions } from "../data/engage";
import useDocumentSEO from "../hooks/useDocumentSEO";

const ContactForm = ({ selectedOption, onSubmitSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState("idle");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    if (
      name.trim().length < 2 ||
      summary.trim().length < 10 ||
      !email.includes("@")
    ) {
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
        className="flex-1 flex flex-col items-center justify-center text-center py-20"
      >
        <div className="text-script text-accent text-6xl mb-8 transform -rotate-6">
          Transmission Received
        </div>
        <h4 className="text-4xl font-heading font-black text-text mb-4 italic">Thank You.</h4>
        <p className="text-text/60 font-body text-lg leading-relaxed max-w-xs mx-auto">
          Your inquiry has been successfully queued. I will review the 
          parameters and respond within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-12 editorial-link text-[10px] font-bold uppercase tracking-[0.4em]"
        >
          Send another transmission
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-12"
      aria-busy={status === "sending"}
    >
      <div className="space-y-8">
        <div>
          <label
            htmlFor="name-input"
            className="block text-[10px] font-bold text-text/30 mb-4 uppercase tracking-[0.4em]"
          >
            Identity / Full Name
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
            className="w-full bg-transparent border-b border-black/10 px-0 py-4 text-text font-body text-xl focus:outline-none focus:border-accent transition-all placeholder:text-text/10"
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label
              htmlFor="email-input"
              className="block text-[10px] font-bold text-text/30 mb-4 uppercase tracking-[0.4em]"
            >
              Email Address
            </label>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
              className="w-full bg-transparent border-b border-black/10 px-0 py-4 text-text font-body text-xl focus:outline-none focus:border-accent transition-all placeholder:text-text/10"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone-input"
              className="block text-[10px] font-bold text-text/30 mb-4 uppercase tracking-[0.4em]"
            >
              Phone (Optional)
            </label>
            <input
              id="phone-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={status === "sending"}
              className="w-full bg-transparent border-b border-black/10 px-0 py-4 text-text font-body text-xl focus:outline-none focus:border-accent transition-all placeholder:text-text/10"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="summary-input"
            className="block text-[10px] font-bold text-text/30 mb-4 uppercase tracking-[0.4em]"
          >
            Mission Briefing
          </label>
          <textarea
            id="summary-input"
            required
            minLength={10}
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            disabled={status === "sending"}
            className="w-full bg-transparent border-b border-black/10 px-0 py-4 text-text font-body text-xl focus:outline-none focus:border-accent transition-all placeholder:text-text/10 resize-none"
            placeholder="Describe your project requirements and objectives..."
          />
        </div>
      </div>

      <div className="pt-8">
        {status === "error" && (
          <div className="mb-8 p-6 border border-red-500/10 bg-red-500/[0.02] text-red-600 text-sm font-body italic">
            Transmission failed. Please attempt again or reach out via direct email.
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-accent text-bg font-black font-heading py-6 uppercase tracking-widest text-lg hover:bg-black transition-all flex items-center justify-center gap-4"
        >
          {status === "sending" ? "TRANSMITTING..." : "INITIATE CORRESPONDENCE"}
        </button>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] font-bold text-text/30 uppercase tracking-[0.4em]">
          Direct Channel:{" "}
          <a
            href="mailto:tarunyak.10@gmail.com"
            className="text-accent hover:text-text transition-colors"
          >
            tarunyak.10@gmail.com
          </a>
        </p>
      </div>
    </form>
  );
};

const Engage = () => {
  useDocumentSEO({
    title: "Hire Tarunya Kesharwani — Web Engineering & Architecture",
    description:
      "Production-ready web engineering for ambitious startups. From design systems to distributed architecture.",
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const gridRef = useRef(null);
  const lastFocusedCard = useRef(null);

  useEffect(() => {
    if (location.hash === "#what" && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && selectedOption) {
        closePanel();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedOption]);

  const closePanel = () => {
    setSelectedOption(null);
    if (lastFocusedCard.current) {
      setTimeout(() => lastFocusedCard.current.focus(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden selection:bg-accent selection:text-bg pt-48 pb-32">
      {/* Editorial Hero */}
      <section className="container mx-auto px-8 mb-48">
        <div className="text-script text-accent/40 text-4xl mb-6 transform -rotate-2 origin-left">
          service archive
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-6xl md:text-9xl font-heading font-black text-text mb-12 tracking-tighter leading-[0.85]"
        >
          Engineering <br />
          <span className="italic font-normal text-accent">Excellence</span> <br />
          for Startups.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-3xl text-text/60 font-body leading-relaxed max-w-3xl italic"
        >
          A meticulous approach to web systems. From design architecture to 
          distributed deployment, every line is crafted for intent and longevity.
        </motion.p>
      </section>

      {/* Options Grid */}
      <section
        id="what"
        ref={gridRef}
        className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10"
      >
        {engageOptions.map((option) => (
          <EngageCard
            key={option.id}
            option={option}
            onClick={(opt) => {
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className="fixed inset-0 bg-black z-40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="panel-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-bg border-l border-black/5 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-12 md:p-24 h-full flex flex-col">
                <div className="flex justify-between items-center mb-24">
                  <div className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">
                    Inquiry Sheet
                  </div>
                  <button
                    onClick={closePanel}
                    className="editorial-link text-[10px] font-bold tracking-[0.3em] uppercase text-text/40"
                  >
                    Close [Esc]
                  </button>
                </div>

                <div className="mb-24">
                  <h3
                    id="panel-title"
                    className="text-5xl md:text-7xl font-heading font-black text-text mb-8 italic leading-none"
                  >
                    {selectedOption.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-text/60 font-body leading-relaxed mb-12">
                    {selectedOption.description}
                  </p>
                  <div className="p-12 bg-white border border-black/5 shadow-lg">
                    <span className="block text-[10px] font-bold text-accent/40 mb-4 uppercase tracking-[0.4em]">
                      Project Outcome
                    </span>
                    <p className="text-xl font-body italic text-text">
                      {selectedOption.outcome}
                    </p>
                  </div>
                </div>

                <ContactForm selectedOption={selectedOption} />
                
                <div className="mt-24 pt-12 border-t border-black/5 text-center">
                  <div className="text-script text-accent text-4xl mb-4">Tarunya.</div>
                  <div className="text-[10px] font-bold text-text/20 uppercase tracking-[0.5em]">
                    Architectural Excellence
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Engage;
