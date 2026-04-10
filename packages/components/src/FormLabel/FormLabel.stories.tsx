import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { FormLabel, type FormLabelProps } from './FormLabel'
import { FormControlLabel, type FormControlLabelProps } from './FormControlLabel'
import { Checkbox } from '../Checkbox/Checkbox'
import { Radio } from '../Radio/Radio'
import { Switch } from '../Switch/Switch'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof FormLabel> = {
  title: 'Form Controls/FormLabel',
  component: FormLabel,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FormLabel>

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
// 1. Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    label: 'Email Address',
    size: 'md',
    required: false,
    error: false,
    disabled: false,
  },
}

// ---------------------------------------------------------------------------
// 2. Required
// ---------------------------------------------------------------------------

export const Required: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Required Labels</SectionLabel>
      <FormLabel label="Full Name" required />
      <FormLabel label="Email Address" required />
      <FormLabel label="Password" required />

      <SectionLabel>Required vs Optional</SectionLabel>
      <HStack gap="$4">
        <FormLabel label="Required" required />
        <FormLabel label="Optional" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. Error
// ---------------------------------------------------------------------------

export const Error: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Error Labels</SectionLabel>
      <FormLabel label="Email Address" error />
      <FormLabel label="Password" error required />

      <SectionLabel>Normal vs Error</SectionLabel>
      <HStack gap="$4">
        <FormLabel label="Normal" />
        <FormLabel label="Error" error />
      </HStack>

      <SectionLabel>All Sizes in Error</SectionLabel>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <HStack key={size} gap="$3" alignItems="center">
          <FormLabel label={`Error ${size}`} size={size} error required />
        </HStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithCheckbox
// ---------------------------------------------------------------------------

export const WithCheckbox: Story = {
  name: 'With Checkbox',
  render: () => {
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>FormControlLabel with Checkbox</SectionLabel>
        <FormControlLabel
          label="Accept terms and conditions"
          control={
            <Checkbox
              checked={checked1}
              onChange={setChecked1}
            />
          }
        />
        <FormControlLabel
          label="Subscribe to newsletter"
          control={
            <Checkbox
              checked={checked2}
              onChange={setChecked2}
            />
          }
        />
        <FormControlLabel
          label="Disabled option"
          disabled
          control={
            <Checkbox checked={false} onChange={() => {}} />
          }
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 5. WithRadio
// ---------------------------------------------------------------------------

export const WithRadio: Story = {
  name: 'With Radio',
  render: () => {
    const [selected, setSelected] = useState('option1')
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>FormControlLabel with Radio</SectionLabel>
        <FormControlLabel
          label="Option One"
          control={
            <Radio
              selected={selected === 'option1'}
              onSelect={() => setSelected('option1')}
            />
          }
        />
        <FormControlLabel
          label="Option Two"
          control={
            <Radio
              selected={selected === 'option2'}
              onSelect={() => setSelected('option2')}
            />
          }
        />
        <FormControlLabel
          label="Option Three"
          control={
            <Radio
              selected={selected === 'option3'}
              onSelect={() => setSelected('option3')}
            />
          }
        />
        <FormControlLabel
          label="Disabled option"
          disabled
          control={
            <Radio selected={false} onSelect={() => {}} />
          }
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 6. WithSwitch
// ---------------------------------------------------------------------------

export const WithSwitch: Story = {
  name: 'With Switch',
  render: () => {
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>FormControlLabel with Switch</SectionLabel>
        <FormControlLabel
          label="Enable notifications"
          control={
            <Switch
              checked={notifications}
              onChange={setNotifications}
            />
          }
        />
        <FormControlLabel
          label="Dark mode"
          control={
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
            />
          }
        />
        <FormControlLabel
          label="Maintenance mode (disabled)"
          disabled
          control={
            <Switch checked={false} onChange={() => {}} />
          }
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 7. AllPlacements
// ---------------------------------------------------------------------------

export const AllPlacements: Story = {
  name: 'All Placements',
  render: () => {
    const [checked, setChecked] = useState(true)
    return (
      <VStack padding="$4" gap="$6">
        <SectionLabel>Label Placement Options</SectionLabel>

        {(['end', 'start', 'top', 'bottom'] as const).map((placement) => (
          <VStack key={placement} gap="$1">
            <Text variant="body3" color="$colorSecondary">
              labelPlacement="{placement}"
            </Text>
            <FormControlLabel
              label={`Label at ${placement}`}
              labelPlacement={placement}
              control={
                <Checkbox
                  checked={checked}
                  onChange={setChecked}
                />
              }
            />
          </VStack>
        ))}

        <SectionLabel>Placement with Different Controls</SectionLabel>

        <Text variant="body3" color="$colorSecondary">
          Checkbox -- start placement
        </Text>
        <FormControlLabel
          label="Checkbox label at start"
          labelPlacement="start"
          control={<Checkbox checked onChange={() => {}} />}
        />

        <Text variant="body3" color="$colorSecondary">
          Radio -- start placement
        </Text>
        <FormControlLabel
          label="Radio label at start"
          labelPlacement="start"
          control={<Radio selected onSelect={() => {}} />}
        />

        <Text variant="body3" color="$colorSecondary">
          Switch -- start placement
        </Text>
        <FormControlLabel
          label="Switch label at start"
          labelPlacement="start"
          control={<Switch checked onChange={() => {}} />}
        />
      </VStack>
    )
  },
}
