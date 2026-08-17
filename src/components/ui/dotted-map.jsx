import React, { useId, useMemo, useState, useRef } from "react";
import DottedMapClass from "dotted-map";
import { cn } from "@/lib/utils";

// Generates smooth quadratic bezier flight arc between two coordinates
const createArcPath = (start, end) => {
  const midX = (start.x + end.x) / 2;
  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );
  const arcElevation = Math.min(22, Math.max(8, distance * 0.28));
  const midY = Math.min(start.y, end.y) - arcElevation;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export const DottedMap = React.memo(
  ({ markers = [], className, dotRadius = 0.24, ...props }) => {
    const id = useId();
    const svgRef = useRef(null);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [mousePos, setMousePos] = useState({ x: -100, y: -100, active: false });
    // Detect touch device once
    const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    // ═══ ULTRA HIGH-PERFORMANCE PRECOMPUTED 1-PATH MAP ═══
    const { map, singlePathData, viewBox } = useMemo(() => {
      const m = new DottedMapClass({ height: 58, grid: "diagonal" });
      const pts = m.getPoints();
      let maxX = 0;
      let maxY = 0;

      let pathStr = "";
      for (let i = 0; i < pts.length; i++) {
        const px = pts[i].x;
        const py = pts[i].y;
        if (px > maxX) maxX = px;
        if (py > maxY) maxY = py;
        pathStr += `M ${px} ${py} m -${dotRadius},0 a ${dotRadius},${dotRadius} 0 1,0 ${
          dotRadius * 2
        },0 a ${dotRadius},${dotRadius} 0 1,0 -${dotRadius * 2},0 `;
      }

      return {
        map: m,
        singlePathData: pathStr,
        viewBox: `0 0 ${Math.ceil(maxX) + 6} ${Math.ceil(maxY) + 4}`,
      };
    }, [dotRadius]);

    // Compute dynamic flight arcs connecting India (Base) to destination hubs
    const { arcs } = useMemo(() => {
      const baseMarker = markers.find((m) => m.isBase) || markers[0];
      if (!baseMarker) return { arcs: [] };

      const bPin = map.getPin({ lat: baseMarker.lat, lng: baseMarker.lng });
      if (!bPin) return { arcs: [] };

      const generatedArcs = markers
        .filter((m) => !m.isBase)
        .map((m, idx) => {
          const destPin = map.getPin({ lat: m.lat, lng: m.lng });
          if (!destPin) return null;
          return {
            id: m.overlay?.countryCode || `arc-${idx}`,
            markerIndex: markers.indexOf(m),
            path: createArcPath(bPin, destPin),
            label: m.overlay?.label,
            start: bPin,
            end: destPin,
          };
        })
        .filter(Boolean);

      return { arcs: generatedArcs };
    }, [map, markers]);

    // Handle mouse movement for interactive radar spotlight (pointer:fine only)
    const handleMouseMove = (e) => {
      if (!svgRef.current || isTouchDevice) return;
      const rect = svgRef.current.getBoundingClientRect();
      const svgW = 127;
      const svgH = 62;
      const x = ((e.clientX - rect.left) / rect.width) * svgW;
      const y = ((e.clientY - rect.top) / rect.height) * svgH;
      setMousePos({ x, y, active: true });
    };

    const handleMouseLeave = () => {
      setMousePos((prev) => ({ ...prev, active: false }));
      if (!isTouchDevice) setHoveredMarker(null);
    };

    return (
      <div
        className={cn(
          "relative w-full overflow-hidden select-none group/map",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-auto max-h-[260px] sm:max-h-[400px] lg:max-h-[520px] transition-transform duration-500 ease-out"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Active Flight Arc Gradient */}
            <linearGradient
              id={`${id}-arc-gradient`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="1" />
            </linearGradient>

            {/* Glowing Hover Gradient */}
            <linearGradient
              id={`${id}-hover-arc-gradient`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
            </linearGradient>

            {/* Dynamic Cursor Spotlight Radial Mask */}
            <radialGradient
              id={`${id}-cursor-spotlight`}
              cx={mousePos.x}
              cy={mousePos.y}
              r="22"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Glow Filter */}
            <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ═══ 1. BASE DOTTED WORLD MAP ═══ */}
          <path
            d={singlePathData}
            fill="rgba(255, 255, 255, 0.28)"
            className="transition-colors duration-300 group-hover/map:fill-white/35"
          />

          {/* ═══ 2. INTERACTIVE CURSOR SPOTLIGHT ILLUMINATION ═══ */}
          {mousePos.active && (
            <path
              d={singlePathData}
              fill={`url(#${id}-cursor-spotlight)`}
              className="pointer-events-none transition-opacity duration-200"
            />
          )}

          {/* ═══ 3. DYNAMIC MOBILITY FLIGHT ARCS ═══ */}
          {arcs.map((arc) => {
            const isHovered = hoveredMarker === arc.markerIndex;

            return (
              <g key={arc.id}>
                {/* Arc Shadow Glow on Hover */}
                {isHovered && (
                  <path
                    d={arc.path}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    opacity={0.4}
                    filter={`url(#${id}-glow)`}
                  />
                )}

                {/* Primary Animated Flight Beam */}
                <path
                  d={arc.path}
                  fill="none"
                  stroke={
                    isHovered
                      ? `url(#${id}-hover-arc-gradient)`
                      : `url(#${id}-arc-gradient)`
                  }
                  strokeWidth={isHovered ? "0.45" : "0.24"}
                  strokeDasharray={isHovered ? "1.4 0.6" : "0.8 0.8"}
                  opacity={isHovered ? 1 : 0.65}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* ═══ 4. INTERACTIVE COUNTRY MARKERS & OVERLAYS ═══ */}
          {markers.map((marker, index) => {
            const pin = map.getPin({ lat: marker.lat, lng: marker.lng });
            if (!pin) return null;
            const { x, y } = pin;

            const isHovered = hoveredMarker === index;
            const clipId = `${id}-flag-clip-${index}`;
            const r = isHovered ? 1.7 : 1.3;
            const { countryCode, label } = marker.overlay || {};
            const flagUrl = `https://flagcdn.com/w80/${countryCode}.webp`;

            const pillH = isHovered ? 3.4 : 2.9;
            const pillW = label.length * (isHovered ? 0.95 : 0.88) + 4.2;
            const pillX = x + (isHovered ? 2.4 : 1.8);
            const pillY = y - pillH / 2;

            return (
              <g
                key={index}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => !isTouchDevice && setHoveredMarker(index)}
                onMouseLeave={() => !isTouchDevice && setHoveredMarker(null)}
                onClick={() => setHoveredMarker(hoveredMarker === index ? null : index)}
              >
                {/* Expanding Pulse Ring on Hover */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? r * 2.8 : r * 1.8}
                  fill="none"
                  stroke={
                    marker.isBase
                      ? isHovered
                        ? "rgba(52, 211, 153, 0.9)"
                        : "rgba(16, 185, 129, 0.4)"
                      : isHovered
                      ? "rgba(56, 189, 248, 0.95)"
                      : "rgba(59, 130, 246, 0.4)"
                  }
                  strokeWidth={isHovered ? "0.3" : "0.15"}
                  className={cn(
                    "transition-all duration-300",
                    isHovered && "animate-pulse"
                  )}
                />

                {/* Pin Base Ambient Glow Aura */}
                <circle
                  cx={x}
                  cy={y}
                  r={r + (isHovered ? 0.8 : 0.3)}
                  fill={
                    marker.isBase
                      ? isHovered
                        ? "rgba(16, 185, 129, 0.6)"
                        : "rgba(16, 185, 129, 0.25)"
                      : isHovered
                      ? "rgba(56, 189, 248, 0.65)"
                      : "rgba(59, 130, 246, 0.25)"
                  }
                  className="transition-all duration-300"
                />

                {/* Circular Flag Clip */}
                <clipPath id={clipId}>
                  <circle cx={x} cy={y} r={r} />
                </clipPath>

                {/* Flag Image with Lift Effect */}
                <image
                  href={flagUrl}
                  x={x - r}
                  y={y - r}
                  width={r * 2}
                  height={r * 2}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath={`url(#${clipId})`}
                  className="transition-all duration-300"
                />

                {/* Outer Flag Ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill="none"
                  stroke={isHovered ? "#60a5fa" : "#ffffff"}
                  strokeWidth={isHovered ? "0.35" : "0.22"}
                  className="transition-all duration-300"
                />

                {/* Interactive Location Badge Pill */}
                <rect
                  x={pillX}
                  y={pillY}
                  width={pillW}
                  height={pillH}
                  rx={pillH / 2}
                  fill={
                    isHovered
                      ? "rgba(15, 23, 42, 0.98)"
                      : "rgba(9, 9, 11, 0.92)"
                  }
                  stroke={
                    isHovered
                      ? marker.isBase
                        ? "rgba(52, 211, 153, 0.8)"
                        : "rgba(56, 189, 248, 0.85)"
                      : "rgba(255, 255, 255, 0.2)"
                  }
                  strokeWidth={isHovered ? "0.28" : "0.18"}
                  className="transition-all duration-300"
                />

                {/* Status Dot inside Pill */}
                <circle
                  cx={pillX + 1.6}
                  cy={y}
                  r={isHovered ? 0.5 : 0.35}
                  fill={marker.isBase ? "#34d399" : "#38bdf8"}
                  className={cn(isHovered && "animate-ping")}
                />

                {/* Text Label inside Pill */}
                <text
                  x={pillX + 2.8}
                  y={y + (isHovered ? 0.6 : 0.5)}
                  fontSize={isHovered ? 1.7 : 1.45}
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight={isHovered ? "700" : "600"}
                  fill={isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)"}
                  className="transition-all duration-300"
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  }
);

DottedMap.displayName = "DottedMap";
