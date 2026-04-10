import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  SearchIcon,
  CalendarIcon,
  AddIcon,
} from '@opengov/cds-icons'
import { EmptyState, type EmptyStateProps } from './EmptyState'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
}

export default meta

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h5" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// Simple placeholder illustration for stories
// ---------------------------------------------------------------------------

function PlaceholderIllustration({ size = 64, color = '#BDBDBD' }: { size?: number; color?: string }) {
  return (
    <Box
      width={size}
      height={size}
      borderRadius={size / 2}
      backgroundColor="#F5F5F5"
      alignItems="center"
      justifyContent="center"
      borderWidth={2}
      borderColor={color}
      borderStyle="dashed"
    >
      <Text fontSize={size * 0.4} color={color}>?</Text>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// 1. Default -- basic empty state with title and description
// ---------------------------------------------------------------------------

export const Default: StoryObj = {
  name: 'Default',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Default Empty State</SectionLabel>

      <Box height={300} borderWidth={1} borderColor="$borderColor" borderRadius="$md">
        <EmptyState
          title="No Results Found"
          description="Try adjusting your search or filters to find what you are looking for."
        />
      </Box>

      <SectionLabel>With Icon</SectionLabel>

      <Box height={300} borderWidth={1} borderColor="$borderColor" borderRadius="$md">
        <EmptyState
          icon={<SearchIcon size="lg" color="#BDBDBD" />}
          title="No Results Found"
          description="We could not find any records matching your search criteria."
        />
      </Box>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. WithAction -- includes a call-to-action button
// ---------------------------------------------------------------------------

export const WithAction: StoryObj = {
  name: 'With Action',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Empty State with Action Button</SectionLabel>

      <Box height={350} borderWidth={1} borderColor="$borderColor" borderRadius="$md">
        <EmptyState
          icon={<CalendarIcon size="lg" color="#BDBDBD" />}
          title="No Upcoming Inspections"
          description="You have no scheduled inspections. Create a new one to get started."
          action={{
            label: 'Schedule Inspection',
            onPress: () => {},
          }}
        />
      </Box>

      <SectionLabel>Without Icon</SectionLabel>

      <Box height={280} borderWidth={1} borderColor="$borderColor" borderRadius="$md">
        <EmptyState
          title="No Permits"
          description="There are no permits in this project yet."
          action={{
            label: 'Create Permit',
            onPress: () => {},
          }}
        />
      </Box>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. Compact -- reduced padding for inline placement
// ---------------------------------------------------------------------------

export const Compact: StoryObj = {
  name: 'Compact',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Compact Empty State</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Uses reduced padding and smaller typography. Suitable for embedding
        within cards or smaller containers.
      </Text>

      <Box
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$md"
        padding="$2"
      >
        <EmptyState
          title="No Attachments"
          description="Upload a file to attach it to this record."
          compact
        />
      </Box>

      <SectionLabel>Compact with Action</SectionLabel>

      <Box
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$md"
        padding="$2"
      >
        <EmptyState
          icon={<AddIcon size="md" color="#BDBDBD" />}
          title="No Notes"
          description="Add a note to document this activity."
          compact
          action={{
            label: 'Add Note',
            onPress: () => {},
          }}
        />
      </Box>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithCustomIcon -- custom illustration element in the icon slot
// ---------------------------------------------------------------------------

export const WithCustomIcon: StoryObj = {
  name: 'With Custom Icon',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Custom Illustration</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The icon slot accepts any React node, supporting custom illustrations.
      </Text>

      <Box height={350} borderWidth={1} borderColor="$borderColor" borderRadius="$md">
        <EmptyState
          icon={<PlaceholderIllustration size={80} color="#4B3FFF" />}
          title="Welcome to Permits"
          description="This is your workspace for managing building permits and applications. Get started by creating your first permit."
          action={{
            label: 'Get Started',
            onPress: () => {},
          }}
        />
      </Box>

      <SectionLabel>With a Small Icon</SectionLabel>

      <Box height={250} borderWidth={1} borderColor="$borderColor" borderRadius="$md">
        <EmptyState
          icon={<PlaceholderIllustration size={48} />}
          title="No Favorites"
          description="Star items to add them to your favorites list."
        />
      </Box>
    </VStack>
  ),
}
