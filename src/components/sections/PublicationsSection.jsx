import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BookOpen, ExternalLink, Clock, Calendar } from "lucide-react";

export const PublicationsSection = () => {
  return (
    <section id="writing" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 font-mono text-xs font-semibold tracking-wider uppercase">
              Publications &amp; Insights
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Technical Writings.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              In-depth architectural breakdowns, zero-copy deserialization in Rust, and multi-agent system design published on DEV.to &amp; Medium.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <a
              href="https://dev.to/tarunya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 transition-colors flex items-center gap-1.5"
            >
              <span>DEV.to</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>
            <a
              href="https://medium.com/@tarunyakesh"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/25 transition-colors flex items-center gap-1.5"
            >
              <span>Medium</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.publications.map((pub) => (
            <SpotlightCard
              key={pub.title}
              spotlightColor="rgba(139, 92, 246, 0.15)"
              className="p-6 sm:p-7 border border-white/10 hover:border-white/20 bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-zinc-950 text-violet-400 border border-white/10 font-semibold">
                    {pub.platform}
                  </span>
                  <span className="text-zinc-500">{pub.date}</span>
                </div>

                <h3 className="font-semibold text-lg text-white leading-snug tracking-tight hover:text-violet-400 transition-colors">
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    {pub.title}
                  </a>
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {pub.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {pub.readTime}
                </span>

                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
