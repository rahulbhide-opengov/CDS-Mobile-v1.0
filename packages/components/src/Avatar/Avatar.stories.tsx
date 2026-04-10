import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Avatar, type AvatarProps } from './Avatar'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Avatar> = {
  title: 'Content/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

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

// Sample image URIs for demonstration
const SAMPLE_IMAGES = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
]

// ---------------------------------------------------------------------------
// 1. WithImage
// ---------------------------------------------------------------------------

export const WithImage: Story = {
  name: 'With Image',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Avatar with Image</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Avatar
          source={{ uri: SAMPLE_IMAGES[0] }}
          name="Alice Johnson"
          size="md"
        />
        <Avatar
          source={{ uri: SAMPLE_IMAGES[1] }}
          name="Bob Smith"
          size="md"
        />
        <Avatar
          source={{ uri: SAMPLE_IMAGES[2] }}
          name="Carol Davis"
          size="md"
        />
        <Avatar
          source={{ uri: SAMPLE_IMAGES[3] }}
          name="David Lee"
          size="md"
        />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. WithInitials
// ---------------------------------------------------------------------------

export const WithInitials: Story = {
  name: 'With Initials',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Avatar with Initials</SectionLabel>
      <Text variant="caption" color="$colorSecondary">
        Background color is deterministic based on the name
      </Text>
      <HStack gap="$4" alignItems="center" flexWrap="wrap">
        <Avatar name="Alice Johnson" size="lg" />
        <Avatar name="Bob Smith" size="lg" />
        <Avatar name="Carol Davis" size="lg" />
        <Avatar name="David Lee" size="lg" />
        <Avatar name="Eve Wilson" size="lg" />
        <Avatar name="Frank Brown" size="lg" />
      </HStack>

      <SectionLabel>Single Name</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Avatar name="Alice" size="lg" />
        <Avatar name="Bob" size="lg" />
        <Avatar name="Zara" size="lg" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. AllSizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <HStack key={size} gap="$3" alignItems="center">
          <Avatar name="Alice Johnson" size={size} />
          <Text variant="body2" color="$colorSecondary">
            {size}
          </Text>
        </HStack>
      ))}

      <SectionLabel>All Sizes in a Row</SectionLabel>
      <HStack gap="$3" alignItems="center">
        <Avatar name="Alice Johnson" size="xs" />
        <Avatar name="Alice Johnson" size="sm" />
        <Avatar name="Alice Johnson" size="md" />
        <Avatar name="Alice Johnson" size="lg" />
        <Avatar name="Alice Johnson" size="xl" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. AllShapes
// ---------------------------------------------------------------------------

