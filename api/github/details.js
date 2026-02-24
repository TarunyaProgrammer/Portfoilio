export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Repository name is required" });
  }

  // Cache for 1 hour
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

    // 1. Fetch Languages
    const langResponse = await fetch(
      `https://api.github.com/repos/${USERNAME}/${name}/languages`,
      { headers },
    );
    const languages = langResponse.ok ? await langResponse.json() : {};

    // 2. Fetch README as HTML
    const readmeHeaders = {
      ...headers,
      Accept: "application/vnd.github.v3.html",
    };
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${USERNAME}/${name}/readme`,
      { headers: readmeHeaders },
    );

    let readmeHtml = "";
    if (readmeResponse.ok) {
      readmeHtml = await readmeResponse.text();
    } else {
      readmeHtml = "<p>No README available for this project.</p>";
    }

    // 3. Fetch Basic Info for meta (like stars/topics)
    const infoResponse = await fetch(
      `https://api.github.com/repos/${USERNAME}/${name}`,
      { headers },
    );
    const info = infoResponse.ok ? await infoResponse.json() : {};

    res.status(200).json({
      name: info.name,
      fullName: info.full_name,
      description: info.description,
      stars: info.stargazers_count,
      forks: info.forks_count,
      topics: info.topics || [],
      url: info.html_url,
      homepage: info.homepage,
      languages,
      readmeHtml,
    });
  } catch (error) {
    console.error("GitHub Details Error:", error);
    res.status(500).json({ error: "Failed to fetch repository details" });
  }
}
