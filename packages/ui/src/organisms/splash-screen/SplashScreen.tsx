'use client';

import { FC } from 'react';

import { cn } from '@staamina/ui/utils';
import { useThemeDetection } from '@staamina/ui/hooks';

export interface SplashScreenProps {
  logoPath?: string;
  className?: string;
}

export const SplashScreen: FC<SplashScreenProps> = ({
  logoPath,
  className,
}) => {
  const { isDark: isDarkMode } = useThemeDetection();

  const defaultLogoPath = isDarkMode
    ? '/Stamina-HighContrast.svg'
    : '/Stamina.svg';

  const finalLogoPath = logoPath ?? defaultLogoPath;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-app h-full w-full',
        className
      )}
    >
      <div className="relative flex flex-col items-center">
        <div className="absolute inset-0 animate-pulse rounded-full bg-brand-primary/20 blur-3xl" />
        <img
          src={finalLogoPath}
          alt="Stamina Logo"
          className="h-48 w-48 animate-logo-entrance md:h-64 md:w-64"
        />
        <div className="mt-8 flex space-x-2 animate-fade-in-delayed">
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-primary [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-primary [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-brand-primary" />
        </div>
      </div>
    </div>
  );
};
