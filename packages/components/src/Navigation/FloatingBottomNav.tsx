import React from 'react'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'

/**
 * FloatingBottomNav
 *
 * A glassmorphism pill-style bottom navigation bar from PLC Mobile.
 * Features a floating container with semi-transparent background, rounded pill shape,
 * and active tab displayed as a dark pill with icon + label.
 *
 * Device variants: Mobile, Tablet Portrait, Tablet Landscape
 * Selection: Highlights the active tab with a dark pill containing icon + label
 *
 * Usage:
 * ```tsx
 * <FloatingBottomNav
 *   items={[
 *     { key: 'home', label: 'Home', icon: <HomeIcon /> },
 *     { key: 'schedule', label: 'Schedule', icon: <CalendarIcon /> },
 *     { key: 'search', label: 'Search', icon: <SearchIcon /> },
 *     { key: 'settings', label: 'Settings', icon: <SettingsIcon /> },
 *   ]}
 *   activeKey="home"
 *   onSelect={(key) => setActiveTab(key)}
 * />
 * ```
 *
 * Dos:
 * - Use 3-5 navigation items maximum
 * - Always show icon + label for the active tab
 * - Place at the bottom of the screen with safe area padding
 *
 * Don'ts:
 * - Don't use more than 5 items — it gets cramped on mobile
 * - Don't hide the label on the active tab — it provides essential context
 * - Don't place over scrollable content without proper padding offset
 */

const NavContainer = styled(Stack, {
  name: 'FloatingBottomNav',
  paddingTop: '$3',
  paddingBottom: '$4',
  paddingHorizontal: '$4',
  alignItems: 'stretch',

  variants: {
    device: {
      mobile: {
        paddingHorizontal: '$4',
      },
      tabletPortrait: {
        paddingHorizontal: 80,
      },
      tabletLandscape: {
        paddingHorizontal: 280,
      },
    },
  } as const,

  defaultVariants: {
    device: 'mobile',
  },
})

const NavBar = styled(Stack, {
  name: 'FloatingBottomNavBar',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$2',
  borderRadius: 100,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderWidth: 2,
  borderColor: '$background',
  overflow: 'hidden',
  // Glassmorphism shadow
  shadowColor: '$shadowColor',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
})

const ActiveTab = styled(Stack, {
  name: 'FloatingBottomNavActiveTab',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  height: 44,
  paddingHorizontal: '$5',
  borderRadius: 100,
  backgroundColor: '#2B343D', // secondary/dark from PLC
  shadowColor: 'rgba(43, 52, 61, 0.16)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 1,
  shadowRadius: 8,
})

const ActiveTabLabel = styled(TamaguiText, {
  name: 'FloatingBottomNavActiveLabel',
  fontFamily: '$body',
  fontSize: '$sm',
  fontWeight: '$medium',
  lineHeight: 18,
  letterSpacing: 0.15,
  color: 'white',
  textAlign: 'center',
})

const InactiveTab = styled(Stack, {
  name: 'FloatingBottomNavInactiveTab',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 100,
  overflow: 'hidden',
  padding: '$3',

  variants: {
    device: {
      mobile: {
        marginHorizontal: '$3',
      },
      tabletPortrait: {
        marginHorizontal: '$6',
      },
      tabletLandscape: {
        marginHorizontal: '$6',
      },
    },
  } as const,

  defaultVariants: {
    device: 'mobile',
  },
})

export interface FloatingBottomNavItem {
  key: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
}

export type FloatingBottomNavDevice = 'mobile' | 'tabletPortrait' | 'tabletLandscape'

export interface FloatingBottomNavProps {
  items: FloatingBottomNavItem[]
  activeKey: string
  onSelect?: (key: string) => void
  device?: FloatingBottomNavDevice
}

export function FloatingBottomNav({
  items,
  activeKey,
  onSelect,
  device = 'mobile',
}: FloatingBottomNavProps) {
  return (
    <NavContainer device={device}>
      <NavBar>
        {items.map((item) => {
          const isActive = item.key === activeKey
          if (isActive) {
            return (
              <ActiveTab
                key={item.key}
                onPress={() => onSelect?.(item.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: true }}
                accessibilityLabel={item.label}
              >
                {item.activeIcon || item.icon}
                <ActiveTabLabel>{item.label}</ActiveTabLabel>
              </ActiveTab>
            )
          }
          return (
            <InactiveTab
              key={item.key}
              device={device}
              onPress={() => onSelect?.(item.key)}
              accessibilityRole="button"
              accessibilityState={{ selected: false }}
              accessibilityLabel={item.label}
            >
              {item.icon}
            </InactiveTab>
          )
        })}
      </NavBar>
    </NavContainer>
  )
}
