/**
 * PRIMITIVE TOKENS -- The White-Label Layer
 *
 * These are the raw palette values that form the foundation of the entire
 * design system. Every semantic token and every component token ultimately
 * derives from a value defined here.
 *
 * To white-label the design system, override this single layer using
 * `createBrandConfig` from `./brand.ts`. All downstream tokens will
 * recalculate automatically.
 *
 * @example White-label for "GovTech Blue":
 * ```typescript
 * import { createBrandConfig } from '@opengov/cds-tokens'
 *
 * const govTechBrand = createBrandConfig({
 *   brandPrimary: '#0066CC',
 *   brandPrimaryDark: '#004D99',
 *   brandPrimaryLight: '#3399FF',
 *   fontFamily: 'Inter',
 * })
 * ```
 *
 * Values sourced from CDS 37 Figma (April 2026).
 */
export const primitive = {
  // ---------------------------------------------------------------------------
  // Brand (override these for white-labeling)
  // ---------------------------------------------------------------------------
  brandPrimary: '#4B3FFF',
  brandPrimaryDark: '#19009B',
  brandPrimaryLight: '#7C73FF',
  brandPrimaryContrastText: '#FFFFFF',

  // Secondary
  brandSecondary: '#2B343D',
  brandSecondaryDark: '#1A2028',
  brandSecondaryLight: '#4A5568',

  // ---------------------------------------------------------------------------
  // OG Blue scale
  // ---------------------------------------------------------------------------
  blue50: '#EBF0FF',
  blue100: '#C2D1FF',
  blue200: '#99B2FF',
  blue300: '#7093FF',
  blue400: '#4774FF',
  blue500: '#1E55FF',
  blue600: '#1844CC',
  blue700: '#123399',
  blue800: '#0C2266',
  blue900: '#061133',

  // ---------------------------------------------------------------------------
  // Red scale (destructive / error)
  // ---------------------------------------------------------------------------
  red50: '#FFF0F0',
  red100: '#FFD6D6',
  red300: '#FF8585',
  red400: '#FF5C5C',
  red500: '#FF3333',
  red600: '#CC2929',
  red700: '#991F1F',
  red800: '#661414',
  red900: '#330A0A',

  // ---------------------------------------------------------------------------
  // Green / Jade (success)
  // ---------------------------------------------------------------------------
  green50: '#E8F5E9',
  green500: '#4CAF50',
  green700: '#388E3C',

  // ---------------------------------------------------------------------------
  // Amber (warning)
  // ---------------------------------------------------------------------------
  amber50: '#FFF8E1',
  amber500: '#FFC107',
  amber700: '#FFA000',

  // ---------------------------------------------------------------------------
  // Teal (info)
  // ---------------------------------------------------------------------------
  teal50: '#E0F7FA',
  teal500: '#009688',
  teal700: '#00796B',

  // ---------------------------------------------------------------------------
  // Rose
  // ---------------------------------------------------------------------------
  rose50: '#FFF0F3',
  rose500: '#E91E63',

  // ---------------------------------------------------------------------------
  // Pear
  // ---------------------------------------------------------------------------
  pear50: '#F9FBE7',
  pear500: '#CDDC39',

  // ---------------------------------------------------------------------------
  // Port
  // ---------------------------------------------------------------------------
  port50: '#F3E5F5',
  port500: '#9C27B0',

  // ---------------------------------------------------------------------------
  // Neutral (gray scale)
  // ---------------------------------------------------------------------------
  white: '#FFFFFF',
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#EEEEEE',
  neutral300: '#E0E0E0',
  neutral400: '#BDBDBD',
  neutral500: '#9E9E9E',
  neutral600: '#757575',
  neutral700: '#616161',
  neutral800: '#424242',
  neutral900: '#212121',
  neutral1000: '#121212',
  black: '#000000',

  // ---------------------------------------------------------------------------
  // State layer opacities (MUI-compatible)
  // ---------------------------------------------------------------------------
  stateHoverOpacity: 0.04,
  stateFocusOpacity: 0.12,
  stateSelectedOpacity: 0.08,
  stateDisabledOpacity: 0.38,
  stateOutlinedBorderOpacity: 0.5,

  // ---------------------------------------------------------------------------
  // Typography
  // ---------------------------------------------------------------------------
  fontFamily: 'DM Sans',
  fontFamilyMono: 'DM Mono',

  // ---------------------------------------------------------------------------
  // Spacing base unit (4px grid)
  // ---------------------------------------------------------------------------
  spacingUnit: 4,

  // ---------------------------------------------------------------------------
  // Border radius base (CDS 37: 4px universal)
  // ---------------------------------------------------------------------------
  radiusBase: 4,

  // ---------------------------------------------------------------------------
  // Data Visualization (18 series colors)
  // ---------------------------------------------------------------------------
  dataSeries1: '#4B3FFF',
  dataSeries2: '#1E55FF',
  dataSeries3: '#009688',
  dataSeries4: '#4CAF50',
  dataSeries5: '#CDDC39',
  dataSeries6: '#FFC107',
  dataSeries7: '#FF9800',
  dataSeries8: '#FF5722',
  dataSeries9: '#E91E63',
  dataSeries10: '#9C27B0',
  dataSeries11: '#673AB7',
  dataSeries12: '#3F51B5',
  dataSeries13: '#00BCD4',
  dataSeries14: '#8BC34A',
  dataSeries15: '#FFEB3B',
  dataSeries16: '#FF5722',
  dataSeries17: '#795548',
  dataSeries18: '#607D8B',
}

/** Widened type allowing any string for color/font overrides in white-labeling */
export type PrimitiveTokens = {
  [K in keyof typeof primitive]: typeof primitive[K] extends string ? string : typeof primitive[K]
}
