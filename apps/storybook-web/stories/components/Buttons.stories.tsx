import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, StateGrid, SpecTable, PropsTable,
  TokenRef, DoDont, Anatomy, AccessSpec, DocDivider,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// Constants — CDS 37 exact palette values
// ---------------------------------------------------------------------------

const FONT = "'DM Sans', system-ui"
const MONO = "'DM Mono', 'SF Mono', monospace"

const VARIANTS = {
  primary:        { idle: { bg: '#4B3FFF', text: '#FFFFFF', border: 'none' },             hover: { bg: '#19009B', text: '#FFFFFF', border: 'none' } },
  secondary:      { idle: { bg: 'transparent', text: '#4B3FFF', border: '1px solid #4B3FFF' }, hover: { bg: '#EEF1FC', text: '#19009B', border: '1px solid #19009B' } },
  secondaryAlt:   { idle: { bg: 'transparent', text: '#4B3FFF', border: 'none' },         hover: { bg: '#EEF1FC', text: '#19009B', border: 'none' } },
  tertiary:       { idle: { bg: 'transparent', text: '#546574', border: '1px solid #546574' }, hover: { bg: '#F2F2F2', text: '#546574', border: '1px solid #546574' } },
  tertiaryAlt:    { idle: { bg: 'transparent', text: '#546574', border: 'none' },         hover: { bg: '#F2F2F2', text: '#546574', border: 'none' } },
  destructive:    { idle: { bg: '#D33423', text: '#FFFFFF', border: 'none' },             hover: { bg: '#B12525', text: '#FFFFFF', border: 'none' } },
  destructiveAlt: { idle: { bg: 'transparent', text: '#D33423', border: 'none' },         hover: { bg: '#B12525', text: '#FFFFFF', border: 'none' } },
} as const

const SIZES = {
  sm: { h: 36, px: 12, fs: 13, fw: 500 as const, gap: 8 },
  md: { h: 44, px: 16, fs: 14, fw: 500 as const, gap: 8 },
  lg: { h: 48, px: 24, fs: 16, fw: 600 as const, gap: 8 },
} as const

type Variant = keyof typeof VARIANTS
type Size = keyof typeof SIZES

