export default async function handler(req, res) {
  // Simulating cached response headers
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "TarunyaProgrammer";

  try {
    // Determine headers based on token presence
    const headers = GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};

    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner`,
      { headers }
    );

    if (!response.ok) {
        // Fallback for demo if rate limited or invalid token
        if (response.status === 403 || response.status === 401) {
             return res.status(200).json({
                totalRepos: 12,
                totalStars: 45,
                activeSystems: 4,
                lastActive: new Date().toISOString()
            });
        }
      throw new Error("GitHub API failed");
    }

    const repos = await response.json();

    // Compute Signals
    const totalRepos = repos.length;
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    const activeSystems = repos.filter((repo) => !repo.archived).length;
    
    // Sort by push date to get last active
    const sortedRepos = [...repos].sort((a, b) => 
        new Date(b.pushed_at) - new Date(a.pushed_at)
    );
    const lastActive = sortedRepos.length > 0 ? sortedRepos[0].pushed_at : null;

    res.status(200).json({
      totalRepos,
      totalStars,
      activeSystems,
      lastActive,
    });
  } catch (error) {
    console.error("GitHub Signal Error:", error);
    // Return safe fallback to prevent UI crash
    res.status(200).json({
        totalRepos: 0,
        totalStars: 0,
        activeSystems: 0,
        lastActive: null
    });
  }
}
