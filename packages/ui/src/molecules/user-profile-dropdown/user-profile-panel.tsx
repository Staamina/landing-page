import { useThemeToggle } from '@staamina/ui/hooks';

import { Check, LogOut, Moon, Sun } from 'lucide-react';
import type {
  UserProfileDropdownLabels,
  UserProfileDropdownLanguage,
  UserProfileDropdownUser,
} from './user-profile-dropdown';
import { DEFAULT_LANGUAGES } from './user-profile-dropdown';
import { H3 } from '@staamina/ui/typography';

export interface UserProfilePanelProps {
  user: UserProfileDropdownUser;
  labels: UserProfileDropdownLabels;
  languages?: UserProfileDropdownLanguage[];
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
  signOut?: (redirectUri: string) => Promise<void>;
  onClose?: () => void;
  onLogout?: () => void | Promise<void>;
  className?: string;
}

function getDefaultRedirectUri(): string {
  if (typeof window === 'undefined') return '/';
  return `${window.location.origin}/`;
}

export function UserProfilePanel({
  user: _user,
  labels,
  languages = DEFAULT_LANGUAGES,
  currentLanguage,
  onLanguageChange,
  signOut,
  onClose,
  onLogout,
  className = '',
}: UserProfilePanelProps) {
  const { isDark, toggleTheme } = useThemeToggle();

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
    <div className={`min-w-0 overflow-hidden ${className}`}>
      <section className="mb-6">
        <H3 className="text-text-secondary uppercase mb-3">
          {labels.language}
        </H3>
        <ul className="space-y-1">
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                onClick={() => onLanguageChange(lang.code)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium sidebar-item transition-colors duration-200 w-full text-left min-w-0"
              >
                {lang.flag && (
                  <span className="text-base shrink-0">{lang.flag}</span>
                )}
                <span className="flex-1 min-w-0 wrap-break-word">
                  {lang.label}
                </span>
                {currentLanguage === lang.code && (
                  <Check className="w-4 h-4 shrink-0 text-brand-primary" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <H3 className="text-text-secondary uppercase mb-3">{labels.theme}</H3>
        <div className="flex items-center justify-between rounded-lg px-3 py-2 sidebar-item">
          <div className="flex items-center gap-2">
            {isDark ? (
              <Moon className="w-4 h-4 shrink-0 text-text-secondary" />
            ) : (
              <Sun className="w-4 h-4 shrink-0 text-text-secondary" />
            )}
            <span className="text-sm font-medium text-text-primary">
              {isDark ? 'Dark' : 'Light'}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
            style={{
              backgroundColor: isDark
                ? 'var(--switch-bg-checked, var(--color-primitive-green-500))'
                : 'var(--switch-bg, var(--color-primitive-neutral-200))',
            }}
            aria-label={
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            }
          >
            <span
              className="inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{
                transform: isDark ? 'translateX(1rem)' : 'translateX(0.125rem)',
              }}
            />
          </button>
        </div>
      </section>

      <section>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium w-full text-left text-semantic-error hover:bg-semantic-error-bg transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {labels.logout}
        </button>
      </section>
    </div>
  );
}
