import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════
// MASTER SCENE PLATES (PRE-LOADED FOR ZERO-LATENCY 60-120 FPS TRANSITIONS)
// ═══════════════════════════════════════════════════════════════════════
const PLATES = [
  "/hero-plates/plate-0.webp",
  "/hero-plates/plate-1.webp",
  "/hero-plates/plate-2.webp",
  "/hero-plates/plate-3.webp",
  "/hero-plates/plate-4.webp",
  "/hero-plates/plate-5.webp",
  "/hero-plates/plate-6.webp",
  "/hero-plates/plate-7.webp",
  "/hero-plates/plate-8.webp",
];

// Check prefers-reduced-motion
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export const CinematicHeroEngine = forwardRef(
  ({ className, isMuted = true }, ref) => {
    const audioRef = useRef(null);
    const rafRef = useRef(0);
    const lastTimeRef = useRef(0);
    const updateLoopRef = useRef(null);
    const containerRef = useRef(null);

    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Preload all 9 plates on mount for instant zero-latency caching
    useEffect(() => {
      PLATES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, []);

    // Initial 1.2s start delay — skip animation if reduced motion requested
    useEffect(() => {
      if (prefersReducedMotion) return;
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 1200);
      return () => clearTimeout(timer);
    }, []);

    // Pause RAF loop when hero section is not visible (IntersectionObserver)
    useEffect(() => {
      if (!containerRef.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            cancelAnimationFrame(rafRef.current);
            if (audioRef.current && !audioRef.current.paused) {
              audioRef.current.pause();
            }
          } else if (isPlaying) {
            lastTimeRef.current = 0;
            rafRef.current = requestAnimationFrame((ts) =>
              updateLoopRef.current?.(ts)
            );
            if (audioRef.current && !isMuted && audioRef.current.paused) {
              audioRef.current.play().catch(() => {});
            }
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [isPlaying, isMuted]);

    // High-performance RAF timeline loop
    useEffect(() => {
      updateLoopRef.current = (timestamp) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const delta = (timestamp - lastTimeRef.current) / 1000;
        lastTimeRef.current = timestamp;

        setTime((prev) => {
          const next = prev + delta;
          if (next >= 10.0) {
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            return 0; // Hold at start frame after completion
          }
          return next;
        });

        if (isPlaying) {
          rafRef.current = requestAnimationFrame((ts) =>
            updateLoopRef.current?.(ts)
          );
        }
      };
    });

    useEffect(() => {
      if (isPlaying) {
        lastTimeRef.current = 0;
        rafRef.current = requestAnimationFrame((ts) =>
          updateLoopRef.current?.(ts)
        );
      } else {
        cancelAnimationFrame(rafRef.current);
      }
      return () => cancelAnimationFrame(rafRef.current);
    }, [isPlaying]);

    // Cleanup audio & RAF on unmount
    useEffect(() => {
      const audioEl = audioRef.current;
      return () => {
        cancelAnimationFrame(rafRef.current);
        if (audioEl) {
          audioEl.pause();
        }
      };
    }, []);

    // Smooth audio state handling (no aggressive seeking to avoid distortion)
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = isMuted;
      if (!isMuted && isPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }, [isMuted, isPlaying]);

    // External methods exposed via ref
    const replay = () => {
      setTime(0);
      lastTimeRef.current = 0;
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        if (!isMuted) {
          audioRef.current.play().catch(() => {});
        }
      }
      setIsPlaying(true);
    };

    useImperativeHandle(ref, () => ({
      replay,
      isPlaying,
    }));

    // Sub-frame fast-cuts index calculations
    const buildCutIndex = useMemo(() => {
      if (time < 3.26) return 0;
      if (time < 3.44) return 1;
      if (time < 3.62) return 2;
      if (time < 3.82) return 3;
      return 4;
    }, [time]);

    const velocityIndex = useMemo(() => {
      return Math.floor((time - 8.2) / 0.08) % PLATES.length;
    }, [time]);

    // Dynamic vignette opacity
    const vignetteOpacity = useMemo(() => {
      if (time < 1.2) return 0.85;
      if (time >= 2.1 && time < 2.7) return 0.9;
      if (time >= 2.7 && time < 3.1) return 0.35;
      if (time >= 8.2 && time < 9.2) return 0.5;
      if (time >= 9.2) return 0.9;
      return 0.7;
    }, [time]);

    // Reduced motion: show clean static resolution slide
    if (prefersReducedMotion) {
      return (
        <div
          className={cn(
            "relative w-full h-full overflow-hidden select-none bg-[#050507] flex items-center justify-center",
            className
          )}
        >
          <div className="text-center space-y-3 px-4">
            <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              FROM CODE
            </div>
            <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
              TARUNYA KESHARWANI &bull; SYSTEMS ARCHITECT &bull; GSoC &apos;26
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden select-none bg-[#050507]",
          className
        )}
      >
        {/* ═══ CLEAN STUDIO AUDIO SOURCE (MASTERED 10.0S HIGH-ENERGY DROP) ═══ */}
        <audio
          ref={audioRef}
          src="/hero-audio.m4a"
          preload="auto"
          muted={isMuted}
          playsInline
        />

        {/* ═══ SUBTLE GPU-ACCELERATED AMBIENT FILM GRAIN ═══ */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* ═══ CRT SCANLINES (ACTIVE DURING CODE / BUILD / SCALE) ═══ */}
        {time >= 3.1 && time < 5.9 && (
          <div className="absolute inset-0 pointer-events-none z-[21] hero-scanlines" />
        )}

        {/* ═══ ANAMORPHIC LIGHT LEAKS AT IMPACT PEAKS ═══ */}
        {time >= 2.7 && time < 3.0 && (
          <div className="absolute inset-0 pointer-events-none z-[22]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent hero-light-leak" />
          </div>
        )}
        {time >= 8.2 && time < 8.5 && (
          <div className="absolute inset-0 pointer-events-none z-[22]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent hero-light-leak" />
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 10-SECOND CINEMATIC BACKGROUND VISUAL SEQUENCE (60-120 FPS)   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full overflow-hidden",
            time >= 2.7 && time < 2.85 && "hero-shake"
          )}
        >
          {/* ── 01. OPENING (0.00s – 1.20s): Pure Black & Minimal "HI." ── */}
          {time < 1.2 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#050507] hero-scene-enter">
              <div className="relative">
                <div
                  className="text-base sm:text-2xl font-bold tracking-[0.45em] text-white/95 hero-cursor-blink"
                  style={{ opacity: 0.9 + Math.sin(time * 8) * 0.1 }}
                >
                  HI.
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-[22%] font-mono text-[9px] tracking-[0.35em] text-[#6B7C8D]/60 uppercase">
                00:00.000 &bull; RESTRAINT &bull; SILENCE
              </div>
            </div>
          )}

          {/* ── 02. IDENTITY (1.20s – 2.10s): "TARUNYA HERE." Editorial Push ── */}
          {time >= 1.2 && time < 2.1 && (
            <div className="absolute inset-0 overflow-hidden bg-[#070709] hero-scene-enter">
              <img
                src={PLATES[1]}
                alt="Workspace Hologram"
                className="absolute inset-0 w-full h-full object-cover opacity-35 transition-transform duration-300"
                style={{
                  transform: `scale3d(${1.04 + (time - 1.2) * 0.03}, ${1.04 + (time - 1.2) * 0.03}, 1)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  role="heading"
                  aria-level="2"
                  className="font-black text-4xl sm:text-7xl lg:text-9xl leading-[0.88] tracking-[-0.05em] text-[#F5F5F2] text-center px-4"
                  style={{
                    transform: `scale3d(${0.97 + (time - 1.2) * 0.06}, ${0.97 + (time - 1.2) * 0.06}, 1)`,
                  }}
                >
                  TARUNYA
                  <br />
                  <span className="font-extrabold tracking-[-0.03em] text-[#C8C9CC]">
                    HERE.
                  </span>
                </div>
              </div>
              <div className="absolute bottom-12 left-8 hidden sm:block font-mono text-[10px] tracking-[0.25em] text-white/40">
                SYSTEMS / ARCHITECTURE / GSOC &apos;26
              </div>
            </div>
          )}

          {/* ── 03. CURIOSITY (2.10s – 2.70s): "WHO AM I?" Rising Tension ── */}
          {time >= 2.1 && time < 2.7 && (
            <div className="absolute inset-0 bg-[#070709] flex items-center justify-center overflow-hidden hero-scene-enter">
              <div
                className="font-extrabold text-4xl sm:text-7xl lg:text-9xl leading-none tracking-[-0.05em] text-white text-center px-4 hero-glitch"
                style={{
                  transform: `scale3d(${0.92 + (time - 2.1) * 0.35}, ${0.92 + (time - 2.1) * 0.35}, 1)`,
                }}
              >
                WHO AM I?
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
              <div
                className="absolute top-1/2 left-0 right-0 h-[2px] bg-blue-400/40 blur-[1px]"
                style={{ transform: `scaleX(${0.3 + (time - 2.1) * 1.1})` }}
              />
              <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 hidden sm:block font-mono text-[11px] tracking-[0.3em] text-[#C8C9CC]/70">
                TENSION &uarr; 0.1s TO IMPACT
              </div>
            </div>
          )}

          {/* ── 04. THE BREAK (2.70s – 3.10s): "I BUILD." LF Impact & Fly-Through ── */}
          {time >= 2.7 && time < 3.1 && (
            <div className="absolute inset-0 bg-[#F5F5F2] flex items-center justify-center overflow-hidden hero-scene-enter">
              <div
                className="absolute inset-0 bg-white"
                style={{
                  opacity: time < 2.78 ? 1 : 0,
                  transition: "opacity 0.08s",
                }}
              />
              <h2
                className="font-black text-5xl sm:text-8xl lg:text-[140px] leading-[0.85] tracking-[-0.06em] text-[#050507] text-center px-4"
                style={{
                  transform: `scale3d(${1 + (time - 2.7) * 4.5}, ${1 + (time - 2.7) * 4.5}, 1)`,
                }}
              >
                I BUILD.
              </h2>
            </div>
          )}

          {/* ── 05. BUILD (3.10s – 4.00s): Keyboard → Code Streaks → Code-to-UI ── */}
          {time >= 3.1 && time < 4.0 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden hero-scene-enter">
              {buildCutIndex === 0 && (
                <div className="absolute inset-0">
                  <img
                    src={PLATES[0]}
                    alt="Macro Keypress"
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-[#050507]/20" />
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[2px] bg-white/80 blur-[0.5px]"
                    style={{ transform: "rotate(-8deg)" }}
                  />
                </div>
              )}
              {buildCutIndex === 1 && (
                <div className="absolute inset-0">
                  <img
                    src={PLATES[1]}
                    alt="Code Streaks"
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-[#050507]/40" />
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs sm:text-sm text-white/85 p-6 bg-black/40">
                    <div className="space-y-1.5 bg-[#0a0a0c]/90 p-5 rounded-xl border border-white/15 shadow-2xl">
                      <div className="text-zinc-400">
                        type Build = &#123; ship: () =&gt; Promise&lt;Prod&gt;
                        &#125;
                      </div>
                      <div className="text-blue-400 font-bold">
                        const system = createPipeline().toUI()
                      </div>
                      <div className="text-emerald-400">
                        &lt;Suspense
                        fallback=&#123;null&#125;&gt;&lt;Canvas
                        /&gt;&lt;/Suspense&gt;
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {buildCutIndex === 2 && (
                <div className="absolute inset-0">
                  <img
                    src={PLATES[2]}
                    alt="Code to UI"
                    className="w-full h-full object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-[#050507]/25" />
                </div>
              )}
              {buildCutIndex >= 3 && (
                <div className="absolute inset-0">
                  <img
                    src={PLATES[3]}
                    alt="Production Render"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="absolute bottom-14 right-4 sm:right-8 hidden sm:block font-mono text-xs tracking-[0.2em] text-white/90 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                I BUILD. &bull; {buildCutIndex + 1}/5 &bull; 0.15s CUT
              </div>
            </div>
          )}

          {/* ── 06. SHIP (4.00s – 4.90s): Git Log → PR #1282 → Docker Container ── */}
          {time >= 4.0 && time < 4.9 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden hero-scene-enter">
              <img
                src={PLATES[4]}
                alt="Git & Terminal"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[#050507]/45" />
              <div className="absolute inset-x-6 top-[15%] bottom-[25%] rounded-2xl border border-white/15 bg-[#050507]/85 backdrop-blur-md p-5 shadow-2xl flex flex-col justify-between max-w-2xl mx-auto">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                  <span className="text-white/80 font-bold">
                    git log &bull; deploy.prod &bull; 144 BPM
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    CI: 99.4% GREEN
                  </span>
                </div>
                <div className="font-mono text-xs space-y-1.5 text-zinc-300">
                  <div className="text-blue-400">
                    &gt; docker build -t tarunya/architecture:v3
                  </div>
                  <div>&gt; verifying row-level security &bull; edge workers</div>
                  <div className="text-emerald-400">
                    &gt; deployed to production in 42ms
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-100"
                    style={{ width: `${Math.min(100, (time - 4.0) * 110)}%` }}
                  />
                </div>
              </div>
              <div className="absolute bottom-14 left-8 hidden sm:block font-mono text-xs tracking-[0.2em] text-white/90">
                I SHIP. &bull; DOCKER &bull; K8S
              </div>
            </div>
          )}

          {/* ── 07. SCALE (4.90s – 5.90s): Microservices Architecture ── */}
          {time >= 4.9 && time < 5.9 && (
            <div className="absolute inset-0 bg-[#08080a] overflow-hidden hero-scene-enter">
              <img
                src={PLATES[5]}
                alt="Distributed Server Room Scale"
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{
                  transform: `scale3d(${1.03 + (time - 4.9) * 0.03}, ${1.03 + (time - 4.9) * 0.03}, 1)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/50 via-transparent to-[#050507]/80" />
              <div
                className="absolute inset-0 flex items-center justify-center font-black text-4xl sm:text-7xl lg:text-9xl tracking-[-0.04em] text-white text-center px-4 hero-glow"
                style={{
                  transform: `scale3d(${1 + (time - 4.9) * 0.08}, ${1 + (time - 4.9) * 0.08}, 1)`,
                }}
              >
                I SCALE.
              </div>
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 hidden sm:block font-mono text-xs tracking-[0.3em] text-white/60 text-center">
                DISTRIBUTED NODES &bull; HIGH THROUGHPUT
              </div>
            </div>
          )}

          {/* ── 08. PRODUCTION (5.90s – 6.80s): Rocket Ignition Launch ── */}
          {time >= 5.9 && time < 6.8 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden hero-scene-enter">
              <img
                src={PLATES[6]}
                alt="Production Rocket Launch"
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{
                  transform: `scale3d(${1.03 + (time - 5.9) * 0.04}, ${1.03 + (time - 5.9) * 0.04}, 1)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/40 to-transparent" />
              <div className="absolute top-[14%] left-1/2 -translate-x-1/2 font-black text-3xl sm:text-6xl lg:text-8xl tracking-[-0.03em] text-white text-center leading-none px-4 hero-glow">
                TO PRODUCTION.
              </div>
              <div className="absolute bottom-14 inset-x-4 hidden sm:flex justify-between font-mono text-xs text-white/50 tracking-[0.2em]">
                <span>CONTAINER &rarr; NETWORK &rarr; CLOUD</span>
                <span>SUB-BASS IMPACT @ 5.90s</span>
              </div>
            </div>
          )}

          {/* ── 09. OPEN SOURCE (6.80s – 7.50s): GSoC '26 & C2SI Workflow ── */}
          {time >= 6.8 && time < 7.5 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden hero-scene-enter">
              <img
                src={PLATES[7]}
                alt="GSoC Open Source Architecture"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[#050507]/50" />
              <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 px-6">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#050507]/85 border border-white/15 backdrop-blur-md space-y-2 font-mono text-xs w-full sm:max-w-xs">
                  <div className="text-emerald-400 font-bold">
                    Google Summer of Code &apos;26 @ C2SI
                  </div>
                  <div className="text-zinc-300">
                    25+ Merged Pull Requests &bull; CNCF Ecosystem
                  </div>
                </div>
                <div className="font-black text-4xl sm:text-7xl lg:text-9xl leading-[0.85] tracking-[-0.04em] text-white text-center sm:text-right">
                  OPEN<br />
                  <span className="text-zinc-400">SOURCE.</span>
                </div>
              </div>
            </div>
          )}

          {/* ── 10. AI / AGENTS / AUTOMATION (7.50s – 8.20s): Computational Pipeline ── */}
          {time >= 7.5 && time < 8.2 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden hero-scene-enter">
              <img
                src={PLATES[8]}
                alt="AI Agents & Workflow"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[#050507]/50" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-4xl sm:text-7xl lg:text-9xl tracking-[-0.04em] text-white text-center px-4">
                {time < 7.72 && <span className="hero-scene-enter">AI</span>}
                {time >= 7.72 && time < 7.96 && (
                  <span className="hero-scene-enter">AGENTS</span>
                )}
                {time >= 7.96 && (
                  <span className="hero-scene-enter">AUTOMATION</span>
                )}
              </div>
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 hidden sm:block font-mono text-xs tracking-[0.25em] text-blue-300 whitespace-nowrap">
                PROMPT &rarr; MODEL &rarr; TOOLS &rarr; ACTION
              </div>
            </div>
          )}

          {/* ── 11. MAXIMUM VELOCITY (8.20s – 9.20s): "SOFTWARE." Climax ── */}
          {time >= 8.2 && time < 9.2 && (
            <div className="absolute inset-0 bg-[#050507] overflow-hidden">
              <img
                src={PLATES[velocityIndex]}
                alt="Velocity Flash"
                className="w-full h-full object-cover scale-105 filter contrast-110"
              />
              <div className="absolute inset-0 bg-black/25" />
              <div
                className="absolute inset-0 flex items-center justify-center font-black text-5xl sm:text-8xl lg:text-[130px] tracking-[-0.06em] text-white/95 text-center px-4 hero-glow"
                style={{
                  transform: `scale3d(${1 + (time - 8.2) * 1.5}, ${1 + (time - 8.2) * 1.5}, 1)`,
                }}
              >
                SOFTWARE.
              </div>
              <div className="absolute bottom-14 right-4 sm:right-8 hidden sm:block font-mono text-xs tracking-[0.2em] text-amber-300 bg-black/80 px-3 py-1 rounded border border-amber-500/30">
                MAX VELOCITY &bull; PRODUCTION READY
              </div>
            </div>
          )}

          {/* ── 12. RESOLUTION (9.20s – 10.00s): "FROM CODE TO PRODUCTION." Hard Silence Cut ── */}
          {time >= 9.2 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#050507] hero-scene-enter">
              <div className="text-center space-y-3">
                <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
                  {time < 9.6 ? "FROM CODE" : "TO PRODUCTION."}
                </div>
                <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                  TARUNYA KESHARWANI &bull; SYSTEMS ARCHITECT &bull; GSoC
                  &apos;26
                </p>
              </div>
            </div>
          )}

          {/* Dynamic Cinematic Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(ellipse at center, transparent 40%, #09090b ${65 + vignetteOpacity * 15}%)`,
              opacity: vignetteOpacity,
            }}
          />
        </div>
      </div>
    );
  }
);

CinematicHeroEngine.displayName = "CinematicHeroEngine";
