import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { semantic, primitive } from '@opengov/cds-tokens'
import { lightTheme } from '@opengov/cds-themes'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function TokenRow({ name, value, description }: { name: string; value: string; description: string }) {
  const isTransparent = value === 'transparent' || value.includes('rgba')
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #DDDEDE' }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 4,
          backgroundColor: value,
          border: '1px solid #DDDEDE',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, fontWeight: 600, color: '#323334' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, color: '#939598' }}>
          {description}
        </div>
      </div>
      <code style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#7B7D7F', flexShrink: 0 }}>
        {value}
      </code>
    </div>
  )
}

function TokenSection({ title, tokens }: { title: string; tokens: { name: string; value: string; description: string }[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 18, fontWeight: 600, color: '#323334', margin: '0 0 12px 0' }}>
        {title}
      </h3>
      {tokens.map((t) => <TokenRow key={t.name} {...t} />)}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundations/Semantic Colors',
  parameters: { layout: 'padded' },
}
export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Backgrounds: StoryObj = {
  render: () => (
    <TokenSection
      title="Backgrounds"
      tokens={[
        { name: 'bgDefault', value: semantic.bgDefault, description: 'Default surface background (white)' },
        { name: 'bgPaper', value: semantic.bgPaper, description: 'Paper/card background' },
        { name: 'bgStrong', value: semantic.bgStrong, description: 'Stronger background for grouped areas (gray/100)' },
        { name: 'bgInverse', value: semantic.bgInverse, description: 'Inverse background for dark surfaces (gray/900)' },
      ]}
    />
  ),
}

export const TextColors: StoryObj = {
  name: 'Text',
  render: () => (
    <TokenSection
      title="Text"
      tokens={[
        { name: 'textPrimary', value: semantic.textPrimary, description: 'Primary text — 87% black (Figma: text/primary)' },
        { name: 'textSecondary', value: semantic.textSecondary, description: 'Secondary text — 60% black (Figma: text/secondary)' },
        { name: 'textDisabled', value: semantic.textDisabled, description: 'Disabled text — 38% black (Figma: text/disabled)' },
        { name: 'textInverse', value: semantic.textInverse, description: 'Inverse text for dark backgrounds (white)' },
      ]}
    />
  ),
}

export const Brand: StoryObj = {
  render: () => (
    <TokenSection
      title="Brand"
      tokens={[
        { name: 'brandMain', value: semantic.brandMain, description: 'Primary brand — blurple/700 (#4B3FFF)' },
        { name: 'brandDark', value: semantic.brandDark, description: 'Brand dark — blurple/900 (#19009B)' },
        { name: 'brandLight', value: semantic.brandLight, description: 'Brand light — blurple/500 (#7589FF)' },
        { name: 'brandContrastText', value: semantic.brandContrastText, description: 'Contrast text on brand — white' },
      ]}
    />
  ),
}

export const Status: StoryObj = {
  render: () => (
    <TokenSection
      title="Status Colors"
      tokens={[
        { name: 'errorMain', value: semantic.errorMain, description: 'Error main — red/600 (#D33423)' },
        { name: 'errorDark', value: semantic.errorDark, description: 'Error dark — red/700 (#B12525)' },
        { name: 'errorLight', value: semantic.errorLight, description: 'Error background — red/50 (#FCF7F7)' },
        { name: 'successMain', value: semantic.successMain, description: 'Success main — green/700 (#037730)' },
        { name: 'successDark', value: semantic.successDark, description: 'Success dark — green/800 (#015A2D)' },
        { name: 'successLight', value: semantic.successLight, description: 'Success background — green/50 (#EFFDF1)' },
        { name: 'warningMain', value: semantic.warningMain, description: 'Warning main — orange/700 (#885604)' },
        { name: 'warningDark', value: semantic.warningDark, description: 'Warning dark — orange/800 (#7D2E04)' },
        { name: 'warningLight', value: semantic.warningLight, description: 'Warning background — amber/50 (#FDF7F4)' },
        { name: 'infoMain', value: semantic.infoMain, description: 'Info main — cerulean/700 (#0E6F7F)' },
        { name: 'infoDark', value: semantic.infoDark, description: 'Info dark — cerulean/800 (#085461)' },
        { name: 'infoLight', value: semantic.infoLight, description: 'Info background — cerulean/50 (#F1FAFC)' },
      ]}
    />
  ),
}

export const Borders: StoryObj = {
  render: () => (
    <TokenSection
      title="Borders & Divider"
      tokens={[
        { name: 'borderDefault', value: semantic.borderDefault, description: 'Default border — gray/200 (#DDDEDE)' },
        { name: 'borderStrong', value: semantic.borderStrong, description: 'Strong border — gray/300 (#C8C9CA)' },
        { name: 'borderFocus', value: semantic.borderFocus, description: 'Focus border — blurple/700 (#4B3FFF)' },
        { name: 'borderError', value: semantic.borderError, description: 'Error border — red/600 (#D33423)' },
        { name: 'borderDisabled', value: semantic.borderDisabled, description: 'Disabled border — gray/200 (#DDDEDE)' },
        { name: 'divider', value: semantic.divider, description: 'Divider line — 12% black (Figma: #0000001F)' },
      ]}
    />
  ),
}

export const ActionStates: StoryObj = {
  name: 'Action States',
  render: () => (
    <TokenSection
      title="Action States (Opacity Layers)"
      tokens={[
        { name: 'actionHover', value: semantic.actionHover, description: `Hover overlay — ${primitive.stateHoverOpacity * 100}% black` },
        { name: 'actionFocus', value: semantic.actionFocus, description: `Focus overlay — ${primitive.stateFocusOpacity * 100}% black` },
        { name: 'actionSelected', value: semantic.actionSelected, description: `Selected overlay — ${primitive.stateSelectedOpacity * 100}% black` },
        { name: 'actionDisabled', value: semantic.actionDisabled, description: `Disabled overlay — ${primitive.stateDisabledOpacity * 100}% black` },
      ]}
    />
  ),
}

export const ThemeTokens: StoryObj = {
  name: 'Light Theme (Full)',
  render: () => {
    const entries = Object.entries(lightTheme)
    return (
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
          Light Theme — All Tokens
        </h2>
        <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
          Complete mapping of all Tamagui theme tokens for the CDS 37 light mode.
        </p>
        {entries.map(([key, value]) => (
          <TokenRow key={key} name={`$${key}`} value={value} description="" />
        ))}
      </div>
    )
  },
}
