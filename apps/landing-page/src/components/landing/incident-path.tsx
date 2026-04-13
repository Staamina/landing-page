'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface DotConfig {
  cx: number;
  cy: number;
  labelX: number;
  labelY: number;
  anchor: 'start' | 'middle' | 'end';
  isRegression?: boolean;
}

// ---- STRAIGHT PATH (WITH STAAMINA) ----
// 4 steps, clean left-to-right arrow
const STRAIGHT_VIEWBOX = '0 0 500 180';
const STRAIGHT_PATH_D = 'M 40 90 L 455 90';
const STRAIGHT_DOTS: DotConfig[] = [
  { cx: 40,  cy: 90, labelX: 40,  labelY: 68,  anchor: 'start' },
  { cx: 180, cy: 90, labelX: 180, labelY: 118, anchor: 'middle' },
  { cx: 320, cy: 90, labelX: 320, labelY: 68,  anchor: 'middle' },
  { cx: 460, cy: 90, labelX: 455, labelY: 118, anchor: 'end' },
];

// ---- ZIGZAG/SERPENTINE PATH (WITHOUT STAAMINA) ----
// 8 steps, serpentine — row 2 goes LEFT (regression), visually showing inefficiency
const ZIGZAG_VIEWBOX = '0 0 440 390';
const ZIGZAG_PATH_D =
  'M 60 70 L 380 70 L 380 190 L 60 190 L 60 310 L 380 310';
const ZIGZAG_DOTS: DotConfig[] = [
  { cx: 60,  cy: 70,  labelX: 65,  labelY: 50,  anchor: 'start' },
  { cx: 220, cy: 70,  labelX: 220, labelY: 50,  anchor: 'middle' },
  { cx: 380, cy: 70,  labelX: 375, labelY: 50,  anchor: 'end' },
  // Row 2 — going BACKWARDS (regression steps in orange)
  { cx: 380, cy: 190, labelX: 375, labelY: 215, anchor: 'end',    isRegression: true },
  { cx: 220, cy: 190, labelX: 220, labelY: 215, anchor: 'middle', isRegression: true },
  { cx: 60,  cy: 190, labelX: 65,  labelY: 215, anchor: 'start',  isRegression: true },
  // Row 3 — back on track
  { cx: 60,  cy: 310, labelX: 65,  labelY: 290, anchor: 'start' },
  { cx: 380, cy: 310, labelX: 375, labelY: 340, anchor: 'end' },
];

export interface IncidentPathProps {
  variant: 'straight' | 'zigzag';
  steps: string[];
}

export function IncidentPath({ variant, steps }: IncidentPathProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const pathRef = useRef<SVGPathElement>(null);
  // Start at 0 — path is hidden. After mount, we measure the real length.
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const isStraight = variant === 'straight';
  const viewBox = isStraight ? STRAIGHT_VIEWBOX : ZIGZAG_VIEWBOX;
  const pathD = isStraight ? STRAIGHT_PATH_D : ZIGZAG_PATH_D;
  const dots = isStraight ? STRAIGHT_DOTS : ZIGZAG_DOTS;

  // Purple for WITH, red for WITHOUT
  const pathColor = isStraight ? '#a78bfa' : '#ef4444';
  // Orange for regression steps
  const regressionColor = '#f97316';
  const markerId = `arrow-${variant}`;

  // dasharray/offset — hidden until measured, then animates on scroll
  const dash = pathLength || 9999;

  return (
    <div ref={ref} className="w-full flex items-center justify-center py-4 px-2">
      <svg
        viewBox={viewBox}
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <marker
            id={markerId}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={pathColor} opacity={0.85} />
          </marker>
        </defs>

        {/* Path */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke={pathColor}
          strokeWidth={isStraight ? 3 : 2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={`url(#${markerId})`}
          style={{
            strokeDasharray: dash,
            strokeDashoffset: isVisible ? 0 : dash,
            transition: `stroke-dashoffset ${isStraight ? 1.4 : 2.4}s ease-in-out`,
            opacity: 0.75,
          }}
        />

        {/* Dots + Labels */}
        {dots.map((dot, i) => {
          const label = steps[i] ?? '';
          const isReg = dot.isRegression ?? false;
          const dotColor = isReg ? regressionColor : pathColor;
          const delay = `${0.5 + i * 0.18}s`;

          return (
            <g
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.35s ease ${delay}`,
              }}
            >
              {/* Glow ring */}
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={isStraight ? 16 : 13}
                fill={dotColor}
                opacity={0.12}
              />
              {/* Outer ring */}
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={isStraight ? 10 : 8}
                fill="none"
                stroke={dotColor}
                strokeWidth={1.5}
                opacity={0.4}
              />
              {/* Filled dot */}
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={isStraight ? 7 : 6}
                fill={dotColor}
                opacity={0.9}
              />
              {/* Step number */}
              <text
                x={dot.cx}
                y={dot.cy + (isStraight ? 3.5 : 3)}
                textAnchor="middle"
                fill="white"
                fontSize={isStraight ? 8 : 7}
                fontWeight="700"
                fontFamily="Helvetica, Arial, sans-serif"
              >
                {i + 1}
              </text>
              {/* Label */}
              <text
                x={dot.labelX}
                y={dot.labelY}
                textAnchor={dot.anchor}
                fill={isReg ? regressionColor : 'rgba(255,255,255,0.75)'}
                fontSize={isStraight ? 13 : 11}
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight={isReg ? '600' : '400'}
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
