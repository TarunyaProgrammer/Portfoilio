import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import DOMPurify from "dompurify";

const SystemDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prettyName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  useDocumentSEO({
    title: `${prettyName} — System Details`,
    description: `Architecture overview, performance metrics, and tech-stack breakdown for ${prettyName}.`,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/github/details?name=${slug}`);
        if (!response.ok) throw new Error("Failed to fetch repository details");
        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold text-black/30 tracking-[0.4em] uppercase">
            Syncing System...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8 text-center">
        <div className="max-w-md">
          <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">offline</div>
          <h1 className="text-5xl font-bold text-black mb-8 tracking-tighter">
            System Unavailable
          </h1>
          <p className="text-black/60 font-medium text-lg mb-12 leading-relaxed">
            {error || "This module could not be located in the current archive."}
          </p>
          <Link
            to="/systems"
            className="inline-block px-12 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-black/90 transition-all"
          >
            Return to Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 md:pt-48 pb-32"
    >
      <div className="container mx-auto px-8">
        <Link
          to="/systems"
          className="text-[10px] font-bold tracking-[0.3em] uppercase mb-16 inline-block border-b border-black/10 pb-1 hover:border-black transition-all"
        >
          &larr; Back to Archive
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-4xl">
            <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
              system overview
            </div>
            <h1 className="text-6xl md:text-9xl font-bold capitalize text-black leading-none tracking-tighter">
              {data.name.replace(/-/g, " ")}
            </h1>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-black text-white font-bold text-sm tracking-widest uppercase hover:bg-black/80 transition-all"
            >
              Source Code
            </a>
            {data.homepage && (
              <a
                href={data.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-black text-black font-bold text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all"
              >
                Live Preview
              </a>
            )}
          </div>
        </div>

        {/* Interactive Showcase Frame */}
        {data.homepage ? (
          <div className="w-full flex flex-col items-center mb-24 select-none">
            {/* Holographic Header Bar */}
            <div className="w-full bg-[#0A0A0A] text-white px-6 py-4 flex justify-between items-center text-[10px] font-mono border border-white/10 border-b-0 rounded-none relative">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="tracking-widest">LIVE WORKBENCH // SECURE SANDBOXED INSTANCE // {data.name.toUpperCase()}</span>
              </div>
              <div className="flex gap-6 items-center">
                <span className="text-white/40 hidden sm:inline">
                  [HOST: {(() => {
                    try {
                      return new URL(data.homepage).hostname;
                    } catch (e) {
                      return data.homepage;
                    }
                  })()}]
                </span>
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D8F1A0] hover:text-white transition-colors uppercase tracking-widest font-extrabold"
                >
                  Launch External ↗
                </a>
              </div>
            </div>

            {/* Sandboxed Interactive Panel */}
            <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] border border-black/10 bg-zinc-50 relative">
              <iframe
                src={data.homepage}
                title={`${data.name} Interactive Frame`}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-forms"
                loading="lazy"
              />
            </div>
            
            {/* Tactical Notice Footer */}
            <div className="w-full border border-t-0 border-black/5 bg-zinc-50/50 px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[9px] font-mono text-black/40 gap-2">
              <span>SECURITY_POLICY: SANDBOX_ACTIVE // ENFORCING SAME_ORIGIN</span>
              <span className="text-left sm:text-right">
                ⚠️ Connection failing? Certain environments block frame loading. Use <a href={data.homepage} target="_blank" rel="noopener noreferrer" className="text-black font-extrabold underline hover:no-underline">Launch External ↗</a> if page remains blank.
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full border border-black/5 bg-zinc-50/50 px-6 py-4 mb-24 flex justify-between items-center text-[10px] font-mono text-black/40">
            <span>[NO LIVE HOST CONFIGURED FOR THIS MODULE]</span>
            <span>STATIC ARCHIVE TELEMETRY LOADED BELOW</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2">
            {/* README Content */}
            <article className="prose-editorial">
              <div
                className="github-readme"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.readmeHtml) }}
              />
            </article>
          </div>

          <div className="space-y-16">
            {/* Stats Card */}
            <div className="border-t border-black/10 pt-8">
              <h3 className="text-[10px] font-bold text-black/30 mb-8 uppercase tracking-[0.4em]">
                System Telemetry
              </h3>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <div className="text-4xl font-bold text-black tracking-tighter">
                    {data.stars}
                  </div>
                  <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-1">
                    Stargazers
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black tracking-tighter">
                    {data.forks}
                  </div>
                  <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest mt-1">
                    Distributions
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="border-t border-black/10 pt-8">
              <h3 className="text-[10px] font-bold text-black/30 mb-8 uppercase tracking-[0.4em]">
                Architecture Distribution
              </h3>
              <div className="space-y-8">
                {Object.entries(data.languages).map(([name, bytes]) => {
                  const percentage = Math.round(
                    (bytes / Object.values(data.languages).reduce((a, b) => a + b, 0)) * 100
                  );
                  return (
                    <div key={name} className="flex justify-between items-baseline border-b border-black/5 pb-4">
                      <span className="text-lg font-bold text-black tracking-tight">{name}</span>
                      <span className="text-sm font-medium italic text-black/40">
                        {percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-12">
                {data.topics.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold text-black/30 uppercase tracking-widest"
                  >
                    &middot; {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.section>
  );
};

export default SystemDetail;
