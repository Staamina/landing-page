'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

import { useTranslation } from '@staamina/ui/i18n';
import { cn } from '@staamina/ui/utils';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date | null, date2: Date | null): boolean {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function formatDate(
  date: Date | null,
  format: 'short' | 'long' = 'short'
): string {
  if (!date) return '';

  if (format === 'short') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder,
      className,
      disabled = false,
      minDate,
      maxDate,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const defaultPlaceholder = placeholder ?? t.ui.selectDate;
    const [open, setOpen] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(
      value ? value.getMonth() : new Date().getMonth()
    );
    const [currentYear, setCurrentYear] = React.useState(
      value ? value.getFullYear() : new Date().getFullYear()
    );

    React.useEffect(() => {
      if (value) {
        setCurrentMonth(value.getMonth());
        setCurrentYear(value.getFullYear());
      }
    }, [value]);

    const handleDateSelect = (day: number) => {
      const selectedDate = new Date(currentYear, currentMonth, day);

      if (minDate && selectedDate < minDate) return;
      if (maxDate && selectedDate > maxDate) return;

      onChange?.(selectedDate);
      setOpen(false);
    };

    const handlePreviousMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    const isDateDisabled = (day: number): boolean => {
      const date = new Date(currentYear, currentMonth, day);
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return (
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              'flex h-10 w-full radius-input items-center justify-between border border-border-default bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-border-focus disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
          >
            <span
              className={cn('text-left', !value && 'text-text-placeholder')}
            >
              {value ? formatDate(value) : defaultPlaceholder}
            </span>
            <Calendar className="h-4 w-4 text-text-secondary" />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={4}
            className={cn(
              'z-[200] w-auto radius-input border border-border-default bg-elevated p-4 text-text-primary shadow-md',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
            )}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePreviousMonth}
                  className="rounded-md p-1 hover:bg-hover text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="text-sm font-medium">
                  {MONTHS[currentMonth]} {currentYear}
                </div>
                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="rounded-md p-1 hover:bg-hover text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {WEEKDAYS.map((day) => (
                  <div
                    key={day}
                    className="flex h-9 w-9 items-center justify-center text-sm font-medium text-text-secondary"
                  >
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="h-9 w-9" />;
                  }

                  const date = new Date(currentYear, currentMonth, day);
                  const selected = value && isSameDay(date, value);
                  const today = isToday(date);
                  const disabled = isDateDisabled(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled}
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors',
                        'hover:bg-hover hover:text-text-primary',
                        'focus:outline-none focus:ring-2 focus:ring-border-focus',
                        'disabled:pointer-events-none disabled:opacity-50',
                        selected &&
                          'bg-brand-primary text-text-on-primary hover:bg-brand-primary',
                        !selected && today && 'bg-hover text-text-primary',
                        !selected && !today && 'text-text-primary'
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    );
  }
);
DatePicker.displayName = 'DatePicker';
