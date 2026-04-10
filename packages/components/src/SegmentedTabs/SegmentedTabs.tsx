import React from 'react'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

/**
 * SegmentedTabs
 *
 * A segmented tab control from PLC Mobile with two variants:
 * - Default: Label-based tabs with text + optional count badge
 * - Icon Only: Compact icon-only tabs
 *
 * The selected tab has a white background with shadow, unselected tabs
 * are transparent against the neutral container background.
 *
 * Usage:
 * ```tsx
 * <SegmentedTabs
 *   items={[
 *     { key: 'scheduled', label: 'Scheduled', count: 4 },
 *     { key: 'missed', label: 'Missed', count: 1 },
 *     { key: 'requested', label: 'Requested', count: 4 },
 *   ]}
 *   activeKey="scheduled"
 *   onSelect={(key) => setFilter(key)}
 * />
 * ```
 *
 * Dos:
 * - Use 2-4 tabs for optimal readability
 * - Include count badges when filtering a countable set
 * - Use icon-only variant for toolbar-style controls with clear iconography
 *
 * Don'ts:
 * - Don't exceed 4 tabs in label mode — text truncation degrades UX
 * - Don't mix label and icon-only tabs in the same control
 * - Don't use for navigation — use BottomTabBar or FloatingBottomNav instead
 */

const TabsContainer = styled(Stack, {
  name: 'SegmentedTabs',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '$backgroundStrong', // #F2F2F2 in light theme
  borderRadius: '$md',
  overflow: 'hidden',

  variants: {
    variant: {
      default: {
        padding: '$1',
        gap: '$1',
      },
      iconOnly: {
        padding: 2,
        gap: 2,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
  },
})

const TabChipFrame = styled(Stack, {
  name: 'SegmentedTabChip',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$md',

  variants: {
    selected: {
      true: {
        backgroundColor: '$background',
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
    type: {
      label: {
        flex: 1,
        padding: '$2',
      },
      iconOnly: {
        height: 32,
        padding: '$1',
      },
    },
  } as const,

  defaultVariants: {
    selected: false,
    type: 'label',
  },
})

const TabChipContent = styled(Stack, {
  name: 'SegmentedTabChipContent',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$1',
  paddingHorizontal: '$1',
})

const TabChipLabel = styled(TamaguiText, {
  name: 'SegmentedTabLabel',
  fontFamily: '$body',
  fontSize: '$sm',
  fontWeight: '$medium',
  lineHeight: 24,

  variants: {
    selected: {
      true: {
        color: '$brandBackground', // primary/main #4B3FFF
      },
      false: {
        color: '$colorSecondary', // text/secondary rgba(0,0,0,0.6)
      },
    },
  } as const,
})

const TabChipCount = styled(TamaguiText, {
  name: 'SegmentedTabCount',
  fontFamily: '$body',
  fontSize: '$xs',
  fontWeight: '$semibold',
  lineHeight: 14,
  letterSpacing: 0.16,
  textAlign: 'center',

  variants: {
    selected: {
      true: {
        color: primitive.brandPrimaryDark, // primary/dark
      },
      false: {
        color: '$colorSecondary',
      },
    },
  } as const,
})

export interface SegmentedTabItem {
  key: string
  label?: string
  count?: number
  icon?: React.ReactNode
  activeIcon?: React.ReactNode
}

export interface SegmentedTabsProps {
  items: SegmentedTabItem[]
  activeKey: string
  onSelect?: (key: string) => void
  variant?: 'default' | 'iconOnly'
}

export function SegmentedTabs({
  items,
  activeKey,
  onSelect,
  variant = 'default',
}: SegmentedTabsProps) {
  return (
    <TabsContainer variant={variant} accessibilityRole="tablist">
      {items.map((item) => {
        const isSelected = item.key === activeKey
        return (
          <TabChipFrame
            key={item.key}
            selected={isSelected}
            type={variant === 'iconOnly' ? 'iconOnly' : 'label'}
            onPress={() => onSelect?.(item.key)}
            hitSlop={{ top: 6, bottom: 6, left: 0, right: 0 }}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={
              item.label
                ? item.count != null
                  ? `${item.label} (${item.count})`
                  : item.label
                : undefined
            }
          >
            <TabChipContent>
              {variant === 'iconOnly' && (
                isSelected && item.activeIcon ? item.activeIcon : item.icon
              )}
              {variant === 'default' && item.label && (
                <TabChipLabel selected={isSelected}>
                  {item.label}
                </TabChipLabel>
              )}
            </TabChipContent>
            {variant === 'default' && item.count != null && (
              <TabChipCount selected={isSelected}>
                ({item.count})
              </TabChipCount>
            )}
          </TabChipFrame>
        )
      })}
    </TabsContainer>
  )
}
