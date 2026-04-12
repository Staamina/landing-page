import { cn } from '@staamina/ui/utils';

export interface TimelineConnectorProps {
  className?: string;
}

export function TimelineConnector({ className }: TimelineConnectorProps) {
  return (
    <div
      className={cn(
        'absolute left-5 top-10 bottom-0 w-0.5 bg-border-default',
        className
      )}
      aria-hidden="true"
    />
  );
}
