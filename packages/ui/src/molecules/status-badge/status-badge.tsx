import { Badge } from '@staamina/ui/badge';
import type { BadgeVariant } from '@staamina/ui/badge';

export type IncidentStatusType =
  | 'NEW'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'VALIDATED'
  | 'CLOSED'
  | 'REJECTED'
  | 'DISPUTED'
  | 'CANCELLED'
  | 'ABANDONED';

export interface StatusBadgeProps {
  status: IncidentStatusType | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Optional label override for i18n support */
  label?: string;
}

const STATUS_VARIANT: Record<IncidentStatusType, BadgeVariant> = {
  NEW: 'blue',
  ASSIGNED: 'purple',
  IN_PROGRESS: 'yellow',
  RESOLVED: 'green',
  VALIDATED: 'emerald',
  CLOSED: 'neutral',
  REJECTED: 'red',
  DISPUTED: 'orange',
  CANCELLED: 'neutral',
  ABANDONED: 'neutral',
};

const STATUS_LABELS: Record<IncidentStatusType, string> = {
  NEW: 'New',
  ASSIGNED: 'Assigned',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  VALIDATED: 'Validated',
  CLOSED: 'Closed',
  REJECTED: 'Rejected',
  DISPUTED: 'Disputed',
  CANCELLED: 'Cancelled',
  ABANDONED: 'Abandoned',
};

export function StatusBadge({
  status,
  size = 'md',
  className,
  label: labelOverride,
}: StatusBadgeProps) {
  const upperStatus = status
    .toUpperCase()
    .replace(/-/g, '_') as IncidentStatusType;
  const variant = STATUS_VARIANT[upperStatus] ?? 'neutral';
  const displayLabel =
    labelOverride || STATUS_LABELS[upperStatus] || status.replace(/_/g, ' ');

  return (
    <Badge variant={variant} size={size} className={className}>
      {displayLabel}
    </Badge>
  );
}
