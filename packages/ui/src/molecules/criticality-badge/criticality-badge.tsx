import {
  AlertCircle,
  AlertTriangle,
  Info,
  type LucideIcon,
  Minus,
} from 'lucide-react';
import type { BadgeVariant } from '@staamina/ui/badge';
import { Badge } from '@staamina/ui/badge';
import { cn } from '@staamina/ui/utils';

export type CriticalityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface CriticalityBadgeProps {
  criticality: CriticalityLevel | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Optional label override for i18n support */
  label?: string;
  /** Show icon alongside label */
  showIcon?: boolean;
}

const CRITICALITY_VARIANT: Record<CriticalityLevel, BadgeVariant> = {
  CRITICAL: 'red',
  HIGH: 'orange',
  MEDIUM: 'yellow',
  LOW: 'green',
};

const CRITICALITY_EXTRA_CLASSES: Record<
  CriticalityLevel,
  { border: string; pulse?: boolean }
> = {
  CRITICAL: { border: 'border-semantic-error-light', pulse: true },
  HIGH: { border: 'border-semantic-warning-light' },
  MEDIUM: { border: 'border-semantic-warning-lighter' },
  LOW: { border: 'border-semantic-success-light' },
};

const FALLBACK_EXTRA = { border: 'border-border-default' };

const CRITICALITY_ICON: Record<CriticalityLevel, LucideIcon> = {
  CRITICAL: AlertCircle,
  HIGH: AlertTriangle,
  MEDIUM: Info,
  LOW: Minus,
};

const CRITICALITY_LABELS: Record<CriticalityLevel, string> = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export function CriticalityBadge({
  criticality,
  size = 'md',
  className,
  label: labelOverride,
  showIcon = false,
}: CriticalityBadgeProps) {
  const upperCriticality = criticality.toUpperCase() as CriticalityLevel;
  const variant = CRITICALITY_VARIANT[upperCriticality] ?? 'neutral';
  const extra = CRITICALITY_EXTRA_CLASSES[upperCriticality] ?? FALLBACK_EXTRA;
  const Icon = CRITICALITY_ICON[upperCriticality] ?? Minus;
  const displayLabel =
    labelOverride || CRITICALITY_LABELS[upperCriticality] || criticality;

  return (
    <Badge
      variant={variant}
      size={size}
      className={cn(
        'uppercase tracking-wide',
        extra.border,
        extra.pulse && 'animate-pulse',
        className
      )}
    >
      {showIcon && <Icon className="mr-1 h-3 w-3" aria-hidden />}
      {displayLabel}
    </Badge>
  );
}
