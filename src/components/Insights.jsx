import { motion } from "framer-motion";

const Insights = () => {
  const articles = [
    {
      label: "RESEARCH",
      title: "The Future of Offline-First Infrastructure",
      date: "14 April 2026",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2540&auto=format&fit=crop"
    },
    {
      label: "SYSTEMS",
      title: "Building Privacy-First Communication Protocols",
      date: "10 April 2026",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
    },
    {
      label: "TRENDS",
      title: "Why Minimalist Code Wins in the Long Run",
      date: "02 April 2026",
      image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2564&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 md:py-36 bg-[#0d0d0f] text-white border-b border-white/10 font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20 space-y-2">
          <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.4em]">
            KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-pixelify">
            System Insights & <span className="text-[#00ff66]">Trends</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer border-2 border-white/20 bg-[#141417] p-6 rounded-none shadow-[4px_4px_0px_#fbd000] hover:border-white transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden rounded mb-6 bg-[#0d0d0f] border border-white/10">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="space-y-3 font-mono">
                <div className="flex gap-4 items-center">
                   <span className="px-2.5 py-0.5 bg-[#ff2a2a] text-white text-[9px] font-bold tracking-widest uppercase">
                      {article.label}
                   </span>
                   <span className="text-[10px] font-bold text-white/50">
                      {article.date}
                   </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff2a2a] transition-colors font-pixelify leading-snug">
                  {article.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
