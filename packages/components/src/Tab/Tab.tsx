import React, { useCallback } from 'react'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { Pressable, Text, HStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TAB_HEIGHT = 48
const MIN_TOUCH_TARGET = 44

// Badge color
const BADGE_BG = '#CC2929' // red600

// ---------------------------------------------------------------------------
// TabFrame -- base pressable container
// ---------------------------------------------------------------------------

const TabFrame = styled(Pressable, {
  name: 'Tab',
  height: TAB_HEIGHT,
  minHeight: MIN_TOUCH_TARGET,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 16,

  pressStyle: {
    opacity: 0.7,
  },
})

// ---------------------------------------------------------------------------
// Primary variant: underline indicator (2px bottom border)
// ---------------------------------------------------------------------------

const PrimaryIndicator = styled(Stack, {
  name: 'TabPrimaryIndicator',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: 2,
  borderRadius: 1,

  variants: {
    active: {
      true: {
        backgroundColor: '$brandBackground',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Secondary variant: filled pill background
// ---------------------------------------------------------------------------

const SecondaryPill = styled(Stack, {
  name: 'TabSecondaryPill',
  position: 'absolute',
  top: 6,
  bottom: 6,
  left: 4,
  right: 4,
  borderRadius: 9999,

  variants: {
    active: {
      true: {
        backgroundColor: '$brandBackground',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Tab label text
// ---------------------------------------------------------------------------

const TabLabelPrimary = styled(TamaguiText, {
  name: 'TabLabelPrimary',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  textAlign: 'center',
  numberOfLines: 1,

  variants: {
    active: {
      true: {
        fontWeight: '$semibold',
        color: '$brandBackground',
      },
      false: {
        fontWeight: '$regular',
        color: '#9E9E9E', // neutral500
      },
    },
  } as const,
})

const TabLabelSecondary = styled(TamaguiText, {
  name: 'TabLabelSecondary',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  textAlign: 'center',
  numberOfLines: 1,
  zIndex: 1,

  variants: {
    active: {
      true: {
        fontWeight: '$semibold',
        color: 'white',
      },
      false: {
        fontWeight: '$regular',
        color: '#9E9E9E', // neutral500
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Tab badge (small count indicator)
// ---------------------------------------------------------------------------

function TabBadge({ count, variant, active }: { count: number; variant: 'primary' | 'secondary'; active: boolean }) {
  if (count <= 0) return null

  const displayText = count > 99 ? '99+' : String(count)

  // In secondary active state, use a light badge on the dark pill
  const bgColor = variant === 'secondary' && active ? 'rgba(255,255,255,0.3)' : BADGE_BG
  const textColor = 'white'

  return (
    <Stack
      minWidth={16}
      height={16}
      borderRadius={8}
      backgroundColor={bgColor}
      alignItems="center"
      justifyContent="center"
      paddingHorizontal={4}
      marginLeft={6}
      zIndex={1}
      accessibilityLabel={`${displayText} notifications`}
      role="status"
    >
      <TamaguiText
        fontFamily="$body"
        fontSize={10}
        lineHeight={14}
        fontWeight="$bold"
        color={textColor}
        textAlign="center"
      >
        {displayText}
      </TamaguiText>
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface TabProps {
  /** Display label text for the tab. */
  label: string
  /** Optional icon element rendered before the label. */
  icon?: React.ReactNode
  /** Optional badge count displayed to the right of the label. */
  badge?: number
  /** Whether this tab is currently active/selected. */
  active?: boolean
  /** Callback fired when the tab is pressed. */
  onPress?: () => void
  /** Visual variant: "primary" uses an underline indicator, "secondary" uses a filled pill. */
  variant?: 'primary' | 'secondary'
  /** Optional test ID. */
  testID?: string
}

/**
 * `Tab` -- individual tab item from CDS 37 tab bar.
 *
 * Supports two visual variants:
 * - **primary**: Active state shows primary-colored text with a 2px underline indicator.
 * - **secondary**: Active state shows a filled pill background with white text.
 *
 * Each tab maintains a 48px height and minimum 44px touch target for accessibility.
 * Supports optional leading icon and trailing badge count.
 */
export const Tab = React.memo(function Tab({
  label,
  icon,
  badge,
  active = false,
  onPress,
  variant = 'primary',
  testID,
}: TabProps) {
  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  const isPrimary = variant === 'primary'
  const LabelComponent = isPrimary ? TabLabelPrimary : TabLabelSecondary

  return (
    <TabFrame
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={
        badge && badge > 0
          ? `${label}, ${badge} notifications`
          : label
      }
      testID={testID}
    >
      {/* Variant-specific indicator */}
      {isPrimary ? (
        <PrimaryIndicator active={active} />
      ) : (
        <SecondaryPill active={active} />
      )}

      {/* Content row: icon + label + badge */}
      <HStack alignItems="center" justifyContent="center" gap={6} zIndex={1}>
        {icon && (
          <Stack
            width={18}
            height={18}
            alignItems="center"
            justifyContent="center"
            opacity={active ? 1 : 0.5}
          >
            {icon}
          </Stack>
        )}

        <LabelComponent active={active}>
          {label}
        </LabelComponent>

        {badge != null && badge > 0 && (
          <TabBadge count={badge} variant={variant} active={active} />
        )}
      </HStack>
    </TabFrame>
  )
})

Tab.displayName = 'Tab'
