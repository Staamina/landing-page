import * as React from 'react';
import { cn } from '@staamina/ui/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('flex flex-col gap-6', className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export { Section };
