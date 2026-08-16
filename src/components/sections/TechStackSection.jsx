import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Marquee } from "@/components/ui/marquee";
import {
  Layout,
  Server,
  Cpu,
  Database,
  Layers,
  Terminal,
  Code2,
} from "lucide-react";

export const TechStackSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const iconMap = {
    "Frontend Engineering": Layout,
    "Backend & Distributed APIs": Server,
    "AI & Autonomous Workflows": Cpu,
    "Databases & Cloud DevOps": Database,
  };

  const allSkillsFlat = portfolioData.skills.flatMap((s) => s.items);

  const filteredCategories =
    activeTab === "all"
      ? portfolioData.skills
      : portfolioData.skills.filter((s) => s.category.toLowerCase().includes(activeTab));

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              02 // CAPABILITIES &amp; ARCHITECTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Tech Stack &amp; Specializations.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Curated engineering competencies across distributed backends, modern frontend systems, deterministic AI pipelines, and containerized DevOps.
            </p>
          </div>

          {/* Interactive Domain Filter Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {[
              { id: "all", label: "All Modules" },
              { id: "frontend", label: "Frontend" },
              { id: "backend", label: "Backend / APIs" },
              { id: "ai", label: "AI Systems" },
              { id: "cloud", label: "DevOps & Cloud" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-white text-zinc-950 font-semibold border-white shadow-md"
                    : "bg-zinc-900/80 text-zinc-400 border-white/10 hover:text-white hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Architectural Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category, index) => {
            const Icon = iconMap[category.category] || Cpu;

            return (
              <SpotlightCard
                key={category.category}
                spotlightColor="rgba(59, 130, 246, 0.12)"
                className="p-6 sm:p-8 border border-white/10 hover:border-white/20 bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-zinc-800 border border-white/10 text-zinc-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-lg text-white tracking-tight">
                        {category.category}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">
                      {category.items.length} Primitives
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {category.description}
                  </p>

                  {/* Badges Grid */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-white/10 text-xs font-mono text-zinc-200 hover:border-blue-400/40 hover:text-white transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Magic UI Infinite Marquee */}
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950/40 border border-white/10 py-3 mt-4">
          <Marquee pauseOnHover className="[--duration:35s]">
            {allSkillsFlat.map((skill, i) => (
              <div
                key={`${skill}-${i}`}
                className="mx-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-300 font-mono shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{skill}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
