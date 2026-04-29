import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useCodeforcesSignals = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchSignals = async () => {
      try {
        let res = await axios.get("/api/signals/codeforces");
        let signals = res.data;

        // Fallback for Vite npm run dev
        if (typeof signals === "string" && signals.includes("export default")) {
          console.warn("Local API returned source code. Falling back to direct Codeforces fetch.");
          try {
            const handle = "tarunya.programmer";
            const infoRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
            const statusRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
            
            if (infoRes.data.status === "OK" && statusRes.data.status === "OK") {
              const user = infoRes.data.result[0];
              const submissions = statusRes.data.result;
              const solved = new Set(submissions.filter(s => s.verdict === "OK").map(s => s.problem.name)).size;

              signals = {
                rating: user.rating || 0,
                maxRating: user.maxRating || 0,
                rank: user.rank || "unranked",
                uniqueSolved: solved,
                lastContest: new Date().toISOString()
              };
            }
          } catch (apiErr) {
            console.error("Direct Codeforces fetch failed. Using static fallback.", apiErr);
            signals = {
              rating: 1240,
              maxRating: 1240,
              rank: "pupil",
              uniqueSolved: 85,
              lastContest: new Date().toISOString()
            };
          }
        }
        setData(signals);
      } catch (err) {
        console.error("Failed to fetch Codeforces signals", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSignals();
  }, []);

  return { data, loading, error };
};
