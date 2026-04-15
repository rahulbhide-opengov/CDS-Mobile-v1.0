/**
 * Button -- CDS 37 Figma-accurate implementation
 *
 * Source of truth: CDS 37 Figma component node 17621:64726
 *
 * 7 type variants: Primary, Secondary, Secondary-alt, Tertiary, Tertiary-alt,
 *                  Destructive, Destructive-alt
 * 3 sizes: Small (28), Medium (32), Large (40)
 * Disabled: 38% opacity on the entire button (Figma opacity: 0.38)
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 * Typography references `buttonStyles` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive, buttonStyles } from '@opengov/cds-tokens'
import { useHaptics } from '../hooks'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: border radius 4px for all button sizes and variants */
const BUTTON_RADIUS = 4

/** CDS 37: disabled state uses 38% opacity on the whole component */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

// ---------------------------------------------------------------------------
// ButtonFrame -- Tamagui styled frame with CDS 37 variant system
// ---------------------------------------------------------------------------

const ButtonFrame = styled(Stack, {
  name: 'Button',
  tag: 'button',
  role: 'button',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: BUTTON_RADIUS,
  borderWidth: 0,
  cursor: 'pointer',
  // Reset Pressable-inherited minimums so small buttons render at 28px
  minWidth: 0,
  minHeight: 0,

  variants: {
    // -----------------------------------------------------------------------
    // variant -- maps to CDS 37 Figma "type" property
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
    // size -- from Figma Semantic (Display) Mobile (390) column
    //   Small:  32px (Figma: Button/Small  M=32)
    //   Medium: 36px (Figma: Button/Medium M=36)
    //   Large:  48px (Figma: Button/Large  M=48)
    // -----------------------------------------------------------------------
    size: {
      sm: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        height: 32,
        minHeight: 32,
        gap: 4,
      },
      md: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        height: 40,
        minHeight: 40,
        gap: 4,
      },
      lg: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 48,
        minHeight: 48,
        gap: 8,
      },
    },

    // -----------------------------------------------------------------------
    // fullWidth -- stretches to fill container
    // -----------------------------------------------------------------------
    fullWidth: {
      true: {
        alignSelf: 'stretch',
        width: '100%',
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
// ButtonText -- styled text with per-variant color and per-size typography
//
// Typography values sourced from buttonStyles (text-styles.ts), mobile column.
// ---------------------------------------------------------------------------

const ButtonText = styled(TamaguiText, {
  name: 'ButtonText',
  fontFamily: '$body',
  userSelect: 'none',

  variants: {
    variant: {
      primary:        { color: primitive.white },
      secondary:      { color: primitive.blurple700 },
      secondaryAlt:   { color: primitive.blurple700 },
      tertiary:       { color: primitive.slate700 },
      tertiaryAlt:    { color: primitive.slate700 },
      destructive:    { color: primitive.white },
      destructiveAlt: { color: primitive.red600 },
    },

    // Pressed-state text color overrides (applied programmatically)
    pressed: {
      primary:        { color: primitive.white },
      secondary:      { color: primitive.blurple900 },
      secondaryAlt:   { color: primitive.blurple900 },
      tertiary:       { color: primitive.slate700 },
      tertiaryAlt:    { color: primitive.slate700 },
      destructive:    { color: primitive.white },
      destructiveAlt: { color: primitive.white },
    },

    size: {
      sm: {
        fontSize: buttonStyles.small.mobile.fontSize,     // 13
        fontWeight: String(buttonStyles.small.mobile.fontWeight) as '500', // Medium 500
        lineHeight: buttonStyles.small.mobile.lineHeight,  // 18
        letterSpacing: buttonStyles.small.mobile.letterSpacing,
      },
      md: {
        fontSize: buttonStyles.medium.mobile.fontSize,     // 14
        fontWeight: String(buttonStyles.medium.mobile.fontWeight) as '500', // Medium 500
        lineHeight: buttonStyles.medium.mobile.lineHeight,  // 20
        letterSpacing: buttonStyles.medium.mobile.letterSpacing,
      },
      lg: {
        fontSize: buttonStyles.large.mobile.fontSize,      // 16
        fontWeight: String(buttonStyles.large.mobile.fontWeight) as '600', // SemiBold 600
        lineHeight: buttonStyles.large.mobile.lineHeight,   // 24
        letterSpacing: buttonStyles.large.mobile.letterSpacing,
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

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'secondaryAlt'
  | 'tertiary'
  | 'tertiaryAlt'
  | 'destructive'
  | 'destructiveAlt'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** CDS 37 type variant. Defaults to "primary". */
  variant?: ButtonVariant
  /** Size preset. Defaults to "md" (32px). */
  size?: ButtonSize
  /** Disables the button -- applies 38% opacity per Figma spec. */
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
  /** Whether to show the focus ring. Maps to Figma "focusRing" prop. */
  focusRing?: boolean
  /** Additional test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Spinner color resolver -- idle-state colors for the ActivityIndicator
// ---------------------------------------------------------------------------

function getSpinnerColor(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return primitive.white
    case 'secondary':
    case 'secondaryAlt':
      return primitive.blurple700
    case 'tertiary':
    case 'tertiaryAlt':
      return primitive.slate700
    case 'destructive':
      return primitive.white
    case 'destructiveAlt':
      return primitive.red600
    default:
      return primitive.blurple700
  }
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
  focusRing = true,
  testID,
}: ButtonProps) {
  const isDisabled = disabled || loading
  const haptics = useHaptics()

  const handlePress = useCallback(() => {
    if (!isDisabled && onPress) {
      // Destructive variants get medium haptic; all others get light
      const isDestructive = variant === 'destructive' || variant === 'destructiveAlt'
      haptics.impact(isDestructive ? 'medium' : 'light')
      onPress()
    }
  }, [isDisabled, onPress, variant, haptics])

  // Derive the label string for accessibility
  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    if (typeof children === 'string') {
      return loading ? `${children}, loading` : children
    }
    return loading ? 'Loading' : undefined
  }, [accessibilityLabel, children, loading])

  // hitSlop pads small/medium buttons to 44pt WCAG minimum touch target.
  // Figma mobile: sm=32, md=36, lg=48
  const hitSlop = useMemo(() => {
    if (size === 'sm') {
      const pad = Math.ceil((MIN_TOUCH_TARGET - 32) / 2) // (44-32)/2 = 6
      return { top: pad, bottom: pad, left: pad, right: pad }
    }
    if (size === 'md') {
      const pad = Math.ceil((MIN_TOUCH_TARGET - 40) / 2) // (44-40)/2 = 2
      return { top: pad, bottom: pad, left: pad, right: pad }
    }
    return undefined // lg=48 meets WCAG minimum
  }, [size])

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
      focusStyle={focusRing ? FOCUS_RING_STYLE : undefined}
      testID={testID}
    >
      {/* Loading spinner replaces iconLeft position */}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getSpinnerColor(variant)}
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
