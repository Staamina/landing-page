import * as React from 'react';

import { useTranslation } from '@staamina/ui/i18n';
import { cn } from '@staamina/ui/utils';

export interface AutocompleteOption<T = unknown> {
  value: string;
  label: string;
  data?: T;
}

export interface AutocompleteProps<T = unknown> {
  options: AutocompleteOption<T>[];
  value: string;
  onChange: (value: string) => void;
  onSelect?: (option: AutocompleteOption<T>) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  renderOption?: (option: AutocompleteOption<T>) => React.ReactNode;
  filterOptions?: (
    options: AutocompleteOption<T>[],
    query: string
  ) => AutocompleteOption<T>[];
  minQueryLength?: number;
  debounceMs?: number;
}

export function Autocomplete<T = unknown>({
  options,
  value,
  onChange,
  onSelect,
  placeholder,
  className,
  inputClassName,
  listClassName,
  isLoading = false,
  emptyMessage,
  renderOption,
  filterOptions,
  minQueryLength = 0,
  debounceMs = 300,
}: AutocompleteProps<T>) {
  const { t } = useTranslation();
  const defaultEmptyMessage = emptyMessage ?? t.ui.noOptionsFound;
  const [isOpen, setIsOpen] = React.useState(false);
  const [filteredOptions, setFilteredOptions] =
    React.useState<AutocompleteOption<T>[]>(options);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    if (filterOptions) {
      const filtered = filterOptions(options, value);
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [options, value, filterOptions]);

  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (newValue.length >= minQueryLength) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }, debounceMs);
  };

  const handleSelect = (option: AutocompleteOption<T>) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect?.(option);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredOptions.length === 0) {
      if (e.key === 'ArrowDown' && value.length >= minQueryLength) {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (value.length >= minQueryLength && filteredOptions.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  const shouldShowList = isOpen && value.length >= minQueryLength && !isLoading;

  return (
    <div className={cn('relative', className)}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={cn('input-base', inputClassName)}
      />
      {shouldShowList && (
        <ul
          ref={listRef}
          className={cn(
            'absolute z-50 w-full mt-xs popover-content max-h-60 overflow-auto',
            listClassName
          )}
        >
          {filteredOptions.length === 0 ? (
            <li className="px-md py-sm text-sm text-text-tertiary">
              {defaultEmptyMessage}
            </li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className={cn(
                  'px-md py-sm text-sm cursor-pointer hover:bg-hover',
                  index === highlightedIndex && 'bg-hover'
                )}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            ))
          )}
        </ul>
      )}
      {isLoading && (
        <div className="absolute right-md top-1/2 -translate-y-1/2">
          <div className="animate-spin rounded-full size-4 border-b-2 border-text-primary"></div>
        </div>
      )}
    </div>
  );
}