export const AllShapes: Story = {
  name: 'All Shapes',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Shape Comparison</SectionLabel>

      {(['circle', 'rounded', 'square'] as const).map((shape) => (
        <HStack key={shape} gap="$3" alignItems="center">
          <Avatar name="Alice Johnson" size="lg" shape={shape} />
          <Avatar name="Bob Smith" size="lg" shape={shape} />
          <Text variant="body2" color="$colorSecondary">
            {shape}
          </Text>
        </HStack>
      ))}

      <SectionLabel>With Image -- All Shapes</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <VStack alignItems="center" gap="$1">
          <Avatar
            source={{ uri: SAMPLE_IMAGES[0] }}
            name="Alice"
            size="lg"
            shape="circle"
          />
          <Text variant="caption" color="$colorSecondary">circle</Text>
        </VStack>
        <VStack alignItems="center" gap="$1">
          <Avatar
            source={{ uri: SAMPLE_IMAGES[0] }}
            name="Alice"
            size="lg"
            shape="rounded"
          />
          <Text variant="caption" color="$colorSecondary">rounded</Text>
        </VStack>
        <VStack alignItems="center" gap="$1">
          <Avatar
            source={{ uri: SAMPLE_IMAGES[0] }}
            name="Alice"
            size="lg"
            shape="square"
          />
          <Text variant="caption" color="$colorSecondary">square</Text>
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. WithStatus
// ---------------------------------------------------------------------------

export const WithStatus: Story = {
  name: 'With Status',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Status Indicators</SectionLabel>

      {(['online', 'offline', 'busy'] as const).map((status) => (
        <HStack key={status} gap="$3" alignItems="center">
          <Avatar name="Alice Johnson" size="lg" status={status} />
          <Text variant="body2">{status}</Text>
        </HStack>
      ))}

      <SectionLabel>Status Across Sizes</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Avatar name="Alice" size="xs" status="online" />
        <Avatar name="Alice" size="sm" status="online" />
        <Avatar name="Alice" size="md" status="online" />
        <Avatar name="Alice" size="lg" status="online" />
        <Avatar name="Alice" size="xl" status="online" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. FallbackBehavior
// ---------------------------------------------------------------------------

export const FallbackBehavior: Story = {
  name: 'Fallback Behavior',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Image Load Failure Fallback</SectionLabel>
      <Text variant="caption" color="$colorSecondary">
        Invalid image URI falls back to initials
      </Text>
      <HStack gap="$4" alignItems="center">
        <VStack alignItems="center" gap="$1">
          <Avatar
            source={{ uri: 'https://invalid-url-that-will-fail.test/img.jpg' }}
            name="Alice Johnson"
            size="lg"
          />
          <Text variant="caption" color="$colorSecondary">Bad URL</Text>
        </VStack>
        <VStack alignItems="center" gap="$1">
          <Avatar name="Alice Johnson" size="lg" />
          <Text variant="caption" color="$colorSecondary">No image</Text>
        </VStack>
        <VStack alignItems="center" gap="$1">
          <Avatar
            source={{ uri: SAMPLE_IMAGES[0] }}
            name="Alice Johnson"
            size="lg"
          />
          <Text variant="caption" color="$colorSecondary">Valid URL</Text>
        </VStack>
      </HStack>

      <SectionLabel>No Name Provided</SectionLabel>
      <Avatar size="lg" />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. AvatarGroup
// ---------------------------------------------------------------------------

export const AvatarGroup: Story = {
  name: 'Avatar Group',
  render: () => {
    const people = [
      { name: 'Alice Johnson', image: SAMPLE_IMAGES[0] },
      { name: 'Bob Smith', image: SAMPLE_IMAGES[1] },
      { name: 'Carol Davis', image: SAMPLE_IMAGES[2] },
      { name: 'David Lee', image: SAMPLE_IMAGES[3] },
      { name: 'Eve Wilson' },
    ]

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Overlapping Avatar Group</SectionLabel>
        <HStack>
          {people.map((person, i) => (
            <VStack
              key={person.name}
              marginLeft={i === 0 ? 0 : -12}
              zIndex={people.length - i}
              borderRadius={9999}
              borderWidth={2}
              borderColor="white"
            >
              <Avatar
                source={person.image ? { uri: person.image } : undefined}
                name={person.name}
                size="md"
              />
            </VStack>
          ))}
        </HStack>

        <SectionLabel>Large Group</SectionLabel>
        <HStack>
          {people.map((person, i) => (
            <VStack
              key={person.name}
              marginLeft={i === 0 ? 0 : -16}
              zIndex={people.length - i}
              borderRadius={9999}
              borderWidth={2}
              borderColor="white"
            >
              <Avatar
                source={person.image ? { uri: person.image } : undefined}
                name={person.name}
                size="lg"
              />
            </VStack>
          ))}
        </HStack>

        <SectionLabel>Small Group with Initials</SectionLabel>
        <HStack>
          {people.map((person, i) => (
            <VStack
              key={person.name}
              marginLeft={i === 0 ? 0 : -8}
              zIndex={people.length - i}
              borderRadius={9999}
              borderWidth={2}
              borderColor="white"
            >
              <Avatar name={person.name} size="sm" />
            </VStack>
          ))}
        </HStack>
      </VStack>
    )
  },
}
