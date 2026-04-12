'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@staamina/ui/utils';

const buttonVariants = cva(
  'btn-base disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: '',
        secondary: '',
        tertiary: '',
        success: '',
        danger: '',
        alert: '',
        neutral: '',
      },
      appearance: {
        solid: '',
        outline: '',
        ghost: '',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        intent: 'primary',
        appearance: 'solid',
        class: 'btn-primary',
      },
      {
        intent: 'primary',
        appearance: 'outline',
        class: 'btn-outline text-brand-primary border-brand-primary',
      },
      {
        intent: 'primary',
        appearance: 'ghost',
        class: 'btn-ghost text-brand-primary',
      },
      {
        intent: 'secondary',
        appearance: 'solid',
        class: 'btn-secondary',
      },
      {
        intent: 'secondary',
        appearance: 'outline',
        class: 'btn-outline text-brand-secondary border-brand-secondary',
      },
      {
        intent: 'secondary',
        appearance: 'ghost',
        class: 'btn-ghost text-brand-secondary',
      },
      {
        intent: 'tertiary',
        appearance: 'solid',
        class: 'btn-tertiary',
      },
      {
        intent: 'tertiary',
        appearance: 'outline',
        class: 'btn-outline border-border text-text-secondary',
      },
      {
        intent: 'tertiary',
        appearance: 'ghost',
        class: 'btn-ghost text-text-secondary',
      },
      {
        intent: 'success',
        appearance: 'solid',
        class: 'btn-success',
      },
      {
        intent: 'success',
        appearance: 'outline',
        class: 'btn-outline border-semantic-success text-semantic-success',
      },
      {
        intent: 'success',
        appearance: 'ghost',
        class: 'btn-ghost text-semantic-success',
      },
      {
        intent: 'danger',
        appearance: 'solid',
        class: 'btn-destructive',
      },
      {
        intent: 'danger',
        appearance: 'outline',
        class: 'btn-outline border-semantic-error text-semantic-error',
      },
      {
        intent: 'danger',
        appearance: 'ghost',
        class: 'btn-ghost text-semantic-error',
      },
      {
        intent: 'alert',
        appearance: 'solid',
        class: 'btn-alert',
      },
      {
        intent: 'alert',
        appearance: 'outline',
        class: 'btn-outline border-semantic-warning text-semantic-warning',
      },
      {
        intent: 'alert',
        appearance: 'ghost',
        class: 'btn-ghost text-semantic-warning',
      },
      {
        intent: 'neutral',
        appearance: 'solid',
        class: 'btn-neutral',
      },
      {
        intent: 'neutral',
        appearance: 'outline',
        class: 'btn-outline border-text-secondary text-text-secondary',
      },
      {
        intent: 'neutral',
        appearance: 'ghost',
        class: 'btn-ghost text-text-secondary',
      },
    ],
    defaultVariants: {
      intent: 'neutral',
      appearance: 'solid',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  dataTestId?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, appearance, size, dataTestId, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ intent, appearance, size, className }))}
        ref={ref}
        data-testid={dataTestId}
        {...props}
      />
    );
  }
);

export { buttonVariants };
