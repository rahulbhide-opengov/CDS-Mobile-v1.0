export type ShadowStyle = {
  shadowColor: string
  shadowOffset: { width: number; height: number }
  shadowOpacity: number
  shadowRadius: number
  elevation: number
}

const createShadow = (
  offsetY: number,
  opacity: number,
  radius: number,
  elevation: number,
  color: string = '#000000'
): ShadowStyle => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
})

export const shadows = {
  none: createShadow(0, 0, 0, 0),
  sm: createShadow(1, 0.08, 2, 1),
  md: createShadow(2, 0.12, 4, 3),
  lg: createShadow(4, 0.15, 8, 6), // CDS dropdown shadow
  xl: createShadow(8, 0.18, 16, 12),
  softSelected: createShadow(1, 0.1, 4, 2),
  hardSelected: createShadow(0, 0.2, 0, 1),
} as const

export type ShadowToken = keyof typeof shadows
