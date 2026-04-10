import { primitive } from './primitive'

/**
 * TYPOGRAPHY TOKENS
 *
 * Font family, sizes, weights, line heights, and letter spacing for the
 * CDS Mobile design system. The font family derives from the primitive
 * layer to support white-labeling.
 *
 * CDS 37 specifies DM Sans as the primary typeface:
 *   - DM Sans:Medium  (weight 500) -- body, labels
 *   - DM Sans:SemiBold (weight 600) -- headings, emphasis
 *
 * When DM Sans is not loaded (e.g. during font fetch on first launch),
 * the system font stack is used as fallback.
 */

// ---------------------------------------------------------------------------
// Font family
// ---------------------------------------------------------------------------

/** Primary font family -- matches CDS 37 web exactly */
export const fontFamily = primitive.fontFamily

/** Monospace font family for code / data */
export const fontFamilyMono = primitive.fontFamilyMono

/** System font fallback for when custom fonts are not yet loaded */
export const fontFamilyFallback = 'System'

/**
 * Font face weight map for DM Sans.
 *
 * Use this when registering fonts with expo-font or React Native asset
 * linking. Each key is a logical weight name; the value is the font file
 * suffix and numeric weight for the `fontWeight` style property.
 *
 * @example
 * ```typescript
 * import { Font } from 'expo-font'
 * import { dmSansFontFaces } from '@opengov/cds-tokens'
 *
 * await Font.loadAsync({
 *   [dmSansFontFaces.medium.fontName]: require('./assets/fonts/DMSans-Medium.ttf'),
 *   [dmSansFontFaces.semibold.fontName]: require('./assets/fonts/DMSans-SemiBold.ttf'),
 * })
 * ```
 */
export const dmSansFontFaces = {
  light: {
    fontName: 'DMSans-Light',
    weight: '300' as const,
    numericWeight: 300,
  },
  regular: {
    fontName: 'DMSans-Regular',
    weight: '400' as const,
    numericWeight: 400,
  },
  medium: {
    fontName: 'DMSans-Medium',
    weight: '500' as const,
    numericWeight: 500,
  },
  semibold: {
    fontName: 'DMSans-SemiBold',
    weight: '600' as const,
    numericWeight: 600,
  },
  bold: {
    fontName: 'DMSans-Bold',
    weight: '700' as const,
    numericWeight: 700,
  },
} as const

export type DmSansFontFace = keyof typeof dmSansFontFaces

// ---------------------------------------------------------------------------
// Font size scale (mobile-optimized, derived from CDS 37 web scale)
// ---------------------------------------------------------------------------

export const fontSize = {
  xs: 12, // Caption, minimum readable
  sm: 14, // Body 3, secondary
  md: 16, // Body 2, default body
  lg: 20, // Body 1 / Heading 6
  xl: 24, // Heading 5
  '2xl': 28, // Heading 4 (web 32px scaled)
  '3xl': 32, // Heading 3 (web 40px scaled)
  '4xl': 40, // Display 4 (web 56px scaled)
  '5xl': 48, // Display 3 (web 64px scaled)
  '6xl': 56, // Display 2 (web 72px scaled)
  '7xl': 64, // Display 1 (web 80px scaled)
} as const

// ---------------------------------------------------------------------------
// Font weights
// ---------------------------------------------------------------------------

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500', // CDS 37: DM Sans:Medium
  semibold: '600', // CDS 37: DM Sans:SemiBold
  bold: '700',
} as const

// ---------------------------------------------------------------------------
// Line height scale
// ---------------------------------------------------------------------------

export const lineHeight = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  '4xl': 48,
  '5xl': 56,
  '6xl': 64,
  '7xl': 72,
} as const

// ---------------------------------------------------------------------------
// Letter spacing
// ---------------------------------------------------------------------------

export const letterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1.0,
} as const

// ---------------------------------------------------------------------------
// Type aliases
// ---------------------------------------------------------------------------

export type FontSizeToken = keyof typeof fontSize
export type FontWeightToken = keyof typeof fontWeight
export type LineHeightToken = keyof typeof lineHeight
