import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Link, type LinkProps } from './Link'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Link> = {
  title: 'Content/Link',
  component: Link,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'inline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    external: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Link>

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
    children: 'Click here for more',
    href: 'https://opengov.com',
    variant: 'default',
    size: 'md',
  },
}

// ---------------------------------------------------------------------------
// 2. AllVariants
// ---------------------------------------------------------------------------

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Link Variants</SectionLabel>

      {(['default', 'subtle', 'inline'] as const).map((variant) => (
        <HStack key={variant} gap="$3" alignItems="center">
          <Link variant={variant} href="https://opengov.com">
            {variant} link
          </Link>
          <Text variant="caption" color="$colorSecondary">
            variant="{variant}"
          </Text>
        </HStack>
      ))}

      <SectionLabel>Inline Usage</SectionLabel>
      <Text variant="body2">
        Read our{' '}
        <Link variant="inline" href="https://opengov.com/terms">
          terms of service
        </Link>{' '}
        and{' '}
        <Link variant="inline" href="https://opengov.com/privacy">
          privacy policy
        </Link>{' '}
        before continuing.
      </Text>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. AllSizes
// ---------------------------------------------------------------------------

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      {(['sm', 'md', 'lg'] as const).map((size) => (
        <HStack key={size} gap="$3" alignItems="center">
          <Link size={size} href="https://opengov.com">
            Link ({size})
          </Link>
          <Text variant="caption" color="$colorSecondary">
            size="{size}"
          </Text>
        </HStack>
      ))}

      <SectionLabel>All Variants at Each Size</SectionLabel>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <VStack key={size} gap="$1">
          <Text variant="body3" color="$colorSecondary">
            Size: {size}
          </Text>
          <HStack gap="$4">
            <Link variant="default" size={size} href="#">
              Default
            </Link>
            <Link variant="subtle" size={size} href="#">
              Subtle
            </Link>
            <Link variant="inline" size={size} href="#">
              Inline
            </Link>
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. External
// ---------------------------------------------------------------------------

export const External: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>External Links</SectionLabel>
      <Text variant="caption" color="$colorSecondary">
        External links show a trailing icon indicating they open outside the app
      </Text>

      <Link href="https://opengov.com" external>
        OpenGov Website
      </Link>
      <Link href="https://github.com" external>
        GitHub
      </Link>
      <Link href="https://reactnative.dev" external>
        React Native Docs
      </Link>

      <SectionLabel>External Across Variants</SectionLabel>
      {(['default', 'subtle', 'inline'] as const).map((variant) => (
        <Link key={variant} variant={variant} href="https://opengov.com" external>
          {variant} external link
        </Link>
      ))}

      <SectionLabel>External Across Sizes</SectionLabel>
      <HStack gap="$4" alignItems="center">
        <Link size="sm" href="#" external>
          Small
        </Link>
        <Link size="md" href="#" external>
          Medium
        </Link>
        <Link size="lg" href="#" external>
          Large
        </Link>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4">
      <SectionLabel>Disabled Links</SectionLabel>
      <Link href="https://opengov.com" disabled>
        Disabled default link
      </Link>
      <Link variant="subtle" href="#" disabled>
        Disabled subtle link
      </Link>
      <Link variant="inline" href="#" disabled>
        Disabled inline link
      </Link>

      <SectionLabel>Enabled vs Disabled</SectionLabel>
      {(['default', 'subtle', 'inline'] as const).map((variant) => (
        <HStack key={variant} gap="$4" alignItems="center">
          <Link variant={variant} href="#">
            Enabled
          </Link>
          <Link variant={variant} href="#" disabled>
            Disabled
          </Link>
          <Text variant="caption" color="$colorSecondary">
            {variant}
          </Text>
        </HStack>
      ))}

      <SectionLabel>Disabled External</SectionLabel>
      <Link href="https://opengov.com" external disabled>
        Disabled external link
      </Link>
    </VStack>
  ),
}
