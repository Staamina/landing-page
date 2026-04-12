'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@staamina/ui/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-14 w-14 text-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const statusIndicatorVariants = cva(
  'absolute rounded-full border-2 border-white',
  {
    variants: {
      size: {
        xs: 'h-2 w-2 -bottom-0 -right-0',
        sm: 'h-2.5 w-2.5 -bottom-0.5 -right-0.5',
        md: 'h-3 w-3 -bottom-0.5 -right-0.5',
        lg: 'h-3.5 w-3.5 -bottom-0.5 -right-0.5',
        xl: 'h-4 w-4 -bottom-0.5 -right-0.5',
      },
      status: {
        online: 'bg-semantic-success',
        offline: 'bg-text-disabled',
        busy: 'bg-semantic-error',
        away: 'bg-semantic-warning',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'offline',
    },
  }
);

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'U';
  }

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return 'U';
  }

  if (parts.length === 1) {
    const firstPart = parts[0];
    return firstPart.length >= 2
      ? firstPart.substring(0, 2).toUpperCase()
      : firstPart.substring(0, 1).toUpperCase();
  }

  const first = parts[0][0] || '';
  const last = parts[parts.length - 1][0] || '';
  return (first + last).toUpperCase() || 'U';
}

export interface UserAvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string | null;
  alt?: string;
  name?: string;
  email?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  showStatus?: boolean;
  fallbackClassName?: string;
}

export const UserAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  UserAvatarProps
>(
  (
    {
      className,
      size,
      src,
      alt,
      name,
      email,
      status,
      showStatus = false,
      fallbackClassName,
      ...props
    },
    ref
  ) => {
    const displayName = name || email || 'U';
    const initials = getInitials(displayName);
    const altText = alt || name || email || 'User avatar';

    return (
      <div className="relative inline-flex">
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {src && (
            <AvatarPrimitive.Image
              src={src}
              alt={altText}
              className="aspect-square h-full w-full object-cover"
            />
          )}
          <AvatarPrimitive.Fallback
            className={cn(
              'flex h-full w-full items-center justify-center bg-brand-primary/20 text-brand-primary font-semibold',
              fallbackClassName
            )}
            delayMs={src ? 600 : 0}
          >
            {initials}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        {showStatus && status && (
          <span className={cn(statusIndicatorVariants({ size, status }))} />
        )}
      </div>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';

export interface UserAvatarWithInfoProps extends UserAvatarProps {
  subtitle?: string;
  onClick?: () => void;
  showChevron?: boolean;
}

export const UserAvatarWithInfo = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  UserAvatarWithInfoProps
>(
  (
    {
      name,
      email,
      subtitle,
      onClick,
      showChevron = false,
      className,
      ...avatarProps
    },
    ref
  ) => {
    const Component = onClick ? 'button' : 'div';

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 w-full text-left',
          onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
          className
        )}
      >
        <UserAvatar name={name} email={email} {...avatarProps} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-text-primary truncate">
            {name || email || 'User'}
          </p>
          {subtitle && (
            <p className="text-xs text-text-secondary truncate">{subtitle}</p>
          )}
        </div>
        {showChevron && (
          <svg
            className="w-4 h-4 text-text-tertiary flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </Component>
    );
  }
);

UserAvatarWithInfo.displayName = 'UserAvatarWithInfo';
