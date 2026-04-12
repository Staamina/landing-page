import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useThemeDetection,
  useIsDesktop,
  DESKTOP_BREAKPOINT,
} from '@staamina/ui/hooks';
import { Tooltip } from '@staamina/ui/tooltip';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { SidebarMenuItemComponent } from './sidebar-menu-item';
import { SidebarAdditionalItem } from './sidebar-additional-item';
import type { SidebarAdditionalItemConfig } from './sidebar-additional-item';

export interface SidebarMenuSection {
  title: string;
  items: SidebarMenuItem[];
}

export interface SidebarMenuItem {
  path?: string;
  label: string;
  icon: ReactNode;
  children?: SidebarMenuItem[];
  sections?: SidebarMenuSection[];
}

export function hasSubmenuContent(item: SidebarMenuItem): boolean {
  const hasChildren = item.children && item.children.length > 0;
  const hasSections = item.sections && item.sections.length > 0;
  return Boolean(hasChildren || hasSections);
}

export interface SidebarLayoutState {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  selectedMenuItem: SidebarMenuItem | null;
  onSelectMenuItem: (item: SidebarMenuItem | null) => void;
  showProfilePanel?: boolean;
  setShowProfilePanel?: (show: boolean) => void;
}

export type SidebarVariant = 'default' | 'superadmin';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: SidebarMenuItem[];
  copyrightText: string;
  logoUrl?: string;
  collapsedLogoUrl?: string;
  closeMenuLabel?: string;
  collapseMenuLabel?: string;
  additionalItems?: SidebarAdditionalItemConfig[];
  userProfileSection?: ReactNode;
  footerActions?: ReactNode;
  layoutState?: SidebarLayoutState | null;
  profileTrigger?: ReactNode;
  variant?: SidebarVariant;
  homePath?: string;
  headerBadge?: ReactNode;
}

