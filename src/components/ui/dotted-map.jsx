import React, { useId, useMemo } from "react";
import DottedMapClass from "dotted-map";
import { cn } from "@/lib/utils";

// Generates smooth quadratic bezier flight arc between two coordinates
const createArcPath = (start, end) => {
  const midX = (start.x + end.x) / 2;
  const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  const arcElevation = Math.min(22, Math.max(8, distance * 0.28));
  const midY = Math.min(start.y, end.y) - arcElevation;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export const DottedMap = React.memo(({
  markers = [],
  className,
  dotRadius = 0.22,
  ...props
}) => {
  const id = useId();

  // ═══ ULTRA HIGH-PERFORMANCE PRECOMPUTED 1-PATH MAP ═══
  // Combines 3,000+ points into 1 single SVG path for 120 FPS GPU rendering (0 DOM overhead)
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
      // Precomputed circle path for instant hardware rasterization
      pathStr += `M ${px} ${py} m -${dotRadius},0 a ${dotRadius},${dotRadius} 0 1,0 ${dotRadius * 2},0 a ${dotRadius},${dotRadius} 0 1,0 -${dotRadius * 2},0 `;
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
      .map((m) => {
        const destPin = map.getPin({ lat: m.lat, lng: m.lng });
        if (!destPin) return null;
        return {
          path: createArcPath(bPin, destPin),
          label: m.overlay?.label,
        };
      })
      .filter(Boolean);

    return { arcs: generatedArcs };
  }, [map, markers]);

  return (
    <div className={cn("relative w-full overflow-hidden select-none", className)} {...props}>
      <svg
        viewBox={viewBox}
        className="w-full h-auto max-h-[520px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${id}-arc-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* ═══ 1 SINGLE COMPILED PATH (ZERO LAG GPU ACCELERATED) ═══ */}
        <path
          d={singlePathData}
          fill="rgba(255, 255, 255, 0.42)"
        />

        {/* ═══ DYNAMIC MOBILITY FLIGHT ARCS ═══ */}
        {arcs.map((arc, i) => (
          <path
            key={i}
            d={arc.path}
            fill="none"
            stroke={`url(#${id}-arc-gradient)`}
            strokeWidth="0.28"
            strokeDasharray="0.8 0.8"
            opacity={0.8}
          />
        ))}

        {/* ═══ COUNTRY MARKERS & OVERLAYS ═══ */}
        {markers.map((marker, index) => {
          const pin = map.getPin({ lat: marker.lat, lng: marker.lng });
          if (!pin) return null;
          const { x, y } = pin;

          const clipId = `${id}-flag-clip-${index}`;
          const r = 1.3;
          const { countryCode, label } = marker.overlay || {};
          const flagUrl = `https://flagcdn.com/w80/${countryCode}.webp`;

          const fontSize = 1.5;
          const pillH = 2.9;
          const pillW = label.length * 0.88 + 3.6;
          const pillX = x + 1.8;
          const pillY = y - pillH / 2;

          return (
            <g key={index} className="cursor-pointer group">
              {/* Outer Pulse */}
              <circle
                cx={x}
                cy={y}
                r={r * 2}
                fill="none"
                stroke={marker.isBase ? "rgba(16, 185, 129, 0.5)" : "rgba(59, 130, 246, 0.45)"}
                strokeWidth="0.18"
              />

              {/* Pin Base Glow */}
              <circle
                cx={x}
                cy={y}
                r={r + 0.3}
                fill={marker.isBase ? "rgba(16, 185, 129, 0.35)" : "rgba(59, 130, 246, 0.35)"}
              />

              {/* Clip Path for Circular Flag */}
              <clipPath id={clipId}>
                <circle cx={x} cy={y} r={r} />
              </clipPath>

              {/* Flag Image */}
              <image
                href={flagUrl}
                x={x - r}
                y={y - r}
                width={r * 2}
                height={r * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
              />

              {/* Flag Outer Ring */}
              <circle
                cx={x}
                cy={y}
                r={r}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.22"
              />

              {/* Location Badge Pill */}
              <rect
                x={pillX}
                y={pillY}
                width={pillW}
                height={pillH}
                rx={pillH / 2}
                fill="rgba(9, 9, 11, 0.94)"
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="0.18"
              />
              <text
                x={pillX + 1.5}
                y={y + 0.5}
                fontSize={fontSize}
                fontFamily="Space Grotesk, sans-serif"
                fontWeight="600"
                fill="#ffffff"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
});

DottedMap.displayName = "DottedMap";
