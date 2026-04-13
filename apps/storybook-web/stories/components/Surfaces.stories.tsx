import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, SpecTable, PropsTable,
  DoDont, AccessSpec, DocDivider,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// CDS 37 palette
// ---------------------------------------------------------------------------
const F = "'DM Sans', system-ui"
const M = "'DM Mono', 'SF Mono', monospace"
const C = {
  blurple: '#4B3FFF', blurpleDk: '#19009B', blurpleLt: '#EEF1FC',
  slate: '#546574', white: '#FFFFFF', g100: '#F2F2F2', g200: '#DDDEDE',
  red: '#D33423', green: '#037730', yellow: '#885604', cerulean: '#0E6F7F',
  t87: 'rgba(0,0,0,0.87)', t60: 'rgba(0,0,0,0.6)', t38: 'rgba(0,0,0,0.38)',
  successBg: '#EFFDF1', errorBg: '#FCF7F7', warningBg: '#FDF7F4', infoBg: '#F1FAFC',
} as const

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------
const ChevronDown = ({ color = C.slate, size = 16, rotated = false }: { color?: string; size?: number; rotated?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    style={{ transition: 'transform 200ms ease', transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CloseIco = ({ color = C.t60, size = 16 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
)
const AlertIco = ({ severity, size = 18 }: { severity: string; size?: number }) => {
  const col = severity === 'success' ? C.green : severity === 'error' ? C.red : severity === 'warning' ? C.yellow : C.cerulean
  if (severity === 'success') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={col} strokeWidth="2" /><path d="M8 12l3 3 5-5" stroke={col} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  if (severity === 'error') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={col} strokeWidth="2" /><path d="M15 9l-6 6M9 9l6 6" stroke={col} strokeWidth="2" strokeLinecap="round" /></svg>
  if (severity === 'warning') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 2L2 20h20L12 2z" stroke={col} strokeWidth="2" strokeLinejoin="round" /><path d="M12 9v4M12 16h.01" stroke={col} strokeWidth="2" strokeLinecap="round" /></svg>
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={col} strokeWidth="2" /><path d="M12 16v-4M12 8h.01" stroke={col} strokeWidth="2" strokeLinecap="round" /></svg>
}

// ---------------------------------------------------------------------------
// Accordion (interactive)
// ---------------------------------------------------------------------------
function CdsAccordion({ exclusive = false }: { exclusive?: boolean }) {
  const items = [
    { id: 'a', title: 'What is CDS Mobile?', body: 'CDS Mobile is the React Native component library for OpenGov, built on CDS 37 Foundation tokens with Tamagui and Expo.' },
    { id: 'b', title: 'Which platforms are supported?', body: 'iOS 15+, Android 12+, and web via React Native Web. All components meet WCAG 2.1 AA accessibility standards.' },
    { id: 'c', title: 'How do I customize theming?', body: 'Use the ThemeProvider to override Foundation tokens. Semantic tokens cascade automatically from the active theme.' },
  ]
  const [open, setOpen] = useState<Set<string>>(new Set(['a']))
  const toggle = (id: string) => {
    setOpen(prev => {
      if (exclusive) return prev.has(id) ? new Set() : new Set([id])
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  return (
    <div style={{ width: 360, borderRadius: 8, border: `1px solid ${C.g200}`, overflow: 'hidden' }}>
      {items.map((it, i) => (
        <div key={it.id}>
          {i > 0 && <div style={{ height: 1, background: C.g200 }} />}
          <button onClick={() => toggle(it.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', border: 'none', background: C.white, cursor: 'pointer',
            fontFamily: F, fontSize: 14, fontWeight: 600, color: C.t87, textAlign: 'left',
          }}>
            {it.title}
            <ChevronDown color={C.slate} rotated={open.has(it.id)} />
          </button>
          {open.has(it.id) && (
            <div style={{ padding: '0 16px 14px', fontFamily: F, fontSize: 13, lineHeight: '20px', color: C.t60 }}>
              {it.body}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Paper
// ---------------------------------------------------------------------------
function CdsPaper({ elevation = 2 }: { elevation?: number }) {
  const shadows: Record<number, string> = {
    0: 'none',
    1: '0 1px 3px rgba(0,0,0,0.08)',
    2: '0 2px 6px rgba(0,0,0,0.1)',
    4: '0 4px 12px rgba(0,0,0,0.12)',
    8: '0 8px 24px rgba(0,0,0,0.14)',
    16: '0 16px 48px rgba(0,0,0,0.18)',
    24: '0 24px 64px rgba(0,0,0,0.22)',
  }
  return (
    <div style={{
      width: 200, height: 120, borderRadius: 8, backgroundColor: C.white,
      boxShadow: shadows[elevation] || shadows[2],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: M, fontSize: 12, color: C.t60,
    }}>
      elevation={elevation}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Popover
// ---------------------------------------------------------------------------
function CdsPopover() {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        padding: '10px 16px', borderRadius: 8, backgroundColor: C.white,
        boxShadow: '0 4px 16px rgba(0,0,0,0.14)', border: `1px solid ${C.g200}`,
        fontFamily: F, fontSize: 13, color: C.t87, maxWidth: 220,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Popover title</div>
        <div style={{ color: C.t60, lineHeight: '18px' }}>Additional context or actions displayed in a floating surface.</div>
      </div>
      <div style={{
        width: 12, height: 12, backgroundColor: C.white, border: `1px solid ${C.g200}`,
        borderTop: 'none', borderLeft: 'none',
        transform: 'rotate(45deg)', marginTop: -7,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.06)',
      }} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------
type Severity = 'success' | 'error' | 'warning' | 'info'
type AlertVariant = 'standard' | 'filled' | 'outlined'

function CdsAlert({ severity, variant = 'standard' }: { severity: Severity; variant?: AlertVariant }) {
  const colorMap: Record<Severity, string> = { success: C.green, error: C.red, warning: C.yellow, info: C.cerulean }
  const bgMap: Record<Severity, string> = { success: C.successBg, error: C.errorBg, warning: C.warningBg, info: C.infoBg }
  const msgMap: Record<Severity, string> = {
    success: 'Operation completed successfully.',
    error: 'An error occurred. Please try again.',
    warning: 'This action cannot be undone.',
    info: 'A new version is available.',
  }
  const fg = colorMap[severity]
  const bg = variant === 'filled' ? fg : variant === 'outlined' ? C.white : bgMap[severity]
  const text = variant === 'filled' ? C.white : fg
  const border = variant === 'outlined' ? `1px solid ${fg}` : 'none'

  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px',
      borderRadius: 8, backgroundColor: bg, border, minWidth: 300, maxWidth: 380,
    }}>
      <div style={{ flexShrink: 0, marginTop: 1 }}><AlertIco severity={severity} size={18} /></div>
      <div style={{ flex: 1, fontFamily: F, fontSize: 13, lineHeight: '20px', color: text }}>
        <div style={{ fontWeight: 600, marginBottom: 2, textTransform: 'capitalize' as const }}>{severity}</div>
        {msgMap[severity]}
      </div>
      <button style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}>
        <CloseIco color={text} size={14} />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section label helper
// ---------------------------------------------------------------------------
const SL = ({ children }: { children: string }) => (
  <div style={{ fontSize: 12, fontFamily: M, fontWeight: 500, color: C.t60,
    marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: 0.6 }}>{children}</div>
)

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta = { title: 'Components/Surfaces', parameters: { layout: 'fullscreen' } }
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------
export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Surfaces"
      description="Surface components provide container, elevation, and overlay patterns. CDS 37 offers Accordion for collapsible sections, Paper for elevated containers, Popover for floating content, and Alert for status messaging."
      badge="@opengov/cds-components"
      status="new"
    >
      {/* ----- Accordion ----- */}
      <DocSection title="Accordion" description="Expandable sections that reveal content on tap. Supports exclusive mode where only one section opens at a time.">
        <DocShowcase label="Exclusive mode" preview={<CdsAccordion exclusive />} code={`<Accordion exclusive>
  <AccordionItem title="Section title">
    Content revealed on expand
  </AccordionItem>
</Accordion>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Item height', '48px', 'Minimum touch target'],
          ['Padding horizontal', '16px', 'Content and header'],
          ['Chevron size', '16px', 'Animated 200ms ease'],
          ['Divider', '1px solid', 'CDS g200 (#DDDEDE)'],
          ['Border radius', '8px', 'Container corners'],
          ['Font header', '14px / 600', 'DM Sans semibold'],
          ['Font body', '13px / 400', 'DM Sans regular'],
        ]} />} />
        <DocShowcase label="Multi-expand mode" preview={<CdsAccordion exclusive={false} />} code={`<Accordion exclusive={false}>
  <AccordionItem title="First">Content A</AccordionItem>
  <AccordionItem title="Second">Content B</AccordionItem>
</Accordion>`} />
      </DocSection>

      <DocDivider />

      {/* ----- Paper ----- */}
      <DocSection title="Paper" description="Elevated surface container. Maps to CDS 37 elevation tokens with shadow levels from 0 (flat) to 24 (modal).">
        <DocShowcase label="Elevation levels" preview={
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            {[0, 1, 2, 4, 8, 16, 24].map(e => <CdsPaper key={e} elevation={e} />)}
          </div>
        } code={`<Paper elevation={0}>Flat</Paper>
<Paper elevation={2}>Card</Paper>
<Paper elevation={8}>Drawer</Paper>
<Paper elevation={24}>Modal</Paper>`} specs={<SpecTable headers={['Elevation', 'Shadow', 'Use case']} rows={[
          ['0', 'none', 'Flat containers, inline cards'],
          ['1', '0 1px 3px rgba(0,0,0,0.08)', 'Subtle lift, resting cards'],
          ['2', '0 2px 6px rgba(0,0,0,0.10)', 'Default card elevation'],
          ['4', '0 4px 12px rgba(0,0,0,0.12)', 'Raised action cards'],
          ['8', '0 8px 24px rgba(0,0,0,0.14)', 'Drawers, popovers'],
          ['16', '0 16px 48px rgba(0,0,0,0.18)', 'Floating panels'],
          ['24', '0 24px 64px rgba(0,0,0,0.22)', 'Modals, dialogs'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Popover ----- */}
      <DocSection title="Popover" description="Floating content surface anchored to a trigger element. Includes an arrow indicator pointing to the anchor.">
        <DocShowcase label="Default popover" preview={
          <div style={{ padding: '20px 0 30px', display: 'flex', justifyContent: 'center' }}>
            <CdsPopover />
          </div>
        } code={`<Popover
  trigger={<Button>Open</Button>}
  placement="bottom"
>
  <Text fontWeight="600">Popover title</Text>
  <Text>Additional context here.</Text>
</Popover>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Padding', '10px 16px', 'Content area'],
          ['Border radius', '8px', 'Container corners'],
          ['Shadow', 'elevation 8', '0 4px 16px rgba(0,0,0,0.14)'],
          ['Arrow size', '12px', 'Rotated square'],
          ['Max width', '280px', 'Content constraint'],
          ['Border', '1px solid', 'CDS g200 (#DDDEDE)'],
          ['Placement', 'top | bottom | left | right', 'Auto-flip on overflow'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Alert ----- */}
      <DocSection title="Alert" description="Status messaging with four severities and three visual variants. Supports closable alerts with a dismiss action.">
        <SL>Standard variant</SL>
        <DocShowcase label="Standard alerts" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['success', 'error', 'warning', 'info'] as Severity[]).map(s => (
              <CdsAlert key={s} severity={s} variant="standard" />
            ))}
          </div>
        } code={`<Alert severity="success">Operation completed.</Alert>
<Alert severity="error">An error occurred.</Alert>
<Alert severity="warning">This cannot be undone.</Alert>
<Alert severity="info">New version available.</Alert>`} specs={<SpecTable headers={['Severity', 'Color', 'Background']} rows={[
          ['success', '#037730 (green700)', '#EFFDF1'],
          ['error', '#D33423 (red600)', '#FCF7F7'],
          ['warning', '#885604 (yellow700)', '#FDF7F4'],
          ['info', '#0E6F7F (cerulean700)', '#F1FAFC'],
        ]} />} />

        <SL>Filled variant</SL>
        <DocShowcase label="Filled alerts" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['success', 'error', 'warning', 'info'] as Severity[]).map(s => (
              <CdsAlert key={s} severity={s} variant="filled" />
            ))}
          </div>
        } code={`<Alert severity="success" variant="filled">
  Operation completed.
</Alert>`} />

        <SL>Outlined variant</SL>
        <DocShowcase label="Outlined alerts" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['success', 'error', 'warning', 'info'] as Severity[]).map(s => (
              <CdsAlert key={s} severity={s} variant="outlined" />
            ))}
          </div>
        } code={`<Alert severity="info" variant="outlined">
  New version available.
</Alert>`} />
      </DocSection>

      <DocDivider />

      {/* ----- Props tables ----- */}
      <DocSection title="Accordion Props">
        <PropsTable props={[
          { name: 'exclusive', type: 'boolean', default: 'false', description: 'Only one section open at a time' },
          { name: 'defaultExpandedIds', type: 'string[]', default: '[]', description: 'Initially expanded item IDs' },
          { name: 'children', type: 'AccordionItem[]', required: true, description: 'Accordion item children' },
          { name: 'onExpandChange', type: '(ids: string[]) => void', description: 'Callback when expanded items change' },
        ]} />
      </DocSection>

      <DocSection title="Paper Props">
        <PropsTable props={[
          { name: 'elevation', type: '0 | 1 | 2 | 4 | 8 | 16 | 24', default: '2', description: 'Shadow depth level' },
          { name: 'borderRadius', type: 'number', default: '8', description: 'Corner radius in pixels' },
          { name: 'backgroundColor', type: 'string', default: "'#FFFFFF'", description: 'Surface background color' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Content to render inside' },
        ]} />
      </DocSection>

      <DocSection title="Popover Props">
        <PropsTable props={[
          { name: 'trigger', type: 'ReactNode', required: true, description: 'Element that opens the popover' },
          { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred placement relative to trigger' },
          { name: 'showArrow', type: 'boolean', default: 'true', description: 'Display the arrow indicator' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when visibility changes' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Popover content' },
        ]} />
      </DocSection>

      <DocSection title="Alert Props">
        <PropsTable props={[
          { name: 'severity', type: "'success' | 'error' | 'warning' | 'info'", required: true, description: 'Alert severity level' },
          { name: 'variant', type: "'standard' | 'filled' | 'outlined'", default: "'standard'", description: 'Visual variant style' },
          { name: 'closable', type: 'boolean', default: 'false', description: 'Show close/dismiss button' },
          { name: 'onClose', type: '() => void', description: 'Close button callback' },
          { name: 'icon', type: 'ReactNode', description: 'Custom icon override' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Alert message content' },
        ]} />
      </DocSection>

      <DocDivider />

      {/* ----- Accessibility ----- */}
      <DocSection title="Accessibility">
        <AccessSpec items={[
          { label: 'Accordion: role="region" with aria-expanded', value: 'Required', status: 'pass' },
          { label: 'Accordion: header is focusable button', value: 'Enter/Space to toggle', status: 'pass' },
          { label: 'Paper: semantic as layout container only', value: 'No role needed', status: 'pass' },
          { label: 'Popover: focus trap when open', value: 'Esc to dismiss', status: 'pass' },
          { label: 'Alert: role="alert" for error/warning', value: 'aria-live="assertive"', status: 'pass' },
          { label: 'Alert: role="status" for info/success', value: 'aria-live="polite"', status: 'pass' },
          { label: 'All interactive: min 44pt touch target', value: 'WCAG 2.5.8', status: 'pass' },
        ]} />
      </DocSection>
    </DocPage>
  ),
}
