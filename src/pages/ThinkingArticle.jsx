import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { blogPosts } from "../data/blogData";
import React from "react";

const ThinkingArticle = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
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
    <article className="min-h-screen bg-[#FDFDFD] text-black relative selection:bg-black selection:text-white">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Header */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-10 z-50 flex justify-between items-center mix-blend-difference invert">
        <Link
          to="/blogs"
          className="text-[10px] font-black tracking-[0.4em] uppercase text-black hover:tracking-[0.6em] transition-all duration-500"
        >
          &larr; Index
        </Link>
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">
          Engineering Thought / {post.id}
        </div>
      </nav>

      {/* Modern Editorial Hero */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 border-b border-black/5">
        {/* Left: Metadata & Context */}
        <div className="lg:col-span-5 flex flex-col justify-end p-8 md:p-24 bg-white border-r border-black/5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <span className="w-8 h-[1px] bg-black"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
                {post.category} // {post.date}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase mb-16">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-black/50 font-medium leading-relaxed italic max-w-md">
              {post.excerpt}
            </p>
          </motion.div>
        </div>

        {/* Right: Immersive Image / Background */}
        <div className="lg:col-span-7 relative overflow-hidden grayscale contrast-125">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
        </div>
      </section>

      {/* Article Content Area - Asymmetrical Grid */}
      <section className="py-32 md:py-48 px-8 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Main Content Column */}
          <div className="lg:col-start-4 lg:col-span-6">
            <div 
              className="prose prose-2xl max-w-none 
                prose-p:text-black/70 prose-p:font-medium prose-p:leading-[1.6] prose-p:mb-12
                prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:mt-24 prose-headings:mb-12
                prose-blockquote:border-black prose-blockquote:bg-black/5 prose-blockquote:p-12 prose-blockquote:text-3xl prose-blockquote:font-black prose-blockquote:italic prose-blockquote:tracking-tighter prose-blockquote:not-italic prose-blockquote:my-20
                prose-strong:text-black prose-strong:font-black
                prose-img:w-[140%] prose-img:max-w-none prose-img:ml-[-20%] prose-img:my-32 prose-img:border prose-img:border-black/5 prose-img:shadow-2xl
                prose-table:w-[120%] prose-table:max-w-none prose-table:ml-[-10%] prose-table:my-24 prose-table:text-sm
                "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Subtle Content Graph Footer */}
            <div className="mt-48 pt-24 border-t-4 border-black">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 mb-16">Further Logic</h4>
              <p className="text-3xl md:text-5xl font-black text-black leading-[1.1] mb-24 italic tracking-tighter">
                I’ll probably write more about how different OSS organizations evaluate contributors, 
                what pre-GSoC contributions taught me, and why balancing college with open source work 
                changed how I approach engineering.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.filter(p => p.id !== slug).slice(0, 2).map((other) => (
                  <Link 
                    key={other.id} 
                    to={`/thinking/${other.id}`}
                    className="group border border-black/10 p-12 hover:bg-black hover:text-white transition-all duration-700 aspect-square flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest opacity-30 block mb-6">Process Next &rarr;</span>
                      <h5 className="text-3xl font-black leading-none uppercase tracking-tighter group-hover:italic transition-all">
                        {other.title}
                      </h5>
                    </div>
                    <div className="text-[9px] font-black uppercase tracking-widest opacity-30">
                      Archive / {other.category}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Social / Meta (Floating on Desktop) */}
          <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-48 h-fit">
            <div className="flex flex-col gap-12">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-4">Author</div>
                <div className="text-sm font-black uppercase">Tarunya K.</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-4">Connect</div>
                <div className="flex flex-col gap-2">
                  <a href="https://x.com/TarunyaKesh" target="_blank" className="text-xs font-bold hover:italic">Twitter/X</a>
                  <a href="https://linkedin.com/in/tarunyakesharwani" target="_blank" className="text-xs font-bold hover:italic">LinkedIn</a>
                </div>
              </div>
              <div className="w-full h-[1px] bg-black/5"></div>
              <div className="text-[10px] font-black text-black/20 leading-relaxed uppercase tracking-widest">
                System v1.0.4 <br /> Archive: Thinking
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Bottom Navigation */}
      <footer className="py-32 px-8 border-t border-black/5 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <Link to="/blogs" className="group">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 block mb-4">Navigation</span>
             <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter group-hover:italic transition-all">Back to Archive</span>
          </Link>
          <div className="text-right">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 block mb-4">Credits</span>
             <span className="text-sm font-black uppercase">Built for Architects by Tarunya</span>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default ThinkingArticle;
