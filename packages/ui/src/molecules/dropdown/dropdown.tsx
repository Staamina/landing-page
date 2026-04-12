'use client';

import { ChevronDown, X } from 'lucide-react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { useTranslation } from '@staamina/ui/i18n';
import { cn } from '@staamina/ui/utils';

const DROPDOWN_CONTENT_OFFSET = 4;

export interface DropdownOption<T = unknown> {
  value: string;
  label: string;
  data?: T;
}

export interface DropdownProps<T = unknown> extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'onSelect'
> {
  options: DropdownOption<T>[];
  value?: DropdownOption<T>;
  onChange?: (value: string) => void;
  onSelect?: (option: DropdownOption<T>) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  renderOption?: (option: DropdownOption<T>) => React.ReactNode;
  renderTrigger?: (option: DropdownOption<T> | undefined) => React.ReactNode;
  filterOptions?: (
    options: DropdownOption<T>[],
    query: string
  ) => DropdownOption<T>[];
  disabled?: boolean;
  position?: 'bottom' | 'top';
  id?: string;
  isHighContrast?: boolean;
}

function defaultFilter<T>(
  options: DropdownOption<T>[],
  query: string
): DropdownOption<T>[] {
  if (!query) {
    return options;
  }

  const lowerQuery = query.toLowerCase();
  return options.filter(
    (option) =>
      option.label.toLowerCase().includes(lowerQuery) ||
      option.value.toLowerCase().includes(lowerQuery)
  );
}

