import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-32 md:py-48 bg-white relative z-10 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-black mb-12">
              About Me
            </h2>
            <div className="space-y-8 max-w-xl about-text">
              <p className="text-lg md:text-xl text-black/20 leading-relaxed font-medium transition-colors duration-700">
                I work across the full MERN stack (React, Node/Express, WebSockets), focusing on real-world constraints—like offline usage, imperfect data, and evolving requirements.
              </p>
              <p className="text-lg md:text-xl text-black/20 leading-relaxed font-medium transition-colors duration-700">
                Currently going deeper on PWAs, frontend systems design, and cloud-native open source. I value clarity over cleverness and care about writing code that is safe to change tomorrow.
              </p>
              
              <div className="flex gap-8 pt-8">
                <a 
                  href="https://github.com/tarunyaio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-black/5 hover:border-black pb-1 transition-all"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/tarunyakesharwani" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-bold uppercase tracking-[0.3em] border-b-2 border-black/5 hover:border-black pb-1 transition-all"
                >
                  LinkedIn
                </a>
              </div>
            </div>
            
            <div className="mt-24">
              <img 
                src="/system-detail.png" 
                alt="Architecture Detail" 
                className="w-48 h-64 object-cover grayscale border border-black/5"
              />
            </div>
          </motion.div>

          {/* Right Column: Metric & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-black/10 p-12 flex flex-col justify-center items-center shadow-sm group relative"
            >
               <div className="w-12 h-12 bg-black/5 rounded-full mb-8 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <span className="text-xs font-bold">★</span>
               </div>
               <div className="text-7xl font-bold text-black mb-2 flex">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >120</motion.span>
                  <span>%</span>
               </div>
               <div className="text-[10px] font-bold tracking-widest text-black/30 uppercase text-center group-hover:text-black transition-colors">
                  Operational <br /> Excellence
               </div>
               {/* Technical corner marks */}
               <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-black/10" />
               <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-black/10" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative aspect-[3/4] grayscale group overflow-hidden"
            >
               <img 
                src="/webme2.png" 
                alt="Portrait Detail" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
               />
               <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <motion.div 
                 whileHover={{ x: 5, y: -5 }}
                 className="absolute -bottom-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl cursor-pointer z-10 shadow-xl"
               >
                 →
               </motion.div>
            </motion.div>

            <div className="md:col-span-2 mt-12 space-y-8 border-t border-black/5 pt-12">
               <div className="flex items-start gap-6">
                  <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
                  <p className="text-sm font-bold text-black/60 leading-relaxed">
                    Focused on the intersection of human-centric design and industrial-grade stability.
                  </p>
               </div>
               <div className="flex items-start gap-6">
                  <div className="w-2 h-2 rounded-full bg-black mt-2"></div>
                  <p className="text-sm font-bold text-black/60 leading-relaxed">
                    Engineering tools for the next decade of digital evolution.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
