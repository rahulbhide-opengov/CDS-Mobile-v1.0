/**
 * IconButton -- CDS 37 Figma-accurate icon-only button
 *
 * Same 7 type variants and 3 sizes as Button, but square/circular with no label.
 * Sizes: sm=28x28, md=32x32, lg=40x40 (matching Button heights).
 * Border radius: 9999 for circular shape.
 * Disabled: 38% opacity on the entire button (Figma opacity: 0.38).
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo } from 'react'
import { styled, Stack } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: disabled state uses 38% opacity on the whole component */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

// ---------------------------------------------------------------------------
// IconButtonFrame -- circular Tamagui styled frame with CDS 37 variant system
// ---------------------------------------------------------------------------

const IconButtonFrame = styled(Stack, {
  name: 'IconButton',
  tag: 'button',
  role: 'button',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
  borderWidth: 0,
  cursor: 'pointer',
  // Reset any inherited minimums so 28px renders correctly
  minWidth: 0,
  minHeight: 0,

  variants: {
    // -----------------------------------------------------------------------
    // variant -- same 7 CDS 37 types, same idle/pressed colors as Button
    // -----------------------------------------------------------------------
    variant: {
      primary: {
        backgroundColor: primitive.blurple700,
        pressStyle: {
          backgroundColor: primitive.blurple900,
        },
        hoverStyle: {
          backgroundColor: primitive.blurple900,
        },
      },

      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: primitive.blurple700,
        pressStyle: {
          backgroundColor: primitive.blurple100,
          borderColor: primitive.blurple900,
        },
        hoverStyle: {
          backgroundColor: primitive.blurple100,
          borderColor: primitive.blurple900,
        },
      },

      secondaryAlt: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        pressStyle: {
          backgroundColor: primitive.blurple100,
        },
        hoverStyle: {
          backgroundColor: primitive.blurple100,
        },
      },

      tertiary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: primitive.slate700,
        pressStyle: {
          backgroundColor: primitive.gray100,
        },
        hoverStyle: {
          backgroundColor: primitive.gray100,
        },
      },

      tertiaryAlt: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        pressStyle: {
          backgroundColor: primitive.gray100,
        },
        hoverStyle: {
          backgroundColor: primitive.gray100,
        },
      },

      destructive: {
        backgroundColor: primitive.red600,
        pressStyle: {
          backgroundColor: primitive.red700,
        },
        hoverStyle: {
          backgroundColor: primitive.red700,
        },
      },

      destructiveAlt: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        pressStyle: {
          backgroundColor: primitive.red700,
        },
        hoverStyle: {
          backgroundColor: primitive.red700,
        },
      },
    },

    // -----------------------------------------------------------------------
    // size -- fixed square dimensions matching CDS 37 button heights
    // sm=28x28, md=32x32, lg=40x40
    // -----------------------------------------------------------------------
    size: {
      sm: {
        width: 28,
        height: 28,
        minWidth: 28,
        minHeight: 28,
      },
      md: {
        width: 32,
        height: 32,
        minWidth: 32,
        minHeight: 32,
      },
      lg: {
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
      },
    },

    // -----------------------------------------------------------------------
    // disabled -- Figma uses opacity 0.38 on the entire component.
    // Colors stay the same as idle; only the opacity changes.
    // -----------------------------------------------------------------------
    disabled: {
      true: {
        opacity: DISABLED_OPACITY,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryAlt'
  | 'tertiary'
  | 'tertiaryAlt'
  | 'destructive'
  | 'destructiveAlt'

export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps {
  /** CDS 37 type variant. Defaults to "primary". */
  variant?: IconButtonVariant
  /** Size preset. Defaults to "md" (32x32). */
  size?: IconButtonSize
  /** Disables the button -- applies 38% opacity per Figma spec. */
  disabled?: boolean
  /** Icon element to render (ReactNode). */
  icon: React.ReactNode
  /** Press handler. Not called when disabled. */
  onPress?: () => void
  /** Long-press handler (useful for tooltip reveal on mobile). */
  onLongPress?: () => void
  /** Required accessibility label since there is no visible text. */
  accessibilityLabel: string
  /** Whether to show the focus ring. Maps to Figma "focusRing" prop. */
  focusRing?: boolean
  /** Optional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Focus ring style
// ---------------------------------------------------------------------------

const FOCUS_RING_STYLE = {
  outlineWidth: 2,
  outlineColor: primitive.blurple700,
  outlineStyle: 'solid' as const,
  outlineOffset: 2,
}

// ---------------------------------------------------------------------------
// IconButton component
// ---------------------------------------------------------------------------

export const IconButton = React.memo(function IconButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  onPress,
  onLongPress,
  accessibilityLabel,
  focusRing = true,
  testID,
}: IconButtonProps) {
  const handlePress = useCallback(() => {
    if (!disabled && onPress) {
      onPress()
    }
  }, [disabled, onPress])

  const handleLongPress = useCallback(() => {
    if (!disabled && onLongPress) {
      onLongPress()
    }
  }, [disabled, onLongPress])

  // hitSlop ensures small buttons meet 44pt minimum touch target.
  // sm=28px needs (44-28)/2=8, md=32px needs (44-32)/2=6
  const hitSlop = useMemo(() => {
    if (size === 'sm') {
      const pad = Math.ceil((MIN_TOUCH_TARGET - 28) / 2)
      return { top: pad, bottom: pad, left: pad, right: pad }
    }
    if (size === 'md') {
      const pad = Math.ceil((MIN_TOUCH_TARGET - 32) / 2)
      return { top: pad, bottom: pad, left: pad, right: pad }
    }
    return undefined // lg is 40px, close enough to 44
  }, [size])

  const a11yLabel = useMemo(() => {
    return disabled ? `${accessibilityLabel}, disabled` : accessibilityLabel
  }, [accessibilityLabel, disabled])

  return (
    <IconButtonFrame
      variant={variant}
      size={size}
      disabled={disabled || undefined}
      onPress={handlePress}
      onLongPress={onLongPress ? handleLongPress : undefined}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled }}
      focusStyle={focusRing ? FOCUS_RING_STYLE : undefined}
      testID={testID}
    >
      {icon}
    </IconButtonFrame>
  )
})

IconButton.displayName = 'IconButton'
