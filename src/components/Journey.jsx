import { motion } from "framer-motion";

const Journey = () => {
  const experiences = [
    {
      year: "2026",
      title: "Open Source Ecosystems",
      role: "Contributor",
      period: "Present Day",
      description:
        "Contributing to Jaeger, Meshery, C2SI, and JSON Schema across 25+ repositories.",
    },
    {
      year: "2025",
      title: "Echo: Real-Time Systems",
      role: "Lead Architect",
      period: "MERN Stack",
      description:
        "Deployed real-time production messaging with instant delivery and secure sessions.",
    },
    {
      year: "2024",
      title: "Offline-First Protocols",
      role: "Core Developer",
      period: "PWA Focus",
      description:
        "Architected local-first PWA applications prioritizing offline reliability.",
    },
    {
      year: "2023",
      title: "Logical Foundations",
      role: "Full-Stack Learner",
      period: "Initial Phase",
      description:
        "Mastered the MERN ecosystem and core high-performance system principles.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0a0a0d] text-white border-b border-white/10 font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Centered Short Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <span className="text-[10px] font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.5em]">
            CHRONOLOGY
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase font-pixelify">
            Timeline.
          </h2>
        </motion.div>

        {/* Centered Compact Timeline */}
        <div className="relative border-l-2 border-white/20 mx-auto max-w-2xl pl-8 md:pl-12 space-y-12">
          {/* Animated Spine */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute -left-[2px] top-0 w-[2px] bg-[#ff2a2a] origin-top z-10"
          />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.year}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group space-y-2"
            >
              {/* Dot Marker */}
              <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-4 h-4 bg-[#12131a] border-2 border-[#ff2a2a] rounded-full z-20 group-hover:bg-[#ff2a2a] transition-colors" />

              {/* Year & Period Header */}
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white group-hover:text-[#fbd000] transition-colors">
                  {exp.year}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#00ff66] uppercase tracking-widest bg-[#12131a] px-2 py-0.5 border border-white/10">
                  {exp.period}
                </span>
              </div>

              {/* Title & Role */}
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:italic transition-all inline-block mr-2 font-pixelify">
                  {exp.title}
                </h3>
                <span className="text-xs font-mono text-white/50 font-semibold uppercase">
                  • {exp.role}
                </span>
              </div>

              {/* Concise Description */}
              <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
