import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Checkbox, type CheckboxProps } from './Checkbox'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Checkbox> = {
  title: 'Form Controls/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

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
        <SectionLabel>Interactive Checkbox</SectionLabel>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          label="Accept terms and conditions"
        />
        <Text variant="caption" color="$colorSecondary">
          Current state: {checked ? 'Checked' : 'Unchecked'}
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

      {(['sm', 'md', 'lg'] as const).map((size) => (
        <VStack key={size} gap="$2">
          <Text variant="body3" color="$colorSecondary">
            Size: {size}
          </Text>
          <HStack gap="$4" alignItems="center">
            <Checkbox size={size} checked={false} label="Unchecked" />
            <Checkbox size={size} checked label="Checked" />
            <Checkbox size={size} indeterminate label="Mixed" />
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. Indeterminate
// ---------------------------------------------------------------------------

export const Indeterminate: Story = {
  render: () => {
    const [items, setItems] = useState([true, false, true])

    const allChecked = items.every(Boolean)
    const noneChecked = items.every((v) => !v)
    const parentChecked = allChecked
    const parentIndeterminate = !allChecked && !noneChecked

    const handleParent = () => {
      const newValue = !allChecked
      setItems([newValue, newValue, newValue])
    }

    const handleChild = (index: number) => (checked: boolean) => {
      setItems((prev) => {
        const next = [...prev]
        next[index] = checked
        return next
      })
    }

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Indeterminate / Mixed State</SectionLabel>

        <Checkbox
          checked={parentChecked}
          indeterminate={parentIndeterminate}
          onChange={handleParent}
          label="Select all toppings"
        />

        <VStack paddingLeft="$6" gap="$2">
          <Checkbox
            checked={items[0]}
            onChange={handleChild(0)}
            label="Pepperoni"
          />
          <Checkbox
            checked={items[1]}
            onChange={handleChild(1)}
            label="Mushrooms"
          />
          <Checkbox
            checked={items[2]}
            onChange={handleChild(2)}
            label="Olives"
          />
        </VStack>
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 4. WithLabel
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  name: 'With Label',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Labeled Checkboxes</SectionLabel>
      <Checkbox checked={false} label="Unchecked with label" />
      <Checkbox checked label="Checked with label" />
      <Checkbox checked={false} label="Another option" />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. ErrorState
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  name: 'Error State',
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Error State</SectionLabel>
        <Checkbox
          checked={checked}
          onChange={setChecked}
          error
          label="You must accept the terms"
        />
        <Text variant="caption" color="$errorColor">
          {!checked ? 'This field is required' : ''}
        </Text>

        <SectionLabel>Error vs Normal Comparison</SectionLabel>
        <HStack gap="$4">
          <Checkbox checked={false} label="Normal" />
          <Checkbox checked={false} error label="Error" />
        </HStack>
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 6. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Disabled States</SectionLabel>
      <Checkbox checked={false} disabled label="Disabled unchecked" />
      <Checkbox checked disabled label="Disabled checked" />
      <Checkbox indeterminate disabled label="Disabled indeterminate" />

      <SectionLabel>Enabled vs Disabled Comparison</SectionLabel>
      {(['Unchecked', 'Checked', 'Indeterminate'] as const).map((state) => (
        <HStack key={state} gap="$4" alignItems="center">
          <Checkbox
            checked={state === 'Checked'}
            indeterminate={state === 'Indeterminate'}
            label={state}
          />
          <Checkbox
            checked={state === 'Checked'}
            indeterminate={state === 'Indeterminate'}
            disabled
            label={`${state} (disabled)`}
          />
        </HStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. CheckboxGroup
// ---------------------------------------------------------------------------

export const CheckboxGroup: Story = {
  name: 'Checkbox Group',
  render: () => {
    const [selected, setSelected] = useState<Record<string, boolean>>({
      email: true,
      sms: false,
      push: true,
      inApp: false,
    })

    const toggle = (key: string) => (checked: boolean) => {
      setSelected((prev) => ({ ...prev, [key]: checked }))
    }

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Notification Preferences</SectionLabel>
        <Text variant="body2" color="$colorSecondary">
          Choose how you would like to receive notifications:
        </Text>

        <VStack gap="$3">
          <Checkbox
            checked={selected.email}
            onChange={toggle('email')}
            label="Email notifications"
          />
          <Checkbox
            checked={selected.sms}
            onChange={toggle('sms')}
            label="SMS notifications"
          />
          <Checkbox
            checked={selected.push}
            onChange={toggle('push')}
            label="Push notifications"
          />
          <Checkbox
            checked={selected.inApp}
            onChange={toggle('inApp')}
            label="In-app notifications"
          />
        </VStack>

        <Text variant="caption" color="$colorSecondary">
          Selected:{' '}
          {Object.entries(selected)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ') || 'None'}
        </Text>
      </VStack>
    )
  },
}
