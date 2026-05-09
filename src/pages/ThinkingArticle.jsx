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
    <article className="min-h-screen bg-white relative overflow-x-hidden selection:bg-black selection:text-white">
      {/* Inject JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 p-8 z-50">
        <Link
          to="/blogs"
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors"
        >
          &larr; Return to Archive
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center px-8 relative border-b border-black/5">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-8">
            {post.category} / {post.date}
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-5xl md:text-8xl lg:text-[10rem] font-bold text-black leading-[0.85] tracking-tighter mb-16"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-xl md:text-3xl text-black/60 font-medium leading-relaxed max-w-3xl mx-auto italic"
          >
            {post.excerpt}
          </motion.p>
        </div>
      </section>

      {/* Main Text Content */}
      <section className="py-32 md:py-48 px-8">
        <div className="max-w-3xl mx-auto">
          {post.content.map((block, i) => (
            <div key={i} className="mb-16">
              {block.type === "paragraph" && (
                <p className={`text-xl md:text-2xl text-black/70 font-medium leading-relaxed ${i === 0 ? 'first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:tracking-tighter' : ''}`}>
                  {block.text}
                </p>
              )}
              {block.type === "quote" && (
                <p className="text-xl md:text-2xl text-black/60 font-medium leading-relaxed italic border-l-4 border-black/5 pl-12 py-4">
                  {block.text}
                </p>
              )}
            </div>
          ))}

          {/* Internal Linking Hub (SEO Booster) */}
          <div className="mt-32 pt-16 border-t border-black/10">
            <h3 className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em] mb-8">Related Intelligence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link to="/systems" className="p-8 border border-black/5 hover:bg-black/5 transition-all group">
                <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest block mb-4">Case Study</span>
                <span className="text-xl font-bold text-black group-hover:italic">Systems Portfolio &rarr;</span>
              </Link>
              <Link to="/labs" className="p-8 border border-black/5 hover:bg-black/5 transition-all group">
                <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest block mb-4">Experimental</span>
                <span className="text-xl font-bold text-black group-hover:italic">Architectural Labs &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-48 px-8 text-center border-t border-black/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-5xl font-bold text-black/30 leading-tight mb-24 italic tracking-tighter">
            Technical writing is the highest leverage engineering activity. It forces clarity on the invisible architecture.
          </p>
          <div className="text-4xl font-bold italic text-black mb-12">TK.</div>
          <div className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em]">
            &copy; 2026 Engineering Thought Hub
          </div>
        </div>
      </footer>
    </article>
  );
};

export default ThinkingArticle;
