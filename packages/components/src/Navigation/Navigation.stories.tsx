import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  CalendarIcon,
  ArrowBackIcon,
  MenuIcon,
  ShareIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  AddIcon,
} from '@opengov/cds-icons'
import { AppBar, type AppBarProps } from './AppBar'
import { BottomTabBar, type BottomTabBarProps } from './BottomTabBar'
import { FloatingBottomNav, type FloatingBottomNavProps } from './FloatingBottomNav'
import { Breadcrumbs, type BreadcrumbsProps } from './Breadcrumbs'
import { NavigationPillList, type NavigationPillListProps } from './NavigationPillList'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Navigation/Navigation',
}

export default meta

// ---------------------------------------------------------------------------
// Helper: Section label
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h5" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ===========================================================================
// AppBar Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 1. AppBarStandard -- standard 56px height with leading + trailing actions
// ---------------------------------------------------------------------------

export const AppBarStandard: StoryObj = {
  name: 'AppBar -- Standard',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Standard AppBar (56px)</SectionLabel>

      <AppBar
        title="Dashboard"
        leadingIcon={<ArrowBackIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
        trailingActions={[
          <SearchIcon key="search" size="md" color="#212121" />,
          <SettingsIcon key="settings" size="md" color="#212121" />,
        ]}
      />

      <SectionLabel>Standard -- Title Only</SectionLabel>

      <AppBar title="Home" />

      <SectionLabel>Standard -- With Subtitle</SectionLabel>

      <AppBar
        title="Project Details"
        subtitle="Community Development Block Grant"
        leadingIcon={<ArrowBackIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. AppBarProminent -- 112px height with large title at bottom
// ---------------------------------------------------------------------------

export const AppBarProminent: StoryObj = {
  name: 'AppBar -- Prominent',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Prominent AppBar (112px)</SectionLabel>

      <AppBar
        title="Community Development"
        subtitle="Block Grant Program FY2025"
        variant="prominent"
        leadingIcon={<ArrowBackIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
        trailingActions={[
          <EditIcon key="edit" size="md" color="#212121" />,
          <ShareIcon key="share" size="md" color="#212121" />,
        ]}
      />

      <SectionLabel>Prominent -- Title Only</SectionLabel>

      <AppBar
        title="Permits & Licenses"
        variant="prominent"
        leadingIcon={<MenuIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. AppBarDense -- 48px compact height
// ---------------------------------------------------------------------------

export const AppBarDense: StoryObj = {
  name: 'AppBar -- Dense',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Dense AppBar (48px)</SectionLabel>

      <AppBar
        title="Search Results"
        variant="dense"
        leadingIcon={<ArrowBackIcon size="sm" color="#212121" />}
        onLeadingPress={() => {}}
        trailingActions={[
          <CloseIcon key="close" size="sm" color="#212121" />,
        ]}
      />

      <SectionLabel>Dense -- Minimal</SectionLabel>

      <AppBar
        title="Filter"
        variant="dense"
        leadingIcon={<CloseIcon size="sm" color="#212121" />}
        onLeadingPress={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. AppBarTransparent -- no background, no border
// ---------------------------------------------------------------------------

export const AppBarTransparent: StoryObj = {
  name: 'AppBar -- Transparent',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Transparent AppBar</SectionLabel>

      <Box backgroundColor="#E8EAF6" borderRadius="$md" overflow="hidden">
        <AppBar
          title="Map View"
          transparent
          leadingIcon={<ArrowBackIcon size="md" color="white" />}
          onLeadingPress={() => {}}
          titleColor="white"
          trailingActions={[
            <SearchIcon key="search" size="md" color="white" />,
          ]}
        />
        <Box height={120} alignItems="center" justifyContent="center">
          <Text variant="body2" color="$colorSecondary">
            Map content beneath transparent bar
          </Text>
        </Box>
      </Box>

      <SectionLabel>Transparent Prominent</SectionLabel>

      <Box backgroundColor="#C5CAE9" borderRadius="$md" overflow="hidden">
        <AppBar
          title="Photo Gallery"
          variant="prominent"
          transparent
          leadingIcon={<ArrowBackIcon size="md" color="white" />}
          onLeadingPress={() => {}}
          titleColor="white"
        />
      </Box>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. AppBarWithActions -- up to 3 trailing actions
// ---------------------------------------------------------------------------

export const AppBarWithActions: StoryObj = {
  name: 'AppBar -- With Actions',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>1 Trailing Action</SectionLabel>
      <AppBar
        title="Inbox"
        leadingIcon={<MenuIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
        trailingActions={[
          <SearchIcon key="search" size="md" color="#212121" />,
        ]}
      />

      <SectionLabel>2 Trailing Actions</SectionLabel>
      <AppBar
        title="Documents"
        leadingIcon={<ArrowBackIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
        trailingActions={[
          <EditIcon key="edit" size="md" color="#212121" />,
          <ShareIcon key="share" size="md" color="#212121" />,
        ]}
      />

      <SectionLabel>3 Trailing Actions (Maximum)</SectionLabel>
      <AppBar
        title="Record Detail"
        leadingIcon={<ArrowBackIcon size="md" color="#212121" />}
        onLeadingPress={() => {}}
        elevated
        trailingActions={[
          <EditIcon key="edit" size="md" color="#212121" />,
          <ShareIcon key="share" size="md" color="#212121" />,
          <DeleteIcon key="delete" size="md" color="#CC2929" />,
        ]}
      />
    </VStack>
  ),
}

// ===========================================================================
// BottomTabBar Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 6. BottomTabBarDefault -- interactive 4-tab bar
// ---------------------------------------------------------------------------

function BottomTabBarInteractive() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <VStack gap="$4">
      <SectionLabel>Interactive Bottom Tab Bar</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Active tab: {activeTab}
      </Text>

      <BottomTabBar
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="md" color="#9E9E9E" />, activeIcon: <HomeIcon size="md" color="#4B3FFF" /> },
          { key: 'search', label: 'Search', icon: <SearchIcon size="md" color="#9E9E9E" />, activeIcon: <SearchIcon size="md" color="#4B3FFF" /> },
          { key: 'calendar', label: 'Calendar', icon: <CalendarIcon size="md" color="#9E9E9E" />, activeIcon: <CalendarIcon size="md" color="#4B3FFF" /> },
          { key: 'settings', label: 'Settings', icon: <SettingsIcon size="md" color="#9E9E9E" />, activeIcon: <SettingsIcon size="md" color="#4B3FFF" /> },
        ]}
        activeKey={activeTab}
        onSelect={setActiveTab}
      />
    </VStack>
  )
}

export const BottomTabBarDefault: StoryObj = {
  name: 'BottomTabBar -- Default',
  render: () => <BottomTabBarInteractive />,
}

// ---------------------------------------------------------------------------
// 7. BottomTabBarWithBadges -- dot and count badges
// ---------------------------------------------------------------------------

export const BottomTabBarWithBadges: StoryObj = {
  name: 'BottomTabBar -- With Badges',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Badges: Dot and Count</SectionLabel>

      <BottomTabBar
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="md" color="#9E9E9E" />, activeIcon: <HomeIcon size="md" color="#4B3FFF" /> },
          { key: 'search', label: 'Search', icon: <SearchIcon size="md" color="#9E9E9E" />, activeIcon: <SearchIcon size="md" color="#4B3FFF" />, badge: true },
          { key: 'calendar', label: 'Calendar', icon: <CalendarIcon size="md" color="#9E9E9E" />, activeIcon: <CalendarIcon size="md" color="#4B3FFF" />, badge: 7 },
          { key: 'settings', label: 'Settings', icon: <SettingsIcon size="md" color="#9E9E9E" />, activeIcon: <SettingsIcon size="md" color="#4B3FFF" />, badge: 120 },
        ]}
        activeKey="home"
        onSelect={() => {}}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 8. BottomTabBarElevated -- shadow instead of top border
// ---------------------------------------------------------------------------

export const BottomTabBarElevated: StoryObj = {
  name: 'BottomTabBar -- Elevated',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Elevated (Shadow, No Top Border)</SectionLabel>

      <BottomTabBar
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="md" color="#9E9E9E" />, activeIcon: <HomeIcon size="md" color="#4B3FFF" /> },
          { key: 'search', label: 'Search', icon: <SearchIcon size="md" color="#9E9E9E" />, activeIcon: <SearchIcon size="md" color="#4B3FFF" /> },
          { key: 'settings', label: 'Settings', icon: <SettingsIcon size="md" color="#9E9E9E" />, activeIcon: <SettingsIcon size="md" color="#4B3FFF" /> },
        ]}
        activeKey="home"
        onSelect={() => {}}
        elevated
      />
    </VStack>
  ),
}

