import { type ReactNode } from 'react';
import { useIsDesktop } from '@staamina/ui/hooks';

export interface AppLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  sidebarCollapsed?: boolean;
  sidebarOpen?: boolean;
  submenu?: ReactNode;
  noPadding?: boolean;
  hideHeader?: boolean;
}

export const AppLayout = ({
  sidebar,
  header,
  children,
  sidebarCollapsed = false,
  sidebarOpen = true,
  submenu,
  noPadding = false,
  hideHeader = false,
}: AppLayoutProps) => {
  const isDesktop = useIsDesktop();
  const sidebarVisible = isDesktop || sidebarOpen;
  const contentMarginClass = sidebarVisible
    ? sidebarCollapsed
      ? 'ml-[var(--sidebar-width-collapsed)]'
      : 'ml-[var(--sidebar-width)]'
    : '';

  const hasSubmenu = Boolean(submenu);

  return (
    <div className="h-screen bg-app flex overflow-hidden flex-row">
      {sidebar}

      <div
        className={`flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-in-out ${contentMarginClass}`}
      >
        {!hideHeader && header}

        <main className="flex-1 flex min-w-0 min-h-0">
          {hasSubmenu && (
            <aside
              className="shrink-0 w-[var(--submenu-width)] min-h-0 min-w-0 border-r border-border bg-surface overflow-y-auto overflow-x-hidden"
              aria-label="Submenu"
            >
              <div className="p-4 sm:p-6">{submenu}</div>
            </aside>
          )}
          <div
            className={`flex-1 min-w-0 min-h-0 overflow-y-auto [scrollbar-gutter:stable] ${noPadding ? '' : 'px-4 sm:px-6 lg:px-8 py-6 lg:py-8'}`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
