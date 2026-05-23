import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Promo = () => {
  return (
    <section className="py-28 md:py-44 px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="container mx-auto bg-black p-24 md:p-48 text-center relative overflow-hidden"
      >
        {/* Background Graphic */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2540&auto=format&fit=crop" 
            alt="Infrastructure" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div className="relative z-10">
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.5em] mb-12">
            Limited Availability / Q2 2026
          </div>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-16 max-w-4xl mx-auto">
            Get a Strategic <br />
            System Architecture Review
          </h2>
          <Link to="/connect" className="inline-block">
            <motion.button
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="group relative px-12 py-6 bg-white overflow-hidden w-full h-full"
            >
              <motion.div
                variants={{
                  hover: { x: "0%" }
                }}
                initial={{ x: "-101%" }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0 bg-zinc-200"
              />
              <span className="relative z-10 text-black font-bold text-lg uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500">
                Request Consultation
              </span>
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Promo;
