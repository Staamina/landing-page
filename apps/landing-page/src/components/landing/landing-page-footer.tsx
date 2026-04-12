'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function LandingPageFooter() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-12 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
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
                  src="/Stamina-HighContrast.svg"
                  alt="Staamina Logo"
                  width={256}
                  height={36}
                  className="h-[28px] sm:h-[36px] w-auto max-w-[120px] sm:max-w-[256px] object-contain"
                />
              )}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tout ce qui fait fonctionner un Points De Ventes, enfin sous
              contrôle
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  href="/auth/signin"
                  className="hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Staamina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
