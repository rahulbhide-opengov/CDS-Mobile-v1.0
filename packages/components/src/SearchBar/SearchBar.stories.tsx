import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { SearchBar, type SearchBarProps } from './SearchBar'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SearchBar> = {
  title: 'Navigation/SearchBar',
  component: SearchBar,
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
// 1. Default -- interactive controlled search bar
// ---------------------------------------------------------------------------

function DefaultInteractive() {
  const [value, setValue] = useState('')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Interactive Search Bar</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap to focus. Type to see the clear button. Cancel slides in on focus.
      </Text>

      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search permits..."
        onCancel={() => setValue('')}
      />

      {value.length > 0 && (
        <Text variant="caption" color="$colorSecondary">
          Searching for: "{value}"
        </Text>
      )}
    </VStack>
  )
}

export const Default: StoryObj = {
  name: 'Default',
  render: () => <DefaultInteractive />,
}

// ---------------------------------------------------------------------------
// 2. FilledVariant -- filled background (default)
// ---------------------------------------------------------------------------

export const FilledVariant: StoryObj = {
  name: 'Filled Variant',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Filled Variant (Default)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Uses a neutral-gray fill background (#F5F5F5) with no visible border
        in the default state.
      </Text>

      <SearchBar
        value=""
        onChangeText={() => {}}
        variant="filled"
        placeholder="Search records..."
      />

      <SectionLabel>Filled -- with pre-filled value</SectionLabel>

      <SearchBar
        value="Community Grant"
        onChangeText={() => {}}
        variant="filled"
        placeholder="Search..."
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. OutlinedVariant -- bordered style
// ---------------------------------------------------------------------------

export const OutlinedVariant: StoryObj = {
  name: 'Outlined Variant',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Outlined Variant</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Uses a transparent background with a light border. The border turns
        primary on focus.
      </Text>

      <SearchBar
        value=""
        onChangeText={() => {}}
        variant="outlined"
        placeholder="Search inspections..."
      />

      <SectionLabel>Outlined -- with pre-filled value</SectionLabel>

      <SearchBar
        value="Building Permit"
        onChangeText={() => {}}
        variant="outlined"
        placeholder="Search..."
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. AllSizes -- sm, md, lg comparison
// ---------------------------------------------------------------------------

export const AllSizes: StoryObj = {
  name: 'All Sizes',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Small (36px)</SectionLabel>
      <SearchBar
        value=""
        onChangeText={() => {}}
        size="sm"
        placeholder="Small search..."
      />

      <SectionLabel>Medium (44px -- default)</SectionLabel>
      <SearchBar
        value=""
        onChangeText={() => {}}
        size="md"
        placeholder="Medium search..."
      />

      <SectionLabel>Large (48px)</SectionLabel>
      <SearchBar
        value=""
        onChangeText={() => {}}
        size="lg"
        placeholder="Large search..."
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. WithCancel -- forced-visible cancel button
// ---------------------------------------------------------------------------

function WithCancelInteractive() {
  const [value, setValue] = useState('')

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Always-Visible Cancel</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The showCancel prop forces the cancel button to remain visible even
        when the input is not focused.
      </Text>

      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search..."
        showCancel
        onCancel={() => setValue('')}
      />

      <SectionLabel>Auto-Show Cancel (Default Behavior)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The cancel button slides in on focus and slides out on blur.
      </Text>

      <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search..."
        onCancel={() => setValue('')}
      />
    </VStack>
  )
}

export const WithCancel: StoryObj = {
  name: 'With Cancel',
  render: () => <WithCancelInteractive />,
}
