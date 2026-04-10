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

/**
 * Font size scale — mobile-optimized from CDS 37 Figma.
 *
 * Figma mobile column values:
 *   help=10, caption=12, body3/h6=13, body2/h5=14, body1/h4=16,
 *   h3=18, h2=22, h1=28, display5=32, display4=40, display3=44,
 *   display2=48, display1=64
 */
export const fontSize = {
  xxs: 10, // Figma "help" text style
  xs: 12,  // Caption
  sm: 14,  // Body 2, h5 mobile
  md: 16,  // Body 1, h4 mobile
  lg: 18,  // h3 mobile (Figma: 18px, was 20px)
  xl: 22,  // h2 mobile (Figma: 22px, was 24px)
  '2xl': 28, // h1 mobile
  '3xl': 32, // Display 5 mobile
  '4xl': 40, // Display 4 mobile
  '5xl': 44, // Display 3 mobile (Figma: 44px, was 48px)
  '6xl': 48, // Display 2 mobile (Figma: 48px, was 56px)
  '7xl': 64, // Display 1 mobile
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

/**
 * Line height scale — matches Figma mobile column.
 */
export const lineHeight = {
  xxs: 14, // help text
  xs: 20,  // caption (Figma: 20px)
  sm: 20,  // body2, h5 (Figma: 18-20px mobile)
  md: 24,  // body1, h4 (Figma: 20-24px mobile)
  lg: 24,  // h3 mobile (Figma: 24px)
  xl: 32,  // h2 mobile (Figma: 32px)
  '2xl': 32, // h1 mobile (Figma: 32px)
  '3xl': 38, // display5 mobile (Figma: 38px)
  '4xl': 38, // display4 mobile (Figma: 38px)
  '5xl': 48, // display3 mobile (Figma: 48px)
  '6xl': 56, // display2 mobile (Figma: 56px)
  '7xl': 76, // display1 mobile (Figma: 76px)
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
