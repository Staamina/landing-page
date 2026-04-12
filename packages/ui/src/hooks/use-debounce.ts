import * as React from 'react';

export function useDebounce<T>(
  value: T,
  delay: number,
  onDebouncedChange?: (debouncedValue: T) => void
): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const onDebouncedChangeRef = React.useRef(onDebouncedChange);

  React.useEffect(() => {
    onDebouncedChangeRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      onDebouncedChangeRef.current?.(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
