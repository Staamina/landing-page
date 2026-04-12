'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

export interface GridLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

export const GridLayout = React.forwardRef<HTMLDivElement, GridLayoutProps>(
  ({ className, children, gap = 'md', ...props }, ref) => {
    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-col', gapClasses[gap], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GridLayout.displayName = 'GridLayout';

export interface GridRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
}

export const GridRow = React.forwardRef<HTMLDivElement, GridRowProps>(
  ({ className, children, gap = 'md', cols, ...props }, ref) => {
    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    const colsClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          cols ? colsClasses[cols] : '',
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GridRow.displayName = 'GridRow';

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
  ({ className, children, span, sm, md, lg, ...props }, ref) => {
    const spanClasses = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12',
    };

    const classes = [
      span && spanClasses[span],
      sm && `sm:${spanClasses[sm]}`,
      md && `md:${spanClasses[md]}`,
      lg && `lg:${spanClasses[lg]}`,
    ].filter(Boolean);

    return (
      <div ref={ref} className={cn(classes, className)} {...props}>
        {children}
      </div>
    );
  }
);
GridCol.displayName = 'GridCol';
