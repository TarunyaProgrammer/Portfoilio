import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";

const ThinkingArticle = () => {
  const { slug } = useParams();

  return (
    <article className="min-h-screen bg-bg pt-32 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 max-w-2xl"
      >
        <Link
          to="/"
          className="text-neon font-mono mb-8 inline-block hover:underline"
        >
          &larr; Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 capitalize leading-tight">
          {slug ? slug.replace("-", " ") : "The Future of Systems Engineering"}
        </h1>

        <div className="flex gap-4 text-sm font-mono text-gray-500 mb-12 border-b border-white/10 pb-8">
          <span>2026-01-05</span>
          <span>/</span>
          <span>Architecture</span>
          <span>/</span>
          <span>5 min read</span>
        </div>

        <div className="prose prose-invert prose-lg">
          <p className="lead text-xl text-gray-300 mb-8">
            As we move towards more autonomous agentic workflows, the role of
            the systems engineer shifts from defining strict boundaries to
            designing adaptive protocols.
          </p>

          <p>
            The traditional microservices architecture, while robust, often
            introduces latency that is unacceptable for real-time AI agents. We
            are exploring new paradigms involving edge-compute and localized
            vector databases to reduce the round-trip time for context
            retrieval.
          </p>

          <h3>The Latency Challenge</h3>
          <p>
            In a recent experiment (see{" "}
            <Link
              to="/labs"
              className="text-neon no-underline border-b border-neon/50"
            >
              EXP_03
            </Link>
            ), we managed to reduce inference context loading by 40% using a
            custom caching layer built on Rust and Redis.
          </p>

          <blockquote>
            "System design is no longer about static boxes and arrows, but about
            fluid data streams and adaptive topologies."
          </blockquote>

          <p>
            This philosophy guides all the work you see in this portfolio. Every
            line of code is an architectural decision.
          </p>
        </div>
      </motion.div>
    </article>
  );
};

export default ThinkingArticle;
