import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { DeleteIcon } from '@opengov/cds-icons'
import { Dialog, type DialogProps } from './Dialog'
import { Button } from '../Button'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Dialog> = {
  title: 'Overlays/Dialog',
  component: Dialog,
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
// 1. SimpleAlert -- basic alert dialog with a title and action buttons
// ---------------------------------------------------------------------------

function SimpleAlertInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Simple Alert Dialog</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A minimal alert with a title and two action buttons.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Alert
      </Button>

      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Discard Changes?"
        actions={
          <>
            <Button variant="tertiaryAlt" size="sm" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onPress={() => setVisible(false)}>
              Discard
            </Button>
          </>
        }
      />
    </VStack>
  )
}

export const SimpleAlert: StoryObj = {
  name: 'Simple Alert',
  render: () => <SimpleAlertInteractive />,
}

// ---------------------------------------------------------------------------
// 2. WithDescription -- dialog with title + description text
// ---------------------------------------------------------------------------

function WithDescriptionInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Dialog with Description</SectionLabel>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Dialog
      </Button>

      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Submit Application?"
        description="Once submitted, you will not be able to edit the application. The review process takes 5-7 business days."
        actions={
          <>
            <Button variant="tertiaryAlt" size="sm" onPress={() => setVisible(false)}>
              Go Back
            </Button>
            <Button variant="primary" size="sm" onPress={() => setVisible(false)}>
              Submit
            </Button>
          </>
        }
      />
    </VStack>
  )
}

export const WithDescription: StoryObj = {
  name: 'With Description',
  render: () => <WithDescriptionInteractive />,
}

// ---------------------------------------------------------------------------
// 3. SmallDialog -- size="sm" (280px width)
// ---------------------------------------------------------------------------

function SmallDialogInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Small Dialog (280px)</SectionLabel>

      <Button variant="secondary" onPress={() => setVisible(true)}>
        Show Small Dialog
      </Button>

      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirm"
        description="Are you sure?"
        size="sm"
        actions={
          <>
            <Button variant="tertiaryAlt" size="sm" onPress={() => setVisible(false)}>
              No
            </Button>
            <Button variant="primary" size="sm" onPress={() => setVisible(false)}>
              Yes
            </Button>
          </>
        }
      />
    </VStack>
  )
}

export const SmallDialog: StoryObj = {
  name: 'Small Dialog',
  render: () => <SmallDialogInteractive />,
}

// ---------------------------------------------------------------------------
// 4. LargeDialog -- size="lg" (400px width)
// ---------------------------------------------------------------------------

function LargeDialogInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Large Dialog (400px)</SectionLabel>

      <Button variant="secondary" onPress={() => setVisible(true)}>
        Show Large Dialog
      </Button>

      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Terms and Conditions"
        description="By proceeding, you agree to the terms of service and privacy policy for the Community Development Block Grant program. This agreement is binding and covers data handling, reporting requirements, and fund usage compliance."
        size="lg"
        actions={
          <>
            <Button variant="tertiaryAlt" size="sm" onPress={() => setVisible(false)}>
              Decline
            </Button>
            <Button variant="primary" size="sm" onPress={() => setVisible(false)}>
              Accept
            </Button>
          </>
        }
      />
    </VStack>
  )
}

export const LargeDialog: StoryObj = {
  name: 'Large Dialog',
  render: () => <LargeDialogInteractive />,
}

// ---------------------------------------------------------------------------
// 5. CustomContent -- dialog with arbitrary children between desc and actions
// ---------------------------------------------------------------------------

function CustomContentInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Custom Content</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The children prop renders between description and actions.
      </Text>

      <Button variant="primary" onPress={() => setVisible(true)}>
        Show Custom Dialog
      </Button>

      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Select Priority"
        description="Choose a priority level for the new inspection."
        actions={
          <>
            <Button variant="tertiaryAlt" size="sm" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onPress={() => setVisible(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <VStack gap="$2" marginTop="$2">
          {['Low', 'Medium', 'High', 'Critical'].map((priority) => (
            <Box
              key={priority}
              padding="$3"
              backgroundColor="$backgroundStrong"
              borderRadius="$md"
            >
              <Text variant="body2">{priority}</Text>
            </Box>
          ))}
        </VStack>
      </Dialog>
    </VStack>
  )
}

export const CustomContent: StoryObj = {
  name: 'Custom Content',
  render: () => <CustomContentInteractive />,
}

// ---------------------------------------------------------------------------
// 6. ConfirmDelete -- destructive action confirmation pattern
// ---------------------------------------------------------------------------

function ConfirmDeleteInteractive() {
  const [visible, setVisible] = useState(false)

  return (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Confirm Delete (Destructive)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        A destructive confirmation dialog with a red delete button.
      </Text>

      <Button
        variant="destructive"
        iconLeft={<DeleteIcon size="md" color="white" />}
        onPress={() => setVisible(true)}
      >
        Delete Record
      </Button>

      <Dialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Delete Record?"
        description="This action cannot be undone. The record and all associated attachments, notes, and history will be permanently removed."
        actions={
          <>
            <Button variant="tertiaryAlt" size="sm" onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onPress={() => setVisible(false)}>
              Delete
            </Button>
          </>
        }
      />
    </VStack>
  )
}

export const ConfirmDelete: StoryObj = {
  name: 'Confirm Delete',
  render: () => <ConfirmDeleteInteractive />,
}
