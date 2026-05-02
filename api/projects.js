export default async function handler(req, res) {
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "TarunyaProgrammer";

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
      "1519389950473-47ba027748a1"  // Tech gear
    ];

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
      .map(repo => {
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
          pushed_at: repo.pushed_at,
          image: `https://images.unsplash.com/photo-${photoId}?q=80&w=1000&auto=format&fit=crop`
        };
      });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Projects API Error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}
