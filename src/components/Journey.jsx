import { motion } from "framer-motion";

const Journey = () => {
  const experiences = [
    {
      year: "2026",
      title: "Open Source Ecosystems",
      role: "Contributor",
      period: "Present Day",
      description:
        "Actively contributing to Jaeger, Meshery, C2SI, and JSON Schema. Spanning 25+ repositories across frontend and systems logic.",
    },
    {
      year: "2025",
      title: "Echo: Real-Time Systems",
      role: "Lead Architect",
      period: "MERN Stack",
      description:
        "Built a production-deployed chat app focusing on instant delivery, live presence, and secure session management.",
    },
    {
      year: "2024",
      title: "Offline-First Protocols",
      role: "Core Developer",
      period: "PWA Focus",
      description:
        "Developing robust systems like the Student Expense Tracker and Streakly, prioritizing local-first data and PWA stability.",
    },
    {
      year: "2023",
      title: "Logical Foundations",
      role: "Full-Stack Learner",
      period: "Initial Phase",
      description:
        "Establishing the core logical foundation for high-performance systems and mastering the MERN ecosystem.",
    },
  ];

  return (
    <section className="py-36 md:py-52 bg-white border-t border-black/5">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-12">
              Growth Chronology
            </div>
             <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-black tracking-tighter mb-16 leading-[0.85]">
              Architectural <br />
              <span className="italic font-normal opacity-20">Timeline.</span>
            </h2>
            <p className="text-xl text-black/60 font-medium max-w-md leading-relaxed">
              A precise record of systems built, languages mastered, and the
              evolution of a digital philosophy.
            </p>
          </motion.div>

          {/* Right Column: Timeline */}
          <div className="relative border-l border-black/5 pl-8 md:pl-16 space-y-24">
            {/* Animated Progress Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute left-0 top-0 w-[1px] bg-black origin-top z-10"
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Year Marker */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="absolute -left-[36px] md:-left-[68px] top-0 w-4 h-4 bg-white border-2 border-black rounded-full z-20 group-hover:bg-black transition-colors"
                />

                <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em] mb-4">
                  {exp.year} // {exp.period}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black group-hover:italic transition-all tracking-tight mb-2">
                  {exp.title}
                </h3>
                <div className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-6">
                  {exp.role}
                </div>
                <p className="text-lg text-black/60 font-medium leading-relaxed max-w-xl">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
