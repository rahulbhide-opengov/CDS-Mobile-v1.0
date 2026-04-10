import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  CalendarIcon,
  CloseIcon,
} from '@opengov/cds-icons'
import { Drawer, type DrawerProps } from './Drawer'
import { Button } from '../Button'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
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
// Shared nav content for drawer stories
// ---------------------------------------------------------------------------

function DrawerNavContent({ onClose }: { onClose: () => void }) {
  const navItems = [
    { label: 'Home', icon: <HomeIcon size="md" color="#212121" /> },
    { label: 'Search', icon: <SearchIcon size="md" color="#212121" /> },
    { label: 'Calendar', icon: <CalendarIcon size="md" color="#212121" /> },
    { label: 'Settings', icon: <SettingsIcon size="md" color="#212121" /> },
  ]

  return (
    <VStack padding="$4" gap="$2" flex={1}>
      <HStack justifyContent="space-between" alignItems="center" marginBottom="$4">
        <Text variant="h4">Menu</Text>
        <Box onPress={onClose}>
          <CloseIcon size="md" color="#212121" />
        </Box>
      </HStack>

      {navItems.map((item) => (
        <Box
          key={item.label}
          padding="$3"
          borderRadius="$md"
          onPress={onClose}
        >
          <HStack gap="$3" alignItems="center">
            {item.icon}
            <Text variant="body1">{item.label}</Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// 1. LeftDrawer -- interactive left-anchored drawer
// ---------------------------------------------------------------------------

function LeftDrawerInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Left Drawer (Default)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Slides in from the left edge. Swipe left or tap backdrop to dismiss.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Open Left Drawer
      </Button>

      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        anchor="left"
        width="md"
      >
        <DrawerNavContent onClose={() => setVisible(false)} />
      </Drawer>
    </VStack>
  )
}

export const LeftDrawer: StoryObj = {
  name: 'Left Drawer',
  render: () => <LeftDrawerInteractive />,
}

// ---------------------------------------------------------------------------
// 2. RightDrawer -- right-anchored drawer
// ---------------------------------------------------------------------------

function RightDrawerInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Right Drawer</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Slides in from the right edge. Swipe right or tap backdrop to dismiss.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Open Right Drawer
      </Button>

      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        anchor="right"
        width="md"
      >
        <VStack padding="$4" gap="$3">
          <Text variant="h4">Filters</Text>
          <Text variant="body2" color="$colorSecondary">
            A right-anchored drawer is commonly used for filter panels,
            secondary actions, or settings trays.
          </Text>

          {['Status', 'Priority', 'Date Range', 'Assigned To'].map((filter) => (
            <Box
              key={filter}
              padding="$3"
              backgroundColor="$backgroundStrong"
              borderRadius="$md"
            >
              <Text variant="body2">{filter}</Text>
            </Box>
          ))}

          <Button
            variant="primary"
            fullWidth
            onPress={() => setVisible(false)}
          >
            Apply Filters
          </Button>
        </VStack>
      </Drawer>
    </VStack>
  )
}

export const RightDrawer: StoryObj = {
  name: 'Right Drawer',
  render: () => <RightDrawerInteractive />,
}

// ---------------------------------------------------------------------------
// 3. AllWidths -- sm (280px), md (320px), lg (360px) side by side
// ---------------------------------------------------------------------------

function AllWidthsInteractive() {
  const [activeWidth, setActiveWidth] = useState<'sm' | 'md' | 'lg' | null>(null)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>All Width Presets</SectionLabel>

      <HStack gap="$2" flexWrap="wrap">
        <Button variant="secondary" size="sm" onPress={() => setActiveWidth('sm')}>
          Small (280px)
        </Button>
        <Button variant="secondary" size="sm" onPress={() => setActiveWidth('md')}>
          Medium (320px)
        </Button>
        <Button variant="secondary" size="sm" onPress={() => setActiveWidth('lg')}>
          Large (360px)
        </Button>
      </HStack>

      {activeWidth != null && (
        <Drawer
          visible
          onClose={() => setActiveWidth(null)}
          anchor="left"
          width={activeWidth}
        >
          <VStack padding="$4" gap="$3">
            <Text variant="h4">Width: {activeWidth}</Text>
            <Text variant="body2" color="$colorSecondary">
              This drawer uses the "{activeWidth}" width preset
              ({activeWidth === 'sm' ? '280' : activeWidth === 'md' ? '320' : '360'}px).
            </Text>
            <Button variant="primary" onPress={() => setActiveWidth(null)}>
              Close
            </Button>
          </VStack>
        </Drawer>
      )}
    </VStack>
  )
}

export const AllWidths: StoryObj = {
  name: 'All Widths',
  render: () => <AllWidthsInteractive />,
}

// ---------------------------------------------------------------------------
// 4. WithNavContent -- full navigation menu drawer
// ---------------------------------------------------------------------------

function WithNavContentInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Drawer with Navigation Content</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A complete navigation menu inside a large drawer.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Open Navigation Drawer
      </Button>

      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        anchor="left"
        width="lg"
      >
        <VStack flex={1}>
          {/* Header */}
          <VStack
            padding="$4"
            paddingTop="$8"
            backgroundColor="$brandBackground"
            gap="$2"
          >
            <Box
              width={48}
              height={48}
              borderRadius={24}
              backgroundColor="rgba(255,255,255,0.2)"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontWeight="$bold" fontSize={18}>
                JD
              </Text>
            </Box>
            <Text color="white" fontWeight="$semibold" fontSize={16}>
              Jane Doe
            </Text>
            <Text color="rgba(255,255,255,0.7)" fontSize={13}>
              jane.doe@opengov.com
            </Text>
          </VStack>

          {/* Navigation links */}
          <VStack padding="$4" gap="$1" flex={1}>
            {[
              { label: 'Dashboard', icon: <HomeIcon size="md" color="#4B3FFF" /> },
              { label: 'Permits', icon: <CalendarIcon size="md" color="#212121" /> },
              { label: 'Inspections', icon: <SearchIcon size="md" color="#212121" /> },
              { label: 'Reports', icon: <CalendarIcon size="md" color="#212121" /> },
              { label: 'Settings', icon: <SettingsIcon size="md" color="#212121" /> },
            ].map((item, index) => (
              <Box
                key={item.label}
                padding="$3"
                borderRadius="$md"
                backgroundColor={index === 0 ? '$brandBackground' : 'transparent'}
                opacity={index === 0 ? 0.1 : 1}
              >
                <HStack gap="$3" alignItems="center">
                  {item.icon}
                  <Text
                    variant="body1"
                    color={index === 0 ? '$brandBackground' : '$color'}
                    fontWeight={index === 0 ? '$semibold' : '$regular'}
                  >
                    {item.label}
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Drawer>
    </VStack>
  )
}

export const WithNavContent: StoryObj = {
  name: 'With Navigation Content',
  render: () => <WithNavContentInteractive />,
}
