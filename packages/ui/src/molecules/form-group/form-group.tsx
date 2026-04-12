'use client';

import * as React from 'react';

import { cn } from '@staamina/ui/utils';

type FieldError = {
  message?: string;
};

type FieldErrors<T> = {
  [K in keyof T]?: T[K] extends object ? FieldErrors<T[K]> : FieldError;
};

function getNestedError(
  errors: FieldErrors<unknown> | undefined,
  name: string
): FieldError | undefined {
  if (!errors || !name) return undefined;

  const parts = name.split('.');
  let current: unknown = errors;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }

  return current && typeof current === 'object' && 'message' in current
    ? (current as FieldError)
    : undefined;
}

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  name?: string;
  errors?: FieldErrors<unknown>;
  isRequired?: boolean;
  children: React.ReactNode;
}

function getNameForId(name: string | undefined): string | undefined {
  if (!name) return undefined;
  const parts = name.split('.');
  return parts[parts.length - 1];
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, label, name, errors, isRequired, children, ...props }, ref) => {
    const error = name ? getNestedError(errors, name) : undefined;
    const htmlFor = getNameForId(name);

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-sm', className)}
        {...props}
      >
        {label && (
          <label
            htmlFor={htmlFor}
            className="text-sm font-medium text-text-primary"
          >
            {label}
            {isRequired && <span className="text-semantic-error ml-xs">*</span>}
          </label>
        )}
        {children}
        {error?.message && (
          <p className="mt-xs text-sm text-semantic-error">{error.message}</p>
        )}
      </div>
    );
  }
);
FormGroup.displayName = 'FormGroup';
