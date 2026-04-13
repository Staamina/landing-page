'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

export function LandingPageFooter() {
  const t = useTranslations('landing.footer');
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full border-t border-white/10"
      style={{
        background:
          'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(109,40,217,0.12) 0%, transparent 70%), #000000',
      }}
    >
      {/* Top divider glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)',
        }}
      />

      <div className="container mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/Stamina-HightContrast.png"
                alt="Staamina Logo"
                width={180}
                height={28}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p
              className="text-sm text-white/50 leading-relaxed max-w-[22rem]"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              {t('tagline')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              {t('product.title')}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: t('product.solution'), href: '#solution' },
                { label: t('product.features'), href: '#fonctionnalites' },
                { label: t('product.sectors'), href: '#secteurs' },
                { label: t('product.signIn'), href: '/login' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/50 hover:text-[#a78bfa] transition-colors"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              {t('company.title')}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: t('company.faq'), href: '#faq' },
                { label: t('company.contact'), href: '#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/50 hover:text-[#a78bfa] transition-colors"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              {t('legal.title')}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: t('legal.privacy'), href: '#' },
                { label: t('legal.terms'), href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-white/50 hover:text-[#a78bfa] transition-colors"
                    style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-white/30"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            &copy; {year} Staamina. {t('copyright')}
          </p>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#a78bfa' }}
            />
            <span
              className="text-xs text-white/20"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Made with ♥ in Paris
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
