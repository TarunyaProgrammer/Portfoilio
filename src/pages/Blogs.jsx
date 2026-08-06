import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { audioSynth } from "../utils/audioSynth";

const Blogs = () => {
  useDocumentSEO({
    title: "Publications & Insights — Tarunya Kesharwani",
    description: "Live synchronized technical publications from DEV.to (@tarunya) and Medium (@tarunyakesh).",
  });

  const [activeTab, setActiveTab] = useState("all"); // "all" | "devto" | "medium"
  const [devtoArticles, setDevtoArticles] = useState([]);
  const [mediumArticles, setMediumArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchFeeds() {
      setLoading(true);
      
      // 1. Fetch DEV.to Articles
      try {
        const resDev = await fetch("https://dev.to/api/articles?username=tarunya");
        if (resDev.ok) {
          const dataDev = await resDev.json();
          if (isMounted && Array.isArray(dataDev)) {
            const formattedDev = dataDev.map((item) => ({
              id: `dev-${item.id}`,
              platform: "devto",
              platformName: "DEV.to",
              title: item.title,
              excerpt: item.description || "Read full publication on DEV.to.",
              link: item.url,
              date: item.readable_publish_date || item.published_at?.split("T")[0] || "Recent",
              readTime: `${item.reading_time_minutes || 5} min read`,
              metrics: `${item.public_reactions_count || 0} reactions`,
              tags: item.tag_list || ["Engineering", "DevTo"],
            }));
            setDevtoArticles(formattedDev);
          }
        }
      } catch (err) {
        console.warn("DEV.to API fetch fallback active:", err);
      }

      // 2. Fetch Medium RSS Articles via RSS2JSON
      try {
        const resMed = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tarunyakesh");
        if (resMed.ok) {
          const dataMed = await resMed.json();
          if (isMounted && dataMed.items && Array.isArray(dataMed.items)) {
            const formattedMed = dataMed.items.map((item, idx) => ({
              id: `med-${idx}`,
              platform: "medium",
              platformName: "Medium",
              title: item.title,
              excerpt: item.description?.replace(/<[^>]+>/g, "").slice(0, 180) + "..." || "Read full publication on Medium.",
              link: item.link,
              date: item.pubDate?.split(" ")[0] || "Recent",
              readTime: "5 min read",
              metrics: "Medium Publication",
              tags: item.categories || ["Architecture", "Medium"],
            }));
            setMediumArticles(formattedMed);
          }
        }
      } catch (err) {
        console.warn("Medium RSS fetch fallback active:", err);
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    fetchFeeds();

    return () => {
      isMounted = false;
    };
  }, []);

  const defaultArticles = [
    {
      id: "fallback-1",
      platform: "medium",
      platformName: "Medium",
      title: "Engineering Scalable Multi-Agent Systems with Google Antigravity",
      excerpt: "An architectural exploration of multi-agent orchestration, state persistence, and event-driven memory synchronization across long-running tasks.",
      link: "https://medium.com/@tarunyakesh",
      date: "2026-08",
      readTime: "8 min read",
      metrics: "Medium Profile",
      tags: ["Agentic AI", "Architecture", "System Design"],
    },
    {
      id: "fallback-2",
      platform: "devto",
      platformName: "DEV.to",
      title: "Building High-Throughput Micro-Services with Zero-Copy Deserialization in Rust",
      excerpt: "Deep dive into memory alignment, zero-copy parsing, and low-latency network I/O primitives for enterprise API gateways.",
      link: "https://dev.to/tarunya",
      date: "2026-07",
      readTime: "6 min read",
      metrics: "DEV.to Profile",
      tags: ["Rust", "Performance", "Backend"],
    },
  ];

  const allArticles =
    devtoArticles.length > 0 || mediumArticles.length > 0
      ? [...devtoArticles, ...mediumArticles]
      : defaultArticles;

  const filteredArticles = allArticles.filter((art) => {
    if (activeTab === "devto") return art.platform === "devto";
    if (activeTab === "medium") return art.platform === "medium";
    return true;
  });

  return (
    <main className="min-h-screen bg-[#0d0d0f] text-white pt-32 md:pt-40 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#ff2a2a] selection:text-white font-pixelify">
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Editorial Header */}
        <header className="border-2 border-white/20 bg-[#141417] p-8 md:p-14 relative overflow-hidden rounded-none shadow-[4px_4px_0px_#000]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-none bg-[#00ff66] animate-pulse inline-block" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#00ff66] uppercase">
                  AUTOMATED LIVE API & RSS SYNC
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-pixelify uppercase leading-[0.95]">
                Writings & <span className="text-[#ff2a2a] italic font-normal">Publications</span>
              </h1>
              <p className="text-white/80 font-sans text-base md:text-lg font-normal leading-relaxed">
                Live synchronized technical publications directly from DEV.to (<code className="font-mono text-[#fbd000]">@tarunya</code>) and Medium (<code className="font-mono text-[#fbd000]">@tarunyakesh</code>).
              </p>
            </div>

            {/* Profile Links */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <a
                href="https://dev.to/tarunya"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioSynth.playClickSound()}
                className="flex items-center gap-2 bg-[#0d0d0f] text-white hover:bg-[#ff2a2a] px-4 py-2.5 border border-white/30 transition-all font-bold"
              >
                <span>DEV.to Profile</span>
                <span>↗</span>
              </a>
              <a
                href="https://medium.com/@tarunyakesh"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioSynth.playClickSound()}
                className="flex items-center gap-2 bg-[#0d0d0f] text-white hover:bg-[#ff2a2a] px-4 py-2.5 border border-white/30 transition-all font-bold"
              >
                <span>Medium Profile</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={() => {
                  audioSynth.playClickSound();
                  setActiveTab("all");
                }}
                className={`px-5 py-2.5 font-bold uppercase transition-all rounded-none border-2 ${
                  activeTab === "all"
                    ? "bg-[#ff2a2a] text-white border-white shadow-[2px_2px_0px_#000]"
                    : "bg-[#0d0d0f] text-white/70 border-white/20 hover:border-white hover:text-white"
                }`}
              >
                All Feeds ({allArticles.length})
              </button>

              <button
                onClick={() => {
                  audioSynth.playClickSound();
                  setActiveTab("devto");
                }}
                className={`px-5 py-2.5 font-bold uppercase transition-all flex items-center gap-2 rounded-none border-2 ${
                  activeTab === "devto"
                    ? "bg-[#ff2a2a] text-white border-white shadow-[2px_2px_0px_#000]"
                    : "bg-[#0d0d0f] text-white/70 border-white/20 hover:border-white hover:text-white"
                }`}
              >
                <span>DEV.to</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5">@tarunya</span>
              </button>

              <button
                onClick={() => {
                  audioSynth.playClickSound();
                  setActiveTab("medium");
                }}
                className={`px-5 py-2.5 font-bold uppercase transition-all flex items-center gap-2 rounded-none border-2 ${
                  activeTab === "medium"
                    ? "bg-[#ff2a2a] text-white border-white shadow-[2px_2px_0px_#000]"
                    : "bg-[#0d0d0f] text-white/70 border-white/20 hover:border-white hover:text-white"
                }`}
              >
                <span>Medium</span>
                <span className="text-[10px] bg-white/10 px-1.5 py-0.5">@tarunyakesh</span>
              </button>
            </div>

            <div className="text-xs font-mono text-white/60">
              {loading ? "Syncing live feeds..." : `Showing ${filteredArticles.length} live publications`}
            </div>
          </div>
        </header>

        {/* Live Articles Grid */}
        {loading ? (
          <div className="text-center py-24 bg-[#141417] border-2 border-white/20 space-y-4 rounded-none shadow-[4px_4px_0px_#000]">
            <div className="inline-block w-8 h-8 border-4 border-[#ff2a2a] border-t-transparent rounded-none animate-spin" />
            <p className="text-xs font-mono text-[#fbd000] uppercase tracking-widest">
              Fetching live articles from DEV.to & Medium...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                whileHover={{ y: -4 }}
                className="group relative border-2 border-white/20 bg-[#141417] hover:border-white p-8 transition-all duration-200 flex flex-col justify-between rounded-none shadow-[4px_4px_0px_#000]"
              >
                <div className="space-y-4">
                  {/* Platform & Date Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-3 py-1 border border-white/20 bg-[#0d0d0f] text-[#00ff66] font-bold">
                      {article.platformName}
                    </span>
                    <span className="text-xs font-mono text-white/50">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-black text-white leading-snug uppercase tracking-tight group-hover:text-[#ff2a2a] transition-colors">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioSynth.playClickSound()}
                      className="hover:underline"
                    >
                      {article.title}
                    </a>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-white/80 font-sans text-sm leading-relaxed line-clamp-3 font-normal">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-[#0d0d0f] text-white/70 px-2.5 py-0.5 border border-white/10 font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Link */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60">{article.readTime} • {article.metrics}</span>

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => audioSynth.playCoinSound()}
                      className="flex items-center gap-1 bg-[#ff2a2a] text-white hover:bg-[#00e5ff] hover:text-black px-4 py-2 font-mono font-bold text-xs transition-all border border-white shadow-[2px_2px_0px_#fff]"
                    >
                      <span>Read Article</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default Blogs;
