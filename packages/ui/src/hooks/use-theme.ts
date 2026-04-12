import { useThemeToggle } from './use-theme-toggle';

export function useTheme() {
  const toggle = useThemeToggle();

  return {
    theme: toggle.theme,
    isDark: toggle.isDark,
    setTheme: toggle.setTheme,
    toggleTheme: toggle.toggleTheme,
  };
}
