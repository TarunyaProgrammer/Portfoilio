import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-64 md:py-96 bg-white text-center border-t border-black/5">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em] mb-12">
            Final Inquiry
          </div>
          <h2 className="text-6xl md:text-9xl lg:text-[14rem] font-bold text-black tracking-tighter mb-24 max-w-6xl mx-auto leading-[0.8]">
            READY TO <br />
            BUILD <span className="italic font-normal opacity-20">NEXT?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <Link 
              to="/connect"
              className="text-2xl font-bold border-b-2 border-black pb-2 hover:pb-6 transition-all"
            >
              Initialize Project →
            </Link>
            <a 
              href="mailto:tarunyak.10@gmail.com"
              className="text-2xl font-bold text-black/30 hover:text-black transition-all"
            >
              tarunyak.10@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
