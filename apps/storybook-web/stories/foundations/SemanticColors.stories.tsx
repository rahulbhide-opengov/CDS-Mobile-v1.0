import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { semantic, primitive } from '@opengov/cds-tokens'
import { lightTheme } from '@opengov/cds-themes'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function TokenRow({ name, value, description }: { name: string; value: string; description: string }) {
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
// Stories — using the ACTUAL semantic.ts token names
// ---------------------------------------------------------------------------

export const Primary: StoryObj = {
  name: 'Primary (Blurple)',
  render: () => (
    <TokenSection
      title="Primary"
      tokens={[
        { name: 'primaryMain', value: semantic.primaryMain, description: 'Main brand — blurple/700' },
        { name: 'primaryDark', value: semantic.primaryDark, description: 'Dark brand — blurple/900' },
        { name: 'primaryLight', value: semantic.primaryLight, description: 'Light brand — blurple/100' },
        { name: 'primaryContrastText', value: semantic.primaryContrastText, description: 'Text on primary' },
        { name: 'primaryStatesHover', value: semantic.primaryStatesHover, description: 'Primary hover overlay' },
        { name: 'primaryStatesSelected', value: semantic.primaryStatesSelected, description: 'Primary selected overlay' },
        { name: 'primaryStatesFocus', value: semantic.primaryStatesFocus, description: 'Primary focus overlay' },
        { name: 'primaryStatesFocusVisible', value: semantic.primaryStatesFocusVisible, description: 'Primary focus-visible ring' },
        { name: 'primaryStatesOutlinedBorder', value: semantic.primaryStatesOutlinedBorder, description: 'Primary outlined border' },
      ]}
    />
  ),
}

export const Secondary: StoryObj = {
  name: 'Secondary (Slate)',
  render: () => (
    <TokenSection
      title="Secondary"
      tokens={[
        { name: 'secondaryMain', value: semantic.secondaryMain, description: 'Main secondary — slate/700' },
        { name: 'secondaryDark', value: semantic.secondaryDark, description: 'Dark secondary — slate/900' },
        { name: 'secondaryLight', value: semantic.secondaryLight, description: 'Light secondary — slate/100' },
        { name: 'secondaryContrastText', value: semantic.secondaryContrastText, description: 'Text on secondary' },
        { name: 'secondaryStatesHover', value: semantic.secondaryStatesHover, description: 'Secondary hover overlay' },
        { name: 'secondaryStatesSelected', value: semantic.secondaryStatesSelected, description: 'Secondary selected overlay' },
        { name: 'secondaryStatesFocus', value: semantic.secondaryStatesFocus, description: 'Secondary focus overlay' },
        { name: 'secondaryStatesFocusVisible', value: semantic.secondaryStatesFocusVisible, description: 'Secondary focus-visible ring' },
        { name: 'secondaryStatesOutlinedBorder', value: semantic.secondaryStatesOutlinedBorder, description: 'Secondary outlined border' },
      ]}
    />
  ),
}

export const Error: StoryObj = {
  render: () => (
    <TokenSection
      title="Error"
      tokens={[
        { name: 'errorMain', value: semantic.errorMain, description: 'Error main — red/600 (#D33423)' },
        { name: 'errorDark', value: semantic.errorDark, description: 'Error dark — red/700 (#B12525)' },
        { name: 'errorLight', value: semantic.errorLight, description: 'Error light — red/50' },
        { name: 'errorColor', value: semantic.errorColor, description: 'Error text color (= errorDark)' },
        { name: 'errorBackground', value: semantic.errorBackground, description: 'Error background surface' },
        { name: 'errorContrastText', value: semantic.errorContrastText, description: 'Text on error fill' },
        { name: 'errorStatesHover', value: semantic.errorStatesHover, description: 'Error hover overlay' },
        { name: 'errorStatesSelected', value: semantic.errorStatesSelected, description: 'Error selected overlay' },
        { name: 'errorStatesFocusVisible', value: semantic.errorStatesFocusVisible, description: 'Error focus-visible ring' },
        { name: 'errorStatesOutlinedBorder', value: semantic.errorStatesOutlinedBorder, description: 'Error outlined border' },
      ]}
    />
  ),
}

export const Warning: StoryObj = {
  render: () => (
    <TokenSection
      title="Warning"
      tokens={[
        { name: 'warningMain', value: semantic.warningMain, description: 'Warning main — yellow/700 (#885604)' },
        { name: 'warningDark', value: semantic.warningDark, description: 'Warning dark — orange/800' },
        { name: 'warningLight', value: semantic.warningLight, description: 'Warning light — orange/50' },
        { name: 'warningColor', value: semantic.warningColor, description: 'Warning text color (= warningDark)' },
        { name: 'warningBackground', value: semantic.warningBackground, description: 'Warning background surface' },
        { name: 'warningContrastText', value: semantic.warningContrastText, description: 'Text on warning fill' },
        { name: 'warningStatesHover', value: semantic.warningStatesHover, description: 'Warning hover overlay' },
        { name: 'warningStatesSelected', value: semantic.warningStatesSelected, description: 'Warning selected overlay' },
        { name: 'warningStatesFocusVisible', value: semantic.warningStatesFocusVisible, description: 'Warning focus-visible ring' },
        { name: 'warningStatesOutlinedBorder', value: semantic.warningStatesOutlinedBorder, description: 'Warning outlined border' },
      ]}
    />
  ),
}

export const Info: StoryObj = {
  render: () => (
    <TokenSection
      title="Info"
      tokens={[
        { name: 'infoMain', value: semantic.infoMain, description: 'Info main — cerulean/700 (#0E6F7F)' },
        { name: 'infoDark', value: semantic.infoDark, description: 'Info dark — cerulean/800' },
        { name: 'infoLight', value: semantic.infoLight, description: 'Info light — cerulean/50' },
        { name: 'infoColor', value: semantic.infoColor, description: 'Info text color (= infoDark)' },
        { name: 'infoBackground', value: semantic.infoBackground, description: 'Info background surface' },
        { name: 'infoContrastText', value: semantic.infoContrastText, description: 'Text on info fill' },
        { name: 'infoStatesHover', value: semantic.infoStatesHover, description: 'Info hover overlay' },
        { name: 'infoStatesSelected', value: semantic.infoStatesSelected, description: 'Info selected overlay' },
        { name: 'infoStatesFocusVisible', value: semantic.infoStatesFocusVisible, description: 'Info focus-visible ring' },
        { name: 'infoStatesOutlinedBorder', value: semantic.infoStatesOutlinedBorder, description: 'Info outlined border' },
      ]}
    />
  ),
}

export const Success: StoryObj = {
  render: () => (
    <TokenSection
      title="Success"
      tokens={[
        { name: 'successMain', value: semantic.successMain, description: 'Success main — green/700 (#037730)' },
        { name: 'successDark', value: semantic.successDark, description: 'Success dark — green/800' },
        { name: 'successLight', value: semantic.successLight, description: 'Success light — green/50' },
        { name: 'successColor', value: semantic.successColor, description: 'Success text color (= green/700)' },
        { name: 'successBackground', value: semantic.successBackground, description: 'Success background surface' },
        { name: 'successContrastText', value: semantic.successContrastText, description: 'Text on success fill' },
        { name: 'successStatesHover', value: semantic.successStatesHover, description: 'Success hover overlay' },
        { name: 'successStatesSelected', value: semantic.successStatesSelected, description: 'Success selected overlay' },
        { name: 'successStatesFocusVisible', value: semantic.successStatesFocusVisible, description: 'Success focus-visible ring' },
        { name: 'successStatesOutlinedBorder', value: semantic.successStatesOutlinedBorder, description: 'Success outlined border' },
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
        { name: 'textPrimary', value: semantic.textPrimary, description: '87% black — primary text' },
        { name: 'textSecondary', value: semantic.textSecondary, description: '60% black — secondary text' },
        { name: 'textDisabled', value: semantic.textDisabled, description: '38% black — disabled text' },
        { name: 'textStatesHover', value: semantic.textStatesHover, description: 'Text hover overlay' },
        { name: 'textStatesSelected', value: semantic.textStatesSelected, description: 'Text selected overlay' },
        { name: 'textStatesFocusVisible', value: semantic.textStatesFocusVisible, description: 'Text focus-visible ring' },
      ]}
    />
  ),
}

export const Backgrounds: StoryObj = {
  render: () => (
    <TokenSection
      title="Backgrounds"
      tokens={[
        { name: 'bgDefault', value: semantic.bgDefault, description: 'Default surface — white' },
        { name: 'bgSecondary', value: semantic.bgSecondary, description: 'Secondary surface — gray/50' },
        { name: 'bgTertiary', value: semantic.bgTertiary, description: 'Tertiary surface — gray/100' },
        { name: 'bgPaperElevation0', value: semantic.bgPaperElevation0, description: 'Paper elevation 0' },
        { name: 'bgPaperElevation1', value: semantic.bgPaperElevation1, description: 'Paper elevation 1' },
      ]}
    />
  ),
}

export const ActionStates: StoryObj = {
  name: 'Action States',
  render: () => (
    <TokenSection
      title="Action States"
      tokens={[
        { name: 'actionActive', value: semantic.actionActive, description: '56% black — active icon/element' },
        { name: 'actionHover', value: semantic.actionHover, description: '4% black — hover overlay' },
        { name: 'actionSelected', value: semantic.actionSelected, description: '8% black — selected overlay' },
        { name: 'actionFocus', value: semantic.actionFocus, description: '12% black — focus overlay' },
        { name: 'actionDisabled', value: semantic.actionDisabled, description: '38% black — disabled content' },
        { name: 'actionDisabledBackground', value: semantic.actionDisabledBackground, description: '12% black — disabled surface' },
      ]}
    />
  ),
}

export const Borders: StoryObj = {
  render: () => (
    <TokenSection
      title="Borders & Inputs"
      tokens={[
        { name: 'standardEnabledBorder', value: semantic.standardEnabledBorder, description: 'Standard input border — 25% black' },
        { name: 'standardHoverBorder', value: semantic.standardHoverBorder, description: 'Standard input hover border' },
        { name: 'outlinedEnabledBorder', value: semantic.outlinedEnabledBorder, description: 'Outlined input border — 12% black' },
        { name: 'outlinedHoverBorder', value: semantic.outlinedHoverBorder, description: 'Outlined input hover border' },
        { name: 'filledEnabledFill', value: semantic.filledEnabledFill, description: 'Filled input background — 6% black' },
        { name: 'filledHoverFill', value: semantic.filledHoverFill, description: 'Filled input hover background — 9% black' },
        { name: 'elevationOutlined', value: semantic.elevationOutlined, description: 'Outlined elevation border' },
        { name: 'divider', value: semantic.divider, description: 'Divider line — 12% black' },
      ]}
    />
  ),
}

export const ComponentSpecific: StoryObj = {
  name: 'Component-Specific',
  render: () => (
    <TokenSection
      title="Component-Specific Tokens"
      tokens={[
        { name: 'snackbarFill', value: semantic.snackbarFill, description: 'Snackbar background' },
        { name: 'tooltipFill', value: semantic.tooltipFill, description: 'Tooltip background' },
        { name: 'chipDefaultEnabledBorder', value: semantic.chipDefaultEnabledBorder, description: 'Chip default border — gray/400' },
        { name: 'chipDefaultHoverFill', value: semantic.chipDefaultHoverFill, description: 'Chip hover fill — 12% black' },
        { name: 'chipDefaultFocusFill', value: semantic.chipDefaultFocusFill, description: 'Chip focus fill — 20% black' },
        { name: 'avatarFill', value: semantic.avatarFill, description: 'Avatar fallback fill — gray/400' },
        { name: 'switchKnobFillEnabled', value: semantic.switchKnobFillEnabled, description: 'Switch knob — gray/50' },
        { name: 'switchSlideFill', value: semantic.switchSlideFill, description: 'Switch slide track' },
        { name: 'backdropFill', value: semantic.backdropFill, description: 'Modal backdrop — 50% black' },
        { name: 'appBarDefaultFill', value: semantic.appBarDefaultFill, description: 'App bar background — gray/100' },
        { name: 'ratingActiveFill', value: semantic.ratingActiveFill, description: 'Active star fill' },
        { name: 'statesFocus', value: semantic.statesFocus, description: 'General focus state — 12% black' },
      ]}
    />
  ),
}

export const BlackWhiteStates: StoryObj = {
  name: 'Black & White States',
  render: () => (
    <TokenSection
      title="Black & White State Layers"
      tokens={[
        { name: 'blackStatesMain', value: semantic.blackStatesMain, description: 'Base black' },
        { name: 'blackStatesHover', value: semantic.blackStatesHover, description: 'Black hover — 4%' },
        { name: 'blackStatesSelected', value: semantic.blackStatesSelected, description: 'Black selected — 8%' },
        { name: 'blackStatesFocus', value: semantic.blackStatesFocus, description: 'Black focus — 12%' },
        { name: 'blackStatesFocusVisible', value: semantic.blackStatesFocusVisible, description: 'Black focus-visible — 30%' },
        { name: 'blackStatesOutlinedBorder', value: semantic.blackStatesOutlinedBorder, description: 'Black outlined — 50%' },
        { name: 'whiteStatesMain', value: semantic.whiteStatesMain, description: 'Base white' },
        { name: 'whiteStatesHover', value: semantic.whiteStatesHover, description: 'White hover — 4%' },
        { name: 'whiteStatesSelected', value: semantic.whiteStatesSelected, description: 'White selected — 8%' },
        { name: 'whiteStatesFocus', value: semantic.whiteStatesFocus, description: 'White focus — 12%' },
        { name: 'whiteStatesFocusVisible', value: semantic.whiteStatesFocusVisible, description: 'White focus-visible — 30%' },
        { name: 'whiteStatesOutlinedBorder', value: semantic.whiteStatesOutlinedBorder, description: 'White outlined — 50%' },
      ]}
    />
  ),
}

export const DataVisualization: StoryObj = {
  name: 'Data Visualization (18 Series)',
  render: () => (
    <TokenSection
      title="Data Visualization Series"
      tokens={Array.from({ length: 18 }, (_, i) => {
        const key = `dataVizSeries${i + 1}` as keyof typeof semantic
        return {
          name: `Series ${i + 1}`,
          value: semantic[key] as string,
          description: `dataVizSeries${i + 1}`,
        }
      })}
    />
  ),
}

export const LightThemeFull: StoryObj = {
  name: 'Light Theme (Complete)',
  render: () => {
    const entries = Object.entries(lightTheme)
    return (
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
          Light Theme — All {entries.length} Tokens
        </h2>
        <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
          Complete Tamagui theme token mapping for CDS 37 light mode.
        </p>
        {entries.map(([key, value]) => (
          <TokenRow key={key} name={`$${key}`} value={value} description="" />
        ))}
      </div>
    )
  },
}
