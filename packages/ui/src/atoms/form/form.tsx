'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

export interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FORM_BASE_CLASSES = 'flex flex-col gap-md';

export const Form = React.forwardRef<HTMLDivElement, FormProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn(FORM_BASE_CLASSES, className)} {...props} />
  )
);
Form.displayName = 'Form';
