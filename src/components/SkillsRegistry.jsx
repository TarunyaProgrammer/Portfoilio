import { motion } from "framer-motion";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "Redux", "Zustand", "Tailwind", "PWAs"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "Socket.io", "REST APIs", "JWT"] },
  { category: "Tooling", items: ["Vite", "Vercel", "Netlify", "Firebase", "Git", "Figma"] },
  { category: "Real-time", items: ["WebSockets", "Live Presence", "Secure Sessions", "Instant Delivery"] },
  { category: "Languages", items: ["JavaScript", "TypeScript", "HTML5", "CSS3"] },
  { category: "Core", items: ["Offline-first", "Local-first", "Scalable", "Production-ready"] },
];

const SkillsArchive = () => {
  return (
    <section className="py-32 md:py-48 bg-white border-t border-black/5">
      <div className="container mx-auto px-8 md:px-16">
        <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-12">
          Technical Inventory
        </div>
        <h2 className="text-5xl md:text-8xl font-bold text-black tracking-tighter mb-32 leading-[0.85]">
          Language & <br />
          <span className="italic font-normal opacity-20">Protocols.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group space-y-8 relative"
            >
              <div className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em] border-b border-black/5 pb-4 flex justify-between items-center group-hover:text-black group-hover:border-black transition-all duration-500">
                {skill.category}
                <motion.span 
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-black rounded-full"
                />
              </div>
              <ul className="space-y-4">
                {skill.items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="text-lg font-bold text-black/60 hover:text-black hover:pl-2 transition-all cursor-default border-l-2 border-transparent hover:border-black/10"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              {/* Technical Grid Overlay */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-black/0 group-hover:border-black/10 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsArchive;
