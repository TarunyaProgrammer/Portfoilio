export const portfolioData = {
  personal: {
    name: "Tarunya Kesharwani",
    shortName: "Tarunya Kesh",
    monogram: "TK.",
    role: "Full-Stack Systems Architect & AI Engineer",
    statusText: "Available for Roles & High-Impact Consulting",
    gsocBadge: "Google Summer of Code '26 Developer @ C2SI",
    email: "tarunyaprogrammer@gmail.com",
    tagline: "Crafting high-throughput web applications, autonomous agentic workflows, and distributed backend architectures with zero compromise.",
    location: "India (Open to Remote Worldwide)",
    philosophy: [
      {
        title: "Readable > Clever",
        desc: "Code is read 10x more than it's written. I design architectures that the next engineer can understand on day one.",
      },
      {
        title: "Deterministic AI Systems",
        desc: "AI should serve precise, validated business logic—not unconstrained probabilistic drift.",
      },
      {
        title: "Obsession with Low Latency",
        desc: "Sub-100ms interactions, optimized Core Web Vitals, and resilient offline-first states.",
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
    { label: "Open Source PRs", value: "25+", highlight: "CNCF & GSoC" },
    { label: "Academic Merit", value: "8.83", highlight: "CGPA in CS/AI" },
    { label: "GitHub Repositories", value: "45+", highlight: "Shipped Projects" },
    { label: "Community Mentored", value: "100+", highlight: "GSSoC & SSoC" },
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
      tagline: "Audit cloud & LLM spend in <60s.",
      description:
        "Deterministic audit platform calculating cloud & LLM token spend with Gemini 2.5 Flash, Supabase RLS, and shareable reports.",
      stack: ["React", "TypeScript", "Supabase", "Gemini 2.5"],
      metrics: "<60s Audits • 95+ Score",
      badge: "Featured",
      github: "https://github.com/TarunyaProgrammer",
      live: "https://tarunyaportfolio.vercel.app",
      glowColor: "#3b82f6",
    },
    {
      id: "github-analyzer",
      title: "GithubAnalyzer & WebiU",
      category: "GSoC '26 @ C2SI",
      year: "2026",
      tagline: "Edge telemetry & developer analytics.",
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
      tagline: "Local-first operating system for open-source code reviews.",
      description:
        "Local-first Electron desktop workspace automating multi-repo PR context collection, local git checkouts, automated DCO/CI validation, and streaming AI reviews.",
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
      name: "Streakly — Habit & Discipline Protocol",
      desc: "Offline-first habit engineering application with IndexedDB synchronization, service workers, and streak resilience.",
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
      name: "WebiU Next-Generation Architecture",
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
        "Selected as a Student Developer for WebiU's next-generation open source platform.",
        "Engineering an event-driven microservice backend leveraging GitHub Webhooks & distributed caching.",
        "Collaborating directly with project maintainers on system architecture, Angular, NestJS, and PostgreSQL.",
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
        "Authored 25+ merged Pull Requests across backend services, frontend dashboards, and developer tooling.",
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
      title: "Startup MVP & Landing Pages",
      description: "Conversion-optimized, ultra-responsive web applications built with React, Tailwind, and Framer Motion.",
      timeframe: "1-2 Weeks",
    },
    {
      title: "Figma to Pixel-Perfect React",
      description: "100% faithful, clean, and accessible component translation of your design system into production code.",
      timeframe: "3-5 Days",
    },
    {
      title: "Full-Stack SaaS Architecture",
      description: "Complete backend API, database modeling, authentication, AI pipelines, and payment integration.",
      timeframe: "2-4 Weeks",
    },
    {
      title: "Core Web Vitals & Speed Optimization",
      description: "Eliminate layout shifts (CLS), reduce bundle payloads, and boost your Lighthouse score to 95+.",
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
