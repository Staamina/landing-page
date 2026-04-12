import { cn } from '@staamina/ui/utils';

export interface HighlightTextProps {
  text: string;
  highlight: string;
  className?: string;
  highlightClassName?: string;
}

export function HighlightText({
  text,
  highlight,
  className,
  highlightClassName,
}: HighlightTextProps) {
  if (!highlight || !highlight.trim()) {
    return <span className={className}>{text}</span>;
  }

  const query = highlight.toLowerCase().trim();
  const lowerText = text.toLowerCase();
  const index = lowerText.indexOf(query);

  if (index === -1) {
    return <span className={className}>{text}</span>;
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  // If there are multiple occurrences? simple implementation only highlights first one as per
  // original implementation in category-search-result.tsx.
  // Actually, category-search-result.tsx only highlights ONE match.
  // "const index = lowerText.indexOf(lowerQuery);"
  // "const after = text.slice(index + query.length);"
  // If we want multiple, we need loop/split.
  // But let's stick to matching existing behavior first which is highlight first match.

  return (
    <span className={className}>
      {before}
      <mark className={cn('bg-highlight rounded px-0.5', highlightClassName)}>
        {match}
      </mark>
      {after}
    </span>
  );
}
