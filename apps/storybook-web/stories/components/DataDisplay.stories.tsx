import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, SpecTable, PropsTable,
  DoDont, DocDivider,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// CDS 37 palette
// ---------------------------------------------------------------------------
const F = "'DM Sans', system-ui"
const M = "'DM Mono', 'SF Mono', monospace"
const C = {
  brand: '#4B3FFF', brandDark: '#19009B', brandLight: '#EEF1FC',
  error: '#D33423', success: '#037730', warning: '#885604',
  successBg: '#EFFDF1', errorBg: '#FCF7F7', warningBg: '#FDF7F4',
  text: 'rgba(0,0,0,0.87)', textSec: 'rgba(0,0,0,0.6)', textDis: 'rgba(0,0,0,0.38)',
  divider: 'rgba(0,0,0,0.12)', border: '#DDDEDE',
  bgSec: '#F8F8F8', white: '#FFFFFF', slate: '#546574',
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------
const Bell = ({ s = 20, c = C.slate }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 01-3.46 0" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const Mail = ({ s = 20, c = C.slate }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke={c} strokeWidth="2"/><path d="M22 7l-10 6L2 7" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>)
const User = ({ s = 16, c = C.white }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2"/><path d="M4 21v-1a6 6 0 0112 0v1" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>)
const X = ({ s = 12, c = C.textSec }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2.5" strokeLinecap="round"/></svg>)
const Ext = ({ s = 12, c = C.brand }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const Star = ({ s = 14, c = C.warning }) => (<svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)

// ---------------------------------------------------------------------------
// Component replicas
// ---------------------------------------------------------------------------
const IconBtn = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: 40, height: 40, borderRadius: 4, backgroundColor: C.bgSec, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
)

function Badge({ count, color = C.error, dot, children }: { count?: number; color?: string; dot?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {children}
      {dot
        ? <span style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: 9999, backgroundColor: color, border: `2px solid ${C.white}` }} />
        : <span style={{ position: 'absolute', top: -6, right: -8, minWidth: 18, height: 18, borderRadius: 9999, backgroundColor: color, color: C.white, fontSize: 11, fontWeight: 700, fontFamily: M, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', border: `2px solid ${C.white}` }}>{count! > 99 ? '99+' : count}</span>}
    </div>
  )
}

function Avatar({ size = 32, initials, shape = 'circle', status }: { size?: number; initials?: string; shape?: 'circle' | 'square'; status?: 'online' | 'offline' }) {
  const bg = ['#4B3FFF', '#037730', '#D33423', '#885604', '#0E6F7F']
  const r = shape === 'circle' ? 9999 : 4
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <div style={{ width: size, height: size, borderRadius: r, overflow: 'hidden', backgroundColor: bg[initials ? initials.charCodeAt(0) % 5 : 0], display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontSize: size <= 24 ? 10 : size <= 32 ? 12 : 14, fontWeight: 700, fontFamily: F }}>
        {initials ? initials.toUpperCase() : <User s={size * 0.55} />}
      </div>
      {status && <span style={{ position: 'absolute', bottom: shape === 'circle' ? 0 : -2, right: shape === 'circle' ? 0 : -2, width: size <= 24 ? 8 : 10, height: size <= 24 ? 8 : 10, borderRadius: 9999, backgroundColor: status === 'online' ? C.success : '#9E9E9E', border: `2px solid ${C.white}` }} />}
    </div>
  )
}

const CC = {
  neutral:  { f: { bg: '#E0E0E0', t: C.text }, o: { b: '#BDBDBD', t: C.text } },
  positive: { f: { bg: C.successBg, t: C.success }, o: { b: C.success, t: C.success } },
  negative: { f: { bg: C.errorBg, t: C.error }, o: { b: C.error, t: C.error } },
  warning:  { f: { bg: C.warningBg, t: C.warning }, o: { b: C.warning, t: C.warning } },
  strong:   { f: { bg: C.brandLight, t: C.brand }, o: { b: C.brand, t: C.brand } },
} as const
const CS = { sm: { h: 32, px: 10, fs: 12 }, md: { h: 36, px: 12, fs: 13 }, lg: { h: 44, px: 16, fs: 14 } }

function Chip({ label, color = 'neutral' as keyof typeof CC, variant = 'filled' as 'filled' | 'outlined', size = 'md' as keyof typeof CS, selected, disabled, closable, icon }: { label: string; color?: keyof typeof CC; variant?: 'filled' | 'outlined'; size?: keyof typeof CS; selected?: boolean; disabled?: boolean; closable?: boolean; icon?: React.ReactNode }) {
  const s = CS[size], cv = variant === 'filled' ? CC[color].f : CC[color].o
  const sel = selected ? { bg: C.brand, t: C.white, b: C.brand } : null
  const txt = sel ? sel.t : cv.t
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: s.h, padding: `0 ${s.px}px`, borderRadius: 9999, fontFamily: F, fontSize: s.fs, fontWeight: 500, backgroundColor: sel ? sel.bg : variant === 'filled' ? (cv as any).bg : 'transparent', color: txt, border: sel ? `1px solid ${sel.b}` : variant === 'outlined' ? `1px solid ${(cv as any).b}` : '1px solid transparent', opacity: disabled ? 0.38 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {icon}{label}
      {closable && <span style={{ display: 'inline-flex', marginLeft: 2 }}><X s={size === 'sm' ? 10 : 12} c={txt} /></span>}
    </span>
  )
}

function Card({ variant = 'elevated', padding = 'md', children }: { variant?: 'elevated' | 'outlined' | 'filled'; padding?: 'sm' | 'md' | 'lg'; children: React.ReactNode }) {
  const px = { sm: 12, md: 16, lg: 24 }[padding]
  return <div style={{ borderRadius: 8, padding: px, fontFamily: F, ...(variant === 'elevated' && { backgroundColor: C.white, boxShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)' }), ...(variant === 'outlined' && { backgroundColor: C.white, border: `1px solid ${C.border}` }), ...(variant === 'filled' && { backgroundColor: C.bgSec }) }}>{children}</div>
}

function Link({ children, variant = 'default', disabled, external }: { children: React.ReactNode; variant?: 'default' | 'subtle' | 'inline'; disabled?: boolean; external?: boolean }) {
  return (
    <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: F, fontSize: variant === 'inline' ? 'inherit' : 14, fontWeight: variant === 'inline' ? 'inherit' : 500, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, opacity: disabled ? 0.38 : 1, color: C.brand, textDecoration: variant === 'subtle' ? 'none' : 'underline', textUnderlineOffset: 2 }}>
      {children}{external && <Ext s={12} c={disabled ? C.textDis : C.brand} />}
    </a>
  )
}

function Divider({ vertical, label, inset }: { vertical?: boolean; label?: string; inset?: boolean }) {
  if (vertical) return <div style={{ width: 1, backgroundColor: C.divider, alignSelf: 'stretch', minHeight: 32 }} />
  if (label) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ flex: 1, height: 1, backgroundColor: C.divider }} />
      <span style={{ fontSize: 12, fontWeight: 500, color: C.textSec, fontFamily: F }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: C.divider }} />
    </div>
  )
  return <div style={{ height: 1, backgroundColor: C.divider, marginLeft: inset ? 16 : 0 }} />
}

