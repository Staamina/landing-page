import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@staamina/ui/utils';

const loaderVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      default: 'w-full h-full',
      centered: 'p-3xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface LoaderProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(loaderVariants({ variant }), className)}
        data-testid="loader"
        {...props}
      >
        <div className="flex space-x-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
        </div>
      </div>
    );
  }
);
Loader.displayName = 'Loader';
