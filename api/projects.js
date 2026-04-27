export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "tarunyaio";

  try {
    const headers = GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};

    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed&type=owner`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API failed: ${response.status}`);
    }

    const repos = await response.json();
    
    const PINNED_REPOS = [
      "GithubAnalyzer-PreGsocTask",
      "Webiu",
      "Echo-FullstackDeployed-ChatNow",
      "Student-expense-tracker",
      "RFP-ResponseBuilder",
      "Streakly-Habit-Discipline-System"
    ];

    // Transform into project format
    const projects = repos
      .filter(repo => !repo.private)
      .sort((a, b) => {
        const aPinned = PINNED_REPOS.indexOf(a.name);
        const bPinned = PINNED_REPOS.indexOf(b.name);
        
        if (aPinned !== -1 && bPinned !== -1) return aPinned - bPinned;
        if (aPinned !== -1) return -1;
        if (bPinned !== -1) return 1;
        return b.stargazers_count - a.stargazers_count;
      })
      .map(repo => ({
        id: repo.id,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        slug: repo.name,
        category: repo.language || "Open Source",
        year: new Date(repo.created_at).getFullYear().toString(),
        description: repo.description || "A technical system built for high-performance execution.",
        stars: repo.stargazers_count,
        url: repo.html_url,
        pushed_at: repo.pushed_at,
        // Using a high-quality placeholder image for now, can be improved with specific logic
        image: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2540&auto=format&fit=crop`
      }));

    res.status(200).json(projects);
  } catch (error) {
    console.error("Projects API Error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}
