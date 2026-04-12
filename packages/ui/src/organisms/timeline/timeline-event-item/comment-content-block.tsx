import { useState } from 'react';
import { ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { cn } from '@staamina/ui/utils';
import { COMMENT_CONTENT_MAX_LENGTH } from './timeline-event-item.utils';
import type { CommentContentBlockProps } from './timeline-event-item.types';

export function CommentContentBlock({
  content,
  actorName,
}: CommentContentBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = content.length > COMMENT_CONTENT_MAX_LENGTH;
  const displayContent =
    shouldTruncate && !isExpanded
      ? content.slice(0, COMMENT_CONTENT_MAX_LENGTH)
      : content;

  const handleToggle = () => setIsExpanded(!isExpanded);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mt-2 relative">
      <div
        className={cn(
          'relative rounded-xl overflow-hidden transition-all duration-200',
          'bg-linear-to-br from-slate-50 via-white to-blue-50/30',
          'border border-border-default/60',
          'shadow-sm hover:shadow-md',
          shouldTruncate && 'cursor-pointer group'
        )}
        onClick={shouldTruncate ? handleToggle : undefined}
        role={shouldTruncate ? 'button' : undefined}
        tabIndex={shouldTruncate ? 0 : undefined}
        onKeyDown={shouldTruncate ? handleKeyDown : undefined}
        aria-expanded={shouldTruncate ? isExpanded : undefined}
      >
        <CommentAccentBar />

        <div className="pl-4 pr-3 py-3">
          <div className="flex items-start gap-2">
            <QuoteIcon />

            <div className="flex-1 min-w-0">
              {actorName && <ActorName name={actorName} />}

              <CommentText
                content={displayContent}
                shouldTruncate={shouldTruncate}
                isExpanded={isExpanded}
              />

              {shouldTruncate && <ExpandToggle isExpanded={isExpanded} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentAccentBar() {
  return (
    <div
      className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-brand-primary via-brand-primary/70 to-brand-primary/40 rounded-l-xl"
      aria-hidden="true"
    />
  );
}

function QuoteIcon() {
  return (
    <Quote
      className="w-4 h-4 mt-0.5 text-brand-primary/40 shrink-0 rotate-180"
      aria-hidden="true"
    />
  );
}

function ActorName({ name }: { name: string }) {
  return (
    <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase block mb-1.5">
      {name}
    </span>
  );
}

interface CommentTextProps {
  content: string;
  shouldTruncate: boolean;
  isExpanded: boolean;
}

function CommentText({
  content,
  shouldTruncate,
  isExpanded,
}: CommentTextProps) {
  return (
    <p
      className={cn(
        'text-sm text-text-secondary leading-relaxed',
        'font-medium',
        shouldTruncate && !isExpanded && 'line-clamp-2'
      )}
    >
      {content}
      {shouldTruncate && !isExpanded && (
        <span className="text-text-tertiary">...</span>
      )}
    </p>
  );
}

function ExpandToggle({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 mt-2 text-xs font-medium',
        'text-brand-primary/70 group-hover:text-brand-primary',
        'transition-colors duration-150'
      )}
    >
      {isExpanded ? (
        <>
          <ChevronUp className="w-3.5 h-3.5" />
          <span>Show less</span>
        </>
      ) : (
        <>
          <ChevronDown className="w-3.5 h-3.5" />
          <span>Show more</span>
        </>
      )}
    </div>
  );
}
