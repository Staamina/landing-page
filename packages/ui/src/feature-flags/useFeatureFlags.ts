import { useQuery } from '@tanstack/react-query';
import type { FeatureFlags, FeatureFlagKey } from '@staamina/types';

/**
 * Interface for the feature flags service
 * Must be implemented by each app (field-maintenance-system, headquarter-system)
 */
export interface FeatureFlagsService {
  getMyCompanyFlags: () => Promise<{ flags: FeatureFlags }>;
}

// Singleton service reference (set by app at initialization)
let _featureFlagsService: FeatureFlagsService | null = null;

/**
 * Initialize the feature flags service
 * Call this at app startup (e.g., in App.tsx or main.tsx)
 *
 * @example
 * ```typescript
 * import { setFeatureFlagsService } from '@staamina/ui/feature-flags';
 * import { featureFlagsService } from './services/feature-flags.service';
 *
 * // In App.tsx or main.tsx
 * setFeatureFlagsService(featureFlagsService);
 * ```
 */
export function setFeatureFlagsService(service: FeatureFlagsService): void {
  _featureFlagsService = service;
}

/**
 * Get the current feature flags service
 * Returns null if not initialized
 */
export function getFeatureFlagsService(): FeatureFlagsService | null {
  return _featureFlagsService;
}

export interface UseFeatureFlagsOptions {
  /**
   * Company ID to fetch flags for
   * If not provided, the hook will not fetch flags
   */
  companyId?: string | null;
}

export interface UseFeatureFlagsResult {
  /** Map of feature flag keys to their enabled status */
  flags: FeatureFlags;
  /** Check if a specific feature flag is enabled */
  isEnabled: (flagKey: FeatureFlagKey | string) => boolean;
  /** Whether the flags are currently loading */
  isLoading: boolean;
  /** Error if the fetch failed */
  error: Error | null;
  /** Refetch the flags from the server */
  refetch: () => Promise<void>;
}

/**
 * Hook to access feature flags for the current user's company
 *
 * Uses React Query with long stale time (30 minutes) since flags rarely change.
 * The cache is shared across all components using this hook.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user } = useUser();
 *   const { isEnabled, isLoading } = useFeatureFlags({ companyId: user?.companyId });
 *
 *   if (isEnabled(FeatureFlagKey.AI_TEXT_CORRECTION)) {
 *     return <AiCorrectionButton />;
 *   }
 *
 *   return null;
 * }
 * ```
 */
export function useFeatureFlags(
  options?: UseFeatureFlagsOptions
): UseFeatureFlagsResult {
  const { companyId } = options ?? {};

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['featureFlags', companyId],
    queryFn: async () => {
      if (!companyId || !_featureFlagsService) {
        return { flags: {} as FeatureFlags };
      }
      return _featureFlagsService.getMyCompanyFlags();
    },
    enabled: !!companyId && !!_featureFlagsService,
    // Flags rarely change, so we use a long stale time
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    // Don't refetch on window focus or mount since flags are stable
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    // Keep previous data while refetching
    placeholderData: (previousData) => previousData,
  });

  const flags = data?.flags ?? {};

  const isEnabled = (flagKey: FeatureFlagKey | string): boolean => {
    return flags[flagKey] ?? false;
  };

  const handleRefetch = async (): Promise<void> => {
    await refetch();
  };

  return {
    flags,
    isEnabled,
    isLoading,
    error: error instanceof Error ? error : null,
    refetch: handleRefetch,
  };
}
