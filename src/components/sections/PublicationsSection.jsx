import React from "react";
import { portfolioData } from "@/data/portfolioData";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BookOpen, ExternalLink, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const PublicationsSection = () => {
  const smoothEase = [0.22, 1, 0.36, 1];

  return (
    <section id="writing" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Writing and notes
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Writing that shows how I think.
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
              Notes on distributed systems, AI workflows, performance, and the decisions behind the software.
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
        </motion.div>

        {/* Publications Grid (Flows in with Stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.publications.map((pub, idx) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: idx * 0.12, ease: smoothEase }}
              className="h-full"
            >
              <SpotlightCard
                spotlightColor="rgba(59, 130, 246, 0.12)"
                className="p-6 sm:p-7 border border-white/10 hover:border-white/20 bg-zinc-900/60 backdrop-blur-md flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-2.5 py-0.5 rounded-md bg-zinc-950 text-zinc-300 border border-white/10 font-semibold">
                      {pub.platform}
                    </span>
                    <span className="text-zinc-400">{pub.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug hover:text-blue-400 transition-colors">
                    <a href={pub.link} target="_blank" rel="noopener noreferrer">
                      {pub.title}
                    </a>
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {pub.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {pub.readTime}
                  </span>

                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    <span>Browse writing</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
