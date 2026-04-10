import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { Snackbar, type SnackbarProps } from './Snackbar'
import { Button } from '../Button'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
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
// 1. Default -- interactive snackbar with toggle
// ---------------------------------------------------------------------------

function DefaultInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Default Snackbar</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Shows a dark notification toast at the bottom. Auto-dismisses after 4
        seconds or swipe to dismiss.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Snackbar
      </Button>

      <Snackbar
        visible={visible}
        message="Record saved successfully."
        onDismiss={() => setVisible(false)}
      />
    </VStack>
  )
}

export const Default: StoryObj = {
  name: 'Default',
  render: () => <DefaultInteractive />,
}

// ---------------------------------------------------------------------------
// 2. AllVariants -- success, error, warning, info variants displayed together
// ---------------------------------------------------------------------------

function AllVariantsInteractive() {
  const [activeVariant, setActiveVariant] = useState<
    'default' | 'success' | 'error' | 'warning' | 'info' | null
  >(null)

  const variants = ['default', 'success', 'error', 'warning', 'info'] as const
  const messages: Record<string, string> = {
    default: 'This is a default notification.',
    success: 'Application submitted successfully.',
    error: 'Failed to save changes. Please try again.',
    warning: 'Your session will expire in 5 minutes.',
    info: 'A new version of the app is available.',
  }

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>All Variants</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap a variant button to preview it.
      </Text>

      <HStack gap="$2" flexWrap="wrap">
        {variants.map((v) => (
          <Button
            key={v}
            variant="secondary"
            size="sm"
            onPress={() => setActiveVariant(v)}
          >
            {v}
          </Button>
        ))}
      </HStack>

      {activeVariant != null && (
        <Snackbar
          visible
          message={messages[activeVariant]}
          variant={activeVariant}
          onDismiss={() => setActiveVariant(null)}
          duration={3000}
        />
      )}
    </VStack>
  )
}

export const AllVariants: StoryObj = {
  name: 'All Variants',
  render: () => <AllVariantsInteractive />,
}

// ---------------------------------------------------------------------------
// 3. WithAction -- snackbar with a trailing action button
// ---------------------------------------------------------------------------

function WithActionInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Snackbar with Action</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Includes an underlined action button at the trailing edge.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Delete Item
      </Button>

      <Snackbar
        visible={visible}
        message="Item deleted."
        variant="default"
        onDismiss={() => setVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {},
        }}
      />
    </VStack>
  )
}

export const WithAction: StoryObj = {
  name: 'With Action',
  render: () => <WithActionInteractive />,
}

// ---------------------------------------------------------------------------
// 4. TopPosition -- snackbar sliding from the top edge
// ---------------------------------------------------------------------------

function TopPositionInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Top Position</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The snackbar slides in from the top of the screen instead of the
        bottom. Swipe up to dismiss.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Top Snackbar
      </Button>

      <Snackbar
        visible={visible}
        message="New inspection assigned to you."
        variant="info"
        position="top"
        onDismiss={() => setVisible(false)}
      />
    </VStack>
  )
}

export const TopPosition: StoryObj = {
  name: 'Top Position',
  render: () => <TopPositionInteractive />,
}

// ---------------------------------------------------------------------------
// 5. AutoDismiss -- different duration timings
// ---------------------------------------------------------------------------

function AutoDismissInteractive() {
  const [visible2s, setVisible2s] = useState(false)
  const [visible8s, setVisible8s] = useState(false)
  const [visiblePersist, setVisiblePersist] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Auto-Dismiss Durations</SectionLabel>

      <HStack gap="$2" flexWrap="wrap">
        <Button variant="secondary" size="sm" onPress={() => setVisible2s(true)}>
          2 seconds
        </Button>
        <Button variant="secondary" size="sm" onPress={() => setVisible8s(true)}>
          8 seconds
        </Button>
        <Button variant="secondary" size="sm" onPress={() => setVisiblePersist(true)}>
          Persistent (0)
        </Button>
      </HStack>

      <Text variant="caption" color="$colorSecondary">
        Persistent snackbar (duration=0) stays until manually dismissed or
        swiped away.
      </Text>

      <Snackbar
        visible={visible2s}
        message="Quick notification (2s)."
        variant="success"
        duration={2000}
        onDismiss={() => setVisible2s(false)}
      />

      <Snackbar
        visible={visible8s}
        message="Extended notification (8s). More time to read."
        variant="warning"
        duration={8000}
        onDismiss={() => setVisible8s(false)}
      />

      <Snackbar
        visible={visiblePersist}
        message="Persistent notification. Swipe to dismiss."
        variant="error"
        duration={0}
        onDismiss={() => setVisiblePersist(false)}
        action={{
          label: 'Dismiss',
          onPress: () => {},
        }}
      />
    </VStack>
  )
}

export const AutoDismiss: StoryObj = {
  name: 'Auto Dismiss',
  render: () => <AutoDismissInteractive />,
}
