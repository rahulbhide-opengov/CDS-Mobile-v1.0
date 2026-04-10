import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Switch, type SwitchProps } from './Switch'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Switch> = {
  title: 'Form Controls/Switch',
  component: Switch,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h4" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// 1. Default -- interactive
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Interactive Switch</SectionLabel>
        <Switch
          checked={checked}
          onChange={setChecked}
          label="Enable feature"
        />
        <Text variant="caption" color="$colorSecondary">
          State: {checked ? 'On' : 'Off'}
        </Text>
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 2. AllSizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      {(['sm', 'md'] as const).map((size) => (
        <VStack key={size} gap="$2">
          <Text variant="body3" color="$colorSecondary">
            Size: {size}
          </Text>
          <HStack gap="$4" alignItems="center">
            <Switch size={size} checked={false} label="Off" />
            <Switch size={size} checked label="On" />
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. WithLabel
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Labeled Switches</SectionLabel>
      <Switch checked={false} label="Dark mode" />
      <Switch checked label="Notifications" />
      <Switch checked={false} label="Auto-save" />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Disabled States</SectionLabel>
      <Switch checked={false} disabled label="Disabled off" />
      <Switch checked disabled label="Disabled on" />

      <SectionLabel>Enabled vs Disabled</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Switch checked={false} label="Enabled" />
        <Switch checked={false} disabled label="Disabled" />
      </HStack>
      <HStack gap="$4" alignItems="center">
        <Switch checked label="Enabled" />
        <Switch checked disabled label="Disabled" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. SwitchList -- settings-style list
// ---------------------------------------------------------------------------

export const SwitchList: Story = {
  name: 'Switch List',
  render: () => {
    const [settings, setSettings] = useState({
      wifi: true,
      bluetooth: false,
      airplane: false,
      location: true,
      notifications: true,
      darkMode: false,
    })

    const toggle = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: checked }))
    }

    const items: { key: keyof typeof settings; label: string }[] = [
      { key: 'wifi', label: 'Wi-Fi' },
      { key: 'bluetooth', label: 'Bluetooth' },
      { key: 'airplane', label: 'Airplane Mode' },
      { key: 'location', label: 'Location Services' },
      { key: 'notifications', label: 'Notifications' },
      { key: 'darkMode', label: 'Dark Mode' },
    ]

    return (
      <VStack padding="$4" gap="$2" width={320}>
        <SectionLabel>Settings</SectionLabel>

        {items.map((item) => (
          <HStack
            key={item.key}
            justifyContent="space-between"
            alignItems="center"
            paddingVertical="$3"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <Text variant="body2">{item.label}</Text>
            <Switch
              checked={settings[item.key]}
              onChange={toggle(item.key)}
            />
          </HStack>
        ))}
      </VStack>
    )
  },
}
