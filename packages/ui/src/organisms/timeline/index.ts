export { UnifiedTimeline } from './unified-timeline';
export type { UnifiedTimelineProps } from './unified-timeline';

export { TimelineEventItem, CommentContentBlock } from './timeline-event-item';
export type {
  TimelineEventItemProps,
  CommentContentBlockProps,
} from './timeline-event-item';

export { TimelineMessageItem } from './timeline-message-item';
export type { TimelineMessageItemProps } from './timeline-message-item';

export { TimelineConnector } from './timeline-connector';
export type { TimelineConnectorProps } from './timeline-connector';

export { MessageInput } from './message-input';
export type { MessageInputProps } from './message-input';

export { getEventConfig, EVENT_CONFIG } from './timeline-event-config';
export type { EventConfig } from './timeline-event-config';

export {
  isTimelineMessage,
  isTimelineEvent,
  TimelineActorRole,
} from './timeline-types';
export type {
  TimelineEventType,
  TimelineActor,
  TimelineEvent,
  TimelineMessage,
  TimelineMessageAttachment,
  TimelineItem,
} from './timeline-types';
