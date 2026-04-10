import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { SearchIcon, EditIcon, CloseIcon, SettingsIcon } from '@opengov/cds-icons'
import { TextField, type TextFieldProps } from './TextField'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof TextField> = {
  title: 'Form Controls/TextField',
  component: TextField,
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    multiline: { control: 'boolean' },
    clearable: { control: 'boolean' },
    secureTextEntry: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof TextField>

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="h4" color="$colorSecondary">
      {children}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// 1. Default
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'outlined',
    disabled: false,
    error: false,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <TextField {...args} value={value} onChangeText={setValue} />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 2. WithLabel
// ---------------------------------------------------------------------------

export const WithLabel: Story = {
  name: 'With Label',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Labeled Text Fields</SectionLabel>
        <TextField
          label="Full Name"
          placeholder="John Doe"
          value={value}
          onChangeText={setValue}
        />
        <TextField
          label="Email Address"
          placeholder="john@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value=""
          onChangeText={() => {}}
        />
        <TextField
          label="Phone Number"
          placeholder="(555) 000-0000"
          keyboardType="phone-pad"
          value=""
          onChangeText={() => {}}
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 3. WithHelperText
// ---------------------------------------------------------------------------

export const WithHelperText: Story = {
  name: 'With Helper Text',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Helper Text Below Input</SectionLabel>
        <TextField
          label="Username"
          placeholder="Choose a username"
          helperText="Must be between 3 and 20 characters"
          value={value}
          onChangeText={setValue}
        />
        <TextField
          label="Website"
          placeholder="https://example.com"
          helperText="Include the full URL with protocol"
          value=""
          onChangeText={() => {}}
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 4. ErrorState
// ---------------------------------------------------------------------------

export const ErrorState: Story = {
  name: 'Error State',
  render: () => {
    const [value, setValue] = useState('bad-email')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Error States</SectionLabel>
        <TextField
          label="Email"
          placeholder="Enter email"
          value={value}
          onChangeText={setValue}
          error
          errorText="Please enter a valid email address"
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          value="123"
          onChangeText={() => {}}
          errorText="Password must be at least 8 characters"
          secureTextEntry
        />

        <SectionLabel>Error Without Message</SectionLabel>
        <TextField
          label="Required Field"
          placeholder="This field is required"
          value=""
          onChangeText={() => {}}
          error
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 5. WithIcons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => {
    const [search, setSearch] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Leading Icon</SectionLabel>
        <TextField
          placeholder="Search..."
          leadingIcon={<SearchIcon size="sm" color="#9E9E9E" />}
          value={search}
          onChangeText={setSearch}
        />

        <SectionLabel>Trailing Icon</SectionLabel>
        <TextField
          label="Settings"
          placeholder="Configuration value"
          trailingIcon={<SettingsIcon size="sm" color="#9E9E9E" />}
          value=""
          onChangeText={() => {}}
        />

        <SectionLabel>Both Icons</SectionLabel>
        <TextField
          placeholder="Edit entry..."
          leadingIcon={<EditIcon size="sm" color="#9E9E9E" />}
          trailingIcon={<CloseIcon size="sm" color="#9E9E9E" />}
          value=""
          onChangeText={() => {}}
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 6. Clearable
// ---------------------------------------------------------------------------

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('Some text to clear')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Clearable Input</SectionLabel>
        <Text variant="caption" color="$colorSecondary">
          Type text and tap the X to clear
        </Text>
        <TextField
          label="Clearable Field"
          placeholder="Type something..."
          value={value}
          onChangeText={setValue}
          clearable
          onClear={() => setValue('')}
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 7. Password
// ---------------------------------------------------------------------------

export const Password: Story = {
  render: () => {
    const [password, setPassword] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Password Input</SectionLabel>
        <TextField
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        <TextField
          label="Confirm Password"
          placeholder="Re-enter password"
          value=""
          onChangeText={() => {}}
          secureTextEntry
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 8. Multiline
// ---------------------------------------------------------------------------

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Multiline / Textarea</SectionLabel>
        <TextField
          label="Description"
          placeholder="Enter a description..."
          value={value}
          onChangeText={setValue}
          multiline
          numberOfLines={3}
        />
        <TextField
          label="Notes"
          placeholder="Additional notes..."
          value=""
          onChangeText={() => {}}
          multiline
          numberOfLines={5}
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 9. CharacterCount
// ---------------------------------------------------------------------------

export const CharacterCount: Story = {
  name: 'Character Count',
  render: () => {
    const [value, setValue] = useState('')
    const [bio, setBio] = useState('Hello, I am a developer.')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Character Count Indicator</SectionLabel>
        <TextField
          label="Tweet"
          placeholder="What's happening?"
          value={value}
          onChangeText={setValue}
          maxLength={280}
          showCharacterCount
          helperText="Share a short message"
        />

        <SectionLabel>Near Limit</SectionLabel>
        <TextField
          label="Bio"
          placeholder="About you..."
          value={bio}
          onChangeText={setBio}
          maxLength={30}
          showCharacterCount
          multiline
          numberOfLines={2}
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 10. FilledVariant
// ---------------------------------------------------------------------------

export const FilledVariant: Story = {
  name: 'Filled Variant',
  render: () => {
    const [value, setValue] = useState('')
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Filled vs Outlined Comparison</SectionLabel>

        <Text variant="body3" color="$colorSecondary">
          Filled
        </Text>
        <TextField
          label="Filled Field"
          placeholder="Enter text..."
          variant="filled"
          value={value}
          onChangeText={setValue}
        />

        <Text variant="body3" color="$colorSecondary">
          Outlined (default)
        </Text>
        <TextField
          label="Outlined Field"
          placeholder="Enter text..."
          variant="outlined"
          value=""
          onChangeText={() => {}}
        />

        <SectionLabel>Filled with Helper and Error</SectionLabel>
        <TextField
          label="Valid Filled"
          placeholder="Type here..."
          variant="filled"
          helperText="Helper text for a filled field"
          value=""
          onChangeText={() => {}}
        />
        <TextField
          label="Error Filled"
          placeholder="Type here..."
          variant="filled"
          value="bad"
          onChangeText={() => {}}
          errorText="This field has an error"
        />
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 11. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  name: 'Disabled',
  render: () => (
    <VStack padding="$4" gap="$4" width={320}>
      <SectionLabel>Disabled States</SectionLabel>
      <TextField
        label="Disabled Empty"
        placeholder="Cannot edit"
        value=""
        onChangeText={() => {}}
        disabled
      />
      <TextField
        label="Disabled with Value"
        placeholder="Cannot edit"
        value="Read-only content"
        onChangeText={() => {}}
        disabled
      />
      <TextField
        label="Disabled Filled"
        placeholder="Cannot edit"
        value="Filled variant"
        variant="filled"
        onChangeText={() => {}}
        disabled
      />
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 12. AllStates -- comprehensive grid
// ---------------------------------------------------------------------------

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <VStack padding="$4" gap="$4" width={340}>
      <SectionLabel>State Matrix</SectionLabel>

      {(['outlined', 'filled'] as const).map((variant) => (
        <VStack key={variant} gap="$3">
          <Text variant="body3" fontWeight="$semibold" color="$colorSecondary">
            Variant: {variant}
          </Text>

          <TextField
            label="Default"
            placeholder="Placeholder"
            variant={variant}
            value=""
            onChangeText={() => {}}
          />
          <TextField
            label="With Value"
            placeholder="Placeholder"
            variant={variant}
            value="Entered text"
            onChangeText={() => {}}
          />
          <TextField
            label="Error"
            placeholder="Placeholder"
            variant={variant}
            value="Invalid"
            onChangeText={() => {}}
            errorText="Validation failed"
          />
          <TextField
            label="Disabled"
            placeholder="Placeholder"
            variant={variant}
            value="Cannot edit"
            onChangeText={() => {}}
            disabled
          />
        </VStack>
      ))}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 13. KeyboardTypes
// ---------------------------------------------------------------------------

export const KeyboardTypes: Story = {
  name: 'Keyboard Types',
  render: () => (
    <VStack padding="$4" gap="$4" width={320}>
      <SectionLabel>Keyboard Type Variants</SectionLabel>
      <Text variant="caption" color="$colorSecondary">
        Tap each field on a device to see the keyboard type
      </Text>

      {(
        [
          { type: 'default', label: 'Default', placeholder: 'Standard keyboard' },
          { type: 'email-address', label: 'Email', placeholder: 'user@example.com' },
          { type: 'numeric', label: 'Numeric', placeholder: '12345' },
          { type: 'phone-pad', label: 'Phone', placeholder: '(555) 000-0000' },
          { type: 'url', label: 'URL', placeholder: 'https://example.com' },
        ] as const
      ).map((item) => (
        <TextField
          key={item.type}
          label={item.label}
          placeholder={item.placeholder}
          keyboardType={item.type}
          value=""
          onChangeText={() => {}}
        />
      ))}
    </VStack>
  ),
}
