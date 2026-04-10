export const breakpoints = {
  phone: 0,
  tabletSmall: 600,
  tablet: 768,
  tabletLarge: 1024,
} as const

export type BreakpointToken = keyof typeof breakpoints
