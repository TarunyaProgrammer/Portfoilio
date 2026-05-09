export const blogPosts = [
  {
    id: 'tutorial-to-engineering',
    title: "How Open Source Destroyed My Tutorial-Driven Thinking",
    category: "Architecture",
    date: "May 2026",
    excerpt: "The brutal reality of moving from 'code that works' to 'systems that scale'. A deep dive into the mindset shift required for professional engineering.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Industrial Tech
    content: `
      <p>For a long time, I thought I was learning software engineering. I was building projects, watching tutorials, learning frameworks, and making things work locally. Honestly, that felt like progress. If the feature worked, I considered it good code.</p>
      
      <p>That belief survived until I started contributing to open source. That was the first time my code was no longer just <em>my code</em>. Other developers had to review it, understand it, maintain it, and extend it. Suddenly, “it works” stopped being enough.</p>

      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" alt="Workspace" style="width:100%; height:400px; object-fit:cover; margin:40px 0; border:1px solid rgba(255,255,255,0.05);" />

      <h3>The Illusion of Competence</h3>
      <p style="margin-bottom: 60px;">Most of my learning came from tutorials. Tutorials are useful for getting started, but they create a dangerous illusion of competence. They optimize for momentum and happy paths. Real engineering does not. Real engineering is messy. You inherit decisions, work with constraints, and design for future contributors. Tutorials rarely teach that.</p>

      <h3>The "Working Code" Fallacy</h3>
      <p>The first major shock was realizing that nobody cared that my feature “worked.” The reviews were about things I barely thought about before: validation, naming consistency, architecture, scalability, and maintainability. Working code can still be bad engineering.</p>
      
      <div style="margin: 40px 0; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255,255,255,0.1);">
              <th style="padding: 12px; font-weight: 900; text-transform: uppercase;">Coding</th>
              <th style="padding: 12px; font-weight: 900; text-transform: uppercase;">Engineering</th>
            </tr>
          </thead>
          <tbody style="font-weight: 500;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 12px;">Makes the feature work</td>
              <td style="padding: 12px;">Makes the system sustainable</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 12px;">Focuses on now</td>
              <td style="padding: 12px;">Considers future contributors</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 12px;">Optimizes for speed</td>
              <td style="padding: 12px;">Balances speed with maintainability</td>
            </tr>
            <tr>
              <td style="padding: 12px;">Solves happy paths</td>
              <td style="padding: 12px;">Handles edge cases</td>
            </tr>
          </tbody>
        </table>
      </div>

      <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" alt="Code Review" style="width:100%; height:400px; object-fit:cover; margin:40px 0; border:1px solid rgba(255,255,255,0.05);" />

      <h3>The Mindset Shift</h3>
      <p>I stopped treating code as something written only for the machine. I started treating it as communication for other developers. Before implementing anything, I now spend more time asking: <em>“Will this still make sense six months later?”</em></p>

      <p>I’ve shared more detailed parts of this technical transition on <a href="https://medium.com/@tarunyakesh" target="_blank" style="font-weight:bold;">Medium</a> and <a href="https://dev.to/tarunya" target="_blank" style="font-weight:bold;">Dev.to</a>. For more real-time discussions on engineering tradeoffs, you can find me on <a href="https://x.com/TarunyaKesh" target="_blank" style="font-weight:bold;">X</a> or connect on <a href="https://www.linkedin.com/in/tarunyakesharwani/" target="_blank" style="font-weight:bold;">LinkedIn</a>.</p>

      <p>The biggest change wasn’t my resume—it was my standards.</p>
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
