import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { primitive, buttonStyles } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Since Storybook web can't render RN components directly, we create
// pure HTML/CSS previews that match the exact CDS 37 Figma specs.
// These serve as the visual reference + documentation for the RN components.
// ---------------------------------------------------------------------------

const FONT_LINK = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap'

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

// CDS 37 Button variant colors (from Figma)
const VARIANTS = {
  primary: {
    idle: { bg: primitive.blurple700, text: '#FFFFFF', border: 'none' },
    hover: { bg: primitive.blurple900, text: '#FFFFFF', border: 'none' },
    label: 'Primary',
    desc: 'Filled blurple. Main CTA.',
  },
  secondary: {
    idle: { bg: 'transparent', text: primitive.blurple700, border: `1px solid ${primitive.blurple700}` },
    hover: { bg: primitive.blurple100, text: primitive.blurple900, border: `1px solid ${primitive.blurple900}` },
    label: 'Secondary',
    desc: 'Outlined blurple. Secondary CTA.',
  },
  secondaryAlt: {
    idle: { bg: 'transparent', text: primitive.blurple700, border: 'none' },
    hover: { bg: primitive.blurple100, text: primitive.blurple900, border: 'none' },
    label: 'Secondary Alt',
    desc: 'Text-only blurple. Ghost primary.',
  },
  tertiary: {
    idle: { bg: 'transparent', text: primitive.slate700, border: `1px solid ${primitive.slate700}` },
    hover: { bg: primitive.gray100, text: primitive.slate700, border: `1px solid ${primitive.slate700}` },
    label: 'Tertiary',
    desc: 'Outlined slate. Neutral action.',
  },
  tertiaryAlt: {
    idle: { bg: 'transparent', text: primitive.slate700, border: 'none' },
    hover: { bg: primitive.gray100, text: primitive.slate700, border: 'none' },
    label: 'Tertiary Alt',
    desc: 'Text-only slate. Ghost neutral.',
  },
  destructive: {
    idle: { bg: primitive.red600, text: '#FFFFFF', border: 'none' },
    hover: { bg: primitive.red700, text: '#FFFFFF', border: 'none' },
    label: 'Destructive',
    desc: 'Filled red. Danger action.',
  },
  destructiveAlt: {
    idle: { bg: 'transparent', text: primitive.red600, border: 'none' },
    hover: { bg: primitive.red700, text: '#FFFFFF', border: 'none' },
    label: 'Destructive Alt',
    desc: 'Text-only red. Ghost danger.',
  },
}

const SIZES = {
  small: { height: 28, ph: 8, pv: 4, gap: 4, ...buttonStyles.small.mobile },
  medium: { height: 32, ph: 12, pv: 4, gap: 4, ...buttonStyles.medium.mobile },
  large: { height: 40, ph: 16, pv: 8, gap: 8, ...buttonStyles.large.mobile },
}

type VariantKey = keyof typeof VARIANTS
type SizeKey = keyof typeof SIZES

function CdsButton({ variant = 'primary' as VariantKey, size = 'medium' as SizeKey, disabled = false, children = 'Action', hovered = false }: {
  variant?: VariantKey; size?: SizeKey; disabled?: boolean; children?: string; hovered?: boolean
}) {
  const [isHover, setIsHover] = useState(hovered)
  const v = VARIANTS[variant]
  const s = SIZES[size]
  const state = isHover && !disabled ? v.hover : v.idle
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap,
        height: s.height, paddingLeft: s.ph, paddingRight: s.ph,
        backgroundColor: state.bg, color: state.text,
        border: state.border === 'none' ? 'none' : state.border,
        borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        fontFamily: 'DM Sans, system-ui', fontSize: s.fontSize, fontWeight: s.fontWeight,
        lineHeight: `${s.lineHeight}px`, letterSpacing: s.letterSpacing || 0,
        transition: 'all 150ms ease',
      }}
    >
      {children}
    </button>
  )
}

