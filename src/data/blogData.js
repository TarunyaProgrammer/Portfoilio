export const blogPosts = [
  {
    id: 'tutorial-to-engineering',
    title: "How Open Source Destroyed My Tutorial-Driven Thinking",
    category: "Architecture",
    date: "May 2026",
    excerpt: "The brutal reality of moving from 'code that works' to 'systems that scale'. A deep dive into the mindset shift required for professional engineering.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Industrial Tech
    content: `
      <p>I used to think that finishing a tutorial meant I knew how to build a system. I was wrong. Open source didn't just teach me how to code; it destroyed my naive understanding of what it means to be an engineer.</p>
      
      <h3>The Tutorial Trap</h3>
      <p>Tutorials are designed to succeed. Real systems are designed to fail—and then recover. In my early days, I was obsessed with "getting it to work." But a brutal PR review on a validation bug changed everything. A senior maintainer didn't just ask for a fix; they asked about the architectural implications of my change.</p>
      
      <blockquote>"Your code works, but it's weak. It's not maintainable. Explain the tradeoffs you made here."</blockquote>
      
      <h3>The Shift: From Coder to Architect</h3>
      <p>That one comment shifted my entire trajectory. I realized that working code is the bare minimum. Engineering is about tradeoffs, contributor experience, and future-proofing. I had to learn the hard way that targeting the wrong branch or misunderstanding an established architecture isn't just a mistake—it's a lack of systemic awareness.</p>
      
      <p>I’ll probably write more about how different OSS organizations evaluate contributors and the specific mistakes I made during those early reviews, because each of those changed how I approach engineering.</p>
    `,
    isFeatured: true
  },
  {
    id: 'gsoc-selection-reality',
    title: "What Actually Matters in GSoC Selection",
    category: "Career",
    date: "May 2026",
    excerpt: "Beyond the proposal: How contribution quality, consistency, and communication culture are the real signals organizations look for.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop", // Clean Code
    content: `
      <p>Thousands of students crack GSoC every year, but very few understand the internal heuristics that lead to a selection. It's not just about a 20-page proposal; it's about the technical signal you send months before the deadline.</p>
      
      <h3>The Signal vs. The Noise</h3>
      <p>Most contributors focus on quantity. Real organizations focus on <strong>signal quality</strong>. Are your PRs documented? Do you handle edge cases? How do you respond when your code is torn apart in a review? That is where the selection happens.</p>
      
      <p>I'll be branching out into more tactical guides on proposal writing and how specific orgs like C2SI evaluate their contributors soon.</p>
    `
  },
  {
    id: 'hacktoberfest-to-gsoc',
    title: "From Hacktoberfest to GSoC in First Year",
    category: "Story",
    date: "May 2026",
    excerpt: "A personal narrative on starting early, managing college expectations, and building a technical identity from day one.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop", // Laptop Tech
    content: `<p>Coming soon: The narrative arc of my first year in college and how OSS became my primary education.</p>`
  },
  {
    id: 'pr-review-lessons',
    title: "What PR Reviews Taught Me About Software Engineering",
    category: "Technical",
    date: "May 2026",
    excerpt: "Code is read more than it is written. Learning the art of the review and why feedback loops are an engineer's greatest tool.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop", // Dark Code
    content: `<p>Coming soon: A deep dive into the feedback loops that define professional software development.</p>`
  },
  {
    id: 'working-code-isnt-enough',
    title: "Why Working Code Isn’t Enough",
    category: "Philosophy",
    date: "June 2026",
    excerpt: "Engineering is the art of tradeoffs. Exploring maintainability, architecture awareness, and why 'working' is just the starting point.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop", // Abstract Tech
    content: `<p>Coming soon: My strongest take on the transition into engineering maturity.</p>`
  }
];

export const categories = ["Architecture", "Technical", "Career", "Philosophy", "Story"];
