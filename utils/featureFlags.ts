type FeatureFlagKey = 'SUSPICIOUS_LABEL'
type FeatureFlags = Record<FeatureFlagKey, boolean>

export function useFeatureFlags(onLoad?: (flags: FeatureFlags | null) => void) {
  const { data } = useFetch<FeatureFlags>('/api/feature-flags');

  onMounted(() => {
    onLoad?.(data.value);
  });

  return data;
}