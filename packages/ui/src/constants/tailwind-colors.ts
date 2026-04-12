/**
 * Tailwind default color palette (hex values).
 * Single source of truth for contexts where CSS variables cannot be used (e.g. Three.js).
 * Values aligned with @theme in tokens/theme.css.
 */
export const TAILWIND_COLORS = {
  indigo: {
    100: '#e0e7ff',
  },
  slate: {
    50: '#f8fafc',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
  },
  green: {
    400: '#4ade80',
  },
  blue: {
    500: '#3b82f6',
  },
  purple: {
    500: '#a855f7',
  },
  neutral: {
    950: '#0a0a0a',
  },
} as const;