function SpecTable({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, fontWeight: 600, color: '#323334', margin: '0 0 8px 0' }}>{title}</h4>
      <table style={{ borderCollapse: 'collapse', fontFamily: 'DM Mono, monospace', fontSize: 12 }}>
        <tbody>
          {rows.map(r => (
            <tr key={r.label} style={{ borderBottom: '1px solid #DDDEDE' }}>
              <td style={{ padding: '4px 12px 4px 0', color: '#939598' }}>{r.label}</td>
              <td style={{ padding: '4px 0', color: '#323334', fontWeight: 500 }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/Buttons',
  parameters: { layout: 'padded' },
  decorators: [(Story) => <FontLoader><Story /></FontLoader>],
}
export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const AllVariants: StoryObj = {
  name: '01. All 7 Variants',
  render: () => (
    <div>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 8 }}>
        Button Variants
      </h2>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
        CDS 37 defines 7 button types. Each shown at Medium size in Idle state.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {(Object.keys(VARIANTS) as VariantKey[]).map(v => (
          <div key={v} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <CdsButton variant={v}>{VARIANTS[v].label}</CdsButton>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#939598' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const AllSizes: StoryObj = {
  name: '02. All 3 Sizes',
  render: () => (
    <div>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 8 }}>
        Button Sizes
      </h2>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
        Small (28px), Medium (32px), Large (40px). Font and padding scale per size.
      </p>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', marginBottom: 24 }}>
        {(Object.keys(SIZES) as SizeKey[]).map(s => (
          <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <CdsButton size={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</CdsButton>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#939598' }}>
              {SIZES[s].height}px / {SIZES[s].fontSize}px / {SIZES[s].fontWeight}
            </span>
          </div>
        ))}
      </div>
      <SpecTable title="Size Specifications" rows={[
        { label: 'Small', value: 'h=28 | px=8 | py=4 | gap=4 | 13px Medium' },
        { label: 'Medium', value: 'h=32 | px=12 | py=4 | gap=4 | 14px Medium' },
        { label: 'Large', value: 'h=40 | px=16 | py=8 | gap=8 | 16px SemiBold' },
      ]} />
    </div>
  ),
}

export const States: StoryObj = {
  name: '03. States (Idle / Hover / Disabled)',
  render: () => (
    <div>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 8 }}>
        Button States
      </h2>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
        Idle, Hover/Pressed, and Disabled (38% opacity). Hover the Idle buttons to see the transition.
      </p>
      <table style={{ borderCollapse: 'collapse', fontFamily: 'DM Sans, system-ui' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #DDDEDE' }}>
            <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Idle</th>
            <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Hover/Pressed</th>
            <th style={{ padding: '8px 16px', fontSize: 12, fontWeight: 600, color: '#616365', textAlign: 'left' }}>Disabled</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(VARIANTS) as VariantKey[]).map(v => (
            <tr key={v} style={{ borderBottom: '1px solid #DDDEDE' }}>
              <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: '#323334' }}>{v}</td>
              <td style={{ padding: '12px 16px' }}><CdsButton variant={v}>{VARIANTS[v].label}</CdsButton></td>
              <td style={{ padding: '12px 16px' }}><CdsButton variant={v} hovered>{VARIANTS[v].label}</CdsButton></td>
              <td style={{ padding: '12px 16px' }}><CdsButton variant={v} disabled>{VARIANTS[v].label}</CdsButton></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}

export const VariantSpecs: StoryObj = {
  name: '04. Color Specifications',
  render: () => (
    <div>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
        Button Color Spec
      </h2>
      {(Object.keys(VARIANTS) as VariantKey[]).map(v => {
        const spec = VARIANTS[v]
        return (
          <SpecTable key={v} title={`${spec.label} (${v})`} rows={[
            { label: 'Description', value: spec.desc },
            { label: 'Idle BG', value: spec.idle.bg },
            { label: 'Idle Text', value: spec.idle.text },
            { label: 'Idle Border', value: spec.idle.border },
            { label: 'Hover BG', value: spec.hover.bg },
            { label: 'Hover Text', value: spec.hover.text },
            { label: 'Hover Border', value: spec.hover.border },
            { label: 'Disabled', value: 'opacity: 0.38 (all colors stay same)' },
          ]} />
        )
      })}
    </div>
  ),
}

export const IconButtons: StoryObj = {
  name: '05. Icon Buttons',
  render: () => {
    const iconSvg = (color: string) => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
    return (
      <div>
        <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 8 }}>
          Icon Buttons
        </h2>
        <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
          Square (borderRadius: 4px) or circular (borderRadius: 9999). Same 7 variants, 3 sizes.
        </p>
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <div>
            <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Variants (32x32)</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {([
                { v: 'primary', bg: primitive.blurple700, c: '#FFF' },
                { v: 'secondary', bg: 'transparent', c: primitive.blurple700, border: primitive.blurple700 },
                { v: 'tertiary', bg: 'transparent', c: primitive.slate700, border: primitive.slate700 },
                { v: 'destructive', bg: primitive.red600, c: '#FFF' },
              ] as const).map(({ v, bg, c, border }) => (
                <div
                  key={v}
                  style={{
                    width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: bg, border: border ? `1px solid ${border}` : 'none', cursor: 'pointer',
                  }}
                >
                  {iconSvg(c)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Sizes</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {[28, 32, 40].map(s => (
                <div
                  key={s}
                  style={{
                    width: s, height: s, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: primitive.blurple700, cursor: 'pointer',
                  }}
                >
                  {iconSvg('#FFF')}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Circular</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {[28, 32, 40].map(s => (
                <div
                  key={s}
                  style={{
                    width: s, height: s, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: primitive.blurple700, cursor: 'pointer',
                  }}
                >
                  {iconSvg('#FFF')}
                </div>
              ))}
            </div>
          </div>
        </div>
        <SpecTable title="Icon Button Sizes" rows={[
          { label: 'Small', value: '28 x 28 px (hitSlop to 44pt touch target)' },
          { label: 'Medium', value: '32 x 32 px (hitSlop to 44pt touch target)' },
          { label: 'Large', value: '40 x 40 px (meets 44pt with hitSlop 2)' },
        ]} />
      </div>
    )
  },
}

export const ButtonGroups: StoryObj = {
  name: '06. Button Groups',
  render: () => (
    <div>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 8 }}>
        Button Groups
      </h2>
      <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, color: '#939598', marginBottom: 24 }}>
        Group buttons with default (8px gap), compact (connected), or loose (16px gap) spacing.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Default spacing (8px gap)</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <CdsButton variant="secondary" size="small">Left</CdsButton>
            <CdsButton variant="secondary" size="small">Center</CdsButton>
            <CdsButton variant="secondary" size="small">Right</CdsButton>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Compact (connected borders)</p>
          <div style={{ display: 'flex', gap: 0 }}>
            <CdsButton variant="secondary" size="small">Left</CdsButton>
            <CdsButton variant="secondary" size="small">Center</CdsButton>
            <CdsButton variant="secondary" size="small">Right</CdsButton>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Mixed variants</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <CdsButton variant="primary" size="medium">Save</CdsButton>
            <CdsButton variant="tertiary" size="medium">Cancel</CdsButton>
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'DM Sans, system-ui', fontSize: 12, fontWeight: 600, color: '#616365', marginBottom: 8 }}>Action pair (primary + destructive)</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <CdsButton variant="primary" size="medium">Confirm</CdsButton>
            <CdsButton variant="destructiveAlt" size="medium">Delete</CdsButton>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <SpecTable title="Button Group Spacing" rows={[
          { label: 'compact', value: '0px gap — connected borders, shared radii' },
          { label: 'default', value: '8px gap — standard button group' },
          { label: 'loose', value: '16px gap — wider spacing' },
        ]} />
      </div>
    </div>
  ),
}

export const UsageGuidelines: StoryObj = {
  name: '07. Usage Guidelines',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
        Button Usage Guidelines
      </h2>
      <div style={{ fontFamily: 'DM Sans, system-ui', fontSize: 14, lineHeight: '22px', color: '#323334' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>Hierarchy</h3>
        <ul style={{ paddingLeft: 20, color: '#616365' }}>
          <li><strong>Primary</strong> — One per screen section. Main call-to-action.</li>
          <li><strong>Secondary</strong> — Supporting actions alongside primary.</li>
          <li><strong>Tertiary</strong> — Neutral actions (cancel, close, dismiss).</li>
          <li><strong>Destructive</strong> — Delete, remove, revoke actions only.</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8 }}>Size Selection</h3>
        <ul style={{ paddingLeft: 20, color: '#616365' }}>
          <li><strong>Large (40px)</strong> — Primary CTAs, form submit, full-width actions.</li>
          <li><strong>Medium (32px)</strong> — Default. Toolbars, cards, dialogs.</li>
          <li><strong>Small (28px)</strong> — Dense UI, tables, inline actions.</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8, color: primitive.green700 }}>Do</h3>
        <ul style={{ paddingLeft: 20, color: '#616365' }}>
          <li>Use consistent button hierarchy within a section</li>
          <li>Pair primary + tertiary for confirm/cancel flows</li>
          <li>Use destructive variant ONLY for irreversible actions</li>
          <li>Keep button labels to 1-3 words</li>
        </ul>

        <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 24, marginBottom: 8, color: primitive.red600 }}>Do Not</h3>
        <ul style={{ paddingLeft: 20, color: '#616365' }}>
          <li>Use multiple Primary buttons in the same section</li>
          <li>Mix more than 2 variant types in a button group</li>
          <li>Use Destructive for non-destructive actions</li>
          <li>Use button labels longer than 4 words</li>
        </ul>
      </div>
    </div>
  ),
}

