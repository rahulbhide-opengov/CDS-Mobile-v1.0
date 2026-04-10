import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ScrollView, View } from 'react-native'
import { Stack } from '@tamagui/core'
import { VStack, HStack, Text, Box } from '@opengov/cds-primitives'
import { colors } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Color Swatch helper
// ---------------------------------------------------------------------------

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  const isDark = hex !== '#FFFFFF' && hex !== 'transparent'
  return (
    <VStack gap="$1" alignItems="center" width={72}>
      <Stack
        width={56}
        height={56}
        borderRadius="$md"
        backgroundColor={hex}
        borderWidth={hex === '#FFFFFF' || hex === 'transparent' ? 1 : 0}
        borderColor="$borderColor"
      />
      <Text variant="caption" align="center" numberOfLines={1}>
        {name}
      </Text>
      <Text variant="caption" secondary align="center" numberOfLines={1}>
        {hex}
      </Text>
    </VStack>
  )
}

function ColorSection({ title, swatches }: { title: string; swatches: { name: string; hex: string }[] }) {
  return (
    <VStack gap="$3">
      <Text variant="h4">{title}</Text>
      <HStack gap="$3" flexWrap="wrap">
        {swatches.map((s) => (
          <ColorSwatch key={s.name} name={s.name} hex={s.hex} />
        ))}
      </HStack>
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

function DesignTokensScreen() {
  return <View />
}

const meta: Meta<typeof DesignTokensScreen> = {
  title: 'Foundations/Design Tokens',
  component: DesignTokensScreen,
}

export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const BrandColors: StoryObj = {
  render: () => (
    <ScrollView>
      <VStack padding="$6" gap="$6">
        <Text variant="display4">Brand Colors</Text>

        <ColorSection
          title="Primary"
          swatches={[
            { name: 'Primary', hex: colors.primary },
            { name: 'Primary Light', hex: colors.primaryLight },
            { name: 'Primary Dark', hex: colors.primaryDark },
          ]}
        />

        <ColorSection
          title="OG Blue Scale"
          swatches={[
            { name: '50', hex: colors.ogBlue50 },
            { name: '100', hex: colors.ogBlue100 },
            { name: '200', hex: colors.ogBlue200 },
            { name: '300', hex: colors.ogBlue300 },
            { name: '400', hex: colors.ogBlue400 },
            { name: '500', hex: colors.ogBlue500 },
            { name: '600', hex: colors.ogBlue600 },
            { name: '700', hex: colors.ogBlue700 },
            { name: '800', hex: colors.ogBlue800 },
            { name: '900', hex: colors.ogBlue900 },
          ]}
        />
      </VStack>
    </ScrollView>
  ),
}

export const SemanticColors: StoryObj = {
  render: () => (
    <ScrollView>
      <VStack padding="$6" gap="$6">
        <Text variant="display4">Semantic Colors</Text>

        <ColorSection
          title="Success (Jade)"
          swatches={[
            { name: '50', hex: colors.jade50 },
            { name: '500', hex: colors.jade500 },
            { name: '700', hex: colors.jade700 },
          ]}
        />

        <ColorSection
          title="Error (Red)"
          swatches={[
            { name: '50', hex: colors.red50 },
            { name: '100', hex: colors.red100 },
            { name: '300', hex: colors.red300 },
            { name: '500', hex: colors.red500 },
            { name: '600', hex: colors.red600 },
            { name: '700', hex: colors.red700 },
            { name: '800', hex: colors.red800 },
            { name: '900', hex: colors.red900 },
          ]}
        />

        <ColorSection
          title="Warning (Amber)"
          swatches={[
            { name: '50', hex: colors.amber50 },
            { name: '500', hex: colors.amber500 },
            { name: '700', hex: colors.amber700 },
          ]}
        />

        <ColorSection
          title="Neutral / Gray"
          swatches={[
            { name: 'White', hex: colors.white },
            { name: '50', hex: colors.neutral50 },
            { name: '100', hex: colors.neutral100 },
            { name: '200', hex: colors.neutral200 },
            { name: '300', hex: colors.neutral300 },
            { name: '400', hex: colors.neutral400 },
            { name: '500', hex: colors.neutral500 },
            { name: '700', hex: colors.neutral700 },
            { name: '1000', hex: colors.neutral1000 },
            { name: 'Black', hex: colors.black },
          ]}
        />
      </VStack>
    </ScrollView>
  ),
}

export const DataVizColors: StoryObj = {
  render: () => (
    <ScrollView>
      <VStack padding="$6" gap="$6">
        <Text variant="display4">Data Visualization</Text>
        <Text variant="body2" secondary>18 series colors for charts and graphs</Text>

        <ColorSection
          title="Chart Series"
          swatches={[
            { name: 'S1', hex: colors.dataSeries1 },
            { name: 'S2', hex: colors.dataSeries2 },
            { name: 'S3', hex: colors.dataSeries3 },
            { name: 'S4', hex: colors.dataSeries4 },
            { name: 'S5', hex: colors.dataSeries5 },
            { name: 'S6', hex: colors.dataSeries6 },
            { name: 'S7', hex: colors.dataSeries7 },
            { name: 'S8', hex: colors.dataSeries8 },
            { name: 'S9', hex: colors.dataSeries9 },
            { name: 'S10', hex: colors.dataSeries10 },
            { name: 'S11', hex: colors.dataSeries11 },
            { name: 'S12', hex: colors.dataSeries12 },
            { name: 'S13', hex: colors.dataSeries13 },
            { name: 'S14', hex: colors.dataSeries14 },
            { name: 'S15', hex: colors.dataSeries15 },
            { name: 'S16', hex: colors.dataSeries16 },
            { name: 'S17', hex: colors.dataSeries17 },
            { name: 'S18', hex: colors.dataSeries18 },
          ]}
        />
      </VStack>
    </ScrollView>
  ),
}

export const SpacingScale: StoryObj = {
  render: () => {
    const spacingValues = [
      { name: '0.5', value: 2 },
      { name: '1', value: 4 },
      { name: '1.5', value: 6 },
      { name: '2', value: 8 },
      { name: '3', value: 12 },
      { name: '4', value: 16 },
      { name: '5', value: 20 },
      { name: '6', value: 24 },
      { name: '8', value: 32 },
      { name: '10', value: 40 },
      { name: '12', value: 48 },
      { name: '16', value: 64 },
      { name: '20', value: 80 },
    ]

    return (
      <ScrollView>
        <VStack padding="$6" gap="$6">
          <Text variant="display4">Spacing Scale</Text>
          <Text variant="body2" secondary>Based on 4px grid</Text>

          <VStack gap="$3">
            {spacingValues.map(({ name, value }) => (
              <HStack key={name} gap="$3" alignItems="center">
                <Text variant="caption" width={40} align="right">
                  ${name}
                </Text>
                <Stack
                  width={value}
                  height={24}
                  backgroundColor="$brandBackground"
                  borderRadius="$sm"
                />
                <Text variant="caption" secondary>
                  {value}px
                </Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    )
  },
}

export const BorderRadius: StoryObj = {
  render: () => {
    const radii = [
      { name: 'none', value: 0 },
      { name: 'sm', value: 2 },
      { name: 'md', value: 4 },
      { name: 'lg', value: 8 },
      { name: 'xl', value: 12 },
      { name: '2xl', value: 16 },
      { name: 'full', value: 9999 },
    ]

    return (
      <ScrollView>
        <VStack padding="$6" gap="$6">
          <Text variant="display4">Border Radius</Text>

          <HStack gap="$4" flexWrap="wrap">
            {radii.map(({ name, value }) => (
              <VStack key={name} gap="$2" alignItems="center">
                <Stack
                  width={64}
                  height={64}
                  backgroundColor="$brandBackground"
                  borderRadius={value}
                />
                <Text variant="caption">${name}</Text>
                <Text variant="caption" secondary>{value}px</Text>
              </VStack>
            ))}
          </HStack>
        </VStack>
      </ScrollView>
    )
  },
}
