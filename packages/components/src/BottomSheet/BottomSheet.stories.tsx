import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { BottomSheet, type BottomSheetProps } from './BottomSheet'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof BottomSheet> = {
  title: 'Overlays/BottomSheet',
  component: BottomSheet,
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
// 1. HalfSheet -- interactive half-height bottom sheet
// ---------------------------------------------------------------------------

function HalfSheetInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Half Sheet (50% height)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap the button to open the bottom sheet. Swipe down or tap backdrop to
        dismiss.
      </Text>

      <Box
        backgroundColor="$brandBackground"
        padding="$3"
        borderRadius="$md"
        alignItems="center"
        onPress={() => setVisible(true)}
      >
        <Text color="white" fontWeight="$medium">Open Half Sheet</Text>
      </Box>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoint="half"
      >
        <VStack padding="$4" gap="$3">
          <Text variant="h4">Half Sheet</Text>
          <Text variant="body2" color="$colorSecondary">
            This sheet occupies 50% of the screen height. It supports
            swipe-down-to-dismiss and backdrop press to close.
          </Text>
          <Text variant="body2" color="$colorSecondary">
            Use for quick actions, selection lists, or supplemental content
            that does not require the full screen.
          </Text>
        </VStack>
      </BottomSheet>
    </VStack>
  )
}

export const HalfSheet: StoryObj = {
  name: 'Half Sheet',
  render: () => <HalfSheetInteractive />,
}

// ---------------------------------------------------------------------------
// 2. ThreeQuarterSheet -- 75% height
// ---------------------------------------------------------------------------

function ThreeQuarterSheetInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Three-Quarter Sheet (75% height)</SectionLabel>

      <Box
        backgroundColor="$brandBackground"
        padding="$3"
        borderRadius="$md"
        alignItems="center"
        onPress={() => setVisible(true)}
      >
        <Text color="white" fontWeight="$medium">Open Three-Quarter Sheet</Text>
      </Box>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoint="threeQuarter"
      >
        <VStack padding="$4" gap="$3">
          <Text variant="h4">Three-Quarter Sheet</Text>
          <Text variant="body2" color="$colorSecondary">
            This sheet occupies 75% of the screen. Suitable for forms, long
            lists, or detail views that need more vertical space.
          </Text>
        </VStack>
      </BottomSheet>
    </VStack>
  )
}

export const ThreeQuarterSheet: StoryObj = {
  name: 'Three-Quarter Sheet',
  render: () => <ThreeQuarterSheetInteractive />,
}

// ---------------------------------------------------------------------------
// 3. FullSheet -- 90% height (near full screen)
// ---------------------------------------------------------------------------

function FullSheetInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Full Sheet (90% height)</SectionLabel>

      <Box
        backgroundColor="$brandBackground"
        padding="$3"
        borderRadius="$md"
        alignItems="center"
        onPress={() => setVisible(true)}
      >
        <Text color="white" fontWeight="$medium">Open Full Sheet</Text>
      </Box>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoint="full"
      >
        <VStack padding="$4" gap="$3">
          <Text variant="h4">Full Sheet</Text>
          <Text variant="body2" color="$colorSecondary">
            This sheet occupies 90% of the screen height. Use for complex
            workflows, multi-step forms, or content that requires near-full
            screen real estate.
          </Text>
        </VStack>
      </BottomSheet>
    </VStack>
  )
}

export const FullSheet: StoryObj = {
  name: 'Full Sheet',
  render: () => <FullSheetInteractive />,
}

// ---------------------------------------------------------------------------
// 4. WithoutHandle -- sheet without the drag handle bar
// ---------------------------------------------------------------------------

function WithoutHandleInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Without Handle</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The drag handle bar is hidden. Dismissal relies on backdrop press or
        the swipe gesture.
      </Text>

      <Box
        backgroundColor="$brandBackground"
        padding="$3"
        borderRadius="$md"
        alignItems="center"
        onPress={() => setVisible(true)}
      >
        <Text color="white" fontWeight="$medium">Open (No Handle)</Text>
      </Box>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoint="half"
        showHandle={false}
      >
        <VStack padding="$4" gap="$3">
          <Text variant="h4">No Handle Bar</Text>
          <Text variant="body2" color="$colorSecondary">
            This sheet has showHandle set to false. The user can still dismiss
            by swiping down or pressing the backdrop.
          </Text>
        </VStack>
      </BottomSheet>
    </VStack>
  )
}

export const WithoutHandle: StoryObj = {
  name: 'Without Handle',
  render: () => <WithoutHandleInteractive />,
}

// ---------------------------------------------------------------------------
// 5. SheetContent -- example with list-style content inside the sheet
// ---------------------------------------------------------------------------

function SheetContentInteractive() {
  const [visible, setVisible] = useState(false)

  const listItems = [
    { label: 'View Details', subtitle: 'Open the full record' },
    { label: 'Edit Record', subtitle: 'Modify fields and attachments' },
    { label: 'Share Link', subtitle: 'Copy a shareable URL' },
    { label: 'Download PDF', subtitle: 'Export as a PDF document' },
    { label: 'Print', subtitle: 'Send to a connected printer' },
    { label: 'Archive', subtitle: 'Move to the archive folder' },
  ]

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Sheet with List Content</SectionLabel>

      <Box
        backgroundColor="$brandBackground"
        padding="$3"
        borderRadius="$md"
        alignItems="center"
        onPress={() => setVisible(true)}
      >
        <Text color="white" fontWeight="$medium">Open Content Sheet</Text>
      </Box>

      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        snapPoint="threeQuarter"
      >
        <VStack padding="$4" gap="$2">
          <Text variant="h4">Actions</Text>
          <Text variant="caption" color="$colorSecondary">
            Select an action to perform on this record.
          </Text>

          <VStack gap="$1" marginTop="$3">
            {listItems.map((item, index) => (
              <Box
                key={index}
                padding="$3"
                borderRadius="$md"
                backgroundColor="$backgroundStrong"
              >
                <Text variant="body2" fontWeight="$medium">
                  {item.label}
                </Text>
                <Text variant="caption" color="$colorSecondary">
                  {item.subtitle}
                </Text>
              </Box>
            ))}
          </VStack>
        </VStack>
      </BottomSheet>
    </VStack>
  )
}

export const SheetContent: StoryObj = {
  name: 'Sheet with Content',
  render: () => <SheetContentInteractive />,
}
