export const blogPosts = [
  {
    id: "offline-first-architecture",
    date: "MAY 2026",
    title: "The Case for Offline-First Architecture",
    category: "Systems Design",
    excerpt: "Why building for the disconnected state is the next frontier of user experience and system reliability.",
    readTime: "8 min",
    content: [
      {
        type: "paragraph",
        text: "In the modern web, we often take connectivity for granted. But as I discovered during my GSoC tenure working on real-time systems, the 'Latency Wall' isn't just about speed—it's about survival. When the network fails, your system should not."
      },
      {
        type: "quote",
        text: "A decision engine does not tolerate round-trip latency. When a system must reason in real time, every network hop becomes cognitive drag."
      },
      {
        type: "paragraph",
        text: "By moving intelligence to the edge and adopting local-first sync protocols, we aren't just making apps faster; we're making them resilient. This is the architecture I implemented for the WebiU project."
      }
    ]
  },
  {
    id: "nestjs-dto-validation",
    date: "APR 2026",
    title: "How I Structured Validation in NestJS DTOs",
    category: "Backend Architecture",
    excerpt: "Moving beyond simple decorators into a deterministic, type-safe validation layer for complex enterprise systems.",
    readTime: "10 min",
    content: [
      {
        type: "paragraph",
        text: "Validation is often treated as an afterthought—a few @IsString() decorators and a prayer. But in high-stakes financial or architectural systems, your DTO is your first line of defense."
      },
      {
        type: "paragraph",
        text: "During my work with NestJS, I developed a pattern for 'Layered Validation' where semantic rules are separated from structural constraints. This reduces code duplication and ensures that your business logic never touches tainted data."
      }
    ]
  },
  {
    id: "oss-pr-review-lessons",
    date: "MAR 2026",
    title: "Architectural Problems I Found Reviewing Open Source PRs",
    category: "Engineering Culture",
    excerpt: "Lessons learned from reviewing hundreds of pull requests and why code style is the least of your problems.",
    readTime: "15 min",
    content: [
      {
        type: "paragraph",
        text: "Reviewing code for major open source projects is a masterclass in seeing the 'Invisible Architecture'. You start to see patterns not in the syntax, but in the coupling."
      },
      {
        type: "paragraph",
        text: "The most common failure isn't a bug; it's a lack of intent. When a PR tries to solve three problems at once, it creates five more in the future. Here's how I trained my eye to spot these structural fractures early."
      }
    ]
  }
];
