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

    // 2. Fetch User Status (for solved count & contests)
    // Limiting to last 50 submissions to be lightweight, or we can just skip exact solved count if too heavy
    // For 'Total Solved', we genuinely need all submissions or a scraping approach. 
    // To keep it fast/lightweight, we might just use rating/rank/maxRating from user info
    // and maybe last contest activity.
    
    // Let's grab rating history for 'last contest'
    const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${HANDLE}`);
    const ratingData = await ratingRes.json();
    
    let lastContest = null;
    let totalContests = 0;

    if (ratingData.status === "OK" && ratingData.result.length > 0) {
        const history = ratingData.result;
        totalContests = history.length;
        // Last contest time (seconds to ms)
        lastContest = new Date(history[history.length - 1].ratingUpdateTimeSeconds * 1000).toISOString();
    }

    res.status(200).json({
      handle: user.handle,
      rating: user.rating || 0,
      maxRating: user.maxRating || 0,
      rank: user.rank || "unrated",
      maxRank: user.maxRank || "unrated",
      totalContests,
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
