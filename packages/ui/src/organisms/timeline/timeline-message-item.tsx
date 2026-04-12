import { MessageCircle, Paperclip } from 'lucide-react';
import { cn } from '@staamina/ui/utils';
import type { TimelineMessage } from './timeline-types';

export interface TimelineMessageItemProps {
  message: TimelineMessage;
  isLast?: boolean;
  className?: string;
}

function formatTimestamp(date: Date): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getRoleColor(role: string): string {
  switch (role) {
    case 'STORE':
      return 'bg-semantic-info';
    case 'TECHNICIAN':
      return 'bg-semantic-success';
    case 'HQ':
      return 'bg-brand-primary';
    default:
      return 'bg-text-secondary';
  }
}

export function TimelineMessageItem({
  message,
  isLast = false,
  className,
}: TimelineMessageItemProps) {
  const hasAttachments = message.attachments && message.attachments.length > 0;

  return (
    <div className={cn('relative flex gap-4 pb-6', className)}>
      {!isLast && (
        <div
          className="absolute left-5 top-10 bottom-0 w-0.5 bg-border-default"
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
        <MessageCircle
          className="h-5 w-5 text-brand-primary"
          aria-hidden="true"
        />
      </div>

      <div className="flex-1 min-w-0 pt-1">
        <div className="rounded-lg border border-border-default bg-surface p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                getRoleColor(message.author.role)
              )}
              aria-hidden="true"
            />
            <span className="font-medium text-sm text-text-primary">
              {message.author.name}
            </span>
            <span className="text-xs text-text-tertiary capitalize">
              ({message.author.role.toLowerCase()})
            </span>
          </div>

          <p className="text-sm text-text-secondary whitespace-pre-wrap">
            {message.content}
          </p>

          {hasAttachments && (
            <div className="mt-2 pt-2 border-t border-border-subtle">
              <div className="flex flex-wrap gap-2">
                {message.attachments?.map((attachment) => (
                  <a
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2 py-1 text-xs text-text-secondary bg-subtle rounded hover:bg-hover transition-colors"
                  >
                    <Paperclip className="h-3 w-3" aria-hidden="true" />
                    <span className="truncate max-w-[120px]">
                      {attachment.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <time className="mt-1 block text-xs text-text-tertiary">
          {formatTimestamp(message.timestamp)}
        </time>
      </div>
    </div>
  );
}
