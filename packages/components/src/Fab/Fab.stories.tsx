import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { AddIcon, EditIcon, SearchIcon } from '@opengov/cds-icons'
import { Fab, type FabProps } from './Fab'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Fab> = {
  title: 'Advanced/Fab',
  component: Fab,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    position: {
      control: 'select',
      options: ['bottomRight', 'bottomLeft', 'bottomCenter'],
    },
    disabled: { control: 'boolean' },
    extended: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Fab>

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h5" color="$colorSecondary">
      {children}
    </Text>
  )
}

/** Inline plus icon that does not depend on cds-icons availability */
function PlusIcon({ color = 'white', size = 24 }: { color?: string; size?: number }) {
  return (
    <Box width={size} height={size} alignItems="center" justifyContent="center">
      <Box
        width={size * 0.6}
        height={2}
        backgroundColor={color}
        borderRadius={1}
        position="absolute"
      />
      <Box
        width={2}
        height={size * 0.6}
        backgroundColor={color}
        borderRadius={1}
        position="absolute"
      />
    </Box>
  )
}

/** Container that provides a relative positioned area for FABs */
function FabContainer({ children, height = 200 }: { children: React.ReactNode; height?: number }) {
  return (
    <Box
      height={height}
      backgroundColor="#FAFAFA"
      borderRadius={8}
      borderWidth={1}
      borderColor="#EEEEEE"
      position="relative"
      overflow="hidden"
    >
      {children}
    </Box>
  )
}

// ---------------------------------------------------------------------------
// 1. Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Default',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Default FAB (Primary, Medium, Bottom Right)</SectionLabel>
      <FabContainer>
        <Fab
          icon={<PlusIcon />}
          onPress={() => {}}
        />
      </FabContainer>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. AllSizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      <HStack gap="$4" alignItems="flex-end" justifyContent="center" paddingVertical="$4">
        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">Small (40)</Text>
          <Box position="relative" width={60} height={60}>
            <Fab
              icon={<PlusIcon size={18} />}
              size="sm"
              position="bottomCenter"
              onPress={() => {}}
            />
          </Box>
        </VStack>

        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">Medium (56)</Text>
          <Box position="relative" width={76} height={76}>
            <Fab
              icon={<PlusIcon size={24} />}
              size="md"
              position="bottomCenter"
              onPress={() => {}}
            />
          </Box>
        </VStack>

        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">Large (72)</Text>
          <Box position="relative" width={92} height={92}>
            <Fab
              icon={<PlusIcon size={28} />}
              size="lg"
              position="bottomCenter"
              onPress={() => {}}
            />
          </Box>
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
    <VStack gap="$4" padding="$4">
      <SectionLabel>Color Schemes</SectionLabel>

      <VStack gap="$3">
        <Text variant="caption" color="$colorSecondary">Primary</Text>
        <FabContainer height={100}>
          <Fab
            icon={<PlusIcon color="white" />}
            color="primary"
            onPress={() => {}}
          />
        </FabContainer>

        <Text variant="caption" color="$colorSecondary">Secondary (bordered)</Text>
        <FabContainer height={100}>
          <Fab
            icon={<PlusIcon color="#212121" />}
            color="secondary"
            onPress={() => {}}
          />
        </FabContainer>

        <Text variant="caption" color="$colorSecondary">Tertiary</Text>
        <FabContainer height={100}>
          <Fab
            icon={<PlusIcon color="#212121" />}
            color="tertiary"
            onPress={() => {}}
          />
        </FabContainer>
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. Extended
// ---------------------------------------------------------------------------

export const Extended: Story = {
  name: 'Extended (with Label)',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Extended FAB with Label</SectionLabel>

      <VStack gap="$3">
        <Text variant="caption" color="$colorSecondary">Primary extended</Text>
        <FabContainer height={100}>
          <Fab
            icon={<PlusIcon />}
            label="New Record"
            extended
            color="primary"
            onPress={() => {}}
          />
        </FabContainer>

        <Text variant="caption" color="$colorSecondary">Secondary extended</Text>
        <FabContainer height={100}>
          <Fab
            icon={<PlusIcon color="#212121" />}
            label="Add Item"
            extended
            color="secondary"
            onPress={() => {}}
          />
        </FabContainer>

        <Text variant="caption" color="$colorSecondary">All sizes extended</Text>
        <FabContainer height={240}>
          <Fab
            icon={<PlusIcon size={18} />}
            label="Small"
            extended
            size="sm"
            position="bottomLeft"
            onPress={() => {}}
          />
          <Box position="absolute" bottom={80} right={16}>
            <Box position="relative" width={200} height={56}>
              <Fab
                icon={<PlusIcon size={24} />}
                label="Medium"
                extended
                size="md"
                position="bottomRight"
                onPress={() => {}}
              />
            </Box>
          </Box>
          <Box position="absolute" bottom={148} left={16}>
            <Box position="relative" width={200} height={72}>
              <Fab
                icon={<PlusIcon size={28} />}
                label="Large"
                extended
                size="lg"
                position="bottomLeft"
                onPress={() => {}}
              />
            </Box>
          </Box>
        </FabContainer>
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Disabled FAB</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Disabled state reduces opacity to 50% and prevents interaction.
      </Text>

      <HStack gap="$4" justifyContent="center" paddingVertical="$4">
        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">Enabled</Text>
          <Box position="relative" width={76} height={76}>
            <Fab
              icon={<PlusIcon />}
              position="bottomCenter"
              onPress={() => {}}
            />
          </Box>
        </VStack>

        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">Disabled</Text>
          <Box position="relative" width={76} height={76}>
            <Fab
              icon={<PlusIcon />}
              position="bottomCenter"
              disabled
              onPress={() => {}}
            />
          </Box>
        </VStack>
      </HStack>

      <SectionLabel>Disabled Extended</SectionLabel>
      <FabContainer height={100}>
        <Fab
          icon={<PlusIcon />}
          label="Unavailable"
          extended
          disabled
          onPress={() => {}}
        />
      </FabContainer>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. AllPositions
// ---------------------------------------------------------------------------

export const AllPositions: Story = {
  name: 'All Positions',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Position Variants</SectionLabel>

      <Text variant="caption" color="$colorSecondary">Bottom Right (default)</Text>
      <FabContainer>
        <Fab
          icon={<PlusIcon />}
          position="bottomRight"
          onPress={() => {}}
        />
      </FabContainer>

      <Text variant="caption" color="$colorSecondary">Bottom Left</Text>
      <FabContainer>
        <Fab
          icon={<PlusIcon />}
          position="bottomLeft"
          onPress={() => {}}
        />
      </FabContainer>

      <Text variant="caption" color="$colorSecondary">Bottom Center</Text>
      <FabContainer>
        <Fab
          icon={<PlusIcon />}
          position="bottomCenter"
          onPress={() => {}}
        />
      </FabContainer>
    </VStack>
  ),
}
