import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { CdsProvider, type CdsTheme } from '@opengov/cds-config'
import { Text, VStack, HStack, Box } from '@opengov/cds-primitives'
import { Button } from '@opengov/cds-components'
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  CheckCircleIcon,
  WarningIcon,
} from '@opengov/cds-icons'

export default function App() {
  const [theme, setTheme] = useState<CdsTheme>('light')

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light')
  }

  return (
    <CdsProvider theme={theme}>
      <ScrollView style={{ flex: 1 }}>
        <VStack padding="$6" gap="$6" paddingTop="$16">
          <Text variant="display4">CDS Mobile</Text>
          <Text variant="body1" secondary>Development Playground</Text>

          {/* Theme Toggle */}
          <Button variant="secondary" onPress={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
          </Button>

          {/* Typography Samples */}
          <VStack gap="$2">
            <Text variant="h3">Typography</Text>
            <Text variant="display4">Display 4</Text>
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body1">Body 1 — Primary text</Text>
            <Text variant="body2">Body 2 — Secondary text</Text>
            <Text variant="caption">Caption text</Text>
            <Text variant="overline">Overline</Text>
          </VStack>

          {/* Button Variants */}
          <VStack gap="$3">
            <Text variant="h3">Buttons</Text>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </VStack>

          {/* Button Sizes */}
          <VStack gap="$3">
            <Text variant="h3">Button Sizes</Text>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </VStack>

          {/* Icons */}
          <VStack gap="$3">
            <Text variant="h3">Icons</Text>
            <HStack gap="$4">
              <HomeIcon size="sm" />
              <SearchIcon size="md" />
              <SettingsIcon size="lg" />
              <CheckCircleIcon size="xl" color="#4CAF50" />
              <WarningIcon size="xl" color="#FFA000" />
            </HStack>
          </VStack>

          <Box height={100} />
        </VStack>
      </ScrollView>
    </CdsProvider>
  )
}
