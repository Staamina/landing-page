export interface Address {
  addressLine: string;
  secondAddressLine?: string | null;
  city: string;
  postalCode: string;
  country: string;
}
