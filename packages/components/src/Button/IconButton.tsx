import React, { useCallback, useMemo } from 'react'
import { styled, type GetProps } from '@tamagui/core'
import { Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// IconButtonFrame -- circular icon-only button with all 7 CDS 37 variants
// ---------------------------------------------------------------------------

const IconButtonFrame = styled(Pressable, {
  name: 'IconButton',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,
  borderWidth: 0,

  // Focus ring
  focusStyle: {
    outlineWidth: 2,
    outlineColor: '#4B3FFF',
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  variants: {
    // -----------------------------------------------------------------------
    // Variant -- same 7 variants as Button, adapted for icon-only use
    // -----------------------------------------------------------------------
    variant: {
      primary: {
        backgroundColor: '$brandBackground',
        pressStyle: {
          backgroundColor: '$brandBackgroundPress',
        },
        hoverStyle: {
          backgroundColor: '$brandBackgroundHover',
        },
      },

      secondary: {
        backgroundColor: '$background',
        borderWidth: 1,
        borderColor: '$borderColor',
        pressStyle: {
          backgroundColor: '$backgroundPress',
          borderColor: '$borderColorPress',
        },
        hoverStyle: {
          backgroundColor: '$backgroundHover',
          borderColor: '$borderColorHover',
        },
      },

      secondaryAlt: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        pressStyle: {
          backgroundColor: '$backgroundPress',
          borderColor: '$borderColorPress',
        },
        hoverStyle: {
          backgroundColor: '$backgroundHover',
          borderColor: '$borderColorHover',
        },
      },

      tertiary: {
        backgroundColor: 'transparent',
        pressStyle: {
          backgroundColor: '$backgroundPress',
        },
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },

      tertiaryAlt: {
        backgroundColor: 'transparent',
        pressStyle: {
          backgroundColor: '$backgroundPress',
        },
        hoverStyle: {
          backgroundColor: '$backgroundHover',
        },
      },

      destructive: {
        backgroundColor: '$errorColor',
        pressStyle: {
          backgroundColor: '#661414',
        },
        hoverStyle: {
          backgroundColor: '#991F1F',
        },
      },

      destructiveAlt: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$errorColor',
        pressStyle: {
          backgroundColor: '#FFD6D6',
          borderColor: '$errorColor',
        },
        hoverStyle: {
          backgroundColor: '#FFF0F0',
          borderColor: '$errorColor',
        },
      },
    },

    // -----------------------------------------------------------------------
    // Size -- fixed square dimensions; always circular via borderRadius 9999
    // -----------------------------------------------------------------------
    size: {
      sm: {
        width: 32,
        height: 32,
        minWidth: 32,
        minHeight: 32,
      },
      md: {
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
      },
      lg: {
        width: 48,
        height: 48,
        minWidth: 48,
        minHeight: 48,
      },
    },

    // -----------------------------------------------------------------------
    // Disabled
    // -----------------------------------------------------------------------
    disabled: {
      true: {
        opacity: 1,
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

type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryAlt'
  | 'tertiary'
  | 'tertiaryAlt'
  | 'destructive'
  | 'destructiveAlt'

type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps {
  /** Visual variant. Defaults to "primary". */
  variant?: IconButtonVariant
  /** Size preset. Defaults to "md". */
  size?: IconButtonSize
  /** Disables the button. */
  disabled?: boolean
  /** Icon element to render. */
  icon: React.ReactNode
  /** Press handler. */
  onPress?: () => void
  /** Long-press handler (useful for tooltip reveal on mobile). */
  onLongPress?: () => void
  /** Required accessibility label since there is no visible text. */
  accessibilityLabel: string
  /** Optional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Disabled background resolver
// ---------------------------------------------------------------------------

const DISABLED_BG_FILLED = '$backgroundStrong'
const DISABLED_BG_TRANSPARENT = 'transparent'

function getDisabledBackground(variant: IconButtonVariant): string {
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'destructive':
      return DISABLED_BG_FILLED
    case 'secondaryAlt':
    case 'tertiary':
    case 'tertiaryAlt':
    case 'destructiveAlt':
      return DISABLED_BG_TRANSPARENT
    default:
      return DISABLED_BG_FILLED
  }
}

function getDisabledBorder(variant: IconButtonVariant): string | undefined {
  switch (variant) {
    case 'secondary':
    case 'secondaryAlt':
    case 'destructiveAlt':
      return '$borderColorDisabled'
    default:
      return undefined
  }
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

  // hitSlop to ensure 44pt minimum touch target for sm size
  const hitSlop = size === 'sm' ? { top: 6, bottom: 6, left: 6, right: 6 } : undefined

  const a11yLabel = useMemo(() => {
    return disabled ? `${accessibilityLabel}, disabled` : accessibilityLabel
  }, [accessibilityLabel, disabled])

  const disabledOverrides = disabled
    ? {
        backgroundColor: getDisabledBackground(variant),
        borderColor: getDisabledBorder(variant),
        pressStyle: { backgroundColor: getDisabledBackground(variant) },
        hoverStyle: { backgroundColor: getDisabledBackground(variant) },
      }
    : undefined

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
      testID={testID}
      {...disabledOverrides}
    >
      {icon}
    </IconButtonFrame>
  )
})

IconButton.displayName = 'IconButton'
