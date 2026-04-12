'use client';

import * as React from 'react';

import type {
  Language,
  UITranslations,
  TranslationContextValue,
} from './types';

import { defaultTranslations } from './default-translations';

const TranslationContext = React.createContext<
  TranslationContextValue | undefined
>(undefined);

interface TranslationProviderProps {
  children: React.ReactNode;
  locale?: Language;
  translations?: Partial<UITranslations>;
}

export function TranslationProvider({
  children,
  locale = 'en',
  translations,
}: TranslationProviderProps) {
  const defaultT = defaultTranslations[locale];

  const mergedTranslations: UITranslations = React.useMemo(() => {
    if (!translations) {
      return defaultT;
    }

    return {
      ui: {
        ...defaultT.ui,
        ...translations.ui,
      },
    };
  }, [defaultT, translations]);

  const value: TranslationContextValue = React.useMemo(
    () => ({
      locale,
      t: mergedTranslations,
    }),
    [locale, mergedTranslations]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextValue {
  const context = React.useContext(TranslationContext);

  if (context === undefined) {
    return {
      locale: 'en',
      t: defaultTranslations.en,
    };
  }

  return context;
}
