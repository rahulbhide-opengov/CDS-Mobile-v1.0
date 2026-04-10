import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fontSize, fontWeight, lineHeight, letterSpacing, fontFamily } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FONT_LINK = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'

function FontLoader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />
      {children}
    </>
  )
}

// CDS 37 Figma text style definitions (mobile column)
const TEXT_STYLES = [
  { name: 'Display 1', size: 64, weight: 700, lineH: 76, letterS: -0.4, font: 'heading' },
  { name: 'Display 2', size: 48, weight: 700, lineH: 56, letterS: -0.4, font: 'heading' },
  { name: 'Display 3', size: 44, weight: 700, lineH: 48, letterS: -0.4, font: 'heading' },
  { name: 'Display 4', size: 40, weight: 700, lineH: 38, letterS: -0.4, font: 'heading' },
  { name: 'Display 5', size: 32, weight: 700, lineH: 38, letterS: -0.4, font: 'heading' },
  { name: 'Heading 1', size: 28, weight: 600, lineH: 32, letterS: -0.25, font: 'heading' },
  { name: 'Heading 2', size: 22, weight: 600, lineH: 32, letterS: -0.25, font: 'heading' },
  { name: 'Heading 3', size: 18, weight: 600, lineH: 24, letterS: -0.2, font: 'heading' },
  { name: 'Heading 4', size: 16, weight: 600, lineH: 20, letterS: -0.2, font: 'heading' },
  { name: 'Heading 5', size: 14, weight: 600, lineH: 16, letterS: 0, font: 'heading' },
  { name: 'Heading 6', size: 13, weight: 600, lineH: 16, letterS: 0, font: 'heading' },
  { name: 'Body 1', size: 16, weight: 400, lineH: 20, letterS: 0.15, font: 'body' },
  { name: 'Body 2', size: 14, weight: 400, lineH: 18, letterS: 0.17, font: 'body' },
  { name: 'Body 3', size: 13, weight: 400, lineH: 16, letterS: 0.17, font: 'body' },
  { name: 'Subtitle 1', size: 16, weight: 400, lineH: 24, letterS: 0.15, font: 'body' },
  { name: 'Subtitle 2', size: 14, weight: 400, lineH: 20, letterS: 0.15, font: 'body' },
  { name: 'Caption', size: 12, weight: 400, lineH: 20, letterS: 0, font: 'body' },
  { name: 'Overline', size: 12, weight: 500, lineH: 26, letterS: 1.0, font: 'body', transform: 'uppercase' as const },
  { name: 'Help', size: 10, weight: 600, lineH: 14, letterS: 0.4, font: 'body' },
]

const WEIGHT_NAMES: Record<number, string> = {
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'padded' },
}
export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const TypeScale: StoryObj = {
  name: 'Complete Type Scale (DM Sans)',
  render: () => (
    <FontLoader>
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 8 }}>
          CDS 37 Typography Scale
        </h2>
        <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
          Font: DM Sans. All values from CDS 37 Figma mobile column.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, system-ui' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #DDDEDE', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Style</th>
              <th style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Preview</th>
              <th style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Size</th>
              <th style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Weight</th>
              <th style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Line Height</th>
              <th style={{ padding: '8px 12px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Letter Spacing</th>
            </tr>
          </thead>
          <tbody>
            {TEXT_STYLES.map((style) => (
              <tr key={style.name} style={{ borderBottom: '1px solid #DDDEDE' }}>
                <td style={{ padding: '12px', fontSize: 13, fontWeight: 500, color: '#323334', whiteSpace: 'nowrap' }}>
                  {style.name}
                </td>
                <td style={{ padding: '12px', maxWidth: 400 }}>
                  <span
                    style={{
                      fontFamily: 'DM Sans, system-ui',
                      fontSize: Math.min(style.size, 40), // Cap preview size
                      fontWeight: style.weight,
                      lineHeight: `${style.lineH}px`,
                      letterSpacing: style.letterS,
                      color: '#323334',
                      textTransform: style.transform,
                    }}
                  >
                    {style.name === 'Overline' ? 'OVERLINE TEXT' : 'The quick brown fox'}
                  </span>
                </td>
                <td style={{ padding: '12px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>
                  {style.size}px
                </td>
                <td style={{ padding: '12px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>
                  {style.weight} ({WEIGHT_NAMES[style.weight]})
                </td>
                <td style={{ padding: '12px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>
                  {style.lineH}px
                </td>
                <td style={{ padding: '12px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>
                  {style.letterS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FontLoader>
  ),
}

export const FontWeights: StoryObj = {
  name: 'Font Weights',
  render: () => (
    <FontLoader>
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
          DM Sans Weights
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(fontWeight).map(([name, weight]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: '1px solid #DDDEDE', paddingBottom: 12 }}>
              <span style={{ width: 120, fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>
                {name} ({weight})
              </span>
              <span style={{ fontFamily: 'DM Sans, system-ui', fontSize: 24, fontWeight: Number(weight), color: '#323334' }}>
                DM Sans {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FontLoader>
  ),
}

export const FontSizeTokens: StoryObj = {
  name: 'Font Size Tokens',
  render: () => (
    <FontLoader>
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
          Font Size Token Scale
        </h2>
        <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
          Token names map to Tamagui <code>$fontSize</code> values.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(fontSize).map(([token, size]) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '4px 0' }}>
              <code style={{ width: 60, fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#4B3FFF', fontWeight: 600 }}>
                ${token}
              </code>
              <span style={{ width: 50, fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>
                {size}px
              </span>
              <span style={{ fontFamily: 'DM Sans, system-ui', fontSize: size, color: '#323334', lineHeight: 1.2 }}>
                DM Sans
              </span>
            </div>
          ))}
        </div>
      </div>
    </FontLoader>
  ),
}

export const ButtonTypography: StoryObj = {
  name: 'Button Typography (Figma Spec)',
  render: () => (
    <FontLoader>
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
          Button Typography
        </h2>
        <table style={{ borderCollapse: 'collapse', fontFamily: 'DM Sans, system-ui' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #DDDEDE' }}>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Size</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Font Size</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Weight</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Line Height</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Height</th>
              <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Small', size: 12, weight: 500, lh: 22, height: 28 },
              { label: 'Medium', size: 14, weight: 500, lh: 24, height: 32 },
              { label: 'Large', size: 16, weight: 500, lh: 26, height: 40 },
            ].map((btn) => (
              <tr key={btn.label} style={{ borderBottom: '1px solid #DDDEDE' }}>
                <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500 }}>{btn.label}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>{btn.size}px</td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>500 (Medium)</td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>{btn.lh}px</td>
                <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#7B7D7F' }}>{btn.height}px</td>
                <td style={{ padding: '12px 16px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: btn.height,
                      paddingLeft: btn.label === 'Small' ? 8 : btn.label === 'Medium' ? 12 : 16,
                      paddingRight: btn.label === 'Small' ? 8 : btn.label === 'Medium' ? 12 : 16,
                      backgroundColor: '#4B3FFF',
                      borderRadius: 4,
                      fontFamily: 'DM Sans, system-ui',
                      fontSize: btn.size,
                      fontWeight: btn.weight,
                      lineHeight: `${btn.lh}px`,
                      color: '#FFFFFF',
                    }}
                  >
                    Button
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FontLoader>
  ),
}
