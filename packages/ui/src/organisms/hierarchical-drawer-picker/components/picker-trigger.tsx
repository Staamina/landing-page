'use client';

import { cva } from 'class-variance-authority';
import { CheckCircle, ChevronRight, Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@staamina/ui/utils';

const triggerVariants = cva(
  'flex w-full min-w-0 max-w-full cursor-pointer items-center gap-3 rounded-lg border border-border-default bg-surface p-4 text-left transition-colors hover:border-border-hover hover:bg-hover disabled:cursor-not-allowed disabled:opacity-50'
);

const triggerValueVariants = cva(
  'mt-0.5 min-w-0 truncate text-base text-text-primary',
  {
    variants: {
      empty: {
        true: 'text-text-tertiary',
        false: '',
      },
    },
    defaultVariants: {
      empty: false,
    },
  }
);

export interface PickerTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className'
> {
  sectionLabel: string;
  sectionIcon?: React.ReactNode;
  valueLabel: string | null;
  placeholder?: string;
  className?: string;
  isComplete?: boolean;
}

export const PickerTrigger = React.forwardRef<
  HTMLButtonElement,
  PickerTriggerProps
>(
  (
    {
      sectionLabel,
      sectionIcon,
      valueLabel,
      placeholder = '',
      disabled = false,
      className,
      isComplete,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const displayValue = valueLabel ?? placeholder;
    const triggerLabel =
      ariaLabel ??
      (valueLabel ? `${sectionLabel}: ${valueLabel}` : sectionLabel);

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-label={triggerLabel}
        className={cn(triggerVariants(), className)}
        {...props}
      >
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-text-secondary">
            {sectionIcon && (
              <span className="flex shrink-0 text-text-tertiary" aria-hidden>
                {sectionIcon}
              </span>
            )}
            <span className="min-w-0 truncate">{sectionLabel}</span>
          </div>
          <div
            className={triggerValueVariants({ empty: !valueLabel })}
            title={displayValue || placeholder}
          >
            {displayValue || placeholder}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isComplete !== undefined &&
            (isComplete ? (
              <CheckCircle
                className="h-5 w-5 shrink-0 text-semantic-success"
                aria-label="Step complete"
              />
            ) : (
              <Circle
                className="h-5 w-5 shrink-0 text-text-disabled"
                aria-label="Step incomplete"
              />
            ))}
          <ChevronRight
            className="h-5 w-5 shrink-0 text-text-tertiary"
            aria-hidden
          />
        </div>
      </button>
    );
  }
);

PickerTrigger.displayName = 'PickerTrigger';
