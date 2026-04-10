import React, { useState } from 'react'
import { FlatList } from 'react-native'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { SwipeableRow, type SwipeableRowProps, type SwipeableRowAction } from './SwipeableRow'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SwipeableRow> = {
  title: 'Advanced/SwipeableRow',
  component: SwipeableRow,
  argTypes: {
    threshold: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof SwipeableRow>

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

/** Simple row content used across stories */
function RowContent({
  title,
  subtitle,
  trailing,
}: {
  title: string
  subtitle?: string
  trailing?: string
}) {
  return (
    <HStack
      paddingHorizontal="$4"
      paddingVertical="$3"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="white"
      borderBottomWidth={1}
      borderBottomColor="#EEEEEE"
    >
      <VStack gap="$0.5" flex={1}>
        <Text variant="body2" numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color="#9E9E9E" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </VStack>
      {trailing && (
        <Text variant="caption" color="#9E9E9E">
          {trailing}
        </Text>
      )}
    </HStack>
  )
}

/** Small icon placeholder for action buttons */
function ActionIcon({ char }: { char: string }) {
  return (
    <Box width={20} height={20} alignItems="center" justifyContent="center">
      <Text variant="caption" color="white" fontWeight="$bold" fontSize={14}>
        {char}
      </Text>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// 1. LeftActions
// ---------------------------------------------------------------------------

function LeftActionsDemo() {
  const [lastAction, setLastAction] = useState('')

  const leftActions: SwipeableRowAction[] = [
    {
      key: 'archive',
      label: 'Archive',
      icon: <ActionIcon char="A" />,
      color: '#4CAF50',
      onPress: () => setLastAction('Archive'),
    },
    {
      key: 'pin',
      label: 'Pin',
      icon: <ActionIcon char="P" />,
      color: '#1E55FF',
      onPress: () => setLastAction('Pin'),
    },
  ]

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Left Actions (Swipe Right)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Swipe the row to the right to reveal Archive and Pin actions.
      </Text>

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Action fired: {lastAction}
          </Text>
        </Box>
      )}

      <SwipeableRow leftActions={leftActions}>
        <RowContent
          title="Budget Report Q4 2025"
          subtitle="Finance Department"
          trailing="2 days ago"
        />
      </SwipeableRow>
    </VStack>
  )
}

export const LeftActions: Story = {
  name: 'Left Actions',
  render: () => <LeftActionsDemo />,
}

// ---------------------------------------------------------------------------
// 2. RightActions
// ---------------------------------------------------------------------------

function RightActionsDemo() {
  const [lastAction, setLastAction] = useState('')

  const rightActions: SwipeableRowAction[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <ActionIcon char="E" />,
      color: '#FFA000',
      onPress: () => setLastAction('Edit'),
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <ActionIcon char="D" />,
      color: '#FF3333',
      onPress: () => setLastAction('Delete'),
    },
  ]

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Right Actions (Swipe Left)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Swipe the row to the left to reveal Edit and Delete actions.
      </Text>

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Action fired: {lastAction}
          </Text>
        </Box>
      )}

      <SwipeableRow rightActions={rightActions}>
        <RowContent
          title="Permit Application #2026-0412"
          subtitle="142 Oak St -- New Construction"
          trailing="Pending"
        />
      </SwipeableRow>
    </VStack>
  )
}

export const RightActions: Story = {
  name: 'Right Actions',
  render: () => <RightActionsDemo />,
}

// ---------------------------------------------------------------------------
// 3. BothSides
// ---------------------------------------------------------------------------

function BothSidesDemo() {
  const [lastAction, setLastAction] = useState('')

  const leftActions: SwipeableRowAction[] = [
    {
      key: 'archive',
      label: 'Archive',
      icon: <ActionIcon char="A" />,
      color: '#4CAF50',
      onPress: () => setLastAction('Archive'),
    },
  ]

  const rightActions: SwipeableRowAction[] = [
    {
      key: 'flag',
      label: 'Flag',
      icon: <ActionIcon char="F" />,
      color: '#FFA000',
      onPress: () => setLastAction('Flag'),
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <ActionIcon char="D" />,
      color: '#FF3333',
      onPress: () => setLastAction('Delete'),
    },
  ]

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Both Sides</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Swipe right for Archive. Swipe left for Flag and Delete.
      </Text>

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Action fired: {lastAction}
          </Text>
        </Box>
      )}

      <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
        <RowContent
          title="Cedar Grove Park Renovation"
          subtitle="Parks & Recreation"
          trailing="Active"
        />
      </SwipeableRow>

      <SectionLabel>Multiple Rows</SectionLabel>
      <VStack>
        <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
          <RowContent
            title="Downtown Fiber Infrastructure"
            subtitle="Information Technology"
            trailing="$3.4M"
          />
        </SwipeableRow>
        <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
          <RowContent
            title="Library HVAC Replacement"
            subtitle="Facilities"
            trailing="$425K"
          />
        </SwipeableRow>
        <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
          <RowContent
            title="Waterfront Trail Phase 2"
            subtitle="Parks & Recreation"
            trailing="$1.7M"
          />
        </SwipeableRow>
      </VStack>
    </VStack>
  )
}

