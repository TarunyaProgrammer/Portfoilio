import { motion } from "framer-motion";
import SystemCard from "../SystemCard/SystemCard";

const systems = [
  {
    id: 1,
    title: "RFP-ResponseBuilder",
    tagline: "AI-Powered Proposal Automation System",
    problem: "Businesses waste hours crafting RFP responses manually.",
    solution:
      "Contextual AI system that generates accurate professional proposals from unstructured RFP files.",
    impact: "Reduced proposal creation time from hours to minutes.",
    tech: ["React", "Node.js", "OpenAI API", "LangChain", "Tailwind"],
    features: [
      "Automated draft generation",
      "PDF & Word parsing",
      "Custom knowledge base",
      "Response refinement",
    ],
    link: "https://github.com/TarunyaProgrammer/RFP-ResponseBuilder",
    color: "#c8ff00", // Neon
  },
  {
    id: 2,
    title: "Streakly",
    tagline: "Gamified Habit & Streak Tracker",
    problem: "Users fail to maintain habits due to lack of motivation.",
    solution:
      "Visual streak-based habit tracking system with behavioral nudges.",
    impact: "Builds discipline through momentum psychology.",
    tech: ["JavaScript", "Firebase Auth", "Firestore", "LocalStorage"],
    features: [
      "Daily streaks",
      "Habit categorization",
      "Progress charts",
      "Smart reminders",
    ],
    link: "https://github.com/TarunyaProgrammer/Streakly-Habit-Discipline-System",
    color: "#ff5470", // Signal Pink
  },
  {
    id: 3,
    title: "Student Expense Tracker",
    tagline: "Offline-First Student Finance Manager",
    problem:
      "Students struggle tracking expenses in low-connectivity environments.",
    solution:
      "Privacy-first offline PWA + Chrome extension for expense logging.",
    impact: "Enables complete offline budgeting.",
    tech: ["Vanilla JS", "IndexedDB", "Firebase", "Tailwind"],
    features: [
      "Offline mode",
      "INR currency",
      "Budget alerts",
      "Browser persistence",
    ],
    link: "https://github.com/TarunyaProgrammer/Student-expense-tracker",
    color: "#7dd3fc", // SysBlue
  },
  {
    id: 4,
    title: "Ego",
    tagline: "Fintech Wallet Prototype",
    problem: "Beginners lack exposure to secure fintech workflows.",
    solution: "Wallet & transfer simulation platform.",
    impact: "Demonstrates transaction flows securely.",
    tech: ["HTML", "CSS", "JS", "Node", "Express", "MongoDB"],
    features: [
      "Wallet balance",
      "Transfers",
      "Transaction history",
      "Secure auth",
    ],
    link: "https://github.com/TarunyaProgrammer/Ego-MoneyTransfer",
    color: "#a374ff", // Purple
  },
  {
    id: 5,
    title: "TarGPT",
    tagline: "Custom GPT-Powered Assistant",
    problem: "Generic chatbots lack personalization.",
    solution: "Personalized AI chat interface with real-time model switching.",
    impact: "Enhanced conversational AI UX.",
    tech: ["React", "OpenAI API", "Vercel"],
    features: ["Real-time chat", "History persistence", "Multi-model support"],
    link: "https://github.com/TarunyaProgrammer/TarGPT",
    color: "#10b981", // Emerald
  },
  {
    id: 6,
    title: "NutriMinds — FoodLens",
    tagline: "AI-Driven Nutrition Scanner",
    problem: "Users don’t understand nutrition from food images.",
    solution: "Food recognition with nutrition extraction.",
    impact: "Encourages healthy food awareness.",
    tech: ["Python", "TensorFlow", "Flask", "React Native"],
    features: ["Image classification", "Nutrition logs", "Daily intake"],
    link: "https://github.com/TarunyaProgrammer/NutriMinds_FoodLens",
    color: "#f59e0b", // Amber
  },
  {
    id: 7,
    title: "MindBridge",
    tagline: "Mental Wellness Support Platform",
    problem: "Access to mental health resources is fragmented.",
    solution: "AI-assisted wellness platform.",
    impact: "Bridges mental health accessibility gaps.",
    tech: ["Next.js", "Clerk Auth", "Supabase", "Tailwind"],
    features: ["Mood tracking", "Resource library", "Secure chat"],
    link: "https://github.com/TarunyaProgrammer/MindBridge",
    color: "#3b82f6", // Blue
  },
  {
    id: 8,
    title: "Netflix Frontend Clone",
    tagline: "Pixel-Perfect Streaming UI",
    problem: "Learning UI precision requires real-world cloning.",
    solution: "Netflix-style frontend clone.",
    impact: "Demonstrates advanced UI skills.",
    tech: ["React", "TMDB API", "SCSS", "Tailwind"],
    features: ["Sliders", "Trailer embeds", "Responsive layout"],
    link: "https://github.com/TarunyaProgrammer/Netflix-Frontend-Clone",
    color: "#e50914", // Netflix Red
  },
  {
    id: 9,
    title: "Skycast Web",
    tagline: "Real-Time Weather Platform",
    problem: "Weather apps feel static.",
    solution: "Immersive weather UI with live background shifts.",
    impact: "Makes forecasting intuitive.",
    tech: ["JavaScript", "OpenWeatherMap API"],
    features: ["7-day forecast", "Auto-location", "Dynamic visuals"],
    link: "https://github.com/TarunyaProgrammer/skycast_web",
    color: "#0ea5e9", // Sky Blue
  },
  {
    id: 10,
    title: "Snake Game",
    tagline: "Modern Classic Arcade Game",
    problem: "Classic games feel outdated.",
    solution: "Modernized Snake with difficulty scaling.",
    impact: "Engaging gameplay experience.",
    tech: ["HTML5 Canvas", "Vanilla JS"],
    features: ["Scoreboard", "Increasing difficulty", "Touch controls"],
    link: "https://github.com/TarunyaProgrammer/Snake-Game",
    color: "#22c55e", // Green
  },
  {
    id: 11,
    title: "Responsive Edu Website",
    tagline: "Multi-Page Academic Template",
    problem: "Static education websites feel outdated.",
    solution: "Animated responsive academic template.",
    impact: "Enhances learning presentation.",
    tech: ["HTML", "CSS", "JS", "AOS"],
    features: ["Instructor sections", "Enrollment forms", "Smooth scroll"],
    link: "https://github.com/TarunyaProgrammer/Responsive-Education-Website",
    color: "#f43f5e", // Rose
  },
  {
    id: 12,
    title: "Devify",
    tagline: "Developer Utility Platform",
    problem: "Developers lack insight into their GitHub footprint.",
    solution: "GitHub analysis & personalization dashboard.",
    impact: "Improves developer productivity.",
    tech: ["React", "Node", "GitHub API"],
    features: ["Repo analysis", "Profile customization", "Resource sharing"],
    link: "https://github.com/TarunyaProgrammer/Devify",
    color: "#6366f1", // Indigo
  },
];

const SystemsGrid = () => {
  return (
    <section className="section-spacing bg-bg relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-24"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text mb-6">
              Core Systems
            </h2>
            <p className="text-gray-400 font-mono text-sm tracking-wide">
              / ARCHITECTURE / ENGINEERING / SCALE
            </p>
          </div>
          <a
            href="/systems"
            className="hidden md:block text-neon font-mono hover:underline decoration-neon underline-offset-4 text-sm"
          >
            VIEW ALL MODULES &rarr;
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system, index) => (
            <SystemCard key={system.id} system={system} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a
            href="/systems"
            className="text-neon font-mono hover:underline decoration-neon underline-offset-4"
          >
            View All Modules -&gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default SystemsGrid;
