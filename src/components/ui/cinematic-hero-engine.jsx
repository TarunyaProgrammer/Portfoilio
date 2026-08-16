import React, { useRef, useState, useEffect, useMemo } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const SCENES = [
  { id: "hi", label: "HI.", start: 0, end: 1.2 },
  { id: "name", label: "TARUNYA", start: 1.2, end: 2.1 },
  { id: "who", label: "WHO AM I?", start: 2.1, end: 2.7 },
  { id: "break", label: "I BUILD. BREAK", start: 2.7, end: 3.1 },
  { id: "build", label: "I BUILD.", start: 3.1, end: 4.0 },
  { id: "ship", label: "I SHIP.", start: 4.0, end: 4.9 },
  { id: "scale", label: "I SCALE.", start: 4.9, end: 5.9 },
  { id: "prod", label: "TO PROD.", start: 5.9, end: 6.8 },
  { id: "oss", label: "OPEN SOURCE", start: 6.8, end: 7.5 },
  { id: "ai", label: "AI / AGENTS", start: 7.5, end: 8.2 },
  { id: "velocity", label: "VELOCITY", start: 8.2, end: 9.2 },
  { id: "resolve", label: "RESOLUTION", start: 9.2, end: 10.0 },
];

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

const formatTimecode = (sec) => {
  const s = Math.floor(sec);
  const ms = Math.floor((sec % 1) * 100);
  return `00:${String(s).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
};

export const CinematicHeroEngine = ({ className }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const updateLoopRef = useRef(null);

  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Synchronized RAF loop
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
          }
          return 10.0;
        }

        // Sync audio if drifted
        if (audioRef.current && !isMuted && Math.abs(audioRef.current.currentTime - next) > 0.25) {
          audioRef.current.currentTime = next;
        }

        return next;
      });

      if (isPlaying) {
        rafRef.current = requestAnimationFrame((ts) => updateLoopRef.current?.(ts));
      }
    };
  });

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame((ts) => updateLoopRef.current?.(ts));
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  // Audio Play / Pause Sync
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    } else {
      const startTime = time >= 9.98 ? 0 : time;
      if (time >= 9.98) {
        setTime(0);
      }
      setIsPlaying(true);
      if (audioRef.current && !isMuted) {
        audioRef.current.currentTime = startTime;
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.currentTime = time;
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      audioRef.current.pause();
      setIsMuted(true);
    }
  };

  const resetPlayback = () => {
    setTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleSeek = (e) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = clickRatio * 10.0;
    setTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

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

  const currentScene = SCENES.find((s) => time >= s.start && time < s.end) || SCENES[SCENES.length - 1];

  return (
    <div className={cn("relative w-full h-full overflow-hidden select-none bg-[#050507]", className)}>
      {/* Hidden Synchronized Audio Track (No Loop) */}
      <audio
        ref={audioRef}
        src="/hero_sound_V3_high_energy.wav"
        preload="auto"
        muted={isMuted}
      />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CINEMATIC FAST-CUT SCENE RENDERER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* ── 1. HI (0.00s - 1.20s) ── */}
        {time < 1.2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050507]">
            <div className="relative">
              <div
                className="text-lg sm:text-2xl font-extrabold tracking-[0.35em] text-white/90"
                style={{ opacity: 0.9 + Math.sin(time * 8) * 0.1 }}
              >
                HI.
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
            </div>
            <div className="absolute bottom-[18%] font-mono text-[10px] tracking-[0.3em] text-white/30">
              00:00.000 — SILENCE / TENSION
            </div>
          </div>
        )}

        {/* ── 2. TARUNYA HERE (1.20s - 2.10s) ── */}
        {time >= 1.2 && time < 2.1 && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={PLATES[1]}
              alt="Workstation Reflection"
              className="absolute inset-0 w-full h-full object-cover opacity-25 scale-105"
              style={{ filter: "blur(1px) brightness(0.65)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/40 via-transparent to-[#050507]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="font-black text-6xl sm:text-8xl lg:text-9xl leading-[0.9] tracking-[-0.04em] text-[#F5F5F2] text-center"
                style={{
                  transform: `scale(${0.96 + (time - 1.2) * 0.08})`,
                  letterSpacing: "-0.05em",
                }}
              >
                TARUNYA
                <br />
                <span className="font-extrabold tracking-[-0.02em] text-[#C8C9CC]">HERE.</span>
              </h1>
            </div>
            <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.25em] text-white/40">
              GLASS / REFLECTION / DEPTH
            </div>
          </div>
        )}

        {/* ── 3. WHO AM I? (2.10s - 2.70s) ── */}
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
              className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/25 blur-[1px]"
              style={{ transform: `scaleX(${0.2 + (time - 2.1) * 1.2})` }}
            />
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.3em] text-[#C8C9CC]/70">
              TENSION ↑ 0.1s TO IMPACT
            </div>
          </div>
        )}

        {/* ── 4. I BUILD. BREAK (2.70s - 3.10s) — LF IMPACT ── */}
        {time >= 2.7 && time < 3.1 && (
          <div className="absolute inset-0 bg-[#F5F5F2] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-white"
              style={{ opacity: time < 2.78 ? 1 : 0, transition: "opacity 0.08s" }}
            />
            <h2
              className="font-black text-7xl sm:text-9xl lg:text-[160px] leading-[0.85] tracking-[-0.06em] text-[#050507] text-center"
              style={{
                transform: `scale(${1 + (time - 2.7) * 7.5})`,
                filter: `blur(${Math.min(8, (time - 2.7) * 20)}px)`,
              }}
            >
              I BUILD.
              <br />
              BREAK
            </h2>
          </div>
        )}

        {/* ── 5. I BUILD (3.10s - 4.00s) — 0.15s Fast Cuts ── */}
        {time >= 3.1 && time < 4.0 && (
          <div className="absolute inset-0 bg-[#070709] overflow-hidden">
            {buildCutIndex === 0 && (
              <div className="absolute inset-0">
                <img src={PLATES[0]} alt="Macro Keypress" className="w-full h-full object-cover scale-110" />
                <div className="absolute inset-0 bg-[#050507]/20" />
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[2px] bg-white/80 blur-[0.5px]"
                  style={{ transform: "rotate(-8deg)" }}
                />
              </div>
            )}
            {buildCutIndex === 1 && (
              <div className="absolute inset-0">
                <img src={PLATES[1]} alt="Code Streaks" className="w-full h-full object-cover scale-105 filter contrast-110" />
                <div className="absolute inset-0 bg-[#050507]/40" />
                <div className="absolute inset-0 flex items-center justify-center font-mono text-xs sm:text-sm text-white/80 p-6 bg-black/40">
                  <div className="space-y-1 bg-[#0a0a0c]/90 p-4 rounded-xl border border-white/15">
                    <div>type Build = &#123; ship: () =&gt; Promise&lt;Prod&gt; &#125;</div>
                    <div className="text-emerald-400">const system = createPipeline().toUI()</div>
                  </div>
                </div>
              </div>
            )}
            {buildCutIndex === 2 && (
              <div className="absolute inset-0">
                <img src={PLATES[2]} alt="Code to UI" className="w-full h-full object-cover scale-110" />
                <div className="absolute inset-0 bg-[#050507]/20" />
              </div>
            )}
            {buildCutIndex >= 3 && (
              <div className="absolute inset-0">
                <img src={PLATES[3]} alt="Production Render" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="absolute bottom-6 right-6 font-mono text-xs tracking-[0.2em] text-white/90 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
              I BUILD. &bull; {buildCutIndex + 1}/5 &bull; 0.15s CUT
            </div>
          </div>
        )}

        {/* ── 6. I SHIP (4.00s - 4.90s) — Git / CI/CD Pipeline ── */}
        {time >= 4.0 && time < 4.9 && (
          <div className="absolute inset-0 bg-[#070709] overflow-hidden">
            <img src={PLATES[4]} alt="Git & Terminal" className="absolute inset-0 w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-[#050507]/45" />
            <div className="absolute inset-x-6 top-[15%] bottom-[20%] rounded-2xl border border-white/15 bg-[#050507]/85 backdrop-blur-md p-5 shadow-2xl flex flex-col justify-between max-w-2xl mx-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <span className="text-white/80 font-bold">git log &bull; deploy.prod &bull; 144 BPM</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">CI: 99.4% GREEN</span>
              </div>
              <div className="font-mono text-xs space-y-1.5 text-zinc-300">
                <div className="text-blue-400">&gt; docker build -t tarunya/architecture:v3</div>
                <div>&gt; verifying row-level security &bull; edge workers</div>
                <div className="text-emerald-400">&gt; deployed to production in 42ms</div>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400" style={{ width: `${(time - 4.0) * 110}%` }} />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 font-mono text-xs tracking-[0.2em] text-white/90">
              I SHIP. &bull; DOCKER &bull; K8S
            </div>
          </div>
        )}

        {/* ── 7. I SCALE (4.90s - 5.90s) — Distributed Systems ── */}
        {time >= 4.9 && time < 5.9 && (
          <div className="absolute inset-0 bg-[#08080a] overflow-hidden">
            <img src={PLATES[5]} alt="Distributed Scale" className="absolute inset-0 w-full h-full object-cover scale-105" />
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
            <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-white/50">
              MONOLITH &rarr; 12 MICROSERVICES &bull; SUPABASE &bull; CLOUDFLARE
            </div>
          </div>
        )}

        {/* ── 8. TO PRODUCTION (5.90s - 6.80s) — Live App Launch ── */}
        {time >= 5.9 && time < 6.8 && (
          <div className="absolute inset-0 bg-[#070709] overflow-hidden">
            <img src={PLATES[6]} alt="Production Launch" className="absolute inset-0 w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />
            <div className="absolute top-[14%] left-1/2 -translate-x-1/2 font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] text-white text-center leading-none">
              TO PRODUCTION.
            </div>
            <div className="absolute bottom-6 inset-x-6 flex justify-between font-mono text-xs text-white/40 tracking-[0.2em]">
              <span>CONTAINER &rarr; NETWORK &rarr; CLOUD</span>
              <span>SUB-BASS IMPACT @ 5.90s</span>
            </div>
          </div>
        )}

        {/* ── 9. OPEN SOURCE (6.80s - 7.50s) — GSoC & C2SI ── */}
        {time >= 6.8 && time < 7.5 && (
          <div className="absolute inset-0 bg-[#070709] overflow-hidden">
            <img src={PLATES[7]} alt="GSoC Open Source" className="absolute inset-0 w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-[#050507]/50" />
            <div className="absolute inset-y-0 right-[8%] flex items-center font-black text-6xl sm:text-8xl lg:text-9xl leading-[0.85] tracking-[-0.04em] text-white">
              <div>
                OPEN
                <br />
                <span className="text-zinc-400">SOURCE.</span>
              </div>
            </div>
            <div className="absolute left-[6%] top-1/2 -translate-y-1/2 p-5 rounded-2xl bg-[#050507]/80 border border-white/15 backdrop-blur-md space-y-2 font-mono text-xs max-w-sm">
              <div className="text-emerald-400 font-bold">Google Summer of Code &apos;26 @ C2SI</div>
              <div className="text-zinc-300">25+ Merged Pull Requests &bull; CNCF Ecosystem</div>
            </div>
          </div>
        )}

        {/* ── 10. AI / AGENTS (7.50s - 8.20s) ── */}
        {time >= 7.5 && time < 8.2 && (
          <div className="absolute inset-0 bg-[#070709] overflow-hidden">
            <img src={PLATES[8]} alt="AI Agents" className="absolute inset-0 w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-[#050507]/45" />
            <div className="absolute inset-0 flex items-center justify-center font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.04em] text-white text-center">
              AI &bull; AGENTS
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.25em] text-blue-300">
              DETERMINISTIC AGENTIC WORKFLOWS
            </div>
          </div>
        )}

        {/* ── 11. VELOCITY (8.20s - 9.20s) — Rapid 0.08s Cuts ── */}
        {time >= 8.2 && time < 9.2 && (
          <div className="absolute inset-0 bg-[#050507] overflow-hidden">
            <img
              src={PLATES[velocityIndex]}
              alt="Velocity Flash"
              className="w-full h-full object-cover scale-110 filter contrast-125"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center font-black text-7xl sm:text-9xl lg:text-[150px] tracking-[-0.06em] text-white/95">
              VELOCITY.
            </div>
            <div className="absolute bottom-6 right-6 font-mono text-xs tracking-[0.2em] text-amber-300 bg-black/80 px-3 py-1 rounded border border-amber-500/30">
              0.08s COLLISION
            </div>
          </div>
        )}

        {/* ── 12. RESOLUTION (9.20s - 10.00s) ── */}
        {time >= 9.2 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050507]">
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                TARUNYA KESHARWANI
              </div>
              <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
                Systems Architect &bull; GSoC &apos;26 Developer
              </p>
            </div>
          </div>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/70 pointer-events-none" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* INTERACTIVE TIMELINE SCRUBBER & AUDIO CONTROLS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-30 flex flex-col gap-2 pointer-events-auto">
        {/* Interactive Scrubbing Track */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="relative w-full h-2 bg-white/10 hover:h-3 rounded-full cursor-pointer overflow-hidden transition-all duration-200 backdrop-blur-md border border-white/10"
        >
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-400 rounded-full"
            style={{ width: `${(time / 10.0) * 100}%` }}
          />
        </div>

        {/* Playback Controls & Scene Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={resetPlayback}
              className="p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-white transition-colors cursor-pointer"
              title="Restart Video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-[11px]">Audio: Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[11px] text-blue-400 font-semibold">144 BPM Audio: On</span>
                </>
              )}
            </button>

            <span className="text-[11px] text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded border border-white/10">
              {formatTimecode(time)} / 00:10.00
            </span>
          </div>

          {/* Active Scene Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/90 border border-white/15 text-zinc-300 text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-zinc-400">SCENE:</span>
            <span className="text-white font-bold">{currentScene.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
