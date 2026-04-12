import * as React from 'react';

import { cn } from '@staamina/ui/utils';

export type ProgressBarVariant = 'success' | 'warning' | 'error' | 'brand';

export interface ProgressBarProps {
  /** Percentage value between 0 and 100 */
  value: number;
  /** Visual variant — defaults to 'brand' */
  variant?: ProgressBarVariant;
  /** Height class — defaults to 'h-1.5' */
  height?: string;
  className?: string;
}

const VARIANT_CLASSES: Record<ProgressBarVariant, string> = {
  success: 'bg-semantic-success',
  warning: 'bg-semantic-warning',
  error: 'bg-semantic-error',
  brand: 'bg-brand-primary',
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, variant = 'brand', height = 'h-1.5', className }, ref) => {
    const clampedValue = Math.max(0, Math.min(100, value));

    return (
      <div
        ref={ref}
        className={cn('w-full rounded-full bg-border', height, className)}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('rounded-full', height, VARIANT_CLASSES[variant])}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);
ProgressBar.displayName = 'ProgressBar';
