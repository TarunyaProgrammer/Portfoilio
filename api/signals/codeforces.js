export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const HANDLE = "TarunyaProgrammer";

  try {
    // 1. Fetch User Info
    const userRes = await fetch(
      `https://codeforces.com/api/user.info?handles=${HANDLE}`
    );
    const userData = await userRes.json();

    if (userData.status !== "OK") throw new Error("CF User API failed");

    const user = userData.result[0];

    // 2. Fetch User Status (for solved count)
    // Fetching last 2000 submissions should be sufficient for most active users to get a good estimate, 
    // or fetch all if needed. CF API usually handles full history fine.
    const statusRes = await fetch(
      `https://codeforces.com/api/user.status?handle=${HANDLE}&from=1&count=2000`
    );
    const statusData = await statusRes.json();
    
    let uniqueSolved = 0;
    
    if (statusData.status === "OK") {
        const solved = new Set();
        statusData.result.forEach(submission => {
            if (submission.verdict === "OK") {
                // Unique problem identifier: contestId + index (e.g., 123A)
                solved.add(`${submission.problem.contestId}${submission.problem.index}`);
            }
        });
        uniqueSolved = solved.size;
    }

    // 3. Fetch Rating History (for contests & last active)
    const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${HANDLE}`);
    const ratingData = await ratingRes.json();
    
    let lastContest = null;
    let totalContests = 0;

    if (ratingData.status === "OK") {
        const history = ratingData.result;
        totalContests = history.length;
        if (history.length > 0) {
            lastContest = new Date(history[history.length - 1].ratingUpdateTimeSeconds * 1000).toISOString();
        }
    }

    res.status(200).json({
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      totalContests,
      uniqueSolved,
      lastContest,
      avatar: user.titlePhoto
    });

  } catch (error) {
    console.error("Codeforces Signal Error:", error);
    res.status(200).json({
      error: true,
      rating: 0,
      rank: "offline"
    });
  }
}
