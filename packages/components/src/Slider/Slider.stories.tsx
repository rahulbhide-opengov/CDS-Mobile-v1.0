import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { VStack, HStack, Text } from '@opengov/cds-primitives'
import { Slider, type SliderProps } from './Slider'

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta<typeof Slider> = {
  title: 'Form Controls/Slider',
  component: Slider,
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

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
// 1. Default -- interactive
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Interactive Slider</SectionLabel>
        <Slider
          value={value}
          onValueChange={setValue}
          accessibilityLabel="Default slider"
        />
        <Text variant="caption" color="$colorSecondary">
          Value: {value}
        </Text>
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 2. WithValueLabel
// ---------------------------------------------------------------------------

export const WithValueLabel: Story = {
  name: 'With Value Label',
  render: () => {
    const [value, setValue] = useState(40)
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Value Label Above Thumb</SectionLabel>
        <Text variant="caption" color="$colorSecondary">
          Drag the thumb to see the value label appear
        </Text>
        <Slider
          value={value}
          onValueChange={setValue}
          showValue
          accessibilityLabel="Slider with value label"
        />
        <Text variant="caption" color="$colorSecondary">
          Value: {value}
        </Text>
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 3. CustomRange
// ---------------------------------------------------------------------------

export const CustomRange: Story = {
  name: 'Custom Range',
  render: () => {
    const [temp, setTemp] = useState(72)
    const [price, setPrice] = useState(250)
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Temperature (60 - 90)</SectionLabel>
        <Slider
          value={temp}
          onValueChange={setTemp}
          min={60}
          max={90}
          showValue
          accessibilityLabel="Temperature slider"
        />
        <Text variant="caption" color="$colorSecondary">
          Temperature: {temp} degrees F
        </Text>

        <SectionLabel>Price Range (0 - 1000)</SectionLabel>
        <Slider
          value={price}
          onValueChange={setPrice}
          min={0}
          max={1000}
          step={10}
          showValue
          accessibilityLabel="Price slider"
        />
        <Text variant="caption" color="$colorSecondary">
          Max price: ${price}
        </Text>
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 4. Stepped
// ---------------------------------------------------------------------------

export const Stepped: Story = {
  render: () => {
    const [rating, setRating] = useState(3)
    const [volume, setVolume] = useState(50)
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Step = 1 (Rating 1-5)</SectionLabel>
        <Slider
          value={rating}
          onValueChange={setRating}
          min={1}
          max={5}
          step={1}
          showValue
          accessibilityLabel="Rating slider"
        />
        <Text variant="caption" color="$colorSecondary">
          Rating: {rating} / 5
        </Text>

        <SectionLabel>Step = 10 (Volume 0-100)</SectionLabel>
        <Slider
          value={volume}
          onValueChange={setVolume}
          min={0}
          max={100}
          step={10}
          showValue
          accessibilityLabel="Volume slider"
        />
        <Text variant="caption" color="$colorSecondary">
          Volume: {volume}%
        </Text>

        <SectionLabel>Step = 25 (Quarters)</SectionLabel>
        {(() => {
          const [q, setQ] = useState(50)
          return (
            <>
              <Slider
                value={q}
                onValueChange={setQ}
                min={0}
                max={100}
                step={25}
                showValue
                accessibilityLabel="Quarter step slider"
              />
              <Text variant="caption" color="$colorSecondary">
                Value: {q}%
              </Text>
            </>
          )
        })()}
      </VStack>
    )
  },
}

// ---------------------------------------------------------------------------
// 5. Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <VStack padding="$4" gap="$4" width={320}>
      <SectionLabel>Disabled Slider</SectionLabel>
      <Slider
        value={30}
        onValueChange={() => {}}
        disabled
        accessibilityLabel="Disabled slider at 30"
      />
      <Text variant="caption" color="$colorSecondary">
        Value: 30 (disabled, cannot drag)
      </Text>

      <SectionLabel>Disabled at Different Values</SectionLabel>
      <Slider
        value={0}
        onValueChange={() => {}}
        disabled
        accessibilityLabel="Disabled slider at 0"
      />
      <Slider
        value={50}
        onValueChange={() => {}}
        disabled
        accessibilityLabel="Disabled slider at 50"
      />
      <Slider
        value={100}
        onValueChange={() => {}}
        disabled
        accessibilityLabel="Disabled slider at 100"
      />

      <SectionLabel>Enabled vs Disabled</SectionLabel>
      {(() => {
        const [v, setV] = useState(50)
        return (
          <VStack gap="$2">
            <Text variant="body3" color="$colorSecondary">
              Enabled
            </Text>
            <Slider
              value={v}
              onValueChange={setV}
              accessibilityLabel="Enabled slider"
            />
            <Text variant="body3" color="$colorSecondary">
              Disabled
            </Text>
            <Slider
              value={50}
              onValueChange={() => {}}
              disabled
              accessibilityLabel="Disabled slider comparison"
            />
          </VStack>
        )
      })()}
    </VStack>
  ),
}

// ---------------------------------------------------------------------------
// 6. CustomColors
// ---------------------------------------------------------------------------

export const CustomColors: Story = {
  name: 'Custom Colors',
  render: () => {
    const [v1, setV1] = useState(60)
    const [v2, setV2] = useState(40)
    const [v3, setV3] = useState(75)
    return (
      <VStack padding="$4" gap="$4" width={320}>
        <SectionLabel>Custom Fill and Track Colors</SectionLabel>

        <Text variant="body3" color="$colorSecondary">
          Success green
        </Text>
        <Slider
          value={v1}
          onValueChange={setV1}
          fillColor="#388E3C"
          trackColor="#E8F5E9"
          thumbColor="#FFFFFF"
          showValue
          accessibilityLabel="Green slider"
        />

        <Text variant="body3" color="$colorSecondary">
          Error red
        </Text>
        <Slider
          value={v2}
          onValueChange={setV2}
          fillColor="#CC2929"
          trackColor="#FFF0F0"
          thumbColor="#FFFFFF"
          showValue
          accessibilityLabel="Red slider"
        />

        <Text variant="body3" color="$colorSecondary">
          Warning amber
        </Text>
        <Slider
          value={v3}
          onValueChange={setV3}
          fillColor="#FFA000"
          trackColor="#FFF8E1"
          thumbColor="#FFFFFF"
          showValue
          accessibilityLabel="Amber slider"
        />
      </VStack>
    )
  },
}
