type FeatureFlagKey = 'SUSPICIOUS_LABEL'
type FeatureFlags = Record<FeatureFlagKey, boolean>

const CONFIG_FILE = '/feature-flags.json'

export function useFeatureFlags(onLoad?: (flags: FeatureFlags) => void) {
  const featureFlags = ref<FeatureFlags>()
  
  onMounted(async () => {
    try {
      featureFlags.value = await (await fetch(CONFIG_FILE)).json() as FeatureFlags
      onLoad?.(featureFlags.value)
    } catch(e) {
      console.warn('Failed to load feature flags', e)
    }
  })

  return featureFlags
}