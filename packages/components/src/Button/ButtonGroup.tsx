/**
 * ButtonGroup -- CDS 37 toolbar container for grouped buttons
 *
 * Source of truth: CDS 37 Figma component node 15636:9905
 *
 * Variants:   Contained, Outlined, Text (3 visual styles)
 * Colors:     Primary, Secondary, Error, Warning, Info, Success, Inherit
 * Orientations: Horizontal, Vertical
 * Spacing modes: compact (0px, connected borders), default (8px), loose (16px)
 *
 * The variant/color props are passed down to child buttons via cloneElement,
 * overriding individual button variants to ensure visual consistency within
 * the group. Compact spacing applies border-radius merging and shared-border
 * handling that varies by variant type.
 *
 * Uses accessibilityRole="toolbar" per WAI-ARIA toolbar pattern.
 */

import React, { Children, cloneElement, isValidElement, useMemo } from 'react'
import { styled, Stack } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: button border radius used for compact group outer corners */
const BUTTON_RADIUS = 4

// ---------------------------------------------------------------------------
// Color configuration -- maps ButtonGroup color prop to background, text,
// border, and divider colors for each variant type.
//
// Figma CDS 37 node 15636:9905:
//   Contained: solid fill, white text (except inherit), divider between buttons
//   Outlined:  1px border in the color, transparent bg, colored text
//   Text:      no border, transparent bg, colored text
// ---------------------------------------------------------------------------

export type ButtonGroupColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'inherit'

export type ButtonGroupVariant = 'contained' | 'outlined' | 'text'

interface ColorConfig {
  /** Background for contained variant */
  containedBg: string
  /** Text color for contained variant */
  containedText: string
  /** Press/hover background for contained variant */
  containedPressedBg: string
  /** Border/text color for outlined variant */
  outlinedColor: string
  /** Press/hover bg for outlined variant */
  outlinedPressedBg: string
  /** Text color for text variant */
  textColor: string
  /** Press/hover bg for text variant */
  textPressedBg: string
  /** Divider color between contained buttons */
  dividerColor: string
}

const COLOR_MAP: Record<ButtonGroupColor, ColorConfig> = {
  primary: {
    containedBg: primitive.blurple700,
    containedText: primitive.white,
    containedPressedBg: primitive.blurple900,
    outlinedColor: primitive.blurple700,
    outlinedPressedBg: primitive.blurple50,
    textColor: primitive.blurple700,
    textPressedBg: primitive.blurple50,
    dividerColor: primitive.blurple900,
  },
  secondary: {
    containedBg: primitive.slate700,
    containedText: primitive.white,
    containedPressedBg: primitive.slate900,
    outlinedColor: primitive.slate700,
    outlinedPressedBg: primitive.slate50,
    textColor: primitive.slate700,
    textPressedBg: primitive.slate50,
    dividerColor: primitive.slate900,
  },
  error: {
    containedBg: primitive.red600,
    containedText: primitive.white,
    containedPressedBg: primitive.red700,
    outlinedColor: primitive.red600,
    outlinedPressedBg: primitive.red50,
    textColor: primitive.red600,
    textPressedBg: primitive.red50,
    dividerColor: primitive.red700,
  },
  warning: {
    containedBg: primitive.yellow700,
    containedText: primitive.white,
    containedPressedBg: primitive.yellow800,
    outlinedColor: primitive.yellow700,
    outlinedPressedBg: primitive.yellow50,
    textColor: primitive.yellow700,
    textPressedBg: primitive.yellow50,
    dividerColor: primitive.yellow800,
  },
  info: {
    containedBg: primitive.cerulean700,
    containedText: primitive.white,
    containedPressedBg: primitive.cerulean800,
    outlinedColor: primitive.cerulean700,
    outlinedPressedBg: primitive.cerulean50,
    textColor: primitive.cerulean700,
    textPressedBg: primitive.cerulean50,
    dividerColor: primitive.cerulean800,
  },
  success: {
    containedBg: primitive.green700,
    containedText: primitive.white,
    containedPressedBg: primitive.green800,
    outlinedColor: primitive.green700,
    outlinedPressedBg: primitive.green50,
    textColor: primitive.green700,
    textPressedBg: primitive.green50,
    dividerColor: primitive.green800,
  },
  inherit: {
    containedBg: primitive.gray100,
    containedText: 'rgba(0,0,0,0.87)',
    containedPressedBg: primitive.gray200,
    outlinedColor: 'rgba(0,0,0,0.23)',
    outlinedPressedBg: primitive.gray50,
    textColor: 'rgba(0,0,0,0.87)',
    textPressedBg: primitive.gray50,
    dividerColor: primitive.gray300,
  },
}

