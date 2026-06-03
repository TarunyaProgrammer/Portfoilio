import { useState, useEffect } from "react";
import axios from "axios";

export const useGitHubProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let res = await axios.get("/api/projects");
        let data = res.data;

        // Fallback: If API returns the source code (happens in Vite npm run dev without Vercel)
        if (typeof data === "string" && data.includes("export default")) {
          console.warn("Local API returned source code. Falling back to direct GitHub fetch.");
          try {
            const githubRes = await axios.get("https://api.github.com/users/TarunyaProgrammer/repos?per_page=100&sort=pushed&type=owner");
            
            const PINNED_REPOS = [
              "GithubAnalyzer-PreGsocTask",
              "Webiu",
              "Echo-FullstackDeployed-ChatNow",
              "Student-expense-tracker",
              "RFP-ResponseBuilder",
              "Streakly-Habit-Discipline-System"
            ];

            data = githubRes.data
              .filter(repo => !repo.private)
              .sort((a, b) => {
                const aPinned = PINNED_REPOS.indexOf(a.name);
                const bPinned = PINNED_REPOS.indexOf(b.name);
                
                if (aPinned !== -1 && bPinned !== -1) return aPinned - bPinned;
                if (aPinned !== -1) return -1;
                if (bPinned !== -1) return 1;
                return b.stargazers_count - a.stargazers_count;
              })
              .map(repo => {
                const photoIds = [
                  "1555066931-4365d14bab8c", // Code
                  "1550745165-9bc0b252726f", // Hardware
                  "1461749280684-dccba630e2f6", // Code screen
                  "1498050108023-c5249f4df085", // Laptop
                  "1517694712202-14dd9538aa97", // Laptop code
                  "1587620962725-abab7fe55159", // Tech setup
                  "1525373612132-b3e820b87cea", // AI/Chip
                  "1531297484001-80022131f5a1", // Circuits
                  "1518770660439-4636190af475", // CPU
                  "1550745165-9bc0b252726f"  // Tech gear
                ];
                const photoId = photoIds[repo.id % photoIds.length];
                return {
                  id: repo.id,
                  title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                  slug: repo.name,
                  category: repo.language || "Open Source",
                  year: new Date(repo.created_at).getFullYear().toString(),
                  description: repo.description || "A technical system built for high-performance execution.",
                  stars: repo.stargazers_count,
                  url: repo.html_url,
                  homepage: repo.homepage,
                  pushed_at: repo.pushed_at,
                  image: `https://images.unsplash.com/photo-${photoId}?q=80&w=1000&auto=format&fit=crop`
                };
              });
          } catch (apiErr) {
            console.error("Direct GitHub projects fetch failed. Using static fallback.", apiErr);
            data = [
              {
                id: 1,
                title: "Distributed Locker",
                slug: "distributed-locker",
                category: "Go / Systems",
                year: "2026",
                description: "High-performance distributed locking mechanism using Redis and Lua.",
                stars: 1200,
                url: "https://github.com/TarunyaProgrammer/distributed-locker",
                homepage: "",
                image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2540&auto=format&fit=crop"
              },
              {
                id: 2,
                title: "React Particles X",
                slug: "react-particles-x",
                category: "React / WebGL",
                year: "2025",
                description: "Lightweight particle animation library for React.",
                stars: 840,
                url: "https://github.com/TarunyaProgrammer/react-particles-x",
                homepage: "",
                image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2540&auto=format&fit=crop"
              }
            ];
          }
        }

        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error("API returned non-array data:", data);
          setProjects([]);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub projects", err);
        setError(err);
        setProjects([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
