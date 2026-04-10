import { primitive } from './primitive'

/**
 * BORDER RADIUS TOKENS
 *
 * Derived from `primitive.radiusBase` (4px in CDS 37). CDS 37 uses 4px
 * universally for most components, with multiples for larger surfaces
 * like dialogs and bottom sheets.
 *
 * All values scale proportionally when `radiusBase` is overridden in a
 * white-label brand configuration.
 */
export const radii = {
  none: 0,
  sm: primitive.radiusBase / 2, // 2px
  md: primitive.radiusBase, // 4px -- CDS 37 default
  lg: primitive.radiusBase * 2, // 8px -- dialogs, cards
  xl: primitive.radiusBase * 3, // 12px -- bottom sheets
  '2xl': primitive.radiusBase * 4, // 16px -- bottom sheet top corners
  full: 9999, // Pill / circle
} as const

export type RadiusToken = keyof typeof radii
