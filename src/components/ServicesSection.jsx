import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { engageOptions } from "../data/engage";

const ServicesSection = () => {
  return (
    <section className="py-36 md:py-52 bg-white border-t border-black/5">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="max-w-2xl">
            <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-12">
              Engagement Models
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-black tracking-tighter leading-[0.85]">
              Surgical <br />
              <span className="italic font-normal opacity-20">Solutions.</span>
            </h2>
          </div>
          <Link 
            to="/connect"
            className="text-sm font-bold border-b-2 border-black pb-2 hover:pb-6 transition-all"
          >
            Inquiry Protocol &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {engageOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group p-6 sm:p-8 md:p-12 border border-black/5 bg-white hover:border-black transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.1)] relative"
            >
              {/* Architectural Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-black/0 group-hover:border-black/20 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-black/0 group-hover:border-black/20 transition-all duration-500" />
              
              <div className="text-[10px] font-bold text-black/20 uppercase tracking-[0.4em] mb-6 md:mb-8 group-hover:text-black transition-colors">
                0{index + 1} // {option.id}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4 md:mb-6 group-hover:italic transition-all">
                {option.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black/60 font-medium leading-relaxed mb-8 md:mb-12">
                {option.description}
              </p>
              
              <div className="pt-8 border-t border-black/5 flex justify-between items-center group-hover:border-black/20 transition-colors">
                <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest italic group-hover:text-black/60">
                  {option.outcome.split('.')[0]}
                </span>
                <Link 
                  to="/connect" 
                  className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 transform group-hover:rotate-45"
                >
                  &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
