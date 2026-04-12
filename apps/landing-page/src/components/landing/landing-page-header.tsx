'use client';

import { Button } from '@staamina/ui/button';
import { Drawer } from '@staamina/ui/drawer';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/routing';

export function LandingPageHeader() {
  const t = useTranslations('common');
  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL || '/login';
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    setIsMenuOpen(false);
    window.location.href = loginUrl;
  };

  return (
    <header className="relative w-full border-b border-gray-800 bg-app overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,46,176,0.1),transparent_50%)]" />

      <div className="container mx-auto relative z-10 flex h-16 items-center px-4">
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          {mounted && (theme === 'light' || resolvedTheme === 'light') ? (
            <Image
              src="/Stamina.svg"
              alt="Staamina Logo"
              width={256}
              height={36}
              className="h-[28px] sm:h-[36px] w-auto max-w-[120px] sm:max-w-[256px] object-contain"
            />
          ) : (
            <Image
              src="/Stamina-HightContrast.png"
              alt="Staamina Logo"
              width={256}
              height={36}
              className="h-7 sm:h-9 w-auto max-w-30 sm:max-w-[256px] object-contain"
            />
          )}
        </Link>
        <div className="ml-auto">
          <nav className="hidden lg:flex items-center gap-4 shrink-0">
            <ThemeToggle />
            <LanguageSwitcher />
            <Button intent="primary" onClick={handleLogin}>
              {t('signIn')}
            </Button>
          </nav>
          <button
            className="lg:hidden flex items-center justify-center p-2 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Menu"
          >
            <Menu className="h-6 w-6 text-default" />
          </button>
        </div>
      </div>
      <Drawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        Title={t('menu')}
      >
        <div className="space-y-4 py-4">
          <div className="space-y-4 px-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">Theme</span>
              <ThemeToggle />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">
                {t('language')}
              </label>
              <LanguageSwitcher />
            </div>
          </div>
          <div className="px-4 pt-4 border-t border-gray-800">
            <Button intent="primary" onClick={handleLogin}>
              {t('signIn')}
            </Button>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
