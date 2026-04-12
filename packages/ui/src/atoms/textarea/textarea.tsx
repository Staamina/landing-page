'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = HTMLTextareaProps & {
  isHighContrast?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isHighContrast, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full radius-input border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          isHighContrast
            ? 'bg-primitive-neutral-900 text-white placeholder:text-white/70 border-white/30 focus-visible:ring-white/50'
            : 'bg-background text-foreground',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
