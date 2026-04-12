'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as Slot from '@radix-ui/react-slot';

import { cn } from '@staamina/ui/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold border',
  {
    variants: {
      variant: {
        neutral: 'badge-default',
        blue: 'badge-info',
        purple: 'badge-primary',
        yellow: 'badge-warning',
        green: 'badge-success',
        emerald: 'badge-success',
        red: 'badge-error',
        orange: 'badge-orange',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
);

export type BadgeVariant = NonNullable<
  VariantProps<typeof badgeVariants>['variant']
>;
export type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>['size']>;

export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, asChild = false, children, ...props },
    forwardedRef
  ) => {
    const mergedClassName = cn(badgeVariants({ variant, size }), className);
    if (asChild) {
      return (
        <Slot.Root ref={forwardedRef} className={mergedClassName} {...props}>
          {children}
        </Slot.Root>
      );
    }
    return (
      <span ref={forwardedRef} className={mergedClassName} {...props}>
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
