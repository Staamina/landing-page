import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Address {
  addressLine: string;
  secondAddressLine?: string | null;
  city: string;
  postalCode: string;
  country: string;
}

export function getCountryName(
  countryCode: string,
  locale: string = 'fr'
): string {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
    return displayNames.of(countryCode.toUpperCase()) || countryCode;
  } catch {
    return countryCode;
  }
}

export function formatAddress(address: Address, locale: string = 'fr'): string {
  const parts: string[] = [];

  parts.push(address.addressLine);

  if (address.secondAddressLine) {
    parts.push(address.secondAddressLine);
  }

  const cityPostalCode = `${address.postalCode} ${address.city}`;
  parts.push(cityPostalCode);

  const countryName = getCountryName(address.country, locale);
  parts.push(countryName);

  return parts.join(', ');
}

export function formatAddressMultiline(
  address: Address,
  locale: string = 'fr'
): string[] {
  const lines: string[] = [];

  lines.push(address.addressLine);

  if (address.secondAddressLine) {
    lines.push(address.secondAddressLine);
  }

  const cityPostalCode = `${address.postalCode} ${address.city}`;
  lines.push(cityPostalCode);

  const countryName = getCountryName(address.country, locale);
  lines.push(countryName);

  return lines;
}