// ===========================================================================
// FloatingBottomNav Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 9. FloatingBottomNavDefault -- interactive glassmorphism pill nav
// ---------------------------------------------------------------------------

function FloatingBottomNavInteractive() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <VStack gap="$4">
      <SectionLabel>Interactive Floating Bottom Nav</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Active tab: {activeTab}
      </Text>

      <FloatingBottomNav
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="md" color="#9E9E9E" />, activeIcon: <HomeIcon size="md" color="white" /> },
          { key: 'schedule', label: 'Schedule', icon: <CalendarIcon size="md" color="#9E9E9E" />, activeIcon: <CalendarIcon size="md" color="white" /> },
          { key: 'search', label: 'Search', icon: <SearchIcon size="md" color="#9E9E9E" />, activeIcon: <SearchIcon size="md" color="white" /> },
          { key: 'settings', label: 'Settings', icon: <SettingsIcon size="md" color="#9E9E9E" />, activeIcon: <SettingsIcon size="md" color="white" /> },
        ]}
        activeKey={activeTab}
        onSelect={setActiveTab}
      />
    </VStack>
  )
}

export const FloatingBottomNavDefault: StoryObj = {
  name: 'FloatingBottomNav -- Default',
  render: () => <FloatingBottomNavInteractive />,
}

// ---------------------------------------------------------------------------
// 10. FloatingBottomNavTablet -- tabletPortrait / tabletLandscape
// ---------------------------------------------------------------------------

