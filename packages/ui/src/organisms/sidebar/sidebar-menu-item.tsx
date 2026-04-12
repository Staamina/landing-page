import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DESKTOP_BREAKPOINT } from '@staamina/ui/hooks';
import type {
  SidebarMenuItem,
  SidebarMenuSection,
  SidebarLayoutState,
} from './sidebar';

export interface SidebarMenuItemProps {
  item: SidebarMenuItem;
  onClose: () => void;
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onItemClick: () => void;
  layoutContext: SidebarLayoutState | null | undefined;
  onMainItemClick: (item: SidebarMenuItem) => void;
  isChildActive: (childPath?: string) => boolean;
}

export function SidebarMenuItemComponent({
  item,
  onClose,
  isExpanded,
  onExpandChange,
  onItemClick,
  layoutContext,
  onMainItemClick,
  isChildActive,
}: SidebarMenuItemProps) {
  const navigate = useNavigate();
  const hasChildren = item.children && item.children.length > 0;
  const hasSections = item.sections && item.sections.length > 0;
  const hasSub = hasChildren || hasSections;

  const hasActiveChild = item.children?.some((child) =>
    isChildActive(child.path)
  );
  const hasActiveInSections = item.sections?.some(
    (section: SidebarMenuSection) =>
      section.items.some((sub) => isChildActive(sub.path))
  );

  useEffect(() => {
    if (!layoutContext && hasSub && (hasActiveChild || hasActiveInSections)) {
      onExpandChange(true);
    }
  }, [
    hasSub,
    hasActiveChild,
    hasActiveInSections,
    onExpandChange,
    layoutContext,
  ]);

  const handleParentClick = () => {
    if (layoutContext && hasSub) {
      onMainItemClick(item);
      return;
    }
    if (
      !isExpanded &&
      hasChildren &&
      item.children &&
      item.children.length > 0
    ) {
      const firstChild = item.children[0];
      if (firstChild.path) {
        navigate(firstChild.path);
        if (window.innerWidth < DESKTOP_BREAKPOINT) onClose();
      } else {
        onExpandChange(true);
      }
    }
  };

  if (hasSub) {
    return (
      <li className="relative">
        <button
          type="button"
          onClick={handleParentClick}
          className="w-full flex items-center justify-between gap-3 sidebar-item transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <span className="shrink-0">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
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
        </button>

        {isExpanded &&
          !layoutContext &&
          (hasSections ? (
            <div className="relative z-10 ml-md mt-xs border-l-2 border-border pl-sm space-y-4 bg-surface sidebar-submenu">
              {item.sections?.map((section) => (
                <ul key={section.title} className="space-y-xs">
                  <li className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-1">
                    {section.title}
                  </li>
                  {section.items.map((subItem) =>
                    subItem.path ? (
                      <li key={subItem.path}>
                        <NavLink
                          to={subItem.path}
                          onClick={() => {
                            if (window.innerWidth < DESKTOP_BREAKPOINT)
                              onClose();
                            onItemClick();
                          }}
                          className={({ isActive: _isActive }) =>
                            `flex items-center gap-3 sidebar-item transition-colors duration-200 ${
                              isChildActive(subItem.path)
                                ? 'active shadow-md'
                                : ''
                            }`
                          }
                        >
                          <span className="shrink-0">{subItem.icon}</span>
                          <span className="font-medium text-sm">
                            {subItem.label}
                          </span>
                        </NavLink>
                      </li>
                    ) : null
                  )}
                </ul>
              ))}
            </div>
          ) : (
            <ul className="relative z-10 ml-md mt-xs space-y-xs border-l-2 border-border pl-sm bg-surface sidebar-submenu">
              {item.children?.map((child) => (
                <li key={child.path}>
                  <NavLink
                    to={child.path || '#'}
                    onClick={() => {
                      if (window.innerWidth < DESKTOP_BREAKPOINT) onClose();
                      onItemClick();
                    }}
                    className={({ isActive: _isActive }) =>
                      `flex items-center gap-3 sidebar-item transition-colors duration-200 ${
                        isChildActive(child.path) ? 'active shadow-md' : ''
                      }`
                    }
                  >
                    <span className="shrink-0">{child.icon}</span>
                    <span className="font-medium text-sm">{child.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          ))}
      </li>
    );
  }

  if (!item.path) {
    return null;
  }

  return (
    <li>
      <NavLink
        to={item.path}
        onClick={() => {
          if (window.innerWidth < DESKTOP_BREAKPOINT) onClose();
          onItemClick();
          layoutContext?.onSelectMenuItem(null);
          layoutContext?.setShowProfilePanel?.(false);
        }}
        className={({ isActive }) =>
          `flex items-center gap-3 sidebar-item transition-colors duration-200 ${
            isActive ? 'active shadow-md' : ''
          }`
        }
      >
        <span className="shrink-0">{item.icon}</span>
        <span className="font-medium">{item.label}</span>
      </NavLink>
    </li>
  );
}
