import { ChevronRight } from 'lucide-react';
import { UserAvatar } from '@staamina/ui/user-avatar';
import type { UserProfileDropdownUser } from './user-profile-dropdown';

export interface UserProfileTriggerProps {
  user: UserProfileDropdownUser;
  userFallbackLabel: string;
  onOpenPanel: () => void;
}

const iconShrinkClasses = 'shrink-0';

export function UserProfileTrigger({
  user,
  userFallbackLabel,
  onOpenPanel,
}: UserProfileTriggerProps) {
  const displayName = user.name || user.email || userFallbackLabel;

  return (
    <button
      type="button"
      onClick={onOpenPanel}
      className="group w-full text-left rounded-md p-2 -m-2 transition-all duration-200 hover:bg-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-surface cursor-pointer"
      aria-label="User menu"
    >
      <div className="flex items-center gap-3 w-full">
        <UserAvatar
          name={user.name}
          email={user.email}
          size="sm"
          status="online"
          showStatus
        />
        <div className="flex-1 min-w-0">
          <p
            className="font-semibold text-sm text-text-primary truncate group-hover:text-text-primary transition-colors"
            title={displayName}
          >
            {displayName}
          </p>
          {user.subtitle && (
            <p className="text-xs text-text-secondary truncate group-hover:text-text-secondary transition-colors">
              {user.subtitle}
            </p>
          )}
        </div>
        <ChevronRight
          className={`w-4 h-4 text-text-tertiary ${iconShrinkClasses} group-hover:text-text-primary transition-all duration-200 group-hover:translate-x-0.5`}
        />
      </div>
    </button>
  );
}
