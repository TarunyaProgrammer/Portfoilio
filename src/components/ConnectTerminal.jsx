import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { engageOptions } from "../data/engage";

const ConnectTerminal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectTitle: "General Inquiry",
    summary: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectTitle: "General Inquiry",
        summary: ""
      });
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response?.status === 404 || !err.response) {
        const subject = encodeURIComponent(`🚀 Inquiry: ${formData.projectTitle} | ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone || "Not provided"}\n` +
          `Service: ${formData.projectTitle}\n\n` +
          `Briefing:\n${formData.summary}`
        );
        window.location.href = `mailto:tarunyaprogrammer@gmail.com?subject=${subject}&body=${body}`;
        setStatus("success");
      } else {
        setStatus("error");
      }
    }
  };

  const socialLinks = [
    { label: "Email", href: "mailto:tarunyaprogrammer@gmail.com" },
    { label: "GitHub", href: "https://github.com/TarunyaProgrammer/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tarunyakesharwani/" },
    { label: "X / Twitter", href: "https://x.com/TarunyaKesh" },
    { label: "Instagram", href: "https://www.instagram.com/heytarunya/" },
  ];

  return (
    <section className="py-20 md:py-36 bg-[#141417] text-white border-t border-white/10 font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Text */}
          <div>
            <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.4em] mb-4">
              FINAL INQUIRY
            </div>
            <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.85] mb-8 md:mb-12 tracking-tight uppercase font-pixelify">
              READY TO <br />
              BUILD <span className="text-[#00ff66]">NEXT?</span>
            </h2>
            <p className="text-lg font-sans text-white/80 font-medium max-w-md leading-relaxed mb-10 md:mb-16">
              Currently accepting new system architecture inquiries and collaborative open-source ventures.
            </p>

            <div className="space-y-4">
              <p className="text-xs font-mono font-bold tracking-[0.4em] text-white/50 uppercase mb-6">
                CONNECT VIA
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-xs">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#ff2a2a] border-b border-white/20 pb-1 hover:border-[#ff2a2a] transition-all uppercase font-bold"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Protocol Form */}
          <div className="bg-[#0d0d0f] border-4 border-white p-6 sm:p-12 md:p-14 shadow-[6px_6px_0px_#ff2a2a] relative overflow-hidden rounded-none">
            {/* Success Overlay */}
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#0d0d0f] z-50 flex flex-col items-center justify-center p-6 sm:p-12 text-center"
              >
                <div className="w-12 h-12 bg-[#00ff66]/10 border border-[#00ff66] flex items-center justify-center text-[#00ff66] mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight font-pixelify">Connection Established</h3>
                <p className="text-white/70 font-sans text-sm font-medium mb-8">Your inquiry has been transmitted. I will respond within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-8 py-4 bg-[#ff2a2a] text-white text-xs font-mono font-bold uppercase tracking-widest border border-white/20"
                >
                  Close Channel
                </button>
              </motion.div>
            )}

            <h3 className="font-bold text-2xl mb-8 uppercase text-white font-pixelify">
              Inquiry Protocol
            </h3>
            
            <form 
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2 border-b border-white/10 pb-4">
                <label htmlFor="name-input" className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">
                  Full Name / Entity
                </label>
                <input 
                  required
                  id="name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text" 
                  placeholder="e.g. John Doe / Nexus Corp"
                  className="w-full bg-transparent border-none outline-none text-base font-sans font-medium text-white placeholder:text-white/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <label htmlFor="email-input" className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">
                    Direct Email
                  </label>
                  <input 
                    required
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-none outline-none text-base font-sans font-medium text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <label htmlFor="phone-input" className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">
                    Phone (Optional)
                  </label>
                  <input 
                    id="phone-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    placeholder="+1 234 567 890"
                    className="w-full bg-transparent border-none outline-none text-base font-sans font-medium text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <div className="space-y-2 border-b border-white/10 pb-4">
                <label htmlFor="project-title-select" className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">
                  Selected Service
                </label>
                <select 
                  id="project-title-select"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  className="w-full bg-[#141417] border border-white/10 p-2 rounded-none outline-none text-sm font-mono text-white cursor-pointer"
                >
                  <option value="General Inquiry">Select a service protocol...</option>
                  {engageOptions.map(option => (
                    <option key={option.id} value={option.title}>{option.title}</option>
                  ))}
                  <option value="Other / Custom">Other / Custom Engineering</option>
                </select>
              </div>

              <div className="space-y-2 border-b border-white/10 pb-4">
                <label htmlFor="summary-textarea" className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">
                  Project Briefing / Summary
                </label>
                <textarea 
                  required
                  id="summary-textarea"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe your architectural requirements..."
                  className="w-full bg-transparent border-none outline-none text-base font-sans font-medium text-white placeholder:text-white/30 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-[#ff2a2a] text-white font-mono font-bold text-xs uppercase hover:bg-[#0066ff] transition-all tracking-widest disabled:opacity-50 flex items-center justify-center gap-3 border border-white/20 shadow-md"
              >
                {status === "loading" ? "Transmitting..." : "Send Inquiry"}
                <span>→</span>
              </button>

              {status === "error" && (
                <p className="text-[#ff2a2a] text-[10px] font-mono font-bold uppercase tracking-widest text-center">
                  Transmission Error. Please try direct email.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectTerminal;
