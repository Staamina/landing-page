'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@staamina/ui/utils';

export const iconBoxVariants = cva(
  'flex shrink-0 items-center justify-center rounded-lg bg-brand-primary/15 text-brand-primary dark:bg-brand-primary/25 [&>svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 [&>svg]:h-4 [&>svg]:w-4',
        md: 'h-10 w-10 [&>svg]:h-5 [&>svg]:w-5',
        lg: 'h-12 w-12 [&>svg]:h-6 [&>svg]:w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface IconBoxProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {
  children: React.ReactNode;
}

export const IconBox = React.forwardRef<HTMLDivElement, IconBoxProps>(
  ({ className, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(iconBoxVariants({ size }), className)}
      {...props}
    >
      {children}
    </div>
  )
);

IconBox.displayName = 'IconBox';
