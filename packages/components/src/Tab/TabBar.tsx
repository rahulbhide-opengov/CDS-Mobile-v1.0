import React from 'react'
import { ScrollView } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { HStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// TabBarFrame -- container for fixed-mode tabs
// ---------------------------------------------------------------------------

const TabBarFrame = styled(HStack, {
  name: 'TabBar',
  alignItems: 'stretch',

  variants: {
    variant: {
      primary: {
        borderBottomWidth: 1,
        borderBottomColor: '$borderColor',
      },
      secondary: {
        backgroundColor: '$backgroundStrong',
        borderRadius: '$md',
        padding: 4,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
  },
})

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface TabBarProps {
  /** Tab children to render inside the bar. */
  children: React.ReactNode
  /** Visual variant matching the Tab variant: "primary" (underline) or "secondary" (pill). */
  variant?: 'primary' | 'secondary'
  /** When true, tabs are placed in a horizontal ScrollView for overflow. */
  scrollable?: boolean
  /** Optional test ID. */
  testID?: string
}

/**
 * `TabBar` -- horizontal container for `Tab` components from CDS 37.
 *
 * Supports two layout modes:
 * - **Fixed** (default): Tabs are evenly distributed across the available width.
 *   Best for 2-4 tabs where all labels fit comfortably.
 * - **Scrollable**: Tabs are placed in a horizontal ScrollView, each at its
 *   natural width. Best for 4+ tabs or tabs with long labels.
 *
 * The `variant` prop should match the variant used on child `Tab` components:
 * - "primary" renders a bottom border for the underline indicator style.
 * - "secondary" renders a neutral background for the filled pill style.
 */
export function TabBar({
  children,
  variant = 'primary',
  scrollable = false,
  testID,
}: TabBarProps) {
  // Scrollable mode: wrap in a horizontal ScrollView
  if (scrollable) {
    return (
      <Stack
        testID={testID}
        accessibilityRole="tablist"
        {...(variant === 'primary'
          ? { borderBottomWidth: 1, borderBottomColor: '$borderColor' }
          : { backgroundColor: '$backgroundStrong', borderRadius: '$md', padding: 4 }
        )}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
          bounces={false}
        >
          {children}
        </ScrollView>
      </Stack>
    )
  }

  // Fixed mode: evenly distributed tabs
  return (
    <TabBarFrame
      variant={variant}
      accessibilityRole="tablist"
      testID={testID}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        // Wrap each Tab in a flex:1 container for even distribution
        return (
          <Stack flex={1}>
            {child}
          </Stack>
        )
      })}
    </TabBarFrame>
  )
}
