import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { blogPosts } from "../data/blogData";

const ThinkingArticle = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  useDocumentSEO({
    title: `${post.title} — Tarunya Systems Archive`,
    description: post.excerpt,
  });

  // JSON-LD Structured Data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": "Tarunya Kesharwani",
      "url": "https://tarunyaportfolio.vercel.app/"
    },
    "datePublished": post.date,
    "genre": post.category,
    "publisher": {
      "@type": "Organization",
      "name": "Tarunya Systems",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tarunyaportfolio.vercel.app/favicon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://tarunyaportfolio.vercel.app/thinking/${post.id}`
    }
  };

  return (
    <article className="min-h-screen bg-white relative overflow-x-hidden selection:bg-black selection:text-white pb-32">
      {/* Inject JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 p-8 z-50 bg-white/80 backdrop-blur-md border-b border-black/5 flex justify-between items-center">
        <Link
          to="/blogs"
          className="text-[10px] font-black tracking-[0.3em] uppercase text-black hover:italic transition-all"
        >
          &larr; Archive
        </Link>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
          Thinking Article / {post.id}
        </span>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center px-8 md:px-24 pt-32 pb-24 border-b border-black/5">
        <div className="max-w-6xl">
          <div className="text-[10px] font-black text-black/30 uppercase tracking-[0.5em] mb-12">
            {post.category} / {post.date}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-6xl md:text-[8rem] lg:text-[10rem] font-black text-black leading-[0.85] tracking-tighter mb-16 uppercase"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="h-[1px] bg-black/10 mb-16"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-xl md:text-4xl text-black/60 font-medium leading-tight max-w-4xl tracking-tighter italic"
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      {/* Main Text Content */}
      <section className="py-24 md:py-32 px-8 md:px-24">
        <div className="max-w-4xl">
          <div 
            className="prose prose-xl max-w-none prose-headings:text-black prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-black/70 prose-p:font-medium prose-p:leading-relaxed prose-blockquote:border-black prose-blockquote:bg-black/5 prose-blockquote:p-8 prose-blockquote:not-italic prose-strong:text-black prose-img:border prose-img:border-black/5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Series Hub (Content Graph) */}
          <div className="mt-32 pt-24 border-t-2 border-black">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-12">Series Outlook</h4>
            <p className="text-2xl md:text-4xl font-medium text-black/40 leading-[1.1] mb-20 italic tracking-tighter">
              I’ll probably write more about how different OSS organizations evaluate contributors, 
              what pre-GSoC contributions taught me, and why balancing college with open source work 
              changed how I approach engineering.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              {blogPosts.filter(p => p.id !== slug).slice(0, 2).map((otherPost) => (
                <Link 
                  key={otherPost.id} 
                  to={`/thinking/${otherPost.id}`}
                  className="group p-12 border border-black/10 hover:bg-black hover:text-white transition-all duration-700 flex flex-col justify-between aspect-square"
                >
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-20 block mb-6">Read Next &rarr;</span>
                    <h5 className="text-3xl font-black leading-none group-hover:italic transition-all uppercase tracking-tighter">
                      {otherPost.title}
                    </h5>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-20">
                    {otherPost.category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top / Navigation */}
      <div className="px-8 md:px-24 mt-24">
        <Link 
          to="/blogs" 
          className="inline-block bg-black text-white px-12 py-6 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black border border-black transition-all"
        >
          Return to Archive
        </Link>
      </div>
    </article>
  );
};

export default ThinkingArticle;
