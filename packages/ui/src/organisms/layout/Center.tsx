import * as React from 'react';
import { cn } from '@staamina/ui/utils';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, inline = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          inline ? 'inline-flex' : 'flex',
          'items-center justify-center',
          className
        )}
        {...props}
      />
    );
  }
);
Center.displayName = 'Center';

export { Center };
