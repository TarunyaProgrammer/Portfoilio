import React, { useId, useMemo } from "react";
import DottedMapClass from "dotted-map";
import { cn } from "@/lib/utils";

// Generates smooth quadratic bezier flight arc between two coordinates
const createArcPath = (start, end) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - Math.abs(start.x - end.x) * 0.35;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export const DottedMap = ({
  markers = [],
  className,
  dotRadius = 0.22,
  ...props
}) => {
  const id = useId();

  // Create authentic geographic dotted world map from official dotted-map library
  const { map, points, viewBox } = useMemo(() => {
    const m = new DottedMapClass({ height: 58, grid: "diagonal" });
    const pts = m.getPoints();
    let maxX = 0;
    let maxY = 0;
    pts.forEach((p) => {
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    });
    return {
      map: m,
      points: pts,
      viewBox: `0 0 ${Math.ceil(maxX) + 6} ${Math.ceil(maxY) + 4}`,
    };
  }, []);

  // Compute pins for India, USA, UK
  const indiaPin = useMemo(() => map.getPin({ lat: 20.5937, lng: 78.9629 }), [map]);
  const usaPin = useMemo(() => map.getPin({ lat: 37.7749, lng: -122.4194 }), [map]);
  const ukPin = useMemo(() => map.getPin({ lat: 51.5074, lng: -0.1278 }), [map]);

  const arcIndiaToUSA = useMemo(() => {
    if (!indiaPin || !usaPin) return "";
    return createArcPath(indiaPin, usaPin);
  }, [indiaPin, usaPin]);

  const arcIndiaToUK = useMemo(() => {
    if (!indiaPin || !ukPin) return "";
    return createArcPath(indiaPin, ukPin);
  }, [indiaPin, ukPin]);

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

        {/* ═══ AUTHENTIC WORLD DOT MATRIX (3000+ GEOGRAPHIC DOTS) ═══ */}
        <g fill="rgba(255, 255, 255, 0.42)">
          {points.map((p, i) => (
            <circle
              key={`${p.x}-${p.y}-${i}`}
              cx={p.x}
              cy={p.y}
              r={dotRadius}
            />
          ))}
        </g>

        {/* ═══ CONNECTING MOBILITY FLIGHT ARCS ═══ */}
        {arcIndiaToUSA && (
          <path
            d={arcIndiaToUSA}
            fill="none"
            stroke={`url(#${id}-arc-gradient)`}
            strokeWidth="0.32"
            strokeDasharray="1 1"
            opacity={0.85}
          />
        )}

        {arcIndiaToUK && (
          <path
            d={arcIndiaToUK}
            fill="none"
            stroke={`url(#${id}-arc-gradient)`}
            strokeWidth="0.32"
            strokeDasharray="1 1"
            opacity={0.85}
          />
        )}

        {/* ═══ COUNTRY MARKERS & OVERLAYS ═══ */}
        {markers.map((marker, index) => {
          const pin = map.getPin({ lat: marker.lat, lng: marker.lng });
          if (!pin) return null;
          const { x, y } = pin;

          const clipId = `${id}-flag-clip-${index}`;
          const r = 1.35; // flag radius in SVG units
          const { countryCode, label } = marker.overlay || {};
          const flagUrl = `https://flagcdn.com/w80/${countryCode}.webp`;

          const fontSize = 1.55;
          const pillH = 3.0;
          const pillW = label.length * 0.92 + 3.8;
          const pillX = x + 2.0;
          const pillY = y - pillH / 2;

          return (
            <g key={index} className="cursor-pointer group">
              {/* Outer Pulse */}
              <circle
                cx={x}
                cy={y}
                r={r * 2.2}
                fill="none"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="0.18"
              />

              {/* Pin Base Glow */}
              <circle
                cx={x}
                cy={y}
                r={r + 0.35}
                fill="rgba(59, 130, 246, 0.35)"
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
                x={pillX + 1.6}
                y={y + 0.52}
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
};
