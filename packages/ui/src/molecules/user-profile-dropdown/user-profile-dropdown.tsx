import { useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@staamina/ui/menu';
import { UserAvatar } from '@staamina/ui/user-avatar';
import { useThemeToggle } from '@staamina/ui/hooks';
import { Check, ChevronRight, Globe, LogOut, Moon, Sun } from 'lucide-react';

export interface UserProfileDropdownUser {
  name?: string;
  email?: string;
  subtitle?: string;
}

export interface UserProfileDropdownLabels {
  language: string;
  theme: string;
  logout: string;
  userFallback: string;
  logoutError?: string;
}

export interface UserProfileDropdownLanguage {
  code: string;
  label: string;
  flag?: string;
}

export const DEFAULT_LANGUAGES: UserProfileDropdownLanguage[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export interface UserProfileDropdownProps {
  user: UserProfileDropdownUser;
  labels: UserProfileDropdownLabels;
  languages?: UserProfileDropdownLanguage[];
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
  signOut?: (redirectUri: string) => Promise<void>;
  onClose?: () => void;
  onLogout?: () => void | Promise<void>;
}

function getDefaultRedirectUri(): string {
  if (typeof window === 'undefined') return '/';
  return `${window.location.origin}/`;
}

const itemHighlightClasses =
  'group/item flex items-center gap-2 cursor-pointer pl-8 transition-all duration-150 hover:bg-hover data-[highlighted]:bg-hover';
const iconShrinkClasses = 'shrink-0';
const themeToggleTrackClasses =
  'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer';
const logoutItemClasses =
  'group/item flex items-center gap-2 py-2 transition-all duration-150 hover:bg-semantic-error-bg data-[highlighted]:bg-semantic-error-bg';
const logoutIconClasses =
  'w-4 h-4 shrink-0 transition-colors duration-150 group-hover/item:text-semantic-error';
const logoutTextClasses =
  'transition-colors duration-150 group-hover/item:text-semantic-error leading-none';

export function UserProfileDropdown({
  user,
  labels,
  languages = DEFAULT_LANGUAGES,
  currentLanguage,
  onLanguageChange,
  signOut,
  onClose,
  onLogout,
}: UserProfileDropdownProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { isDark, toggleTheme } = useThemeToggle();
  const displayName = user.name || user.email || labels.userFallback;

  const handlePointerDownOutside = (event: Event) => {
    const target = event.target as Node;
    if (triggerRef.current?.contains(target)) {
      event.preventDefault();
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
      return;
    }
    if (signOut && onClose) {
      try {
        onClose();
        await signOut(getDefaultRedirectUri());
      } catch {
        if (labels.logoutError) {
          alert(labels.logoutError);
        }
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="group w-full text-left rounded-md p-2 -m-2 transition-all duration-200 hover:bg-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-surface cursor-pointer"
          aria-label="User menu"
        >
          <div className="flex items-center gap-3 w-full">
            <UserAvatar
              name={user.name || undefined}
              email={user.email || undefined}
              size="lg"
              status="online"
              showStatus
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-text-primary truncate group-hover:text-text-primary transition-colors">
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56"
        onPointerDownOutside={handlePointerDownOutside}
      >
        <div className="py-1.5">
          <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-text-secondary">
            <Globe className={`w-4 h-4 ${iconShrinkClasses}`} />
            <span>{labels.language}</span>
          </div>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={itemHighlightClasses}
            >
              {lang.flag && (
                <span className="text-base shrink-0 flex items-center justify-center w-4 h-4 leading-none transition-transform duration-150 group-hover/item:scale-110">
                  {lang.flag}
                </span>
              )}
              <span className="flex-1 transition-colors duration-150 group-hover/item:text-text-primary leading-none">
                {lang.label}
              </span>
              {currentLanguage === lang.code && (
                <Check
                  className={`w-4 h-4 ${iconShrinkClasses} text-brand-primary transition-opacity duration-150`}
                />
              )}
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="py-1.5">
          <div className="group/item flex items-center justify-between px-2 py-1.5 rounded-sm transition-colors duration-150 hover:bg-hover">
            <div className="flex items-center gap-2">
              {isDark ? (
                <Moon
                  className={`w-4 h-4 ${iconShrinkClasses} text-text-secondary transition-colors duration-150 group-hover/item:text-text-primary`}
                />
              ) : (
                <Sun
                  className={`w-4 h-4 ${iconShrinkClasses} text-text-secondary transition-colors duration-150 group-hover/item:text-text-primary`}
                />
              )}
              <span className="text-sm font-medium text-text-primary transition-colors duration-150 leading-none">
                {isDark ? 'Dark' : 'Light'} {labels.theme}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className={themeToggleTrackClasses}
              style={{
                backgroundColor: isDark
                  ? 'var(--switch-bg-checked)'
                  : 'var(--switch-bg)',
              }}
              aria-label={
                isDark ? 'Switch to light theme' : 'Switch to dark theme'
              }
            >
              <span
                className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-all duration-200 shadow-sm"
                style={{
                  transform: isDark
                    ? 'translateX(1rem)'
                    : 'translateX(0.125rem)',
                }}
              />
            </button>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className={logoutItemClasses}>
          <LogOut className={logoutIconClasses} />
          <span className={logoutTextClasses}>{labels.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
