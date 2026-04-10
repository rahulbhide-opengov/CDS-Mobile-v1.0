import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  CalendarIcon,
} from '@opengov/cds-icons'
import { Tab, type TabProps } from './Tab'
import { TabBar, type TabBarProps } from './TabBar'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Navigation/Tab',
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
// 1. PrimaryTabs -- interactive primary variant with underline indicator
// ---------------------------------------------------------------------------

function PrimaryTabsInteractive() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <VStack gap="$4">
      <SectionLabel>Primary Tabs (Interactive)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Active: {activeTab}
      </Text>

      <TabBar variant="primary">
        <Tab
          label="Overview"
          variant="primary"
          active={activeTab === 'overview'}
          onPress={() => setActiveTab('overview')}
        />
        <Tab
          label="Details"
          variant="primary"
          active={activeTab === 'details'}
          onPress={() => setActiveTab('details')}
        />
        <Tab
          label="Activity"
          variant="primary"
          active={activeTab === 'activity'}
          onPress={() => setActiveTab('activity')}
        />
      </TabBar>

      <Box
        padding="$4"
        backgroundColor="$backgroundStrong"
        borderRadius="$md"
        minHeight={80}
        alignItems="center"
        justifyContent="center"
      >
        <Text variant="body2" color="$colorSecondary">
          Content for: {activeTab}
        </Text>
      </Box>
    </VStack>
  )
}

export const PrimaryTabs: StoryObj = {
  name: 'Primary Tabs',
  render: () => <PrimaryTabsInteractive />,
}

// ---------------------------------------------------------------------------
// 2. SecondaryTabs -- filled pill variant
// ---------------------------------------------------------------------------

export const SecondaryTabs: StoryObj = {
  name: 'Secondary Tabs',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Secondary Tabs (Pill Variant)</SectionLabel>

      <TabBar variant="secondary">
        <Tab
          label="Day"
          variant="secondary"
          active
          onPress={() => {}}
        />
        <Tab
          label="Week"
          variant="secondary"
          active={false}
          onPress={() => {}}
        />
        <Tab
          label="Month"
          variant="secondary"
          active={false}
          onPress={() => {}}
        />
      </TabBar>

      <SectionLabel>4 Secondary Tabs</SectionLabel>

      <TabBar variant="secondary">
        <Tab label="All" variant="secondary" active onPress={() => {}} />
        <Tab label="Active" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Pending" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Closed" variant="secondary" active={false} onPress={() => {}} />
      </TabBar>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. ScrollableTabs -- horizontal scrolling for many tabs
// ---------------------------------------------------------------------------

export const ScrollableTabs: StoryObj = {
  name: 'Scrollable Tabs',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Scrollable Primary Tabs</SectionLabel>

      <TabBar variant="primary" scrollable>
        <Tab label="Overview" variant="primary" active onPress={() => {}} />
        <Tab label="Financials" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Documents" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Timeline" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Contacts" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Inspections" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Notes" variant="primary" active={false} onPress={() => {}} />
      </TabBar>

      <SectionLabel>Scrollable Secondary Tabs</SectionLabel>

      <TabBar variant="secondary" scrollable>
        <Tab label="Jan" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Feb" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Mar" variant="secondary" active onPress={() => {}} />
        <Tab label="Apr" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="May" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Jun" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Jul" variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Aug" variant="secondary" active={false} onPress={() => {}} />
      </TabBar>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithIcons -- tabs with leading icon elements
// ---------------------------------------------------------------------------

export const WithIcons: StoryObj = {
  name: 'With Icons',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Primary Tabs with Icons</SectionLabel>

      <TabBar variant="primary">
        <Tab
          label="Home"
          icon={<HomeIcon size="sm" color="#4B3FFF" />}
          variant="primary"
          active
          onPress={() => {}}
        />
        <Tab
          label="Search"
          icon={<SearchIcon size="sm" color="#9E9E9E" />}
          variant="primary"
          active={false}
          onPress={() => {}}
        />
        <Tab
          label="Calendar"
          icon={<CalendarIcon size="sm" color="#9E9E9E" />}
          variant="primary"
          active={false}
          onPress={() => {}}
        />
      </TabBar>

      <SectionLabel>Secondary Tabs with Icons</SectionLabel>

      <TabBar variant="secondary">
        <Tab
          label="Home"
          icon={<HomeIcon size="sm" color="white" />}
          variant="secondary"
          active
          onPress={() => {}}
        />
        <Tab
          label="Settings"
          icon={<SettingsIcon size="sm" color="#9E9E9E" />}
          variant="secondary"
          active={false}
          onPress={() => {}}
        />
      </TabBar>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. WithBadges -- tabs displaying notification counts
// ---------------------------------------------------------------------------

export const WithBadges: StoryObj = {
  name: 'With Badges',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Primary Tabs with Badges</SectionLabel>

      <TabBar variant="primary">
        <Tab label="Inbox" badge={12} variant="primary" active onPress={() => {}} />
        <Tab label="Drafts" badge={3} variant="primary" active={false} onPress={() => {}} />
        <Tab label="Sent" variant="primary" active={false} onPress={() => {}} />
      </TabBar>

      <SectionLabel>Secondary Tabs with Badges</SectionLabel>

      <TabBar variant="secondary">
        <Tab label="Active" badge={24} variant="secondary" active onPress={() => {}} />
        <Tab label="Pending" badge={8} variant="secondary" active={false} onPress={() => {}} />
        <Tab label="Archived" badge={150} variant="secondary" active={false} onPress={() => {}} />
      </TabBar>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. FixedVsScrollable -- side-by-side comparison
// ---------------------------------------------------------------------------

export const FixedVsScrollable: StoryObj = {
  name: 'Fixed vs Scrollable',
  render: () => (
    <VStack gap="$6">
      <SectionLabel>Fixed Layout (Even Distribution)</SectionLabel>
      <Text variant="caption" color="$colorSecondary">
        Each tab takes equal width. Best for 2-4 short-label tabs.
      </Text>

      <TabBar variant="primary">
        <Tab label="Tab A" variant="primary" active onPress={() => {}} />
        <Tab label="Tab B" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Tab C" variant="primary" active={false} onPress={() => {}} />
      </TabBar>

      <SectionLabel>Scrollable Layout (Natural Width)</SectionLabel>
      <Text variant="caption" color="$colorSecondary">
        Each tab takes its natural width. Best for 4+ tabs or long labels.
      </Text>

      <TabBar variant="primary" scrollable>
        <Tab label="Overview" variant="primary" active onPress={() => {}} />
        <Tab label="Financial Summary" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Attachments" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Inspection History" variant="primary" active={false} onPress={() => {}} />
        <Tab label="Audit Log" variant="primary" active={false} onPress={() => {}} />
      </TabBar>
    </VStack>
  ),
}
