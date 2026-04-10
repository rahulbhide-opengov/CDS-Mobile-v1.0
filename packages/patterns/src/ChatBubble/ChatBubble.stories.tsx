import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { ChatBubble, type ChatBubbleProps } from './ChatBubble'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof ChatBubble> = {
  title: 'Patterns/ChatBubble',
  component: ChatBubble,
  argTypes: {
    sender: {
      control: 'select',
      options: ['user', 'assistant'],
    },
    status: {
      control: 'select',
      options: ['sending', 'sent', 'delivered', 'read'],
    },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ChatBubble>

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
// Helper: Placeholder avatar
// ---------------------------------------------------------------------------

function PlaceholderAvatar({ label = 'AI' }: { label?: string }) {
  return (
    <Box
      width={28}
      height={28}
      borderRadius={14}
      backgroundColor="#4B3FFF"
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="caption" color="white" fontWeight="$bold" fontSize={10}>
        {label}
      </Text>
    </Box>
  )
}

// ---------------------------------------------------------------------------
// 1. UserMessage
// ---------------------------------------------------------------------------

export const UserMessage: Story = {
  name: 'User Message',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>User Message</SectionLabel>
      <ChatBubble
        message="Hey, can you help me find the budget report for Q4?"
        sender="user"
        status="sent"
      />
      <ChatBubble
        message="I need it by end of day if possible."
        sender="user"
        status="delivered"
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 2. AssistantMessage
// ---------------------------------------------------------------------------

export const AssistantMessage: Story = {
  name: 'Assistant Message',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Assistant Message</SectionLabel>
      <ChatBubble
        message="Of course! I found the Q4 budget report. It was last updated on March 15, 2026."
        sender="assistant"
      />
      <ChatBubble
        message="Here is a brief summary: Total expenditure was $2.4M, which is 3% under budget."
        sender="assistant"
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 3. WithTimestamp
// ---------------------------------------------------------------------------

export const WithTimestamp: Story = {
  name: 'With Timestamp',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Messages with Timestamps</SectionLabel>
      <ChatBubble
        message="What is the status of the downtown park project?"
        sender="user"
        timestamp="2:34 PM"
        status="read"
      />
      <ChatBubble
        message="The downtown park project is currently in the review phase. The planning commission approved the initial proposal last Tuesday."
        sender="assistant"
        timestamp="2:35 PM"
      />
      <ChatBubble
        message="Thanks! When is the next review meeting?"
        sender="user"
        timestamp="2:36 PM"
        status="sent"
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 4. WithAvatar
// ---------------------------------------------------------------------------

export const WithAvatar: Story = {
  name: 'With Avatar',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Assistant Messages with Avatar</SectionLabel>
      <ChatBubble
        message="Hello! I'm OG Assist. How can I help you today?"
        sender="assistant"
        avatar={<PlaceholderAvatar />}
        timestamp="9:00 AM"
      />
      <ChatBubble
        message="I can help you search records, pull reports, or answer questions about your data."
        sender="assistant"
        avatar={<PlaceholderAvatar />}
        timestamp="9:00 AM"
      />

      <SectionLabel>Without Avatar (alignment preserved)</SectionLabel>
      <ChatBubble
        message="This assistant message has no avatar but keeps consistent left alignment."
        sender="assistant"
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 5. TypingIndicator
// ---------------------------------------------------------------------------

export const TypingIndicator: Story = {
  name: 'Typing Indicator',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>Typing Indicator</SectionLabel>
      <ChatBubble
        message=""
        sender="assistant"
        loading
        avatar={<PlaceholderAvatar />}
      />

      <SectionLabel>Typing Indicator without Avatar</SectionLabel>
      <ChatBubble
        message=""
        sender="assistant"
        loading
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. MessageStatuses
// ---------------------------------------------------------------------------

export const MessageStatuses: Story = {
  name: 'Message Statuses',
  render: () => (
    <VStack gap="$4" padding="$4">
      <SectionLabel>All Delivery Statuses</SectionLabel>

      <VStack gap="$2">
        <Text variant="caption" color="$colorSecondary">Sending (dimmed)</Text>
        <ChatBubble
          message="This message is being sent..."
          sender="user"
          status="sending"
          timestamp="3:01 PM"
        />
      </VStack>

      <VStack gap="$2">
        <Text variant="caption" color="$colorSecondary">Sent (single check)</Text>
        <ChatBubble
          message="This message has been sent to the server."
          sender="user"
          status="sent"
          timestamp="3:02 PM"
        />
      </VStack>

      <VStack gap="$2">
        <Text variant="caption" color="$colorSecondary">Delivered (double check)</Text>
        <ChatBubble
          message="This message was delivered to the recipient."
          sender="user"
          status="delivered"
          timestamp="3:03 PM"
        />
      </VStack>

      <VStack gap="$2">
        <Text variant="caption" color="$colorSecondary">Read (blue double check)</Text>
        <ChatBubble
          message="This message has been read by the recipient."
          sender="user"
          status="read"
          timestamp="3:04 PM"
        />
      </VStack>
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 7. Conversation
// ---------------------------------------------------------------------------

export const Conversation: Story = {
  name: 'Conversation',
  render: () => (
    <VStack gap="$1" padding="$4" backgroundColor="#FFFFFF">
      <SectionLabel>Full Conversation</SectionLabel>
      <VStack gap="$0.5" marginTop="$3">
        <ChatBubble
          message="Hi there! I need help finding the latest permit applications for the Cedar Grove neighborhood."
          sender="user"
          timestamp="10:00 AM"
          status="read"
        />
        <ChatBubble
          message="I found 12 permit applications for Cedar Grove filed in the last 30 days. Would you like me to filter by type?"
          sender="assistant"
          timestamp="10:01 AM"
          avatar={<PlaceholderAvatar />}
        />
        <ChatBubble
          message="Yes, just show me building permits please."
          sender="user"
          timestamp="10:01 AM"
          status="read"
        />
        <ChatBubble
          message="There are 5 building permits for Cedar Grove:"
          sender="assistant"
          timestamp="10:02 AM"
          avatar={<PlaceholderAvatar />}
        />
        <ChatBubble
          message="1. 142 Oak St -- New construction (approved)
2. 88 Pine Ave -- Addition (under review)
3. 310 Elm Dr -- Renovation (approved)
4. 27 Maple Ln -- Demolition (pending)
5. 501 Birch Ct -- Commercial build (under review)"
          sender="assistant"
          timestamp="10:02 AM"
          avatar={<PlaceholderAvatar />}
        />
        <ChatBubble
          message="Can you export these to a spreadsheet?"
          sender="user"
          timestamp="10:03 AM"
          status="delivered"
        />
        <ChatBubble
          message=""
          sender="assistant"
          loading
          avatar={<PlaceholderAvatar />}
        />
      </VStack>
    </VStack>
  ),
}