export function Dropdown<T = unknown>({
  options,
  value,
  onChange,
  onSelect,
  placeholder,
  searchable = true,
  searchPlaceholder,
  emptyMessage,
  className,
  triggerClassName,
  contentClassName,
  renderOption,
  renderTrigger,
  filterOptions = defaultFilter,
  disabled = false,
  position = 'bottom',
  id,
  isHighContrast = false,
  ...props
}: DropdownProps<T>) {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder ?? t.ui.selectOption;
  const defaultSearchPlaceholder = searchPlaceholder ?? t.ui.search;
  const defaultEmptyMessage = emptyMessage ?? t.ui.noOptionsFound;
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [contentPosition, setContentPosition] = React.useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  // Use containerRef for position so it works whether button or search input is shown.
  // Applies collision detection: flips to top when there is not enough space below.
  const updateContentPosition = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const VIEWPORT_PADDING = 8;
    const MAX_CONTENT_HEIGHT = 240;
    const spaceBelow =
      window.innerHeight -
      rect.bottom -
      DROPDOWN_CONTENT_OFFSET -
      VIEWPORT_PADDING;
    const spaceAbove = rect.top - DROPDOWN_CONTENT_OFFSET - VIEWPORT_PADDING;

    const openUpward =
      position === 'top' ||
      (spaceBelow < MAX_CONTENT_HEIGHT && spaceAbove > spaceBelow);

    if (openUpward) {
      setContentPosition({
        bottom: window.innerHeight - rect.top + DROPDOWN_CONTENT_OFFSET,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(spaceAbove, MAX_CONTENT_HEIGHT),
      });
    } else {
      setContentPosition({
        top: rect.bottom + DROPDOWN_CONTENT_OFFSET,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.min(spaceBelow, MAX_CONTENT_HEIGHT),
      });
    }
  }, [position]);

  React.useLayoutEffect(() => {
    if (!isOpen) {
      setContentPosition(null);
      return;
    }
    updateContentPosition();
    const handleScrollOrResize = () => updateContentPosition();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, updateContentPosition]);

  const selectedOption = React.useMemo(
    () => options.find((opt) => opt.value === value?.value),
    [options, value]
  );

  const filteredOptions = React.useMemo(
    () => filterOptions(options, searchQuery),
    [options, searchQuery, filterOptions]
  );

  // Auto-focus the search input when dropdown opens.
  // Since the search input is now rendered in the trigger area (not in the portal),
  // it is inside the dialog's focus scope, so Radix's focus trap doesn't interfere.
  React.useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  React.useEffect(() => {
    if (isOpen && listRef.current && highlightedIndex >= 0) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex, isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const inTrigger = containerRef.current?.contains(target);
      const inContent = contentRef.current?.contains(target);
      if (!inTrigger && !inContent) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  };

  const handleSelect = (option: DropdownOption<T>) => {
    onChange?.(option.value);
    onSelect?.(option);
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(-1);
    // Return focus to the trigger button after selection
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        }
        break;
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        // Return focus to trigger button
        requestAnimationFrame(() => {
          triggerRef.current?.focus();
        });
        break;
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
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.('');
    setSearchQuery('');
  };

  const dropdownContent = isOpen && contentPosition && (
    <div
      ref={contentRef}
      role="listbox"
      aria-expanded={isOpen}
      data-staamina-dropdown-content
      data-vaul-no-drag
      className={cn(
        'fixed z-[100] pointer-events-auto radius-input shadow-lg',
        isHighContrast
          ? 'bg-primitive-neutral-900 border border-white/30'
          : 'bg-elevated border border-input',
        contentClassName
      )}
      style={{
        ...(contentPosition.top != null && { top: contentPosition.top }),
        ...(contentPosition.bottom != null && {
          bottom: contentPosition.bottom,
        }),
        left: contentPosition.left,
        width: contentPosition.width,
        pointerEvents: 'auto',
      }}
    >
      <ul
        ref={listRef}
        className="overflow-y-auto overflow-x-hidden p-1"
        style={{ maxHeight: contentPosition?.maxHeight ?? 240 }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {filteredOptions.length === 0 ? (
          <li
            className={cn(
              'px-3 py-2 text-sm text-center',
              isHighContrast ? 'text-white/70' : 'text-muted-foreground'
            )}
          >
            {defaultEmptyMessage}
          </li>
        ) : (
          filteredOptions.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value?.value}
              onMouseDown={(e) => {
                // Prevent the blur of the search input before the click is processed
                e.preventDefault();
              }}
              onClick={() => handleSelect(option)}
              className={cn(
                'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none',
                isHighContrast
                  ? cn(
                      'text-white bg-primitive-neutral-900 hover:bg-primitive-neutral-800',
                      index === highlightedIndex &&
                        'bg-primitive-neutral-800 text-white',
                      option.value === value?.value &&
                        'bg-primitive-neutral-800'
                    )
                  : cn(
                      'hover:bg-accent hover:text-accent-foreground',
                      index === highlightedIndex &&
                        'bg-accent text-accent-foreground',
                      option.value === value?.value && 'bg-accent/50'
                    )
              )}
            >
              {renderOption ? renderOption(option) : option.label}
            </li>
          ))
        )}
      </ul>
    </div>
  );

  return (
    <div ref={containerRef} className={cn('relative', className)} {...props}>
      {/* When open and searchable, replace the button with a search input in the
          trigger area. This keeps the input inside the dialog's DOM so Radix's
          FocusScope doesn't trap focus away from it. */}
      {isOpen && searchable ? (
        <div
          className={cn(
            'flex h-10 w-full radius-input items-center border border-input px-3 py-2 text-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            isHighContrast
              ? 'bg-transparent text-white border-white/30'
              : 'bg-background',
            triggerClassName
          )}
        >
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setHighlightedIndex(-1);
            }}
            onKeyDown={handleSearchKeyDown}
            placeholder={defaultSearchPlaceholder}
            className={cn(
              'flex-1 min-w-0 bg-transparent outline-none text-sm placeholder:text-muted-foreground',
              isHighContrast && 'text-white placeholder:text-white/50'
            )}
            aria-label={defaultSearchPlaceholder}
            aria-autocomplete="list"
            aria-controls="dropdown-listbox"
            autoComplete="off"
          />
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 rotate-180 ml-2 flex-shrink-0',
              isHighContrast && 'text-white'
            )}
          />
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          id={id}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full radius-input items-center justify-between border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            isHighContrast
              ? 'bg-transparent text-white border-white/30 focus:ring-white/50'
              : 'bg-background',
            triggerClassName
          )}
        >
          <span
            className={cn(
              'truncate',
              !selectedOption &&
                (isHighContrast ? 'text-white/70' : 'text-muted-foreground')
            )}
          >
            {renderTrigger
              ? renderTrigger(selectedOption)
              : selectedOption
                ? selectedOption.label
                : defaultPlaceholder}
          </span>
          <div className="flex items-center gap-1 ml-2">
            {selectedOption && !disabled && (
              <span
                onClick={handleClear}
                className={cn(
                  'rounded p-0.5 cursor-pointer',
                  isHighContrast
                    ? 'hover:bg-white/20 text-white'
                    : 'hover:bg-hover'
                )}
                aria-label={t.ui.clearSelection}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClear(e as unknown as React.MouseEvent);
                  }
                }}
              >
                <X className="h-3 w-3" />
              </span>
            )}
            <ChevronDown
              className={cn(
                'h-4 w-4 opacity-50 transition-transform',
                isHighContrast && 'text-white',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </button>
      )}

      {typeof document !== 'undefined' &&
        createPortal(dropdownContent, document.body)}
    </div>
  );
}
