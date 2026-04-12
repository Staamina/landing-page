import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@staamina/ui/utils';

export interface H1Props extends HTMLAttributes<HTMLHeadingElement> {}

export const H1 = forwardRef<HTMLHeadingElement, H1Props>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('text-xl font-bold text-text-primary', className)}
      {...props}
    />
  )
);

export interface H2Props extends HTMLAttributes<HTMLHeadingElement> {}

export const H2 = forwardRef<HTMLHeadingElement, H2Props>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold text-text-primary', className)}
      {...props}
    />
  )
);

export interface H3Props extends HTMLAttributes<HTMLHeadingElement> {}

export const H3 = forwardRef<HTMLHeadingElement, H3Props>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-sm font-semibold text-text-primary', className)}
      {...props}
    />
  )
);

export interface SubtitleProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Subtitle = forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    />
  )
);
