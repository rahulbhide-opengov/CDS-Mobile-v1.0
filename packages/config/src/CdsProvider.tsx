import React, { useEffect } from 'react'
import { TamaguiProvider } from '@tamagui/core'
import { useFonts } from 'expo-font'
import { type BrandConfig } from '@opengov/cds-tokens'
import { createCdsConfig, config as defaultConfig } from './tamagui.config'

// ---------------------------------------------------------------------------
// DM Sans font assets — CDS 37 primary typeface
// ---------------------------------------------------------------------------

const DM_SANS_FONTS = {
  'DMSans-Light': require('../assets/fonts/DMSans-Light.ttf'),
  'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
  'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
  'DMSans-SemiBold': require('../assets/fonts/DMSans-SemiBold.ttf'),
  'DMSans-Bold': require('../assets/fonts/DMSans-Bold.ttf'),
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CdsTheme = 'light' | 'dark' | 'light_high_contrast'

export interface CdsProviderProps {
  /** Active color theme. Defaults to `'light'`. */
  theme?: CdsTheme
  /**
   * Optional brand overrides for white-label deployments.
   *
   * When supplied the provider builds a dedicated Tamagui config that
   * threads the brand primitives through semantic and component token
   * layers. Pass `undefined` (or omit) to use the default OpenGov CDS 37
   * brand.
   *
   * @example
   * ```tsx
   * <CdsProvider brand={{ brandPrimary: '#0066CC' }}>
   *   <App />
   * </CdsProvider>
   * ```
   */
  brand?: BrandConfig
  /** Render children even if fonts are not yet loaded (shows system font fallback). */
  renderWhileLoading?: boolean
  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CdsProvider({
  theme = 'light',
  brand,
  renderWhileLoading = false,
  children,
}: CdsProviderProps) {
  const [fontsLoaded, fontError] = useFonts(DM_SANS_FONTS)

  const resolvedConfig = React.useMemo(
    () => (brand ? createCdsConfig(brand) : defaultConfig),
    [brand],
  )

  // Log font loading errors in dev
  useEffect(() => {
    if (fontError) {
      console.warn('[CdsProvider] Failed to load DM Sans fonts:', fontError)
    }
  }, [fontError])

  // Block rendering until fonts are loaded (unless opt-out)
  if (!fontsLoaded && !fontError && !renderWhileLoading) {
    return null
  }

  return (
    <TamaguiProvider config={resolvedConfig} defaultTheme={theme}>
      {children}
    </TamaguiProvider>
  )
}
