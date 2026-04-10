import React, { useCallback } from 'react'
import { Linking, Platform } from 'react-native'
import { styled, Stack, useTheme, type GetProps } from '@tamagui/core'
import { Pressable, Text, HStack } from '@opengov/cds-primitives'
import Svg, { Path } from 'react-native-svg'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Styled text frame for the link label
// ---------------------------------------------------------------------------

const LinkText = styled(Text, {
  name: 'LinkText',
  fontFamily: '$body',

  variants: {
    variant: {
      default: {
        color: '$brandBackground',
        textDecorationLine: 'underline',
      },
      subtle: {
        color: '$colorSecondary',
        textDecorationLine: 'none',
      },
      inline: {
        color: '$color',
        textDecorationLine: 'underline',
      },
    },
    size: {
      sm: { fontSize: 12, lineHeight: 16 },
      md: { fontSize: 14, lineHeight: 20 },
      lg: { fontSize: 16, lineHeight: 24 },
    },
    disabled: {
      true: {
        color: '$colorDisabled',
        textDecorationLine: 'none',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// Pressable wrapper -- removes the default min-height / min-width touch
// targets from the base Pressable so the link sits inline.
// ---------------------------------------------------------------------------

const LinkPressable = styled(Pressable, {
  name: 'LinkPressable',
  minWidth: 0,
  minHeight: 0,
  alignItems: 'flex-start',
  justifyContent: 'center',
  cursor: 'pointer',
  flexDirection: 'row',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Inline external-link icon (12x12 SVG)
// ---------------------------------------------------------------------------

const EXTERNAL_ICON_SIZES: Record<'sm' | 'md' | 'lg', number> = {
  sm: 10,
  md: 12,
  lg: 14,
}

function ExternalLinkIcon({
  size = 'md',
  color,
}: {
  size?: 'sm' | 'md' | 'lg'
  color: string
}) {
  const px = EXTERNAL_ICON_SIZES[size]
  return (
    <Stack marginLeft={4} justifyContent="center">
      <Svg width={px} height={px} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
          fill={color}
        />
      </Svg>
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface LinkProps {
  /** URL to navigate to when pressed. */
  href?: string
  /** Custom press handler. Takes precedence over `href` when both are given. */
  onPress?: () => void
  /** Visual style of the link text. */
  variant?: 'default' | 'subtle' | 'inline'
  /** Font size preset. */
  size?: 'sm' | 'md' | 'lg'
  /** Show a trailing external-link icon. */
  external?: boolean
  /** Disable the link and prevent interaction. */
  disabled?: boolean
  /** Link content -- typically a string, but arbitrary React nodes are accepted. */
  children: React.ReactNode
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
  /** Accessibility hint describing the result of activating the link. */
  accessibilityHint?: string
}

/**
 * `Link` -- tappable text that opens a URL or triggers a callback.
 *
 * Follows CDS 37 link patterns with mobile-native behavior via
 * `Linking.openURL`. Supports three visual variants, three sizes, and an
 * optional external-link trailing icon.
 */
export function Link({
  href,
  onPress,
  variant = 'default',
  size = 'md',
  external = false,
  disabled = false,
  children,
  accessibilityLabel,
  accessibilityHint,
}: LinkProps) {
  const theme = useTheme()

  // Resolve the icon tint to match the current text color
  const iconColor = disabled
    ? (theme.colorDisabled?.val as string) ?? primitive.neutral400
    : variant === 'default'
      ? (theme.brandBackground?.val as string) ?? colors.primary
      : variant === 'subtle'
        ? (theme.colorSecondary?.val as string) ?? primitive.neutral500
        : (theme.color?.val as string) ?? primitive.neutral900

  const handlePress = useCallback(() => {
    if (disabled) return

    if (onPress) {
      onPress()
      return
    }

    if (href) {
      Linking.openURL(href).catch((err: Error) => {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.warn(`[Link] Failed to open URL "${href}":`, err.message)
        }
      })
    }
  }, [disabled, onPress, href])

  // Build the default hint when none is provided
  const resolvedHint =
    accessibilityHint ??
    (external
      ? 'Opens in external browser'
      : href
        ? 'Opens a link'
        : undefined)

  return (
    <LinkPressable
      disabled={disabled}
      onPress={handlePress}
      accessibilityRole="link"
      accessibilityLabel={
        accessibilityLabel ??
        (typeof children === 'string' ? children : undefined)
      }
      accessibilityHint={resolvedHint}
      accessibilityState={{ disabled }}
    >
      <LinkText variant={variant} size={size} disabled={disabled}>
        {children}
      </LinkText>
      {external && <ExternalLinkIcon size={size} color={iconColor} />}
    </LinkPressable>
  )
}
