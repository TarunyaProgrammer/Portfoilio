export const portfolioData = {
  personal: {
    name: "Tarunya Kesharwani",
    shortName: "Tarunya Kesh",
    monogram: "TK.",
    role: "Full-Stack Engineer & Systems Architect",
    statusText: "Open to full-time roles, product work, and thoughtful collaborations",
    gsocBadge: "Google Summer of Code '26 Developer at C2SI",
    email: "tarunyaprogrammer@gmail.com",
    tagline: "I build fast, reliable software for teams solving hard problems.",
    location: "India (Open to Remote Worldwide)",
    philosophy: [
      {
        title: "Make the complex legible",
        desc: "Good systems should be understandable to the next engineer, not just the person who first built them.",
      },
      {
        title: "Use AI with guardrails",
        desc: "I keep AI close to clear inputs, validated outputs, and business logic people can trust.",
      },
      {
        title: "Performance is part of the product",
        desc: "Fast interfaces, resilient states, and thoughtful data flow make software easier to use and easier to keep.",
      },
    ],
  },

  socials: [
    {
      name: "GitHub",
      handle: "TarunyaProgrammer",
      url: "https://github.com/TarunyaProgrammer",
      icon: "Github",
    },
    {
      name: "LinkedIn",
      handle: "tarunyakesharwani",
      url: "https://www.linkedin.com/in/tarunyakesharwani/",
      icon: "Linkedin",
    },
    {
      name: "X (Twitter)",
      handle: "@TarunyaKesh",
      url: "https://x.com/TarunyaKesh",
      icon: "Twitter",
    },
    {
      name: "DEV.to",
      handle: "@tarunya",
      url: "https://dev.to/tarunya",
      icon: "BookOpen",
    },
    {
      name: "Medium",
      handle: "@tarunyakesh",
      url: "https://medium.com/@tarunyakesh",
      icon: "FileText",
    },
  ],

  metrics: [
    { label: "Open Source PRs", value: "100+", highlight: "CNCF & GSoC '26" },
    { label: "Selected Developer", value: "GSoC '26", highlight: "C2SI Foundation" },
    { label: "GitHub Repositories", value: "60+", highlight: "Shipped & Active" },
    { label: "Developers Mentored", value: "100+", highlight: "GSSoC & SSoC" },
  ],

  // ═══════════════════════════════════════════════════════════════
  // TOP 3 FLAGSHIP PRODUCTS (CONCISE & PUNCHY)
  // ═══════════════════════════════════════════════════════════════
  flagshipProjects: [
    {
      id: "vyay",
      title: "Vyay — AI Cost Engine",
      category: "AI Infrastructure",
      year: "2026",
      tagline: "Make cloud and LLM spend easier to reason about.",
      description:
        "An AI cost-auditing platform that turns cloud and token usage into shareable reports with React, Supabase RLS, and Gemini 2.5 Flash.",
      stack: ["React", "TypeScript", "Supabase", "Gemini 2.5"],
      metrics: "Cloud + LLM cost audits • Shareable reports",
      badge: "Featured",
      github: "https://github.com/TarunyaProgrammer",
      live: "https://tarunya.me",
      glowColor: "#3b82f6",
    },
    {
      id: "github-analyzer",
      title: "GithubAnalyzer & WebiU",
      category: "GSoC '26 @ C2SI",
      year: "2026",
      tagline: "Edge-cached telemetry for open-source communities.",
      description:
        "Edge-cached telemetry platform built for C2SI using Hono on Cloudflare Workers, cutting API overhead by 60%.",
      stack: ["Hono", "Cloudflare Workers", "NestJS", "PostgreSQL"],
      metrics: "60% API Reduction • Webhooks",
      badge: "GSoC '26",
      github: "https://github.com/TarunyaProgrammer/GithubAnalyzer-PreGsocTask",
      live: "https://github.com/TarunyaProgrammer/Webiu",
      glowColor: "#10b981",
    },
    {
      id: "cabin",
      title: "Cabin — MaintainerOS",
      category: "Local-First Desktop OS",
      year: "2025 - 2026",
      tagline: "A local-first workspace for maintainers.",
      description:
        "An Electron workspace that brings multi-repo context, local Git checkouts, DCO/CI checks, and AI-assisted reviews into one place.",
      stack: ["Electron", "React", "TypeScript", "SQLite"],
      metrics: "10s Context Pipeline • Local Git Engine",
      badge: "Production OS",
      github: "https://github.com/TarunyaProgrammer/Cabin-MaintainerOS",
      live: "https://github.com/TarunyaProgrammer/Cabin-MaintainerOS",
      glowColor: "#8b5cf6",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // AUTHENTIC VERIFIED REPOSITORIES & SYSTEMS
  // ═══════════════════════════════════════════════════════════════
  archivedProjects: [
    {
      name: "Echo — Real-Time Messaging Platform",
      desc: "Low-latency instant messaging engine with Socket.IO bidirectional channels, JWT authentication, and offline sync.",
      tags: ["React", "Node.js", "Socket.IO", "MongoDB"],
      link: "https://github.com/TarunyaProgrammer/Echo-FullstackDeployed-ChatNow",
    },
    {
      name: "Streakly — Offline-first habit tracker",
      desc: "Offline-first habit tracker with IndexedDB synchronization, service workers, and resilient streaks.",
      tags: ["React", "IndexedDB", "Service Workers", "PWA"],
      link: "https://github.com/TarunyaProgrammer/Streakly-Habit-Discipline-System",
    },
    {
      name: "RFP-ResponseBuilder",
      desc: "AI workflow pipeline generating structured, tender-compliant corporate proposals from technical specifications.",
      tags: ["React", "Node.js", "LangChain", "Gemini API"],
      link: "https://github.com/TarunyaProgrammer/RFP-ResponseBuilder",
    },
    {
      name: "Student Expense Tracker",
      desc: "Financial analytics and budget forecasting system designed for university students with dynamic visual reporting.",
      tags: ["MERN", "Chart.js", "JWT Auth", "REST API"],
      link: "https://github.com/TarunyaProgrammer/Student-expense-tracker",
    },
    {
      name: "WebiU community platform",
      desc: "Open source community intelligence platform built for C2SI with event queues, Angular, NestJS, and PostgreSQL.",
      tags: ["Angular", "NestJS", "PostgreSQL", "Docker"],
      link: "https://github.com/TarunyaProgrammer/Webiu",
    },
    {
      name: "SIH Digital Wellness Platform",
      desc: "Architected a real-time digital support platform for student mental wellness and stress tracking at Smart India Hackathon.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      link: "https://github.com/TarunyaProgrammer",
    },
    {
      name: "DamRu Festival Operations Engine",
      desc: "Event registration and logistics dispatch system supporting 500+ attendees and automated communications.",
      tags: ["React", "Tailwind CSS", "Node.js"],
      link: "https://github.com/TarunyaProgrammer",
    },
  ],
  otherProjects: [
    {
      title: "Streakly — Habit & Discipline Protocol",
      category: "Local-First PWA",
      description: "Offline-first habit engineering application with IndexedDB synchronization and streak protection.",
      stack: ["React", "IndexedDB", "Service Workers", "Framer Motion"],
      github: "https://github.com/TarunyaProgrammer/Streakly-Habit-Discipline-System",
    },
    {
      title: "RFP-ResponseBuilder",
      category: "AI Workflow Automation",
      description: "Generates structured, tender-compliant corporate proposals from technical specs using LLM pipelines.",
      stack: ["React", "Node.js", "LangChain", "Gemini API"],
      github: "https://github.com/TarunyaProgrammer/RFP-ResponseBuilder",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SKILLS MATRIX (100% REAL TECHNICAL STACK)
  // ═══════════════════════════════════════════════════════════════
  skills: [
    {
      category: "Frontend Engineering",
      icon: "Layout",
      description: "Crafting fluid, high-performance user interfaces with modern reactive paradigms.",
      items: [
        "React 18 / 19",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "Lenis Smooth Scroll",
        "TanStack Query",
        "Zustand / Redux",
      ],
    },
    {
      category: "Backend & Distributed APIs",
      icon: "Server",
      description: "Architecting resilient, event-driven backends with scalable data flow.",
      items: [
        "Node.js & Express",
        "NestJS",
        "Hono (Edge/Workers)",
        "GraphQL",
        "WebSockets (Socket.IO)",
        "RESTful API Design",
        "PostgreSQL & Supabase",
        "MongoDB / Mongoose",
      ],
    },
    {
      category: "AI & Autonomous Workflows",
      icon: "Cpu",
      description: "Integrating multimodal LLMs and structured deterministic agent frameworks.",
      items: [
        "Google Antigravity SDK",
        "Gemini 2.5 Flash",
        "OpenAI API",
        "LangChain",
        "Structured Outputs",
        "Vector Stores (RAG)",
        "Prompt Engineering",
        "Deterministic Logic",
      ],
    },
    {
      category: "Databases & Cloud DevOps",
      icon: "Database",
      description: "Provisioning scalable storage, serverless edge networks, and CI/CD pipelines.",
      items: [
        "PostgreSQL (RLS)",
        "Supabase",
        "Cloud Firestore",
        "Cloudflare Workers",
        "Docker Containers",
        "Vercel Deployment",
        "GitHub Actions CI/CD",
        "IndexedDB (Offline)",
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // EXPERIENCE & OPEN SOURCE TIMELINE (100% FACTUAL)
  // ═══════════════════════════════════════════════════════════════
  experience: [
    {
      period: "Apr 2026 — Present",
      role: "Google Summer of Code (GSoC) Developer",
      org: "C2SI (Center for Open Source Intelligence)",
      badge: "GSoC 2026",
      details: [
        "Selected as a Student Developer for WebiU’s open-source community platform.",
        "Engineering an event-driven microservice backend with GitHub Webhooks and distributed caching.",
        "Collaborating directly with project maintainers on architecture, Angular, NestJS, and PostgreSQL.",
      ],
    },
    {
      period: "May 2026 — Present",
      role: "Open Source Mentor",
      org: "GirlScript Summer of Code (GSSoC) & SSoC",
      badge: "Mentorship",
      details: [
        "Guiding 100+ contributors across Git workflows, code reviews, and architecture best practices.",
        "Auditing Pull Requests for type safety, performance, and documentation completeness.",
      ],
    },
    {
      period: "Sep 2025 — Feb 2026",
      role: "Open Source Contributor",
      org: "CNCF (Meshery, Jaeger) & Community Projects",
      badge: "CNCF Ecosystem",
      details: [
        "Authored merged pull requests across backend services, frontend dashboards, and developer tooling.",
        "Engaged in peer code reviews and architectural discussions within distributed international teams.",
      ],
    },
    {
      period: "2025 — 2029",
      role: "B.Tech in Computer Science & Artificial Intelligence",
      org: "Newton School Of Technology",
      badge: "8.83 CGPA",
      details: [
        "Focusing on real-time distributed systems, algorithm design, and autonomous AI agents.",
        "Organized university technical operations and large-scale hackathons (500+ attendees).",
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // CLIENT SERVICES & CONSULTING
  // ═══════════════════════════════════════════════════════════════
  services: [
    {
      title: "Startup MVPs & landing pages",
      description: "Fast, responsive React builds that turn an early product idea into a clear, usable first release.",
      timeframe: "1-2 Weeks",
    },
    {
      title: "Figma to production React",
      description: "Accessible React components that preserve the intent of your design system in production code.",
      timeframe: "3-5 Days",
    },
    {
      title: "Full-stack SaaS architecture",
      description: "Backend APIs, data modeling, authentication, AI workflows, and payments shaped into a system your team can extend.",
      timeframe: "2-4 Weeks",
    },
    {
      title: "Performance reviews",
      description: "Find and fix layout shifts, oversized bundles, and slow paths that make a product feel harder to use.",
      timeframe: "2-4 Days",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // PUBLICATIONS & WRITINGS
  // ═══════════════════════════════════════════════════════════════
  publications: [
    {
      title: "Engineering Scalable Multi-Agent Systems with Google Antigravity",
      platform: "Medium",
      handle: "@tarunyakesh",
      readTime: "8 min read",
      link: "https://medium.com/@tarunyakesh",
      date: "Aug 2026",
      excerpt: "Deep dive into multi-agent orchestration, state persistence, and event-driven memory synchronization.",
    },
    {
      title: "Building High-Throughput Micro-Services with Distributed Caching",
      platform: "DEV.to",
      handle: "@tarunya",
      readTime: "6 min read",
      link: "https://dev.to/tarunya",
      date: "Jul 2026",
      excerpt: "Exploring low-latency network I/O primitives, memory layout optimizations, and backend caching in modern systems.",
    },
    {
      title: "The Architecture of Deterministic AI Financial Auditing",
      platform: "Medium",
      handle: "@tarunyakesh",
      readTime: "5 min read",
      link: "https://medium.com/@tarunyakesh",
      date: "Jun 2026",
      excerpt: "How we engineered Vyay to calculate enterprise token waste in <60 seconds without probabilistic error.",
    },
  ],
};
