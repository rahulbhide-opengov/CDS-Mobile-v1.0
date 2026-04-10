import { createTamagui, createTokens, createFont } from '@tamagui/core'
import {
  colors,
  fontSize,
  space,
  radii,
  primitive,
  createSemanticTokens,
  createComponentTokens,
  type BrandConfig,
} from '@opengov/cds-tokens'
import { lightTheme, darkTheme, highContrastTheme } from '@opengov/cds-themes'

// ---------------------------------------------------------------------------
// Font face map for DM Sans -- matches expo-font asset names.
// When a brand override supplies a different fontFamily the face map is
// regenerated from the family name (see `buildFontFaceMap`).
// ---------------------------------------------------------------------------

const DM_SANS_FACE = {
  300: { normal: 'DMSans-Light' },
  400: { normal: 'DMSans-Regular' },
  500: { normal: 'DMSans-Medium' },
  600: { normal: 'DMSans-SemiBold' },
  700: { normal: 'DMSans-Bold' },
} as const

/**
 * Builds a Tamagui face map.
 * For DM Sans we use explicit asset names; for any other family we fall back
 * to the family string (the platform's system font resolver handles it).
 */
function buildFontFaceMap(family: string) {
  if (family === 'DM Sans') return DM_SANS_FACE

  return {
    300: { normal: family },
    400: { normal: family },
    500: { normal: family },
    600: { normal: family },
    700: { normal: family },
  }
}

// ---------------------------------------------------------------------------
// Config factory
// ---------------------------------------------------------------------------

/**
 * Creates a fully resolved Tamagui config for the CDS mobile design system.
 *
 * Call without arguments to get the default OpenGov CDS 37 brand.
 * Supply a `BrandConfig` to produce a white-labeled variant that threads
 * brand colors and typography through every token layer.
 *
 * @example
 * ```ts
 * // Default OpenGov brand
 * const config = createCdsConfig()
 *
 * // White-labeled brand
 * const config = createCdsConfig({
 *   brandPrimary: '#0066CC',
 *   brandPrimaryDark: '#004C99',
 *   brandPrimaryLight: '#CCE0FF',
 *   fontFamily: 'Roboto',
 * })
 * ```
 */
