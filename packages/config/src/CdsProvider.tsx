import React from 'react'
import { TamaguiProvider } from '@tamagui/core'
import { type BrandConfig } from '@opengov/cds-tokens'
import { createCdsConfig, config as defaultConfig } from './tamagui.config'

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
   * **Important:** Keep the reference stable between renders (e.g. define
   * outside the component or wrap in `useMemo`) to avoid unnecessary
   * config rebuilds.
   *
   * @example
   * ```tsx
   * const acmeBrand: BrandConfig = {
   *   brandPrimary: '#0066CC',
   *   brandPrimaryDark: '#004C99',
   *   brandPrimaryLight: '#CCE0FF',
   *   fontFamily: 'Roboto',
   * }
   *
   * <CdsProvider brand={acmeBrand}>
   *   <App />
   * </CdsProvider>
   * ```
   */
  brand?: BrandConfig
  children: React.ReactNode
}

export function CdsProvider({ theme = 'light', brand, children }: CdsProviderProps) {
  const resolvedConfig = React.useMemo(
    () => (brand ? createCdsConfig(brand) : defaultConfig),
    [brand],
  )

  return (
    <TamaguiProvider config={resolvedConfig} defaultTheme={theme}>
      {children}
    </TamaguiProvider>
  )
}
