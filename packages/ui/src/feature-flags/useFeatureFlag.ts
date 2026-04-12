import { useFeatureFlags, UseFeatureFlagsOptions } from './useFeatureFlags';
import type { FeatureFlagKey } from '@staamina/types';

/**
 * Simplified hook to check a single feature flag
 *
 * This is a convenience wrapper around useFeatureFlags for when you only
 * need to check one flag.
 *
 * @example
 * ```tsx
 * function AiCorrectionButton() {
 *   const { user } = useUser();
 *   const isAiCorrectionEnabled = useFeatureFlag(
 *     FeatureFlagKey.AI_TEXT_CORRECTION,
 *     { companyId: user?.companyId }
 *   );
 *
 *   if (!isAiCorrectionEnabled) {
 *     return null;
 *   }
 *
 *   return <Button onClick={onCorrect}>Correct Text</Button>;
 * }
 * ```
 */
export function useFeatureFlag(
  flagKey: FeatureFlagKey | string,
  options?: UseFeatureFlagsOptions
): boolean {
  const { isEnabled } = useFeatureFlags(options);
  return isEnabled(flagKey);
}
