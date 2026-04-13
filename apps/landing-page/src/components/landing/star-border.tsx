'use client';

import { cn } from '@staamina/ui/utils';
import { Link } from '@/i18n/routing';
import type { ComponentPropsWithoutRef } from 'react';

interface StarBorderLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  color?: string;
  speed?: string;
  thickness?: number;
  className?: string;
  innerClassName?: string;
}

export function StarBorderLink({
  color = '#a78bfa',
  speed = '6s',
  thickness = 1,
  className,
  innerClassName,
  children,
  ...rest
}: StarBorderLinkProps) {
  return (
    <Link
      className={cn('star-border-container', className)}
      style={{ padding: `${thickness}px 0` }}
      {...rest}
    >
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />
      <div className={cn('star-inner-content', innerClassName)}>{children}</div>
    </Link>
  );
}
