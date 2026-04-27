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
      className="py-32 md:py-48 bg-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-8 relative z-10 flex flex-col md:flex-row gap-24">
        <div className="md:w-1/3 text-left">
          <h2 className="text-5xl md:text-7xl font-heading font-black text-text sticky top-32 leading-none">
            The <br />
            <span className="italic font-normal text-accent">Journey</span>
          </h2>
        </div>

        <div className="md:w-2/3 relative pl-8 md:pl-0">
          {/* Vertical Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-[-1px] top-0 bottom-0 w-[1px] bg-black/10"
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
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative"
    >
      <div
        className="absolute left-[-36px] md:left-[-5px] top-4 w-2 h-2 rounded-full bg-accent"
      />
      <h3 className="text-5xl md:text-7xl font-heading font-normal italic text-text/10 mb-4 hover:text-text/20 transition-colors duration-500 select-none">
        {item.year}
      </h3>
      <h4 className="text-2xl font-heading font-black text-text mb-2">{item.title}</h4>
      <p className="text-text/60 font-body text-lg max-w-lg leading-relaxed">{item.desc}</p>
    </motion.div>
  );
};

export default Timeline;
