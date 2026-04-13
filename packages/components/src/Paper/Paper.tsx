/**
 * Paper -- CDS 37 Figma-accurate implementation
 *
 * An elevated surface container that provides depth through shadow elevation
 * or a visible outline border. Serves as the foundational surface component
 * for cards, dialogs, menus, and other overlaid content.
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 * Shadows reference `shadows.*` from @opengov/cds-tokens.
 */

import React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import { styled, Stack } from '@tamagui/core'
import { primitive, shadows, type ShadowStyle } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default border radius (CDS 37: small = 4px) */
const DEFAULT_RADIUS = primitive.radiusBase // 4

/** Default padding */
const DEFAULT_PADDING = 16

/** Outlined variant border */
const OUTLINED_BORDER_COLOR = 'rgba(0,0,0,0.12)'
const OUTLINED_BORDER_WIDTH = 1

/** Background color for paper surfaces */
const PAPER_BG = primitive.white

// ---------------------------------------------------------------------------
// Elevation-to-shadow mapping
//
// Maps Material-style 0-24 elevation values to CDS shadow tokens.
// The CDS shadow system uses 5 levels (none, sm, md, lg, xl); we bucket
// the 25 MUI levels into these categories.
// ---------------------------------------------------------------------------

function getElevationShadow(elevation: number): ShadowStyle {
  if (elevation <= 0) return shadows.none
  if (elevation === 1) return shadows.sm
  if (elevation <= 3) return shadows.md
  if (elevation <= 8) return shadows.lg
  return shadows.xl
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaperProps {
  /**
   * Elevation depth (0-24). Higher values cast deeper shadows.
   * Only applies when variant is "elevation". Defaults to 1.
   */
  elevation?: number
  /**
   * Visual variant. "elevation" uses shadows; "outlined" uses a border.
   * Defaults to "elevation".
   */
  variant?: 'elevation' | 'outlined'
  /**
   * Inner padding in pixels. Pass a number for uniform padding or an object
   * for per-side values. Defaults to 16.
   */
  padding?: number | { top?: number; right?: number; bottom?: number; left?: number }
  /**
   * Corner radius in pixels. Defaults to 4 (CDS 37 small radius).
   */
  borderRadius?: number
  /** Content to render inside the paper surface. */
  children: React.ReactNode
  /** Background color override. Defaults to white. */
  backgroundColor?: string
  /** Accessibility label for screen readers. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Paper component
// ---------------------------------------------------------------------------

/**
 * `Paper` -- elevated surface container following CDS 37 elevation patterns.
 *
 * Provides visual depth through either shadow elevation (0-24) or an outlined
 * border. Used as the surface primitive for cards, dialogs, dropdown menus,
 * and other floating or layered content.
 *
 * The elevation prop maps MUI-compatible 0-24 levels to CDS shadow tokens:
 *   0 = none, 1 = sm, 2-3 = md, 4-8 = lg, 8+ = xl
 */
export const Paper = React.memo(function Paper({
  elevation = 1,
  variant = 'elevation',
  padding = DEFAULT_PADDING,
  borderRadius = DEFAULT_RADIUS,
  children,
  backgroundColor = PAPER_BG,
  accessibilityLabel,
  testID,
}: PaperProps) {
  // ---- Build the style object -----------------------------------------------

  const containerStyle: ViewStyle[] = [
    styles.base,
    { borderRadius, backgroundColor },
  ]

  // Padding -- uniform number or per-side object
  if (typeof padding === 'number') {
    containerStyle.push({ padding })
  } else {
    containerStyle.push({
      paddingTop: padding.top ?? 0,
      paddingRight: padding.right ?? 0,
      paddingBottom: padding.bottom ?? 0,
      paddingLeft: padding.left ?? 0,
    })
  }

  // Variant-specific styles
  if (variant === 'outlined') {
    containerStyle.push(styles.outlined)
  } else {
    // Elevation shadow
    const shadow = getElevationShadow(elevation)
    containerStyle.push({
      shadowColor: shadow.shadowColor,
      shadowOffset: shadow.shadowOffset,
      shadowOpacity: shadow.shadowOpacity,
      shadowRadius: shadow.shadowRadius,
      elevation: shadow.elevation,
    })
  }

  return (
    <View
      style={containerStyle}
      accessible={!!accessibilityLabel}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </View>
  )
})

Paper.displayName = 'Paper'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  outlined: {
    borderWidth: OUTLINED_BORDER_WIDTH,
    borderColor: OUTLINED_BORDER_COLOR,
    // No shadow for outlined variant
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
})
