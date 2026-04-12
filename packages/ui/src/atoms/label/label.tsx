'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

const LABEL_BASE_CLASSES = 'block text-sm font-medium text-text-secondary mb-1';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn(LABEL_BASE_CLASSES, className)} {...props} />
  )
);
Label.displayName = 'Label';

export { Label };
