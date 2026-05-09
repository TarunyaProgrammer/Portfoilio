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
      <style>{`
        .footer-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .footer-wrapper { grid-template-columns: 1fr; }
        }
        .footer-left {
          position: relative;
          min-height: 450px;
          border-radius: 40px;
          padding: 40px;
          overflow: hidden;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .footer-left-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
          opacity: 0.5;
          filter: grayscale(1);
        }
        .footer-right {
          background: #F8F9FA;
          border: 1px solid rgba(0,0,0,0.03);
          border-radius: 40px;
          padding: 48px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (max-width: 560px) {
          .footer-right { padding: 32px; }
        }
        .lucky-cube {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-10deg);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .footer-watermark {
          max-width: 1200px;
          margin: -40px auto 0;
          pointer-events: none;
          user-select: none;
          position: relative;
          z-index: 0;
          line-height: 0;
        }
      `}</style>

      <div className="footer-wrapper">
        {/* ═══ LEFT CARD ═══ */}
        <div className="footer-left group">
          <video className="footer-left-video" autoPlay muted loop playsInline preload="auto">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>
          
          <div className="footer-logo flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-lg backdrop-blur-md">
              T
            </div>
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
                  { name: 'Github', url: 'https://github.com/TarunyaProgrammer' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tarunyakesharwani' },
                  { name: 'X', url: '#' }
                ].map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 text-[10px] font-black">
                    {s.name[0]}
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* ═══ RIGHT CARD ═══ */}
        <div className="footer-right">
          {/* Floating System Badge */}
          <div className="absolute -top-10 right-12 z-10 flex flex-col gap-3 items-end">
             <div className="lucky-cube group">
                <span className="text-3xl font-black text-white tracking-tighter group-hover:italic transition-all">1.0</span>
             </div>
             <div className="flex gap-3 items-center rotate-[-2deg] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-black/5 shadow-sm">
                <span className="text-[10px] font-black text-black/40 uppercase tracking-widest">Architectural Index</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
             </div>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-row gap-20 md:gap-32 pt-4">
             <div className="footer-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-8">Navigation</h4>
                <div className="flex flex-col gap-4">
                   <Link to="/" className="text-base font-bold text-black hover:italic transition-all">About</Link>
                   <Link to="/systems" className="text-base font-bold text-black hover:italic transition-all">Portfolio</Link>
                   <Link to="/labs" className="text-base font-bold text-black hover:italic transition-all">Laboratory</Link>
                   <Link to="/blogs" className="text-base font-bold text-black hover:italic transition-all">Blogs</Link>
                </div>
             </div>
             <div className="footer-col">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-8">Connect</h4>
                <div className="flex flex-col gap-4">
                   <a href="mailto:tarunyaprogrammer@gmail.com" className="text-base font-bold text-black hover:italic transition-all underline decoration-black/5 underline-offset-4">Email</a>
                   <a href="#" className="text-base font-bold text-black hover:italic transition-all">LinkedIn</a>
                   <a href="#" className="text-base font-bold text-black hover:italic transition-all">GitHub</a>
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
                <div className="bg-white border border-black/5 rounded-2xl p-2 flex shadow-sm focus-within:border-black transition-colors">
                   <input 
                    type="email" 
                    placeholder="Engineering updates..." 
                    className="flex-1 px-4 py-3 bg-transparent border-none text-sm font-bold text-black placeholder-black/20 focus:outline-none"
                   />
                   <button className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black/80 transition-all">
                     Subscribe
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ═══ WATERMARK ═══ */}
      <div className="footer-watermark" aria-hidden="true">
        <svg ref={svgRef} id="watermarkSvg" width="100%" height="auto" className="block overflow-visible">
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
