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
// MASTER SCENE PLATES
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

export const CinematicHeroEngine = forwardRef(
  ({ className, isMuted = true }, ref) => {
    const audioRef = useRef(null);
    const rafRef = useRef(0);
    const lastTimeRef = useRef(0);
    const updateLoopRef = useRef(null);

    const [time, setTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Initial 1.2s start delay before commencing cinematic playback
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsPlaying(true);
      }, 1200);
      return () => clearTimeout(timer);
    }, []);

    // Frame-accurate RAF loop
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
            return 0; // Return back to 0.00s and hold until Repeat is clicked
          }

          // Tightly synchronize audio with sub-frame timekeeper
          if (
            audioRef.current &&
            !isMuted &&
            Math.abs(audioRef.current.currentTime - next) > 0.18
          ) {
            audioRef.current.currentTime = next;
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

    // Unmount cleanup for audio instance & RAF
    useEffect(() => {
      const audioEl = audioRef.current;
      return () => {
        cancelAnimationFrame(rafRef.current);
        if (audioEl) {
          audioEl.pause();
        }
      };
    }, []);

    // Handle isMuted prop updates safely
    useEffect(() => {
      if (!audioRef.current) return;
      audioRef.current.muted = isMuted;
      if (!isMuted) {
        if (time >= 9.98) {
          audioRef.current.currentTime = 0;
        } else {
          audioRef.current.currentTime = time;
        }
        if (isPlaying) {
          audioRef.current.play().catch(() => {});
        }
      } else {
        audioRef.current.pause();
      }
    }, [isMuted, isPlaying, time]);

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

    return (
      <div
        className={cn(
          "relative w-full h-full overflow-hidden select-none bg-[#050507]",
          className
        )}
      >
        {/* Synchronized 144 BPM Instrumental Soundtrack */}
        <audio
          ref={audioRef}
          src="/hero_sound_V3_high_energy.wav"
          preload="auto"
          muted={isMuted}
        />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 35MM CINEMATIC FILM GRAIN OVERLAY */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.035] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="film-grain-bg">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#film-grain-bg)" />
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* 10-SECOND CINEMATIC BACKGROUND VISUAL SEQUENCE */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* ── 01. OPENING (0.00s – 1.20s): Pure Black & Minimal "HI." ── */}
          {time < 1.2 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#050507]">
              <div className="relative">
                <div
                  className="text-base sm:text-2xl font-bold tracking-[0.45em] text-white/95"
                  style={{ opacity: 0.9 + Math.sin(time * 8) * 0.1 }}
                >
                  HI.
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
              <div className="absolute bottom-[22%] font-mono text-[9px] tracking-[0.35em] text-[#6B7C8D]/60 uppercase">
                00:00.000 &bull; RESTRAINT &bull; SILENCE
              </div>
            </div>
          )}

          {/* ── 02. IDENTITY (1.20s – 2.10s): "TARUNYA HERE." Editorial Push ── */}
          {time >= 1.2 && time < 2.1 && (
            <div className="absolute inset-0 overflow-hidden bg-[#070709]">
              <img
                src={PLATES[1]}
                alt="Workstation Glass Reflection"
                className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
                style={{
                  filter: `blur(${Math.max(0, 1.2 - (time - 1.2) * 1.2)}px) brightness(0.65)`,
                  transform: `scale(${1.05 + (time - 1.2) * 0.04})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/50 via-transparent to-[#050507]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  role="heading"
                  aria-level="2"
                  className="font-black text-6xl sm:text-8xl lg:text-9xl leading-[0.88] tracking-[-0.05em] text-[#F5F5F2] text-center"
                  style={{
                    transform: `scale(${0.96 + (time - 1.2) * 0.08})`,
                  }}
                >
                  TARUNYA
                  <br />
                  <span className="font-extrabold tracking-[-0.03em] text-[#C8C9CC]">
                    HERE.
                  </span>
                </div>
              </div>
              <div className="absolute bottom-12 left-8 font-mono text-[10px] tracking-[0.25em] text-white/40">
                GLASS / REFLECTION / DEPTH
              </div>
            </div>
          )}

          {/* ── 03. CURIOSITY (2.10s – 2.70s): "WHO AM I?" Rising Tension ── */}
          {time >= 2.1 && time < 2.7 && (
            <div className="absolute inset-0 bg-[#070709] flex items-center justify-center overflow-hidden">
              <div
                className="font-extrabold text-6xl sm:text-8xl lg:text-9xl leading-none tracking-[-0.05em] text-white whitespace-nowrap"
                style={{
                  transform: `scale(${0.88 + (time - 2.1) * 0.55})`,
                  opacity: 0.9 + (time - 2.1) * 0.15,
                  filter: `blur(${Math.max(0, 1.5 - (time - 2.1) * 3)}px)`,
                }}
              >
                WHO AM I?
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
              <div
                className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/30 blur-[1px]"
                style={{ transform: `scaleX(${0.2 + (time - 2.1) * 1.2})` }}
              />
              <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.3em] text-[#C8C9CC]/70">
                TENSION &uarr; 0.1s TO IMPACT
              </div>
            </div>
          )}

          {/* ── 04. THE BREAK (2.70s – 3.10s): "I BUILD." LF Impact & Fly-Through ── */}
          {time >= 2.7 && time < 3.1 && (
            <div className="absolute inset-0 bg-[#F5F5F2] flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 bg-white"
                style={{
                  opacity: time < 2.78 ? 1 : 0,
                  transition: "opacity 0.08s",
                }}
              />
              <h2
                className="font-black text-8xl sm:text-9xl lg:text-[180px] leading-[0.85] tracking-[-0.06em] text-[#050507] text-center"
                style={{
                  transform: `scale(${1 + (time - 2.7) * 7.5})`,
                  filter: `blur(${Math.min(8, (time - 2.7) * 20)}px)`,
                }}
              >
                I BUILD.
              </h2>
            </div>
          )}

          {/* ── 05. BUILD (3.10s – 4.00s): Keyboard → Code Streaks → Code-to-UI ── */}
          {time >= 3.1 && time < 4.0 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden">
              {buildCutIndex === 0 && (
                <div className="absolute inset-0">
                  <img
                    src={PLATES[0]}
                    alt="Macro Keypress"
                    className="w-full h-full object-cover scale-110"
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
                    className="w-full h-full object-cover scale-105 filter contrast-110"
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
                    className="w-full h-full object-cover scale-110"
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

              <div className="absolute bottom-14 right-8 font-mono text-xs tracking-[0.2em] text-white/90 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                I BUILD. &bull; {buildCutIndex + 1}/5 &bull; 0.15s CUT
              </div>
            </div>
          )}

          {/* ── 06. SHIP (4.00s – 4.90s): Git Log → PR #1282 → Docker Container ── */}
          {time >= 4.0 && time < 4.9 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden">
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
                    className="h-full bg-emerald-400"
                    style={{ width: `${(time - 4.0) * 110}%` }}
                  />
                </div>
              </div>
              <div className="absolute bottom-14 left-8 font-mono text-xs tracking-[0.2em] text-white/90">
                I SHIP. &bull; DOCKER &bull; K8S
              </div>
            </div>
          )}

          {/* ── 07. SCALE (4.90s – 5.90s): Microservices Architecture ── */}
          {time >= 4.9 && time < 5.9 && (
            <div className="absolute inset-0 bg-[#08080a] overflow-hidden">
              <img
                src={PLATES[5]}
                alt="Distributed Scale"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/40 via-transparent to-[#050507]/70" />
              <div
                className="absolute inset-0 flex items-center justify-center font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.04em] text-white text-center"
                style={{
                  transform: `scale(${1 + (time - 4.9) * 0.12})`,
                  letterSpacing: `${0.02 + (time - 4.9) * 0.08}em`,
                }}
              >
                I SCALE.
              </div>
              <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-white/50 whitespace-nowrap">
                MONOLITH &rarr; 12 MICROSERVICES &bull; SUPABASE &bull;
                CLOUDFLARE
              </div>
            </div>
          )}

          {/* ── 08. PRODUCTION (5.90s – 6.80s): Cloud Deployment & Live App ── */}
          {time >= 5.9 && time < 6.8 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden">
              <img
                src={PLATES[6]}
                alt="Production Launch"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />
              <div className="absolute top-[14%] left-1/2 -translate-x-1/2 font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] text-white text-center leading-none">
                TO PRODUCTION.
              </div>
              <div className="absolute bottom-14 inset-x-8 flex justify-between font-mono text-xs text-white/40 tracking-[0.2em]">
                <span>CONTAINER &rarr; NETWORK &rarr; CLOUD</span>
                <span>SUB-BASS IMPACT @ 5.90s</span>
              </div>
            </div>
          )}

          {/* ── 09. OPEN SOURCE (6.80s – 7.50s): GSoC '26 & C2SI Workflow ── */}
          {time >= 6.8 && time < 7.5 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden">
              <img
                src={PLATES[7]}
                alt="GSoC Open Source"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[#050507]/50" />
              <div className="absolute inset-y-0 right-[8%] flex items-center font-black text-6xl sm:text-8xl lg:text-9xl leading-[0.85] tracking-[-0.04em] text-white">
                <div>
                  OPEN
                  <br />
                  <span className="text-zinc-400">SOURCE.</span>
                </div>
              </div>
              <div className="absolute left-[6%] top-1/2 -translate-y-1/2 p-5 rounded-2xl bg-[#050507]/80 border border-white/15 backdrop-blur-md space-y-2 font-mono text-xs max-w-sm">
                <div className="text-emerald-400 font-bold">
                  Google Summer of Code &apos;26 @ C2SI
                </div>
                <div className="text-zinc-300">
                  25+ Merged Pull Requests &bull; CNCF Ecosystem
                </div>
              </div>
            </div>
          )}

          {/* ── 10. AI / AGENTS / AUTOMATION (7.50s – 8.20s): Computational Pipeline ── */}
          {time >= 7.5 && time < 8.2 && (
            <div className="absolute inset-0 bg-[#070709] overflow-hidden">
              <img
                src={PLATES[8]}
                alt="AI Agents"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-[#050507]/50" />
              <div className="absolute inset-0 flex items-center justify-center font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.04em] text-white text-center">
                {time < 7.72 && <span>AI</span>}
                {time >= 7.72 && time < 7.96 && <span>AGENTS</span>}
                {time >= 7.96 && <span>AUTOMATION</span>}
              </div>
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.25em] text-blue-300">
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
                className="w-full h-full object-cover scale-110 filter contrast-125"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div
                className="absolute inset-0 flex items-center justify-center font-black text-7xl sm:text-9xl lg:text-[160px] tracking-[-0.06em] text-white/95 text-center"
                style={{
                  transform: `scale(${1 + (time - 8.2) * 2.2})`,
                }}
              >
                SOFTWARE.
              </div>
              <div className="absolute bottom-14 right-8 font-mono text-xs tracking-[0.2em] text-amber-300 bg-black/80 px-3 py-1 rounded border border-amber-500/30">
                0.08s COLLISION &bull; MAX BASS
              </div>
            </div>
          )}

          {/* ── 12. RESOLUTION (9.20s – 10.00s): "FROM CODE TO PRODUCTION." Hard Silence Cut ── */}
          {time >= 9.2 && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#050507]">
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

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/70 pointer-events-none" />
        </div>
      </div>
    );
  }
);

CinematicHeroEngine.displayName = "CinematicHeroEngine";
