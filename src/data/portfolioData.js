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
        desc: "AI should serve precise, validated business logic—not unconstrained hallucinations.",
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
  // TOP 3 FLAGSHIP PRODUCTS (MAJOR SPOTLIGHT)
  // ═══════════════════════════════════════════════════════════════
  flagshipProjects: [
    {
      id: "vyay",
      title: "Vyay — AI Infrastructure Cost Audit Platform",
      category: "Full-Stack • AI Financial Engineering",
      year: "2026",
      tagline: "Pinpoint cloud AI token waste, compute redundancies, and cost-saving vectors in under 60 seconds.",
      description:
        "Engineered a deterministic audit engine calculating cloud & LLM infrastructure spend. Integrates Gemini 2.5 Flash for executive financial breakdowns, Supabase PostgreSQL with Row-Level Security, shareable unique report URLs, and transactional reporting via Resend.",
      stack: ["React", "TypeScript", "Supabase", "Gemini 2.5 Flash", "Resend", "Tailwind CSS", "Vitest"],
      metrics: "Calculates audits in <60s • 95+ Lighthouse score",
      badge: "Featured Flagship",
      github: "https://github.com/TarunyaProgrammer",
      live: "https://tarunyaportfolio.vercel.app",
      glowColor: "#3b82f6", // Electric Blue
    },
    {
      id: "github-analyzer",
      title: "GithubAnalyzer & WebiU Next-Gen",
      category: "GSoC 2026 • Distributed Serverless Architecture",
      year: "2026",
      tagline: "High-throughput GitHub telemetry and intelligence platform with edge caching on Cloudflare Workers.",
      description:
        "Designed during Google Summer of Code (GSoC '26) for C2SI. Transforms complex repository activity into live developer telemetry using Hono on Cloudflare Workers, Octokit caching strategies reducing API consumption by 60%, and event-driven webhook architectures.",
      stack: ["Hono", "Cloudflare Workers", "Angular", "NestJS", "GraphQL", "PostgreSQL", "Octokit"],
      metrics: "60% API overhead reduction • Event-Driven Webhooks",
      badge: "GSoC 2026 @ C2SI",
      github: "https://github.com/TarunyaProgrammer/GithubAnalyzer-PreGsocTask",
      live: "https://github.com/TarunyaProgrammer/Webiu",
      glowColor: "#10b981", // Emerald Green
    },
    {
      id: "echo-chat",
      title: "Echo — Real-Time Production Messaging Engine",
      category: "Full-Stack • Real-Time Systems",
      year: "2025 - 2026",
      tagline: "Sub-50ms instant messaging system with persistent offline queuing and authenticated sessions.",
      description:
        "Built a complete real-time messaging architecture utilizing WebSockets (Socket.IO) and Node.js. Features zero-lag bidirectional communication, JWT token authorization with secure cookies, persistent message archiving in MongoDB, and offline queue synchronization.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS", "JWT"],
      metrics: "<50ms message latency • Resilient offline sync",
      badge: "Production Deployed",
      github: "https://github.com/TarunyaProgrammer/Echo-FullstackDeployed-ChatNow",
      live: "https://tarunyaportfolio.vercel.app",
      glowColor: "#8b5cf6", // Violet
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // OTHER NOTABLE REPOSITORIES & SYSTEMS (ARCHIVE)
  // ═══════════════════════════════════════════════════════════════
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
    {
      title: "Student Expense Tracker",
      category: "Fintech Dashboard",
      description: "Financial analytics and budget forecasting system designed for university students with data visualization.",
      stack: ["MERN Stack", "Chart.js", "JWT Auth", "REST API"],
      github: "https://github.com/TarunyaProgrammer/Student-expense-tracker",
    },
    {
      title: "Aeon Privacy Protocol",
      category: "Decentralized Security",
      description: "Architectural exploration of privacy layers and encrypted cross-chain state relays.",
      stack: ["TypeScript", "Cryptography", "Distributed Systems"],
      github: "https://github.com/TarunyaProgrammer",
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // SKILLS MATRIX (MAGIC UI BENTO / SPOTLIGHT)
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
        "Rust (Low-Latency)",
        "GraphQL",
        "WebSockets (Socket.IO)",
        "RESTful API Design",
        "Nodemailer / SMTP",
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
        "Deterministic Logic",
        "Prompt Engineering",
      ],
    },
    {
      category: "Databases & Cloud DevOps",
      icon: "Database",
      description: "Provisioning scalable storage, serverless edge networks, and CI/CD pipelines.",
      items: [
        "PostgreSQL & Supabase",
        "Cloud Firestore",
        "MongoDB / Mongoose",
        "Redis Caching",
        "Docker Containers",
        "Cloudflare Workers",
        "Vercel Deployment",
        "GitHub Actions CI/CD",
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════
  // EXPERIENCE & OPEN SOURCE TIMELINE
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
      title: "Building High-Throughput Micro-Services with Zero-Copy Deserialization",
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
