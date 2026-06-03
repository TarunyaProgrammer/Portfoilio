import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const svgRef = useRef(null);
  const textRef = useRef(null);

  const fitWatermark = () => {
    if (!svgRef.current || !textRef.current) return;
    try {
      const bbox = textRef.current.getBBox();
      svgRef.current.setAttribute(
        "viewBox",
        `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
      );
    } catch (e) {}
  };

  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitWatermark);
    } else {
      window.addEventListener("load", fitWatermark);
    }
    window.addEventListener("resize", fitWatermark);
    setTimeout(fitWatermark, 100);
    return () => {
      window.removeEventListener("load", fitWatermark);
      window.removeEventListener("resize", fitWatermark);
    };
  }, []);

  return (
    <footer className="footer-section bg-white pt-24 pb-12 px-6 md:px-12 selection:bg-black selection:text-white overflow-hidden border-t border-black/5">

      <div className="footer-wrapper">
        {/* ═══ LEFT CARD ═══ */}
        <div className="footer-left group">
          <video 
            className="footer-left-video" 
            autoPlay muted loop playsInline preload="auto"
            crossOrigin="anonymous"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>
          
          <div className="footer-logo flex items-center gap-4 relative z-10">
            <span 
              style={{ fontFamily: "'Pinyon Script', cursive" }}
              className="text-4xl text-white lowercase leading-none"
            >
              Tarunya
            </span>
          </div>

          <div className="footer-tagline-container mt-auto mb-10 relative z-10">
            <p className="text-2xl font-bold text-white leading-tight tracking-tighter uppercase font-['Inter']">
              Smarter systems engineering, <br />
              <span className="opacity-30 italic font-normal">powered by intent.</span>
            </p>
          </div>

          <div className="footer-social-row flex justify-between items-center relative z-10">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Keep Connection.</span>
             <div className="flex gap-3">
                {[
                  { 
                    name: 'Github', 
                    url: 'https://github.com/TarunyaProgrammer',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'LinkedIn', 
                    url: 'https://www.linkedin.com/in/tarunyakesharwani',
                    icon: (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )
                  },
                  { 
                    name: 'X', 
                    url: 'https://x.com/TarunyaKesh',
                    icon: (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )
                  }
                ].map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-500" aria-label={s.name}>
                    {s.icon}
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* ═══ RIGHT CARD ═══ */}
        <div className="footer-right">
          {/* Floating System Badge */}
          <div className="absolute -top-10 right-6 sm:right-12 z-10 flex flex-col gap-3 items-end scale-90 sm:scale-100 origin-right">
             <div className="lucky-cube group">
                <span className="text-3xl font-black text-white tracking-tighter group-hover:italic transition-all">1.0</span>
             </div>
             <div className="flex gap-3 items-center rotate-[-2deg] bg-white border border-black/10 px-4 py-2 rounded-none shadow-xl">
                <span className="text-[10px] font-black text-black/40 uppercase tracking-widest">Architectural Index</span>
                <span className="w-1.5 h-1.5 rounded-none bg-green-500 animate-pulse"></span>
             </div>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-row gap-20 md:gap-32 pt-4">
             <div className="footer-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-8">Navigation</h4>
                <div className="flex flex-col gap-4">
                   <Link to="/systems" className="text-base font-bold text-black hover:italic transition-all">Projects</Link>
                   <Link to="/blogs" className="text-base font-bold text-black hover:italic transition-all">Blogs</Link>
                </div>
             </div>
             <div className="footer-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-8">Connect</h4>
                <div className="flex flex-col gap-4">
                   <a href="mailto:tarunyaprogrammer@gmail.com" className="text-base font-bold text-black hover:italic transition-all underline decoration-black/5 underline-offset-4">Email</a>
                   <a href="https://www.linkedin.com/in/tarunyakesharwani" target="_blank" rel="noreferrer" className="text-base font-bold text-black hover:italic transition-all">LinkedIn</a>
                   <a href="https://github.com/TarunyaProgrammer" target="_blank" rel="noreferrer" className="text-base font-bold text-black hover:italic transition-all">GitHub</a>
                </div>
             </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-20 gap-10">
             <div className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">
                &copy; 2026 Tarunya Systems &middot; v1.0.42
             </div>
              <div className="flex flex-col gap-6 w-full md:w-[350px]">
                 <h4 className="text-sm font-bold text-black/40 leading-relaxed uppercase tracking-widest">
                   Systems move fast.<br />
                   <span className="text-black text-xl font-black">Stay ahead with Tarunya.</span>
                 </h4>
                 <form 
                   onSubmit={(e) => { e.preventDefault(); alert("Subscription successful!"); }}
                   className="bg-white border border-black p-1 sm:p-2 flex flex-col sm:flex-row shadow-sm focus-within:ring-2 ring-black transition-all rounded-none w-full gap-2"
                 >
                    <input 
                     type="email" 
                     required
                     placeholder="Engineering updates..." 
                     className="flex-1 px-4 py-2 sm:py-3 bg-transparent border-none text-sm font-bold text-black placeholder-black/20 focus:outline-none w-full"
                    />
                    <button 
                      type="submit"
                      className="px-6 sm:px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-none hover:bg-black/80 transition-all w-full sm:w-auto shrink-0"
                    >
                      Subscribe
                    </button>
                 </form>
              </div>
          </div>
        </div>
      </div>

      {/* ═══ WATERMARK ═══ */}
      <div className="footer-watermark" aria-hidden="true">
        <svg ref={svgRef} id="watermarkSvg" width="100%" className="block overflow-visible">
          <text 
            ref={textRef} 
            id="watermarkText" 
            x="500" y="240" 
            textAnchor="middle" 
            fontSize="320"
            className="font-['Inter'] font-black tracking-tighter fill-black/[0.03] uppercase"
          >
            Tarunya
          </text>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
