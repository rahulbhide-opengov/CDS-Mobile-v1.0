import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function Swatch({ name, hex, token }: { name: string; hex: string; token: string }) {
  const isDark = ['900', '800', '700', '600', 'black', '1000'].some((s) => name.includes(s))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 80, gap: 4 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 4,
          backgroundColor: hex,
          border: hex === '#FFFFFF' ? '1px solid #DDDEDE' : 'none',
        }}
      />
      <span style={{ fontSize: 11, fontFamily: 'DM Sans, system-ui', fontWeight: 600, color: '#323334' }}>{name}</span>
      <span style={{ fontSize: 10, fontFamily: 'DM Sans, system-ui', color: '#939598' }}>{hex}</span>
      <code style={{ fontSize: 9, fontFamily: 'DM Mono, monospace', color: '#7B7D7F' }}>{token}</code>
    </div>
  )
}

function ScaleSection({ title, description, swatches }: {
  title: string
  description: string
  swatches: { name: string; hex: string; token: string }[]
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 18, fontWeight: 600, color: '#323334', margin: '0 0 4px 0' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', margin: '0 0 16px 0' }}>
        {description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {swatches.map((s) => <Swatch key={s.token} {...s} />)}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundations/Color Palette',
  parameters: { layout: 'padded' },
}
export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Blurple: StoryObj = {
  name: 'Blurple (Primary Brand)',
  render: () => (
    <ScaleSection
      title="Blurple"
      description="Primary brand color. blurple/700 (#4B3FFF) is the main brand color used across buttons, links, and interactive elements."
      swatches={[
        { name: '50', hex: primitive.blurple50, token: 'blurple50' },
        { name: '100', hex: primitive.blurple100, token: 'blurple100' },
        { name: '200', hex: primitive.blurple200, token: 'blurple200' },
        { name: '300', hex: primitive.blurple300, token: 'blurple300' },
        { name: '400', hex: primitive.blurple400, token: 'blurple400' },
        { name: '500', hex: primitive.blurple500, token: 'blurple500' },
        { name: '600', hex: primitive.blurple600, token: 'blurple600' },
        { name: '700', hex: primitive.blurple700, token: 'blurple700' },
        { name: '800', hex: primitive.blurple800, token: 'blurple800' },
        { name: '900', hex: primitive.blurple900, token: 'blurple900' },
      ]}
    />
  ),
}

export const Slate: StoryObj = {
  name: 'Slate (Secondary)',
  render: () => (
    <ScaleSection
      title="Slate"
      description="Secondary palette. slate/700 (#546574) is used for tertiary buttons, input borders, and secondary text elements."
      swatches={[
        { name: '50', hex: primitive.slate50, token: 'slate50' },
        { name: '100', hex: primitive.slate100, token: 'slate100' },
        { name: '200', hex: primitive.slate200, token: 'slate200' },
        { name: '300', hex: primitive.slate300, token: 'slate300' },
        { name: '400', hex: primitive.slate400, token: 'slate400' },
        { name: '500', hex: primitive.slate500, token: 'slate500' },
        { name: '600', hex: primitive.slate600, token: 'slate600' },
        { name: '700', hex: primitive.slate700, token: 'slate700' },
        { name: '800', hex: primitive.slate800, token: 'slate800' },
        { name: '900', hex: primitive.slate900, token: 'slate900' },
      ]}
    />
  ),
}

export const Red: StoryObj = {
  name: 'Red (Error / Destructive)',
  render: () => (
    <ScaleSection
      title="Red"
      description="Error and destructive actions. red/600 (#D33423) is the error main color, red/700 (#B12525) is error dark."
      swatches={[
        { name: '50', hex: primitive.red50, token: 'red50' },
        { name: '100', hex: primitive.red100, token: 'red100' },
        { name: '200', hex: primitive.red200, token: 'red200' },
        { name: '300', hex: primitive.red300, token: 'red300' },
        { name: '400', hex: primitive.red400, token: 'red400' },
        { name: '500', hex: primitive.red500, token: 'red500' },
        { name: '600', hex: primitive.red600, token: 'red600' },
        { name: '700', hex: primitive.red700, token: 'red700' },
        { name: '800', hex: primitive.red800, token: 'red800' },
        { name: '900', hex: primitive.red900, token: 'red900' },
      ]}
    />
  ),
}

export const Green: StoryObj = {
  name: 'Green (Success)',
  render: () => (
    <ScaleSection
      title="Green"
      description="Success states. green/700 (#037730) is the success main color."
      swatches={[
        { name: '50', hex: primitive.green50, token: 'green50' },
        { name: '100', hex: primitive.green100, token: 'green100' },
        { name: '500', hex: primitive.green500, token: 'green500' },
        { name: '700', hex: primitive.green700, token: 'green700' },
        { name: '800', hex: primitive.green800, token: 'green800' },
      ]}
    />
  ),
}

export const Warning: StoryObj = {
  name: 'Yellow / Orange (Warning)',
  render: () => (
    <ScaleSection
      title="Yellow / Orange"
      description="Warning states. amber/700 (#885604) is the warning main color."
      swatches={[
        { name: 'Amber 50', hex: primitive.amber50, token: 'amber50' },
        { name: 'Yellow 300', hex: primitive.yellow300, token: 'yellow300' },
        { name: 'Yellow 400', hex: primitive.yellow400, token: 'yellow400' },
        { name: 'Amber 500', hex: primitive.amber500, token: 'amber500' },
        { name: 'Amber 700', hex: primitive.amber700, token: 'amber700' },
        { name: 'Amber 800', hex: primitive.amber800, token: 'amber800' },
      ]}
    />
  ),
}

export const Cerulean: StoryObj = {
  name: 'Cerulean (Info)',
  render: () => (
    <ScaleSection
      title="Cerulean"
      description="Informational states. cerulean/700 (#0E6F7F) is the info main color."
      swatches={[
        { name: 'Teal 50', hex: primitive.teal50, token: 'teal50' },
        { name: 'Cerulean 300', hex: primitive.cerulean300, token: 'cerulean300' },
        { name: 'Cerulean 500', hex: primitive.cerulean500, token: 'cerulean500' },
        { name: 'Cerulean 700', hex: primitive.cerulean700, token: 'cerulean700' },
        { name: 'Cerulean 800', hex: primitive.cerulean800, token: 'cerulean800' },
      ]}
    />
  ),
}

export const Gray: StoryObj = {
  name: 'Gray (Neutral)',
  render: () => (
    <ScaleSection
      title="Gray"
      description="Neutral scale for backgrounds, text, borders, and disabled states."
      swatches={[
        { name: 'White', hex: primitive.white, token: 'white' },
        { name: '50', hex: primitive.neutral50, token: 'neutral50' },
        { name: '100', hex: primitive.neutral100, token: 'neutral100' },
        { name: '200', hex: primitive.neutral200, token: 'neutral200' },
        { name: '300', hex: primitive.neutral300, token: 'neutral300' },
        { name: '400', hex: primitive.neutral400, token: 'neutral400' },
        { name: '500', hex: primitive.neutral500, token: 'neutral500' },
        { name: '600', hex: primitive.neutral600, token: 'neutral600' },
        { name: '700', hex: primitive.neutral700, token: 'neutral700' },
        { name: '800', hex: primitive.neutral800, token: 'neutral800' },
        { name: '900', hex: primitive.neutral900, token: 'neutral900' },
        { name: '1000', hex: primitive.neutral1000, token: 'neutral1000' },
        { name: 'Black', hex: primitive.black, token: 'black' },
      ]}
    />
  ),
}

export const DataVisualization: StoryObj = {
  name: 'Data Visualization (18 Series)',
  render: () => (
    <ScaleSection
      title="Data Visualization"
      description="18 series colors for charts and graphs."
      swatches={Array.from({ length: 18 }, (_, i) => ({
        name: `S${i + 1}`,
        hex: primitive[`dataSeries${i + 1}` as keyof typeof primitive] as string,
        token: `dataSeries${i + 1}`,
      }))}
    />
  ),
}
