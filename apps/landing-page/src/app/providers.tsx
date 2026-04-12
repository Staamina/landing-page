'use client';

import { ConfirmModalProvider } from '@staamina/ui/confirm-modal';
import { TranslationProvider } from '@staamina/ui/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as 'en' | 'fr';
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider locale={locale}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <ConfirmModalProvider>{children}</ConfirmModalProvider>
        </ThemeProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
}
