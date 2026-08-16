import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const ExperienceTimeline = () => {
  const smoothEase = [0.22, 1, 0.36, 1];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="space-y-2"
        >
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            04 // EXPERIENCE &amp; LEADERSHIP
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Experience &amp; Milestones.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Leading open source initiatives, mentoring remote engineering communities, and building enterprise architectures.
          </p>
        </motion.div>

        {/* Vertical Timeline with Scroll Flow-In */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-12">
          {portfolioData.experience.map((item, index) => (
            <motion.div
              key={item.role + index}
              initial={{ opacity: 0, x: -50, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: smoothEase,
              }}
              className="relative group"
            >
              {/* Timeline Tick Line */}
              <div className="absolute -left-[25px] sm:-left-[33px] top-4 w-6 h-[1px] bg-zinc-700 group-hover:bg-zinc-300 transition-colors" />

              <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all space-y-4 backdrop-blur-sm shadow-xl">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-sm text-zinc-300 font-medium mt-0.5">
                      {item.org}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-950 text-emerald-400 border border-white/10 font-semibold">
                      {item.badge}
                    </span>
                    <span className="text-zinc-400">{item.period}</span>
                  </div>
                </div>

                {/* Bullet points */}
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 font-normal">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
