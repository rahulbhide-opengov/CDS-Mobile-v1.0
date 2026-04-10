import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { SpeedDial, type SpeedDialProps, type SpeedDialAction } from './SpeedDial'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SpeedDial> = {
  title: 'Advanced/SpeedDial',
  component: SpeedDial,
  argTypes: {
    position: {
      control: 'select',
      options: ['bottomRight', 'bottomLeft'],
    },
  },
}

export default meta
type Story = StoryObj<typeof SpeedDial>

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

function PlusIcon({ color = 'white', size = 24 }: { color?: string; size?: number }) {
  return (
    <Box width={size} height={size} alignItems="center" justifyContent="center">
      <Box width={size * 0.6} height={2} backgroundColor={color} borderRadius={1} position="absolute" />
      <Box width={2} height={size * 0.6} backgroundColor={color} borderRadius={1} position="absolute" />
    </Box>
  )
}

function MiniIcon({ char, color = '#212121' }: { char: string; color?: string }) {
  return (
    <Box width={20} height={20} alignItems="center" justifyContent="center">
      <Text variant="caption" color={color} fontWeight="$bold" fontSize={14}>
        {char}
      </Text>
    </Box>
  )
}

/** Full-screen-ish container for speed dial demos */
function SpeedDialContainer({ children, height = 400 }: { children: React.ReactNode; height?: number }) {
  return (
    <Box
      height={height}
      backgroundColor="#FAFAFA"
      borderRadius={8}
      borderWidth={1}
      borderColor="#EEEEEE"
      position="relative"
      overflow="hidden"
    >
      {children}
    </Box>
  )
}

// ---------------------------------------------------------------------------
// Shared actions
// ---------------------------------------------------------------------------

function buildActions(onAction: (label: string) => void): SpeedDialAction[] {
  return [
    {
      key: 'new-record',
      icon: <MiniIcon char="+" />,
      label: 'New Record',
      onPress: () => onAction('New Record'),
    },
    {
      key: 'upload',
      icon: <MiniIcon char="U" />,
      label: 'Upload File',
      onPress: () => onAction('Upload File'),
    },
    {
      key: 'scan',
      icon: <MiniIcon char="S" />,
      label: 'Scan Document',
      onPress: () => onAction('Scan Document'),
    },
    {
      key: 'note',
      icon: <MiniIcon char="N" />,
      label: 'Quick Note',
      onPress: () => onAction('Quick Note'),
    },
  ]
}

// ---------------------------------------------------------------------------
// 1. Default -- interactive with open toggle
// ---------------------------------------------------------------------------

function DefaultDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [lastAction, setLastAction] = useState('')

  const actions = buildActions((label) => {
    setLastAction(label)
    setIsOpen(false)
  })

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Speed Dial (controlled)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap the FAB to expand actions. Tap an action or the backdrop to close.
      </Text>

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Action fired: {lastAction}
          </Text>
        </Box>
      )}

      <Box padding="$2" borderRadius={4} backgroundColor="#F5F5F5">
        <Text variant="caption" color="$colorSecondary">
          Open state: {isOpen ? 'open' : 'closed'}
        </Text>
      </Box>

      <SpeedDialContainer>
        <SpeedDial
          icon={<PlusIcon />}
          actions={actions}
          open={isOpen}
          onToggle={setIsOpen}
          position="bottomRight"
        />
      </SpeedDialContainer>
    </VStack>
  )
}

export const Default: Story = {
  name: 'Default',
  render: () => <DefaultDemo />,
}

// ---------------------------------------------------------------------------
// 2. WithCustomColors
// ---------------------------------------------------------------------------

function CustomColorsDemo() {
  const [lastAction, setLastAction] = useState('')

  const coloredActions: SpeedDialAction[] = [
    {
      key: 'approve',
      icon: <MiniIcon char="A" color="white" />,
      label: 'Approve',
      onPress: () => setLastAction('Approve'),
      color: '#4CAF50',
    },
    {
      key: 'reject',
      icon: <MiniIcon char="R" color="white" />,
      label: 'Reject',
      onPress: () => setLastAction('Reject'),
      color: '#FF3333',
    },
    {
      key: 'flag',
      icon: <MiniIcon char="F" color="white" />,
      label: 'Flag for Review',
      onPress: () => setLastAction('Flag for Review'),
      color: '#FFA000',
    },
    {
      key: 'assign',
      icon: <MiniIcon char="@" color="white" />,
      label: 'Assign',
      onPress: () => setLastAction('Assign'),
      color: '#1E55FF',
    },
  ]

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Custom Colored Actions</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Each action mini-FAB has a distinct color for quick identification.
      </Text>

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Action fired: {lastAction}
          </Text>
        </Box>
      )}

      <SpeedDialContainer height={450}>
        <SpeedDial
          icon={<PlusIcon />}
          actions={coloredActions}
          position="bottomRight"
        />
      </SpeedDialContainer>
    </VStack>
  )
}

export const WithCustomColors: Story = {
  name: 'With Custom Colors',
  render: () => <CustomColorsDemo />,
}

// ---------------------------------------------------------------------------
// 3. BottomLeft
// ---------------------------------------------------------------------------

function BottomLeftDemo() {
  const [lastAction, setLastAction] = useState('')

  const actions: SpeedDialAction[] = [
    {
      key: 'camera',
      icon: <MiniIcon char="C" />,
      label: 'Camera',
      onPress: () => setLastAction('Camera'),
    },
    {
      key: 'gallery',
      icon: <MiniIcon char="G" />,
      label: 'Gallery',
      onPress: () => setLastAction('Gallery'),
    },
    {
      key: 'file',
      icon: <MiniIcon char="F" />,
      label: 'File',
      onPress: () => setLastAction('File'),
    },
  ]

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Bottom Left Position</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Speed dial positioned in the bottom-left corner. Labels appear to the right of actions.
      </Text>

      {lastAction !== '' && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Action fired: {lastAction}
          </Text>
        </Box>
      )}

      <SpeedDialContainer height={350}>
        <SpeedDial
          icon={<PlusIcon />}
          actions={actions}
          position="bottomLeft"
        />
      </SpeedDialContainer>
    </VStack>
  )
}

export const BottomLeft: Story = {
  name: 'Bottom Left',
  render: () => <BottomLeftDemo />,
}
