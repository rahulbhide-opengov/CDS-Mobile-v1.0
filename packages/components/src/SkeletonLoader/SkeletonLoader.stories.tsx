import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { SkeletonLoader, type SkeletonLoaderProps } from './SkeletonLoader'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof SkeletonLoader> = {
  title: 'Feedback/SkeletonLoader',
  component: SkeletonLoader,
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
// 1. TextLines -- text-shaped skeletons with varying widths
// ---------------------------------------------------------------------------

export const TextLines: StoryObj = {
  name: 'Text Lines',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Text Skeleton</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Mimics lines of text with small border radius and 16px default height.
      </Text>

      <VStack gap="$2">
        <SkeletonLoader variant="text" width="100%" />
        <SkeletonLoader variant="text" width="85%" />
        <SkeletonLoader variant="text" width="70%" />
      </VStack>

      <SectionLabel>Multiple Lines (count=4)</SectionLabel>

      <SkeletonLoader variant="text" count={4} />

      <SectionLabel>Custom Height Text</SectionLabel>

      <VStack gap="$2">
        <SkeletonLoader variant="text" height={24} width="60%" />
        <SkeletonLoader variant="text" height={16} width="100%" />
        <SkeletonLoader variant="text" height={16} width="90%" />
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. CircularAvatar -- circular skeleton for avatars / profile images
// ---------------------------------------------------------------------------

export const CircularAvatar: StoryObj = {
  name: 'Circular Avatar',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Circular Skeleton</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Circular variant defaults to a square dimension. Use for avatars and
        profile pictures.
      </Text>

      <HStack gap="$4" alignItems="center">
        <SkeletonLoader variant="circular" width={32} height={32} />
        <SkeletonLoader variant="circular" width={40} height={40} />
        <SkeletonLoader variant="circular" width={48} height={48} />
        <SkeletonLoader variant="circular" width={64} height={64} />
      </HStack>

      <SectionLabel>Avatar + Text Composition</SectionLabel>

      <HStack gap="$3" alignItems="center">
        <SkeletonLoader variant="circular" width={48} height={48} />
        <VStack gap="$2" flex={1}>
          <SkeletonLoader variant="text" width="60%" />
          <SkeletonLoader variant="text" width="40%" />
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. RectangularCard -- rectangular skeleton for images / cards
// ---------------------------------------------------------------------------

export const RectangularCard: StoryObj = {
  name: 'Rectangular Card',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Rectangular Skeleton</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Uses small border radius (4px). Default height is 80px.
      </Text>

      <SkeletonLoader variant="rectangular" />

      <SectionLabel>Custom Dimensions</SectionLabel>

      <SkeletonLoader variant="rectangular" width="100%" height={120} />

      <SectionLabel>Image Placeholder</SectionLabel>

      <SkeletonLoader variant="rectangular" width={200} height={150} />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. RoundedChip -- rounded skeleton for chips and tags
// ---------------------------------------------------------------------------

export const RoundedChip: StoryObj = {
  name: 'Rounded Chip',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Rounded Skeleton</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Uses 12px border radius. Default height is 80px.
      </Text>

      <SkeletonLoader variant="rounded" />

      <SectionLabel>Chip-Sized Rounded Skeletons</SectionLabel>

      <HStack gap="$2" flexWrap="wrap">
        <SkeletonLoader variant="rounded" width={80} height={32} />
        <SkeletonLoader variant="rounded" width={100} height={32} />
        <SkeletonLoader variant="rounded" width={60} height={32} />
        <SkeletonLoader variant="rounded" width={90} height={32} />
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. MultipleCount -- using count for repeated skeleton items
// ---------------------------------------------------------------------------

export const MultipleCount: StoryObj = {
  name: 'Multiple (count)',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>count=3 (Text)</SectionLabel>
      <SkeletonLoader variant="text" count={3} />

      <SectionLabel>count=5 (Text, custom spacing)</SectionLabel>
      <SkeletonLoader variant="text" count={5} spacing={12} />

      <SectionLabel>count=3 (Rectangular)</SectionLabel>
      <SkeletonLoader variant="rectangular" count={3} height={60} spacing={12} />

      <SectionLabel>count=4 (Rounded Chips)</SectionLabel>
      <SkeletonLoader variant="rounded" count={4} height={36} spacing={8} />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. WaveAnimation -- shimmer/wave animation style
// ---------------------------------------------------------------------------

export const WaveAnimation: StoryObj = {
  name: 'Wave Animation',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Wave (Shimmer) Animation</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A translucent highlight bar slides across the skeleton shape,
        simulating a shimmer loading effect.
      </Text>

      <VStack gap="$3">
        <SkeletonLoader variant="text" animation="wave" width="100%" />
        <SkeletonLoader variant="text" animation="wave" width="85%" />
        <SkeletonLoader variant="text" animation="wave" width="70%" />
      </VStack>

      <SkeletonLoader variant="rectangular" animation="wave" height={120} />

      <HStack gap="$3" alignItems="center">
        <SkeletonLoader variant="circular" animation="wave" width={48} height={48} />
        <VStack gap="$2" flex={1}>
          <SkeletonLoader variant="text" animation="wave" width="60%" />
          <SkeletonLoader variant="text" animation="wave" width="40%" />
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. PulseAnimation -- opacity pulse animation style
// ---------------------------------------------------------------------------

export const PulseAnimation: StoryObj = {
  name: 'Pulse Animation',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Pulse Animation (Default)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Opacity fades between 0.3 and 1.0 in a continuous loop.
      </Text>

      <VStack gap="$3">
        <SkeletonLoader variant="text" animation="pulse" width="100%" />
        <SkeletonLoader variant="text" animation="pulse" width="85%" />
        <SkeletonLoader variant="text" animation="pulse" width="70%" />
      </VStack>

      <SkeletonLoader variant="rectangular" animation="pulse" height={120} />

      <HStack gap="$3" alignItems="center">
        <SkeletonLoader variant="circular" animation="pulse" width={48} height={48} />
        <VStack gap="$2" flex={1}>
          <SkeletonLoader variant="text" animation="pulse" width="60%" />
          <SkeletonLoader variant="text" animation="pulse" width="40%" />
        </VStack>
      </HStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 8. CardSkeleton -- composed card loading placeholder
// ---------------------------------------------------------------------------

export const CardSkeleton: StoryObj = {
  name: 'Card Skeleton (Composed)',
  render: () => (
    <VStack gap="$6" padding="$4">
      <SectionLabel>Card Loading State</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A realistic card skeleton composed from multiple SkeletonLoader
        elements to represent a loading card UI.
      </Text>

      {/* Single card skeleton */}
      <Box
        padding="$4"
        borderRadius="$md"
        borderWidth={1}
        borderColor="$borderColor"
        gap="$3"
      >
        {/* Image placeholder */}
        <SkeletonLoader variant="rectangular" height={160} animation="wave" />

        {/* Title line */}
        <SkeletonLoader variant="text" width="70%" height={20} animation="wave" />

        {/* Description lines */}
        <VStack gap="$1">
          <SkeletonLoader variant="text" width="100%" animation="wave" />
          <SkeletonLoader variant="text" width="90%" animation="wave" />
          <SkeletonLoader variant="text" width="60%" animation="wave" />
        </VStack>

        {/* Footer: avatar + text */}
        <HStack gap="$3" alignItems="center" marginTop="$2">
          <SkeletonLoader variant="circular" width={36} height={36} animation="wave" />
          <VStack gap="$1" flex={1}>
            <SkeletonLoader variant="text" width="40%" animation="wave" />
            <SkeletonLoader variant="text" width="25%" height={12} animation="wave" />
          </VStack>
        </HStack>
      </Box>

      <SectionLabel>List Loading State</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Multiple list-item skeletons stacked vertically.
      </Text>

      <VStack gap="$3">
        {[1, 2, 3].map((i) => (
          <HStack key={i} gap="$3" alignItems="center" padding="$2">
            <SkeletonLoader variant="circular" width={44} height={44} animation="pulse" />
            <VStack gap="$2" flex={1}>
              <SkeletonLoader variant="text" width="55%" height={18} animation="pulse" />
              <SkeletonLoader variant="text" width="80%" animation="pulse" />
            </VStack>
            <SkeletonLoader variant="rounded" width={60} height={28} animation="pulse" />
          </HStack>
        ))}
      </VStack>
    </VStack>
  ),
}
