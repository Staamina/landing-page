'use client';

import * as React from 'react';
import { cn } from '@staamina/ui/utils';
import { CardButton } from '@staamina/ui/card-button';

const CHECK_ICON = (
  <svg
    className="h-5 w-5 text-brand-primary"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export interface SelectableCardProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  isSelected?: boolean;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SelectableCard = React.forwardRef<
  HTMLButtonElement,
  SelectableCardProps
>(({ isSelected, trailing, children, className, ...props }, ref) => (
  <CardButton
    ref={ref}
    isSelected={isSelected}
    className={cn('items-start justify-between gap-3', className)}
    {...props}
  >
    <div className="flex min-w-0 flex-1 flex-col text-left">{children}</div>
    {(isSelected || trailing) && (
      <div className="flex flex-shrink-0 items-center">
        {isSelected ? CHECK_ICON : trailing}
      </div>
    )}
  </CardButton>
));

SelectableCard.displayName = 'SelectableCard';
