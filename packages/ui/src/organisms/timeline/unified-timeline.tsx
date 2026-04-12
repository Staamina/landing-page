import { cn } from '@staamina/ui/utils';
import { TimelineEventItem } from './timeline-event-item';
import { TimelineMessageItem } from './timeline-message-item';
import { MessageInput } from './message-input';
import { isTimelineMessage, type TimelineItem } from './timeline-types';
import { Inbox } from 'lucide-react';

export interface UnifiedTimelineProps {
  items: TimelineItem[];
  isLoading?: boolean;
  onSendMessage?: (content: string) => void;
  canSendMessage?: boolean;
  isSendingMessage?: boolean;
  messagePlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

function TimelineItemSkeleton() {
  return (
    <div className="relative flex gap-4 pb-6 animate-pulse">
      <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-border-default" />
      <div className="relative z-10 h-10 w-10 flex-shrink-0 rounded-full bg-border-default" />
      <div className="flex-1 pt-1 space-y-2">
        <div className="h-4 w-32 bg-border-default rounded" />
        <div className="h-3 w-48 bg-border-default rounded" />
        <div className="h-3 w-24 bg-border-default rounded" />
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-subtle">
        <Inbox className="h-8 w-8 text-text-disabled" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm text-text-tertiary">{message}</p>
    </div>
  );
}

export function UnifiedTimeline({
  items,
  isLoading = false,
  onSendMessage,
  canSendMessage = false,
  isSendingMessage = false,
  messagePlaceholder = 'Add a comment...',
  emptyMessage = 'No events yet',
  className,
}: UnifiedTimelineProps) {
  if (isLoading) {
    return (
      <div
        className={cn('space-y-0', className)}
        role="status"
        aria-label="Loading timeline"
      >
        <TimelineItemSkeleton />
        <TimelineItemSkeleton />
        <TimelineItemSkeleton />
      </div>
    );
  }

  const hasItems = items.length > 0;
  const showMessageInput = canSendMessage && onSendMessage;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex-1" role="list" aria-label="Timeline">
        {!hasItems ? (
          <EmptyState message={emptyMessage} />
        ) : (
          items.map((item, index) => {
            const isLast = index === items.length - 1 && !showMessageInput;

            if (isTimelineMessage(item)) {
              return (
                <TimelineMessageItem
                  key={item.id}
                  message={item}
                  isLast={isLast}
                />
              );
            }

            return (
              <TimelineEventItem key={item.id} event={item} isLast={isLast} />
            );
          })
        )}
      </div>

      {showMessageInput && (
        <div className="mt-4 pt-4 border-t border-border-default">
          <MessageInput
            onSend={onSendMessage}
            placeholder={messagePlaceholder}
            isLoading={isSendingMessage}
          />
        </div>
      )}
    </div>
  );
}
