import { NavLink } from 'react-router-dom';
import type { ReactNode } from 'react';
import { DESKTOP_BREAKPOINT } from '@staamina/ui/hooks';

export type SidebarAdditionalItemVariant = 'default' | 'highlight';

export interface SidebarAdditionalItemConfig {
  path?: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: SidebarAdditionalItemVariant;
}

const BASE_LINK_CLASS =
  'flex items-center gap-3 rounded-lg sidebar-item transition-colors duration-200';

const HIGHLIGHT_ACTIVE_CLASS =
  'border-amber-500 bg-amber-600 text-white shadow-sm dark:bg-amber-700';
const HIGHLIGHT_INACTIVE_CLASS =
  'border-transparent bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/40';

export interface SidebarAdditionalItemProps {
  item: SidebarAdditionalItemConfig;
  onClose: () => void;
}

export function SidebarAdditionalItem({
  item,
  onClose,
}: SidebarAdditionalItemProps) {
  const handleClick = () => {
    if (window.innerWidth < DESKTOP_BREAKPOINT) {
      onClose();
    }
    item.onClick?.();
  };

  if (item.path !== undefined) {
    const isHighlight = item.variant === 'highlight';
    return (
      <li>
        <NavLink
          to={item.path}
          onClick={handleClick}
          className={({ isActive }) =>
            isHighlight
              ? `flex items-center gap-3 rounded-lg border-l-4 transition-colors duration-200 ${
                  isActive ? HIGHLIGHT_ACTIVE_CLASS : HIGHLIGHT_INACTIVE_CLASS
                }`
              : `${BASE_LINK_CLASS} ${isActive ? 'active shadow-md' : ''}`
          }
        >
          <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{item.icon}</span>
          <span className={`font-medium ${isHighlight ? 'truncate' : ''}`}>
            {item.label}
          </span>
        </NavLink>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleClick}
        className={`w-full ${BASE_LINK_CLASS} text-left`}
      >
        <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{item.icon}</span>
        <span className="font-medium">{item.label}</span>
      </button>
    </li>
  );
}
