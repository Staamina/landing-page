import { Circle } from 'lucide-react';
import { cn } from '@staamina/ui/utils';

export enum CriticalityLevel {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

const CRITICALITY_COLORS: Record<CriticalityLevel, string> = {
  [CriticalityLevel.CRITICAL]: 'var(--color-primitive-red-400)',
  [CriticalityLevel.HIGH]: 'var(--color-primitive-amber-400)',
  [CriticalityLevel.MEDIUM]: 'var(--color-primitive-amber-200)',
  [CriticalityLevel.LOW]: 'var(--color-primitive-green-400)',
};

export interface CriticalityIndicatorProps {
  criticality: CriticalityLevel | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function CriticalityIndicator({
  criticality,
  size = 'md',
  className,
}: CriticalityIndicatorProps) {
  const color =
    CRITICALITY_COLORS[criticality as CriticalityLevel] ||
    'var(--color-primitive-neutral-500)';

  return (
    <Circle
      className={cn(SIZE_CLASSES[size], className)}
      style={{ fill: color, color: color }}
      aria-hidden="true"
    />
  );
}
