'use client';

import { Select, SelectContent } from '@staamina/ui/select';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === locale || isPending) return;

    setIsPending(true);
    try {
      const response = await fetch('/api/locale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locale: newLocale }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error('Failed to change locale:', await response.text());
      }
    } catch (error) {
      console.error('Failed to change locale:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Select
      value={locale}
      onValueChange={handleLocaleChange}
      disabled={isPending}
    >
      <SelectPrimitive.Trigger className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none cursor-pointer">
        <Globe className="h-5 w-5 text-default" />
      </SelectPrimitive.Trigger>
      <SelectContent
        className="z-[200] min-w-0 w-12 !rounded-2xl overflow-hidden !p-1"
        align="center"
        sideOffset={6}
      >
        <SelectPrimitive.Item
          value="en"
          className="relative flex w-full cursor-default select-none items-center justify-center rounded-xl py-1 px-1 text-xs font-semibold outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
        >
          <SelectPrimitive.ItemText>EN</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
        <SelectPrimitive.Item
          value="fr"
          className="relative flex w-full cursor-default select-none items-center justify-center rounded-xl py-1 px-1 text-xs font-semibold outline-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
        >
          <SelectPrimitive.ItemText>FR</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
      </SelectContent>
    </Select>
  );
}
