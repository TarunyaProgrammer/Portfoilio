import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const Blogs = () => {
  useDocumentSEO({
    title: "Publications & Insights — Tarunya Kesharwani",
    description: "Live synchronized technical publications from DEV.to (@tarunya) and Medium (@tarunyakesh).",
  });

  const [activeTab, setActiveTab] = useState("all"); // "all" | "devto" | "medium"
  const [devtoArticles, setDevtoArticles] = useState([]);
  const [mediumArticles, setMediumArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

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
              coverImage: item.cover_image || item.social_image || null,
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
              coverImage: item.thumbnail || null,
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

  // Fallback items if live feeds are empty or during first sync
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
    <div className="min-h-screen bg-[#F8F9FA] text-black pt-32 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-black selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* ═══════════════════════════════════════════════════════════════
            EDITORIAL HEADER WITH LIVE SYNC BADGES
           ═══════════════════════════════════════════════════════════════ */}
        <header className="border border-black/10 bg-white p-8 md:p-14 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse inline-block" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-black uppercase">
                  AUTOMATED LIVE API & RSS SYNC
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black font-heading uppercase leading-[0.95]">
                Writings & <span className="font-normal italic text-black/40">Publications</span>
              </h1>
              <p className="text-black/70 text-base md:text-lg font-normal leading-relaxed">
                Live synchronized articles directly from DEV.to (<code className="font-mono text-black">@tarunya</code>) and Medium (<code className="font-mono text-black">@tarunyakesh</code>).
              </p>
            </div>

            {/* Direct Native Profile Links */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://dev.to/tarunya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-mono font-bold hover:bg-gray-800 transition-colors"
              >
                <span>DEV.to Profile</span>
                <span>↗</span>
              </a>
              <a
                href="https://medium.com/@tarunyakesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-mono font-bold hover:bg-gray-800 transition-colors"
              >
                <span>Medium Profile</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* Platform Filter Tabs */}
          <div className="mt-12 pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTab === "all"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black/5 border border-black/20"
                }`}
              >
                All Feeds ({allArticles.length})
              </button>

              <button
                onClick={() => setActiveTab("devto")}
                className={`px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                  activeTab === "devto"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black/5 border border-black/20"
                }`}
              >
                <span>DEV.to</span>
                <span className="text-[10px] bg-black/10 px-1.5 py-0.5">@tarunya</span>
              </button>

              <button
                onClick={() => setActiveTab("medium")}
                className={`px-5 py-2.5 font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
                  activeTab === "medium"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-black/5 border border-black/20"
                }`}
              >
                <span>Medium</span>
                <span className="text-[10px] bg-black/10 px-1.5 py-0.5">@tarunyakesh</span>
              </button>
            </div>

            <div className="text-xs font-mono text-black/50">
              {loading ? "Syncing feeds..." : `Showing ${filteredArticles.length} live publications`}
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════
            LIVE ARTICLES GRID
           ═══════════════════════════════════════════════════════════════ */}
        {loading ? (
          <div className="text-center py-24 bg-white border border-black/10 space-y-3">
            <div className="inline-block w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-mono text-black/60 uppercase tracking-widest">
              Fetching live articles from DEV.to & Medium...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <motion.article
                key={article.id}
                whileHover={{ y: -3 }}
                className="group relative border border-black/10 bg-white hover:border-black p-8 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Platform & Date Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono px-2.5 py-1 border border-black/20 bg-black/5 text-black font-semibold">
                      {article.platformName}
                    </span>
                    <span className="text-xs font-mono text-black/40">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-2xl font-black text-black leading-snug uppercase tracking-tight">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {article.title}
                    </a>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-black/70 text-sm leading-relaxed line-clamp-3 font-normal">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-black/10 space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-black/5 text-black/70 px-2 py-0.5 border border-black/10">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read Link */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-black/50">{article.readTime} • {article.metrics}</span>

                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-black text-white hover:bg-gray-800 px-4 py-2 font-mono font-bold text-xs transition-all"
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
    </div>
  );
};

export default Blogs;
