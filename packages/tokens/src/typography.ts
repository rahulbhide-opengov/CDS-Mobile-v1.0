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

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

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

export const letterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1.0,
} as const

export type FontSizeToken = keyof typeof fontSize
export type FontWeightToken = keyof typeof fontWeight
export type LineHeightToken = keyof typeof lineHeight
