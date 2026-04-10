import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  HomeIcon,
  CalendarIcon,
  SearchIcon,
} from '@opengov/cds-icons'
import { SegmentedTabs, type SegmentedTabsProps } from './SegmentedTabs'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SegmentedTabs> = {
  title: 'Controls/SegmentedTabs',
  component: SegmentedTabs,
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
// 1. DefaultWithCounts -- interactive tabs with label + count badges
// ---------------------------------------------------------------------------

function DefaultWithCountsInteractive() {
  const [activeKey, setActiveKey] = useState('scheduled')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Interactive Segmented Tabs with Counts</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedTabs
        items={[
          { key: 'scheduled', label: 'Scheduled', count: 4 },
          { key: 'missed', label: 'Missed', count: 1 },
          { key: 'requested', label: 'Requested', count: 4 },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <Box
        padding="$4"
        backgroundColor="$backgroundStrong"
        borderRadius="$md"
        minHeight={80}
        alignItems="center"
        justifyContent="center"
      >
        <Text variant="body2" color="$colorSecondary">
          Filtering by: {activeKey}
        </Text>
      </Box>
    </VStack>
  )
}

export const DefaultWithCounts: StoryObj = {
  name: 'Default with Counts',
  render: () => <DefaultWithCountsInteractive />,
}

// ---------------------------------------------------------------------------
// 2. IconOnly -- compact icon-only variant
// ---------------------------------------------------------------------------

function IconOnlyInteractive() {
  const [activeKey, setActiveKey] = useState('home')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Icon-Only Variant</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedTabs
        variant="iconOnly"
        items={[
          { key: 'home', icon: <HomeIcon size="sm" color="#9E9E9E" />, activeIcon: <HomeIcon size="sm" color="#4B3FFF" /> },
          { key: 'calendar', icon: <CalendarIcon size="sm" color="#9E9E9E" />, activeIcon: <CalendarIcon size="sm" color="#4B3FFF" /> },
          { key: 'search', icon: <SearchIcon size="sm" color="#9E9E9E" />, activeIcon: <SearchIcon size="sm" color="#4B3FFF" /> },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
    </VStack>
  )
}

export const IconOnly: StoryObj = {
  name: 'Icon Only',
  render: () => <IconOnlyInteractive />,
}

// ---------------------------------------------------------------------------
// 3. ThreeTabs -- label-only tabs without count badges
// ---------------------------------------------------------------------------

function ThreeTabsInteractive() {
  const [activeKey, setActiveKey] = useState('overview')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>3 Label Tabs (No Counts)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedTabs
        items={[
          { key: 'overview', label: 'Overview' },
          { key: 'details', label: 'Details' },
          { key: 'history', label: 'History' },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <SectionLabel>2 Tabs with High Counts</SectionLabel>

      <SegmentedTabs
        items={[
          { key: 'open', label: 'Open', count: 142 },
          { key: 'resolved', label: 'Resolved', count: 58 },
        ]}
        activeKey="open"
        onSelect={() => {}}
      />
    </VStack>
  )
}

export const ThreeTabs: StoryObj = {
  name: 'Three Tabs',
  render: () => <ThreeTabsInteractive />,
}
