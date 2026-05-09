import { motion } from "framer-motion";
import useDocumentSEO from "../hooks/useDocumentSEO";
import { Link } from "react-router-dom";
import { blogPosts, categories } from "../data/blogData";

const Blogs = () => {
  useDocumentSEO({
    title: "Technical Thought Hub — Tarunya Kesharwani",
    description: "Explore deep dives into system architecture, AI engineering, and software design principles.",
  });

  const featuredPost = blogPosts[0];
  const secondPost = blogPosts[1];
  const thirdPost = blogPosts[2];
  const fourthPost = blogPosts[3];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F8F9FA] pt-32 md:pt-40 pb-20 selection:bg-black selection:text-white"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-end mb-12">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase">
            Blog
          </h1>
          <Link to="/blogs" className="hidden md:flex items-center gap-4 bg-[#EDEDED] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500">
            Read Our Blog &rarr;
          </Link>
        </div>

        {/* Main Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* ═══ LEFT COLUMN (Featured) ═══ */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 h-full"
          >
            <Link to={`/thinking/${featuredPost.id}`} className="group relative block h-[500px] md:h-[800px] overflow-hidden rounded-[3rem] bg-black">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1.5s]"
              />
              {/* Emoji Badge */}
              <div className="absolute top-8 left-8 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl">
                🔥
              </div>
              
              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 w-full md:w-[120%] -ml-4 md:-ml-24 shadow-2xl">
                   <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-black/40 mb-4">
                      <span>Category . {featuredPost.category}</span>
                      <span>|</span>
                      <span>{featuredPost.date}</span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-black text-black leading-tight group-hover:italic transition-all">
                      {featuredPost.title}
                   </h2>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ═══ MIDDLE COLUMN ═══ */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Top Text Card */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="bg-[#D8F1A0] p-10 rounded-[3rem] relative overflow-hidden group"
            >
               <div className="flex justify-between items-start mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">Category . {secondPost.category}</span>
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center text-xl group-hover:bg-black group-hover:text-white transition-all">
                    ↗
                  </div>
               </div>
               <h2 className="text-4xl font-black text-black leading-[1.1] mb-8 uppercase tracking-tighter">
                  {secondPost.title}
               </h2>
               <p className="text-sm font-medium text-black/60 leading-relaxed mb-8 line-clamp-3">
                  {secondPost.excerpt}
               </p>
               
               {/* List Dividers */}
               <div className="space-y-6 pt-6 border-t border-black/10">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-tighter group/item hover:bg-black/5 p-2 transition-all">
                     <span>How to build robust validation systems</span>
                     <span>&rarr;</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-tighter group/item hover:bg-black/5 p-2 transition-all">
                     <span>Implementing DTOs in NestJS</span>
                     <span>&rarr;</span>
                  </div>
               </div>
            </motion.div>

            {/* Bottom Media Card */}
            <motion.div 
               whileHover={{ scale: 0.98 }}
               className="relative h-[400px] rounded-[3rem] overflow-hidden group"
            >
               <img 
                src={fourthPost.image} 
                alt={fourthPost.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1s]"
               />
               <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-10">
                  <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-6 mx-auto">
                    <span className="ml-1">▶</span>
                  </div>
                  <div className="text-[10px] font-bold text-white/60 mb-2 uppercase tracking-widest">5 Min . {fourthPost.date}</div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter leading-tight">
                    {fourthPost.title}
                  </h3>
               </div>
            </motion.div>
          </div>

          {/* ═══ RIGHT COLUMN ═══ */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {/* Top Vertical Card */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="relative h-[550px] rounded-[3rem] overflow-hidden group bg-white"
            >
               <img 
                src={thirdPost.image} 
                alt={thirdPost.title} 
                className="w-full h-[60%] object-cover group-hover:scale-105 transition-transform duration-1000"
               />
               <div className="p-8">
                  <div className="text-[10px] font-bold text-black/30 mb-2 uppercase tracking-widest">Hot . {thirdPost.date}</div>
                  <h3 className="text-3xl font-black text-black uppercase leading-none tracking-tighter group-hover:italic transition-all">
                    {thirdPost.title}
                  </h3>
               </div>
               <div className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest bg-white/80 px-4 py-2 rounded-full">
                  Category . {thirdPost.category}
               </div>
            </motion.div>

            {/* Category Cloud */}
            <div className="bg-[#D1C4E9] p-10 rounded-[3rem] flex-1 relative overflow-hidden">
                <div className="flex flex-wrap gap-3 mb-12 relative z-10">
                  {categories.map((cat, i) => (
                    <motion.span 
                      key={i}
                      whileHover={{ scale: 1.1, backgroundColor: "#000", color: "#fff" }}
                      className="bg-[#FFF9C4]/80 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-tighter cursor-pointer transition-all"
                    >
                      {cat}
                    </motion.span>
                  ))}
                </div>
                <div className="flex justify-between items-center relative z-10 mt-auto">
                  <span className="text-lg font-black text-black tracking-tighter uppercase">View All Categories</span>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl shadow-lg cursor-pointer hover:bg-black hover:text-white transition-all">
                    &rarr;
                  </div>
                </div>
                {/* Visual Accent */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Blogs;
