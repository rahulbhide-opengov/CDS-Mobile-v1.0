import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Card, type CardProps } from './Card'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Card> = {
  title: 'Content/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Card>

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

function SampleContent({ title, body }: { title: string; body: string }) {
  return (
    <VStack gap="$1">
      <Text variant="h5">{title}</Text>
      <Text variant="body2" color="$colorSecondary">
        {body}
      </Text>
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// 1. Elevated
// ---------------------------------------------------------------------------

export const Elevated: Story = {
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>Elevated Card (Default)</SectionLabel>
      <Card variant="elevated">
        <SampleContent
          title="Elevated Card"
          body="This card uses a shadow to appear elevated above the surface. It is the default card variant."
        />
      </Card>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. Outlined
// ---------------------------------------------------------------------------

export const Outlined: Story = {
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>Outlined Card</SectionLabel>
      <Card variant="outlined">
        <SampleContent
          title="Outlined Card"
          body="This card has a visible border instead of a shadow. Useful for flat UI patterns."
        />
      </Card>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. Filled
// ---------------------------------------------------------------------------

export const Filled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>Filled Card</SectionLabel>
      <Card variant="filled">
        <SampleContent
          title="Filled Card"
          body="This card has a tinted background without border or shadow. Good for secondary content areas."
        />
      </Card>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. Pressable
// ---------------------------------------------------------------------------

export const Pressable: Story = {
  render: () => {
    const [pressCount, setPressCount] = useState(0)
    return (
      <VStack padding="$4" gap="$4" width={340}>
        <SectionLabel>Pressable Card</SectionLabel>
        <Text variant="caption" color="$colorSecondary">
          Press the card -- it scales down for tactile feedback
        </Text>

        <Card
          variant="elevated"
          onPress={() => setPressCount((c) => c + 1)}
          accessibilityLabel="Pressable card example"
        >
          <SampleContent
            title="Tap Me"
            body="This card responds to press events with a spring-based scale animation."
          />
        </Card>
        <Text variant="caption" color="$colorSecondary">
          Pressed {pressCount} time{pressCount !== 1 ? 's' : ''}
        </Text>

        <SectionLabel>Pressable Variants</SectionLabel>
        {(['elevated', 'outlined', 'filled'] as const).map((variant) => (
          <Card
            key={variant}
            variant={variant}
            onPress={() => {}}
            accessibilityLabel={`${variant} pressable card`}
          >
            <SampleContent
              title={`Pressable ${variant}`}
              body="Tap to see the press feedback animation."
            />
          </Card>
        ))}
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 5. WithHeaderContentFooter
// ---------------------------------------------------------------------------

export const WithHeaderContentFooter: Story = {
  name: 'With Header, Content, Footer',
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>Structured Card Slots</SectionLabel>

      <Card variant="elevated">
        <Card.Header>
          <Text variant="h5">Card Header</Text>
          <Text variant="caption" color="$colorSecondary">
            Subtitle or metadata
          </Text>
        </Card.Header>
        <Card.Content>
          <Text variant="body2">
            This is the main content area of the card. It can contain any
            arbitrary content including text, images, or other components.
          </Text>
        </Card.Content>
        <Card.Footer>
          <HStack justifyContent="flex-end" gap="$2">
            <Text variant="body3" color="$brandBackground">
              View Details
            </Text>
          </HStack>
        </Card.Footer>
      </Card>

      <SectionLabel>Outlined with Sections</SectionLabel>
      <Card variant="outlined">
        <Card.Header>
          <Text variant="h5">Project Update</Text>
        </Card.Header>
        <Card.Content>
          <Text variant="body2" color="$colorSecondary">
            Sprint 14 completed with all 12 stories delivered on time.
            Performance metrics exceeded targets.
          </Text>
        </Card.Content>
        <Card.Footer>
          <HStack justifyContent="space-between" alignItems="center">
            <Text variant="caption" color="$colorSecondary">
              Updated 2h ago
            </Text>
            <Text variant="body3" color="$brandBackground">
              Read More
            </Text>
          </HStack>
        </Card.Footer>
      </Card>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. AllPaddings
// ---------------------------------------------------------------------------

export const AllPaddings: Story = {
  name: 'All Paddings',
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>Padding Presets</SectionLabel>

      {(['none', 'sm', 'md', 'lg'] as const).map((padding) => (
        <Card key={padding} variant="outlined" padding={padding}>
          <SampleContent
            title={`padding="${padding}"`}
            body={`This card uses the ${padding} padding preset.`}
          />
        </Card>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>Disabled Cards</SectionLabel>

      {(['elevated', 'outlined', 'filled'] as const).map((variant) => (
        <VStack key={variant} gap="$2">
          <Text variant="body3" color="$colorSecondary">
            {variant} -- disabled
          </Text>
          <Card variant={variant} disabled>
            <SampleContent
              title={`Disabled ${variant}`}
              body="This card is disabled and appears at reduced opacity."
            />
          </Card>
        </VStack>
      ))}

      <SectionLabel>Disabled Pressable</SectionLabel>
      <Card
        variant="elevated"
        onPress={() => {}}
        disabled
        accessibilityLabel="Disabled pressable card"
      >
        <SampleContent
          title="Cannot Press"
          body="This pressable card is disabled. Tapping does nothing."
        />
      </Card>
    </VStack>
  ),
}
