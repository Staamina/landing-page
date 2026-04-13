'use client';

import { Button } from '@staamina/ui/button';
import { Drawer } from '@staamina/ui/drawer';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/routing';

const navLinks = [
  { href: '#solution', labelKey: 'nav.solution' },
  { href: '#fonctionnalites', labelKey: 'nav.features' },
  { href: '#secteurs', labelKey: 'nav.sectors' },
  { href: '#faq', labelKey: 'nav.faq' },
  { href: '#contact', labelKey: 'nav.contact' },
];

export function LandingPageHeader() {
  const t = useTranslations('common');
  const loginUrl = process.env.NEXT_PUBLIC_LOGIN_URL || '/login';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsMenuOpen(false);
    window.location.href = loginUrl;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,46,176,0.1),transparent_50%)]" />

      <div className="container mx-auto relative z-10 flex h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity shrink-0"
        >
          <Image
            src="/Stamina-HightContrast.png"
            alt="Staamina Logo"
            width={256}
            height={36}
            className="h-9 sm:h-11 w-auto max-w-30 sm:max-w-[256px] object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-24 mx-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-text/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </nav>

        <div className="ml-auto lg:ml-0 shrink-0">
          <nav className="hidden lg:flex items-center gap-4">
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
          <nav className="px-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-text/70 hover:text-white transition-colors uppercase tracking-widest"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>
          <div className="space-y-4 px-4 border-t border-gray-800 pt-4">
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