export function createCdsConfig(brandOverrides?: BrandConfig) {
  // 1. Resolve primitives -- merge brand overrides on top of CDS defaults
  const p = brandOverrides ? { ...primitive, ...brandOverrides } : primitive

  // 2. Derive semantic and component token layers
  const s = createSemanticTokens(p)
  const ct = createComponentTokens(s, p)

  // 3. Build Tamagui tokens
  const tokens = createTokens({
    color: {
      ...colors,
      // Override brand colors from resolved primitives
      primary: p.brandPrimary,
      primaryDark: p.brandPrimaryDark,
      primaryLight: p.brandPrimaryLight,

      // Semantic tokens (Layer 2) -- background
      bgDefault: s.bgDefault,
      bgPaper: s.bgPaper,
      bgStrong: s.bgStrong,
      bgInverse: s.bgInverse,

      // Semantic tokens (Layer 2) -- text
      textPrimary: s.textPrimary,
      textSecondary: s.textSecondary,
      textDisabled: s.textDisabled,
      textInverse: s.textInverse,

      // Semantic tokens (Layer 2) -- brand
      brandMain: s.brandMain,
      brandDark: s.brandDark,
      brandLight: s.brandLight,
      brandContrastText: s.brandContrastText,

      // Semantic tokens (Layer 2) -- status
      errorMain: s.errorMain,
      errorLight: s.errorLight,
      errorDark: s.errorDark,
      successMain: s.successMain,
      successLight: s.successLight,
      successDark: s.successDark,
      warningMain: s.warningMain,
      warningLight: s.warningLight,
      warningDark: s.warningDark,
      infoMain: s.infoMain,
      infoLight: s.infoLight,
      infoDark: s.infoDark,

      // Semantic tokens (Layer 2) -- borders
      borderDefault: s.borderDefault,
      borderStrong: s.borderStrong,
      borderFocus: s.borderFocus,
      borderError: s.borderError,
      borderDisabled: s.borderDisabled,
      divider: s.divider,

      // Semantic tokens (Layer 2) -- action states
      actionHover: s.actionHover,
      actionFocus: s.actionFocus,
      actionSelected: s.actionSelected,
      actionDisabled: s.actionDisabled,

      // Semantic tokens -- legacy aliases for backwards compatibility
      focusRing: s.borderFocus,
      textDefault: s.textPrimary,
      surfaceDefault: s.bgDefault,
      surfaceRaised: s.bgPaper,
      borderSubtle: s.borderDefault,
      statusSuccess: s.successMain,
      statusWarning: s.warningMain,
      statusError: s.errorMain,
      statusInfo: s.infoMain,
      interactivePrimary: s.brandMain,
      interactivePrimaryBg: s.brandMain,
      interactivePrimaryPressed: s.brandDark,
      interactivePrimaryHover: s.brandLight,

      // Component tokens (Layer 3) -- button
      buttonPrimaryBg: ct.buttonPrimaryBg,
      buttonPrimaryText: ct.buttonPrimaryText,
      buttonPrimaryHoverBg: ct.buttonPrimaryHoverBg,
      buttonSecondaryBg: ct.buttonSecondaryBg,
      buttonSecondaryText: ct.buttonSecondaryText,
      buttonSecondaryBorder: ct.buttonSecondaryBorder,
      buttonDestructiveBg: ct.buttonDestructiveBg,
      buttonDestructiveText: ct.buttonDestructiveText,
      buttonDisabledBg: ct.buttonDisabledBg,
      buttonDisabledText: ct.buttonDisabledText,
      // Legacy button aliases
      buttonPrimaryFg: ct.buttonPrimaryText,
      buttonPrimaryBgPressed: ct.buttonPrimaryHoverBg,
      buttonSecondaryFg: ct.buttonSecondaryText,
      buttonSecondaryBgPressed: ct.buttonSecondaryBorder,
      buttonDisabledFg: ct.buttonDisabledText,

      // Component tokens (Layer 3) -- text field
      inputBorderDefault: ct.textFieldBorderDefault,
      inputBorderFocused: ct.textFieldBorderFocus,
      inputBorderError: ct.textFieldBorderError,
      inputBg: ct.textFieldBg,
      inputPlaceholder: ct.textFieldLabelColor,

      // Component tokens (Layer 3) -- navigation
      navBarActiveColor: ct.navBarActiveColor,
      navBarInactiveColor: ct.navBarInactiveColor,

      // Component tokens (Layer 3) -- focus ring
      focusRingColor: ct.focusRingColor,
    },
    space,
    size: {
      ...space,
      // Additional semantic sizes
      iconSm: 16,
      iconMd: 20,
      iconLg: 24,
      iconXl: 32,
      touchTarget: ct.touchTargetMin, // 44 -- iOS HIG + WCAG AAA
      touchTargetLg: ct.touchTargetMd3, // 48 -- Material Design 3
    },
    radius: radii,
    zIndex: {
      0: 0,
      1: 100,
      2: 200,
      3: 300,
      4: 400,
      5: 500,
      modal: 1000,
      toast: 1100,
      tooltip: 1200,
      overlay: 900,
    },
  })

  // 4. Build font configuration from resolved family
  const faceMap = buildFontFaceMap(p.fontFamily)

  const bodyFont = createFont({
    family: p.fontFamily,
    size: fontSize,
    lineHeight: {
      xxs: 14,  // help text
      xs: 20,   // caption
      sm: 20,   // body2, h5
      md: 24,   // body1, h4
      lg: 24,   // h3 mobile
      xl: 32,   // h2 mobile
      '2xl': 32,  // h1 mobile
      '3xl': 38,  // display5 mobile
      '4xl': 38,  // display4 mobile
      '5xl': 48,  // display3 mobile
      '6xl': 56,  // display2 mobile
      '7xl': 76,  // display1 mobile
    },
    weight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    letterSpacing: {
      xxs: 0.4,   // help text
      xs: 0,       // caption (Figma: 0)
      sm: 0.17,    // body2 (Figma: 0.17)
      md: 0.15,    // body1 (Figma: 0.15)
      lg: -0.2,    // h3 (Figma: -0.2)
      xl: -0.25,   // h2 (Figma: -0.25)
      '2xl': -0.25, // h1 (Figma: -0.25)
      '3xl': -0.4,  // display5 (Figma: -0.4)
      '4xl': -0.4,  // display4 (Figma: -0.4)
      '5xl': -0.4,  // display3 (Figma: -0.4)
      '6xl': -0.4,  // display2 (Figma: -0.4)
      '7xl': -0.4,  // display1 (Figma: -0.4)
    },
    face: faceMap,
  })

  const headingFont = createFont({
    ...bodyFont,
    weight: {
      regular: '600',
      bold: '700',
    },
    face: {
      600: faceMap[600],
      700: faceMap[700],
    },
  })

  // 5. Assemble Tamagui config
  return createTamagui({
    tokens,
    themes: {
      light: lightTheme,
      dark: darkTheme,
      light_high_contrast: highContrastTheme,
    },
    fonts: {
      body: bodyFont,
      heading: headingFont,
    },
    media: {
      phone: { maxWidth: 599 },
      tabletSmall: { minWidth: 600, maxWidth: 767 },
      tablet: { minWidth: 768, maxWidth: 1023 },
      tabletLarge: { minWidth: 1024 },
    },
    settings: {
      allowedStyleValues: 'somewhat-strict-web',
    },
  })
}

// ---------------------------------------------------------------------------
// Default config -- OpenGov CDS 37 brand (DM Sans, OG Purple)
// ---------------------------------------------------------------------------

export const config = createCdsConfig()

export type CdsConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends CdsConfig {}
}
