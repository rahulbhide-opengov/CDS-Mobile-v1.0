/**
 * Container -- CDS 37 responsive layout wrapper
 *
 * Simple View wrapper that constrains content width with automatic
 * horizontal centering and configurable padding. Uses preset max-width
 * breakpoints aligned with the CDS design grid.
 *
 * maxWidth presets (matching CDS layout):
 *   sm:   390  (mobile)
 *   md:   768  (tablet)
 *   lg:   1024 (small desktop)
 *   xl:   1440 (desktop)
 *   full: 100%
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useMemo } from 'react'
import { Stack } from '@tamagui/core'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_WIDTH_PRESETS: Record<string, number | string> = {
  sm: 390,
  md: 768,
  lg: 1024,
  xl: 1440,
  full: '100%',
}

const DEFAULT_PADDING = 16  // Figma: 16px mobile padding

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | number

export interface ContainerProps {
  /** Maximum width constraint. Preset string or custom number (px). Defaults to "full". */
  maxWidth?: ContainerMaxWidth
  /** Horizontal + vertical padding. Defaults to 16 (mobile). Can be number or [vertical, horizontal]. */
  padding?: number | [number, number]
  /** When true, centers the container horizontally. Defaults to true. */
  centered?: boolean
  /** Background color override. */
  backgroundColor?: string
  /** Container content. */
  children: React.ReactNode
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Container = React.memo(function Container({
  maxWidth = 'full',
  padding = DEFAULT_PADDING,
  centered = true,
  backgroundColor,
  children,
  accessibilityLabel,
  testID,
}: ContainerProps) {
  const resolvedMaxWidth = useMemo(() => {
    if (typeof maxWidth === 'number') return maxWidth
    return MAX_WIDTH_PRESETS[maxWidth] ?? '100%'
  }, [maxWidth])

  const paddingValues = useMemo(() => {
    if (Array.isArray(padding)) {
      return {
        paddingVertical: padding[0],
        paddingHorizontal: padding[1],
      }
    }
    return {
      paddingVertical: 0,
      paddingHorizontal: padding,
    }
  }, [padding])

  return (
    <Stack
      width="100%"
      maxWidth={resolvedMaxWidth}
      alignSelf={centered ? 'center' : undefined}
      paddingHorizontal={paddingValues.paddingHorizontal}
      paddingVertical={paddingValues.paddingVertical}
      backgroundColor={backgroundColor}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {children}
    </Stack>
  )
})

Container.displayName = 'Container'
