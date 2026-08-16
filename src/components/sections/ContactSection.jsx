import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { DottedMap } from "@/components/ui/dotted-map";
import {
  Mail,
  Send,
  Check,
  Copy,
  ExternalLink,
  MapPin,
  Globe2,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

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
      lat: 22.0,
      lng: 78.5,
      size: 5,
      overlay: { countryCode: "in", label: "India (Base / Relocation)" },
    },
    {
      lat: 39.0,
      lng: -98.0,
      size: 5,
      overlay: { countryCode: "us", label: "USA / SF & NYC (PST/EST)" },
    },
    {
      lat: 54.0,
      lng: -2.5,
      size: 5,
      overlay: { countryCode: "gb", label: "UK / London (GMT)" },
    },
  ];

  const handleCopyEmail = (e) => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 40,
      spread: 60,
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");

    const subject = encodeURIComponent(`🚀 Inquiry: ${formData.service} | ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nSelected Service: ${formData.service}\n\nProject Overview:\n${formData.message}`
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

        {/* ═══ DOTTED WORLD MAP WORK AVAILABILITY STAGE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 relative overflow-hidden backdrop-blur-md shadow-2xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white font-bold text-base sm:text-lg">
                <Globe2 className="w-5 h-5 text-blue-400" />
                <span>Global Work Availability &amp; Preferred Regions</span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Actively seeking and open to remote worldwide or on-site engineering roles in India, USA, and the UK.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>India (Primary Base)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>USA (PST / EST)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 border border-white/10 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>UK &amp; London (GMT)</span>
              </span>
            </div>
          </div>

          {/* Dotted Map Canvas with Radial Fade */}
          <div className="relative w-full [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_65%,transparent_100%)]">
            <DottedMap markers={mapMarkers} />
          </div>
        </motion.div>

        {/* 2-Column Grid: Coordinates Left, Form Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Quick 1-Click Copy Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-white/15 space-y-5 backdrop-blur-md shadow-xl">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Primary Direct Channel
              </div>

              <div className="space-y-3">
                <div className="font-mono text-sm sm:text-base text-white font-semibold break-all bg-zinc-950 p-3.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span>{portfolioData.personal.email}</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-medium text-xs sm:text-sm hover:bg-white/10 hover:text-white transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold font-mono">Email Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-400" />
                      <span>Copy Email to Clipboard</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Social Shortcuts */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-4 font-mono text-xs">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Network Coordinates
              </div>
              <div className="flex flex-wrap gap-2.5">
                {portfolioData.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-950/80 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:border-white/25 transition-all"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Sheet */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-zinc-900/80 border border-white/15 backdrop-blur-md shadow-2xl space-y-6"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Initiate Project Transmission
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Transmits directly to tarunyaprogrammer@gmail.com
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300 font-medium">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Connor / Apex Corp"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300 font-medium">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300 font-medium">
                  Select Focus Area
                </label>
                <select
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
                <label className="text-xs font-mono text-zinc-300 font-medium">
                  Project Briefing / Mission Scope
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your architectural requirements, timelines, or role details..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors font-sans resize-none"
                />
              </div>

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
