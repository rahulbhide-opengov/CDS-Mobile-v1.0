import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  baseStyles,
  buttonStyles,
  inputStyles,
  chipStyles,
  avatarStyles,
  tableStyles,
  tooltipStyles,
  alertStyles,
  bottomNavStyles,
  type ResponsiveTextStyle,
  type TextStyleDef,
} from '@opengov/cds-tokens'

const FONT_LINK = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap'
const WEIGHT_NAMES: Record<number, string> = { 300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' }

function FontLoader({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (!document.querySelector(`link[href="${FONT_LINK}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FONT_LINK
      document.head.appendChild(link)
    }
  }, [])
  return <>{children}</>
}

function StyleRow({ name, style, preview }: { name: string; style: TextStyleDef; preview?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '12px 0', borderBottom: '1px solid #DDDEDE' }}>
      <div style={{ width: 140, flexShrink: 0 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, fontWeight: 600, color: '#323334' }}>{name}</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#939598', marginTop: 2 }}>
          {style.fontSize}px / {WEIGHT_NAMES[style.fontWeight]} / {style.lineHeight}px
          {style.letterSpacing !== 0 ? ` / ${style.letterSpacing}ls` : ''}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <span
          style={{
            fontFamily: 'DM Sans, system-ui',
            fontSize: Math.min(style.fontSize, 48),
            fontWeight: style.fontWeight,
            lineHeight: `${style.lineHeight}px`,
            letterSpacing: style.letterSpacing,
            color: '#323334',
            textTransform: style.textTransform,
          }}
        >
          {preview || 'The quick brown fox jumps over the lazy dog'}
        </span>
      </div>
    </div>
  )
}

function StyleTable({ title, description, styles }: {
  title: string
  description: string
  styles: Record<string, ResponsiveTextStyle>
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', margin: '0 0 4px 0' }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', margin: '0 0 16px 0' }}>
        {description}
      </p>
      {Object.entries(styles).map(([name, style]) => (
        <StyleRow key={name} name={name} style={style.mobile} />
      ))}
    </div>
  )
}

function ResponsiveTable({ title, description, styles }: {
  title: string
  description: string
  styles: Record<string, ResponsiveTextStyle>
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', margin: '0 0 4px 0' }}>
        {title}
      </h2>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', margin: '0 0 16px 0' }}>
        {description}
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, system-ui' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #DDDEDE', textAlign: 'left' }}>
            <th style={{ padding: '8px 8px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Style</th>
            <th style={{ padding: '8px 8px', fontSize: 12, fontWeight: 600, color: '#4B3FFF' }}>Mobile (390)</th>
            <th style={{ padding: '8px 8px', fontSize: 12, fontWeight: 600, color: '#546574' }}>Tablet (768)</th>
            <th style={{ padding: '8px 8px', fontSize: 12, fontWeight: 600, color: '#616365' }}>Desktop (1440)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(styles).map(([name, style]) => (
            <tr key={name} style={{ borderBottom: '1px solid #DDDEDE' }}>
              <td style={{ padding: '8px', fontFamily: 'DM Mono, monospace', fontSize: 12, fontWeight: 600, color: '#323334' }}>
                {name}
              </td>
              {(['mobile', 'tablet', 'desktop'] as const).map((bp) => (
                <td key={bp} style={{ padding: '8px', fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#7B7D7F' }}>
                  {style[bp].fontSize}px / {style[bp].fontWeight} / {style[bp].lineHeight}lh / {style[bp].letterSpacing}ls
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const meta: Meta = {
  title: 'Foundations/Text Styles',
  parameters: { layout: 'padded' },
  decorators: [(Story) => <FontLoader><Story /></FontLoader>],
}
export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const BaseStylesPreview: StoryObj = {
  name: '01. Base Styles (Visual)',
  render: () => (
    <StyleTable
      title="Base Text Styles"
      description="Display 1-5, Heading 1-6, Body 1-3, Subtitle 1-2, Caption, Overline, Help. All shown at mobile (390px) sizes."
      styles={baseStyles}
    />
  ),
}

export const BaseStylesResponsive: StoryObj = {
  name: '02. Base Styles (Responsive Table)',
  render: () => (
    <ResponsiveTable
      title="Base Styles — Responsive Specs"
      description="Side-by-side comparison of font size, weight, line height, and letter spacing across all three breakpoints."
      styles={baseStyles}
    />
  ),
}

export const ButtonTypography: StoryObj = {
  name: '03. Button Typography',
  render: () => (
    <div>
      <StyleTable
        title="Button Text Styles"
        description="Large (16/SemiBold), Medium (14/Medium), Small (13 mobile / 12 desktop / Medium)."
        styles={buttonStyles}
      />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        {Object.entries(buttonStyles).map(([size, style]) => (
          <div
            key={size}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: size === 'large' ? 40 : size === 'medium' ? 32 : 28,
              paddingLeft: size === 'large' ? 16 : size === 'medium' ? 12 : 8,
              paddingRight: size === 'large' ? 16 : size === 'medium' ? 12 : 8,
              backgroundColor: '#4B3FFF', borderRadius: 4,
              fontFamily: 'DM Sans, system-ui', fontSize: style.mobile.fontSize,
              fontWeight: style.mobile.fontWeight, lineHeight: `${style.mobile.lineHeight}px`,
              color: '#FFFFFF',
            }}
          >
            {size.charAt(0).toUpperCase() + size.slice(1)} Button
          </div>
        ))}
      </div>
    </div>
  ),
}

export const InputTypography: StoryObj = {
  name: '04. Input Typography',
  render: () => (
    <div>
      <StyleTable
        title="Input Text Styles"
        description="Labels (sm/md/lg), Values (sm/md/lg), Helper text, Description text."
        styles={inputStyles}
      />
      <ResponsiveTable
        title="Input Styles — Responsive Specs"
        description="Input typography varies significantly across breakpoints."
        styles={inputStyles}
      />
    </div>
  ),
}

export const ChipTypography: StoryObj = {
  name: '05. Chip Typography',
  render: () => (
    <div>
      <StyleTable
        title="Chip Text Styles"
        description="Large (14/Medium), Medium (13/Medium), Small (12/Medium). All use 0.16 letter spacing."
        styles={chipStyles}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
        {Object.entries(chipStyles).map(([size, style]) => (
          <div
            key={size}
            style={{
              display: 'inline-flex', alignItems: 'center',
              height: size === 'large' ? 40 : size === 'medium' ? 32 : 28,
              paddingLeft: 12, paddingRight: 12,
              backgroundColor: '#F2F2F2', borderRadius: 4, border: '1px solid #ADAFB1',
              fontFamily: 'DM Sans, system-ui', fontSize: style.mobile.fontSize,
              fontWeight: style.mobile.fontWeight, lineHeight: `${style.mobile.lineHeight}px`,
              letterSpacing: style.mobile.letterSpacing, color: '#323334',
            }}
          >
            {size} chip
          </div>
        ))}
      </div>
    </div>
  ),
}

export const AvatarTypography: StoryObj = {
  name: '06. Avatar Initials',
  render: () => (
    <div>
      <StyleTable
        title="Avatar Initials"
        description="Large (16/SemiBold), Medium (12/SemiBold), Small (10/Regular)."
        styles={avatarStyles}
      />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
        {[
          { size: 'large', dim: 40, style: avatarStyles.large.mobile, initials: 'AB' },
          { size: 'medium', dim: 32, style: avatarStyles.medium.mobile, initials: 'CD' },
          { size: 'small', dim: 24, style: avatarStyles.small.mobile, initials: 'EF' },
        ].map((a) => (
          <div
            key={a.size}
            style={{
              width: a.dim, height: a.dim, borderRadius: a.dim,
              backgroundColor: '#4B3FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'DM Sans, system-ui', fontSize: a.style.fontSize,
              fontWeight: a.style.fontWeight, color: '#FFFFFF',
            }}
          >
            {a.initials}
          </div>
        ))}
      </div>
    </div>
  ),
}

export const TableTypography: StoryObj = {
  name: '07. Table Typography',
  render: () => (
    <div>
      <StyleTable
        title="Table Text Styles"
        description="Header (16/Medium), Cell (15 mobile / 14 desktop / Regular), Footer (15 mobile / 14 desktop / Regular)."
        styles={tableStyles}
      />
      <table style={{ width: '100%', maxWidth: 500, borderCollapse: 'collapse', marginTop: 16, fontFamily: 'DM Sans, system-ui' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #DDDEDE' }}>
            <th style={{ padding: 12, textAlign: 'left', fontSize: tableStyles.header.mobile.fontSize, fontWeight: tableStyles.header.mobile.fontWeight, color: '#323334' }}>Department</th>
            <th style={{ padding: 12, textAlign: 'right', fontSize: tableStyles.header.mobile.fontSize, fontWeight: tableStyles.header.mobile.fontWeight, color: '#323334' }}>Budget</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #DDDEDE' }}>
            <td style={{ padding: 12, fontSize: tableStyles.cell.mobile.fontSize, fontWeight: tableStyles.cell.mobile.fontWeight, color: '#323334' }}>Public Works</td>
            <td style={{ padding: 12, textAlign: 'right', fontSize: tableStyles.cell.mobile.fontSize, color: '#323334' }}>$2,450,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #DDDEDE' }}>
            <td style={{ padding: 12, fontSize: tableStyles.cell.mobile.fontSize, fontWeight: tableStyles.cell.mobile.fontWeight, color: '#323334' }}>Planning</td>
            <td style={{ padding: 12, textAlign: 'right', fontSize: tableStyles.cell.mobile.fontSize, color: '#323334' }}>$1,800,000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid #DDDEDE' }}>
            <td style={{ padding: 12, fontSize: tableStyles.footer.mobile.fontSize, fontWeight: 600, color: '#323334' }}>Total</td>
            <td style={{ padding: 12, textAlign: 'right', fontSize: tableStyles.footer.mobile.fontSize, fontWeight: 600, color: '#323334' }}>$4,250,000</td>
          </tr>
        </tfoot>
      </table>
    </div>
  ),
}

export const MiscTypography: StoryObj = {
  name: '08. Tooltip, Alert, Bottom Nav',
  render: () => (
    <div>
      <StyleTable
        title="Tooltip"
        description="Small (12 mobile / 10 desktop, Medium weight)."
        styles={tooltipStyles}
      />
      <StyleTable
        title="Alert"
        description="Title (13 mobile / Bold), Description (14 / Medium)."
        styles={alertStyles}
      />
      <StyleTable
        title="Bottom Navigation"
        description="Active label (14/Medium), Default label (12/Regular)."
        styles={bottomNavStyles}
      />
    </div>
  ),
}

export const AllStylesCompact: StoryObj = {
  name: '09. All Styles (Compact Reference)',
  render: () => {
    const allCategories = [
      { title: 'Base', styles: baseStyles },
      { title: 'Button', styles: buttonStyles },
      { title: 'Input', styles: inputStyles },
      { title: 'Chip', styles: chipStyles },
      { title: 'Avatar', styles: avatarStyles },
      { title: 'Table', styles: tableStyles },
      { title: 'Tooltip', styles: tooltipStyles },
      { title: 'Alert', styles: alertStyles },
      { title: 'Bottom Nav', styles: bottomNavStyles },
    ]
    return (
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 24 }}>
          Complete CDS 37 Typography Reference
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'DM Sans, system-ui', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #DDDEDE', textAlign: 'left' }}>
              <th style={{ padding: 6, color: '#616365' }}>Category</th>
              <th style={{ padding: 6, color: '#616365' }}>Style</th>
              <th style={{ padding: 6, color: '#616365' }}>Size</th>
              <th style={{ padding: 6, color: '#616365' }}>Weight</th>
              <th style={{ padding: 6, color: '#616365' }}>LH</th>
              <th style={{ padding: 6, color: '#616365' }}>LS</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map(({ title, styles }) =>
              Object.entries(styles).map(([name, style], idx) => (
                <tr key={`${title}-${name}`} style={{ borderBottom: '1px solid #DDDEDE' }}>
                  {idx === 0 && (
                    <td
                      rowSpan={Object.keys(styles).length}
                      style={{ padding: 6, fontWeight: 600, color: '#4B3FFF', verticalAlign: 'top' }}
                    >
                      {title}
                    </td>
                  )}
                  <td style={{ padding: 6, fontFamily: 'DM Mono, monospace', color: '#323334' }}>{name}</td>
                  <td style={{ padding: 6, fontFamily: 'DM Mono, monospace', color: '#7B7D7F' }}>{style.mobile.fontSize}px</td>
                  <td style={{ padding: 6, fontFamily: 'DM Mono, monospace', color: '#7B7D7F' }}>{WEIGHT_NAMES[style.mobile.fontWeight]}</td>
                  <td style={{ padding: 6, fontFamily: 'DM Mono, monospace', color: '#7B7D7F' }}>{style.mobile.lineHeight}</td>
                  <td style={{ padding: 6, fontFamily: 'DM Mono, monospace', color: '#7B7D7F' }}>{style.mobile.letterSpacing}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  },
}
