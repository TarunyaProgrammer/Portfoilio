import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ThinkingArticle = () => {
  return (
    <article className="min-h-screen bg-bg relative overflow-x-hidden selection:bg-neon selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 p-8 z-50 mix-blend-difference">
        <Link
          to="/"
          className="text-white hover:text-neon transition-colors font-mono text-sm tracking-widest uppercase"
        >
          &larr; Return
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
        <div className="max-w-4xl mx-auto text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-text leading-[1.1] tracking-tighter mb-12"
          >
            The future of systems is not louder. <br />
            <span className="text-neon text-neon-glow">It is calmer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
          >
            For the last decade we have obsessed over horizontal scale — more
            servers, more queues, more dashboards. But intelligence does not
            emerge from volume. It emerges from clarity. The next generation of
            systems will not shout. They will whisper — and still be heard.
          </motion.p>
        </div>

        {/* Ambient background noise/gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg to-bg pointer-events-none"></div>
      </section>

      {/* The Fracture Point */}
      <section className="py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm font-mono text-neon mb-8 tracking-widest uppercase">
            01 / The Fracture Point
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 font-light">
            Microservices promised freedom. They gave us isolation,
            deployability, and organizational velocity. But as products became
            decision-makers rather than data-processors, this architecture began
            to fracture.
          </p>
          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
            A decision engine does not tolerate round-trip latency. When a
            system must reason in real time, every network hop becomes cognitive
            drag.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 bg-grid/5 border-y border-white/5">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-white/10 md:left-1/2 md:-ml-[0.5px]"></div>

          <div className="space-y-24">
            <TimelineItem
              year="2018"
              title="Orchestration"
              text="APIs became orchestration layers rather than interfaces."
            />
            <TimelineItem
              year="2022"
              title="Memory"
              text="Vector databases entered production stacks, bringing memory into the machine."
              align="right"
            />
            <TimelineItem
              year="2025"
              title="Latency Wall"
              text="AI agents exposed the truth: inference latency is the new scalability wall."
            />
          </div>
        </div>
      </section>

      {/* Experiment Data */}
      <section className="py-48 px-6 relative">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm font-mono text-neon mb-6 tracking-widest uppercase">
              02 / Experiment EXP_03
            </h2>
            <div className="prose prose-invert prose-lg text-gray-400 font-light">
              <p>
                In early 2026 I experimented with a localized inference cache
                built on Rust and Redis. Instead of asking the system to
                retrieve context remotely, the model now breathes inside its own
                memory window.
              </p>
            </div>
            <div className="mt-12">
              <p className="text-3xl font-heading font-bold text-white mb-2">
                "This was not an optimization. <br />
                <span className="text-gray-500">
                  It was a philosophical shift.
                </span>
                "
              </p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-8 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-50">
              <div className="w-16 h-16 rounded-full border border-neon/20 flex items-center justify-center animate-spin-slow">
                <div className="w-12 h-12 rounded-full border border-white/10 border-dashed"></div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-8">
              Latency Metrics
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2 text-gray-400 font-mono">
                  <span>Legacy Context Load</span>
                  <span>120ms</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gray-600 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 text-neon font-mono">
                  <span>Localized Inference</span>
                  <span>68ms</span>
                </div>
                <div className="h-2 bg-neon/10 rounded-full overflow-hidden relative">
                  <div className="h-full w-[56%] bg-neon rounded-full shadow-[0_0_10px_rgba(200,255,0,0.5)]"></div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-baseline gap-2">
              <span className="text-5xl font-mono font-bold text-white">
                1.8x
              </span>
              <span className="text-gray-400 font-mono text-sm uppercase tracking-wider">
                Speedup
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Footer */}
      <section className="py-32 px-6 text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl text-gray-400 font-light mb-12">
            System design is no longer about drawing boxes and arrows. It is
            about designing how information flows when nobody is watching.
          </p>
          <p className="text-neon font-mono text-sm tracking-widest uppercase animate-pulse">
            Every line of code in this portfolio is an architectural decision.
          </p>
        </div>
      </section>
    </article>
  );
};

const TimelineItem = ({ year, title, text, align = "left" }) => (
  <div
    className={`flex flex-col md:flex-row items-center justify-between w-full ${
      align === "right" ? "md:flex-row-reverse" : ""
    }`}
  >
    <div className="w-full md:w-5/12 mb-8 md:mb-0 text-left md:text-right p-4">
      {align === "left" && (
        <>
          <span className="text-6xl font-bold text-white/5 absolute -z-10 -translate-y-8 select-none">
            {year}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{text}</p>
        </>
      )}
      {align === "right" && (
        <div className="md:text-left">
          <span className="text-6xl font-bold text-white/5 absolute -z-10 -translate-y-8 select-none right-0 md:right-auto md:left-0 md:pl-8">
            {year}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{text}</p>
        </div>
      )}
    </div>

    <div className="w-10 h-10 rounded-full bg-bg border-4 border-gray-800 z-10 flex items-center justify-center shrink-0">
      <div className="w-3 h-3 bg-neon rounded-full"></div>
    </div>

    <div className="w-full md:w-5/12 p-4 hidden md:block"></div>
  </div>
);

export default ThinkingArticle;
