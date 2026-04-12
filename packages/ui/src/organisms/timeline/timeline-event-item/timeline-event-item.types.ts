import type { TimelineEvent } from '../timeline-types';

export interface TimelineEventItemProps {
  event: TimelineEvent;
  isLast?: boolean;
  className?: string;
}

export interface CommentContentBlockProps {
  content: string;
  actorName?: string;
}
