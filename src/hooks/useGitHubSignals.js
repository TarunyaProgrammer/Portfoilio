import { useState, useEffect } from "react";
import axios from "axios";

export const useGitHubSignals = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        let res = await axios.get("/api/signals/github");
        let signals = res.data;

        // Fallback for Vite npm run dev
        if (typeof signals === "string" && signals.includes("export default")) {
          console.warn("Local API returned source code. Falling back to direct GitHub fetch.");
          try {
            const githubRes = await axios.get("https://api.github.com/users/TarunyaProgrammer");
            const reposRes = await axios.get("https://api.github.com/users/TarunyaProgrammer/repos?per_page=100");
            
            signals = {
              totalRepos: githubRes.data.public_repos,
              totalStars: reposRes.data.reduce((acc, repo) => acc + repo.stargazers_count, 0),
              activeSystems: reposRes.data.filter(r => !r.fork).length,
              lastActive: githubRes.data.updated_at
            };
          } catch (apiErr) {
            console.error("Direct GitHub fetch failed (likely rate limit). Using static fallback.", apiErr);
            signals = {
              totalRepos: 45,
              totalStars: 4,
              activeSystems: 42,
              lastActive: new Date().toISOString()
            };
          }
        }
        setData(signals);
      } catch (err) {
        console.error("Failed to fetch GitHub signals", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
  }, []);

  return { data, loading, error };
};