export const FloatingBottomNavTablet: StoryObj = {
  name: 'FloatingBottomNav -- Tablet',
  render: () => {
    const navItems = [
      { key: 'home', label: 'Home', icon: <HomeIcon size="md" color="#9E9E9E" />, activeIcon: <HomeIcon size="md" color="white" /> },
      { key: 'schedule', label: 'Schedule', icon: <CalendarIcon size="md" color="#9E9E9E" />, activeIcon: <CalendarIcon size="md" color="white" /> },
      { key: 'search', label: 'Search', icon: <SearchIcon size="md" color="#9E9E9E" />, activeIcon: <SearchIcon size="md" color="white" /> },
      { key: 'settings', label: 'Settings', icon: <SettingsIcon size="md" color="#9E9E9E" />, activeIcon: <SettingsIcon size="md" color="white" /> },
    ]

    return (
      <VStack gap="$6">
        <SectionLabel>Tablet Portrait</SectionLabel>
        <FloatingBottomNav
          items={navItems}
          activeKey="home"
          onSelect={() => {}}
          device="tabletPortrait"
        />

        <SectionLabel>Tablet Landscape</SectionLabel>
        <FloatingBottomNav
          items={navItems}
          activeKey="schedule"
          onSelect={() => {}}
          device="tabletLandscape"
        />
      </VStack>
    )
  },
}

// ===========================================================================
// Breadcrumbs Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 11. BreadcrumbsDefault -- simple 3-level breadcrumb trail
// ---------------------------------------------------------------------------

export const BreadcrumbsDefault: StoryObj = {
  name: 'Breadcrumbs -- Default',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>2-Level Breadcrumbs</SectionLabel>
      <Breadcrumbs
        items={[
          { label: 'Home', onPress: () => {} },
          { label: 'Dashboard' },
        ]}
      />

      <SectionLabel>3-Level Breadcrumbs</SectionLabel>
      <Breadcrumbs
        items={[
          { label: 'Home', onPress: () => {} },
          { label: 'Projects', onPress: () => {} },
          { label: 'Community Grant FY2025' },
        ]}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 12. BreadcrumbsTruncated -- more than maxItems triggers ellipsis
// ---------------------------------------------------------------------------

export const BreadcrumbsTruncated: StoryObj = {
  name: 'Breadcrumbs -- Truncated',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>5 Items (maxItems=3 default)</SectionLabel>
      <Breadcrumbs
        items={[
          { label: 'Home', onPress: () => {} },
          { label: 'Department', onPress: () => {} },
          { label: 'Projects', onPress: () => {} },
          { label: 'FY2025', onPress: () => {} },
          { label: 'Grant Application' },
        ]}
      />

      <SectionLabel>6 Items (maxItems=2)</SectionLabel>
      <Breadcrumbs
        items={[
          { label: 'Root', onPress: () => {} },
          { label: 'Level 1', onPress: () => {} },
          { label: 'Level 2', onPress: () => {} },
          { label: 'Level 3', onPress: () => {} },
          { label: 'Level 4', onPress: () => {} },
          { label: 'Current Page' },
        ]}
        maxItems={2}
      />
    </VStack>
  ),
}

// ===========================================================================
// NavigationPillList Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 13. NavigationPillListDefault -- interactive horizontal pill list
// ---------------------------------------------------------------------------

function NavigationPillListInteractive() {
  const [activeKey, setActiveKey] = useState('all')

  return (
    <VStack gap="$4">
      <SectionLabel>Interactive Navigation Pill List</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Active pill: {activeKey}
      </Text>

      <NavigationPillList
        items={[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'pending', label: 'Pending' },
          { key: 'completed', label: 'Completed' },
          { key: 'archived', label: 'Archived' },
        ]}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <SectionLabel>With Icons</SectionLabel>

      <NavigationPillList
        items={[
          { key: 'home', label: 'Home', icon: <HomeIcon size="sm" color="#212121" /> },
          { key: 'search', label: 'Search', icon: <SearchIcon size="sm" color="#212121" /> },
          { key: 'calendar', label: 'Calendar', icon: <CalendarIcon size="sm" color="#212121" /> },
        ]}
        activeKey="home"
        onSelect={() => {}}
      />
    </VStack>
  )
}

export const NavigationPillListDefault: StoryObj = {
  name: 'NavigationPillList -- Default',
  render: () => <NavigationPillListInteractive />,
}
