import { useMemo } from "react";

const LabBackground = ({ id }) => {
  const Pattern = useMemo(() => {
    switch (id) {
      case 1: // Smart Expense Categorization (Flow)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <path
              d="M0 80 C 30 80, 40 20, 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M0 90 C 40 90, 50 30, 100 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M0 70 C 20 70, 60 50, 100 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        );

      case 2: // Habit Consistency Analyzer (Pulse/Wave)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <polyline
              points="0,50 20,50 30,30 40,70 50,50 80,50 100,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <polyline
              points="0,60 15,60 25,60 35,60 100,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="2 2"
            />
          </svg>
        );

      case 3: // AI Note Summarization (Doc Stack)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
            <rect
              x="30"
              y="20"
              width="40"
              height="50"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <rect
              x="35"
              y="25"
              width="40"
              height="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="38"
              y1="35"
              x2="65"
              y2="35"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="38"
              y1="40"
              x2="60"
              y2="40"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        );

      case 4: // Resume Feedback Assistant (Grid Mesh)
        return (
          <div className="w-full h-full grid grid-cols-6 grid-rows-6 opacity-20">
            {Array.from({ length: 36 }).map((_, i) => (
              <div
                key={i}
                className="border-[0.5px] border-current opacity-20"
              ></div>
            ))}
          </div>
        );

      case 5: // Offline-First SaaS (Network Nodes)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <circle cx="20" cy="80" r="2" fill="currentColor" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
            <circle cx="80" cy="20" r="2" fill="currentColor" />
            <circle cx="80" cy="80" r="2" fill="currentColor" />
            <line
              x1="20"
              y1="80"
              x2="50"
              y2="50"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="50"
              x2="80"
              y2="20"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="50"
              x2="80"
              y2="80"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          </svg>
        );

      case 6: // AI RFP Quality Checker (Checklist)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
            <line
              x1="20"
              y1="30"
              x2="80"
              y2="30"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="15" cy="30" r="1" fill="currentColor" />
            <line
              x1="20"
              y1="45"
              x2="60"
              y2="45"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="15" cy="45" r="1" fill="currentColor" />
            <line
              x1="20"
              y1="60"
              x2="70"
              y2="60"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="15" cy="60" r="1" fill="currentColor" />
          </svg>
        );

      case 7: // Learning Path Recommender (Branching)
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <path
              d="M50 100 L 50 60 L 20 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M50 60 L 80 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="50" cy="60" r="1.5" fill="currentColor" />
            <circle cx="20" cy="30" r="1.5" fill="currentColor" />
            <circle cx="80" cy="30" r="1.5" fill="currentColor" />
          </svg>
        );

      case 8: // SaaS Feature Usage Heatmap (Gradients)
        return (
          <div className="w-full h-full relative opacity-20">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-current blur-2xl rounded-full opacity-40"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-current blur-xl rounded-full opacity-30"></div>
          </div>
        );

      default:
        return null;
    }
  }, [id]);

  return (
    <div
      className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-overlay text-white"
      aria-hidden="true"
    >
      {Pattern}
    </div>
  );
};

export default LabBackground;
