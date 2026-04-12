'use client';

import * as React from 'react';

import { Dropdown, DropdownOption } from '@staamina/ui/dropdown';
import { useTranslation } from '@staamina/ui/i18n';

const EUROPEAN_COUNTRIES = [
  'AD',
  'AL',
  'AT',
  'BA',
  'BE',
  'BG',
  'BY',
  'CH',
  'CY',
  'CZ',
  'DE',
  'DK',
  'EE',
  'ES',
  'FI',
  'FR',
  'GB',
  'GR',
  'HR',
  'HU',
  'IE',
  'IS',
  'IT',
  'LI',
  'LT',
  'LU',
  'LV',
  'MC',
  'MD',
  'ME',
  'MK',
  'MT',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'RS',
  'SE',
  'SI',
  'SK',
  'SM',
  'UA',
  'VA',
  'XK',
] as const;

export interface CountryOption {
  code: string;
  name: string;
}

export interface CountryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onCountrySelect?: (country: CountryOption) => void;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  emptyMessage?: string;
  disabled?: boolean;
  position?: 'bottom' | 'top';
  id?: string;
}

function getCountryName(countryCode: string, locale: string = 'en'): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
    return displayNames.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}

function createCountryOptions(
  locale: string = 'en'
): DropdownOption<CountryOption>[] {
  return EUROPEAN_COUNTRIES.map((code) => {
    const name = getCountryName(code, locale);
    return {
      value: code,
      label: name,
      data: { code, name },
    };
  }).sort((a, b) => a.label.localeCompare(b.label, locale));
}

function filterCountries(
  options: DropdownOption<CountryOption>[],
  query: string
): DropdownOption<CountryOption>[] {
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

export function CountryDropdown({
  value,
  onChange,
  onCountrySelect,
  placeholder,
  className,
  triggerClassName,
  contentClassName,
  emptyMessage,
  disabled = false,
  position = 'bottom',
  id,
}: CountryDropdownProps) {
  const { locale, t } = useTranslation();
  const [options] = React.useState(() => createCountryOptions(locale));

  const defaultPlaceholder = placeholder ?? t.ui.selectCountry;
  const defaultEmptyMessage = emptyMessage ?? t.ui.noCountriesFound;
  const defaultSearchPlaceholder = t.ui.searchCountry;

  const handleSelect = (option: DropdownOption<CountryOption>) => {
    onChange(option.value);
    if (option.data && onCountrySelect) {
      onCountrySelect(option.data);
    }
  };

  const renderOption = (option: DropdownOption<CountryOption>) => {
    return (
      <div className="flex items-center justify-between w-full">
        <span>{option.label}</span>
        <span className="text-xs text-muted-foreground ml-2">
          {option.value}
        </span>
      </div>
    );
  };

  return (
    <Dropdown
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={onChange}
      onSelect={handleSelect}
      placeholder={defaultPlaceholder}
      searchable
      searchPlaceholder={defaultSearchPlaceholder}
      emptyMessage={defaultEmptyMessage}
      className={className}
      triggerClassName={triggerClassName}
      contentClassName={contentClassName}
      renderOption={renderOption}
      filterOptions={filterCountries}
      disabled={disabled}
      position={position}
      id={id}
    />
  );
}
