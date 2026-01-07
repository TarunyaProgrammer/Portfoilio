import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const years = [
  {
    year: "2026",
    title: "Senior Engineer, Google",
    desc: "Leading agentic coding initiatives.",
  },
  {
    year: "2024",
    title: "Full Stack Arch, Startup",
    desc: "Scaled from 0 to 1M users.",
  },
  {
    year: "2023",
    title: "Research Lab, MIT",
    desc: "Distributed systems performance analysis.",
  },
  { year: "2021", title: "Hello World", desc: "First commit." },
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
      className="py-32 bg-bg relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3 text-right hidden md:block">
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
            className="absolute left-0 md:left-[-1px] top-0 bottom-0 w-[2px] bg-neon/30"
          />

          <div className="space-y-24">
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
