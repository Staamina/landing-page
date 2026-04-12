import { cn } from '@staamina/ui/utils';
import {
  getEventConfig,
  getResolutionTypeConfig,
} from '../timeline-event-config';
import { CommentContentBlock } from './comment-content-block';
import { formatTimestamp } from './timeline-event-item.utils';
import type { TimelineEventItemProps } from './timeline-event-item.types';

export function TimelineEventItem({
  event,
  isLast = false,
  className,
}: TimelineEventItemProps) {
  const config = getEventConfig(event.type);
  const isComment = event.type === 'COMMENT_ADDED';
  const isResolved = event.type === 'RESOLVED';
  const isResolutionTypeChanged = event.type === 'RESOLUTION_TYPE_CHANGED';

  // For RESOLVED events, derive icon/color from resolution type metadata
  const resolutionType = isResolved
    ? (event.metadata?.resolutionType as string | undefined)
    : undefined;

  const {
    icon: Icon,
    colorClass,
    bgClass,
  } = resolutionType
    ? getResolutionTypeConfig(resolutionType)
    : {
        icon: config.icon,
        colorClass: config.colorClass,
        bgClass: config.bgClass,
      };

  const notes = isResolved
    ? (event.metadata?.notes as string | undefined)
    : undefined;

  const conversionReason = isResolutionTypeChanged
    ? (event.metadata?.reason as string | undefined)
    : undefined;

  return (
    <div className={cn('relative flex gap-4 pb-6', className)}>
      <TimelineConnectorLine isLast={isLast} />

      <EventIcon icon={Icon} bgClass={bgClass} colorClass={colorClass} />

      <div className="flex-1 min-w-0 pt-1">
        <EventHeader
          label={config.label}
          colorClass={colorClass}
          actorName={event.actor?.name}
          showActor={!isComment}
        />

        <EventContent
          content={event.content}
          isComment={isComment}
          actorName={event.actor?.name}
        />

        {notes && (
          <p className="mt-1 text-xs text-text-secondary italic border-l-2 border-border-subtle pl-2">
            {notes}
          </p>
        )}

        {conversionReason && (
          <p className="mt-1 text-xs text-text-secondary italic border-l-2 border-border-subtle pl-2">
            {conversionReason}
          </p>
        )}

        <time className="mt-1 block text-xs text-text-tertiary">
          {formatTimestamp(event.timestamp)}
        </time>
      </div>
    </div>
  );
}

function TimelineConnectorLine({ isLast }: { isLast: boolean }) {
  if (isLast) return null;

  return (
    <div
      className="absolute left-5 top-10 bottom-0 w-0.5 bg-border-default"
      aria-hidden="true"
    />
  );
}

interface EventIconProps {
  icon: React.ComponentType<{ className?: string }>;
  bgClass: string;
  colorClass: string;
}

function EventIcon({ icon: Icon, bgClass, colorClass }: EventIconProps) {
  return (
    <div
      className={cn(
        'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
        bgClass
      )}
    >
      <Icon className={cn('h-5 w-5', colorClass)} aria-hidden="true" />
    </div>
  );
}

interface EventHeaderProps {
  label: string;
  colorClass: string;
  actorName?: string;
  showActor: boolean;
}

function EventHeader({
  label,
  colorClass,
  actorName,
  showActor,
}: EventHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={cn('font-medium text-sm', colorClass)}>{label}</span>
      {actorName && showActor && (
        <span className="text-sm text-text-secondary">by {actorName}</span>
      )}
    </div>
  );
}

interface EventContentProps {
  content?: string;
  isComment: boolean;
  actorName?: string;
}

function EventContent({ content, isComment, actorName }: EventContentProps) {
  if (!content) return null;

  if (isComment) {
    return <CommentContentBlock content={content} actorName={actorName} />;
  }

  return <p className="mt-1 text-sm text-text-secondary">{content}</p>;
}
