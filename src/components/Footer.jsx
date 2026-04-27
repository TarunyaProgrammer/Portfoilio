import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-32 md:py-48 border-t border-black/5">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-24">
          <div className="space-y-16">
            <div className="flex flex-col group">
              <span 
                style={{ fontFamily: "'Pinyon Script', cursive" }}
                className="text-5xl text-black group-hover:italic transition-all duration-500 lowercase leading-none"
              >
                Tarunya
              </span>
              <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em] mt-1">
                Systems Architect
              </span>
            </div>

            <nav className="flex flex-wrap gap-x-12 gap-y-6 text-[11px] font-bold uppercase tracking-[0.3em] text-black/40">
               <Link to="/" className="hover:text-black transition-colors">About</Link>
               <Link to="/systems" className="hover:text-black transition-colors">Portfolio</Link>
               <Link to="/labs" className="hover:text-black transition-colors">Laboratory</Link>
               <Link to="/open-source" className="hover:text-black transition-colors">OSS</Link>
            </nav>

            <div className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em]">
               &copy; 2026 Architectural Inquiry &middot; All Rights Reserved
            </div>
          </div>

          <div className="text-left md:text-right w-full md:w-auto">
             <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-6">
                Connect Directly
             </div>
             <a 
              href="mailto:tarunyaprogrammer@gmail.com" 
              className="text-3xl md:text-6xl font-bold tracking-tighter hover:italic transition-all block mb-8"
             >
                tarunyaprogrammer@gmail.com
             </a>
             <div className="flex justify-start md:justify-end gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
                <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-black transition-colors">GitHub</a>
                <a href="#" className="hover:text-black transition-colors">Twitter</a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
