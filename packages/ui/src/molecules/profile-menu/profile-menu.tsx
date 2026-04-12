'use client';

import * as React from 'react';
import { UserAvatar, type UserAvatarProps } from '@staamina/ui/user-avatar';
import { cn } from '@staamina/ui/utils';

function formatRoleName(roleName: string): string {
  const formatted = roleName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word, index) => {
      const lowerWord = word.toLowerCase();
      if (lowerWord === 'it' || lowerWord === 'id') {
        return word.toUpperCase();
      }
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

  return formatted.replace(/\s+/g, ' ').trim();
}

function getPrimaryRole(roles: string[]): string | null {
  if (!roles || roles.length === 0) {
    return null;
  }

  const priorityOrder = [
    'SuperAdministrator',
    'Administrator',
    'RegionalManager',
    'AreaManager',
    'SiteManager',
    'SiteDirector',
    'MerchandisingManager',
    'SiteItDigitalCoordinator',
    'SecurityCoordinator',
    'LossPrevention',
    'SiteLogisticsCoordinator',
    'SiteOperations',
    'SiteAssistant',
    'SiteStaff',
    'HeadquartersSiteSupport',
    'RetailOperations',
    'ExternalServiceProvider',
  ];

  for (const priorityRole of priorityOrder) {
    if (roles.includes(priorityRole)) {
      return priorityRole;
    }
  }

  return roles[0];
}

export interface ProfileMenuProps extends Omit<
  UserAvatarProps,
  'name' | 'email'
> {
  name?: string | null;
  email?: string;
  roles?: string[];
  showRole?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ProfileMenu = React.forwardRef<
  HTMLDivElement | HTMLButtonElement,
  ProfileMenuProps
>(
  (
    {
      name,
      email,
      roles = [],
      showRole = true,
      onClick,
      className,
      size = 'md',
      ...avatarProps
    },
    ref
  ) => {
    const primaryRole = getPrimaryRole(roles);
    const roleDisplayName = primaryRole ? formatRoleName(primaryRole) : null;

    const displayName = name || email || 'User';
    const Component = onClick ? 'button' : 'div';

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={cn(
          'flex w-full items-center gap-3 text-left',
          onClick &&
            'cursor-pointer rounded-md p-1 -m-1 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
          className
        )}
      >
        <UserAvatar
          name={name || undefined}
          email={email}
          size={size}
          {...avatarProps}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">
            {displayName}
          </p>
          {showRole && roleDisplayName && (
            <p className="truncate text-xs text-text-secondary">
              {roleDisplayName}
            </p>
          )}
        </div>
      </Component>
    );
  }
);

ProfileMenu.displayName = 'ProfileMenu';
