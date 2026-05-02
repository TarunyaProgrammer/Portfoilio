import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";

const OpenSource = () => {
  useDocumentSEO({
    title: "Open Source — Tarunya Kesharwani",
    description:
      "A record of public contributions, library developments, and continuous learning explorations in the open-source ecosystem.",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 md:pt-48 pb-32"
    >
      <div className="container mx-auto px-8 max-w-5xl">
        <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
          public contributions
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-black leading-none mb-24 tracking-tighter">
          Open <br />
          <span className="italic font-normal opacity-20">Source</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: "Distributed-Locker",
              stars: "1.2k",
              description: "A high-performance distributed locking mechanism for microservices architecture using Redis and Lua scripts."
            },
            {
              title: "React-Particles-X",
              stars: "840",
              description: "Lightweight particle animation library for React with WebGL acceleration and procedural geometry."
            }
          ].map((repo) => (
            <div key={repo.title} className="p-12 border border-black/10 bg-white hover:bg-black/5 transition-all duration-700 group">
              <div className="flex justify-between items-start mb-12">
                <h2 className="text-3xl font-bold text-black group-hover:italic transition-all">
                  {repo.title}
                </h2>
                <span className="text-[10px] font-bold text-black/30 tracking-widest uppercase">★ {repo.stars}</span>
              </div>
              <p className="text-black/60 font-medium text-lg leading-relaxed mb-12">
                {repo.description}
              </p>
              <a
                href="https://github.com/TarunyaProgrammer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:pr-4 transition-all"
              >
                Examine Repository &rarr;
              </a>
            </div>
          ))}
        </div>

        <div className="mt-48 border-t border-black/10 pt-24">
          <h2 className="text-4xl font-bold text-black mb-12">Learning Log</h2>
          <div className="space-y-12">
            {[
              { date: "JAN 2026", note: "Exploring agentic workflows and autonomous system design with LLMs." },
              { date: "DEC 2025", note: "Deep dive into Rust ownership model and concurrent programming patterns." },
              { date: "OCT 2025", note: "Researching privacy-first local-first sync protocols for distributed apps." },
            ].map((log, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-24 items-baseline border-b border-black/5 pb-8 last:border-0">
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-[0.4em] shrink-0">
                  {log.date}
                </span>
                <p className="text-black/60 font-medium text-xl italic">
                  {log.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OpenSource;
