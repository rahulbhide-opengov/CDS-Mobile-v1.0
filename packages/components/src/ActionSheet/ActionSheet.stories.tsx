import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import {
  EditIcon,
  DeleteIcon,
  ShareIcon,
  SearchIcon,
  AddIcon,
} from '@opengov/cds-icons'
import { ActionSheet, type ActionSheetProps, type ActionSheetOption } from './ActionSheet'
import { Button } from '../Button'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof ActionSheet> = {
  title: 'Overlays/ActionSheet',
  component: ActionSheet,
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
// 1. Default -- basic action sheet with 3 options
// ---------------------------------------------------------------------------

function DefaultInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Default Action Sheet</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        iOS-style action list with a separate Cancel button.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Action Sheet
      </Button>

      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        options={[
          { label: 'View Details', onPress: () => {} },
          { label: 'Edit Record', onPress: () => {} },
          { label: 'Share Link', onPress: () => {} },
        ]}
      />
    </VStack>
  )
}

export const Default: StoryObj = {
  name: 'Default',
  render: () => <DefaultInteractive />,
}

// ---------------------------------------------------------------------------
// 2. WithDestructive -- includes a destructive (red) option
// ---------------------------------------------------------------------------

function WithDestructiveInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>With Destructive Option</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The "Delete" option renders in red to signal danger.
      </Text>

      <Button variant="secondary" onPress={() => setVisible(true)}>
        Show Actions
      </Button>

      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        options={[
          { label: 'Edit', onPress: () => {} },
          { label: 'Duplicate', onPress: () => {} },
          { label: 'Archive', onPress: () => {} },
          { label: 'Delete', onPress: () => {}, destructive: true },
        ]}
      />
    </VStack>
  )
}

export const WithDestructive: StoryObj = {
  name: 'With Destructive',
  render: () => <WithDestructiveInteractive />,
}

// ---------------------------------------------------------------------------
// 3. WithIcons -- options with leading icon elements
// ---------------------------------------------------------------------------

function WithIconsInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>With Icons</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Each option includes a leading icon for visual context.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Actions
      </Button>

      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        options={[
          { label: 'Edit', onPress: () => {}, icon: <EditIcon size="md" color="#4B3FFF" /> },
          { label: 'Share', onPress: () => {}, icon: <ShareIcon size="md" color="#4B3FFF" /> },
          { label: 'Search', onPress: () => {}, icon: <SearchIcon size="md" color="#4B3FFF" /> },
          { label: 'Add to Collection', onPress: () => {}, icon: <AddIcon size="md" color="#4B3FFF" /> },
          { label: 'Delete', onPress: () => {}, destructive: true, icon: <DeleteIcon size="md" color="#CC2929" /> },
        ]}
      />
    </VStack>
  )
}

export const WithIcons: StoryObj = {
  name: 'With Icons',
  render: () => <WithIconsInteractive />,
}

// ---------------------------------------------------------------------------
// 4. WithTitleAndMessage -- header with title + descriptive message
// ---------------------------------------------------------------------------

function WithTitleAndMessageInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>With Title and Message</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A header section provides context for the available actions.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Actions
      </Button>

      <ActionSheet
        visible={visible}
        onClose={() => setVisible(false)}
        title="Permit #2025-0042"
        message="Choose an action for this building permit application."
        options={[
          { label: 'Approve', onPress: () => {} },
          { label: 'Request Revision', onPress: () => {} },
          { label: 'Assign Reviewer', onPress: () => {} },
          { label: 'Reject', onPress: () => {}, destructive: true },
        ]}
        cancelLabel="Dismiss"
      />
    </VStack>
  )
}

export const WithTitleAndMessage: StoryObj = {
  name: 'With Title and Message',
  render: () => <WithTitleAndMessageInteractive />,
}
