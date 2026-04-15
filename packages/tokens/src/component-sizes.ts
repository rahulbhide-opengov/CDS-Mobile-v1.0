/**
 * COMPONENT SIZES -- Responsive sizing from CDS 37 Figma
 *
 * Extracted from Figma Semantic (Display) collection:
 *   File: MxdeZ8e13qSmlenBVMmzzI
 *   Collection: Semantic (Display)
 *   Variables: Spacings & Sizes/*
 *
 * Three breakpoints:
 *   Desktop (1440px) — smallest sizes, mouse-optimized
 *   Tablet  (768px)  — medium sizes, touch-optimized
 *   Mobile  (390px)  — largest sizes, finger-optimized
 *
 * For React Native (mobile-first), use `mobile` as default and
 * `tablet` for responsive overrides via media queries.
 */

export interface ResponsiveSize {
  desktop: number
  tablet: number
  mobile: number
}

// ---------------------------------------------------------------------------
// Button sizes
// ---------------------------------------------------------------------------

export const buttonSizes = {
  small:  { desktop: 28, tablet: 32, mobile: 32 },
  medium: { desktop: 32, tablet: 36, mobile: 40 },
  large:  { desktop: 40, tablet: 48, mobile: 48 },
} as const satisfies Record<string, ResponsiveSize>

// ---------------------------------------------------------------------------
// Input / TextField sizes
// ---------------------------------------------------------------------------

export const inputSizes = {
  small:  { desktop: 28, tablet: 32, mobile: 32 },
  medium: { desktop: 32, tablet: 36, mobile: 40 },
  large:  { desktop: 40, tablet: 44, mobile: 48 },
} as const satisfies Record<string, ResponsiveSize>

// ---------------------------------------------------------------------------
// Chip sizes
// ---------------------------------------------------------------------------

export const chipSizes = {
  small:  { desktop: 28, tablet: 32, mobile: 32 },
  medium: { desktop: 32, tablet: 36, mobile: 36 },
  large:  { desktop: 40, tablet: 44, mobile: 44 },
} as const satisfies Record<string, ResponsiveSize>

// Chip in Fields (smaller variant for chips inside input fields)
export const chipInFieldSizes = {
  small:  { desktop: 24, tablet: 28, mobile: 28 },
  medium: { desktop: 28, tablet: 32, mobile: 32 },
  large:  { desktop: 32, tablet: 36, mobile: 36 },
} as const satisfies Record<string, ResponsiveSize>

// ---------------------------------------------------------------------------
// FAB (Floating Action Button) sizes
// ---------------------------------------------------------------------------

export const fabSizes = {
  small:  { desktop: 32, tablet: 32, mobile: 32 },
  medium: { desktop: 40, tablet: 40, mobile: 40 },
  large:  { desktop: 50, tablet: 50, mobile: 50 },
} as const satisfies Record<string, ResponsiveSize>

// ---------------------------------------------------------------------------
// Table sizes
// ---------------------------------------------------------------------------

export const tableSizes = {
  header: { desktop: 50, tablet: 56, mobile: 64 },
  cell:   { desktop: 50, tablet: 56, mobile: 64 },
} as const satisfies Record<string, ResponsiveSize>

// ---------------------------------------------------------------------------
// Icon sizes (consistent across breakpoints)
// ---------------------------------------------------------------------------

export const iconSizes = {
  inherit: 16,
  small: 20,
  medium: 24,
  large: 32,
} as const

// ---------------------------------------------------------------------------
// Corner Radius (consistent across breakpoints)
// ---------------------------------------------------------------------------

export const cornerRadius = {
  none: 0,
  small: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  circular: 400,
} as const

// ---------------------------------------------------------------------------
// Border Width (consistent across breakpoints)
// ---------------------------------------------------------------------------

export const borderWidth = {
  none: 0,
  small: 1,
  medium: 2,
  large: 4,
} as const

// ---------------------------------------------------------------------------
// All component sizes (flat export for iteration)
// ---------------------------------------------------------------------------

export const allComponentSizes = {
  button: buttonSizes,
  input: inputSizes,
  chip: chipSizes,
  chipInField: chipInFieldSizes,
  fab: fabSizes,
  table: tableSizes,
} as const
