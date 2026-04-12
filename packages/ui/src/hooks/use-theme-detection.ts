import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'staamina-theme';

const hasThemeClass = (): Theme | null => {
  const dark =
    document.documentElement.classList.contains('dark') ||
    document.body.classList.contains('dark');
  if (dark) return 'dark';
  const light =
    document.documentElement.classList.contains('light') ||
    document.body.classList.contains('light');
  if (light) return 'light';
  return null;
};

const detectTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const themeClass = hasThemeClass();
  if (themeClass !== null) {
    return themeClass;
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

export function useThemeDetection() {
  const [theme, setTheme] = useState<Theme>(detectTheme);
  const [isDark, setIsDark] = useState<boolean>(() => detectTheme() === 'dark');

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = detectTheme();
      setTheme(currentTheme);
      setIsDark(currentTheme === 'dark');
    };

    updateTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateTheme);

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const storageListener = () => {
      updateTheme();
    };
    window.addEventListener('storage', storageListener);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
      observer.disconnect();
      window.removeEventListener('storage', storageListener);
    };
  }, []);

  return {
    theme,
    isDark,
  };
}
