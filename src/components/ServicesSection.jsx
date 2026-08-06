import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { engageOptions } from "../data/engage";
import { audioSynth } from "../utils/audioSynth";

const ServicesSection = () => {
  return (
    <section className="py-24 md:py-36 bg-[#141417] text-white border-b border-white/10 font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.4em] mb-4">
              ENGAGEMENT MODELS
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight uppercase font-pixelify">
              Surgical <br />
              <span className="font-normal italic text-[#00e5ff]">Solutions.</span>
            </h2>
          </div>
          <Link 
            to="/connect"
            onClick={() => audioSynth.playCoinSound()}
            className="text-xs font-mono font-bold bg-[#ff2a2a] text-white px-6 py-3.5 border border-white/30 hover:bg-[#00e5ff] hover:text-black transition-all shadow-[3px_3px_0px_#000] uppercase tracking-wider"
          >
            Inquiry Protocol &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {engageOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group p-6 sm:p-8 border-2 border-white/20 bg-[#0d0d0f] hover:border-[#ff2a2a] shadow-[4px_4px_0px_#000] hover:shadow-[4px_4px_0px_#ff2a2a] transition-all duration-300 relative flex flex-col justify-between rounded-none"
            >
              {/* Technical Corner Accents */}
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/30 group-hover:border-[#ff2a2a] transition-colors" />
              
              <div>
                <div className="text-xs font-mono font-bold text-[#00ff66] uppercase tracking-[0.3em] mb-4">
                  0{index + 1} // {option.id}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-[#ff2a2a] transition-colors font-pixelify">
                  {option.title}
                </h3>
                <p className="text-xs font-sans text-white/80 leading-relaxed mb-6">
                  {option.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex justify-between items-center font-mono">
                <span className="text-[10px] font-bold text-[#fbd000] uppercase tracking-widest">
                  {option.outcome.split('.')[0]}
                </span>
                <Link 
                  to="/connect"
                  onClick={() => audioSynth.playClickSound()}
                  className="w-8 h-8 bg-[#141417] border border-white/20 flex items-center justify-center text-white group-hover:bg-[#ff2a2a] group-hover:border-white transition-all text-xs font-bold"
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