// ---------------------------------------------------------------------------
// Pressed-state color helper — darkens hex by mixing toward black
// ---------------------------------------------------------------------------
function darken(hex: string, amount: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  const nr = Math.max(0, Math.round(r * (1 - amount)))
  const ng = Math.max(0, Math.round(g * (1 - amount)))
  const nb = Math.max(0, Math.round(b * (1 - amount)))
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`
}

function getPressedBg(variant: Variant): string {
  const idleBg = VARIANTS[variant].idle.bg
  if (idleBg === 'transparent') {
    // For ghost variants, use a slightly stronger version of hover bg
    const hoverBg = VARIANTS[variant].hover.bg
    if (hoverBg === '#EEF1FC') return '#DDE4F8'
    if (hoverBg === '#F2F2F2') return '#E5E5E5'
    return darken(hoverBg.replace('transparent', '#FFFFFF'), 0.08)
  }
  return darken(idleBg, 0.15)
}

// ---------------------------------------------------------------------------
// Spinner SVG
// ---------------------------------------------------------------------------
function Spinner({ color = '#FFFFFF', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'cds-spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes cds-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="12" cy="12" r="10"
        stroke={color}
        strokeOpacity={0.25}
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Icon helpers
// ---------------------------------------------------------------------------
function PlusIcon({ color = '#FFFFFF', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronRightIcon({ color = '#FFFFFF', size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon({ color = '#FFFFFF', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
      <path d="M16 16l4 4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// CdsButton — HTML/CSS replica with 6 interactive states
// ---------------------------------------------------------------------------

interface CdsButtonProps {
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  focused?: boolean
  pressed?: boolean
  children?: React.ReactNode
}

function CdsButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  focused = false,
  pressed = false,
  children = 'Action',
}: CdsButtonProps) {
  const [hovered, setHovered] = useState(false)
  const [mouseDown, setMouseDown] = useState(false)

  const v = VARIANTS[variant]
  const s = SIZES[size]

  const isDisabled = disabled || loading
  const isPressed = pressed || (mouseDown && !isDisabled)
  const isHovered = hovered && !isDisabled && !isPressed

  // Determine visual state
  let bg: string
  let text: string
  let border: string

  if (isPressed) {
    const pressedBg = getPressedBg(variant)
    bg = v.idle.bg === 'transparent' ? pressedBg : pressedBg
    text = v.hover.text
    border = v.hover.border
  } else if (isHovered) {
    bg = v.hover.bg
    text = v.hover.text
    border = v.hover.border
  } else {
    bg = v.idle.bg
    text = v.idle.text
    border = v.idle.border
  }

  const transform = isPressed ? 'translateY(1px)' : 'none'

  return (
    <button
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouseDown(false) }}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.h,
        paddingLeft: loading ? s.px : s.px,
        paddingRight: s.px,
        backgroundColor: bg,
        color: text,
        border: border === 'none' ? 'none' : border,
        borderRadius: 4,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        fontFamily: FONT,
        fontSize: s.fs,
        fontWeight: s.fw,
        lineHeight: '20px',
        transition: 'all 120ms ease',
        outline: focused ? '2px solid #4B3FFF' : 'none',
        outlineOffset: focused ? 2 : 0,
        transform,
        position: 'relative',
        whiteSpace: 'nowrap',
      }}
    >
      {loading && <Spinner color={text} size={s.fs} />}
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// CdsIconButton — Square or circular icon-only button
// ---------------------------------------------------------------------------

interface CdsIconButtonProps {
  variant?: Variant
  size?: Size
  disabled?: boolean
  circular?: boolean
  icon?: React.ReactNode
}

function CdsIconButton({
  variant = 'primary',
  size = 'md',
  disabled = false,
  circular = false,
  icon,
}: CdsIconButtonProps) {
  const [hovered, setHovered] = useState(false)
  const v = VARIANTS[variant]
  const s = SIZES[size]
  const st = hovered && !disabled ? v.hover : v.idle

  const iconColor = hovered && !disabled ? v.hover.text : v.idle.text

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: s.h,
        height: s.h,
        backgroundColor: st.bg,
        color: st.text,
        border: st.border === 'none' ? 'none' : st.border,
        borderRadius: circular ? 9999 : 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'all 120ms ease',
        outline: 'none',
        padding: 0,
      }}
    >
      {icon || <PlusIcon color={iconColor} size={Math.round(s.h * 0.45)} />}
    </button>
  )
}

// ---------------------------------------------------------------------------
// State rendering helper for StateGrid
// ---------------------------------------------------------------------------

function renderButtonForState(stateKey: string, variant: Variant): React.ReactNode {
  switch (stateKey) {
    case 'idle':
      return <CdsButton variant={variant}>Label</CdsButton>
    case 'hover':
      return (
        <CdsButton variant={variant}>Label</CdsButton>
      )
    case 'pressed':
      return <CdsButton variant={variant} pressed>Label</CdsButton>
    case 'focused':
      return <CdsButton variant={variant} focused>Label</CdsButton>
    case 'disabled':
      return <CdsButton variant={variant} disabled>Label</CdsButton>
    case 'loading':
      return <CdsButton variant={variant} loading>Label</CdsButton>
    default:
      return <CdsButton variant={variant}>Label</CdsButton>
  }
}

// Hover state requires a wrapper that forces the hovered style
function ForcedHoverButton({ variant }: { variant: Variant }) {
  const v = VARIANTS[variant]
  const s = SIZES.md
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.h,
        paddingLeft: s.px,
        paddingRight: s.px,
        backgroundColor: v.hover.bg,
        color: v.hover.text,
        border: v.hover.border === 'none' ? 'none' : v.hover.border,
        borderRadius: 4,
        cursor: 'pointer',
        fontFamily: FONT,
        fontSize: s.fs,
        fontWeight: s.fw,
        lineHeight: '20px',
        outline: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      Label
    </button>
  )
}

// Updated render function that uses ForcedHoverButton for hover state
function renderStateCell(stateKey: string, variant: Variant): React.ReactNode {
  switch (stateKey) {
    case 'idle':
      return <CdsButton variant={variant}>Label</CdsButton>
    case 'hover':
      return <ForcedHoverButton variant={variant} />
    case 'pressed':
      return <CdsButton variant={variant} pressed>Label</CdsButton>
    case 'focused':
      return <CdsButton variant={variant} focused>Label</CdsButton>
    case 'disabled':
      return <CdsButton variant={variant} disabled>Label</CdsButton>
    case 'loading':
      return <CdsButton variant={variant} loading>Label</CdsButton>
    default:
      return <CdsButton variant={variant}>Label</CdsButton>
  }
}

// ---------------------------------------------------------------------------
// Shared state definitions
// ---------------------------------------------------------------------------

const STATE_DEFINITIONS: { label: string; key: string; description: string }[] = [
  { label: 'Idle', key: 'idle', description: 'Default' },
  { label: 'Hover', key: 'hover', description: 'Mouse over' },
  { label: 'Pressed', key: 'pressed', description: 'Mouse down' },
  { label: 'Focused', key: 'focused', description: 'Tab key' },
  { label: 'Disabled', key: 'disabled', description: 'disabled=true' },
  { label: 'Loading', key: 'loading', description: 'loading=true' },
]

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/Button',
  parameters: { layout: 'fullscreen' },
}
export default meta

// ---------------------------------------------------------------------------
// Overview Story — All sections in one scrollable page
// ---------------------------------------------------------------------------

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Button"
      description="Buttons trigger actions. CDS 37 defines 7 visual variants, 3 sizes optimized for mobile touch targets (WCAG 2.5.8), and full loading/disabled/focus state support."
      badge="@opengov/cds-components"
      status="stable"
    >
      {/* ================================================================= */}
      {/* Section 1: Variants                                               */}
      {/* ================================================================= */}
      <DocSection
        title="Variants"
        description="Seven button types spanning three emphasis levels (high, medium, low) and one destructive intent. Each variant defines idle, hover, pressed, focused, disabled, and loading appearances."
      >
        <DocShowcase
          label="7 variants"
          preview={
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <CdsButton variant="primary">Primary</CdsButton>
              <CdsButton variant="secondary">Secondary</CdsButton>
              <CdsButton variant="secondaryAlt">Secondary Alt</CdsButton>
              <CdsButton variant="tertiary">Tertiary</CdsButton>
              <CdsButton variant="tertiaryAlt">Tertiary Alt</CdsButton>
              <CdsButton variant="destructive">Destructive</CdsButton>
              <CdsButton variant="destructiveAlt">Destructive Alt</CdsButton>
            </div>
          }
          code={`import { Button } from '@opengov/cds-components'

<Button variant="primary" onPress={handleSave}>Save</Button>
<Button variant="secondary" onPress={handleCancel}>Cancel</Button>
<Button variant="secondaryAlt" onPress={handleDismiss}>Dismiss</Button>
<Button variant="tertiary" onPress={handleOptions}>Options</Button>
<Button variant="tertiaryAlt" onPress={handleMore}>More</Button>
<Button variant="destructive" onPress={handleDelete}>Delete</Button>
<Button variant="destructiveAlt" onPress={handleRemove}>Remove</Button>`}
          specs={
            <SpecTable
              headers={['Variant', 'Background', 'Text', 'Border', 'Use Case']}
              rows={[
                ['primary',        '#4B3FFF (blurple700)', '#FFFFFF', 'none',               'Main CTA, primary action'],
                ['secondary',      'transparent',          '#4B3FFF', '1px solid blurple700', 'Secondary action with border'],
                ['secondaryAlt',   'transparent',          '#4B3FFF', 'none',               'Ghost primary, low emphasis'],
                ['tertiary',       'transparent',          '#546574 (slate700)', '1px solid slate700', 'Neutral action with border'],
                ['tertiaryAlt',    'transparent',          '#546574', 'none',               'Ghost neutral, lowest emphasis'],
                ['destructive',    '#D33423 (red600)',     '#FFFFFF', 'none',               'Danger action, delete/remove'],
                ['destructiveAlt', 'transparent',          '#D33423', 'none',               'Ghost danger, low-emphasis destructive'],
              ]}
            />
          }
        />
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 2: Sizes                                                  */}
      {/* ================================================================= */}
      <DocSection
        title="Sizes"
        description="Three size presets. All meet or exceed the WCAG 2.5.8 minimum 44px mobile touch target. Small uses hitSlop to pad the tap area to 44pt."
      >
        <DocShowcase
          label="3 sizes"
          preview={
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <CdsButton size="sm">Small</CdsButton>
              <CdsButton size="md">Medium</CdsButton>
              <CdsButton size="lg">Large</CdsButton>
            </div>
          }
          code={`<Button size="sm">Small</Button>   {/* 36px + hitSlop to 44pt */}
<Button size="md">Medium</Button>  {/* 44px native touch target */}
<Button size="lg">Large</Button>   {/* 48px, MD3 recommended */}`}
          specs={
            <SpecTable
              headers={['Size', 'Height', 'Padding H', 'Font Size', 'Font Weight', 'Touch Target']}
              rows={[
                ['sm', '36px', '12px', '13px', 'Medium (500)', '44pt via hitSlop'],
                ['md', '44px', '16px', '14px', 'Medium (500)', '44pt native'],
                ['lg', '48px', '24px', '16px', 'SemiBold (600)', '48pt native (MD3)'],
              ]}
            />
          }
        />
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 3: States                                                 */}
      {/* ================================================================= */}
      <DocSection
        title="States"
        description="Every variant supports six interaction states. Disabled applies 38% opacity. Loading shows a spinner and blocks interaction. Focus ring uses a 2px blurple outline with 2px offset."
      >
        {/* Primary states */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.6)',
            marginBottom: 12, fontFamily: FONT,
          }}>
            Primary
          </div>
          <StateGrid
            states={STATE_DEFINITIONS}
            renderCell={(stateKey) => renderStateCell(stateKey, 'primary')}
          />
        </div>

        {/* Secondary states */}
        <div style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.6)',
            marginBottom: 12, fontFamily: FONT,
          }}>
            Secondary
          </div>
          <StateGrid
            states={STATE_DEFINITIONS}
            renderCell={(stateKey) => renderStateCell(stateKey, 'secondary')}
          />
        </div>

        {/* Destructive states */}
        <div>
          <div style={{
            fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.6)',
            marginBottom: 12, fontFamily: FONT,
          }}>
            Destructive
          </div>
          <StateGrid
            states={STATE_DEFINITIONS}
            renderCell={(stateKey) => renderStateCell(stateKey, 'destructive')}
          />
        </div>
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 4: Anatomy                                                */}
      {/* ================================================================= */}
      <DocSection
        title="Anatomy"
        description="Internal structure of the button component. Leading and trailing icon slots are optional."
      >
        <Anatomy />
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 5: With Icons                                             */}
      {/* ================================================================= */}
      <DocSection
        title="With Icons"
        description="Buttons accept leading icons, trailing icons, or both. Icons inherit the button text color and respect the 8px gap token."
      >
        <DocShowcase
          label="Icon positions"
          preview={
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <CdsButton variant="primary">
                <PlusIcon color="#FFFFFF" size={16} />
                Left Icon
              </CdsButton>
              <CdsButton variant="secondary">
                Continue
                <ChevronRightIcon color="#4B3FFF" size={16} />
              </CdsButton>
              <CdsButton variant="tertiary">
                <PlusIcon color="#546574" size={16} />
                Both Icons
                <ChevronRightIcon color="#546574" size={16} />
              </CdsButton>
              <CdsButton variant="destructive">
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete
              </CdsButton>
            </div>
          }
          code={`<Button variant="primary" iconLeft={<AddIcon size={16} color="#FFF" />}>
  Create New
</Button>

<Button variant="secondary" iconRight={<ChevronRightIcon size={16} />}>
  Continue
</Button>

<Button variant="tertiary"
  iconLeft={<AddIcon size={16} />}
  iconRight={<ChevronRightIcon size={16} />}
>
  Both Icons
</Button>

<Button variant="destructive" iconLeft={<TrashIcon size={16} color="#FFF" />}>
  Delete
</Button>`}
          specs={
            <SpecTable
              headers={['Property', 'Value', 'Notes']}
              rows={[
                ['Icon size', '16px (sm/md) / 20px (lg)', 'Matches font scale'],
                ['Icon-label gap', '8px', 'All sizes'],
                ['Icon color', 'Inherits text color', 'Changes with state'],
              ]}
            />
          }
        />
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 6: Icon Button                                            */}
      {/* ================================================================= */}
      <DocSection
        title="Icon Button"
        description="Square (4px radius) or circular (9999px radius) icon-only buttons. Same 7 variant color system. Requires accessibilityLabel for screen readers."
      >
        <DocShowcase
          label="Variants and shapes"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Variant row */}
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.38)',
                  marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5,
                  fontFamily: MONO,
                }}>
                  Variants (md, square)
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CdsIconButton variant="primary" size="md" />
                  <CdsIconButton variant="secondary" size="md" />
                  <CdsIconButton variant="tertiary" size="md" />
                  <CdsIconButton variant="destructive" size="md" />
                </div>
              </div>
              {/* Size row — square */}
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.38)',
                  marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5,
                  fontFamily: MONO,
                }}>
                  Sizes (square)
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CdsIconButton variant="primary" size="sm" />
                  <CdsIconButton variant="primary" size="md" />
                  <CdsIconButton variant="primary" size="lg" />
                </div>
              </div>
              {/* Size row — circular */}
              <div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.38)',
                  marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5,
                  fontFamily: MONO,
                }}>
                  Sizes (circular)
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <CdsIconButton variant="primary" size="sm" circular />
                  <CdsIconButton variant="primary" size="md" circular />
                  <CdsIconButton variant="primary" size="lg" circular />
                </div>
              </div>
            </div>
          }
          code={`import { IconButton } from '@opengov/cds-components'

<IconButton
  variant="primary"
  size="md"
  icon={<SearchIcon size={20} color="#FFF" />}
  accessibilityLabel="Search"
  onPress={handleSearch}
/>

<IconButton variant="secondary" size="sm" circular />
<IconButton variant="tertiary" size="md" />
<IconButton variant="destructive" size="lg" circular />`}
          specs={
            <SpecTable
              headers={['Size', 'Dimensions', 'Icon Size', 'Touch Target', 'Shape Options']}
              rows={[
                ['sm', '36 x 36 px', '16px', '44pt via hitSlop', 'Square (4px) or Circular'],
                ['md', '44 x 44 px', '20px', '44pt native',     'Square (4px) or Circular'],
                ['lg', '48 x 48 px', '20px', '48pt native',     'Square (4px) or Circular'],
              ]}
            />
          }
        />
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 7: ButtonGroup                                            */}
      {/* ================================================================= */}
      <DocSection
        title="ButtonGroup"
        description="Horizontal or vertical grouping of related button actions."
      >
        <div style={{
          border: '1px dashed rgba(0,0,0,0.12)',
          borderRadius: 12,
          padding: '32px 24px',
          textAlign: 'center',
          color: 'rgba(0,0,0,0.38)',
          fontFamily: FONT,
          fontSize: 14,
          lineHeight: '22px',
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>&#9203;</div>
          ButtonGroup Figma spec pending — documentation will be added when the Figma link is provided.
        </div>
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 8: Accessibility                                          */}
      {/* ================================================================= */}
      <DocSection
        title="Accessibility"
        description="Button components are built to meet WCAG 2.1 AA and 2.2 requirements out of the box."
      >
        <AccessSpec
          items={[
            { label: 'Touch target',   value: '44px minimum (WCAG 2.5.8)',  status: 'pass' },
            { label: 'Focus ring',     value: '2px outline, 2px offset',    status: 'pass' },
            { label: 'ARIA role',      value: 'button',                     status: 'pass' },
            { label: 'Screen reader',  value: 'accessibilityLabel prop',    status: 'pass' },
            { label: 'Disabled state', value: 'aria-disabled=true + opacity 0.38', status: 'pass' },
            { label: 'Color contrast', value: '4.5:1 on white (blurple700)', status: 'pass' },
          ]}
        />
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 9: Token Reference                                        */}
      {/* ================================================================= */}
      <DocSection
        title="Token Reference"
        description="Design tokens consumed by each variant. All values derive from the CDS 37 Foundation palette."
      >
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          fontSize: 13, fontFamily: FONT, lineHeight: '28px',
        }}>
          {/* Primary */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Primary</span>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>bg =</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>text =</span>
            <TokenRef name="white" value="#FFFFFF" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>hover bg =</span>
            <TokenRef name="blurple900" value="#19009B" />
          </div>
          {/* Secondary */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Secondary</span>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>bg =</span>
            <TokenRef name="transparent" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>text =</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>border =</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>hover bg =</span>
            <TokenRef name="blurple100" value="#EEF1FC" />
          </div>
          {/* Tertiary */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Tertiary</span>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>bg =</span>
            <TokenRef name="transparent" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>text =</span>
            <TokenRef name="slate700" value="#546574" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>border =</span>
            <TokenRef name="slate700" value="#546574" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>hover bg =</span>
            <TokenRef name="bgTertiary" value="#F2F2F2" />
          </div>
          {/* Destructive */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Destructive</span>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>bg =</span>
            <TokenRef name="red600" value="#D33423" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>text =</span>
            <TokenRef name="white" value="#FFFFFF" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>hover bg =</span>
            <TokenRef name="red800" value="#B12525" />
          </div>
          {/* DestructiveAlt */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Destructive Alt</span>
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>bg =</span>
            <TokenRef name="transparent" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>text =</span>
            <TokenRef name="red600" value="#D33423" />
            <span style={{ color: 'rgba(0,0,0,0.6)' }}>hover =</span>
            <TokenRef name="red800" value="#B12525" />
          </div>
        </div>
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 10: API Reference                                         */}
      {/* ================================================================= */}
      <DocSection
        title="API Reference"
        description="Complete prop interfaces for Button and IconButton."
      >
        {/* Button props */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{
            fontSize: 16, fontWeight: 600, margin: '0 0 16px 0',
            fontFamily: FONT, color: 'rgba(0,0,0,0.87)',
          }}>
            Button
          </h3>
          <PropsTable props={[
            { name: 'variant',            type: "'primary' | 'secondary' | 'secondaryAlt' | 'tertiary' | 'tertiaryAlt' | 'destructive' | 'destructiveAlt'", default: "'primary'", description: 'Visual style variant' },
            { name: 'size',               type: "'sm' | 'md' | 'lg'",        default: "'md'",  description: 'Size preset (36 / 44 / 48px height)' },
            { name: 'disabled',           type: 'boolean',                    default: 'false', description: 'Disables interaction and applies 38% opacity' },
            { name: 'loading',            type: 'boolean',                    default: 'false', description: 'Shows spinner, disables interaction' },
            { name: 'iconLeft',           type: 'ReactNode',                                    description: 'Icon rendered before label text' },
            { name: 'iconRight',          type: 'ReactNode',                                    description: 'Icon rendered after label text' },
            { name: 'fullWidth',          type: 'boolean',                    default: 'false', description: 'Stretches button to fill container width' },
            { name: 'onPress',            type: '() => void',                                   description: 'Press event handler', required: true },
            { name: 'children',           type: 'ReactNode',                                    description: 'Button label content', required: true },
            { name: 'accessibilityLabel', type: 'string',                                       description: 'Screen reader label override' },
            { name: 'focusRing',          type: 'boolean',                    default: 'true',  description: 'Show focus ring on keyboard navigation' },
            { name: 'testID',             type: 'string',                                       description: 'Test identifier for automation' },
          ]} />
        </div>

        {/* IconButton props */}
        <div>
          <h3 style={{
            fontSize: 16, fontWeight: 600, margin: '0 0 16px 0',
            fontFamily: FONT, color: 'rgba(0,0,0,0.87)',
          }}>
            IconButton
          </h3>
          <PropsTable props={[
            { name: 'variant',            type: "'primary' | 'secondary' | 'secondaryAlt' | 'tertiary' | 'tertiaryAlt' | 'destructive' | 'destructiveAlt'", default: "'primary'", description: 'Visual style variant' },
            { name: 'size',               type: "'sm' | 'md' | 'lg'",        default: "'md'",  description: 'Size preset (36 / 44 / 48px square)' },
            { name: 'disabled',           type: 'boolean',                    default: 'false', description: 'Disables interaction and applies 38% opacity' },
            { name: 'icon',               type: 'ReactNode',                                    description: 'Icon element to render', required: true },
            { name: 'circular',           type: 'boolean',                    default: 'false', description: 'Circular shape (9999px radius) instead of square (4px)' },
            { name: 'onPress',            type: '() => void',                                   description: 'Press event handler', required: true },
            { name: 'onLongPress',        type: '() => void',                                   description: 'Long press event handler' },
            { name: 'accessibilityLabel', type: 'string',                                       description: 'Required screen reader label (no visible text)', required: true },
            { name: 'focusRing',          type: 'boolean',                    default: 'true',  description: 'Show focus ring on keyboard navigation' },
            { name: 'testID',             type: 'string',                                       description: 'Test identifier for automation' },
          ]} />
        </div>
      </DocSection>

      <DocDivider />

      {/* ================================================================= */}
      {/* Section 11: Usage Guidelines                                      */}
      {/* ================================================================= */}
      <DocSection
        title="Usage Guidelines"
        description="Best practices for applying button variants in your layouts."
      >
        <DoDont
          dos={[
            'Use one Primary button per screen section',
            'Pair primary + tertiary for confirm/cancel patterns',
            'Keep labels to 1-3 words',
            'Use Large size for main CTAs on mobile',
          ]}
          donts={[
            'Place multiple Primary buttons in one section',
            'Mix more than 2 variants in a button group',
            'Use Destructive variant for non-destructive actions',
            'Use Small size for primary CTAs on mobile',
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