export const Sidebar = ({
  isOpen,
  onClose,
  menuItems,
  copyrightText,
  logoUrl,
  collapsedLogoUrl,
  closeMenuLabel,
  collapseMenuLabel = 'Collapse menu',
  additionalItems,
  userProfileSection,
  footerActions,
  layoutState,
  profileTrigger,
  variant = 'default',
  homePath = '/',
  headerBadge,
}: SidebarProps) => {
  const { isDark: isDarkMode } = useThemeDetection();
  const isDesktop = useIsDesktop();
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();

  const collapsed = layoutState?.collapsed ?? false;
  const setCollapsed = layoutState?.onCollapsedChange;
  const selectedMenuItem = layoutState?.selectedMenuItem ?? null;
  const onSelectMenuItem = layoutState?.onSelectMenuItem;
  const useCollapsedMode = Boolean(layoutState && isDesktop);

  const defaultLogoUrl =
    variant === 'superadmin' || isDarkMode
      ? '/Stamina-HighContrast.svg'
      : '/Stamina.svg';
  const finalLogoUrl = logoUrl ?? defaultLogoUrl;
  const defaultCollapsedLogoUrl =
    variant === 'superadmin' || isDarkMode
      ? '/Stamina-Icon-HighContrast.svg'
      : '/Stamina-Icon.svg';
  const finalCollapsedLogoUrl = collapsedLogoUrl ?? defaultCollapsedLogoUrl;

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest('.sidebar-overlay')) {
          onClose();
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleMainItemClick = (item: SidebarMenuItem) => {
    layoutState?.setShowProfilePanel?.(false);
    if (hasSubmenuContent(item)) {
      onSelectMenuItem?.(item);
      setCollapsed?.(true);
      const firstChildPath =
        item.sections?.[0]?.items?.[0]?.path ?? item.children?.[0]?.path;
      if (firstChildPath && window.innerWidth < DESKTOP_BREAKPOINT) {
        navigate(firstChildPath);
        onClose();
      }
    } else if (item.path) {
      onSelectMenuItem?.(null);
      navigate(item.path);
      if (window.innerWidth < DESKTOP_BREAKPOINT) {
        onClose();
      }
    }
  };

  const isItemSelected = (item: SidebarMenuItem) =>
    selectedMenuItem === item ||
    (selectedMenuItem && selectedMenuItem.label === item.label);

  const isChildActive = (childPath?: string): boolean => {
    if (!childPath) return false;
    const [path, query] = childPath.split('?');
    const pathMatch = location.pathname === path;
    if (!pathMatch) return false;
    if (query) {
      const queryParams = new URLSearchParams(query);
      const currentParams = new URLSearchParams(location.search);
      for (const [key, value] of queryParams.entries()) {
        if (currentParams.get(key) !== value) return false;
      }
    }
    return true;
  };

  const showIconStrip = useCollapsedMode && collapsed;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen shadow-xl z-50 sidebar-container
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${useCollapsedMode && collapsed ? 'collapsed' : ''}
        `}
        data-variant={variant}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex items-center border-b border-border bg-surface min-h-(--layout-header-height) ${
              showIconStrip
                ? 'justify-center p-2'
                : 'justify-between p-md lg:justify-center'
            }`}
          >
            {showIconStrip ? (
              <>
                <Link
                  to={homePath}
                  onClick={() => {
                    if (window.innerWidth < DESKTOP_BREAKPOINT) onClose();
                    onSelectMenuItem?.(null);
                    layoutState?.setShowProfilePanel?.(false);
                  }}
                  className="hover:opacity-80 transition-opacity flex items-center justify-center w-12 h-12 shrink-0"
                  aria-label="Home"
                >
                  <img
                    src={finalCollapsedLogoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain object-center"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setCollapsed?.(false)}
                  className={`lg:hidden absolute right-2 p-2 rounded transition-colors ${
                    variant === 'superadmin'
                      ? 'sidebar-aux-button'
                      : 'text-text-secondary hover:text-text-primary hover:bg-hover'
                  }`}
                  aria-label={closeMenuLabel}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link
                  to={homePath}
                  onClick={() => {
                    if (window.innerWidth < DESKTOP_BREAKPOINT) onClose();
                    onSelectMenuItem?.(null);
                    layoutState?.setShowProfilePanel?.(false);
                    setExpandedMenuIndex(null);
                  }}
                  className={`hover:opacity-80 transition-opacity cursor-pointer h-full w-full flex ${
                    headerBadge ? 'flex-col items-start gap-1' : 'items-center'
                  }`}
                >
                  <img
                    src={finalLogoUrl}
                    alt="Logo"
                    className="h-9 w-64 max-w-full object-contain"
                  />
                  {headerBadge}
                </Link>
                <button
                  onClick={onClose}
                  className="lg:hidden p-sm rounded-md text-text-secondary hover:text-text-primary hover:bg-hover"
                  aria-label={closeMenuLabel}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>

          {showIconStrip ? (
            <>
              <nav className="flex-1 overflow-y-auto py-4 sidebar-scrollbar px-2">
                <ul className="space-y-1 flex flex-col items-center">
                  {menuItems.map((item, index) => (
                    <li key={item.path ?? `menu-${index}`} className="w-full">
                      {hasSubmenuContent(item) ? (
                        <Tooltip content={item.label} side="right">
                          <button
                            type="button"
                            onClick={() => handleMainItemClick(item)}
                            className={`w-full flex items-center justify-center p-2 rounded-lg sidebar-item transition-colors duration-200 ${
                              isItemSelected(item) ? 'active shadow-md' : ''
                            }`}
                            aria-label={item.label}
                            aria-current={
                              isItemSelected(item) ? 'true' : undefined
                            }
                          >
                            <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                              {item.icon}
                            </span>
                          </button>
                        </Tooltip>
                      ) : item.path ? (
                        <Tooltip content={item.label} side="right">
                          <NavLink
                            to={item.path}
                            onClick={() => {
                              onSelectMenuItem?.(null);
                              if (window.innerWidth < DESKTOP_BREAKPOINT)
                                onClose();
                            }}
                            className={({ isActive }) =>
                              `w-full flex items-center justify-center p-2 rounded-lg sidebar-item transition-colors duration-200 ${
                                isActive ? 'active shadow-md' : ''
                              }`
                            }
                            aria-label={item.label}
                          >
                            <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                              {item.icon}
                            </span>
                          </NavLink>
                        </Tooltip>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </nav>
              {userProfileSection && (
                <div className="sidebar-profile-section p-2 border-t border-border flex justify-center">
                  {showIconStrip &&
                  layoutState?.setShowProfilePanel &&
                  profileTrigger ? (
                    <Tooltip content="Profile" side="right">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectMenuItem?.(null);
                          layoutState?.setShowProfilePanel?.(true);
                          setCollapsed?.(true);
                        }}
                        className="w-full flex items-center justify-center p-2 rounded-lg sidebar-item transition-colors duration-200"
                        aria-label="Profile"
                      >
                        {profileTrigger}
                      </button>
                    </Tooltip>
                  ) : (
                    userProfileSection
                  )}
                </div>
              )}
              <div className="p-2 border-t border-border">
                <Tooltip content="Expand menu" side="right">
                  <button
                    type="button"
                    onClick={() => setCollapsed?.(false)}
                    className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer ${
                      variant === 'superadmin'
                        ? 'sidebar-aux-button'
                        : 'text-text-tertiary hover:text-text-primary hover:bg-hover'
                    }`}
                    aria-label="Expand menu"
                  >
                    <PanelLeftOpen className="w-5 h-5" />
                  </button>
                </Tooltip>
              </div>
              <div className="p-2 border-t border-border">
                <p
                  className={`text-[10px] text-center leading-tight ${
                    variant === 'superadmin'
                      ? 'sidebar-aux-text'
                      : 'text-text-tertiary'
                  }`}
                >
                  {copyrightText}
                </p>
              </div>
            </>
          ) : (
            <>
              <nav className="flex-1 overflow-y-auto py-4 sidebar-scrollbar">
                <ul className="space-y-1 px-2">
                  {menuItems.map((item, index) => (
                    <SidebarMenuItemComponent
                      key={item.path ?? `menu-${index}`}
                      item={item}
                      onClose={onClose}
                      isExpanded={expandedMenuIndex === index}
                      onExpandChange={(expanded) => {
                        setExpandedMenuIndex(expanded ? index : null);
                      }}
                      onItemClick={() => setExpandedMenuIndex(null)}
                      layoutContext={layoutState}
                      onMainItemClick={handleMainItemClick}
                      isChildActive={isChildActive}
                    />
                  ))}
                  {additionalItems?.map((additionalItem, index) => (
                    <SidebarAdditionalItem
                      key={additionalItem.path ?? additionalItem.label ?? index}
                      item={additionalItem}
                      onClose={onClose}
                    />
                  ))}
                </ul>
              </nav>
              {userProfileSection && (
                <div className="sidebar-profile-section p-md border-t border-border [&_button]:cursor-pointer">
                  {userProfileSection}
                </div>
              )}
              {footerActions && (
                <div className="px-md py-sm border-t border-border space-y-2">
                  {footerActions}
                </div>
              )}
              {useCollapsedMode && (
                <div className="p-md border-t border-border">
                  <button
                    type="button"
                    onClick={() => setCollapsed?.(true)}
                    className={`flex items-center gap-3 w-full rounded-lg p-2 text-left cursor-pointer transition-colors duration-200 ${
                      variant === 'superadmin'
                        ? 'sidebar-aux-button sidebar-item'
                        : 'sidebar-item text-text-tertiary hover:text-text-primary'
                    }`}
                    aria-label={collapseMenuLabel}
                  >
                    <PanelLeftClose className="h-5 w-5 shrink-0" />
                    <span className="text-sm font-medium">
                      {collapseMenuLabel}
                    </span>
                  </button>
                </div>
              )}
              <div className="p-md border-t border-border">
                <p
                  className={`text-xs text-center ${
                    variant === 'superadmin'
                      ? 'sidebar-aux-text'
                      : 'text-text-tertiary'
                  }`}
                >
                  {copyrightText}
                </p>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
};
