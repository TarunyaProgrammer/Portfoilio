import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { DottedMap } from "@/components/ui/dotted-map";
import {
  Send,
  Check,
  Copy,
  Globe2,
  ArrowUpRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full-Time / Contract Engineering",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const smoothEase = [0.22, 1, 0.36, 1];

  // Target work locations requested by Tarunya
  const mapMarkers = [
    {
      lat: 20.5937,
      lng: 78.9629,
      isBase: true,
      overlay: { countryCode: "in", label: "India (Home Base)" },
    },
    {
      lat: 37.7749,
      lng: -122.4194,
      overlay: { countryCode: "us", label: "USA (PST / EST)" },
    },
    {
      lat: 51.5074,
      lng: -0.1278,
      overlay: { countryCode: "gb", label: "UK / London (GMT)" },
    },
    {
      lat: -33.8688,
      lng: 151.2093,
      overlay: { countryCode: "au", label: "Australia (AEST)" },
    },
    {
      lat: 43.6532,
      lng: -79.3832,
      overlay: { countryCode: "ca", label: "Canada (EST / PST)" },
    },
    {
      lat: 1.3521,
      lng: 103.8198,
      overlay: { countryCode: "sg", label: "Singapore (SGT)" },
    },
  ];

  const [validationError, setValidationError] = useState("");

  const handleCopyEmail = (e) => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ["#3b82f6", "#10b981", "#8b5cf6"],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = formData.name.trim().replace(/[\r\n]/g, " ");
    const cleanEmail = formData.email.trim();
    const cleanMessage = formData.message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setValidationError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    const subject = encodeURIComponent(`🚀 Inquiry: ${formData.service} | ${cleanName}`);
    const body = encodeURIComponent(
      `Name: ${cleanName}\nEmail: ${cleanEmail}\nSelected Service: ${formData.service}\n\nProject Overview:\n${cleanMessage}`
    );

    window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
    setStatus("success");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="space-y-2"
        >
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            06 // TRANSMISSION &amp; GLOBAL MOBILITY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Let&apos;s Build Together.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Currently accepting new software engineering roles, high-throughput startup MVPs, and architecture consulting inquiries worldwide.
          </p>
        </motion.div>

        {/* ═══ 1. HIGH-IMPACT SPECIALIZED SPRINTS & DELIVERABLES (FOMO & SPEED) ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: smoothEase }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span>ENGAGEMENT PROTOCOLS &amp; DELIVERY SLAS</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Specialized Engineering Sprints.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
                Need to ship before your competitors? Select a pre-scoped engineering sprint or schedule custom architecture consulting.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Q3/Q4 Active Window &bull; Limited Slots</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioData.services.map((svc) => {
              const isSelected = formData.service === svc.title;
              return (
                <div
                  key={svc.title}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, service: svc.title }));
                    document.getElementById("contact-form-card")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer group backdrop-blur-sm",
                    isSelected
                      ? "bg-zinc-800/90 border-blue-500/80 shadow-[0_0_25px_rgba(59,130,246,0.25)] scale-[1.02]"
                      : "bg-zinc-900/60 border-white/10 hover:border-white/25 hover:bg-zinc-900/90"
                  )}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-white/10 text-emerald-400 font-mono font-semibold text-[11px]">
                        {svc.timeframe}
                      </span>
                      <ArrowUpRight className={cn(
                        "w-4 h-4 transition-transform",
                        isSelected ? "text-blue-400 translate-x-0.5 -translate-y-0.5" : "text-zinc-500 group-hover:text-white"
                      )} />
                    </div>

                    <h4 className="font-bold text-white text-sm sm:text-base tracking-tight leading-snug group-hover:text-blue-300 transition-colors">
                      {svc.title}
                    </h4>

                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className={isSelected ? "text-blue-400 font-semibold" : "text-zinc-500 group-hover:text-zinc-300"}>
                      {isSelected ? "✓ Selected in Form" : "Click to Select Sprint"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ 2. BIG IMPRESSIVE DOTTED WORLD MAP SHOWCASE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="p-6 sm:p-10 rounded-3xl bg-zinc-900/40 border border-white/10 relative overflow-hidden backdrop-blur-md shadow-2xl space-y-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <Globe2 className="w-5 h-5 text-blue-400" />
                <span>Global Mobility &amp; Engineering Hubs</span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Open to remote worldwide or on-site engineering roles across India, USA, UK, Australia, Canada, and Singapore.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>India (Home Base)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>USA &amp; Canada (PST/EST)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>UK &amp; London (GMT)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Australia &amp; APAC (AEST/SGT)</span>
              </span>
            </div>
          </div>

          {/* Full-Scale Dotted Map with Soft Radial Fade */}
          <div className="relative w-full [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_75%,transparent_100%)]">
            <DottedMap markers={mapMarkers} />
          </div>
        </motion.div>

        {/* ═══ 3. MAIN CONTACT TRANSMISSION (SUBTLE METADATA LEFT, PROMINENT FORM RIGHT) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Subtle, De-emphasized Contact Metadata */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: smoothEase }}
            className="lg:col-span-4 space-y-6 pt-2"
          >
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-white tracking-tight">Direct Inquiries</h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Prefer direct communication? Feel free to reach out via email or connect across networks.
              </p>
            </div>

            {/* Clean Monospace Email Line */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Email Address</div>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="text-zinc-300 hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
                >
                  {portfolioData.personal.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Subtle Social Links */}
            <div className="space-y-2 text-xs font-mono pt-3 border-t border-white/10">
              <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Network Coordinates</div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                {portfolioData.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Prominent, High-Readability Inquiry Sheet */}
          <motion.div
            id="contact-form-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: smoothEase }}
            className="lg:col-span-8 p-6 sm:p-9 rounded-2xl bg-zinc-900/80 border border-white/15 backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Initiate Project Transmission
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Direct route to {portfolioData.personal.email}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-zinc-300 font-medium">
                    Your Name / Organization
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor / Apex Corp"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-zinc-300 font-medium">
                    Your Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    maxLength={120}
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-service" className="text-xs font-mono text-zinc-300 font-medium">
                  Select Focus Area
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 transition-colors font-sans cursor-pointer"
                >
                  <option value="Full-Time / Contract Engineering">Full-Time / Contract Engineering Role</option>
                  <option value="Startup MVP & Landing Pages">Startup MVP &amp; Landing Pages</option>
                  <option value="Figma to Pixel-Perfect React">Figma to Pixel-Perfect React</option>
                  <option value="Full-Stack SaaS Architecture">Full-Stack SaaS Architecture</option>
                  <option value="Core Web Vitals & Speed Optimization">Core Web Vitals &amp; Speed Optimization</option>
                  <option value="General Technical Consultation">General Technical Consultation</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-zinc-300 font-medium">
                  Project Briefing / Mission Scope
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your architectural requirements, timelines, or role details..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-sans resize-none"
                />
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono text-center">
                  ! {validationError}
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-all duration-200 shadow-xl shadow-white/10 active:scale-98 cursor-pointer"
              >
                <span>Transmit Inquiry</span>
                <Send className="w-4 h-4 text-zinc-950" />
              </button>

              {status === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                  &check; Mail client opened! Ready to send transmission.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