export const BothSides: Story = {
  name: 'Both Sides',
  render: () => <BothSidesDemo />,
}

// ---------------------------------------------------------------------------
// 4. InList -- FlatList with swipeable rows
// ---------------------------------------------------------------------------

interface InboxItem {
  id: string
  title: string
  subtitle: string
  time: string
  unread: boolean
}

const INBOX_DATA: InboxItem[] = [
  { id: '1', title: 'Budget Approval Required', subtitle: 'Finance Dept -- FY26 Q3 review needs your sign-off', time: '9:14 AM', unread: true },
  { id: '2', title: 'Permit #2026-0891 Submitted', subtitle: '310 Elm Dr -- Residential renovation application', time: '8:45 AM', unread: true },
  { id: '3', title: 'Weekly Status Report', subtitle: 'Public Works -- Road maintenance progress update', time: 'Yesterday', unread: false },
  { id: '4', title: 'Meeting Rescheduled', subtitle: 'Planning Commission -- Moved to Thursday 2:00 PM', time: 'Yesterday', unread: false },
  { id: '5', title: 'New Comment on Case #4412', subtitle: 'Inspector noted foundation concerns at 88 Pine Ave', time: 'Apr 8', unread: false },
  { id: '6', title: 'Quarterly Revenue Analysis', subtitle: 'Tax collections exceeded projections by 4.2%', time: 'Apr 7', unread: false },
  { id: '7', title: 'Training: Accessibility Standards', subtitle: 'Mandatory WCAG 2.1 compliance training -- due Apr 30', time: 'Apr 5', unread: false },
  { id: '8', title: 'IT System Maintenance', subtitle: 'Scheduled downtime Saturday 11 PM -- Sunday 3 AM', time: 'Apr 4', unread: false },
]

function InListDemo() {
  const [items, setItems] = useState(INBOX_DATA)
  const [lastAction, setLastAction] = useState('')

  const renderItem = ({ item }: { item: InboxItem }) => {
    const leftActions: SwipeableRowAction[] = [
      {
        key: 'archive',
        label: 'Archive',
        icon: <ActionIcon char="A" />,
        color: '#4CAF50',
        onPress: () => {
          setLastAction(`Archived: ${item.title}`)
          setItems((prev) => prev.filter((i) => i.id !== item.id))
        },
      },
    ]

    const rightActions: SwipeableRowAction[] = [
      {
        key: 'flag',
        label: 'Flag',
        icon: <ActionIcon char="F" />,
        color: '#FFA000',
        onPress: () => setLastAction(`Flagged: ${item.title}`),
      },
      {
        key: 'delete',
        label: 'Delete',
        icon: <ActionIcon char="D" />,
        color: '#FF3333',
        onPress: () => {
          setLastAction(`Deleted: ${item.title}`)
          setItems((prev) => prev.filter((i) => i.id !== item.id))
        },
      },
    ]

    return (
      <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
        <HStack
          paddingHorizontal="$4"
          paddingVertical="$3"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="white"
          borderBottomWidth={1}
          borderBottomColor="#EEEEEE"
        >
          {/* Unread indicator */}
          {item.unread && (
            <Box
              width={8}
              height={8}
              borderRadius={4}
              backgroundColor="#4B3FFF"
              marginRight="$2"
              flexShrink={0}
            />
          )}
          {!item.unread && <Box width={8} marginRight="$2" />}

          <VStack gap="$0.5" flex={1} minWidth={0}>
            <Text
              variant="body2"
              fontWeight={item.unread ? '$semibold' : '$regular'}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text variant="caption" color="#9E9E9E" numberOfLines={1}>
              {item.subtitle}
            </Text>
          </VStack>

          <Text variant="caption" color="#BDBDBD" marginLeft="$2" flexShrink={0}>
            {item.time}
          </Text>
        </HStack>
      </SwipeableRow>
    )
  }

  return (
    <VStack gap="$4">
      <VStack padding="$4">
        <SectionLabel>Inbox List with Swipeable Rows</SectionLabel>
        <Text variant="body3" color="$colorSecondary">
          Swipe right to archive. Swipe left for flag and delete. Items are removed from the list on archive or delete.
        </Text>

        {lastAction !== '' && (
          <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9" marginTop="$2">
            <Text variant="body3" color="#388E3C">
              {lastAction}
            </Text>
          </Box>
        )}

        <Text variant="caption" color="$colorSecondary" marginTop="$2">
          {items.length} items
        </Text>
      </VStack>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        scrollEnabled={false}
      />

      {items.length === 0 && (
        <Box padding="$6" alignItems="center">
          <Text variant="body3" color="#9E9E9E">
            Inbox is empty.
          </Text>
          <Box
            marginTop="$3"
            paddingHorizontal="$4"
            paddingVertical="$2"
            borderRadius={8}
            backgroundColor="#EBF0FF"
            onPress={() => setItems(INBOX_DATA)}
          >
            <Text variant="body3" color="#1E55FF" fontWeight="$semibold">
              Reset Inbox
            </Text>
          </Box>
        </Box>
      )}
    </VStack>
  )
}

export const InList: Story = {
  name: 'In List (FlatList)',
  render: () => <InListDemo />,
}