export const ReactNativeUsage: StoryObj = {
  name: '08. React Native Usage',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <h2 style={{ fontFamily: 'DM Sans, system-ui', fontSize: 22, fontWeight: 600, color: '#323334', marginBottom: 16 }}>
        React Native Import
      </h2>
      <pre style={{
        fontFamily: 'DM Mono, monospace', fontSize: 13, lineHeight: '20px',
        backgroundColor: primitive.gray100, padding: 16, borderRadius: 4,
        overflow: 'auto', color: '#323334',
      }}>
{`import { Button, IconButton, ButtonGroup } from '@opengov/cds-components'

// Primary button (default)
<Button variant="primary" size="md" onPress={handleSave}>
  Save Changes
</Button>

// With icons
<Button
  variant="secondary"
  size="md"
  iconLeft={<AddIcon size={16} color={primitive.blurple700} />}
>
  Add Item
</Button>

// Icon button
<IconButton
  variant="primary"
  size="md"
  icon={<SearchIcon size={20} color="#FFFFFF" />}
  accessibilityLabel="Search"
/>

// Button group
<ButtonGroup spacing="default">
  <Button variant="primary" size="sm">Save</Button>
  <Button variant="tertiary" size="sm">Cancel</Button>
</ButtonGroup>

// Disabled
<Button variant="primary" disabled>Cannot Submit</Button>

// Loading
<Button variant="primary" loading>Saving...</Button>

// Full width
<Button variant="primary" size="lg" fullWidth>
  Submit Application
</Button>`}
      </pre>
    </div>
  ),
}
