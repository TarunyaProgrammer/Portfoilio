import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import SystemCard from "../SystemCard/SystemCard";

const SystemsGrid = ({
  limit = Infinity,
  showViewAll = true,
  type = "all",
}) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`/api/github/repos?type=${type}`);
        if (!response.ok) throw new Error("Failed to fetch repos");
        const data = await response.json();

        // Map GitHub repos to the format expected by SystemCard
        const mappedRepos = data.map((repo, index) => ({
          id: index + 1,
          title: repo.title,
          tagline: repo.description || "Experimental engineering project.",
          problem: repo.description
            ? `Developing a reliable solution for: ${repo.description}`
            : "Engineering a new system module.",
          solution: `Explore the architecture and codebase of ${repo.name} on GitHub.`,
          impact:
            repo.stars > 0
              ? `Trusted by ${repo.stars} stargazers on GitHub.`
              : "Active development and exploration.",
          tech:
            repo.topics.length > 0 ? repo.topics : [repo.language || "code"],
          features: [
            "Real-time synchronization",
            "Source code availability",
            "Automated builds",
          ], // Generic features for dynamic repos
          link: repo.url,
          slug: repo.name,
          color: getRandomColor(index),
        }));

        setRepos(mappedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getRandomColor = (index) => {
    const colors = [
      "#c8ff00",
      "#ff5470",
      "#7dd3fc",
      "#a374ff",
      "#10b981",
      "#f59e0b",
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="section-spacing bg-bg relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-24"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
              Core Systems
            </h2>
            <p className="text-gray-400 font-mono text-sm tracking-wide">
              / ARCHITECTURE / ENGINEERING / SCALE
            </p>
          </div>
          {showViewAll && (
            <a
              href="/systems"
              className="hidden md:block text-neon font-mono hover:underline decoration-neon underline-offset-4 text-sm"
            >
              VIEW ALL MODULES &rarr;
            </a>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 bg-white/5 animate-pulse rounded-card border border-white/10"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.slice(0, limit).map((system, index) => (
              <SystemCard key={system.id} system={system} index={index} />
            ))}
          </div>
        )}

        {showViewAll && (
          <div className="mt-12 text-center md:hidden">
            <a
              href="/systems"
              className="text-neon font-mono hover:underline decoration-neon underline-offset-4"
            >
              View All Modules -&gt;
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default SystemsGrid;
