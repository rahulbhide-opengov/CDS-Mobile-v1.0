import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { SelectMenu, type SelectMenuProps, type SelectMenuOption, type SelectMenuOptionGroup } from './SelectMenu'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SelectMenu> = {
  title: 'Patterns/SelectMenu',
  component: SelectMenu,
  argTypes: {
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof SelectMenu>

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
// Shared option data
// ---------------------------------------------------------------------------

const DEPARTMENT_OPTIONS: SelectMenuOption[] = [
  { value: 'finance', label: 'Finance' },
  { value: 'planning', label: 'Planning & Development' },
  { value: 'public-works', label: 'Public Works' },
  { value: 'parks', label: 'Parks & Recreation' },
  { value: 'fire', label: 'Fire Department' },
  { value: 'police', label: 'Police Department' },
  { value: 'it', label: 'Information Technology' },
  { value: 'hr', label: 'Human Resources' },
]

const STATUS_OPTIONS: SelectMenuOption[] = [
  { value: 'active', label: 'Active', description: 'Currently in progress' },
  { value: 'pending', label: 'Pending Review', description: 'Awaiting approval' },
  { value: 'approved', label: 'Approved', description: 'Officially approved' },
  { value: 'rejected', label: 'Rejected', description: 'Application denied', disabled: true },
  { value: 'archived', label: 'Archived', description: 'No longer active' },
]

const GROUPED_OPTIONS: SelectMenuOption[] = [
  { value: 'building', label: 'Building Permit', group: 'permits' },
  { value: 'electrical', label: 'Electrical Permit', group: 'permits' },
  { value: 'plumbing', label: 'Plumbing Permit', group: 'permits' },
  { value: 'demolition', label: 'Demolition Permit', group: 'permits' },
  { value: 'business', label: 'Business License', group: 'licenses' },
  { value: 'liquor', label: 'Liquor License', group: 'licenses' },
  { value: 'vendor', label: 'Vendor License', group: 'licenses' },
  { value: 'zoning', label: 'Zoning Variance', group: 'other' },
  { value: 'appeal', label: 'Appeal Application', group: 'other' },
]

const OPTION_GROUPS: SelectMenuOptionGroup[] = [
  { key: 'permits', label: 'Permits' },
  { key: 'licenses', label: 'Licenses' },
  { key: 'other', label: 'Other Applications' },
]

// ---------------------------------------------------------------------------
// 1. SingleSelect
// ---------------------------------------------------------------------------

function SingleSelectDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Single Select</SectionLabel>

      <SelectMenu
        label="Department"
        options={DEPARTMENT_OPTIONS}
        value={value}
        onSelect={(v) => setValue(v)}
        placeholder="Choose a department..."
      />

      {value && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Selected: {DEPARTMENT_OPTIONS.find((o) => o.value === value)?.label}
          </Text>
        </Box>
      )}

      <SectionLabel>With Descriptions</SectionLabel>

      <SingleSelectWithDescriptions />
    </VStack>
  )
}

function SingleSelectWithDescriptions() {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <SelectMenu
      label="Application Status"
      options={STATUS_OPTIONS}
      value={value}
      onSelect={(v) => setValue(v)}
      placeholder="Filter by status..."
    />
  )
}

export const SingleSelect: Story = {
  name: 'Single Select',
  render: () => <SingleSelectDemo />,
}

// ---------------------------------------------------------------------------
// 2. MultiSelect
// ---------------------------------------------------------------------------

function MultiSelectDemo() {
  const [values, setValues] = useState<string[]>([])

  const handleSelect = (v: string) => {
    setValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    )
  }

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Multi Select</SectionLabel>

      <SelectMenu
        label="Departments"
        options={DEPARTMENT_OPTIONS}
        value={values}
        onSelect={handleSelect}
        multiple
        placeholder="Select departments..."
      />

      {values.length > 0 && (
        <Box padding="$3" borderRadius={8} backgroundColor="#EBF0FF">
          <Text variant="body3" color="#1E55FF">
            Selected ({values.length}):{' '}
            {values
              .map((v) => DEPARTMENT_OPTIONS.find((o) => o.value === v)?.label)
              .join(', ')}
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export const MultiSelect: Story = {
  name: 'Multi Select',
  render: () => <MultiSelectDemo />,
}

// ---------------------------------------------------------------------------
// 3. WithSearch
// ---------------------------------------------------------------------------

function SearchableDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Searchable Single Select</SectionLabel>

      <SelectMenu
        label="Department"
        options={DEPARTMENT_OPTIONS}
        value={value}
        onSelect={(v) => setValue(v)}
        searchable
        placeholder="Search departments..."
      />

      <SectionLabel>Searchable Multi Select</SectionLabel>

      <SearchableMultiDemo />
    </VStack>
  )
}

