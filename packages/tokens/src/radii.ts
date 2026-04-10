import { primitive } from './primitive'

/**
 * BORDER RADIUS TOKENS
 *
 * Matches CDS 37 Figma exactly:
 *   none=0, small=4, medium=8, large=12, xlarge=16, circular=400
 *
 * Note: Figma uses "circular: 400" for pill shapes but we use 9999
 * which is the standard React Native approach for full rounding.
 */
export const radii = {
  none: 0,
  sm: primitive.radiusBase,         // 4px — Figma "small"
  md: primitive.radiusBase * 2,     // 8px — Figma "medium"
  lg: primitive.radiusBase * 3,     // 12px — Figma "large"
  xl: primitive.radiusBase * 4,     // 16px — Figma "xlarge"
  full: 9999,                       // Pill / circle (Figma uses 400 but RN needs 9999)
} as const

export type RadiusToken = keyof typeof radii
