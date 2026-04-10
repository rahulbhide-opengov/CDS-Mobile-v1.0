import React, { Children, cloneElement, isValidElement, useMemo } from 'react'
import { styled, Stack } from '@tamagui/core'

// ---------------------------------------------------------------------------
// ButtonGroupFrame -- layout container for grouped buttons
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
  /** Layout direction. Defaults to "horizontal". */
  orientation?: 'horizontal' | 'vertical'
  /** Spacing between buttons. "compact" connects borders. Defaults to "default". */
  spacing?: 'compact' | 'default' | 'loose'
  /** Button children. */
  children: React.ReactNode
  /** Optional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Border-radius overrides for compact mode
// ---------------------------------------------------------------------------

interface CompactRadiusOverrides {
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderRightWidth?: number
  borderBottomWidth?: number
}

function getCompactOverrides(
  index: number,
  count: number,
  orientation: 'horizontal' | 'vertical'
): CompactRadiusOverrides {
  const isFirst = index === 0
  const isLast = index === count - 1
  const isMiddle = !isFirst && !isLast
  const radius = 4 // $md

  if (count === 1) {
    // Single button -- keep all corners
    return { borderRadius: radius }
  }

  if (orientation === 'horizontal') {
    if (isFirst) {
      return {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0, // avoid double border
      }
    }
    if (isLast) {
      return {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
      }
    }
    // Middle
    return {
      borderRadius: 0,
      borderRightWidth: 0,
    }
  }

  // Vertical orientation
  if (isFirst) {
    return {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
    }
  }
  if (isLast) {
    return {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: radius,
      borderBottomRightRadius: radius,
    }
  }
  // Middle
  return {
    borderRadius: 0,
    borderBottomWidth: 0,
  }
}

// ---------------------------------------------------------------------------
// ButtonGroup component
// ---------------------------------------------------------------------------

export const ButtonGroup = React.memo(function ButtonGroup({
  orientation = 'horizontal',
  spacing = 'default',
  children,
  testID,
}: ButtonGroupProps) {
  // For compact mode, inject border-radius and border overrides into each child
  const processedChildren = useMemo(() => {
    if (spacing !== 'compact') return children

    const validChildren = Children.toArray(children).filter(isValidElement)
    const count = validChildren.length

    if (count === 0) return children

    return validChildren.map((child, index) => {
      const overrides = getCompactOverrides(index, count, orientation)
      return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
        key: (child as React.ReactElement).key ?? index,
        ...overrides,
      })
    })
  }, [children, spacing, orientation])

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
