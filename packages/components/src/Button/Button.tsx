import React, { useCallback, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Pressable, Text } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// ButtonFrame -- Tamagui styled frame with all 7 CDS 37 variants & 3 sizes
// ---------------------------------------------------------------------------

const ButtonFrame = styled(Pressable, {
  name: 'Button',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$1',
  borderRadius: '$md',
  borderWidth: 0,

  // Focus ring
  focusStyle: {
    outlineWidth: 2,
    outlineColor: colors.primary,
    outlineStyle: 'solid',
    outlineOffset: 2,
  },

  variants: {
    // -----------------------------------------------------------------------
    // Variant -- maps directly to CDS 37 button variants
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
          backgroundColor: colors.red800, // red800 pressed
        },
        hoverStyle: {
          backgroundColor: colors.red700, // red700 hover
        },
      },

      destructiveAlt: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$errorColor',
        pressStyle: {
          backgroundColor: colors.red100, // red100 pressed
          borderColor: '$errorColor',
        },
        hoverStyle: {
          backgroundColor: colors.red50, // red50 hover
          borderColor: '$errorColor',
        },
      },
    },

    // -----------------------------------------------------------------------
    // Size -- sm / md / lg with explicit padding values from CDS 37 spec
    // -----------------------------------------------------------------------
    size: {
      sm: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        minHeight: 28,   // CDS 37 Figma: Small = 28px
      },
      md: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        minHeight: 32,   // CDS 37 Figma: Medium = 32px
      },
      lg: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        minHeight: 40,   // CDS 37 Figma: Large = 40px
      },
    },

    // -----------------------------------------------------------------------
    // Full width stretches to fill container
    // -----------------------------------------------------------------------
    fullWidth: {
      true: {
        alignSelf: 'stretch',
        width: '100%',
      },
    },

    // -----------------------------------------------------------------------
    // Disabled -- unified disabled appearance across all variants
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
// ButtonText -- styled text with per-variant color mapping
// ---------------------------------------------------------------------------

const ButtonText = styled(Text, {
  name: 'ButtonText',
  fontFamily: '$body',
  fontWeight: '$medium',
  userSelect: 'none',

  variants: {
    variant: {
      primary: { color: 'white' },
      secondary: { color: '$brandBackground' },
      secondaryAlt: { color: '$color' },
      tertiary: { color: '$brandBackground' },
      tertiaryAlt: { color: '$color' },
      destructive: { color: 'white' },
      destructiveAlt: { color: '$errorColor' },
    },

    size: {
      sm: { fontSize: '$xs', lineHeight: '$xs' },
      md: { fontSize: '$sm', lineHeight: '$sm' },
      lg: { fontSize: '$md', lineHeight: '$md' },
    },

    disabled: {
      true: {
        color: '$colorDisabled',
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

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryAlt'
  | 'tertiary'
  | 'tertiaryAlt'
  | 'destructive'
  | 'destructiveAlt'

type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** Visual variant. Defaults to "primary". */
  variant?: ButtonVariant
  /** Size preset. Defaults to "md". */
  size?: ButtonSize
  /** Disables the button and applies muted styling. */
  disabled?: boolean
  /** Shows a loading spinner and disables press interactions. */
  loading?: boolean
  /** Icon element rendered before the label text. */
  iconLeft?: React.ReactNode
  /** Icon element rendered after the label text. */
  iconRight?: React.ReactNode
  /** When true the button stretches to fill its container width. */
  fullWidth?: boolean
  /** Press handler. Not called when disabled or loading. */
  onPress?: () => void
  /** Button label -- string or React element. */
  children: React.ReactNode
  /** Accessibility label override. Falls back to children if a string. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Disabled background resolver
// ---------------------------------------------------------------------------

const DISABLED_BG_FILLED = '$backgroundStrong' // neutral100 for solid variants
const DISABLED_BG_TRANSPARENT = 'transparent' // for ghost/outline variants

function getDisabledBackground(variant: ButtonVariant): string {
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

function getDisabledBorder(variant: ButtonVariant): string | undefined {
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
// Spinner color resolver
// ---------------------------------------------------------------------------

function getSpinnerColor(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
    case 'destructive':
      return colors.white
    case 'secondary':
    case 'tertiary':
      return colors.primary
    case 'destructiveAlt':
      return colors.red600
    case 'secondaryAlt':
    case 'tertiaryAlt':
    default:
      return primitive.neutral700
  }
}

// ---------------------------------------------------------------------------
// Button component
// ---------------------------------------------------------------------------

export const Button = React.memo(function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  fullWidth,
  onPress,
  children,
  accessibilityLabel,
  testID,
}: ButtonProps) {
  const isDisabled = disabled || loading

  const handlePress = useCallback(() => {
    if (!isDisabled && onPress) {
      onPress()
    }
  }, [isDisabled, onPress])

  // Derive the label string for accessibility
  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    if (typeof children === 'string') {
      return loading ? `${children}, loading` : children
    }
    return loading ? 'Loading' : undefined
  }, [accessibilityLabel, children, loading])

  // hitSlop ensures sm buttons still meet 44pt minimum touch target
  const hitSlop = size === 'sm' ? { top: 6, bottom: 6, left: 6, right: 6 } : undefined

  // Disabled styling is applied as inline overrides so the Tamagui variant
  // system handles the base shape while we control the disabled palette.
  const disabledOverrides = isDisabled
    ? {
        backgroundColor: getDisabledBackground(variant),
        borderColor: getDisabledBorder(variant),
        pressStyle: { backgroundColor: getDisabledBackground(variant) },
        hoverStyle: { backgroundColor: getDisabledBackground(variant) },
      }
    : undefined

  return (
    <ButtonFrame
      variant={variant}
      size={size}
      fullWidth={fullWidth || undefined}
      disabled={isDisabled || undefined}
      onPress={handlePress}
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      testID={testID}
      {...disabledOverrides}
    >
      {/* Loading spinner replaces iconLeft position */}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isDisabled ? primitive.neutral400 : getSpinnerColor(variant)}
          testID={testID ? `${testID}-spinner` : undefined}
        />
      ) : (
        iconLeft
      )}

      {/* Label text */}
      {typeof children === 'string' ? (
        <ButtonText
          variant={variant}
          size={size}
          disabled={isDisabled || undefined}
        >
          {children}
        </ButtonText>
      ) : (
        children
      )}

      {/* Trailing icon -- hidden when loading to avoid layout shift */}
      {!loading && iconRight}
    </ButtonFrame>
  )
})

Button.displayName = 'Button'
