import { SearchInput } from '@staamina/ui/search-input';
import { cn } from '@staamina/ui/utils';

export interface PickerSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

export function PickerSearchInput({
  value,
  onChange,
  onClear,
  placeholder,
  isLoading,
  className,
}: PickerSearchInputProps) {
  return (
    <SearchInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onClear={onClear}
      placeholder={placeholder || 'Search...'}
      isLoading={isLoading}
      containerClassName={cn('w-full', className)}
      className="min-h-11"
    />
  );
}
