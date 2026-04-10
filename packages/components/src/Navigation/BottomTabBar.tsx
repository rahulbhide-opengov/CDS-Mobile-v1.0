import React, { useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { Pressable, Text, VStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Bottom safe area fallback when react-native-safe-area-context is unavailable. */
const DEFAULT_BOTTOM_INSET = Platform.select({ ios: 34, android: 0, default: 0 })

const TAB_BAR_HEIGHT = 56

// Badge color
const BADGE_BG = '#CC2929' // red600

// ---------------------------------------------------------------------------
// BottomTabBarFrame
// ---------------------------------------------------------------------------

const BottomTabBarFrame = styled(Stack, {
  name: 'BottomTabBar',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  backgroundColor: '$background',
  borderTopWidth: 1,
  borderTopColor: '$borderColor',

  variants: {
    elevated: {
      true: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        borderTopWidth: 0,
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// TabItemFrame -- individual tab touch target
// ---------------------------------------------------------------------------

const TabItemFrame = styled(Pressable, {
  name: 'BottomTabItem',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 8,
  paddingBottom: 4,
  minHeight: TAB_BAR_HEIGHT,

  pressStyle: {
    opacity: 0.7,
  },
})

// ---------------------------------------------------------------------------
// TabLabel
// ---------------------------------------------------------------------------

const TabLabel = styled(TamaguiText, {
  name: 'BottomTabLabel',
  fontFamily: '$body',
  fontSize: 12,
  lineHeight: 16,
  textAlign: 'center',
  marginTop: 4,

  variants: {
    active: {
      true: {
        fontWeight: '$medium',
        color: '$brandBackground',
      },
      false: {
        fontWeight: '$regular',
        color: '#9E9E9E', // neutral500
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Badge dot / count
// ---------------------------------------------------------------------------

function TabBadge({ badge }: { badge: number | boolean }) {
  if (badge === true) {
    // Dot badge
    return (
      <Stack
        position="absolute"
        top={-2}
        right={-6}
        width={8}
        height={8}
        borderRadius={4}
        backgroundColor={BADGE_BG}
        zIndex={1}
        accessibilityLabel="Notification indicator"
        role="status"
      />
    )
  }

  if (typeof badge === 'number' && badge > 0) {
    const displayText = badge > 99 ? '99+' : String(badge)
    return (
      <Stack
        position="absolute"
        top={-4}
        right={-10}
        minWidth={18}
        height={18}
        borderRadius={9}
        backgroundColor={BADGE_BG}
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={4}
        zIndex={1}
        accessibilityLabel={`${displayText} notifications`}
        role="status"
      >
        <TamaguiText
          fontFamily="$body"
          fontSize={10}
          lineHeight={14}
          fontWeight="$bold"
          color="white"
          textAlign="center"
        >
          {displayText}
        </TamaguiText>
      </Stack>
    )
  }

  return null
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface BottomTabBarItem {
  /** Unique key to identify this tab. */
  key: string
  /** Text label displayed beneath the icon. */
  label: string
  /** Default icon element. */
  icon: React.ReactNode
  /** Optional active-state icon (e.g., filled variant). */
  activeIcon?: React.ReactNode
  /** Badge: `true` for a dot indicator, or a number for a count badge. */
  badge?: number | boolean
}

export interface BottomTabBarProps {
  /** Array of 3-5 tab items. */
  items: BottomTabBarItem[]
  /** Key of the currently active tab. */
  activeKey: string
  /** Callback fired when a tab is selected. */
  onSelect?: (key: string) => void
  /** When true, applies elevation shadow instead of top border. */
  elevated?: boolean
  /** Optional test ID prefix. */
  testID?: string
}

/**
 * `BottomTabBar` -- standard bottom tab navigation bar from CDS 37.
 *
 * Displays 3-5 items with icon, label, and optional badge support. Active
 * items use the primary brand color; inactive items use neutral500. Height
 * is 56px plus the bottom safe area inset for device compatibility.
 *
 * This component is distinct from `FloatingBottomNav`, which uses a
 * floating pill-style glassmorphism design.
 */
export const BottomTabBar = React.memo(function BottomTabBar({
  items,
  activeKey,
  onSelect,
  elevated = false,
  testID,
}: BottomTabBarProps) {
  return (
    <BottomTabBarFrame
      elevated={elevated || undefined}
      paddingBottom={DEFAULT_BOTTOM_INSET}
      accessibilityRole="tablist"
      testID={testID}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey

        return (
          <TabItem
            key={item.key}
            item={item}
            isActive={isActive}
            onSelect={onSelect}
            testID={testID ? `${testID}-${item.key}` : undefined}
          />
        )
      })}
    </BottomTabBarFrame>
  )
})

BottomTabBar.displayName = 'BottomTabBar'

// ---------------------------------------------------------------------------
// TabItem -- memoized individual tab for render performance
// ---------------------------------------------------------------------------

interface TabItemInternalProps {
  item: BottomTabBarItem
  isActive: boolean
  onSelect?: (key: string) => void
  testID?: string
}

const TabItem = React.memo(function TabItem({
  item,
  isActive,
  onSelect,
  testID,
}: TabItemInternalProps) {
  const handlePress = useCallback(() => {
    onSelect?.(item.key)
  }, [onSelect, item.key])

  const a11yLabel = useMemo(() => {
    const base = item.label
    if (typeof item.badge === 'number' && item.badge > 0) {
      return `${base}, ${item.badge} notifications`
    }
    if (item.badge === true) {
      return `${base}, has notification`
    }
    return base
  }, [item.label, item.badge])

  const displayIcon = isActive && item.activeIcon ? item.activeIcon : item.icon

  return (
    <TabItemFrame
      onPress={handlePress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      <Stack position="relative" alignItems="center" justifyContent="center">
        {displayIcon}
        {item.badge != null && item.badge !== false && item.badge !== 0 && (
          <TabBadge badge={item.badge} />
        )}
      </Stack>

      <TabLabel active={isActive}>
        {item.label}
      </TabLabel>
    </TabItemFrame>
  )
})

TabItem.displayName = 'BottomTabItem'
