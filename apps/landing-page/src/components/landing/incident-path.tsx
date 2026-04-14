'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';

// ---- CONSTANTS ----

const PILL_H = 26;
const PILL_FONT = 10.5;
const PIN_GLOW_R = 15;
const PIN_RING_R = 10;
const PIN_FILL_R = 7;
const PIN_DOT_R = 2.5;
const LABEL_OFFSET = 28;

type LabelSide = 'top' | 'bottom' | 'left' | 'right';

interface PinConfig {
  cx: number;
  cy: number;
  side: LabelSide;
  isRegression?: boolean;
}

function pillWidth(text: string): number {
  return Math.max(72, text.length * 6.0 + 30);
}

function getPillPos(pin: PinConfig, label: string) {
  const pw = pillWidth(label);
  const o = LABEL_OFFSET;
  switch (pin.side) {
    case 'right':
      return {
        rx: pin.cx + o,
        ry: pin.cy - PILL_H / 2,
        tx: pin.cx + o + pw / 2,
        ty: pin.cy + 4,
        pw,
      };
    case 'left':
      return {
        rx: pin.cx - o - pw,
        ry: pin.cy - PILL_H / 2,
        tx: pin.cx - o - pw / 2,
        ty: pin.cy + 4,
        pw,
      };
    case 'top':
      return {
        rx: pin.cx - pw / 2,
        ry: pin.cy - o - PILL_H,
        tx: pin.cx,
        ty: pin.cy - o - PILL_H / 2 + 4,
        pw,
      };
    case 'bottom':
    default:
      return {
        rx: pin.cx - pw / 2,
        ry: pin.cy + o,
        tx: pin.cx,
        ty: pin.cy + o + PILL_H / 2 + 4,
        pw,
      };
  }
}

// ---- STRAIGHT (WITH STAAMINA) ----
// Diagonal road: bottom-left → top-right, 5 steps

const STRAIGHT_VIEWBOX = '0 0 600 560';
const STRAIGHT_D = 'M 80 480 L 520 60';
const STRAIGHT_COLOR = '#a78bfa';
const STRAIGHT_PINS: PinConfig[] = [
  { cx: 80,  cy: 480, side: 'right' },
  { cx: 190, cy: 375, side: 'left'  },
  { cx: 300, cy: 270, side: 'right' },
  { cx: 410, cy: 165, side: 'left'  },
  { cx: 520, cy: 60,  side: 'left'  },
];

// ---- ZIGZAG (WITHOUT STAAMINA) ----
// Serpentine road, 11 steps

const ZIGZAG_VIEWBOX = '0 0 560 780';
const ZIGZAG_D = [
  'M 75 90',
  'L 460 90',
  'Q 510 90 510 140',
  'L 510 240',
  'Q 510 290 460 290',
  'L 75 290',
  'Q 20 290 20 340',
  'L 20 440',
  'Q 20 490 75 490',
  'L 460 490',
  'Q 510 490 510 540',
  'L 510 630',
  'Q 510 680 460 680',
  'L 290 680',
].join(' ');
const ZIGZAG_COLOR = '#ef4444';
const REGRESSION_COLOR = '#f97316';

const ZIGZAG_PINS: PinConfig[] = [
  // Row 1 → going right
  { cx: 75,  cy: 90,  side: 'right' },
  { cx: 270, cy: 90,  side: 'top'   },
  { cx: 460, cy: 90,  side: 'left'  },
  // Row 2 ← going left (regression)
  { cx: 460, cy: 290, side: 'left',   isRegression: true },
  { cx: 270, cy: 290, side: 'bottom', isRegression: true },
  { cx: 75,  cy: 290, side: 'right',  isRegression: true },
  // Row 3 → going right
  { cx: 75,  cy: 490, side: 'right' },
  { cx: 270, cy: 490, side: 'top'   },
  { cx: 460, cy: 490, side: 'left'  },
  // Row 4 ← going left (end)
  { cx: 460, cy: 680, side: 'left',   isRegression: true },
  { cx: 290, cy: 680, side: 'bottom' },
];

export interface IncidentPathProps {
  variant: 'straight' | 'zigzag';
  steps: string[];
}

