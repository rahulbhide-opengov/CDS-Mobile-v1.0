import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  HomeIcon,
  SearchIcon,
  CalendarIcon,
  SettingsIcon,
} from '@opengov/cds-icons'
import { SegmentedControl, type SegmentedControlProps } from './SegmentedControl'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SegmentedControl> = {
  title: 'Controls/SegmentedControl',
  component: SegmentedControl,
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
// 1. Default -- interactive 2-segment control
// ---------------------------------------------------------------------------

function SegmentedControlInteractive() {
  const [activeKey, setActiveKey] = useState('list')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Interactive Segmented Control</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedControl
        items={[
          { key: 'list', label: 'List' },
          { key: 'grid', label: 'Grid' },
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
          Showing: {activeKey} view
        </Text>
      </Box>
    </VStack>
  )
}

export const Default: StoryObj = {
  name: 'Default (2 Items)',
  render: () => <SegmentedControlInteractive />,
}

// ---------------------------------------------------------------------------
// 2. ThreeItems -- 3-segment control
// ---------------------------------------------------------------------------

function ThreeItemsInteractive() {
  const [activeKey, setActiveKey] = useState('day')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>3-Item Segmented Control</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedControl
        items={[
          { key: 'day', label: 'Day' },
          { key: 'week', label: 'Week' },
          { key: 'month', label: 'Month' },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
    </VStack>
  )
}

export const ThreeItems: StoryObj = {
  name: '3 Items',
  render: () => <ThreeItemsInteractive />,
}

// ---------------------------------------------------------------------------
// 3. FourItems -- 4-segment control (maximum recommended)
// ---------------------------------------------------------------------------

function FourItemsInteractive() {
  const [activeKey, setActiveKey] = useState('all')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>4-Item Segmented Control</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedControl
        items={[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'pending', label: 'Pending' },
          { key: 'closed', label: 'Closed' },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />
    </VStack>
  )
}

export const FourItems: StoryObj = {
  name: '4 Items',
  render: () => <FourItemsInteractive />,
}

// ---------------------------------------------------------------------------
// 4. WithIcons -- segments with leading icons
// ---------------------------------------------------------------------------

function WithIconsInteractive() {
  const [activeKey, setActiveKey] = useState('home')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>With Leading Icons</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Selected: {activeKey}
      </Text>

      <SegmentedControl
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="sm" color="#212121" /> },
          { key: 'search', label: 'Search', icon: <SearchIcon size="sm" color="#212121" /> },
          { key: 'calendar', label: 'Calendar', icon: <CalendarIcon size="sm" color="#212121" /> },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <SectionLabel>2 Items with Icons</SectionLabel>

      <SegmentedControl
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="sm" color="#212121" /> },
          { key: 'settings', label: 'Settings', icon: <SettingsIcon size="sm" color="#212121" /> },
        ]}
        activeKey="home"
        onSelect={() => {}}
      />
    </VStack>
  )
}

export const WithIcons: StoryObj = {
  name: 'With Icons',
  render: () => <WithIconsInteractive />,
}
