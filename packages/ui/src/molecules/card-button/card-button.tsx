'use client';

import * as React from 'react';
import { cn } from '@staamina/ui/utils';

export type CardButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected?: boolean;
};

export const CardButton = React.forwardRef<HTMLButtonElement, CardButtonProps>(
  ({ className, isSelected, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex w-full cursor-pointer items-center border text-left transition-all p-3 radius-input',
          isSelected
            ? 'border-2 border-brand-primary bg-brand-primary/5'
            : 'border-border bg-surface hover:border-border-hover hover:bg-hover',
          className
        )}
        aria-pressed={isSelected}
        {...props}
      >
        {children}
      </button>
    );
  }
);
CardButton.displayName = 'CardButton';
