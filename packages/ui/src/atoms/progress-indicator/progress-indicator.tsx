import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@staamina/ui/utils';

export interface ProgressIndicatorStep {
  id: string;
  label: string;
}

export interface ProgressIndicatorProgression {
  stepCompleted: boolean[];
  percentage: number;
}

export type ProgressIndicatorVariant =
  | 'full'
  | 'compact'
  | 'minimal'
  | 'responsive';

export interface ProgressIndicatorProps {
  steps: ProgressIndicatorStep[];
  progression: ProgressIndicatorProgression;
  className?: string;
  /** Optional aria-label for the progress bar (e.g. "Progress: 3 of 5 steps") */
  ariaLabel?: string;
  /** When true, bar fills only up to completed checkpoints (0, 20, 40...%). Default true. */
  checkpointBasedFill?: boolean;
  /**
   * Display variant:
   * - "full": bar + checkpoints + labels (for desktop/tablet)
   * - "compact": bar + checkpoints only, no labels (for mobile header)
   * - "responsive": auto-switches (compact on mobile, full on md+)
   * Default: "responsive"
   */
  variant?: ProgressIndicatorVariant;
}

const getCheckpointFillPercentage = (
  stepCompleted: boolean[],
  total: number
): number => {
  if (total === 0) return 0;
  const completedCount = stepCompleted.filter(Boolean).length;
  return (completedCount / total) * 100;
};

const getCurrentStepIndex = (
  stepCompleted: boolean[],
  total: number
): number => {
  const index = stepCompleted.findIndex((completed) => !completed);
  return index === -1 ? total - 1 : index;
};

const MinimalProgressIndicator = React.forwardRef<
  HTMLDivElement,
  { completedCount: number; total: number; label: string; className?: string }
>(({ completedCount, total, label, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-subtle border border-border-default',
      className
    )}
    role="progressbar"
    aria-valuenow={total > 0 ? Math.round((completedCount / total) * 100) : 0}
    aria-valuemax={100}
    aria-valuemin={0}
    aria-label={label}
  >
    <div
      className={cn(
        'w-2 h-2 rounded-full shrink-0 transition-colors duration-200',
        completedCount === total
          ? 'bg-semantic-success'
          : completedCount > 0
            ? 'bg-brand-primary'
            : 'bg-border-default'
      )}
    />
    <span className="text-xs font-medium text-text-secondary tabular-nums">
      {completedCount}/{total}
    </span>
  </div>
));
MinimalProgressIndicator.displayName = 'MinimalProgressIndicator';

const PROGRESS_TRACK_CLASS =
  'relative w-full overflow-hidden rounded-full bg-subtle border border-border-default/50';

const PROGRESS_INDICATOR_CLASS =
  'h-full w-full rounded-full bg-brand-primary transition-transform duration-300 ease-out';

export const ProgressIndicator = React.forwardRef<
  HTMLDivElement,
  ProgressIndicatorProps
>(
  (
    {
      steps,
      progression,
      className,
      ariaLabel,
      checkpointBasedFill = true,
      variant = 'responsive',
    },
    ref
  ) => {
    const { stepCompleted, percentage } = progression;
    const total = steps.length;
    const completedCount = stepCompleted.filter(Boolean).length;
    const fillPercentage =
      checkpointBasedFill && total > 0
        ? getCheckpointFillPercentage(stepCompleted, total)
        : percentage;
    const currentStepIndex = getCurrentStepIndex(stepCompleted, total);
    const label =
      ariaLabel ?? `Completion progress: ${completedCount}/${total}`;

    if (variant === 'minimal') {
      return (
        <MinimalProgressIndicator
          ref={ref}
          completedCount={completedCount}
          total={total}
          label={label}
          className={className}
        />
      );
    }

    const showLabels = variant === 'full' || variant === 'responsive';
    const labelsHiddenOnMobile = variant === 'responsive';

    return (
      <div
        ref={ref}
        className={cn('w-full flex flex-col', className)}
        role="group"
        aria-label={label}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <ProgressPrimitive.Root
              value={fillPercentage}
              max={100}
              getValueLabel={() => `${completedCount} of ${total} steps`}
              aria-label={label}
              className={cn(
                PROGRESS_TRACK_CLASS,
                variant === 'compact' ? 'h-2' : 'h-2 md:h-2.5'
              )}
            >
              <ProgressPrimitive.Indicator
                className={PROGRESS_INDICATOR_CLASS}
                style={{ transform: `translateX(-${100 - fillPercentage}%)` }}
              />
            </ProgressPrimitive.Root>
            {steps.map((_, index) => {
              const positionPercent =
                total > 0 ? ((index + 1) / total) * 100 : 0;
              const completed = stepCompleted[index] === true;
              const isCurrent = index === currentStepIndex;
              return (
                <div
                  key={steps[index].id}
                  className={cn(
                    'absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-all duration-200 top-1/2',
                    variant === 'compact'
                      ? 'w-3 h-3'
                      : 'w-3 h-3 md:w-3.5 md:h-3.5',
                    completed && 'bg-semantic-success',
                    isCurrent &&
                      !completed &&
                      'bg-brand-primary ring-2 ring-brand-primary/40 ring-offset-2 ring-offset-background-default',
                    !completed && !isCurrent && 'bg-border-default'
                  )}
                  style={{ left: `${positionPercent}%` }}
                  aria-hidden
                />
              );
            })}
          </div>
          <span
            className={cn(
              'font-semibold text-text-secondary tabular-nums shrink-0 min-w-10 text-right',
              variant === 'compact' ? 'text-xs' : 'text-xs md:text-sm'
            )}
          >
            {completedCount}/{total}
          </span>
        </div>
        {showLabels && (
          <div
            className={cn(
              'flex mt-2 gap-0.5',
              labelsHiddenOnMobile && 'hidden md:flex'
            )}
          >
            {steps.map((step, index) => {
              const completed = stepCompleted[index] === true;
              const isCurrent = index === currentStepIndex;
              return (
                <div
                  key={step.id}
                  className="flex-1 min-w-0 text-center"
                  aria-hidden
                >
                  <span
                    className={cn(
                      'text-xs truncate block px-0.5 transition-colors duration-150',
                      completed
                        ? 'text-text-primary font-medium'
                        : isCurrent
                          ? 'text-brand-primary font-semibold'
                          : 'text-text-muted'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
ProgressIndicator.displayName = 'ProgressIndicator';
