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

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2">
            {/* README Content */}
            <article className="prose-editorial">
              <div
                className="github-readme"
                dangerouslySetInnerHTML={{ __html: data.readmeHtml }}
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .github-readme h1, .github-readme h2, .github-readme h3 {
          font-family: 'Inter', sans-serif;
          margin-top: 4rem;
          margin-bottom: 1.5rem;
          font-weight: 800;
          color: #000;
          line-height: 1.1;
          letter-spacing: -0.04em;
        }
        .github-readme h1 { font-size: 3.5rem; border-bottom: 2px solid #000; padding-bottom: 1rem; }
        .github-readme h2 { font-size: 2.25rem; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 0.5rem; }
        .github-readme h3 { font-size: 1.5rem; }
        .github-readme p { font-family: 'Inter', sans-serif; font-size: 1.125rem; line-height: 1.8; color: #333; margin-bottom: 2rem; }
        .github-readme ul, .github-readme ol { margin-bottom: 2rem; padding-left: 2rem; list-style-type: square; }
        .github-readme li { font-family: 'Inter', sans-serif; font-size: 1.125rem; color: #444; margin-bottom: 0.75rem; }
        .github-readme code { background: rgba(0,0,0,0.05); padding: 0.2rem 0.5rem; border-radius: 0; font-family: monospace; font-size: 0.9em; font-weight: 600; color: #000; }
        .github-readme pre { background: #000; color: #fff; padding: 2rem; border-radius: 0; margin-bottom: 2.5rem; overflow-x: auto; }
        .github-readme img { max-width: 100%; height: auto; border: 1px solid rgba(0,0,0,0.1); margin: 3rem 0; }
        .github-readme a { color: #000; text-decoration: underline; text-underline-offset: 4px; font-weight: 700; }
        .github-readme hr { border: 0; border-top: 1px solid rgba(0,0,0,0.1); margin: 4rem 0; }
      `,
        }}
      />
    </motion.section>
  );
};

export default SystemDetail;
