import { Globe } from 'lucide-react';
import * as React from 'react';

import { Button } from '@staamina/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@staamina/ui/menu';
import { cn } from '@staamina/ui/utils';

export interface LanguageOption {
  code: string;
  label: string;
  flag?: string;
}

export interface LanguageMenuProps {
  currentLanguage: string;
  languages: LanguageOption[];
  onLanguageChange: (languageCode: string) => void;
  className?: string;
  triggerClassName?: string;
  showFlag?: boolean;
  showLabel?: boolean;
}

export const LanguageMenu = React.forwardRef<
  HTMLButtonElement,
  LanguageMenuProps
>(
  (
    {
      currentLanguage,
      languages,
      onLanguageChange,
      className,
      triggerClassName,
      showFlag = false,
      showLabel = true,
    },
    ref
  ) => {
    const currentLang = languages.find((lang) => lang.code === currentLanguage);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            intent="neutral"
            appearance="ghost"
            size="default"
            className={cn('gap-2', triggerClassName)}
            aria-label="Select language"
          >
            <Globe className="h-4 w-4" />
            {showLabel && currentLang && (
              <span className="hidden sm:inline">{currentLang.label}</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={className}>
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                currentLanguage === lang.code && 'bg-accent'
              )}
            >
              {showFlag && lang.flag && (
                <span className="text-base">{lang.flag}</span>
              )}
              <span>{lang.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

LanguageMenu.displayName = 'LanguageMenu';
