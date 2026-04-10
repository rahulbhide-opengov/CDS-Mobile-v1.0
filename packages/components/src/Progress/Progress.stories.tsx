import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { CircularProgress, type CircularProgressProps } from './CircularProgress'
import { LinearProgress, type LinearProgressProps } from './LinearProgress'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Feedback/Progress',
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

// ===========================================================================
// Circular Progress Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 1. CircularIndeterminate -- spinning loader without a value
// ---------------------------------------------------------------------------

export const CircularIndeterminate: StoryObj = {
  name: 'Circular -- Indeterminate',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Indeterminate Circular Progress</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        No value prop -- the spinner runs in a continuous loop.
      </Text>

      <HStack gap="$6" alignItems="center">
        <CircularProgress size="sm" />
        <CircularProgress size="md" />
        <CircularProgress size="lg" />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. CircularDeterminate -- fixed progress values
// ---------------------------------------------------------------------------

export const CircularDeterminate: StoryObj = {
  name: 'Circular -- Determinate',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Determinate Circular Progress</SectionLabel>

      <HStack gap="$6" alignItems="center">
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={0} size="md" />
          <Text variant="caption" color="$colorSecondary">0%</Text>
        </VStack>
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={25} size="md" />
          <Text variant="caption" color="$colorSecondary">25%</Text>
        </VStack>
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={50} size="md" />
          <Text variant="caption" color="$colorSecondary">50%</Text>
        </VStack>
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={75} size="md" />
          <Text variant="caption" color="$colorSecondary">75%</Text>
        </VStack>
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={100} size="md" />
          <Text variant="caption" color="$colorSecondary">100%</Text>
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. CircularAllSizes -- sm, md, lg comparison
// ---------------------------------------------------------------------------

export const CircularAllSizes: StoryObj = {
  name: 'Circular -- All Sizes',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      <HStack gap="$6" alignItems="center">
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={65} size="sm" />
          <Text variant="caption" color="$colorSecondary">sm (24px)</Text>
        </VStack>
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={65} size="md" />
          <Text variant="caption" color="$colorSecondary">md (36px)</Text>
        </VStack>
        <VStack alignItems="center" gap="$2">
          <CircularProgress value={65} size="lg" />
          <Text variant="caption" color="$colorSecondary">lg (48px)</Text>
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. CircularAllColors -- all semantic color options
// ---------------------------------------------------------------------------

export const CircularAllColors: StoryObj = {
  name: 'Circular -- All Colors',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Color Variants</SectionLabel>

      <HStack gap="$6" alignItems="center" flexWrap="wrap">
        {(['primary', 'success', 'error', 'warning', 'neutral'] as const).map((color) => (
          <VStack key={color} alignItems="center" gap="$2">
            <CircularProgress value={70} size="lg" color={color} />
            <Text variant="caption" color="$colorSecondary">{color}</Text>
          </VStack>
        ))}
      </HStack>

      <SectionLabel>Indeterminate -- All Colors</SectionLabel>

      <HStack gap="$6" alignItems="center" flexWrap="wrap">
        {(['primary', 'success', 'error', 'warning', 'neutral'] as const).map((color) => (
          <VStack key={color} alignItems="center" gap="$2">
            <CircularProgress size="md" color={color} />
            <Text variant="caption" color="$colorSecondary">{color}</Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. CircularWithValue -- showValue displays percentage in center
// ---------------------------------------------------------------------------

export const CircularWithValue: StoryObj = {
  name: 'Circular -- With Value Label',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Center Value Display</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The showValue prop renders the numeric percentage inside the circle.
      </Text>

      <HStack gap="$6" alignItems="center">
        <CircularProgress value={25} size="md" showValue />
        <CircularProgress value={50} size="lg" showValue />
        <CircularProgress value={88} size="lg" showValue color="success" />
        <CircularProgress value={100} size="lg" showValue color="success" />
      </HStack>
    </VStack>
  ),
}

// ===========================================================================
// Linear Progress Stories
// ===========================================================================

// ---------------------------------------------------------------------------
// 6. LinearIndeterminate -- sliding animation without a value
// ---------------------------------------------------------------------------

export const LinearIndeterminate: StoryObj = {
  name: 'Linear -- Indeterminate',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Indeterminate Linear Progress</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A sliding bar animates across the track continuously.
      </Text>

      <VStack gap="$3">
        <LinearProgress size="sm" />
        <LinearProgress size="md" />
        <LinearProgress size="lg" />
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. LinearDeterminate -- fixed progress values
// ---------------------------------------------------------------------------

export const LinearDeterminate: StoryObj = {
  name: 'Linear -- Determinate',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Determinate Linear Progress</SectionLabel>

      <VStack gap="$3">
        {[0, 25, 50, 75, 100].map((v) => (
          <VStack key={v} gap="$1">
            <Text variant="caption" color="$colorSecondary">{v}%</Text>
            <LinearProgress value={v} size="md" />
          </VStack>
        ))}
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 8. LinearAllSizes -- sm, md, lg track heights
// ---------------------------------------------------------------------------

export const LinearAllSizes: StoryObj = {
  name: 'Linear -- All Sizes',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Size Comparison</SectionLabel>

      <VStack gap="$3">
        <VStack gap="$1">
          <Text variant="caption" color="$colorSecondary">sm (2px track)</Text>
          <LinearProgress value={60} size="sm" />
        </VStack>
        <VStack gap="$1">
          <Text variant="caption" color="$colorSecondary">md (4px track -- default)</Text>
          <LinearProgress value={60} size="md" />
        </VStack>
        <VStack gap="$1">
          <Text variant="caption" color="$colorSecondary">lg (8px track)</Text>
          <LinearProgress value={60} size="lg" />
        </VStack>
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 9. LinearAllColors -- all semantic color options
// ---------------------------------------------------------------------------

export const LinearAllColors: StoryObj = {
  name: 'Linear -- All Colors',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Color Variants</SectionLabel>

      <VStack gap="$3">
        {(['primary', 'success', 'error', 'warning', 'neutral'] as const).map((color) => (
          <VStack key={color} gap="$1">
            <Text variant="caption" color="$colorSecondary">{color}</Text>
            <LinearProgress value={65} size="lg" color={color} />
          </VStack>
        ))}
      </VStack>

      <SectionLabel>Indeterminate -- All Colors</SectionLabel>

      <VStack gap="$3">
        {(['primary', 'success', 'error', 'warning', 'neutral'] as const).map((color) => (
          <VStack key={color} gap="$1">
            <Text variant="caption" color="$colorSecondary">{color}</Text>
            <LinearProgress size="md" color={color} />
          </VStack>
        ))}
      </VStack>
    </VStack>
  ),
}
