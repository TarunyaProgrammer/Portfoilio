import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { audioSynth } from "../utils/audioSynth";

const CTA = () => {
  return (
    <section className="py-24 md:py-36 bg-[#0d0d0f] text-white text-center border-t border-white/10 font-pixelify selection:bg-[#ff2a2a] selection:text-white">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.5em] mb-8">
            FINAL INQUIRY // PROTOCOL
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tight mb-16 max-w-6xl mx-auto leading-[0.85] font-pixelify uppercase">
            READY TO <br />
            BUILD <span className="italic font-normal text-[#00ff66]">NEXT?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 font-mono text-sm">
            <Link 
              to="/connect"
              onClick={() => audioSynth.playCoinSound()}
              className="inline-block px-10 py-5 bg-[#ff2a2a] text-white font-pixel text-xs uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black transition-all border-2 border-white shadow-[4px_4px_0px_#fff]"
            >
              INITIALIZE PROJECT ➔
            </Link>
            <a 
              href="mailto:tarunyak.10@gmail.com"
              onClick={() => audioSynth.playClickSound()}
              className="text-white/70 hover:text-[#fbd000] border-b-2 border-white/20 pb-1 hover:border-[#fbd000] transition-all font-bold"
            >
              tarunyak.10@gmail.com ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
