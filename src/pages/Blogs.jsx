import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";

const Blogs = () => {
  useDocumentSEO({
    title: "Thought Archive — Tarunya Kesharwani",
    description:
      "A collection of technical articles, architectural insights, and engineering philosophies.",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 md:pt-48 pb-32"
    >
      <div className="container mx-auto px-8 max-w-6xl">
        <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-4">
          technical archive
        </div>
        <h1 className="text-6xl md:text-9xl font-bold text-black leading-none mb-24 tracking-tighter">
          Thought <br />
          <span className="italic font-normal opacity-20 text-4xl md:text-8xl">Archive</span>
        </h1>

        <div className="space-y-32">
          {blogPosts.map((post, i) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group flex flex-col md:flex-row gap-8 md:gap-24 items-start"
            >
              <div className="md:w-32 shrink-0 pt-2">
                <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em]">
                  {post.date}
                </span>
                <div className="w-8 h-[1px] bg-black/10 mt-4 group-hover:w-full transition-all duration-700" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[9px] font-bold text-black/40 uppercase tracking-[0.3em] px-3 py-1 bg-black/5">
                    {post.category}
                  </span>
                  <span className="text-[9px] font-bold text-black/20 uppercase tracking-[0.3em]">
                    {post.readTime} read
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold text-black mb-8 group-hover:italic transition-all duration-500">
                  <Link to={`/thinking/${post.id}`} className="hover:text-black/80">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-black/50 text-xl font-medium leading-relaxed max-w-2xl mb-12">
                  {post.excerpt}
                </p>

                <Link
                  to={`/thinking/${post.id}`}
                  className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest group/link"
                >
                  <span className="border-b border-black pb-1">Access Article</span>
                  <motion.span 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >&rarr;</motion.span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;
