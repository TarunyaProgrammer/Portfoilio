import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Promo = () => {
  return (
    <section className="py-24 md:py-36 px-8 bg-[#0d0d0f] text-white border-b border-white/10 font-pixelify">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="container mx-auto bg-[#141417] border-4 border-white p-16 md:p-32 text-center relative overflow-hidden rounded-none shadow-[6px_6px_0px_#ff2a2a]"
      >
        {/* Background Graphic */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2540&auto=format&fit=crop" 
            alt="Infrastructure" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-[0.4em]">
            LIMITED AVAILABILITY / Q2 2026
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tight uppercase font-pixelify max-w-4xl mx-auto">
            Get a Strategic <br />
            <span className="text-[#0066ff]">System Architecture Review</span>
          </h2>
          <div className="pt-6">
            <Link to="/connect" className="inline-block font-mono">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-[#ff2a2a] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#0066ff] transition-all border border-white/20 shadow-lg"
              >
                Request Consultation ↗
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Promo;
