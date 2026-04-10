import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Text, VStack } from '@opengov/cds-primitives'

function WelcomeScreen() {
  return (
    <VStack padding="$6" gap="$4" flex={1} justifyContent="center" alignItems="center">
      <Text variant="display4" align="center">
        CDS Mobile
      </Text>
      <Text variant="h3" align="center" color="$brandBackground">
        OpenGov Design System
      </Text>
      <Text variant="body1" align="center" secondary>
        A React Native component library based on CDS 37
      </Text>
      <Text variant="body2" align="center" secondary>
        Browse components in the sidebar to get started.
      </Text>
    </VStack>
  )
}

const meta: Meta<typeof WelcomeScreen> = {
  title: 'Welcome',
  component: WelcomeScreen,
}

export default meta
type Story = StoryObj<typeof WelcomeScreen>

export const Default: Story = {}
