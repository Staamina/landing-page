import * as React from 'react';

import { Autocomplete, AutocompleteOption } from '@staamina/ui/autocomplete';
import { useTranslation } from '@staamina/ui/i18n';

export interface AddressSuggestion {
  displayName: string;
  lat: number;
  lon: number;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
}

export interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: AddressSuggestion) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  listClassName?: string;
  countryCode?: string;
  limit?: number;
  fetchSuggestions: (
    query: string,
    countryCode?: string,
    limit?: number
  ) => Promise<AddressSuggestion[]>;
  minQueryLength?: number;
  debounceMs?: number;
}

export function PlacesAutocomplete({
  value,
  onChange,
  onAddressSelect,
  placeholder,
  className,
  inputClassName,
  listClassName,
  countryCode,
  limit = 10,
  fetchSuggestions,
  minQueryLength = 3,
  debounceMs = 300,
}: PlacesAutocompleteProps) {
  const { t } = useTranslation();
  const defaultPlaceholder = placeholder ?? t.ui.enterAddress;
  const defaultEmptyMessage = t.ui.noAddressesFound;
  const [options, setOptions] = React.useState<
    AutocompleteOption<AddressSuggestion>[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout>>();

  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const loadSuggestions = React.useCallback(
    async (query: string) => {
      if (query.length < minQueryLength) {
        setOptions([]);
        return;
      }

      setIsLoading(true);
      try {
        const suggestions = await fetchSuggestions(query, countryCode, limit);
        const newOptions: AutocompleteOption<AddressSuggestion>[] =
          suggestions.map((suggestion) => ({
            value: suggestion.displayName,
            label: suggestion.displayName,
            data: suggestion,
          }));
        setOptions(newOptions);
      } catch (error) {
        console.error('Error fetching address suggestions:', error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchSuggestions, countryCode, limit, minQueryLength]
  );

  const handleInputChange = (newValue: string) => {
    onChange(newValue);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      loadSuggestions(newValue);
    }, debounceMs);
  };

  const handleSelect = (option: AutocompleteOption<AddressSuggestion>) => {
    if (option.data && onAddressSelect) {
      onAddressSelect(option.data);
    }
  };

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={handleInputChange}
      onSelect={handleSelect}
      placeholder={defaultPlaceholder}
      className={className}
      inputClassName={inputClassName}
      listClassName={listClassName}
      isLoading={isLoading}
      emptyMessage={defaultEmptyMessage}
      minQueryLength={minQueryLength}
      debounceMs={0}
    />
  );
}
