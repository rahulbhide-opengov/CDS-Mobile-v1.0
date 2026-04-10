import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Styled rule (the visible line itself)
// ---------------------------------------------------------------------------

const DividerLine = styled(Stack, {
  name: 'DividerLine',
  backgroundColor: '$borderColor',
  flexShrink: 1,
  flexGrow: 1,

  variants: {
    orientation: {
      horizontal: {
        height: 1,
        alignSelf: 'stretch',
      },
      vertical: {
        width: 1,
        alignSelf: 'stretch',
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
  },
})

// ---------------------------------------------------------------------------
// Label text rendered in the center of a labeled divider
// ---------------------------------------------------------------------------

const DividerLabel = styled(Text, {
  name: 'DividerLabel',
  fontSize: '$xs',
  lineHeight: '$xs',
  color: '$colorSecondary',
  fontWeight: '$medium',
  paddingHorizontal: 12,
  flexShrink: 0,
})

// ---------------------------------------------------------------------------
// Outer frame -- handles spacing (margin) around the divider
// ---------------------------------------------------------------------------

const SPACING_MAP = {
  none: 0,
  sm: 8,
  md: 16,
  lg: 24,
} as const

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface DividerProps {
  /** Direction of the divider line. */
  orientation?: 'horizontal' | 'vertical'
  /** Margin around the divider. */
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  /** Override the line color (defaults to `$borderColor`). */
  color?: string
  /** Optional label text rendered centered within the divider line. */
  label?: string
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

/**
 * `Divider` -- a horizontal or vertical rule that separates content.
 *
 * Supports optional centered label text and configurable spacing. The label
 * variant renders two line segments flanking the text, similar to "---or---"
 * patterns.
 */
export function Divider({
  orientation = 'horizontal',
  spacing = 'none',
  color,
  label,
  accessibilityLabel,
}: DividerProps) {
  const spacingValue = SPACING_MAP[spacing]

  // Color override applied directly to the line(s)
  const lineStyle = color ? { backgroundColor: color } : undefined

  // Margin applied differently depending on orientation
  const outerMargin =
    orientation === 'horizontal'
      ? { marginVertical: spacingValue }
      : { marginHorizontal: spacingValue }

  // Vertical dividers do not support labels -- render a simple line
  if (orientation === 'vertical') {
    return (
      <DividerLine
        orientation="vertical"
        {...outerMargin}
        {...lineStyle}
        role="separator"
        accessibilityLabel={accessibilityLabel ?? 'Divider'}
      />
    )
  }

  // Horizontal with label: two line segments flanking the text
  if (label) {
    return (
      <HStack
        alignItems="center"
        alignSelf="stretch"
        {...outerMargin}
        role="separator"
        accessibilityLabel={accessibilityLabel ?? label}
      >
        <DividerLine orientation="horizontal" {...lineStyle} />
        <DividerLabel>{label}</DividerLabel>
        <DividerLine orientation="horizontal" {...lineStyle} />
      </HStack>
    )
  }

  // Horizontal without label
  return (
    <DividerLine
      orientation="horizontal"
      {...outerMargin}
      {...lineStyle}
      role="separator"
      accessibilityLabel={accessibilityLabel ?? 'Divider'}
    />
  )
}

// Re-export the type for consumers that still import the old `GetProps` shape
export type { DividerProps as DividerComponentProps }
