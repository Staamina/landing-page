import { NavLink, useLocation } from 'react-router-dom';
import type { SidebarMenuItem } from './sidebar';
import { hasSubmenuContent } from './sidebar';

function isPathActive(
  targetPath: string,
  pathname: string,
  search: string
): boolean {
  const [path, query] = targetPath.split('?');
  if (pathname !== path) return false;
  if (!query) return true;
  const queryParams = new URLSearchParams(query);
  const currentParams = new URLSearchParams(search);
  for (const [key, value] of queryParams.entries()) {
    if (currentParams.get(key) !== value) return false;
  }
  return true;
}

export interface ModuleSubmenuProps {
  item: SidebarMenuItem | null;
  onItemClick?: () => void;
  className?: string;
}

export function ModuleSubmenu({
  item,
  onItemClick,
  className = '',
}: ModuleSubmenuProps) {
  const { pathname, search } = useLocation();

  if (!item || !hasSubmenuContent(item)) {
    return null;
  }

  const hasSections = item.sections && item.sections.length > 0;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        {item.label}
      </h2>

      {hasSections &&
        item.sections?.map((section) => (
          <section key={section.title} className="mb-6">
            <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((subItem) =>
                subItem.path ? (
                  <li key={subItem.path}>
                    <NavLink
                      to={subItem.path}
                      onClick={onItemClick}
                      className={() =>
                        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium sidebar-item transition-colors duration-200 ${
                          isPathActive(subItem.path ?? '', pathname, search)
                            ? 'active shadow-md'
                            : ''
                        }`
                      }
                    >
                      {subItem.icon && (
                        <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">
                          {subItem.icon}
                        </span>
                      )}
                      {subItem.label}
                    </NavLink>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        ))}

      {!hasSections && hasChildren && (
        <ul className="space-y-1">
          {item.children?.map((subItem) =>
            subItem.path ? (
              <li key={subItem.path}>
                <NavLink
                  to={subItem.path}
                  onClick={onItemClick}
                  className={() =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium sidebar-item transition-colors duration-200 ${
                      isPathActive(subItem.path ?? '', pathname, search)
                        ? 'active shadow-md'
                        : ''
                    }`
                  }
                >
                  {subItem.icon && (
                    <span className="shrink-0 [&>svg]:w-4 [&>svg]:h-4">
                      {subItem.icon}
                    </span>
                  )}
                  {subItem.label}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
}