function SearchableMultiDemo() {
  const [values, setValues] = useState<string[]>([])

  const handleSelect = (v: string) => {
    setValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    )
  }

  return (
    <SelectMenu
      label="Application Types"
      options={GROUPED_OPTIONS}
      value={values}
      onSelect={handleSelect}
      multiple
      searchable
      placeholder="Search application types..."
    />
  )
}

export const WithSearch: Story = {
  name: 'With Search',
  render: () => <SearchableDemo />,
}

// ---------------------------------------------------------------------------
// 4. WithGroups
// ---------------------------------------------------------------------------

function GroupedDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Grouped Options</SectionLabel>

      <SelectMenu
        label="Application Type"
        options={GROUPED_OPTIONS}
        groups={OPTION_GROUPS}
        value={value}
        onSelect={(v) => setValue(v)}
        placeholder="Select application type..."
      />

      {value && (
        <Box padding="$3" borderRadius={8} backgroundColor="#E8F5E9">
          <Text variant="body3" color="#388E3C">
            Selected: {GROUPED_OPTIONS.find((o) => o.value === value)?.label}
          </Text>
        </Box>
      )}

      <SectionLabel>Grouped + Searchable + Multi Select</SectionLabel>

      <GroupedMultiSearchDemo />
    </VStack>
  )
}

function GroupedMultiSearchDemo() {
  const [values, setValues] = useState<string[]>([])

  const handleSelect = (v: string) => {
    setValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v],
    )
  }

  return (
    <SelectMenu
      label="Application Types"
      options={GROUPED_OPTIONS}
      groups={OPTION_GROUPS}
      value={values}
      onSelect={handleSelect}
      multiple
      searchable
      placeholder="Search and select..."
    />
  )
}

export const WithGroups: Story = {
  name: 'With Groups',
  render: () => <GroupedDemo />,
}

// ---------------------------------------------------------------------------
// 5. WithError
// ---------------------------------------------------------------------------

function ErrorDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Error State</SectionLabel>

      <SelectMenu
        label="Department"
        options={DEPARTMENT_OPTIONS}
        value={value}
        onSelect={(v) => setValue(v)}
        error
        errorText="Please select a department to continue."
        placeholder="Choose a department..."
      />

      <SectionLabel>Error Clears on Selection</SectionLabel>

      <ErrorClearsDemo />

      <SectionLabel>Disabled State</SectionLabel>

      <SelectMenu
        label="Locked Field"
        options={DEPARTMENT_OPTIONS}
        value="finance"
        onSelect={() => {}}
        disabled
        placeholder="This field is locked"
      />

      <SectionLabel>All Sizes</SectionLabel>
      <VStack gap="$3">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <SelectMenu
            key={size}
            label={`Size: ${size}`}
            options={DEPARTMENT_OPTIONS}
            value={undefined}
            onSelect={() => {}}
            size={size}
            placeholder={`${size} trigger`}
          />
        ))}
      </VStack>
    </VStack>
  )
}

function ErrorClearsDemo() {
  const [value, setValue] = useState<string | undefined>(undefined)
  const hasError = value === undefined

  return (
    <SelectMenu
      label="Required Field"
      options={DEPARTMENT_OPTIONS}
      value={value}
      onSelect={(v) => setValue(v)}
      error={hasError}
      errorText={hasError ? 'This field is required.' : undefined}
      placeholder="Select to clear error..."
    />
  )
}

export const WithError: Story = {
  name: 'With Error',
  render: () => <ErrorDemo />,
}
