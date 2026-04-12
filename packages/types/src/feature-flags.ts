/**
 * Feature Flags Types
 * Type definitions for feature flag system shared across frontend and backend
 */

/**
 * Available feature flag keys
 */
export enum FeatureFlagKey {
  /**
   * Enable AI-powered text correction for incident descriptions
   */
  AI_TEXT_CORRECTION = 'AI_TEXT_CORRECTION',

  /**
   * Allow manual criticality selection when creating incidents
   */
  ALLOW_MANUAL_CRITICALITY_SELECTION = 'ALLOW_MANUAL_CRITICALITY_SELECTION',
}

/**
 * Feature flags map (key -> enabled status)
 */
export interface FeatureFlags {
  [key: string]: boolean;
}

/**
 * Response from feature flags API endpoint
 */
export interface FeatureFlagsResponse {
  flags: FeatureFlags;
}

/**
 * Feature flag definition (for admin management)
 */
export interface FeatureFlagDefinition {
  id: string;
  key: string;
  name: string;
  description: string | null;
  defaultValue: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Company feature flag assignment
 */
export interface CompanyFeatureFlagAssignment {
  id: string;
  companyId: string;
  featureFlagId: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  featureFlag?: FeatureFlagDefinition;
}

/**
 * Update company feature flag request
 */
export interface UpdateCompanyFeatureFlagRequest {
  flagKey: string;
  enabled: boolean;
}
