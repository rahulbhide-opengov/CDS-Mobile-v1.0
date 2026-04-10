import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { DateStatus, type DateStatusProps } from './DateStatus'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof DateStatus> = {
  title: 'Patterns/DateStatus',
  component: DateStatus,
  argTypes: {
    status: {
      control: 'select',
      options: ['positive', 'negative', 'warning', 'info', 'neutral'],
    },
    showDot: { control: 'boolean' },
    date: { control: 'text' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof DateStatus>

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
// 1. AllStatuses
// ---------------------------------------------------------------------------

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>All 5 Status Types</SectionLabel>

      <VStack gap="$3">
        <HStack gap="$4" alignItems="center">
          <Box width={80}>
            <Text variant="caption" color="$colorSecondary">Positive</Text>
          </Box>
          <DateStatus date="Apr 10, 2026" status="positive" />
        </HStack>

        <HStack gap="$4" alignItems="center">
          <Box width={80}>
            <Text variant="caption" color="$colorSecondary">Negative</Text>
          </Box>
          <DateStatus date="Mar 1, 2026" status="negative" />
        </HStack>

        <HStack gap="$4" alignItems="center">
          <Box width={80}>
            <Text variant="caption" color="$colorSecondary">Warning</Text>
          </Box>
          <DateStatus date="Apr 15, 2026" status="warning" />
        </HStack>

        <HStack gap="$4" alignItems="center">
          <Box width={80}>
            <Text variant="caption" color="$colorSecondary">Info</Text>
          </Box>
          <DateStatus date="Apr 8, 2026" status="info" />
        </HStack>

        <HStack gap="$4" alignItems="center">
          <Box width={80}>
            <Text variant="caption" color="$colorSecondary">Neutral</Text>
          </Box>
          <DateStatus date="Jan 20, 2026" status="neutral" />
        </HStack>
      </VStack>

      <SectionLabel>Realistic Use Cases</SectionLabel>

      <VStack gap="$3">
        <DateStatus date="Completed on Apr 2, 2026" status="positive" />
        <DateStatus date="Overdue since Mar 1, 2026" status="negative" />
        <DateStatus date="Due in 5 days" status="warning" />
        <DateStatus date="Submitted Apr 8, 2026" status="info" />
        <DateStatus date="No deadline set" status="neutral" />
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. WithLabel
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Labels Above Date</SectionLabel>

      <VStack gap="$3">
        <DateStatus
          date="Apr 15, 2026"
          status="warning"
          label="Due date"
        />
        <DateStatus
          date="Mar 20, 2026"
          status="positive"
          label="Completed"
        />
        <DateStatus
          date="Jan 5, 2026"
          status="info"
          label="Created"
        />
        <DateStatus
          date="Apr 1, 2026"
          status="negative"
          label="Overdue since"
        />
        <DateStatus
          date="Not scheduled"
          status="neutral"
          label="Next review"
        />
      </VStack>

      <SectionLabel>In a Row Layout</SectionLabel>
      <HStack gap="$6" flexWrap="wrap">
        <DateStatus date="Jan 10, 2026" status="info" label="Start date" />
        <DateStatus date="Apr 30, 2026" status="warning" label="End date" />
        <DateStatus date="Mar 15, 2026" status="positive" label="Last updated" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. WithoutDot
// ---------------------------------------------------------------------------

export const WithoutDot: Story = {
  name: 'Without Dot',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Dot Hidden</SectionLabel>

      <VStack gap="$3">
        <DateStatus
          date="Apr 10, 2026"
          status="positive"
          showDot={false}
          label="Completed"
        />
        <DateStatus
          date="Mar 1, 2026"
          status="negative"
          showDot={false}
          label="Overdue"
        />
        <DateStatus
          date="Apr 15, 2026"
          status="warning"
          showDot={false}
          label="Due date"
        />
      </VStack>

      <SectionLabel>Side-by-Side Comparison</SectionLabel>
      <HStack gap="$6">
        <VStack gap="$1">
          <Text variant="caption" color="$colorSecondary">With dot</Text>
          <DateStatus date="Apr 10, 2026" status="positive" label="Status" />
        </VStack>
        <VStack gap="$1">
          <Text variant="caption" color="$colorSecondary">Without dot</Text>
          <DateStatus date="Apr 10, 2026" status="positive" label="Status" showDot={false} />
        </VStack>
      </HStack>
    </VStack>
  ),
}
