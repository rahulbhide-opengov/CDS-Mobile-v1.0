import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { SettingsIcon, HomeIcon, SearchIcon } from '@opengov/cds-icons'
import { Badge, type BadgeProps } from './Badge'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Badge> = {
  title: 'Content/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'dot'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'error', 'success', 'warning'],
    },
    visible: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h4" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// 1. StandardCounts
// ---------------------------------------------------------------------------

export const StandardCounts: Story = {
  name: 'Standard Counts',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Standard Badge with Counts</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Badge count={1} />
        <Badge count={5} />
        <Badge count={12} />
        <Badge count={99} />
        <Badge count={100} />
      </HStack>

      <SectionLabel>Single vs Multi-digit</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Badge count={3} color="primary" />
        <Badge count={42} color="primary" />
        <Badge count={99} color="primary" />
        <Badge count={150} color="primary" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. DotVariant
// ---------------------------------------------------------------------------

export const DotVariant: Story = {
  name: 'Dot Variant',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Dot Badge</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Badge variant="dot" color="error" />
        <Badge variant="dot" color="primary" />
        <Badge variant="dot" color="success" />
        <Badge variant="dot" color="warning" />
        <Badge variant="dot" color="default" />
      </HStack>

      <SectionLabel>Dot vs Standard Comparison</SectionLabel>
      <HStack gap="$6" alignItems="center">
        <VStack alignItems="center" gap="$1">
          <Badge variant="dot" color="error" />
          <Text variant="caption" color="$colorSecondary">Dot</Text>
        </VStack>
        <VStack alignItems="center" gap="$1">
          <Badge count={3} color="error" />
          <Text variant="caption" color="$colorSecondary">Standard</Text>
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. AllColors
// ---------------------------------------------------------------------------

export const AllColors: Story = {
  name: 'All Colors',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Standard Badge Colors</SectionLabel>
      {(['default', 'primary', 'error', 'success', 'warning'] as const).map(
        (color) => (
          <HStack key={color} gap="$3" alignItems="center">
            <Badge count={8} color={color} />
            <Text variant="body2">{color}</Text>
          </HStack>
        ),
      )}

      <SectionLabel>Dot Badge Colors</SectionLabel>
      {(['default', 'primary', 'error', 'success', 'warning'] as const).map(
        (color) => (
          <HStack key={color} gap="$3" alignItems="center">
            <Badge variant="dot" color={color} />
            <Text variant="body2">{color}</Text>
          </HStack>
        ),
      )}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. MaxCount
// ---------------------------------------------------------------------------

export const MaxCount: Story = {
  name: 'Max Count',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Default Max (99)</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Badge count={50} />
        <Badge count={99} />
        <Badge count={100} />
        <Badge count={999} />
      </HStack>

      <SectionLabel>Custom Max Count</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Badge count={5} maxCount={9} />
        <Badge count={10} maxCount={9} />
        <Badge count={999} maxCount={9} />
      </HStack>
      <Text variant="caption" color="$colorSecondary">
        maxCount=9: Shows "9+" for values above 9
      </Text>

      <HStack gap="$4" alignItems="center">
        <Badge count={500} maxCount={999} />
        <Badge count={1000} maxCount={999} />
      </HStack>
      <Text variant="caption" color="$colorSecondary">
        maxCount=999: Shows "999+" for values above 999
      </Text>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. OverlayMode -- badge wrapping an icon
// ---------------------------------------------------------------------------

export const OverlayMode: Story = {
  name: 'Overlay Mode',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Badge Overlaying an Icon</SectionLabel>
      <HStack gap="$6" alignItems="center">
        <Badge count={3} color="error">
          <HomeIcon size="lg" color="#616161" />
        </Badge>
        <Badge count={12} color="primary">
          <SettingsIcon size="lg" color="#616161" />
        </Badge>
        <Badge count={99} color="error">
          <SearchIcon size="lg" color="#616161" />
        </Badge>
        <Badge count={150} color="error">
          <HomeIcon size="lg" color="#616161" />
        </Badge>
      </HStack>

      <SectionLabel>Dot Badge on Icon</SectionLabel>
      <HStack gap="$6" alignItems="center">
        <Badge variant="dot" color="error">
          <HomeIcon size="lg" color="#616161" />
        </Badge>
        <Badge variant="dot" color="success">
          <SettingsIcon size="lg" color="#616161" />
        </Badge>
        <Badge variant="dot" color="primary">
          <SearchIcon size="lg" color="#616161" />
        </Badge>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. Visibility
// ---------------------------------------------------------------------------

export const Visibility: Story = {
  render: () => {
    const [visible, setVisible] = useState(true)
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Badge Visibility Toggle</SectionLabel>
        <Text
          variant="body2"
          color="$brandBackground"
          onPress={() => setVisible((v) => !v)}
        >
          Tap to {visible ? 'hide' : 'show'} badge
        </Text>

        <HStack gap="$6" alignItems="center">
          <Badge count={5} color="error" visible={visible}>
            <HomeIcon size="lg" color="#616161" />
          </Badge>
          <Badge variant="dot" color="error" visible={visible}>
            <SettingsIcon size="lg" color="#616161" />
          </Badge>
        </HStack>

        <SectionLabel>Visible vs Hidden</SectionLabel>
        <HStack gap="$6" alignItems="center">
          <VStack alignItems="center" gap="$1">
            <Badge count={5} visible>
              <HomeIcon size="lg" color="#616161" />
            </Badge>
            <Text variant="caption" color="$colorSecondary">visible=true</Text>
          </VStack>
          <VStack alignItems="center" gap="$1">
            <Badge count={5} visible={false}>
              <HomeIcon size="lg" color="#616161" />
            </Badge>
            <Text variant="caption" color="$colorSecondary">visible=false</Text>
          </VStack>
        </HStack>
      </VStack>
    )
  },
}
