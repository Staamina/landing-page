import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@staamina/ui/utils';

const alertVariants = cva('rounded-lg border px-4 py-3', {
  variants: {
    variant: {
      warning:
        'border-semantic-warning bg-semantic-warning-bg text-semantic-warning-dark',
      error:
        'border-semantic-error bg-semantic-error-bg text-semantic-error-dark',
      info: 'border-semantic-info bg-semantic-info-bg text-semantic-info-dark',
      success:
        'border-semantic-success bg-semantic-success-bg text-semantic-success-dark',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export type AlertVariant = NonNullable<
  VariantProps<typeof alertVariants>['variant']
>;

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('mt-1 text-sm', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
