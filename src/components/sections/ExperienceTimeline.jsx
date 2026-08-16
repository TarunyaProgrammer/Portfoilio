import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { Briefcase, Calendar, CheckCircle2, Award } from "lucide-react";

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold tracking-wider uppercase">
            Career &amp; Open Source Leadership
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Experience &amp; Milestones.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Leading open source initiatives, mentoring remote engineering communities, and building enterprise architectures.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-12">
          {portfolioData.experience.map((item, index) => (
            <div key={item.role + index} className="relative group">
              {/* Timeline Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30" />

              <div className="p-6 sm:p-7 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all space-y-4 backdrop-blur-sm">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
