import {
  Plus,
  Save,
  Send,
  Trash2,
  User,
  UserCheck,
  UserX,
  Calendar,
  CalendarCheck,
  CalendarClock,
  CalendarX,
  Play,
  Clock,
  Pause,
  Wrench,
  Headphones,
  ArrowRightLeft,
  XCircle,
  AlertCircle,
  Check,
  CheckCircle,
  RefreshCw,
  MessageCircle,
  Paperclip,
  FileText,
  ArrowRight,
  ArrowUpDown,
  Edit,
  type LucideIcon,
} from 'lucide-react';
import type { TimelineEventType } from './timeline-types';

export interface EventConfig {
  icon: LucideIcon;
  colorClass: string;
  bgClass: string;
  label: string;
}

export const EVENT_CONFIG: Record<TimelineEventType, EventConfig> = {
  CREATED: {
    icon: Plus,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'Created',
  },
  DRAFT_SAVED: {
    icon: Save,
    colorClass: 'text-brand-tertiary',
    bgClass: 'bg-brand-tertiary/10',
    label: 'Draft Saved',
  },
  DRAFT_PUBLISHED: {
    icon: Send,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'Draft Published',
  },
  DRAFT_DISCARDED: {
    icon: Trash2,
    colorClass: 'text-semantic-error',
    bgClass: 'bg-semantic-error/10',
    label: 'Draft Discarded',
  },
  ASSIGNED: {
    icon: User,
    colorClass: 'text-brand-secondary',
    bgClass: 'bg-brand-secondary/10',
    label: 'Assigned',
  },
  REASSIGNED: {
    icon: UserCheck,
    colorClass: 'text-brand-secondary',
    bgClass: 'bg-brand-secondary/10',
    label: 'Reassigned',
  },
  UNASSIGNED: {
    icon: UserX,
    colorClass: 'text-gray-500',
    bgClass: 'bg-gray-500/10',
    label: 'Unassigned',
  },
  RDV_PROPOSED: {
    icon: Calendar,
    colorClass: 'text-brand-secondary',
    bgClass: 'bg-brand-secondary/10',
    label: 'Appointment Proposed',
  },
  RDV_CONFIRMED: {
    icon: CalendarCheck,
    colorClass: 'text-semantic-success',
    bgClass: 'bg-semantic-success/10',
    label: 'Appointment Confirmed',
  },
  RDV_RESCHEDULED: {
    icon: CalendarClock,
    colorClass: 'text-brand-secondary',
    bgClass: 'bg-brand-secondary/10',
    label: 'Appointment Rescheduled',
  },
  RDV_CANCELLED: {
    icon: CalendarX,
    colorClass: 'text-semantic-error',
    bgClass: 'bg-semantic-error/10',
    label: 'Appointment Cancelled',
  },
  STARTED: {
    icon: Play,
    colorClass: 'text-semantic-info',
    bgClass: 'bg-semantic-info/10',
    label: 'Started',
  },
  IN_PROGRESS: {
    icon: Clock,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'In Progress',
  },
  PAUSED: {
    icon: Pause,
    colorClass: 'text-gray-500',
    bgClass: 'bg-gray-500/10',
    label: 'Paused',
  },
  RESOLVED: {
    icon: Wrench,
    colorClass: 'text-semantic-info',
    bgClass: 'bg-semantic-info/10',
    label: 'Resolved',
  },
  RESOLUTION_REJECTED: {
    icon: XCircle,
    colorClass: 'text-semantic-error',
    bgClass: 'bg-semantic-error/10',
    label: 'Resolution Rejected',
  },
  RESOLUTION_DISPUTED: {
    icon: AlertCircle,
    colorClass: 'text-semantic-warning',
    bgClass: 'bg-semantic-warning/10',
    label: 'Resolution Disputed',
  },
  VALIDATED: {
    icon: Check,
    colorClass: 'text-semantic-success',
    bgClass: 'bg-semantic-success/10',
    label: 'Validated',
  },
  VALIDATION_REJECTED: {
    icon: XCircle,
    colorClass: 'text-semantic-error',
    bgClass: 'bg-semantic-error/10',
    label: 'Validation Rejected',
  },
  CLOSED: {
    icon: CheckCircle,
    colorClass: 'text-semantic-success',
    bgClass: 'bg-semantic-success/10',
    label: 'Closed',
  },
  REOPENED: {
    icon: RefreshCw,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'Reopened',
  },
  COMMENT_ADDED: {
    icon: MessageCircle,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'Comment Added',
  },
  ATTACHMENT_ADDED: {
    icon: Paperclip,
    colorClass: 'text-brand-tertiary',
    bgClass: 'bg-brand-tertiary/10',
    label: 'Attachment Added',
  },
  ATTACHMENT_REMOVED: {
    icon: Paperclip,
    colorClass: 'text-semantic-error',
    bgClass: 'bg-semantic-error/10',
    label: 'Attachment Removed',
  },
  QUOTE_REQUESTED: {
    icon: FileText,
    colorClass: 'text-brand-tertiary',
    bgClass: 'bg-brand-tertiary/10',
    label: 'Quote Requested',
  },
  QUOTE_SUBMITTED: {
    icon: FileText,
    colorClass: 'text-brand-tertiary',
    bgClass: 'bg-brand-tertiary/10',
    label: 'Quote Submitted',
  },
  QUOTE_APPROVED: {
    icon: CheckCircle,
    colorClass: 'text-semantic-success',
    bgClass: 'bg-semantic-success/10',
    label: 'Quote Approved',
  },
  QUOTE_REJECTED: {
    icon: XCircle,
    colorClass: 'text-semantic-error',
    bgClass: 'bg-semantic-error/10',
    label: 'Quote Rejected',
  },
  STATUS_CHANGED: {
    icon: ArrowRight,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'Status Changed',
  },
  PRIORITY_CHANGED: {
    icon: ArrowUpDown,
    colorClass: 'text-brand-primary',
    bgClass: 'bg-brand-primary/10',
    label: 'Priority Changed',
  },
  METADATA_UPDATED: {
    icon: Edit,
    colorClass: 'text-brand-tertiary',
    bgClass: 'bg-brand-tertiary/10',
    label: 'Metadata Updated',
  },
  RESOLUTION_TYPE_CHANGED: {
    icon: ArrowRightLeft,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-50',
    label: 'Resolution Type Changed',
  },
};

export function getEventConfig(type: TimelineEventType): EventConfig {
  return EVENT_CONFIG[type] || EVENT_CONFIG.CREATED;
}

export function getResolutionTypeConfig(
  resolutionType: string
): Pick<EventConfig, 'icon' | 'colorClass' | 'bgClass'> {
  if (resolutionType === 'REMOTE_SUPPORT') {
    return {
      icon: Headphones,
      colorClass: 'text-blue-400',
      bgClass: 'bg-blue-50',
    };
  }
  if (resolutionType === 'ON_SITE_INTERVENTION') {
    return {
      icon: Wrench,
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-50',
    };
  }
  return {
    icon: CheckCircle,
    colorClass: 'text-semantic-success',
    bgClass: 'bg-semantic-success/10',
  };
}
