import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { PageHeader, type PageHeaderProps } from './PageHeader'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof PageHeader> = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'prominent', 'compact'],
    },
    bordered: { control: 'boolean' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof PageHeader>

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

function ActionButton({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' }) {
  const bg = variant === 'primary' ? '#4B3FFF' : '#F5F5F5'
  const color = variant === 'primary' ? '#FFFFFF' : '#212121'

  return (
    <Box
      paddingHorizontal="$3"
      paddingVertical="$2"
      borderRadius={4}
      backgroundColor={bg}
    >
      <Text variant="body3" color={color} fontWeight="$semibold">
        {label}
      </Text>
    </Box>
  )
}

function BreadcrumbTrail() {
  return (
    <HStack gap="$1" alignItems="center">
      <Text variant="caption" color="#4B3FFF">Home</Text>
      <Text variant="caption" color="#9E9E9E">/</Text>
      <Text variant="caption" color="#4B3FFF">Permits</Text>
      <Text variant="caption" color="#9E9E9E">/</Text>
      <Text variant="caption" color="#212121">Building Permits</Text>
    </HStack>
  )
}

// ---------------------------------------------------------------------------
// 1. Standard
// ---------------------------------------------------------------------------

export const Standard: Story = {
  name: 'Standard',
  render: () => (
    <VStack gap="$6">
      <VStack padding="$4">
        <SectionLabel>Standard Page Header</SectionLabel>
      </VStack>

      <PageHeader title="Building Permits" />

      <VStack padding="$4">
        <SectionLabel>Standard with Subtitle</SectionLabel>
      </VStack>

      <PageHeader
        title="Building Permits"
        subtitle="View and manage all building permit applications for your jurisdiction."
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. Prominent
// ---------------------------------------------------------------------------

export const Prominent: Story = {
  name: 'Prominent',
  render: () => (
    <VStack gap="$6">
      <VStack padding="$4">
        <SectionLabel>Prominent Page Header</SectionLabel>
      </VStack>

      <PageHeader
        title="Dashboard"
        variant="prominent"
      />

      <VStack padding="$4">
        <SectionLabel>Prominent with Subtitle</SectionLabel>
      </VStack>

      <PageHeader
        title="Welcome Back"
        subtitle="Here is an overview of your jurisdiction's activity for the current fiscal year."
        variant="prominent"
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. Compact
// ---------------------------------------------------------------------------

export const Compact: Story = {
  name: 'Compact',
  render: () => (
    <VStack gap="$6">
      <VStack padding="$4">
        <SectionLabel>Compact Page Header</SectionLabel>
      </VStack>

      <PageHeader
        title="Permit #2026-0412"
        variant="compact"
      />

      <VStack padding="$4">
        <SectionLabel>Compact with Subtitle</SectionLabel>
      </VStack>

      <PageHeader
        title="Permit #2026-0412"
        subtitle="Commercial building renovation -- Cedar Grove"
        variant="compact"
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithBreadcrumbs
// ---------------------------------------------------------------------------

export const WithBreadcrumbs: Story = {
  name: 'With Breadcrumbs',
  render: () => (
    <VStack gap="$6">
      <VStack padding="$4">
        <SectionLabel>Standard with Breadcrumbs</SectionLabel>
      </VStack>

      <PageHeader
        title="Building Permits"
        subtitle="12 active applications"
        breadcrumbs={<BreadcrumbTrail />}
      />

      <VStack padding="$4">
        <SectionLabel>Prominent with Breadcrumbs</SectionLabel>
      </VStack>

      <PageHeader
        title="Building Permits"
        subtitle="View and manage all building permit applications."
        variant="prominent"
        breadcrumbs={<BreadcrumbTrail />}
      />

      <VStack padding="$4">
        <SectionLabel>Compact with Breadcrumbs</SectionLabel>
      </VStack>

      <PageHeader
        title="Permit #2026-0412"
        variant="compact"
        breadcrumbs={<BreadcrumbTrail />}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. WithActions
// ---------------------------------------------------------------------------

export const WithActions: Story = {
  name: 'With Actions',
  render: () => (
    <VStack gap="$6">
      <VStack padding="$4">
        <SectionLabel>Standard with Actions (inline)</SectionLabel>
      </VStack>

      <PageHeader
        title="Building Permits"
        subtitle="12 active applications"
        actions={
          <>
            <ActionButton label="Export" variant="secondary" />
            <ActionButton label="New Permit" variant="primary" />
          </>
        }
      />

      <VStack padding="$4">
        <SectionLabel>Prominent with Actions (stacked below)</SectionLabel>
      </VStack>

      <PageHeader
        title="Annual Budget Review"
        subtitle="FY 2025-2026 overview and projections"
        variant="prominent"
        actions={
          <>
            <ActionButton label="Download Report" variant="secondary" />
            <ActionButton label="Share" variant="primary" />
          </>
        }
      />

      <VStack padding="$4">
        <SectionLabel>Compact with Single Action</SectionLabel>
      </VStack>

      <PageHeader
        title="Permit #2026-0412"
        variant="compact"
        actions={<ActionButton label="Edit" variant="secondary" />}
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. WithSubtitle
// ---------------------------------------------------------------------------

export const WithSubtitle: Story = {
  name: 'With Subtitle',
  render: () => (
    <VStack gap="$6">
      <VStack padding="$4">
        <SectionLabel>All Variants with Subtitle</SectionLabel>
      </VStack>

      <VStack gap="$2" padding="$4">
        <Text variant="caption" color="$colorSecondary">Prominent</Text>
      </VStack>
      <PageHeader
        title="Community Projects"
        subtitle="Track and manage community improvement projects across all districts."
        variant="prominent"
      />

      <VStack gap="$2" padding="$4">
        <Text variant="caption" color="$colorSecondary">Standard</Text>
      </VStack>
      <PageHeader
        title="Community Projects"
        subtitle="Track and manage community improvement projects across all districts."
        variant="standard"
      />

      <VStack gap="$2" padding="$4">
        <Text variant="caption" color="$colorSecondary">Compact</Text>
      </VStack>
      <PageHeader
        title="Community Projects"
        subtitle="Track and manage community improvement projects across all districts."
        variant="compact"
      />

      <VStack padding="$4">
        <SectionLabel>Without Border</SectionLabel>
      </VStack>

      <PageHeader
        title="Settings"
        subtitle="Manage your account preferences and notification settings."
        bordered={false}
      />
    </VStack>
  ),
}
