'use client';

import * as React from 'react';
import { Loader2, Search, X } from 'lucide-react';

import { cn } from '@staamina/ui/utils';

export interface SearchInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  onClear?: () => void;
  isLoading?: boolean;
  showClearButton?: boolean;
  iconPosition?: 'left' | 'right' | 'none';
  containerClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      onClear,
      isLoading = false,
      showClearButton = true,
      iconPosition = 'left',
      containerClassName,
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasValue = value !== undefined && value !== '';

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const showLeftIcon = iconPosition === 'left';
    const showRightIcon = iconPosition === 'right';
    const showClear = showClearButton && hasValue && !isLoading && !disabled;

    return (
      <div className={cn('relative w-full', containerClassName)}>
        {showLeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="size-4 text-text-tertiary" aria-hidden="true" />
          </div>
        )}

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            'input-base w-full',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'bg-background placeholder:text-muted-foreground',
            '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
            className
          )}
          style={{
            paddingLeft: showLeftIcon ? '2.5rem' : undefined,
            paddingRight:
              showRightIcon || showClear || isLoading ? '2.5rem' : undefined,
          }}
          {...props}
        />

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 gap-1">
          {isLoading && (
            <Loader2
              className="size-4 animate-spin text-text-tertiary"
              aria-hidden="true"
            />
          )}

          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              className="flex size-5 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-hover hover:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}

          {showRightIcon && !showClear && !isLoading && (
            <Search className="size-4 text-text-tertiary" aria-hidden="true" />
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
