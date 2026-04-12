'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

// eslint-disable-next-line max-len
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isHighContrast?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isHighContrast, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'input-base file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
          isHighContrast
            ? 'bg-text-primary text-text-inverse placeholder:text-text-inverse/70 border-text-inverse/30 focus-visible:ring-text-inverse/50'
            : 'bg-background placeholder:text-muted-foreground',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
