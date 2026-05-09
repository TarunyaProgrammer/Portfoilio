import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { blogPosts } from "../data/blogData";
import React, { useRef } from "react";

const ThinkingArticle = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollWidth = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  useDocumentSEO({
    title: `${post.title} — Tarunya Systems Archive`,
    description: post.excerpt,
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0F0F0F] text-white/90 selection:bg-white selection:text-black font-sans overflow-x-hidden">
      {/* Top Progress Scanner */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/20 z-[100]"
      >
        <motion.div 
          className="h-full bg-white origin-left"
          style={{ scaleX: scrollWidth }}
        />
      </motion.div>

      {/* Global Architectural HUD */}
      <div className="fixed inset-0 pointer-events-none z-50 border-[24px] border-black/20 md:border-[48px]">
        {/* Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />
        
        {/* Metadata HUD */}
        <div className="absolute top-12 left-12 flex flex-col gap-1 pointer-events-auto">
          <Link to="/blogs" className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors">
            &larr; Return to Core
          </Link>
        </div>
        
        <div className="absolute bottom-12 left-12 hidden md:block">
          <div className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 flex flex-col gap-2">
            <span>Archive ID: {post.id}</span>
            <span>Security: LVL_04</span>
          </div>
        </div>

        <div className="absolute top-1/2 right-4 -translate-y-1/2 rotate-180 [writing-mode:vertical-lr] hidden md:block">
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/10 whitespace-nowrap">
            Systems Architecture & Engineering Log // 2026 Archive
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="relative z-10 pt-[30vh] pb-[20vh] px-8 md:px-24">
        
        {/* Immersive Entry Header */}
        <header className="max-w-7xl mx-auto mb-[20vh]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="flex items-center gap-6 mb-12">
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">{post.category}</span>
                   <div className="w-12 h-[1px] bg-white/10"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">{post.date}</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                  {post.title.split(" ").map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "italic font-light opacity-20" : ""}>
                      {word}{" "}
                    </span>
                  ))}
                </h1>
              </motion.div>
            </div>
            <div className="lg:col-span-4 lg:pb-12">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-xl md:text-2xl text-white/30 font-medium leading-tight italic max-w-sm"
              >
                {post.excerpt}
              </motion.p>
            </div>
          </div>
        </header>

        {/* Narrative Core with Marginalia */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 relative">
          
          {/* Right Marginalia (Floating Metadata) */}
          <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-48 h-fit order-last">
             <div className="flex flex-col gap-16">
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-6 underline decoration-white/10">Key Differentiator</h4>
                  <p className="text-[11px] font-bold leading-relaxed text-white/40">
                    Articulating engineering maturity transitions clearly. Focus on validation, maintainability, and architecture awareness.
                  </p>
                </div>
                <div className="p-6 border border-white/5 bg-white/[0.02]">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-4">Verification</h4>
                  <div className="text-[10px] font-black text-white/40 uppercase">Status: Deployed</div>
                  <div className="text-[10px] font-black text-white/40 uppercase">Env: Production</div>
                </div>
             </div>
          </div>

          {/* Center Column: The Content */}
          <div className="lg:col-span-8 lg:col-start-3 prose prose-invert prose-2xl max-w-none
            prose-p:text-white/60 prose-p:font-medium prose-p:leading-[1.6] prose-p:mb-16
            prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:mt-32
            prose-blockquote:border-white/10 prose-blockquote:bg-white/[0.02] prose-blockquote:p-12 prose-blockquote:text-3xl prose-blockquote:italic prose-blockquote:font-light prose-blockquote:tracking-tighter prose-blockquote:my-24
            prose-img:w-[120%] prose-img:ml-[-10%] prose-img:border prose-img:border-white/10 prose-img:grayscale prose-img:hover:grayscale-0 transition-all duration-1000
            prose-table:text-sm prose-table:border prose-table:border-white/5
            prose-a:text-white prose-a:underline prose-a:decoration-white/20 hover:prose-a:decoration-white transition-all
          ">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* The "Further Logic" Fix - Minimalist Terminal Style */}
            <section className="mt-[20vh] pt-24 border-t border-white/5">
              <div className="flex items-center gap-6 mb-16">
                 <span className="w-2 h-2 bg-white/20 animate-pulse"></span>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">Next Operational Modules</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                {blogPosts.filter(p => p.id !== slug).slice(0, 2).map((other) => (
                  <Link 
                    key={other.id} 
                    to={`/thinking/${other.id}`}
                    className="group bg-[#0F0F0F] p-12 hover:bg-white transition-all duration-700"
                  >
                    <div className="flex justify-between items-start mb-12">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/20 group-hover:text-black/40 transition-colors">
                        Sequence // {other.id}
                      </span>
                      <span className="text-[8px] font-black text-white/20 group-hover:text-black/40 transition-colors">2026_LOG</span>
                    </div>
                    <h5 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-black transition-colors leading-none">
                      {other.title}
                    </h5>
                    <div className="mt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                       <div className="w-8 h-[1px] bg-black"></div>
                       <span className="text-[9px] font-black text-black uppercase tracking-widest">Execute Read</span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Subtle Series Insight */}
              <div className="mt-24 max-w-2xl">
                 <p className="text-sm font-medium text-white/20 italic leading-relaxed">
                   The narrative doesn’t end here. I’m currently documenting the evaluation heuristics of OSS organizations 
                   and the architectural tradeoffs of pre-GSoC contributions. Each entry is a layer in the engineering stack.
                 </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Narrative Signature */}
      <footer className="py-48 px-8 md:px-24 border-t border-white/5 text-center">
         <motion.div
           whileHover={{ scale: 1.05 }}
           className="inline-block cursor-none"
         >
           <span 
             style={{ fontFamily: "'Pinyon Script', cursive" }}
             className="text-7xl text-white/20 block mb-4"
           >
             Tarunya
           </span>
           <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
             System Archive Finalized
           </span>
         </motion.div>
      </footer>
    </div>
  );
};

export default ThinkingArticle;
