'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

export interface ActionBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ActionBlock = React.forwardRef<HTMLDivElement, ActionBlockProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex justify-end flex-row gap-0.5 mb-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ActionBlock.displayName = 'ActionBlock';
