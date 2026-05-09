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
    
    // Initial fit
    setTimeout(fitWatermark, 100);

    return () => {
      window.removeEventListener("load", fitWatermark);
      window.removeEventListener("resize", fitWatermark);
    };
  }, []);

  return (
    <footer className="footer-section bg-white pt-24 pb-12 px-6 md:px-12 selection:bg-black selection:text-white overflow-hidden">
      <style>{`
        .footer-wrapper {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 16px;
          align-items: stretch;
        }
        @media (max-width: 860px) {
          .footer-wrapper { grid-template-columns: 1fr; }
        }
        .footer-left {
          position: relative;
          min-height: 400px;
          border-radius: 28px;
          padding: 32px;
          overflow: hidden;
          background: #1e4fc0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 12px 40px rgba(21, 76, 189, 0.25);
        }
        .footer-left-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .footer-right {
          background: #f0f1f5;
          border-radius: 28px;
          padding: 40px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        @media (max-width: 560px) {
          .footer-right { padding: 24px; }
        }
        .lucky-cube {
          width: 96px;
          height: 96px;
          border-radius: 22px;
          background: linear-gradient(135deg, #5b9ffb 0%, #1e5dd7 55%, #1448be 100%);
          box-shadow: inset 3px 3px 8px rgba(255,255,255,0.35), inset -3px -3px 12px rgba(0,0,0,0.18), 8px 14px 28px rgba(20,72,200,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-10deg);
        }
        .footer-watermark {
          max-width: 1150px;
          margin: -60px auto 0;
          pointer-events: none;
          user-select: none;
          position: relative;
          z-index: 0;
          line-height: 0;
        }
      `}</style>

      <div className="footer-wrapper">
        {/* ═══ LEFT CARD ═══ */}
        <div className="footer-left">
          <video className="footer-left-video" autoPlay muted loop playsInline preload="auto">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>
          
          <div className="footer-logo flex items-center gap-2.5 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/15 border-[1.5px] border-white/85 flex items-center justify-center font-bold text-white text-base">
              T
            </div>
            <span className="text-[22px] font-bold text-white tracking-tighter font-['DM_Sans']">Tarunya</span>
          </div>

          <div className="footer-tagline-container mt-auto mb-7 relative z-10">
            <p className="text-[19px] text-white leading-[1.45] font-['DM_Sans']">
              Smarter systems engineering,<br />
              <span className="text-white/65">powered by intent.</span>
            </p>
          </div>

          <div className="footer-social-row flex justify-between items-center relative z-10">
             <span className="font-['Caveat'] text-[17px] font-semibold text-white/90 tracking-tight">Stay in touch!</span>
             <div className="flex gap-2">
                {[
                  { name: 'Github', url: 'https://github.com/TarunyaProgrammer' },
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/tarunyakesharwani' },
                  { name: 'Twitter', url: '#' }
                ].map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-[9px] bg-[#0e1014] flex items-center justify-center text-white hover:bg-black hover:-translate-y-0.5 transition-all shadow-lg text-[10px] font-bold uppercase tracking-tighter">
                    {s.name[0]}
                  </a>
                ))}
             </div>
          </div>
        </div>

        {/* ═══ RIGHT CARD ═══ */}
        <div className="footer-right">
          {/* Floating Lucky Badge */}
          <div className="absolute -top-9 right-10 z-10 flex flex-col gap-1.5 items-start">
             <div className="lucky-cube">
                <span className="text-[42px] font-bold text-white tracking-tighter rotate-[10deg] font-['DM_Sans']">T</span>
             </div>
             <div className="flex gap-1.5 items-center rotate-[-4deg] mt-1">
                <svg className="w-[22px] h-[22px] text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 20 C 6 14, 10 9, 18 5" />
                  <path d="M18 5 L 12 5" />
                  <path d="M18 5 L 18 11" />
                </svg>
                <span className="font-['Caveat'] text-[20px] font-semibold text-gray-400 whitespace-nowrap">Feeling lucky?</span>
             </div>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-row gap-16 md:gap-[72px] pt-2">
             <div className="footer-col">
                <h4 className="font-['Caveat'] text-2xl font-semibold italic text-gray-400 mb-[18px]">Navigation</h4>
                <div className="flex flex-col gap-3.5">
                   <Link to="/" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">About</Link>
                   <Link to="/systems" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">Portfolio</Link>
                   <Link to="/labs" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">Laboratory</Link>
                   <Link to="/blogs" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">Blogs</Link>
                   <Link to="/resume" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">Resume</Link>
                </div>
             </div>
             <div className="footer-col">
                <h4 className="font-['Caveat'] text-2xl font-semibold italic text-gray-400 mb-[18px]">Connect</h4>
                <div className="flex flex-col gap-3.5">
                   <a href="mailto:tarunyaprogrammer@gmail.com" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">Email</a>
                   <a href="#" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">LinkedIn</a>
                   <a href="#" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">GitHub</a>
                   <a href="#" className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors font-['DM_Sans']">Twitter</a>
                </div>
             </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-12 gap-8">
             <div className="text-[12.5px] font-medium text-gray-400 font-['DM_Sans']">
                © 2026 Tarunya. All rights reserved.
             </div>
             <div className="flex flex-col gap-3.5">
                <h4 className="text-[15px] text-gray-500 leading-[1.45] font-['DM_Sans']">
                  Systems move fast.<br />
                  <strong className="block text-[19px] font-bold text-gray-900">Stay ahead with Tarunya.</strong>
                </h4>
                <div className="w-[310px] bg-white border border-gray-200 rounded-xl p-1.5 flex shadow-sm">
                   <input 
                    type="email" 
                    placeholder="Enter email address" 
                    className="flex-1 px-3.5 py-2.5 bg-transparent border-none text-[13.5px] text-gray-900 placeholder-gray-400 focus:outline-none font-['DM_Sans']"
                   />
                   <button className="px-[22px] py-[11px] bg-[#111214] text-white text-[13.5px] font-semibold rounded-lg hover:bg-black shadow-lg transition-all">
                     Subscribe
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ═══ WATERMARK ═══ */}
      <div className="footer-watermark pointer-events-none select-none relative z-0 mt-[-60px]" aria-hidden="true">
        <svg ref={svgRef} id="watermarkSvg" width="100%" height="auto" className="block overflow-visible">
          <text 
            ref={textRef} 
            id="watermarkText" 
            x="500" y="240" 
            textAnchor="middle" 
            fontSize="320"
            className="font-['DM_Sans'] font-bold tracking-tighter fill-black/[0.04]"
          >
            Tarunya
          </text>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
