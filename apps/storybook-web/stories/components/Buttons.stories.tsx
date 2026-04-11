import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { primitive, buttonStyles } from '@opengov/cds-tokens'
import {
  DocPage, DocSection, DocShowcase, SpecTable, PropsTable, DoDont,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// CDS Button preview component (HTML/CSS replica for Storybook web)
// ---------------------------------------------------------------------------

const VARIANTS = {
  primary:        { idle: { bg: '#4B3FFF', text: '#FFF', border: 'none' },        hover: { bg: '#19009B', text: '#FFF', border: 'none' } },
  secondary:      { idle: { bg: 'transparent', text: '#4B3FFF', border: '1px solid #4B3FFF' }, hover: { bg: '#EEF1FC', text: '#19009B', border: '1px solid #19009B' } },
  secondaryAlt:   { idle: { bg: 'transparent', text: '#4B3FFF', border: 'none' }, hover: { bg: '#EEF1FC', text: '#19009B', border: 'none' } },
  tertiary:       { idle: { bg: 'transparent', text: '#546574', border: '1px solid #546574' }, hover: { bg: '#F2F2F2', text: '#546574', border: '1px solid #546574' } },
  tertiaryAlt:    { idle: { bg: 'transparent', text: '#546574', border: 'none' }, hover: { bg: '#F2F2F2', text: '#546574', border: 'none' } },
  destructive:    { idle: { bg: '#D33423', text: '#FFF', border: 'none' },        hover: { bg: '#B12525', text: '#FFF', border: 'none' } },
  destructiveAlt: { idle: { bg: 'transparent', text: '#D33423', border: 'none' }, hover: { bg: '#B12525', text: '#FFF', border: 'none' } },
} as const

const SIZES = {
  sm: { h: 36, px: 12, fs: 13, fw: 500, gap: 8 },
  md: { h: 44, px: 16, fs: 14, fw: 500, gap: 8 },
  lg: { h: 48, px: 24, fs: 16, fw: 600, gap: 8 },
} as const

type V = keyof typeof VARIANTS
type S = keyof typeof SIZES

function Btn({ variant = 'primary' as V, size = 'md' as S, disabled = false, children = 'Action' }: {
  variant?: V; size?: S; disabled?: boolean; children?: React.ReactNode
}) {
  const [hov, setHov] = useState(false)
  const v = VARIANTS[variant]
  const s = SIZES[size]
  const st = hov && !disabled ? v.hover : v.idle
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap,
        height: s.h, paddingLeft: s.px, paddingRight: s.px,
        backgroundColor: st.bg, color: st.text,
        border: st.border === 'none' ? 'none' : st.border,
        borderRadius: 4, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        fontFamily: "'DM Sans', system-ui", fontSize: s.fs, fontWeight: s.fw,
        lineHeight: '20px', transition: 'all 120ms ease', outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

function PlusIcon({ color = '#FFF', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/Button',
  parameters: { layout: 'fullscreen' },
}
export default meta

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Button"
      description="Buttons trigger actions. CDS 37 defines 7 visual types, 3 sizes optimized for mobile touch targets (WCAG 2.5.8), and loading/disabled states."
      badge="@opengov/cds-components"
    >
      {/* All Variants */}
      <DocSection title="Variants" description="7 button types for different levels of emphasis and intent.">
        <DocShowcase
          preview={
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {(Object.keys(VARIANTS) as V[]).map(v => (
                <Btn key={v} variant={v}>{v.replace(/([A-Z])/g, ' $1').trim()}</Btn>
              ))}
            </div>
          }
          code={`import { Button } from '@opengov/cds-components'

<Button variant="primary" onPress={handleSave}>Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Dismiss</Button>
<Button variant="destructive">Delete</Button>`}
          specs={
            <SpecTable
              headers={['Variant', 'Background', 'Text', 'Border', 'Use case']}
              rows={[
                ['primary', '#4B3FFF (blurple700)', '#FFFFFF', 'none', 'Main CTA'],
                ['secondary', 'transparent', '#4B3FFF', '1px blurple700', 'Secondary action'],
                ['secondaryAlt', 'transparent', '#4B3FFF', 'none', 'Ghost primary'],
                ['tertiary', 'transparent', '#546574 (slate700)', '1px slate700', 'Neutral action'],
                ['tertiaryAlt', 'transparent', '#546574', 'none', 'Ghost neutral'],
                ['destructive', '#D33423 (red600)', '#FFFFFF', 'none', 'Danger action'],
                ['destructiveAlt', 'transparent', '#D33423', 'none', 'Ghost danger'],
              ]}
            />
          }
        />
      </DocSection>

      {/* Sizes */}
      <DocSection title="Sizes" description="All sizes meet WCAG 2.5.8 minimum 44px touch target for mobile.">
        <DocShowcase
          preview={
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <Btn size="sm">Small</Btn>
              <Btn size="md">Medium</Btn>
              <Btn size="lg">Large</Btn>
            </div>
          }
          code={`<Button size="sm">Small</Button>   // 36px + hitSlop→44
<Button size="md">Medium</Button>  // 44px (WCAG AA)
<Button size="lg">Large</Button>   // 48px (MD3)`}
          specs={
            <SpecTable
              headers={['Size', 'Height', 'Padding H', 'Font', 'Weight', 'Touch Target']}
              rows={[
                ['sm', '36px', '12px', '13px', 'Medium (500)', '44pt via hitSlop'],
                ['md', '44px', '16px', '14px', 'Medium (500)', '44pt native'],
                ['lg', '48px', '24px', '16px', 'SemiBold (600)', '48pt native (MD3)'],
              ]}
            />
          }
        />
      </DocSection>

      {/* States */}
      <DocSection title="States" description="Idle, hover/pressed, and disabled. Disabled uses 38% opacity per Figma spec.">
        <DocShowcase
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(['primary', 'secondary', 'tertiary', 'destructive'] as V[]).map(v => (
                <div key={v} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ width: 100, fontSize: 12, fontFamily: "'DM Mono', monospace", color: 'rgba(0,0,0,0.6)' }}>{v}</span>
                  <Btn variant={v}>Idle</Btn>
                  <Btn variant={v} disabled>Disabled</Btn>
                </div>
              ))}
            </div>
          }
          code={`<Button disabled>Cannot Submit</Button>
<Button loading>Saving...</Button>

// Disabled applies opacity: 0.38 to the entire button.
// Colors remain the same as idle state.`}
        />
      </DocSection>

      {/* With Icons */}
      <DocSection title="With Icons">
        <DocShowcase
          preview={
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Btn variant="primary"><PlusIcon /> Create New</Btn>
              <Btn variant="secondary"><PlusIcon color="#4B3FFF" /> Add Item</Btn>
              <Btn variant="tertiary"><PlusIcon color="#546574" /> Options</Btn>
            </div>
          }
          code={`<Button variant="primary" iconLeft={<AddIcon size={16} color="#FFF" />}>
  Create New
</Button>

<Button variant="secondary" iconRight={<ChevronRightIcon />}>
  Continue
</Button>`}
        />
      </DocSection>

      {/* Icon Buttons */}
      <DocSection title="Icon Button" description="Square (radius 4) or circular (radius 9999). Same 7 variants.">
        <DocShowcase
          preview={
            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {(['primary', 'secondary', 'tertiary', 'destructive'] as const).map(v => {
                  const colors = { primary: { bg: '#4B3FFF', ic: '#FFF' }, secondary: { bg: 'transparent', ic: '#4B3FFF', border: '#4B3FFF' }, tertiary: { bg: 'transparent', ic: '#546574', border: '#546574' }, destructive: { bg: '#D33423', ic: '#FFF' } }
                  const c = colors[v]
                  return (
                    <div key={v} style={{
                      width: 44, height: 44, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: c.bg, border: 'border' in c ? `1px solid ${c.border}` : 'none', cursor: 'pointer',
                    }}>
                      <PlusIcon color={c.ic} />
                    </div>
                  )
                })}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {[36, 44, 48].map(s => (
                  <div key={s} style={{
                    width: s, height: s, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#4B3FFF', cursor: 'pointer',
                  }}>
                    <PlusIcon />
                  </div>
                ))}
              </div>
            </div>
          }
          code={`<IconButton
  variant="primary"
  size="md"
  icon={<SearchIcon size={20} color="#FFF" />}
  accessibilityLabel="Search"
/>

<IconButton variant="secondary" size="sm" circular />
<IconButton variant="destructive" size="lg" />`}
          specs={
            <SpecTable
              headers={['Size', 'Dimensions', 'Touch Target', 'Shape']}
              rows={[
                ['sm', '36 × 36 px', '44pt via hitSlop', 'Square (4px) or Circular'],
                ['md', '44 × 44 px', '44pt native', 'Square (4px) or Circular'],
                ['lg', '48 × 48 px', '48pt native', 'Square (4px) or Circular'],
              ]}
            />
          }
        />
      </DocSection>

      {/* Button Group */}
      <DocSection title="Button Group" description="Group buttons with consistent spacing. Compact mode connects borders.">
        <DocShowcase
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.38)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Default (8px gap)</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="secondary" size="sm">Left</Btn>
                  <Btn variant="secondary" size="sm">Center</Btn>
                  <Btn variant="secondary" size="sm">Right</Btn>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.38)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>Action pair</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Btn variant="primary">Confirm</Btn>
                  <Btn variant="tertiaryAlt">Cancel</Btn>
                </div>
              </div>
            </div>
          }
          code={`<ButtonGroup spacing="default">
  <Button variant="secondary" size="sm">Left</Button>
  <Button variant="secondary" size="sm">Center</Button>
  <Button variant="secondary" size="sm">Right</Button>
</ButtonGroup>

<ButtonGroup spacing="compact">
  {/* Borders connect, shared corner radius */}
</ButtonGroup>`}
        />
      </DocSection>

      {/* API */}
      <DocSection title="API Reference">
        <PropsTable props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'secondaryAlt' | 'tertiary' | 'tertiaryAlt' | 'destructive' | 'destructiveAlt'", default: "'primary'", description: 'Visual style variant' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset (36/44/48px)' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction, applies 38% opacity' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Shows spinner, disables interaction' },
          { name: 'iconLeft', type: 'ReactNode', description: 'Icon rendered before label' },
          { name: 'iconRight', type: 'ReactNode', description: 'Icon rendered after label' },
          { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches to fill container' },
          { name: 'onPress', type: '() => void', description: 'Press handler', required: true },
          { name: 'children', type: 'ReactNode', description: 'Button label', required: true },
          { name: 'accessibilityLabel', type: 'string', description: 'Screen reader label override' },
        ]} />
      </DocSection>

      {/* Guidelines */}
      <DocSection title="Usage Guidelines">
        <DoDont
          dos={[
            'Use one Primary button per screen section',
            'Pair primary + tertiary for confirm/cancel',
            'Keep labels to 1–3 words',
            'Use Large size for main CTAs on mobile',
          ]}
          donts={[
            'Use multiple Primary buttons in one section',
            'Mix more than 2 variants in a button group',
            'Use Destructive for non-destructive actions',
            'Use Small size for primary CTAs on mobile',
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
