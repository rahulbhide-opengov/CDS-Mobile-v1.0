import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { CheckCircleIcon, WarningIcon, HomeIcon } from '@opengov/cds-icons'
import { Chip, type ChipProps } from './Chip'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Chip> = {
  title: 'Content/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'positive', 'negative', 'warning', 'strong'],
    },
    style: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    closable: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

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
// 1. AllVariants
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Filled Style (Default)</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip label="Neutral" variant="neutral" />
        <Chip label="Positive" variant="positive" />
        <Chip label="Negative" variant="negative" />
        <Chip label="Warning" variant="warning" />
        <Chip label="Strong" variant="strong" />
      </HStack>

      <SectionLabel>Outlined Style</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip label="Neutral" variant="neutral" style="outlined" />
        <Chip label="Positive" variant="positive" style="outlined" />
        <Chip label="Negative" variant="negative" style="outlined" />
        <Chip label="Warning" variant="warning" style="outlined" />
        <Chip label="Strong" variant="strong" style="outlined" />
      </HStack>
    </VStack>
  ),
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
          <HStack gap="$2" flexWrap="wrap">
            <Chip label="Neutral" variant="neutral" size={size} />
            <Chip label="Positive" variant="positive" size={size} />
            <Chip label="Strong" variant="strong" size={size} />
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. OutlinedStyle
// ---------------------------------------------------------------------------

export const OutlinedStyle: Story = {
  name: 'Outlined Style',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Outlined Chips</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip label="Neutral" variant="neutral" style="outlined" />
        <Chip label="Positive" variant="positive" style="outlined" />
        <Chip label="Negative" variant="negative" style="outlined" />
        <Chip label="Warning" variant="warning" style="outlined" />
        <Chip label="Strong" variant="strong" style="outlined" />
      </HStack>

      <SectionLabel>Filled vs Outlined</SectionLabel>
      {(['neutral', 'positive', 'negative', 'warning', 'strong'] as const).map(
        (variant) => (
          <HStack key={variant} gap="$3" alignItems="center">
            <Chip label={variant} variant={variant} style="filled" />
            <Chip label={variant} variant={variant} style="outlined" />
          </HStack>
        ),
      )}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithLeadingIcon
// ---------------------------------------------------------------------------

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Chips with Leading Icons</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip
          label="Approved"
          variant="positive"
          leadingIcon={<CheckCircleIcon size="sm" color="#388E3C" />}
        />
        <Chip
          label="Warning"
          variant="warning"
          leadingIcon={<WarningIcon size="sm" color="#FFA000" />}
        />
        <Chip
          label="Home"
          variant="neutral"
          leadingIcon={<HomeIcon size="sm" color="#616161" />}
        />
      </HStack>

      <SectionLabel>With Icon and Outlined</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip
          label="Approved"
          variant="positive"
          style="outlined"
          leadingIcon={<CheckCircleIcon size="sm" color="#388E3C" />}
        />
        <Chip
          label="Warning"
          variant="warning"
          style="outlined"
          leadingIcon={<WarningIcon size="sm" color="#FFA000" />}
        />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. Closable
// ---------------------------------------------------------------------------

export const Closable: Story = {
  render: () => {
    const [chips, setChips] = useState([
      'React',
      'TypeScript',
      'Tamagui',
      'Expo',
      'Storybook',
    ])

    const removeChip = (label: string) => {
      setChips((prev) => prev.filter((c) => c !== label))
    }

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Closable Chips</SectionLabel>
        <Text variant="caption" color="$colorSecondary">
          Tap X to remove a chip
        </Text>

        <HStack gap="$2" flexWrap="wrap">
          {chips.map((chip) => (
            <Chip
              key={chip}
              label={chip}
              variant="neutral"
              closable
              onClose={() => removeChip(chip)}
            />
          ))}
        </HStack>

        {chips.length === 0 && (
          <Text variant="body2" color="$colorSecondary">
            All chips removed
          </Text>
        )}

        {chips.length < 5 && (
          <Text
            variant="body3"
            color="$brandBackground"
            onPress={() =>
              setChips(['React', 'TypeScript', 'Tamagui', 'Expo', 'Storybook'])
            }
          >
            Reset chips
          </Text>
        )}
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 6. Selected
// ---------------------------------------------------------------------------

export const Selected: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>('react')

    const options = [
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
      { id: 'angular', label: 'Angular' },
      { id: 'svelte', label: 'Svelte' },
    ]

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Selected State</SectionLabel>
        <Text variant="caption" color="$colorSecondary">
          Tap to select a chip (selected chips use the strong palette)
        </Text>

        <HStack gap="$2" flexWrap="wrap">
          {options.map((opt) => (
            <Chip
              key={opt.id}
              label={opt.label}
              variant="neutral"
              selected={selectedId === opt.id}
              onPress={() =>
                setSelectedId((prev) => (prev === opt.id ? null : opt.id))
              }
            />
          ))}
        </HStack>

        <SectionLabel>Selected vs Unselected</SectionLabel>
        {(['neutral', 'positive', 'strong'] as const).map((variant) => (
          <HStack key={variant} gap="$3" alignItems="center">
            <Chip label={variant} variant={variant} />
            <Chip label={`${variant} (selected)`} variant={variant} selected />
          </HStack>
        ))}
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 7. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Disabled States</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip label="Neutral" variant="neutral" disabled />
        <Chip label="Positive" variant="positive" disabled />
        <Chip label="Negative" variant="negative" disabled />
        <Chip label="Warning" variant="warning" disabled />
        <Chip label="Strong" variant="strong" disabled />
      </HStack>

      <SectionLabel>Enabled vs Disabled</SectionLabel>
      {(['neutral', 'positive', 'negative', 'warning', 'strong'] as const).map(
        (variant) => (
          <HStack key={variant} gap="$3" alignItems="center">
            <Chip label={variant} variant={variant} />
            <Chip label={`${variant} (disabled)`} variant={variant} disabled />
          </HStack>
        ),
      )}

      <SectionLabel>Disabled Closable</SectionLabel>
      <HStack gap="$2" flexWrap="wrap">
        <Chip label="Cannot close" variant="neutral" closable onClose={() => {}} disabled />
        <Chip label="Disabled strong" variant="strong" closable onClose={() => {}} disabled />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 8. ChipGroup
// ---------------------------------------------------------------------------

export const ChipGroup: Story = {
  name: 'Chip Group',
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(
      new Set(['frontend', 'mobile']),
    )

    const tags = [
      { id: 'frontend', label: 'Frontend' },
      { id: 'backend', label: 'Backend' },
      { id: 'mobile', label: 'Mobile' },
      { id: 'devops', label: 'DevOps' },
      { id: 'design', label: 'Design' },
      { id: 'qa', label: 'QA' },
    ]

    const toggleTag = (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    return (
      <VStack padding="$4" gap="$4">
        <SectionLabel>Multi-Select Chip Group</SectionLabel>
        <Text variant="body2" color="$colorSecondary">
          Select your areas of interest:
        </Text>

        <HStack gap="$2" flexWrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              variant="neutral"
              selected={selected.has(tag.id)}
              onPress={() => toggleTag(tag.id)}
            />
          ))}
        </HStack>

        <Text variant="caption" color="$colorSecondary">
          Selected: {Array.from(selected).join(', ') || 'None'}
        </Text>
      </VStack>
    )
  },
}
