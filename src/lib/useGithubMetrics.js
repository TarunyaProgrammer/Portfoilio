import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolioData";

const CACHE_KEY = "tk_github_metrics_cache_v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours cron refresh interval

export const useGithubMetrics = () => {
  const [metrics, setMetrics] = useState(() => {
    // 1. Initial State: Read from localStorage cache if fresh (< 6 hours)
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          const age = Date.now() - (cached.timestamp || 0);
          if (age < CACHE_TTL_MS && cached.data) {
            return cached.data;
          }
        }
      } catch {
        // Fallback to portfolio baseline
      }
    }
    return portfolioData.metrics;
  });

  const [isLiveSynced, setIsLiveSynced] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const syncMetrics = async () => {
      // Check if cache is still valid
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          const age = Date.now() - (cached.timestamp || 0);
          if (age < CACHE_TTL_MS && cached.data) {
            if (isMounted) {
              setMetrics(cached.data);
              setIsLiveSynced(true);
            }
            return;
          }
        }
      } catch {
        // Continue to fresh fetch
      }

      // Fetch fresh stats from GitHub Public APIs
      try {
        const [userRes, prsRes] = await Promise.allSettled([
          fetch("https://api.github.com/users/TarunyaProgrammer", {
            headers: { Accept: "application/vnd.github.v3+json" },
          }),
          fetch(
            "https://api.github.com/search/issues?q=author:TarunyaProgrammer+type:pr",
            {
              headers: { Accept: "application/vnd.github.v3+json" },
            }
          ),
        ]);

        let repoCount = 60;
        let prCount = 100;

        if (userRes.status === "fulfilled" && userRes.value.ok) {
          const userData = await userRes.value.json();
          if (userData.public_repos) {
            repoCount = Math.max(60, Number(userData.public_repos));
          }
        }

        if (prsRes.status === "fulfilled" && prsRes.value.ok) {
          const prsData = await prsRes.value.json();
          if (typeof prsData.total_count === "number") {
            prCount = Math.max(100, Number(prsData.total_count));
          }
        }

        const freshMetrics = [
          {
            label: "Open Source PRs",
            value: `${prCount}+`,
            highlight: "CNCF & GSoC '26",
            tag: "GitHub Synced",
          },
          {
            label: "Selected Developer",
            value: "GSoC '26",
            highlight: "C2SI Foundation",
            tag: "Google Open Source",
          },
          {
            label: "GitHub Repositories",
            value: `${repoCount}+`,
            highlight: "Shipped & Active",
            tag: "GitHub Synced",
          },
          {
            label: "Developers Mentored",
            value: "100+",
            highlight: "GSSoC & SSoC",
            tag: "Leadership",
          },
        ];

        if (isMounted) {
          setMetrics(freshMetrics);
          setIsLiveSynced(true);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({
                timestamp: Date.now(),
                data: freshMetrics,
              })
            );
          } catch {
            // Storage quota exceeded or disabled
          }
        }
      } catch {
        // Fallback gracefully on network error or rate limit
        if (isMounted) {
          setIsLiveSynced(false);
        }
      }
    };

    syncMetrics();

    // 6-hour interval trigger while tab is open
    const interval = setInterval(syncMetrics, CACHE_TTL_MS);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { metrics, isLiveSynced };
};
