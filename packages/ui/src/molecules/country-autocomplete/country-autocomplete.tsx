'use client';

import * as React from 'react';

import { Autocomplete, AutocompleteOption } from '@staamina/ui/autocomplete';
import type { CountryOption } from '@staamina/ui/country-dropdown';
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

export interface CountryAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onCountrySelect?: (country: CountryOption) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  emptyMessage?: string;
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
): AutocompleteOption<CountryOption>[] {
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
  options: AutocompleteOption<CountryOption>[],
  query: string
): AutocompleteOption<CountryOption>[] {
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

export function CountryAutocomplete({
  value,
  onChange,
  onCountrySelect,
  placeholder,
  className,
  inputClassName,
  listClassName,
  emptyMessage,
}: CountryAutocompleteProps) {
  const { locale, t } = useTranslation();
  const [options] = React.useState(() => createCountryOptions(locale));

  const defaultPlaceholder = placeholder ?? t.ui.selectCountry;
  const defaultEmptyMessage = emptyMessage ?? t.ui.noCountriesFound;
  const [searchQuery, setSearchQuery] = React.useState(() => {
    if (value) {
      const country = options.find((opt) => opt.value === value.toUpperCase());
      return country ? country.label : '';
    }
    return '';
  });

  React.useEffect(() => {
    if (value) {
      const country = options.find((opt) => opt.value === value.toUpperCase());
      if (country) {
        setSearchQuery(country.label);
      }
    } else {
      setSearchQuery('');
    }
  }, [value, options]);

  const handleInputChange = (newValue: string) => {
    setSearchQuery(newValue);
    const matchingCountry = options.find(
      (opt) => opt.label.toLowerCase() === newValue.toLowerCase()
    );
    if (matchingCountry) {
      onChange(matchingCountry.value);
    } else {
      onChange('');
    }
  };

  const handleSelect = (option: AutocompleteOption<CountryOption>) => {
    onChange(option.value);
    setSearchQuery(option.label);
    if (option.data && onCountrySelect) {
      onCountrySelect(option.data);
    }
  };

  const renderOption = (option: AutocompleteOption<CountryOption>) => {
    return (
      <div className="flex items-center justify-between">
        <span>{option.label}</span>
        <span className="text-xs text-text-tertiary ml-2">{option.value}</span>
      </div>
    );
  };

  return (
    <Autocomplete
      options={options}
      value={searchQuery}
      onChange={handleInputChange}
      onSelect={handleSelect}
      placeholder={defaultPlaceholder}
      className={className}
      inputClassName={inputClassName}
      listClassName={listClassName}
      emptyMessage={defaultEmptyMessage}
      filterOptions={filterCountries}
      renderOption={renderOption}
      minQueryLength={0}
      debounceMs={0}
    />
  );
}