export function IncidentPath({ variant, steps }: IncidentPathProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const roadRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (roadRef.current) {
      setPathLength(roadRef.current.getTotalLength());
    }
  }, [variant]);

  const isStraight = variant === 'straight';
  const viewBox   = isStraight ? STRAIGHT_VIEWBOX : ZIGZAG_VIEWBOX;
  const pathD     = isStraight ? STRAIGHT_D : ZIGZAG_D;
  const pins      = isStraight ? STRAIGHT_PINS : ZIGZAG_PINS;
  const mainColor = isStraight ? STRAIGHT_COLOR : ZIGZAG_COLOR;
  const markerId  = `arrow-${variant}`;
  const dash      = pathLength || 9999;
  const drawDur   = isStraight ? '1.6s' : '2.8s';
  const dashFadeDelay = isStraight ? '1.3s' : '2.3s';

  const drawStyle = {
    strokeDasharray: dash,
    strokeDashoffset: isVisible ? 0 : dash,
    transition: `stroke-dashoffset ${drawDur} ease-in-out`,
  };

  return (
    <div ref={ref} className="w-full flex items-center justify-center py-4 px-2">
      <svg
        viewBox={viewBox}
        className="w-1/2 h-auto mx-auto"
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
            <polygon points="0 0, 10 3.5, 0 7" fill={mainColor} opacity={0.9} />
          </marker>
        </defs>

        {/* Road: outer shadow */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(0,0,0,0.55)"
          strokeWidth={isStraight ? 28 : 24}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={drawStyle}
        />

        {/* Road: dark asphalt body */}
        <path
          ref={roadRef}
          d={pathD}
          fill="none"
          stroke="#141424"
          strokeWidth={isStraight ? 22 : 18}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={drawStyle}
        />

        {/* Road: colored glow */}
        <path
          d={pathD}
          fill="none"
          stroke={mainColor}
          strokeWidth={isStraight ? 22 : 18}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.07}
          style={drawStyle}
        />

        {/* Road: dashed center line + arrowhead */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={1.8}
          strokeLinecap="butt"
          strokeDasharray="10 9"
          markerEnd={`url(#${markerId})`}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.7s ease ${dashFadeDelay}`,
          }}
        />

        {/* Pins + Labels */}
        {pins.map((pin, i) => {
          const label = steps[i] ?? '';
          const pinColor = pin.isRegression ? REGRESSION_COLOR : mainColor;
          const delay = `${0.5 + i * (isStraight ? 0.25 : 0.18)}s`;
          const pill = getPillPos(pin, label);

          return (
            <g
              key={i}
              style={{
                opacity: isVisible ? 1 : 0,
                transition: `opacity 0.4s ease ${delay}`,
              }}
            >
              {/* Outer glow ring */}
              <circle cx={pin.cx} cy={pin.cy} r={PIN_GLOW_R} fill={pinColor} opacity={0.18} />
              {/* Border ring */}
              <circle
                cx={pin.cx}
                cy={pin.cy}
                r={PIN_RING_R}
                fill="none"
                stroke={pinColor}
                strokeWidth={1.8}
                opacity={0.65}
              />
              {/* Solid fill */}
              <circle cx={pin.cx} cy={pin.cy} r={PIN_FILL_R} fill={pinColor} />
              {/* Inner dot */}
              <circle cx={pin.cx} cy={pin.cy} r={PIN_DOT_R} fill="white" opacity={0.9} />

              {/* Pill badge label */}
              <rect
                x={pill.rx}
                y={pill.ry}
                width={pill.pw}
                height={PILL_H}
                rx={13}
                fill="rgba(8,8,20,0.85)"
                stroke={pinColor}
                strokeWidth={1.5}
              />
              <text
                x={pill.tx}
                y={pill.ty}
                textAnchor="middle"
                fill={pin.isRegression ? REGRESSION_COLOR : 'rgba(255,255,255,0.88)'}
                fontSize={PILL_FONT}
                fontFamily="Helvetica, Arial, sans-serif"
                fontWeight={pin.isRegression ? '600' : '500'}
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
