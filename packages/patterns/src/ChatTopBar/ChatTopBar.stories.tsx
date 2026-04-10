import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { ChatTopBar, type ChatTopBarProps } from './ChatTopBar'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof ChatTopBar> = {
  title: 'Patterns/ChatTopBar',
  component: ChatTopBar,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    online: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ChatTopBar>

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

function PlaceholderAvatar({ label = 'AI' }: { label?: string }) {
  return (
    <Box
      width={36}
      height={36}
      borderRadius={18}
      backgroundColor="#4B3FFF"
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="caption" color="white" fontWeight="$bold" fontSize={12}>
        {label}
      </Text>
    </Box>
  )
}

function IconPlaceholder({ char }: { char: string }) {
  return (
    <Box
      width={32}
      height={32}
      borderRadius={16}
      backgroundColor="#F5F5F5"
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="caption" color="#616161" fontSize={14}>
        {char}
      </Text>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// 1. Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Default',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Default Top Bar</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        onBack={() => {}}
        avatar={<PlaceholderAvatar />}
      />

      <SectionLabel>Without Back Button</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        avatar={<PlaceholderAvatar />}
      />

      <SectionLabel>Title Only</SectionLabel>
      <ChatTopBar title="OG Assist" />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. WithOnlineStatus
// ---------------------------------------------------------------------------

function OnlineStatusDemo() {
  const [online, setOnline] = useState(true)

  return (
    <VStack gap="$6">
      <SectionLabel>Online Status (tap to toggle)</SectionLabel>

      <ChatTopBar
        title="OG Assist"
        avatar={<PlaceholderAvatar />}
        online={online}
        onBack={() => {}}
      />

      <HStack gap="$3" padding="$4">
        <Box
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderRadius={8}
          backgroundColor={online ? '#E8F5E9' : '#F5F5F5'}
          onPress={() => setOnline(true)}
        >
          <Text variant="body3" color={online ? '#388E3C' : '#9E9E9E'}>
            Set Online
          </Text>
        </Box>
        <Box
          paddingHorizontal="$4"
          paddingVertical="$2"
          borderRadius={8}
          backgroundColor={!online ? '#FFF0F3' : '#F5F5F5'}
          onPress={() => setOnline(false)}
        >
          <Text variant="body3" color={!online ? '#E91E63' : '#9E9E9E'}>
            Set Offline
          </Text>
        </Box>
      </HStack>
    </VStack>
  )
}

export const WithOnlineStatus: Story = {
  name: 'With Online Status',
  render: () => <OnlineStatusDemo />,
}

// ---------------------------------------------------------------------------
// 3. WithTrailingActions
// ---------------------------------------------------------------------------

export const WithTrailingActions: Story = {
  name: 'With Trailing Actions',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Single Trailing Action</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        avatar={<PlaceholderAvatar />}
        online
        onBack={() => {}}
        trailingActions={[
          <IconPlaceholder key="more" char="..." />,
        ]}
      />

      <SectionLabel>Two Trailing Actions</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        subtitle="Last seen 2 min ago"
        avatar={<PlaceholderAvatar />}
        onBack={() => {}}
        trailingActions={[
          <IconPlaceholder key="search" char="S" />,
          <IconPlaceholder key="more" char="..." />,
        ]}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. OfflineStatus
// ---------------------------------------------------------------------------

export const OfflineStatus: Story = {
  name: 'Offline Status',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Offline with Avatar</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        avatar={<PlaceholderAvatar />}
        online={false}
        onBack={() => {}}
      />

      <SectionLabel>Offline without Avatar (inline dot)</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        online={false}
        onBack={() => {}}
      />

      <SectionLabel>Custom Subtitle Override</SectionLabel>
      <ChatTopBar
        title="OG Assist"
        subtitle="Away -- back at 3:00 PM"
        avatar={<PlaceholderAvatar />}
        online={false}
        onBack={() => {}}
      />
    </VStack>
  ),
}
