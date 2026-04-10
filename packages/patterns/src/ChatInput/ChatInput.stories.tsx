import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { ChatInput, type ChatInputProps } from './ChatInput'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof ChatInput> = {
  title: 'Patterns/ChatInput',
  component: ChatInput,
  argTypes: {
    disabled: { control: 'boolean' },
    showAttachment: { control: 'boolean' },
    maxLength: { control: 'number' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ChatInput>

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
// 1. Default -- interactive with useState
// ---------------------------------------------------------------------------

function DefaultChatInput() {
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = (message: string) => {
    setMessages((prev) => [...prev, message])
    setValue('')
  }

  return (
    <VStack gap="$4" flex={1}>
      <SectionLabel>Interactive Chat Input</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Type a message and press send. Sent messages appear below.
      </Text>

      {/* Sent messages log */}
      {messages.length > 0 && (
        <VStack gap="$2" padding="$3" backgroundColor="#F5F5F5" borderRadius={8}>
          <Text variant="caption" color="$colorSecondary" fontWeight="$semibold">
            Sent messages:
          </Text>
          {messages.map((msg, i) => (
            <Text key={i} variant="body3">
              {msg}
            </Text>
          ))}
        </VStack>
      )}

      <ChatInput
        value={value}
        onChangeText={setValue}
        onSend={handleSend}
        onAttach={() => {}}
        placeholder="Type a message..."
      />
    </VStack>
  )
}

export const Default: Story = {
  name: 'Default',
  render: () => <DefaultChatInput />,
}

// ---------------------------------------------------------------------------
// 2. WithAttachment -- shows attachment button callback
// ---------------------------------------------------------------------------

function WithAttachmentInput() {
  const [value, setValue] = useState('')
  const [attachmentCount, setAttachmentCount] = useState(0)

  return (
    <VStack gap="$4">
      <SectionLabel>With Attachment Button</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Tap the + button to simulate adding an attachment.
      </Text>

      {attachmentCount > 0 && (
        <Box padding="$3" backgroundColor="#EBF0FF" borderRadius={8}>
          <Text variant="body3" color="#1E55FF">
            {attachmentCount} attachment{attachmentCount !== 1 ? 's' : ''} added
          </Text>
        </Box>
      )}

      <ChatInput
        value={value}
        onChangeText={setValue}
        onSend={() => setValue('')}
        onAttach={() => setAttachmentCount((c) => c + 1)}
        showAttachment
        placeholder="Type or attach a file..."
      />
    </VStack>
  )
}

export const WithAttachment: Story = {
  name: 'With Attachment',
  render: () => <WithAttachmentInput />,
}

// ---------------------------------------------------------------------------
// 3. WithCharacterLimit
// ---------------------------------------------------------------------------

function CharacterLimitInput() {
  const [value, setValue] = useState('')

  return (
    <VStack gap="$4">
      <SectionLabel>Character Limit (150)</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        Counter appears when typing. Turns amber near the limit and red at the limit.
      </Text>

      <ChatInput
        value={value}
        onChangeText={setValue}
        onSend={() => setValue('')}
        maxLength={150}
        placeholder="Limited to 150 characters..."
        showAttachment={false}
      />
    </VStack>
  )
}

export const WithCharacterLimit: Story = {
  name: 'With Character Limit',
  render: () => <CharacterLimitInput />,
}

// ---------------------------------------------------------------------------
// 4. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <VStack gap="$4">
      <SectionLabel>Disabled State</SectionLabel>
      <Text variant="body3" color="$colorSecondary">
        The input and send button are both disabled. Attachment button is also dimmed.
      </Text>

      <ChatInput
        value=""
        onChangeText={() => {}}
        onSend={() => {}}
        onAttach={() => {}}
        disabled
        placeholder="Chat is unavailable..."
      />

      <SectionLabel>Disabled with Pre-filled Text</SectionLabel>
      <ChatInput
        value="This text was pre-filled but the input is now disabled."
        onChangeText={() => {}}
        onSend={() => {}}
        disabled
        showAttachment={false}
        placeholder="Disabled..."
      />
    </VStack>
  ),
}
