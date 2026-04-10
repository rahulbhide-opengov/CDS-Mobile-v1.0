export const radii = {
  none: 0,
  sm: 2,
  md: 4, // CDS default
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999, // Pill/circle
} as const

export type RadiusToken = keyof typeof radii
