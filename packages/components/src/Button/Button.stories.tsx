import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import {
  AddIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  SettingsIcon,
  ShareIcon,
  SendIcon,
} from '@opengov/cds-icons'
import { Button, type ButtonProps } from './Button'
import { IconButton, type IconButtonProps } from './IconButton'
import { ButtonGroup, type ButtonGroupProps } from './ButtonGroup'

// ---------------------------------------------------------------------------
// Meta -- Button
// ---------------------------------------------------------------------------

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'secondaryAlt',
        'tertiary',
        'tertiaryAlt',
        'destructive',
        'destructiveAlt',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ---------------------------------------------------------------------------
// Helper: Section header
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h5" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// 1. Primary -- default primary button with controls
// ---------------------------------------------------------------------------

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
}

// ---------------------------------------------------------------------------
// 2. AllVariants -- grid showing all 7 variants
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>All 7 CDS 37 Button Variants</SectionLabel>

      <VStack gap="$3">
        <HStack gap="$3" flexWrap="wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondaryAlt">Secondary Alt</Button>
        </HStack>

        <HStack gap="$3" flexWrap="wrap">
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="tertiaryAlt">Tertiary Alt</Button>
        </HStack>

        <HStack gap="$3" flexWrap="wrap">
          <Button variant="destructive">Destructive</Button>
          <Button variant="destructiveAlt">Destructive Alt</Button>
        </HStack>
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. AllSizes -- sm, md, lg comparison
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      <HStack gap="$3" alignItems="center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </HStack>

      <SectionLabel>All Variants at Each Size</SectionLabel>

      {(['sm', 'md', 'lg'] as const).map((size) => (
        <VStack key={size} gap="$2">
          <Text variant="body3" color="$colorSecondary">
            Size: {size}
          </Text>
          <HStack gap="$2" flexWrap="wrap">
            <Button variant="primary" size={size}>
              Primary
            </Button>
            <Button variant="secondary" size={size}>
              Secondary
            </Button>
            <Button variant="destructive" size={size}>
              Destructive
            </Button>
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithIcons -- iconLeft, iconRight, both
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Icon Left</SectionLabel>
      <HStack gap="$3" flexWrap="wrap">
        <Button
          variant="primary"
          iconLeft={<AddIcon size="md" color="white" />}
        >
          Add Item
        </Button>
        <Button
          variant="secondary"
          iconLeft={<SearchIcon size="md" color="#4B3FFF" />}
        >
          Search
        </Button>
        <Button
          variant="destructive"
          iconLeft={<DeleteIcon size="md" color="white" />}
        >
          Delete
        </Button>
      </HStack>

      <SectionLabel>Icon Right</SectionLabel>
      <HStack gap="$3" flexWrap="wrap">
        <Button
          variant="primary"
          iconRight={<ChevronRightIcon size="md" color="white" />}
        >
          Next
        </Button>
        <Button
          variant="secondary"
          iconRight={<ChevronDownIcon size="md" color="#4B3FFF" />}
        >
          Expand
        </Button>
        <Button
          variant="tertiary"
          iconRight={<SendIcon size="md" color="#4B3FFF" />}
        >
          Send
        </Button>
      </HStack>

      <SectionLabel>Both Icons</SectionLabel>
      <HStack gap="$3" flexWrap="wrap">
        <Button
          variant="primary"
          iconLeft={<EditIcon size="md" color="white" />}
          iconRight={<ChevronRightIcon size="md" color="white" />}
        >
          Edit Record
        </Button>
        <Button
          variant="secondaryAlt"
          iconLeft={<ShareIcon size="md" color="#212121" />}
          iconRight={<ChevronRightIcon size="md" color="#212121" />}
        >
          Share
        </Button>
      </HStack>

      <SectionLabel>Icon Sizes Across Button Sizes</SectionLabel>
      <HStack gap="$3" alignItems="center">
        <Button
          variant="primary"
          size="sm"
          iconLeft={<AddIcon size="sm" color="white" />}
        >
          Small
        </Button>
        <Button
          variant="primary"
          size="md"
          iconLeft={<AddIcon size="md" color="white" />}
        >
          Medium
        </Button>
        <Button
          variant="primary"
          size="lg"
          iconLeft={<AddIcon size="lg" color="white" />}
        >
          Large
        </Button>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. Disabled -- disabled state for all variants
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  name: 'Disabled States',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Disabled -- All Variants</SectionLabel>

      <HStack gap="$3" flexWrap="wrap">
        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="secondaryAlt" disabled>
          Secondary Alt
        </Button>
      </HStack>

      <HStack gap="$3" flexWrap="wrap">
        <Button variant="tertiary" disabled>
          Tertiary
        </Button>
        <Button variant="tertiaryAlt" disabled>
          Tertiary Alt
        </Button>
      </HStack>

      <HStack gap="$3" flexWrap="wrap">
        <Button variant="destructive" disabled>
          Destructive
        </Button>
        <Button variant="destructiveAlt" disabled>
          Destructive Alt
        </Button>
      </HStack>

      <SectionLabel>Enabled vs. Disabled Comparison</SectionLabel>
      {(
        [
          'primary',
          'secondary',
          'secondaryAlt',
          'tertiary',
          'tertiaryAlt',
          'destructive',
          'destructiveAlt',
        ] as const
      ).map((v) => (
        <HStack key={v} gap="$3" alignItems="center">
          <Button variant={v}>{v}</Button>
          <Button variant={v} disabled>
            {v} (disabled)
          </Button>
        </HStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. Loading -- loading state
// ---------------------------------------------------------------------------

export const Loading: Story = {
  name: 'Loading States',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Loading -- Spinner Replaces Left Icon</SectionLabel>

      <HStack gap="$3" flexWrap="wrap">
        <Button variant="primary" loading>
          Saving...
        </Button>
        <Button variant="secondary" loading>
          Loading...
        </Button>
        <Button variant="destructive" loading>
          Deleting...
        </Button>
      </HStack>

      <SectionLabel>Loading Across All Variants</SectionLabel>
      <VStack gap="$2">
        {(
          [
            'primary',
            'secondary',
            'secondaryAlt',
            'tertiary',
            'tertiaryAlt',
            'destructive',
            'destructiveAlt',
          ] as const
        ).map((v) => (
          <HStack key={v} gap="$3" alignItems="center">
            <Button variant={v}>{v}</Button>
            <Button variant={v} loading>
              {v} loading
            </Button>
          </HStack>
        ))}
      </VStack>

      <SectionLabel>Loading Across Sizes</SectionLabel>
      <HStack gap="$3" alignItems="center">
        <Button variant="primary" size="sm" loading>
          Small
        </Button>
        <Button variant="primary" size="md" loading>
          Medium
        </Button>
        <Button variant="primary" size="lg" loading>
          Large
        </Button>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. FullWidth -- full width buttons
// ---------------------------------------------------------------------------

export const FullWidth: Story = {
  name: 'Full Width',
  render: () => (
    <VStack gap="$4" padding="$4" width={320}>
      <SectionLabel>Full Width Buttons</SectionLabel>

      <Button variant="primary" fullWidth>
        Continue
      </Button>
      <Button variant="secondary" fullWidth>
        Cancel
      </Button>
      <Button variant="destructiveAlt" fullWidth>
        Delete Account
      </Button>

      <SectionLabel>Full Width with Icons</SectionLabel>
      <Button
        variant="primary"
        fullWidth
        iconLeft={<AddIcon size="md" color="white" />}
      >
        Create New Record
      </Button>
      <Button
        variant="secondary"
        fullWidth
        iconRight={<ChevronRightIcon size="md" color="#4B3FFF" />}
      >
        View Details
      </Button>

      <SectionLabel>Full Width Loading</SectionLabel>
      <Button variant="primary" fullWidth loading>
        Submitting...
      </Button>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 8. IconButtons -- all IconButton variants
// ---------------------------------------------------------------------------

export const IconButtons: Story = {
  name: 'Icon Buttons',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>All Variants</SectionLabel>
      <HStack gap="$3" flexWrap="wrap">
        <IconButton
          variant="primary"
          icon={<AddIcon size="md" color="white" />}
          accessibilityLabel="Add"
        />
        <IconButton
          variant="secondary"
          icon={<EditIcon size="md" color="#4B3FFF" />}
          accessibilityLabel="Edit"
        />
        <IconButton
          variant="secondaryAlt"
          icon={<SettingsIcon size="md" color="#212121" />}
          accessibilityLabel="Settings"
        />
        <IconButton
          variant="tertiary"
          icon={<SearchIcon size="md" color="#4B3FFF" />}
          accessibilityLabel="Search"
        />
        <IconButton
          variant="tertiaryAlt"
          icon={<ShareIcon size="md" color="#212121" />}
          accessibilityLabel="Share"
        />
        <IconButton
          variant="destructive"
          icon={<DeleteIcon size="md" color="white" />}
          accessibilityLabel="Delete"
        />
        <IconButton
          variant="destructiveAlt"
          icon={<CloseIcon size="md" color="#CC2929" />}
          accessibilityLabel="Close"
        />
      </HStack>

      <SectionLabel>All Sizes</SectionLabel>
      <HStack gap="$3" alignItems="center">
        <IconButton
          variant="primary"
          size="sm"
          icon={<AddIcon size="sm" color="white" />}
          accessibilityLabel="Add (small)"
        />
        <IconButton
          variant="primary"
          size="md"
          icon={<AddIcon size="md" color="white" />}
          accessibilityLabel="Add (medium)"
        />
        <IconButton
          variant="primary"
          size="lg"
          icon={<AddIcon size="lg" color="white" />}
          accessibilityLabel="Add (large)"
        />
      </HStack>

      <SectionLabel>Disabled</SectionLabel>
      <HStack gap="$3" flexWrap="wrap">
        <IconButton
          variant="primary"
          disabled
          icon={<AddIcon size="md" color="#BDBDBD" />}
          accessibilityLabel="Add (disabled)"
        />
        <IconButton
          variant="secondary"
          disabled
          icon={<EditIcon size="md" color="#BDBDBD" />}
          accessibilityLabel="Edit (disabled)"
        />
        <IconButton
          variant="destructive"
          disabled
          icon={<DeleteIcon size="md" color="#BDBDBD" />}
          accessibilityLabel="Delete (disabled)"
        />
        <IconButton
          variant="tertiary"
          disabled
          icon={<SearchIcon size="md" color="#BDBDBD" />}
          accessibilityLabel="Search (disabled)"
        />
      </HStack>

      <SectionLabel>Enabled vs. Disabled Comparison</SectionLabel>
      {(
        [
          'primary',
          'secondary',
          'secondaryAlt',
          'tertiary',
          'tertiaryAlt',
          'destructive',
          'destructiveAlt',
        ] as const
      ).map((v) => {
        const iconColor =
          v === 'primary' || v === 'destructive'
            ? 'white'
            : v === 'destructiveAlt'
              ? '#CC2929'
              : v === 'secondary' || v === 'tertiary'
                ? '#4B3FFF'
                : '#212121'
        return (
          <HStack key={v} gap="$3" alignItems="center">
            <IconButton
              variant={v}
              icon={<SettingsIcon size="md" color={iconColor} />}
              accessibilityLabel={`Settings ${v}`}
            />
            <IconButton
              variant={v}
              disabled
              icon={<SettingsIcon size="md" color="#BDBDBD" />}
              accessibilityLabel={`Settings ${v} disabled`}
            />
            <Text variant="caption">{v}</Text>
          </HStack>
        )
      })}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 9. ButtonGroups -- horizontal and vertical groups
// ---------------------------------------------------------------------------

export const ButtonGroups: Story = {
  name: 'Button Groups',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Horizontal -- Default Spacing</SectionLabel>
      <ButtonGroup orientation="horizontal" spacing="default">
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Center</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>

      <SectionLabel>Horizontal -- Compact (Connected)</SectionLabel>
      <ButtonGroup orientation="horizontal" spacing="compact">
        <Button variant="secondary">Day</Button>
        <Button variant="secondary">Week</Button>
        <Button variant="secondary">Month</Button>
        <Button variant="secondary">Year</Button>
      </ButtonGroup>

      <SectionLabel>Horizontal -- Loose Spacing</SectionLabel>
      <ButtonGroup orientation="horizontal" spacing="loose">
        <Button variant="primary">Save</Button>
        <Button variant="secondaryAlt">Cancel</Button>
      </ButtonGroup>

      <SectionLabel>Vertical -- Default Spacing</SectionLabel>
      <VStack width={280}>
        <ButtonGroup orientation="vertical" spacing="default">
          <Button variant="primary" fullWidth>
            Continue
          </Button>
          <Button variant="secondary" fullWidth>
            Go Back
          </Button>
          <Button variant="tertiaryAlt" fullWidth>
            Skip for Now
          </Button>
        </ButtonGroup>
      </VStack>

      <SectionLabel>Vertical -- Compact (Connected)</SectionLabel>
      <VStack width={240}>
        <ButtonGroup orientation="vertical" spacing="compact">
          <Button variant="secondaryAlt">Option A</Button>
          <Button variant="secondaryAlt">Option B</Button>
          <Button variant="secondaryAlt">Option C</Button>
        </ButtonGroup>
      </VStack>

      <SectionLabel>Mixed Variants in Group</SectionLabel>
      <ButtonGroup orientation="horizontal" spacing="default">
        <Button variant="primary">Submit</Button>
        <Button variant="secondary">Save Draft</Button>
        <Button variant="tertiaryAlt">Cancel</Button>
      </ButtonGroup>

      <SectionLabel>Icon Button Group -- Compact</SectionLabel>
      <ButtonGroup orientation="horizontal" spacing="compact">
        <IconButton
          variant="secondary"
          icon={<EditIcon size="md" color="#4B3FFF" />}
          accessibilityLabel="Edit"
        />
        <IconButton
          variant="secondary"
          icon={<ShareIcon size="md" color="#4B3FFF" />}
          accessibilityLabel="Share"
        />
        <IconButton
          variant="secondary"
          icon={<DeleteIcon size="md" color="#4B3FFF" />}
          accessibilityLabel="Delete"
        />
      </ButtonGroup>

      <SectionLabel>Destructive Action Pair</SectionLabel>
      <ButtonGroup orientation="horizontal" spacing="default">
        <Button variant="destructive">Delete</Button>
        <Button variant="secondaryAlt">Cancel</Button>
      </ButtonGroup>
    </VStack>
  ),
}
