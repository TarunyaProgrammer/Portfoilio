export default async function handler(req, res) {
  const { type } = req.query; // 'pinned' or 'all'
  const isPinnedRequest = type === "pinned";

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = "TarunyaProgrammer";

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "GITHUB_TOKEN not configured" });
  }

  // GraphQL Query for Pinned Items or All Repos
  const query = isPinnedRequest
    ? `
      query {
        user(login: "${USERNAME}") {
          pinnedItems(first: 12, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                stargazerCount
                forkCount
                url
                homepageUrl
                pushedAt
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `
    : `
      query {
        user(login: "${USERNAME}") {
          repositories(first: 100, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
            nodes {
              name
              description
              stargazerCount
              forkCount
              url
              homepageUrl
              pushedAt
              repositoryTopics(first: 10) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      throw new Error("GitHub GraphQL API failed");
    }

    const nodes = isPinnedRequest
      ? result.data.user.pinnedItems.nodes
      : result.data.user.repositories.nodes;

    const cleanedRepos = nodes.map((repo, index) => ({
      id: index + 1,
      name: repo.name,
      title: repo.name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      description: repo.description,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      topics: repo.repositoryTopics.nodes.map((n) => n.topic.name),
      url: repo.url,
      updatedAt: repo.pushedAt,
      homepage: repo.homepageUrl,
      language: repo.languages.nodes[0]?.name || "Code",
    }));

    res.status(200).json(cleanedRepos);
  } catch (error) {
    console.error("GitHub Repos Error:", error);
    res.status(500).json({ error: "Failed to fetch repositories via GraphQL" });
  }
}
