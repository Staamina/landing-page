import * as React from 'react';
import { cn } from '@staamina/ui/utils';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('flex-1', className)} {...props} />;
  }
);
Page.displayName = 'Page';

export { Page };
