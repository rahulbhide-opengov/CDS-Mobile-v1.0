import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Color maps
// ---------------------------------------------------------------------------

const BADGE_BG: Record<string, string> = {
  default: primitive.neutral500, // neutral500
  primary: colors.primary, // primary
  error: colors.red600, // red600
  success: colors.jade700, // jade700
  warning: colors.amber700, // amber700
}

// ---------------------------------------------------------------------------
// Styled badge circle
// ---------------------------------------------------------------------------

const BadgeFrame = styled(Stack, {
  name: 'Badge',
  borderRadius: 9999,
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    variant: {
      standard: {
        minWidth: 20,
        height: 20,
        paddingHorizontal: 5,
      },
      dot: {
        width: 8,
        height: 8,
        minWidth: 8,
        paddingHorizontal: 0,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'standard',
  },
})

// ---------------------------------------------------------------------------
// Count label text
// ---------------------------------------------------------------------------

const BadgeText = styled(Text, {
  name: 'BadgeText',
  color: 'white',
  fontSize: 12,
  lineHeight: 14,
  fontWeight: '$bold',
  textAlign: 'center',
})

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface BadgeProps {
  /** Numeric count displayed inside a `standard` badge. */
  count?: number
  /** Upper bound before the badge shows "N+". Defaults to 99. */
  maxCount?: number
  /** Visual variant. `standard` shows a count; `dot` renders a small circle. */
  variant?: 'standard' | 'dot'
  /** Semantic color of the badge background. */
  color?: 'default' | 'primary' | 'error' | 'success' | 'warning'
  /** Child element that the badge overlays (e.g. an icon). */
  children?: React.ReactNode
  /** When `false`, the badge is hidden. Defaults to `true`. */
  visible?: boolean
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

/**
 * `Badge` -- notification count indicator.
 *
 * Wraps a child element and positions the badge circle at the top-right, or
 * renders in standalone mode when no children are provided. Supports a
 * numeric `standard` variant and a small `dot` variant.
 */
export function Badge({
  count,
  maxCount = 99,
  variant = 'standard',
  color = 'error',
  children,
  visible = true,
  accessibilityLabel,
}: BadgeProps) {
  // Resolve background color from the semantic color prop
  const backgroundColor = BADGE_BG[color] ?? BADGE_BG.error

  // Compute the display string for standard badges
  const displayText =
    variant === 'standard' && count != null
      ? count > maxCount
        ? `${maxCount}+`
        : String(count)
      : undefined

  // Build the accessibility label when one is not explicitly given
  const resolvedA11yLabel =
    accessibilityLabel ??
    (variant === 'dot'
      ? 'Notification indicator'
      : displayText != null
        ? `${displayText} notifications`
        : undefined)

  // The actual badge element
  const badgeElement = visible ? (
    <BadgeFrame
      variant={variant}
      backgroundColor={backgroundColor}
      role="status"
      accessibilityLabel={resolvedA11yLabel}
    >
      {variant === 'standard' && displayText != null && (
        <BadgeText>{displayText}</BadgeText>
      )}
    </BadgeFrame>
  ) : null

  // Standalone mode -- no children, just render the badge
  if (!children) {
    return badgeElement
  }

  // Overlay mode -- position the badge at the top-right of the child
  return (
    <Stack position="relative" alignSelf="flex-start">
      {children}
      {badgeElement && (
        <Stack
          position="absolute"
          top={variant === 'dot' ? -2 : -6}
          right={variant === 'dot' ? -2 : -6}
          zIndex={1}
        >
          {badgeElement}
        </Stack>
      )}
    </Stack>
  )
}
