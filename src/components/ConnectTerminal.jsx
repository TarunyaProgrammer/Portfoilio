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
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

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
      
      // Fallback: If API fails (likely 404 in dev mode), use direct mailto link
      if (err.response?.status === 404 || !err.response) {
        console.warn("API unavailable. Falling back to direct mailto protocol.");
        const subject = encodeURIComponent(`🚀 Inquiry: ${formData.projectTitle} | ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone || "Not provided"}\n` +
          `Service: ${formData.projectTitle}\n\n` +
          `Briefing:\n${formData.summary}`
        );
        window.location.href = `mailto:tarunyaprogrammer@gmail.com?subject=${subject}&body=${body}`;
        setStatus("success"); // Mark as success since the user is now sending it via client
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
    <section className="py-36 md:py-52 bg-zinc-50/50 border-t border-black/5">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Column: Text */}
          <div>
            <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-6">
              Final Inquiry
            </div>
            <h2 className="text-6xl md:text-9xl font-bold text-black leading-[0.8] mb-12 tracking-tighter">
              READY TO <br />
              BUILD <span className="italic font-normal opacity-20">NEXT?</span>
            </h2>
            <p className="text-xl md:text-2xl text-black/60 font-medium max-w-md leading-relaxed mb-16">
              Currently accepting new system architecture inquiries and collaborative open-source ventures.
            </p>

            <div className="space-y-4">
              <p className="text-[10px] font-bold tracking-[0.5em] text-black/30 uppercase mb-8">
                Connect via
              </p>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-black border-b border-black/10 pb-1 hover:border-black transition-all uppercase"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Protocol Form */}
          <div className="bg-white border border-black/10 p-12 md:p-16 shadow-2xl relative overflow-hidden">
            {/* Success Overlay */}
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="text-4xl mb-6">🚀</div>
                <h3 className="text-2xl font-bold text-black mb-4 uppercase tracking-tighter">Connection Established</h3>
                <p className="text-black/60 font-medium mb-12">Your inquiry has been encrypted and transmitted. I will respond within 24 hours.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest"
                >
                  Close Channel
                </button>
              </motion.div>
            )}

            <h3 className="font-bold text-3xl mb-12 italic text-black">
              Inquiry Protocol
            </h3>
            
            <form 
              className="space-y-10"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2 border-b border-black/10 pb-4">
                <label htmlFor="name-input" className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase">
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
                  className="w-full bg-transparent border-none outline-none text-lg font-medium text-black placeholder:text-black/10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2 border-b border-black/10 pb-4">
                  <label htmlFor="email-input" className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase">
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
                    className="w-full bg-transparent border-none outline-none text-lg font-medium text-black placeholder:text-black/10"
                  />
                </div>
                <div className="space-y-2 border-b border-black/10 pb-4">
                  <label htmlFor="phone-input" className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase">
                    Phone (Optional)
                  </label>
                  <input 
                    id="phone-input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    placeholder="+1 234 567 890"
                    className="w-full bg-transparent border-none outline-none text-lg font-medium text-black placeholder:text-black/10"
                  />
                </div>
              </div>

              <div className="space-y-2 border-b border-black/10 pb-4">
                <label htmlFor="project-title-select" className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase">
                  Selected Service
                </label>
                <select 
                  id="project-title-select"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  className="w-full bg-transparent border-none outline-none text-lg font-medium text-black cursor-pointer appearance-none"
                >
                  <option value="General Inquiry">Select a service protocol...</option>
                  {engageOptions.map(option => (
                    <option key={option.id} value={option.title}>{option.title}</option>
                  ))}
                  <option value="Other / Custom">Other / Custom Engineering</option>
                </select>
              </div>

              <div className="space-y-2 border-b border-black/10 pb-4">
                <label htmlFor="summary-textarea" className="text-[9px] font-bold tracking-[0.3em] text-black/40 uppercase">
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
                  className="w-full bg-transparent border-none outline-none text-lg font-medium text-black placeholder:text-black/10 resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full py-6 bg-black text-white font-bold text-lg uppercase hover:bg-black/90 transition-all tracking-widest disabled:opacity-50 group flex items-center justify-center gap-4"
              >
                {status === "loading" ? "Transmitting..." : "Send Inquiry"}
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>

              {status === "error" && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">
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
