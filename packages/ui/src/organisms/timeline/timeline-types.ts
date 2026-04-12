import { TimelineActorRole } from '@staamina/types';

export type TimelineEventType =
  | 'CREATED'
  | 'DRAFT_SAVED'
  | 'DRAFT_PUBLISHED'
  | 'DRAFT_DISCARDED'
  | 'ASSIGNED'
  | 'REASSIGNED'
  | 'UNASSIGNED'
  | 'RDV_PROPOSED'
  | 'RDV_CONFIRMED'
  | 'RDV_RESCHEDULED'
  | 'RDV_CANCELLED'
  | 'STARTED'
  | 'IN_PROGRESS'
  | 'PAUSED'
  | 'RESOLVED'
  | 'RESOLUTION_REJECTED'
  | 'RESOLUTION_DISPUTED'
  | 'VALIDATED'
  | 'VALIDATION_REJECTED'
  | 'CLOSED'
  | 'REOPENED'
  | 'COMMENT_ADDED'
  | 'ATTACHMENT_ADDED'
  | 'ATTACHMENT_REMOVED'
  | 'QUOTE_REQUESTED'
  | 'QUOTE_SUBMITTED'
  | 'QUOTE_APPROVED'
  | 'QUOTE_REJECTED'
  | 'STATUS_CHANGED'
  | 'PRIORITY_CHANGED'
  | 'METADATA_UPDATED'
  | 'RESOLUTION_TYPE_CHANGED';

export { TimelineActorRole };

export interface TimelineActor {
  id: string;
  name: string;
  role: TimelineActorRole;
  avatar?: string;
}

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  timestamp: Date;
  actor?: TimelineActor;
  content: string;
  metadata?: Record<string, unknown>;
}

export interface TimelineMessageAttachment {
  id: string;
  url: string;
  name: string;
  type: string;
}

export interface TimelineMessage {
  id: string;
  type: 'MESSAGE';
  timestamp: Date;
  author: TimelineActor;
  content: string;
  attachments?: TimelineMessageAttachment[];
}

export type TimelineItem = TimelineEvent | TimelineMessage;

export function isTimelineMessage(item: TimelineItem): item is TimelineMessage {
  return item.type === 'MESSAGE';
}

export function isTimelineEvent(item: TimelineItem): item is TimelineEvent {
  return item.type !== 'MESSAGE';
}
