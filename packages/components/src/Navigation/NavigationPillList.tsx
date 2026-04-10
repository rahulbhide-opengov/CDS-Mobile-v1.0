import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Pressable, Text, HStack } from '@opengov/cds-primitives'

// TODO: Phase 5 -- Full implementation with horizontal scroll, animated selection
// indicator, and overflow menu
const NavigationPillListFrame = styled(HStack, {
  name: 'NavigationPillList',
  gap: '$2',
  paddingVertical: '$2',
  paddingHorizontal: '$4',
})

const NavigationPill = styled(Pressable, {
  name: 'NavigationPill',
  paddingHorizontal: '$3',
  paddingVertical: '$1',
  borderRadius: '$full',
  backgroundColor: 'transparent',

  variants: {
    selected: {
      true: {
        backgroundColor: '$brandBackground',
      },
    },
  } as const,
})

export interface NavigationPillItem {
  key: string
  label: string
  icon?: React.ReactElement
}

export interface NavigationPillListProps {
  items: NavigationPillItem[]
  activeKey: string
  onSelect: (key: string) => void
}

export function NavigationPillList({
  items,
  activeKey,
  onSelect,
}: NavigationPillListProps) {
  return (
    <NavigationPillListFrame accessibilityRole="tablist">
      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <NavigationPill
            key={item.key}
            selected={isActive}
            onPress={() => onSelect(item.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <HStack gap="$1" alignItems="center">
              {item.icon}
              <Text
                variant="body3"
                fontWeight="$medium"
                color={isActive ? '$brandColor' : '$color'}
              >
                {item.label}
              </Text>
            </HStack>
          </NavigationPill>
        )
      })}
    </NavigationPillListFrame>
  )
}
