import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const years = [
  {
    year: "2026",
    title: "Open Source & AI Systems",
    desc: "Building AI automation tools and preparing for GSoC.",
  },
  {
    year: "2025",
    title: "React, PWAs & Privacy-first Products",
    desc: "Built Budgettt and PaperLess systems.",
  },
  {
    year: "2024",
    title: "Frontend Foundations",
    desc: "Learned HTML, CSS, JS, transitioned to React.",
  },
  {
    year: "2023",
    title: "First Code",
    desc: "Wrote my first Hello World program.",
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="section-spacing bg-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 md:gap-32">
        <div className="md:w-1/3 text-left hidden md:block">
          <h2 className="text-4xl font-heading font-bold text-text sticky top-32">
            Career
            <br />
            Timeline
          </h2>
        </div>

        <div className="md:w-2/3 relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon/50 to-transparent"
          />

          <div className="space-y-32">
            {years.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        whileInView={{
          scale: [1, 1.5, 1],
          boxShadow: [
            "0 0 0px rgba(200,255,0,0)",
            "0 0 20px rgba(200,255,0,0.5)",
            "0 0 0px rgba(200,255,0,0)",
          ],
        }}
        transition={{ duration: 1, repeat: 0 }}
        className="absolute left-[-37px] md:left-[-41px] top-2 w-4 h-4 rounded-full bg-bg border-2 border-neon"
      />
      <h3 className="text-5xl font-mono font-bold text-gray-700 mb-2 hover:text-neon transition-colors duration-300 cursor-default">
        {item.year}
      </h3>
      <h4 className="text-xl font-heading font-bold text-text">{item.title}</h4>
      <p className="text-gray-400 mt-2">{item.desc}</p>
    </motion.div>
  );
};

export default Timeline;
