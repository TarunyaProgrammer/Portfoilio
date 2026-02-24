export default async function handler(req, res) {
  // Cache for 1 hour, stale-while-revalidate for background updates
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "TarunyaProgrammer";

  try {
    const headers = GITHUB_TOKEN
      ? {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        }
      : { Accept: "application/vnd.github.v3+json" };

    const response = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(`GitHub API failed with status ${response.status}`);
    }

    const repos = await response.json();

    // Filter out forks if you only want your original work
    const myRepos = repos.filter((repo) => !repo.fork);

    // Map to a clean structure for the frontend
    const cleanedRepos = myRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      title: repo.name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      url: repo.html_url,
      updatedAt: repo.pushed_at,
      homepage: repo.homepage,
      language: repo.language,
      size: repo.size,
    }));

    res.status(200).json(cleanedRepos);
  } catch (error) {
    console.error("GitHub Repos Error:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
}
