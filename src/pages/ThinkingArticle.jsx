import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useDocumentSEO from "../hooks/useDocumentSEO";

const ThinkingArticle = () => {
  useDocumentSEO({
    title: "The Future of Systems — Essay by Tarunya Kesharwani",
    description:
      "A long-form essay on the transition from microservices to colocated intelligence and the emergence of calm, intent-driven architecture.",
  });

  return (
    <article className="min-h-screen bg-white relative overflow-x-hidden selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 p-8 z-50">
        <Link
          to="/"
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 hover:text-black transition-colors"
        >
          &larr; Return to Index
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 relative border-b border-black/5">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className="text-[10px] font-bold text-black/30 uppercase tracking-[0.5em] mb-8">
            philosophical inquiry
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-black leading-[0.85] tracking-tighter mb-16"
          >
            The future of <br />
            systems is <br />
            <span className="italic font-normal opacity-20">not louder.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="text-xl md:text-3xl text-black/60 font-medium leading-relaxed max-w-3xl mx-auto italic"
          >
            For the last decade we have obsessed over horizontal scale. But intelligence 
            does not emerge from volume. It emerges from clarity. The next 
            generation of systems will not shout. They will whisper — and still be heard.
          </motion.p>
        </div>
      </section>

      {/* Main Text Content */}
      <section className="py-48 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 mb-16">
            <span className="text-[10px] font-bold text-black uppercase tracking-[0.5em]">01</span>
            <h2 className="text-3xl font-bold text-black italic">The Fracture Point</h2>
          </div>
          
          <p className="text-2xl md:text-3xl text-black font-medium leading-relaxed mb-16 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:tracking-tighter">
            Microservices promised freedom. They gave us isolation,
            deployability, and organizational velocity. But as products became
            decision-makers rather than data-processors, this architecture began
            to fracture.
          </p>
          
          <p className="text-xl md:text-2xl text-black/60 font-medium leading-relaxed mb-16 italic border-l-4 border-black/5 pl-12 py-4">
            A decision engine does not tolerate round-trip latency. When a
            system must reason in real time, every network hop becomes cognitive
            drag.
          </p>

          <p className="text-xl md:text-2xl text-black/60 font-medium leading-relaxed">
            We are witnessing a shift toward colocated intelligence. The machine 
            must hold its context close, breathing inside its own memory window 
            rather than reaching across a wire for every thought.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-48 px-8 bg-black/5 shadow-inner">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-[39px] top-0 bottom-0 w-[1px] bg-black/10 md:left-1/2"></div>

          <div className="space-y-48">
            <TimelineItem
              year="2018"
              title="Orchestration"
              text="APIs became orchestration layers rather than simple interfaces for data retrieval."
            />
            <TimelineItem
              year="2022"
              title="Memory"
              text="Vector databases entered production stacks, bringing structured memory into the machine."
              align="right"
            />
            <TimelineItem
              year="2025"
              title="Latency Wall"
              text="AI agents exposed the ultimate truth: inference latency is the new scalability bottleneck."
            />
          </div>
        </div>
      </section>

      {/* Experiment Data */}
      <section className="py-64 px-8 relative overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[10px] font-bold text-black uppercase tracking-[0.5em]">02</span>
              <h2 className="text-3xl font-bold text-black italic">Experiment EXP_03</h2>
            </div>
            <div className="text-xl md:text-2xl text-black/60 font-medium leading-relaxed space-y-8">
              <p>
                In early 2026 I experimented with a localized inference cache
                built on Rust and Redis. Instead of asking the system to
                retrieve context remotely, the model now breathes inside its own
                memory window.
              </p>
              <div className="pt-8">
                <p className="text-4xl md:text-5xl font-bold text-black leading-tight italic tracking-tighter">
                  "This was not an optimization. <br />
                  <span className="opacity-20">
                    It was a philosophical shift.
                  </span>
                  "
                </p>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-12 border border-black/10 shadow-2xl relative"
          >
            <div className="text-[10px] font-bold text-black/30 mb-12 uppercase tracking-[0.4em]">
              Latency Metrics / Comparative
            </div>

            <div className="space-y-12">
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-4 text-black/40">
                  <span>Legacy Context Load</span>
                  <span>120ms</span>
                </div>
                <div className="h-[2px] bg-black/5 relative">
                  <div className="absolute top-0 left-0 h-full w-full bg-black/10"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-4 text-black">
                  <span>Localized Inference</span>
                  <span>68ms</span>
                </div>
                <div className="h-[2px] bg-black/5 relative">
                  <div className="absolute top-0 left-0 h-full w-[56%] bg-black"></div>
                  <div className="absolute -top-1 left-[56%] w-2 h-2 bg-black rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-24 flex items-baseline gap-4">
              <span className="text-7xl font-bold text-black italic tracking-tighter">
                1.8x
              </span>
              <span className="text-[10px] font-bold text-black/30 uppercase tracking-[0.4em]">
                Speedup Coefficient
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-48 px-8 text-center border-t border-black/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-3xl md:text-5xl font-bold text-black/30 leading-tight mb-24 italic tracking-tighter">
            System design is no longer about drawing boxes and arrows. It is
            about designing how information flows when nobody is watching.
          </p>
          <div className="text-4xl font-bold italic text-black mb-12">TK.</div>
          <div className="text-[10px] font-bold text-black/20 uppercase tracking-[0.5em]">
            &copy; 2026 Architectural Inquiry
          </div>
        </div>
      </footer>
    </article>
  );
};

const TimelineItem = ({ year, title, text, align = "left" }) => (
  <div
    className={`flex flex-col md:flex-row items-center justify-between w-full relative ${
      align === "right" ? "md:flex-row-reverse" : ""
    }`}
  >
    <div className={`w-full md:w-5/12 ${align === "left" ? "md:text-right" : "md:text-left"}`}>
      <span className="text-7xl md:text-9xl font-bold text-black/[0.03] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 select-none tracking-tighter">
        {year}
      </span>
      <h3 className="text-3xl font-bold text-black mb-4 italic tracking-tight">{title}</h3>
      <p className="text-xl font-medium text-black/60 leading-relaxed">{text}</p>
    </div>

    <div className="w-20 h-20 bg-white border border-black/10 shadow-xl flex items-center justify-center shrink-0 z-10 my-12 md:my-0">
      <div className="w-[2px] h-8 bg-black"></div>
    </div>

    <div className="w-full md:w-5/12 hidden md:block"></div>
  </div>
);

export default ThinkingArticle;
