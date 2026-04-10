import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Radio, type RadioProps } from './Radio'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Radio> = {
  title: 'Form Controls/Radio',
  component: Radio,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

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
    const [selected, setSelected] = useState(false)
    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Interactive Radio</SectionLabel>
        <Radio
          selected={selected}
          onSelect={() => setSelected(true)}
          label="Select me"
        />
        <Text variant="caption" color="$colorSecondary">
          State: {selected ? 'Selected' : 'Unselected'}
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
            <Radio size={size} selected={false} label="Unselected" />
            <Radio size={size} selected label="Selected" />
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
      <SectionLabel>Labeled Radio Buttons</SectionLabel>
      <Radio selected={false} label="Option A" />
      <Radio selected label="Option B (selected)" />
      <Radio selected={false} label="Option C" />
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
      <Radio selected={false} disabled label="Disabled unselected" />
      <Radio selected disabled label="Disabled selected" />

      <SectionLabel>Enabled vs Disabled</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Radio selected={false} label="Enabled" />
        <Radio selected={false} disabled label="Disabled" />
      </HStack>
      <HStack gap="$4" alignItems="center">
        <Radio selected label="Enabled" />
        <Radio selected disabled label="Disabled" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. RadioGroup -- mutually exclusive selection
// ---------------------------------------------------------------------------

export const RadioGroup: Story = {
  name: 'Radio Group',
  render: () => {
    const [value, setValue] = useState('medium')

    const options = [
      { value: 'small', label: 'Small -- 8oz' },
      { value: 'medium', label: 'Medium -- 12oz' },
      { value: 'large', label: 'Large -- 16oz' },
      { value: 'xl', label: 'Extra Large -- 20oz' },
    ]

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Select Drink Size</SectionLabel>
        <Text variant="body2" color="$colorSecondary">
          Choose one option:
        </Text>

        <VStack gap="$3">
          {options.map((opt) => (
            <Radio
              key={opt.value}
              value={opt.value}
              selected={value === opt.value}
              onSelect={() => setValue(opt.value)}
              label={opt.label}
            />
          ))}
        </VStack>

        <Text variant="caption" color="$colorSecondary">
          Selected: {options.find((o) => o.value === value)?.label}
        </Text>
      </VStack>
    )
  },
}