// ---------------------------------------------------------------------------
// ButtonGroupFrame -- layout container
// ---------------------------------------------------------------------------

const ButtonGroupFrame = styled(Stack, {
  name: 'ButtonGroup',

  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      vertical: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },

    spacing: {
      compact: {
        gap: 0,
      },
      default: {
        gap: 8,
      },
      loose: {
        gap: 16,
      },
    },
  } as const,

  defaultVariants: {
    orientation: 'horizontal',
    spacing: 'default',
  },
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ButtonGroupProps {
  /** Visual style variant. Defaults to "contained". */
  variant?: ButtonGroupVariant
  /** Color theme applied to all buttons in the group. Defaults to "primary". */
  color?: ButtonGroupColor
  /** Layout direction. Defaults to "horizontal". */
  orientation?: 'horizontal' | 'vertical'
  /** Spacing between buttons. "compact" connects borders. Defaults to "compact". */
  spacing?: 'compact' | 'default' | 'loose'
  /** Button children. */
  children: React.ReactNode
  /** Optional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Shared-border and border-radius overrides
//
// In compact mode, adjacent buttons share borders:
//   - Contained: no individual borders, divider lines between buttons
//   - Outlined: 1px border, inner edges collapse to avoid double borders
//   - Text: no borders at all
// ---------------------------------------------------------------------------

interface ChildOverrides {
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderWidth?: number
  borderRightWidth?: number
  borderBottomWidth?: number
  borderLeftWidth?: number
  borderTopWidth?: number
  borderColor?: string
  backgroundColor?: string
  color?: string
  pressStyle?: Record<string, unknown>
  hoverStyle?: Record<string, unknown>
}

function getCompactOverrides(
  index: number,
  count: number,
  orientation: 'horizontal' | 'vertical',
  groupVariant: ButtonGroupVariant,
  colors: ColorConfig,
): ChildOverrides {
  const isFirst = index === 0
  const isLast = index === count - 1
  const overrides: ChildOverrides = {}

  // -- Border radius: outer corners get BUTTON_RADIUS, inner corners get 0 ---
  if (count === 1) {
    overrides.borderRadius = BUTTON_RADIUS
  } else if (orientation === 'horizontal') {
    if (isFirst) {
      overrides.borderTopLeftRadius = BUTTON_RADIUS
      overrides.borderBottomLeftRadius = BUTTON_RADIUS
      overrides.borderTopRightRadius = 0
      overrides.borderBottomRightRadius = 0
    } else if (isLast) {
      overrides.borderTopLeftRadius = 0
      overrides.borderBottomLeftRadius = 0
      overrides.borderTopRightRadius = BUTTON_RADIUS
      overrides.borderBottomRightRadius = BUTTON_RADIUS
    } else {
      overrides.borderRadius = 0
    }
  } else {
    // Vertical
    if (isFirst) {
      overrides.borderTopLeftRadius = BUTTON_RADIUS
      overrides.borderTopRightRadius = BUTTON_RADIUS
      overrides.borderBottomLeftRadius = 0
      overrides.borderBottomRightRadius = 0
    } else if (isLast) {
      overrides.borderTopLeftRadius = 0
      overrides.borderTopRightRadius = 0
      overrides.borderBottomLeftRadius = BUTTON_RADIUS
      overrides.borderBottomRightRadius = BUTTON_RADIUS
    } else {
      overrides.borderRadius = 0
    }
  }

  // -- Variant-specific border handling --------------------------------------
  if (groupVariant === 'contained') {
    // Contained: no visible borders, solid bg. Dividers are handled via
    // borderRight/borderBottom on non-last buttons.
    overrides.borderWidth = 0
    overrides.backgroundColor = colors.containedBg
    overrides.pressStyle = { backgroundColor: colors.containedPressedBg }
    overrides.hoverStyle = { backgroundColor: colors.containedPressedBg }

    if (!isLast) {
      if (orientation === 'horizontal') {
        overrides.borderRightWidth = 1
        overrides.borderColor = colors.dividerColor
      } else {
        overrides.borderBottomWidth = 1
        overrides.borderColor = colors.dividerColor
      }
    }
  } else if (groupVariant === 'outlined') {
    // Outlined: 1px border, collapse inner borders to avoid doubling
    overrides.borderWidth = 1
    overrides.borderColor = colors.outlinedColor
    overrides.backgroundColor = 'transparent'
    overrides.pressStyle = { backgroundColor: colors.outlinedPressedBg }
    overrides.hoverStyle = { backgroundColor: colors.outlinedPressedBg }

    // Collapse shared borders between adjacent buttons
    if (!isLast) {
      if (orientation === 'horizontal') {
        overrides.borderRightWidth = 0
      } else {
        overrides.borderBottomWidth = 0
      }
    }
  } else {
    // Text: no borders, transparent bg
    overrides.borderWidth = 0
    overrides.backgroundColor = 'transparent'
    overrides.pressStyle = { backgroundColor: colors.textPressedBg }
    overrides.hoverStyle = { backgroundColor: colors.textPressedBg }
  }

  return overrides
}

// ---------------------------------------------------------------------------
// Map ButtonGroup variant/color to child Button text color prop
// ---------------------------------------------------------------------------

function getChildTextColor(
  groupVariant: ButtonGroupVariant,
  colors: ColorConfig,
): string {
  switch (groupVariant) {
    case 'contained':
      return colors.containedText
    case 'outlined':
      return colors.outlinedColor
    case 'text':
      return colors.textColor
  }
}

// ---------------------------------------------------------------------------
// ButtonGroup component
// ---------------------------------------------------------------------------

export const ButtonGroup = React.memo(function ButtonGroup({
  variant = 'contained',
  color = 'primary',
  orientation = 'horizontal',
  spacing = 'compact',
  children,
  testID,
}: ButtonGroupProps) {
  const colors = COLOR_MAP[color]

  // Process children: inject variant/color overrides and (in compact mode)
  // border-radius/border merging overrides.
  const processedChildren = useMemo(() => {
    const validChildren = Children.toArray(children).filter(isValidElement)
    const count = validChildren.length

    if (count === 0) return children

    const textColor = getChildTextColor(variant, colors)

    return validChildren.map((child, index) => {
      // Build the props to inject into each child button
      const childProps: Record<string, unknown> = {
        key: (child as React.ReactElement).key ?? index,
      }

      // Always pass the group-level text/label color so child Button components
      // can pick it up (the Button component reads _groupTextColor for override)
      childProps._groupTextColor = textColor

      // In compact mode, inject border/radius overrides
      if (spacing === 'compact') {
        const overrides = getCompactOverrides(
          index,
          count,
          orientation,
          variant,
          colors,
        )
        Object.assign(childProps, overrides)
      } else {
        // Even in non-compact modes, apply the variant styling to each button
        if (variant === 'contained') {
          childProps.backgroundColor = colors.containedBg
          childProps.borderWidth = 0
          childProps.pressStyle = { backgroundColor: colors.containedPressedBg }
          childProps.hoverStyle = { backgroundColor: colors.containedPressedBg }
        } else if (variant === 'outlined') {
          childProps.backgroundColor = 'transparent'
          childProps.borderWidth = 1
          childProps.borderColor = colors.outlinedColor
          childProps.pressStyle = { backgroundColor: colors.outlinedPressedBg }
          childProps.hoverStyle = { backgroundColor: colors.outlinedPressedBg }
        } else {
          childProps.backgroundColor = 'transparent'
          childProps.borderWidth = 0
          childProps.pressStyle = { backgroundColor: colors.textPressedBg }
          childProps.hoverStyle = { backgroundColor: colors.textPressedBg }
        }
      }

      return cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        childProps,
      )
    })
  }, [children, spacing, orientation, variant, colors])

  return (
    <ButtonGroupFrame
      orientation={orientation}
      spacing={spacing}
      accessibilityRole="toolbar"
      testID={testID}
    >
      {processedChildren}
    </ButtonGroupFrame>
  )
})

ButtonGroup.displayName = 'ButtonGroup'
