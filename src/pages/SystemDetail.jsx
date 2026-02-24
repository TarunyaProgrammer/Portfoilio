import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const SystemDetail = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prettyName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  useDocumentSEO({
    title: prettyName,
    description: `Architecture overview, performance metrics, and tech-stack breakdown for ${prettyName} — a system built by Tarunya Kesharwani.`,
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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neon border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-neon tracking-widest uppercase">
            Initializing Intelligence...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-heading mb-4 text-white">
            System Offline
          </h1>
          <p className="text-gray-400 mb-8">
            {error || "Project not found in the registry."}
          </p>
          <Link
            to="/systems"
            className="text-neon border border-neon px-8 py-3 rounded hover:bg-neon hover:text-black transition-all font-mono uppercase tracking-widest text-sm"
          >
            Return to Registry
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
      className="min-h-screen bg-bg pb-20"
    >
      <div className="container mx-auto px-6">
        <Link
          to="/systems"
          className="text-neon font-mono mb-8 inline-block hover:underline"
        >
          &larr; Back to Registry
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase mb-4">
              // system.module.{data.name.toLowerCase()}
            </p>
            <h1 className="text-5xl md:text-7xl font-heading font-bold capitalize text-white">
              {data.name.replace(/-/g, " ")}
            </h1>
          </div>
          <div className="flex gap-4">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-neon text-black font-bold font-mono text-xs tracking-widest uppercase hover:bg-white transition-all"
            >
              Source Code
            </a>
            {data.homepage && (
              <a
                href={data.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-neon text-neon font-bold font-mono text-xs tracking-widest uppercase hover:bg-neon/10 transition-all"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* README Content */}
            <div className="bg-grid/10 p-8 rounded-panel border border-white/5 prose-style">
              <h2 className="text-2xl font-bold mb-8 text-sysblue font-heading tracking-tight">
                Project Documentation
              </h2>
              <div
                className="github-readme text-gray-300 leading-relaxed overflow-hidden"
                dangerouslySetInnerHTML={{ __html: data.readmeHtml }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Stats Card */}
            <div className="p-6 bg-grid/20 border border-white/5 rounded-panel">
              <h3 className="font-mono text-xs text-gray-500 mb-6 uppercase tracking-[0.2em]">
                Telemetry
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-white">
                    {data.stars}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Stars
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {data.forks}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Forks
                  </div>
                </div>
              </div>
            </div>

            {/* Languages Card */}
            <div className="p-6 border border-white/10 rounded-lg">
              <h3 className="font-mono text-xs text-gray-500 mb-6 uppercase tracking-[0.2em]">
                Tech Stack Breakdown
              </h3>
              <div className="space-y-4">
                {Object.entries(data.languages).map(([name, bytes]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-gray-300">{name}</span>
                      <span className="text-gray-500">
                        {Math.round(
                          (bytes /
                            Object.values(data.languages).reduce(
                              (a, b) => a + b,
                              0,
                            )) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-neon shadow-[0_0_10px_rgba(200,255,0,0.5)]"
                        style={{
                          width: `${(bytes / Object.values(data.languages).reduce((a, b) => a + b, 0)) * 100}%`,
                          backgroundColor: getLangColor(name),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {data.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .github-readme h1, .github-readme h2, .github-readme h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
          color: white;
        }
        .github-readme h1 { font-size: 2.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .github-readme h2 { font-size: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.3rem; }
        .github-readme p { margin-bottom: 1rem; }
        .github-readme ul, .github-readme ol { margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: disc; }
        .github-readme li { margin-bottom: 0.5rem; }
        .github-readme code { background: rgba(255,255,255,0.1); padding: 0.2rem 0.4rem; rounded: 4px; font-family: monospace; font-size: 0.875rem; }
        .github-readme pre { background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto; border: 1px solid rgba(255,255,255,0.05); }
        .github-readme img { max-width: 100%; border-radius: 8px; margin: 2rem 0; }
        .github-readme a { color: #c8ff00; text-decoration: underline; }
      `,
        }}
      />
    </motion.section>
  );
};

const getLangColor = (lang) => {
  const colors = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Python: "#3572A5",
    Rust: "#dea584",
    Java: "#b07219",
    "C++": "#f34b7d",
    Ruby: "#701516",
    Go: "#00ADD8",
  };
  return colors[lang] || "#c8ff00";
};

export default SystemDetail;
