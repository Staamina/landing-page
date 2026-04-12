/**
 * Shared API Types
 * Type definitions for API requests and responses shared across frontend and backend
 */

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
  code?: string;
  details?: unknown;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pageCount: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
  pagination?: PaginationMeta | null;
  statusCode?: number;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface RequestOptions extends RequestInit {
  /**
   * Whether to include authentication token
   * Defaults to true
   */
  requireAuth?: boolean;

  /**
   * Custom error handler
   */
  onError?: (error: ApiError) => void;
}

export enum SiteType {
  FLAGSHIP = 'FLAGSHIP',
  STORE = 'STORE',
  FRANCHISE = 'FRANCHISE',
}

export enum ActivityType {
  RETAIL = 'RETAIL',
  FOOD_SERVICES = 'FOOD_SERVICES',
  GYM = 'GYM',
  HOTEL = 'HOTEL',
  WAREHOUSE = 'WAREHOUSE',
  OFFICE = 'OFFICE',
}

export enum TimelineActorRole {
  STORE = 'STORE',
  TECHNICIAN = 'TECHNICIAN',
  HQ = 'HQ',
  SYSTEM = 'SYSTEM',
}

export { SiteStatus } from './sites/sites.js';
export { EquipmentType } from './equipment/equipment-type.enum.js';
export type { Equipment, Category } from './equipment/index.js';
export {
  FeatureFlagKey,
  type FeatureFlags,
  type FeatureFlagsResponse,
  type FeatureFlagDefinition,
  type CompanyFeatureFlagAssignment,
  type UpdateCompanyFeatureFlagRequest,
} from './src/feature-flags.js';
export { RoleName, ROLE_NAMES } from './src/roles.js';
