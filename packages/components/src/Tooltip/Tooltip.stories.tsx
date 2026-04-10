import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { Tooltip, type TooltipProps } from './Tooltip'
import { Button } from '../Button'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
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
// 1. AllPlacements -- top, bottom, left, right
// ---------------------------------------------------------------------------

export const AllPlacements: StoryObj = {
  name: 'All Placements',
  render: () => (
    <VStack gap="$8" padding="$6" alignItems="center">
      <SectionLabel>Tooltip Placements</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Long-press each button to show the tooltip. Tap to dismiss.
      </Text>

      {/* Top placement */}
      <VStack alignItems="center" gap="$2" marginTop="$6">
        <Text variant="caption" color="$colorSecondary">placement="top"</Text>
        <Tooltip content="This tooltip appears above the element" placement="top">
          <Button variant="secondary" size="sm">
            Top
          </Button>
        </Tooltip>
      </VStack>

      {/* Left and Right in a row */}
      <HStack gap="$8" alignItems="center">
        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">placement="left"</Text>
          <Tooltip content="Left tooltip" placement="left">
            <Button variant="secondary" size="sm">
              Left
            </Button>
          </Tooltip>
        </VStack>

        <VStack alignItems="center" gap="$2">
          <Text variant="caption" color="$colorSecondary">placement="right"</Text>
          <Tooltip content="Right tooltip" placement="right">
            <Button variant="secondary" size="sm">
              Right
            </Button>
          </Tooltip>
        </VStack>
      </HStack>

      {/* Bottom placement */}
      <VStack alignItems="center" gap="$2">
        <Text variant="caption" color="$colorSecondary">placement="bottom"</Text>
        <Tooltip content="This tooltip appears below the element" placement="bottom">
          <Button variant="secondary" size="sm">
            Bottom
          </Button>
        </Tooltip>
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. Default -- top tooltip on a button (common usage pattern)
// ---------------------------------------------------------------------------

export const Default: StoryObj = {
  name: 'Default (Top)',
  render: () => (
    <VStack gap="$4" padding="$6" alignItems="center">
      <SectionLabel>Default Tooltip</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Long-press the button to reveal the tooltip. It auto-dismisses after
        3 seconds.
      </Text>

      <VStack alignItems="center" marginTop="$6">
        <Tooltip
          content="Save your changes before navigating away"
          placement="top"
        >
          <Button variant="primary">
            Save Changes
          </Button>
        </Tooltip>
      </VStack>

      <SectionLabel>On an Icon Button</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tooltips are useful for providing context on icon-only buttons.
      </Text>

      <HStack gap="$4" marginTop="$4">
        <Tooltip content="Edit this record" placement="bottom">
          <Button variant="secondary" size="sm">
            Edit
          </Button>
        </Tooltip>

        <Tooltip content="Share via link" placement="bottom">
          <Button variant="secondary" size="sm">
            Share
          </Button>
        </Tooltip>

        <Tooltip content="Permanently delete" placement="bottom">
          <Button variant="destructiveAlt" size="sm">
            Delete
          </Button>
        </Tooltip>
      </HStack>
    </VStack>
  ),
}