// Helpers
const Lbl = ({ children }: { children: string }) => <span style={{ fontSize: 11, fontFamily: M, color: C.textSec, width: 56, flexShrink: 0 }}>{children}</span>
const Row = ({ children, gap = 8 }: { children: React.ReactNode; gap?: number }) => <div style={{ display: 'flex', gap, alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
const Col = ({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) => <div style={{ display: 'flex', flexDirection: 'column', gap }}>{children}</div>

// ---------------------------------------------------------------------------
// Meta & Story
// ---------------------------------------------------------------------------
const meta: Meta = { title: 'Components/Data Display', parameters: { layout: 'fullscreen' } }
export default meta

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage title="Data Display" description="Components for presenting data, status, and metadata. Badge, Avatar, Chip, Card, Link, and Divider -- CDS 37 specs with WCAG 2.5.8 mobile touch targets." badge="@opengov/cds-components" status="stable">

      {/* ---- BADGE ---- */}
      <DocSection title="Badge" description="Numeric or dot indicator anchored to an element for counts, unread status, or attention signals.">
        <DocShowcase label="Variants and colors" preview={
          <Row gap={32}>
            <Badge count={3} color={C.error}><IconBtn><Bell /></IconBtn></Badge>
            <Badge count={12} color={C.brand}><IconBtn><Mail /></IconBtn></Badge>
            <Badge count={128} color={C.success}><IconBtn><Bell /></IconBtn></Badge>
            <Badge count={5} color={C.warning}><IconBtn><Mail /></IconBtn></Badge>
            <Badge dot color={C.error}><IconBtn><Bell /></IconBtn></Badge>
            <Badge dot color={C.success}><IconBtn><Mail /></IconBtn></Badge>
          </Row>
        } code={`<Badge count={3} color="error"><IconButton icon={<BellIcon />} /></Badge>
<Badge variant="dot" color="success"><IconButton icon={<MailIcon />} /></Badge>
<Badge count={128} color="success">...</Badge>  {/* Shows "99+" */}`} specs={
          <SpecTable headers={['Property', 'Value', 'Notes']} rows={[
            ['Standard size', '18px h, min-w 18px', 'Pill, auto-expands for 99+'],
            ['Dot size', '10px circle', 'Status indicator only'],
            ['Font', '11px / DM Mono / 700', 'High contrast at small size'],
            ['Border', '2px solid white', 'Separation from anchor'],
            ['Colors', 'error, primary, success, warning', 'CDS semantic tokens'],
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- AVATAR ---- */}
      <DocSection title="Avatar" description="User or entity representation with image, initials fallback, generic icon, and optional presence indicator.">
        <DocShowcase label="Sizes, shapes, and status" preview={
          <Col gap={20}>
            <Row gap={16}><Lbl>sm 24</Lbl><Avatar size={24} initials="AB" /><Avatar size={24} initials="CD" shape="square" /><Avatar size={24} /><Avatar size={24} initials="EF" status="online" /></Row>
            <Row gap={16}><Lbl>md 32</Lbl><Avatar size={32} initials="RB" /><Avatar size={32} initials="JD" shape="square" /><Avatar size={32} /><Avatar size={32} initials="KL" status="online" /><Avatar size={32} initials="MN" status="offline" /></Row>
            <Row gap={16}><Lbl>lg 40</Lbl><Avatar size={40} initials="OP" /><Avatar size={40} initials="QR" shape="square" /><Avatar size={40} /><Avatar size={40} initials="ST" status="online" /><Avatar size={40} initials="UV" status="offline" /></Row>
          </Col>
        } code={`<Avatar size="sm" initials="AB" />
<Avatar size="md" initials="JD" shape="square" />
<Avatar size="lg" />  {/* Fallback icon */}
<Avatar size="lg" initials="ST" status="online" />`} specs={
          <SpecTable headers={['Size', 'Dimensions', 'Font', 'Status Dot', 'Radius']} rows={[
            ['sm', '24 x 24', '10px / 700', '8px', 'circle: 9999 / square: 4px'],
            ['md', '32 x 32', '12px / 700', '10px', 'circle: 9999 / square: 4px'],
            ['lg', '40 x 40', '14px / 700', '10px', 'circle: 9999 / square: 4px'],
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- CHIP ---- */}
      <DocSection title="Chip" description="Compact element for filters, tags, and selections. Filled and outlined variants across five semantic colors.">
        <DocShowcase label="Colors and variants" preview={
          <Col>
            <Row><Lbl>filled</Lbl><Chip label="Neutral" /><Chip label="Positive" color="positive" /><Chip label="Negative" color="negative" /><Chip label="Warning" color="warning" /><Chip label="Strong" color="strong" /></Row>
            <Row><Lbl>outlined</Lbl><Chip label="Neutral" variant="outlined" /><Chip label="Positive" color="positive" variant="outlined" /><Chip label="Negative" color="negative" variant="outlined" /><Chip label="Warning" color="warning" variant="outlined" /><Chip label="Strong" color="strong" variant="outlined" /></Row>
          </Col>
        } code={`<Chip label="Neutral" color="neutral" />
<Chip label="Positive" color="positive" variant="outlined" />
<Chip label="Strong" color="strong" closable onClose={fn} />`} specs={
          <SpecTable headers={['Color', 'Filled BG', 'Outlined Border', 'Text']} rows={[
            ['neutral', '#E0E0E0', '#BDBDBD', 'rgba(0,0,0,0.87)'],
            ['positive', '#EFFDF1', '#037730', '#037730'],
            ['negative', '#FCF7F7', '#D33423', '#D33423'],
            ['warning', '#FDF7F4', '#885604', '#885604'],
            ['strong', '#EEF1FC', '#4B3FFF', '#4B3FFF'],
          ]} />
        } />
        <DocShowcase label="Sizes, states, features" preview={
          <Col>
            <Row><Lbl>sizes</Lbl><Chip label="Small" size="sm" color="strong" /><Chip label="Medium" size="md" color="strong" /><Chip label="Large" size="lg" color="strong" /></Row>
            <Row><Lbl>states</Lbl><Chip label="Default" color="strong" /><Chip label="Selected" color="strong" selected /><Chip label="Disabled" color="strong" disabled /></Row>
            <Row><Lbl>extras</Lbl><Chip label="Closable" color="positive" closable /><Chip label="Icon" color="strong" icon={<Star s={14} c={C.brand} />} /><Chip label="Both" color="warning" closable icon={<Star s={14} c={C.warning} />} /></Row>
          </Col>
        } specs={
          <SpecTable headers={['Size', 'Height', 'Padding', 'Font', 'Touch Target']} rows={[
            ['sm', '32px', '10px', '12px', '44pt via hitSlop'],
            ['md', '36px', '12px', '13px', '44pt via hitSlop'],
            ['lg', '44px', '16px', '14px', '44pt native (WCAG 2.5.8)'],
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- CARD ---- */}
      <DocSection title="Card" description="Surface container for grouped content. Three elevation variants control visual prominence.">
        <DocShowcase label="Variants" preview={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <Card variant="elevated">
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8, fontFamily: F }}>Elevated</div>
              <div style={{ fontSize: 13, color: C.textSec, lineHeight: '20px', marginBottom: 12, fontFamily: F }}>Shadow-based elevation for primary surfaces.</div>
              <Row gap={6}><Chip label="Active" color="positive" size="sm" /><Chip label="Q4 2024" color="strong" size="sm" /></Row>
            </Card>
            <Card variant="outlined">
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8, fontFamily: F }}>Outlined</div>
              <div style={{ fontSize: 13, color: C.textSec, lineHeight: '20px', marginBottom: 12, fontFamily: F }}>Border-defined container for secondary grouping.</div>
              <Chip label="Review" color="warning" size="sm" />
            </Card>
            <Card variant="filled">
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 8, fontFamily: F }}>Filled</div>
              <div style={{ fontSize: 13, color: C.textSec, lineHeight: '20px', marginBottom: 12, fontFamily: F }}>Background-fill for nested containers.</div>
              <Chip label="Draft" color="neutral" size="sm" />
            </Card>
          </div>
        } code={`<Card variant="elevated" padding="md">
  <Text variant="titleSmall">Elevated</Text>
  <Chip label="Active" color="positive" size="sm" />
</Card>
<Card variant="outlined">...</Card>
<Card variant="filled">...</Card>`} specs={
          <SpecTable headers={['Variant', 'Background', 'Border', 'Shadow']} rows={[
            ['elevated', '#FFFFFF', 'none', '0 1px 3px rgba(0,0,0,0.1)'],
            ['outlined', '#FFFFFF', '1px solid #DDDEDE', 'none'],
            ['filled', '#F8F8F8', 'none', 'none'],
          ]} />
        } />
        <DocShowcase label="Padding" preview={
          <Row gap={16}>
            {(['sm', 'md', 'lg'] as const).map(p => (
              <Card key={p} variant="outlined" padding={p}>
                <div style={{ fontSize: 12, fontFamily: M, color: C.brand, marginBottom: 4 }}>padding="{p}"</div>
                <div style={{ fontSize: 13, color: C.textSec, fontFamily: F }}>{{ sm: '12px', md: '16px', lg: '24px' }[p]}</div>
              </Card>
            ))}
          </Row>
        } specs={
          <SpecTable headers={['Padding', 'Value', 'Radius']} rows={[
            ['sm', '12px', '8px'], ['md', '16px', '8px'], ['lg', '24px', '8px'],
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- LINK ---- */}
      <DocSection title="Link" description="Navigational text element. Three visual variants for different contexts. External links append an indicator icon.">
        <DocShowcase label="Variants and states" preview={
          <Col>
            <Row gap={24}><Lbl>default</Lbl><Link>View details</Link><Link external>Documentation</Link><Link disabled>Unavailable</Link></Row>
            <Row gap={24}><Lbl>subtle</Lbl><Link variant="subtle">View details</Link><Link variant="subtle" external>Documentation</Link><Link variant="subtle" disabled>Unavailable</Link></Row>
            <Row gap={24}><Lbl>inline</Lbl><p style={{ fontSize: 14, color: C.text, margin: 0, fontFamily: F }}>Submit via the <Link variant="inline">budget portal</Link> before the deadline.</p></Row>
          </Col>
        } code={`<Link href="/details">View details</Link>
<Link href="https://docs.opengov.com" external>Documentation</Link>
<Link variant="subtle" href="/settings">Settings</Link>
<Text>Submit via the <Link variant="inline" href="/portal">portal</Link>.</Text>`} specs={
          <SpecTable headers={['Variant', 'Color', 'Underline', 'Use Case']} rows={[
            ['default', '#4B3FFF', 'Yes, 2px offset', 'Standalone links'],
            ['subtle', '#4B3FFF', 'None (hover reveals)', 'Menus, breadcrumbs'],
            ['inline', '#4B3FFF', 'Yes, inherits parent size', 'Within body text'],
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- DIVIDER ---- */}
      <DocSection title="Divider" description="Visual separator between content sections. Horizontal/vertical orientation, optional labels, and inset margins.">
        <DocShowcase label="Variants" preview={
          <Col gap={24}>
            <div><span style={{ fontSize: 11, fontFamily: M, color: C.textSec, display: 'block', marginBottom: 8 }}>full-width</span><Divider /></div>
            <div><span style={{ fontSize: 11, fontFamily: M, color: C.textSec, display: 'block', marginBottom: 8 }}>inset (16px left)</span><Divider inset /></div>
            <div><span style={{ fontSize: 11, fontFamily: M, color: C.textSec, display: 'block', marginBottom: 8 }}>with label</span><Divider label="OR" /></div>
            <div>
              <span style={{ fontSize: 11, fontFamily: M, color: C.textSec, display: 'block', marginBottom: 8 }}>vertical</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
                <span style={{ fontSize: 13, fontFamily: F, color: C.text }}>Section A</span><Divider vertical />
                <span style={{ fontSize: 13, fontFamily: F, color: C.text }}>Section B</span><Divider vertical />
                <span style={{ fontSize: 13, fontFamily: F, color: C.text }}>Section C</span>
              </div>
            </div>
          </Col>
        } code={`<Divider />
<Divider inset />
<Divider label="OR" />
<XStack alignItems="center" gap="$3">
  <Text>A</Text><Divider variant="vertical" /><Text>B</Text>
</XStack>`} specs={
          <SpecTable headers={['Variant', 'Thickness', 'Color', 'Notes']} rows={[
            ['horizontal', '1px', 'rgba(0,0,0,0.12)', 'Full-width default'],
            ['horizontal inset', '1px', 'rgba(0,0,0,0.12)', '16px left margin'],
            ['horizontal label', '1px + text', 'rgba(0,0,0,0.12)', '12px/500 label'],
            ['vertical', '1px width', 'rgba(0,0,0,0.12)', 'Stretches to parent, min 32px'],
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- PROPS REFERENCE ---- */}
      <DocSection title="Props Reference" description="Consolidated API for all Data Display components.">
        <DocShowcase label="Badge" preview={
          <PropsTable props={[
            { name: 'count', type: 'number', description: 'Numeric value. Capped at 99+.' },
            { name: 'variant', type: "'standard' | 'dot'", default: "'standard'", description: 'Standard shows count; dot shows indicator only.' },
            { name: 'color', type: "'primary' | 'error' | 'success' | 'warning'", default: "'error'", description: 'Semantic color token.' },
          ]} />
        } />
        <DocShowcase label="Avatar" preview={
          <PropsTable props={[
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '24, 32, or 40px.' },
            { name: 'src', type: 'string', description: 'Image URL. Priority over initials.' },
            { name: 'initials', type: 'string', description: 'Letter fallback. Background auto-assigned.' },
            { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Border radius.' },
            { name: 'status', type: "'online' | 'offline'", description: 'Presence dot. Green or gray.' },
          ]} />
        } />
        <DocShowcase label="Chip" preview={
          <PropsTable props={[
            { name: 'label', type: 'string', required: true, description: 'Text content.' },
            { name: 'color', type: "'neutral' | 'positive' | 'negative' | 'warning' | 'strong'", default: "'neutral'", description: 'Semantic color.' },
            { name: 'variant', type: "'filled' | 'outlined'", default: "'filled'", description: 'Fill style.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height. lg = 44px WCAG.' },
            { name: 'selected', type: 'boolean', default: 'false', description: 'Overrides color with brand.' },
            { name: 'closable', type: 'boolean', default: 'false', description: 'Shows close icon.' },
            { name: 'icon', type: 'ReactNode', description: 'Leading icon.' },
          ]} />
        } />
        <DocShowcase label="Card / Link / Divider" preview={
          <PropsTable props={[
            { name: 'Card.variant', type: "'elevated' | 'outlined' | 'filled'", default: "'elevated'", description: 'Visual elevation style.' },
            { name: 'Card.padding', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '12, 16, or 24px.' },
            { name: 'Link.variant', type: "'default' | 'subtle' | 'inline'", default: "'default'", description: 'Visual style.' },
            { name: 'Link.external', type: 'boolean', default: 'false', description: 'External icon + target _blank.' },
            { name: 'Divider.variant', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation.' },
            { name: 'Divider.label', type: 'string', description: 'Centered label. Horizontal only.' },
            { name: 'Divider.inset', type: 'boolean', default: 'false', description: '16px left margin.' },
          ]} />
        } />
      </DocSection>

      <DocDivider />

      {/* ---- GUIDELINES ---- */}
      <DocSection title="Usage Guidelines">
        <DoDont
          dos={[
            'Use Badge sparingly -- reserve for actionable counts (unread, pending)',
            'Provide meaningful initials or images for Avatars in user-facing contexts',
            'Use Chip colors consistently: positive for success, negative for errors',
            'Choose Card variant by hierarchy: elevated for primary, outlined for secondary',
            'Use inline Link variant within body text to maintain reading flow',
          ]}
          donts={[
            'Stack more than 2 badges on adjacent elements -- causes visual noise',
            'Use Avatar without accessibilityLabel for screen readers',
            'Mix filled and outlined Chip variants for the same data type in one view',
            'Nest elevated Card inside another elevated Card -- use filled or outlined',
            'Use Link for data mutations -- use Button instead',
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
