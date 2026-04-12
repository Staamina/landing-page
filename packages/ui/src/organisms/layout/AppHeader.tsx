import type { ReactNode } from 'react';
import { Menu } from 'lucide-react';
import { HeaderPortalTarget } from '@staamina/ui/header-portal';

export interface AppHeaderProps {
  onMenuClick?: () => void;
  children?: ReactNode;
}

export const AppHeader = ({ onMenuClick, children }: AppHeaderProps) => {
  if (children) {
    return (
      <header className="bg-background border-b px-4 sm:px-6 min-h-(--layout-header-height) flex items-center">
        {children}
      </header>
    );
  }

  const hasMenuClick = !!onMenuClick;

  return (
    <header className="bg-background border-b px-4 sm:px-6 min-h-(--layout-header-height) flex items-center justify-between w-full gap-4">
      <div className="flex items-center gap-2">
        <HeaderPortalTarget slot="left" className="flex items-center" />

        {hasMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-hover transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>

      <HeaderPortalTarget
        slot="right"
        className="flex items-center flex-1 min-w-0 justify-end"
      />
    </header>
  );
};
