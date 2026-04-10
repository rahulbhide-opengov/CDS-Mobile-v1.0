import { createTamagui, createTokens, createFont } from '@tamagui/core'
import { colors, fontSize, space, radii } from '@opengov/cds-tokens'
import { lightTheme, darkTheme, highContrastTheme } from '@opengov/cds-themes'

const tokens = createTokens({
  color: colors,
  space,
  size: {
    ...space,
    // Additional semantic sizes
    iconSm: 16,
    iconMd: 20,
    iconLg: 24,
    iconXl: 32,
    touchTarget: 44, // Minimum touch target (iOS HIG + WCAG AAA)
    touchTargetLg: 48, // Material Design 3 minimum
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

const bodyFont = createFont({
  family: 'System',
  size: fontSize,
  lineHeight: {
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
  },
  weight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    xs: 0.4,
    sm: 0.25,
    md: 0,
    lg: 0,
    xl: -0.25,
    '2xl': -0.25,
    '3xl': -0.5,
    '4xl': -0.5,
    '5xl': -0.5,
    '6xl': -0.5,
    '7xl': -0.5,
  },
  face: {
    300: { normal: 'System' },
    400: { normal: 'System' },
    500: { normal: 'System' },
    600: { normal: 'System' },
    700: { normal: 'System' },
  },
})

const headingFont = createFont({
  ...bodyFont,
  weight: {
    regular: '600',
    bold: '700',
  },
  face: {
    600: { normal: 'System' },
    700: { normal: 'System' },
  },
})

export const config = createTamagui({
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

export type CdsConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends CdsConfig {}
}
