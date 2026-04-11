import React, { useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Google Fonts CDN -- DM Sans (loaded via decorator)
// ---------------------------------------------------------------------------

const DM_SANS_URL =
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap'

function FontLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.querySelector(`link[href="${DM_SANS_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = DM_SANS_URL
    document.head.appendChild(link)
  }, [])
  return <>{children}</>
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FONT_STACK = "'DM Sans', system-ui, sans-serif"
const MONO_STACK = "'DM Mono', monospace"

/**
 * Determines whether a given shade value represents a "dark" stop, used to
 * decide whether the swatch label text should be rendered in white.
 */
function isDarkShade(shade: string): boolean {
  return ['600', '700', '800', '900', 'A200', 'A400', 'A700', 'main', 'dark'].includes(shade)
}

/**
 * Renders a single color swatch with its name, hex value, and token reference.
 */
function Swatch({
  name,
  hex,
  token,
}: {
  name: string
  hex: string
  token: string
}) {
  const dark = isDarkShade(name)
  const isVeryLight = hex.toUpperCase() === '#FFFFFF' || hex.toUpperCase() === '#F8F8F8'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 84,
        gap: 4,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 6,
          backgroundColor: hex,
          border: isVeryLight ? '1px solid #DDDEDE' : 'none',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: 4,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontFamily: MONO_STACK,
            color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.35)',
          }}
        >
          {name}
        </span>
      </div>
      <span
        style={{
          fontSize: 11,
          fontFamily: FONT_STACK,
          fontWeight: 600,
          color: '#323334',
          textAlign: 'center',
          lineHeight: '14px',
        }}
      >
        {hex}
      </span>
      <code
        style={{
          fontSize: 9,
          fontFamily: MONO_STACK,
          color: '#7B7D7F',
          textAlign: 'center',
          lineHeight: '12px',
          wordBreak: 'break-all',
        }}
      >
        {token}
      </code>
    </div>
  )
}

/**
 * A section wrapper that renders a palette title, description, and a row of
 * swatches for a single color scale.
 */
function ScaleSection({
  title,
  description,
  swatches,
}: {
  title: string
  description: string
  swatches: { name: string; hex: string; token: string }[]
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3
        style={{
          fontFamily: FONT_STACK,
          fontSize: 20,
          fontWeight: 700,
          color: '#323334',
          margin: '0 0 4px 0',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: FONT_STACK,
          fontSize: 14,
          fontWeight: 400,
          color: '#939598',
          margin: '0 0 20px 0',
          lineHeight: '20px',
          maxWidth: 720,
        }}
      >
        {description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {swatches.map((s) => (
          <Swatch key={s.token} {...s} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shade helpers
// ---------------------------------------------------------------------------

/** Standard 13-shade scale used by most palettes (50-900 + A200/A400/A700). */
const FULL_SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  'A200',
  'A400',
  'A700',
] as const

/** Marine uses only 50-900 (no accent variants). */
const MARINE_SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
] as const

/**
 * Given a palette prefix (e.g. "blurple") and an array of shade suffixes,
 * builds the swatches array by reading directly from the primitive tokens.
 */
function buildSwatches(
  prefix: string,
  shades: readonly string[],
): { name: string; hex: string; token: string }[] {
  return shades.map((shade) => {
    const token = `${prefix}${shade}`
    const hex = (primitive as Record<string, unknown>)[token] as string
    return { name: shade, hex, token }
  })
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundations/Color Palette',
  decorators: [
    (Story) => (
      <FontLoader>
        <Story />
      </FontLoader>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'All 19 CDS 37 Foundation color palettes, plus Blurmuda and Data Visualization series. ' +
          'Each palette shows every defined shade with its hex value and primitive token name. ' +
          'Source of truth: CDS 37 Figma Foundation collection (247 color variables).',
      },
    },
  },
}
export default meta

// ===========================================================================
// 1. Blurple (Primary Brand)
// ===========================================================================

export const Blurple: StoryObj = {
  name: '01 - Blurple (Primary Brand)',
  render: () => (
    <ScaleSection
      title="Blurple"
      description={
        'Primary brand color. blurple/700 (#4B3FFF) is the main brand color used across ' +
        'buttons, links, and interactive elements. blurple/900 (#19009B) serves as the dark ' +
        'brand variant, and blurple/500 (#7589FF) as the light variant.'
      }
      swatches={buildSwatches('blurple', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 2. Slate (Secondary)
// ===========================================================================

export const Slate: StoryObj = {
  name: '02 - Slate (Secondary)',
  render: () => (
    <ScaleSection
      title="Slate"
      description={
        'Secondary palette. slate/700 (#546574) is used for tertiary buttons, input borders, ' +
        'and secondary text. slate/900 (#2B343D) maps to brandSecondary.'
      }
      swatches={buildSwatches('slate', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 3. Red (Error / Destructive)
// ===========================================================================

export const Red: StoryObj = {
  name: '03 - Red (Error / Destructive)',
  render: () => (
    <ScaleSection
      title="Red"
      description={
        'Error and destructive actions. red/600 (#D33423) is the error main color. ' +
        'red/700 (#B12525) is error dark, red/50 (#FCF7F7) is the error background tint.'
      }
      swatches={buildSwatches('red', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 4. Green (Success)
// ===========================================================================

export const Green: StoryObj = {
  name: '04 - Green (Success)',
  render: () => (
    <ScaleSection
      title="Green"
      description={
        'Success states. green/700 (#037730) is the success main color. ' +
        'green/50 (#EFFDF1) is the success background tint, green/800 (#015A2D) is the dark variant.'
      }
      swatches={buildSwatches('green', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 5. Yellow (Warning)
// ===========================================================================

export const Yellow: StoryObj = {
  name: '05 - Yellow (Warning)',
  render: () => (
    <ScaleSection
      title="Yellow"
      description={
        'Warning states. yellow/700 (#885604) is the warning main color (also aliased as amber700). ' +
        'yellow/300 (#FFB636) is used for warning light fills, yellow/50 (#FDF8F1) for background tints.'
      }
      swatches={buildSwatches('yellow', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 6. Cerulean (Info)
// ===========================================================================

export const Cerulean: StoryObj = {
  name: '06 - Cerulean (Info)',
  render: () => (
    <ScaleSection
      title="Cerulean"
      description={
        'Informational states. cerulean/700 (#0E6F7F) is the info main color. ' +
        'cerulean/50 (#F1FAFC) is the info background tint, cerulean/500 (#16A7BF) is the light variant.'
      }
      swatches={buildSwatches('cerulean', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 7. Orange
// ===========================================================================

export const Orange: StoryObj = {
  name: '07 - Orange',
  render: () => (
    <ScaleSection
      title="Orange"
      description={
        'Used for warning dark states and secondary accent needs. orange/500 (#F86A0B) is the ' +
        'primary stop. Also referenced in data visualization series 7 and 15-16.'
      }
      swatches={buildSwatches('orange', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 8. Gray (Neutral)
// ===========================================================================

export const Gray: StoryObj = {
  name: '08 - Gray (Neutral)',
  render: () => (
    <ScaleSection
      title="Gray"
      description={
        'Primary neutral scale for backgrounds, text, borders, and disabled states. ' +
        'Also aliased as the "neutral" scale for backward compatibility. ' +
        'gray/900 (#323334) is used for primary text, gray/50 (#F8F8F8) for subtle backgrounds.'
      }
      swatches={buildSwatches('gray', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 9. Violet
// ===========================================================================

export const Violet: StoryObj = {
  name: '09 - Violet',
  render: () => (
    <ScaleSection
      title="Violet"
      description={
        'Data visualization primary. violet/500 (#AB6FFE) and violet/300 (#D2BCFB) are the ' +
        'first semantic dataViz series pair. violet/700 (#7F00DE) is the dark accent stop.'
      }
      swatches={buildSwatches('violet', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 10. Turquoise
// ===========================================================================

export const Turquoise: StoryObj = {
  name: '10 - Turquoise',
  render: () => (
    <ScaleSection
      title="Turquoise"
      description={
        'Accent palette for illustrative and decorative uses. turquoise/400 (#00CDBC) is the ' +
        'mid-tone primary, turquoise/700 (#007369) for darker contrast.'
      }
      swatches={buildSwatches('turquoise', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 11. Terracotta
// ===========================================================================

export const Terracotta: StoryObj = {
  name: '11 - Terracotta',
  render: () => (
    <ScaleSection
      title="Terracotta"
      description={
        'Warm accent palette. terracotta/500 (#F95728) and terracotta/300 (#F9B7A5) are used ' +
        'in data visualization series 17-18. terracotta/600 (#DF461B) maps to dataSeries16.'
      }
      swatches={buildSwatches('terracotta', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 12. Jade
// ===========================================================================

export const Jade: StoryObj = {
  name: '12 - Jade',
  render: () => (
    <ScaleSection
      title="Jade"
      description={
        'Cool green accent. jade/500 (#08AF84) is the mid-tone primary, ' +
        'jade/700 (#037456) for dark accents. Useful for secondary success-like indicators ' +
        'that need to be distinct from the primary Green palette.'
      }
      swatches={buildSwatches('jade', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 13. Pear
// ===========================================================================

export const Pear: StoryObj = {
  name: '13 - Pear',
  render: () => (
    <ScaleSection
      title="Pear"
      description={
        'Yellow-green accent. pear/500 (#69AB0B) and pear/300 (#92E431) are used in ' +
        'data visualization series 11-12. pear/400 (#79C410) maps to dataSeries14.'
      }
      swatches={buildSwatches('pear', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 14. Magenta
// ===========================================================================

export const Magenta: StoryObj = {
  name: '14 - Magenta',
  render: () => (
    <ScaleSection
      title="Magenta"
      description={
        'Vivid accent palette. magenta/500 (#FF00FF) and magenta/300 (#FCA6F8) are used in ' +
        'data visualization series 7-8. Also aliased as "rose" for backward compatibility.'
      }
      swatches={buildSwatches('magenta', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 15. Purple
// ===========================================================================

export const Purple: StoryObj = {
  name: '15 - Purple',
  render: () => (
    <ScaleSection
      title="Purple"
      description={
        'Cool violet accent. purple/500 (#B056FF) is the mid-tone primary. ' +
        'Also aliased as "port" for backward compatibility. purple/700 (#8700D3) for dark accents.'
      }
      swatches={buildSwatches('purple', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 16. Teal
// ===========================================================================

export const Teal: StoryObj = {
  name: '16 - Teal',
  render: () => (
    <ScaleSection
      title="Teal"
      description={
        'Classic teal scale. teal/500 (#009688) is the mid-tone primary. ' +
        'Provides cooler blue-green options compared to Turquoise and Cerulean.'
      }
      swatches={buildSwatches('teal', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 17. Periwinkle
// ===========================================================================

export const Periwinkle: StoryObj = {
  name: '17 - Periwinkle',
  render: () => (
    <ScaleSection
      title="Periwinkle"
      description={
        'Blue-violet accent closely related to Blurple but with distinct hue shifts. ' +
        'periwinkle/700 (#5E39FF) is the primary stop, periwinkle/600 (#6C5EFF) for medium contrast.'
      }
      swatches={buildSwatches('periwinkle', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 18. Marine
// ===========================================================================

export const Marine: StoryObj = {
  name: '18 - Marine',
  render: () => (
    <ScaleSection
      title="Marine"
      description={
        'Blue-toned palette with only 50-900 stops (no A-series accent variants). ' +
        'marine/500 (#0095DA) is the mid-tone primary. Used for supplementary blue accents ' +
        'that need distinction from the Blue and Cerulean palettes.'
      }
      swatches={buildSwatches('marine', MARINE_SHADES)}
    />
  ),
}

// ===========================================================================
// 19. Blue
// ===========================================================================

export const Blue: StoryObj = {
  name: '19 - Blue',
  render: () => (
    <ScaleSection
      title="Blue"
      description={
        'Core blue palette. blue/700 (#006FCF) maps to dataSeries2 and is used as the primary ' +
        'blue accent throughout the system. blue/500 (#37A0F6) and blue/300 (#89C5F4) appear in ' +
        'data visualization series 9-10.'
      }
      swatches={buildSwatches('blue', FULL_SHADES)}
    />
  ),
}

// ===========================================================================
// 20. Blurmuda
// ===========================================================================

export const Blurmuda: StoryObj = {
  name: '20 - Blurmuda',
  render: () => (
    <ScaleSection
      title="Blurmuda"
      description={
        'A compact 3-stop palette (main / light / dark) used for focused accent needs. ' +
        'blurmudaMain (#2270EE) maps to dataSeries12. Not a full shade scale -- ' +
        'use the Blue or Marine palettes when more gradient stops are required.'
      }
      swatches={[
        { name: 'light', hex: primitive.blurmudaLight, token: 'blurmudaLight' },
        { name: 'main', hex: primitive.blurmudaMain, token: 'blurmudaMain' },
        { name: 'dark', hex: primitive.blurmudaDark, token: 'blurmudaDark' },
      ]}
    />
  ),
}

// ===========================================================================
// 21. Data Visualization
// ===========================================================================

/**
 * Data Visualization uses two token layers:
 *
 * 1. **Primitive dataSeries1-18** -- flat hex values in primitive.ts, used by
 *    legacy chart components.
 * 2. **Semantic dataVizSeries1-18** -- references to specific palette stops
 *    (e.g., dataVizSeries1 = violet500). Newer components should prefer the
 *    semantic tokens for theme-ability.
 *
 * The table below shows both so engineers can choose the correct layer.
 */

const DATA_VIZ_SERIES: {
  name: string
  hex: string
  token: string
  semanticRef: string
}[] = [
  { name: 'S1', hex: primitive.dataSeries1, token: 'dataSeries1', semanticRef: 'dataVizSeries1 -> violet500' },
  { name: 'S2', hex: primitive.dataSeries2, token: 'dataSeries2', semanticRef: 'dataVizSeries2 -> violet300' },
  { name: 'S3', hex: primitive.dataSeries3, token: 'dataSeries3', semanticRef: 'dataVizSeries3 -> red500' },
  { name: 'S4', hex: primitive.dataSeries4, token: 'dataSeries4', semanticRef: 'dataVizSeries4 -> red300' },
  { name: 'S5', hex: primitive.dataSeries5, token: 'dataSeries5', semanticRef: 'dataVizSeries5 -> cerulean500' },
  { name: 'S6', hex: primitive.dataSeries6, token: 'dataSeries6', semanticRef: 'dataVizSeries6 -> cerulean300' },
  { name: 'S7', hex: primitive.dataSeries7, token: 'dataSeries7', semanticRef: 'dataVizSeries7 -> magenta500' },
  { name: 'S8', hex: primitive.dataSeries8, token: 'dataSeries8', semanticRef: 'dataVizSeries8 -> magenta300' },
  { name: 'S9', hex: primitive.dataSeries9, token: 'dataSeries9', semanticRef: 'dataVizSeries9 -> blue500' },
  { name: 'S10', hex: primitive.dataSeries10, token: 'dataSeries10', semanticRef: 'dataVizSeries10 -> blue300' },
  { name: 'S11', hex: primitive.dataSeries11, token: 'dataSeries11', semanticRef: 'dataVizSeries11 -> pear500' },
  { name: 'S12', hex: primitive.dataSeries12, token: 'dataSeries12', semanticRef: 'dataVizSeries12 -> pear300' },
  { name: 'S13', hex: primitive.dataSeries13, token: 'dataSeries13', semanticRef: 'dataVizSeries13 -> gray500' },
  { name: 'S14', hex: primitive.dataSeries14, token: 'dataSeries14', semanticRef: 'dataVizSeries14 -> gray300' },
  { name: 'S15', hex: primitive.dataSeries15, token: 'dataSeries15', semanticRef: 'dataVizSeries15 -> orange500' },
  { name: 'S16', hex: primitive.dataSeries16, token: 'dataSeries16', semanticRef: 'dataVizSeries16 -> orange300' },
  { name: 'S17', hex: primitive.dataSeries17, token: 'dataSeries17', semanticRef: 'dataVizSeries17 -> terracotta500' },
  { name: 'S18', hex: primitive.dataSeries18, token: 'dataSeries18', semanticRef: 'dataVizSeries18 -> terracotta300' },
]

export const DataVisualization: StoryObj = {
  name: '21 - Data Visualization (18 Series)',
  render: () => (
    <div style={{ marginBottom: 40 }}>
      <h3
        style={{
          fontFamily: FONT_STACK,
          fontSize: 20,
          fontWeight: 700,
          color: '#323334',
          margin: '0 0 4px 0',
          letterSpacing: '-0.01em',
        }}
      >
        Data Visualization
      </h3>
      <p
        style={{
          fontFamily: FONT_STACK,
          fontSize: 14,
          fontWeight: 400,
          color: '#939598',
          margin: '0 0 8px 0',
          lineHeight: '20px',
          maxWidth: 720,
        }}
      >
        18 series colors for charts and graphs. The primitive layer defines flat hex values
        (dataSeries1-18); the semantic layer maps them to palette stops for theme-ability
        (dataVizSeries1-18). Newer components should prefer the semantic tokens.
      </p>
      <p
        style={{
          fontFamily: FONT_STACK,
          fontSize: 12,
          fontWeight: 400,
          color: '#7B7D7F',
          margin: '0 0 20px 0',
          lineHeight: '18px',
          maxWidth: 720,
        }}
      >
        Note: The primitive dataSeries values differ from the semantic dataVizSeries references.
        The primitive values are legacy; the semantic values are the current standard.
      </p>

      {/* Swatch grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        {DATA_VIZ_SERIES.map((s) => (
          <Swatch key={s.token} name={s.name} hex={s.hex} token={s.token} />
        ))}
      </div>

      {/* Reference table: primitive -> semantic mapping */}
      <h4
        style={{
          fontFamily: FONT_STACK,
          fontSize: 14,
          fontWeight: 600,
          color: '#323334',
          margin: '0 0 8px 0',
        }}
      >
        Semantic layer mapping (dataVizSeries)
      </h4>
      <table
        style={{
          fontFamily: FONT_STACK,
          fontSize: 12,
          borderCollapse: 'collapse',
          width: '100%',
          maxWidth: 680,
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Series</th>
            <th style={thStyle}>Primitive token</th>
            <th style={thStyle}>Primitive hex</th>
            <th style={thStyle}>Semantic reference</th>
          </tr>
        </thead>
        <tbody>
          {DATA_VIZ_SERIES.map((s) => (
            <tr key={s.token}>
              <td style={tdStyle}>
                <span
                  style={{
                    display: 'inline-block',
                    width: 12,
                    height: 12,
                    borderRadius: 2,
                    backgroundColor: s.hex,
                    marginRight: 6,
                    verticalAlign: 'middle',
                  }}
                />
                {s.name}
              </td>
              <td style={{ ...tdStyle, fontFamily: MONO_STACK }}>{s.token}</td>
              <td style={{ ...tdStyle, fontFamily: MONO_STACK }}>{s.hex}</td>
              <td style={{ ...tdStyle, fontFamily: MONO_STACK, fontSize: 11 }}>
                {s.semanticRef}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '6px 12px 6px 0',
  borderBottom: '2px solid #DDDEDE',
  fontWeight: 600,
  color: '#494A4C',
}

const tdStyle: React.CSSProperties = {
  padding: '5px 12px 5px 0',
  borderBottom: '1px solid #F2F2F2',
  color: '#616365',
}
