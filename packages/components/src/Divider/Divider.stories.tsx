import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Divider, type DividerProps } from './Divider'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Divider> = {
  title: 'Content/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

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
// 1. Horizontal
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  render: () => (
    <VStack padding="$4" gap="$4" width={320}>
      <SectionLabel>Horizontal Divider</SectionLabel>

      <Text variant="body2">Content above the divider</Text>
      <Divider />
      <Text variant="body2">Content below the divider</Text>

      <SectionLabel>Between List Items</SectionLabel>
      {['Item one', 'Item two', 'Item three', 'Item four'].map((item, i, arr) => (
        <VStack key={item}>
          <Text variant="body2" paddingVertical="$2">
            {item}
          </Text>
          {i < arr.length - 1 && <Divider />}
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. Vertical
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Vertical Divider</SectionLabel>

      <HStack gap="$3" alignItems="center" height={40}>
        <Text variant="body2">Left</Text>
        <Divider orientation="vertical" />
        <Text variant="body2">Right</Text>
      </HStack>

      <SectionLabel>Multiple Segments</SectionLabel>
      <HStack gap="$3" alignItems="center" height={40}>
        <Text variant="body2">Home</Text>
        <Divider orientation="vertical" />
        <Text variant="body2">Products</Text>
        <Divider orientation="vertical" />
        <Text variant="body2">About</Text>
        <Divider orientation="vertical" />
        <Text variant="body2">Contact</Text>
      </HStack>

      <SectionLabel>In a Toolbar Layout</SectionLabel>
      <HStack
        gap="$3"
        alignItems="center"
        height={48}
        paddingHorizontal="$3"
        backgroundColor="$backgroundStrong"
        borderRadius="$md"
      >
        <Text variant="body3">Edit</Text>
        <Text variant="body3">Copy</Text>
        <Divider orientation="vertical" />
        <Text variant="body3">Undo</Text>
        <Text variant="body3">Redo</Text>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. AllSpacings
// ---------------------------------------------------------------------------

export const AllSpacings: Story = {
  name: 'All Spacings',
  render: () => (
    <VStack padding="$4" gap="$4" width={320}>
      <SectionLabel>Spacing Presets</SectionLabel>

      {(['none', 'sm', 'md', 'lg'] as const).map((spacing) => (
        <VStack key={spacing}>
          <Text variant="body3" color="$colorSecondary">
            spacing="{spacing}"
          </Text>
          <VStack
            backgroundColor="$backgroundStrong"
            borderRadius="$md"
            padding="$2"
          >
            <Text variant="body2">Above</Text>
            <Divider spacing={spacing} />
            <Text variant="body2">Below</Text>
          </VStack>
        </VStack>
      ))}

      <SectionLabel>Vertical Spacing</SectionLabel>
      <HStack
        alignItems="center"
        height={40}
        backgroundColor="$backgroundStrong"
        borderRadius="$md"
        padding="$2"
      >
        {(['none', 'sm', 'md', 'lg'] as const).map((spacing, i, arr) => (
          <React.Fragment key={spacing}>
            <Text variant="caption">{spacing}</Text>
            {i < arr.length - 1 && (
              <Divider orientation="vertical" spacing={spacing} />
            )}
          </React.Fragment>
        ))}
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithLabel
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <VStack padding="$4" gap="$4" width={320}>
      <SectionLabel>Labeled Dividers</SectionLabel>

      <Divider label="OR" />
      <Divider label="Section" />
      <Divider label="Continue with" />

      <SectionLabel>In Context</SectionLabel>
      <VStack gap="$3">
        <VStack
          backgroundColor="$backgroundStrong"
          borderRadius="$md"
          padding="$3"
          height={44}
          justifyContent="center"
        >
          <Text variant="body2" textAlign="center">
            Sign in with Email
          </Text>
        </VStack>

        <Divider label="OR" spacing="sm" />

        <VStack
          backgroundColor="$backgroundStrong"
          borderRadius="$md"
          padding="$3"
          height={44}
          justifyContent="center"
        >
          <Text variant="body2" textAlign="center">
            Sign in with SSO
          </Text>
        </VStack>
      </VStack>

      <SectionLabel>Custom Color with Label</SectionLabel>
      <Divider label="Important" color="#CC2929" />
      <Divider label="Info" color="#4B3FFF" />
    </VStack>
  ),
}
