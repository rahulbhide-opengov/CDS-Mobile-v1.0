import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'
import { VStack } from './Stacks'

const meta: Meta<typeof Text> = {
  title: 'Primitives/Typography',
  component: Text,
}

export default meta
type Story = StoryObj<typeof Text>

export const AllVariants: Story = {
  render: () => (
    <VStack padding="$6" gap="$4">
      <Text variant="display1">Display 1</Text>
      <Text variant="display2">Display 2</Text>
      <Text variant="display3">Display 3</Text>
      <Text variant="display4">Display 4</Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="body1">Body 1 — Primary reading text</Text>
      <Text variant="body2">Body 2 — Default body text</Text>
      <Text variant="body3">Body 3 — Secondary text</Text>
      <Text variant="caption">Caption — Small helper text</Text>
      <Text variant="overline">Overline — Section label</Text>
    </VStack>
  ),
}

export const Weights: Story = {
  render: () => (
    <VStack padding="$6" gap="$3">
      <Text variant="h4">Font Weights</Text>
      <Text weight="light">Light (300)</Text>
      <Text weight="regular">Regular (400)</Text>
      <Text weight="medium">Medium (500)</Text>
      <Text weight="semibold">Semibold (600)</Text>
      <Text weight="bold">Bold (700)</Text>
    </VStack>
  ),
}

export const Alignment: Story = {
  render: () => (
    <VStack padding="$6" gap="$3">
      <Text variant="h4">Text Alignment</Text>
      <Text align="left">Left aligned (default)</Text>
      <Text align="center">Center aligned</Text>
      <Text align="right">Right aligned</Text>
    </VStack>
  ),
}

export const States: Story = {
  render: () => (
    <VStack padding="$6" gap="$3">
      <Text variant="h4">Text States</Text>
      <Text>Default color</Text>
      <Text secondary>Secondary color</Text>
      <Text disabled>Disabled color</Text>
    </VStack>
  ),
}

export const DisplayScale: Story = {
  name: 'Display Scale (Hero Text)',
  render: () => (
    <VStack padding="$6" gap="$6">
      <VStack gap="$1">
        <Text variant="overline">Display 1 — 64pt</Text>
        <Text variant="display1">$42.5M</Text>
      </VStack>
      <VStack gap="$1">
        <Text variant="overline">Display 2 — 56pt</Text>
        <Text variant="display2">Revenue</Text>
      </VStack>
      <VStack gap="$1">
        <Text variant="overline">Display 3 — 48pt</Text>
        <Text variant="display3">Dashboard</Text>
      </VStack>
      <VStack gap="$1">
        <Text variant="overline">Display 4 — 40pt</Text>
        <Text variant="display4">Overview</Text>
      </VStack>
    </VStack>
  ),
}

export const HeadingScale: Story = {
  name: 'Heading Scale (Page Structure)',
  render: () => (
    <VStack padding="$6" gap="$4">
      <Text variant="h1">H1 — Page Title (32pt)</Text>
      <Text variant="body2" secondary>Used for primary page headings</Text>
      <Text variant="h2">H2 — Section Title (28pt)</Text>
      <Text variant="body2" secondary>Used for major sections</Text>
      <Text variant="h3">H3 — Subsection (24pt)</Text>
      <Text variant="body2" secondary>Used for card titles and subsections</Text>
      <Text variant="h4">H4 — Group Header (20pt)</Text>
      <Text variant="body2" secondary>Used for form groups and list headers</Text>
      <Text variant="h5">H5 — Label (16pt semibold)</Text>
      <Text variant="body2" secondary>Used for field labels and small headers</Text>
      <Text variant="h6">H6 — Small Label (14pt semibold)</Text>
      <Text variant="body2" secondary>Used for metadata and tags</Text>
    </VStack>
  ),
}
