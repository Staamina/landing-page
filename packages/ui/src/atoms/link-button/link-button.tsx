'use client';

import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@staamina/ui/button';
import { cn } from '@staamina/ui/utils';

export interface LinkButtonProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    VariantProps<typeof buttonVariants> {
  href: string;
  as?: React.ElementType;
  external?: boolean;
  className?: string;
  isHighContrast?: boolean;
}

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      intent,
      appearance,
      size,
      href,
      as,
      external = false,
      isHighContrast = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || 'a';
    const baseProps = external
      ? {
          href,
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : { href };

    return (
      <Component
        className={cn(
          buttonVariants({ intent, appearance, size }),
          'inline-flex items-center gap-2',
          isHighContrast
            ? 'bg-primitive-neutral-950 text-white hover:bg-primitive-neutral-900 border-white/30'
            : '',
          className
        )}
        ref={ref}
        {...baseProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
LinkButton.displayName = 'LinkButton';
