import { useState, useEffect } from "react";
import axios from "axios";

export const useGitHubSignals = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await axios.get("/api/signals/github");
        setData(res.data);
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
