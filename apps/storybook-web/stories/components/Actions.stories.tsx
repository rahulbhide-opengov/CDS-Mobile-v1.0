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
} as const

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------
const Ico = {
  bold: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" stroke={c} strokeWidth="2" /><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" stroke={c} strokeWidth="2" /></svg>,
  italic: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M19 4h-9M14 20H5M15 4l-6 16" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  underline: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 3v7a6 6 0 0012 0V3M4 21h16" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  alignL: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M17 10H3M21 6H3M17 14H3M21 18H3" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  alignC: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 10H6M21 6H3M18 14H6M21 18H3" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  alignR: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M21 10H7M21 6H3M21 14H7M21 18H3" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  dots: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="1.5" fill={c} /><circle cx="12" cy="12" r="1.5" fill={c} /><circle cx="12" cy="19" r="1.5" fill={c} /></svg>,
  edit: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke={c} strokeWidth="2" strokeLinecap="round" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  copy: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke={c} strokeWidth="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  trash: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  check: (c: string, s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
}

// ---------------------------------------------------------------------------
// ToggleButton
// ---------------------------------------------------------------------------
function CdsToggleBtn({ icon, active, variant = 'standard', onPress }: {
  icon: (c: string) => React.ReactNode; active: boolean; variant?: 'standard' | 'filled'; onPress?: () => void
}) {
  const bg = active
    ? variant === 'filled' ? C.blurple : C.blurpleLt
    : 'transparent'
  const fg = active
    ? variant === 'filled' ? C.white : C.blurple
    : C.slate
  const border = active
    ? variant === 'filled' ? 'none' : `1px solid ${C.blurple}`
    : `1px solid ${C.g200}`
  return (
    <button onClick={onPress} style={{
      width: 40, height: 40, borderRadius: 8, border, backgroundColor: bg,
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all 120ms ease',
    }}>
      {icon(fg)}
    </button>
  )
}

function ToggleGroup({ variant = 'standard', exclusive = true }: { variant?: 'standard' | 'filled'; exclusive?: boolean }) {
  const [active, setActive] = useState<Set<string>>(new Set(['bold']))
  const toggle = (k: string) => {
    setActive(prev => {
      if (exclusive) return prev.has(k) ? new Set() : new Set([k])
      const next = new Set(prev)
      next.has(k) ? next.delete(k) : next.add(k)
      return next
    })
  }
  const items = [
    { key: 'bold', icon: Ico.bold },
    { key: 'italic', icon: Ico.italic },
    { key: 'underline', icon: Ico.underline },
  ]
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {items.map(it => (
        <CdsToggleBtn key={it.key} icon={it.icon} active={active.has(it.key)} variant={variant} onPress={() => toggle(it.key)} />
      ))}
    </div>
  )
}

function AlignToggleGroup() {
  const [active, setActive] = useState('left')
  const items = [
    { key: 'left', icon: Ico.alignL },
    { key: 'center', icon: Ico.alignC },
    { key: 'right', icon: Ico.alignR },
  ]
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {items.map(it => (
        <CdsToggleBtn key={it.key} icon={it.icon} active={active === it.key} variant="standard" onPress={() => setActive(it.key)} />
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------
function CdsMenu() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        width: 220, borderRadius: 8, backgroundColor: C.white,
        boxShadow: '0 4px 16px rgba(0,0,0,0.14)', border: `1px solid ${C.g200}`,
        overflow: 'hidden', padding: '4px 0',
      }}>
        {[
          { icon: Ico.edit, label: 'Edit', color: C.t87 },
          { icon: Ico.copy, label: 'Duplicate', color: C.t87 },
        ].map((it, i) => (
          <button key={i} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', border: 'none', background: 'none',
            cursor: 'pointer', fontFamily: F, fontSize: 14, color: it.color,
          }}>
            {it.icon(C.slate, 16)}{it.label}
          </button>
        ))}
        <div style={{ height: 1, backgroundColor: C.g200, margin: '4px 0' }} />
        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', border: 'none', background: 'none',
          cursor: 'pointer', fontFamily: F, fontSize: 14, color: C.red,
        }}>
          {Ico.trash(C.red, 16)}Delete
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Stepper
// ---------------------------------------------------------------------------
function CdsStepper({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) {
  const steps = [
    { label: 'Details', status: 'completed' as const },
    { label: 'Review', status: 'active' as const },
    { label: 'Submit', status: 'upcoming' as const },
  ]

  const dot = (status: 'completed' | 'active' | 'upcoming') => {
    const size = 28
    const bg = status === 'completed' ? C.green : status === 'active' ? C.blurple : C.g200
    const fg = status === 'upcoming' ? C.t38 : C.white
    return (
      <div style={{
        width: size, height: size, borderRadius: size / 2, backgroundColor: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {status === 'completed'
          ? Ico.check(fg, 14)
          : <span style={{ fontFamily: M, fontSize: 12, fontWeight: 600, color: fg }}>{steps.findIndex(s => s.status === status) + 1}</span>
        }
      </div>
    )
  }

  const connector = (fromStatus: 'completed' | 'active' | 'upcoming') => {
    const bg = fromStatus === 'completed' ? C.green : C.g200
    if (orientation === 'vertical') {
      return <div style={{ width: 2, height: 32, backgroundColor: bg, marginLeft: 13 }} />
    }
    return <div style={{ flex: 1, height: 2, backgroundColor: bg, minWidth: 32 }} />
  }

  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {dot(s.status)}
              <span style={{
                fontFamily: F, fontSize: 14,
                fontWeight: s.status === 'active' ? 600 : 400,
                color: s.status === 'upcoming' ? C.t38 : C.t87,
              }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && connector(s.status)}
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: 360 }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {dot(s.status)}
            <span style={{
              fontFamily: F, fontSize: 12,
              fontWeight: s.status === 'active' ? 600 : 400,
              color: s.status === 'upcoming' ? C.t38 : C.t87,
            }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && connector(s.status)}
        </React.Fragment>
      ))}
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
const meta: Meta = { title: 'Components/Actions', parameters: { layout: 'fullscreen' } }
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------
export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Actions"
      description="Action components for toggling state, displaying contextual menus, and guiding multi-step workflows. CDS 37 provides ToggleButton, Menu, and Stepper."
      badge="@opengov/cds-components"
      status="new"
    >
      {/* ----- ToggleButton ----- */}
      <DocSection title="ToggleButton" description="Pressable button that toggles between active and inactive states. Group multiple toggles for toolbar patterns with exclusive or multi-select behavior.">
        <SL>Standard variant</SL>
        <DocShowcase label="Standard toggle group" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontFamily: F, fontSize: 12, color: C.t60, marginBottom: 8 }}>Formatting (exclusive)</div>
              <ToggleGroup variant="standard" exclusive />
            </div>
            <div>
              <div style={{ fontFamily: F, fontSize: 12, color: C.t60, marginBottom: 8 }}>Alignment (exclusive)</div>
              <AlignToggleGroup />
            </div>
          </div>
        } code={`<ToggleButtonGroup exclusive>
  <ToggleButton value="bold" icon={<BoldIcon />} />
  <ToggleButton value="italic" icon={<ItalicIcon />} />
  <ToggleButton value="underline" icon={<UnderlineIcon />} />
</ToggleButtonGroup>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Button size', '40px x 40px', 'Touch target'],
          ['Border radius', '8px', 'Rounded corners'],
          ['Icon size', '16px', 'Centered'],
          ['Active bg (standard)', '#EEF1FC', 'CDS blurpleLt'],
          ['Active border', '1px solid #4B3FFF', 'CDS blurple700'],
          ['Active icon color', '#4B3FFF', 'CDS blurple700'],
          ['Inactive border', '1px solid #DDDEDE', 'CDS g200'],
          ['Gap in group', '2px', 'Between buttons'],
        ]} />} />

        <SL>Filled variant</SL>
        <DocShowcase label="Filled toggle group" preview={
          <ToggleGroup variant="filled" exclusive={false} />
        } code={`<ToggleButtonGroup variant="filled">
  <ToggleButton value="bold" icon={<BoldIcon />} />
</ToggleButtonGroup>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Active bg (filled)', '#4B3FFF', 'CDS blurple700'],
          ['Active icon color', '#FFFFFF', 'White on blurple'],
          ['Active border', 'none', 'No border when filled'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Menu ----- */}
      <DocSection title="Menu" description="Dropdown context menu with action items, dividers, and destructive options. Anchored to a trigger element with elevation 8 shadow.">
        <DocShowcase label="Context menu" preview={
          <div style={{ padding: '8px 0', display: 'flex', justifyContent: 'center' }}>
            <CdsMenu />
          </div>
        } code={`<Menu trigger={<IconButton icon={<MoreIcon />} />}>
  <MenuItem icon={<EditIcon />} label="Edit" onPress={handleEdit} />
  <MenuItem icon={<CopyIcon />} label="Duplicate" onPress={handleCopy} />
  <MenuDivider />
  <MenuItem
    icon={<TrashIcon />}
    label="Delete"
    destructive
    onPress={handleDelete}
  />
</Menu>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Menu width', '220px', 'Min width, auto-expands'],
          ['Border radius', '8px', 'Container corners'],
          ['Shadow', 'elevation 8', '0 4px 16px rgba(0,0,0,0.14)'],
          ['Item height', '40px', 'Minimum touch target'],
          ['Item padding', '10px 14px', 'Horizontal and vertical'],
          ['Icon size', '16px', 'Leading icon'],
          ['Icon-to-label gap', '10px', 'Horizontal spacing'],
          ['Font', '14px / 400', 'DM Sans regular'],
          ['Divider', '1px solid #DDDEDE', 'CDS g200'],
          ['Destructive color', '#D33423', 'CDS red600'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Stepper ----- */}
      <DocSection title="Stepper" description="Multi-step progress indicator with completed, active, and upcoming states. Available in horizontal and vertical orientations.">
        <SL>Horizontal</SL>
        <DocShowcase label="Horizontal stepper" preview={
          <div style={{ padding: '8px 16px' }}>
            <CdsStepper orientation="horizontal" />
          </div>
        } code={`<Stepper activeStep={1} orientation="horizontal">
  <Step label="Details" completed />
  <Step label="Review" active />
  <Step label="Submit" />
</Stepper>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Dot size', '28px', 'Step indicator circle'],
          ['Completed bg', '#037730', 'CDS green700'],
          ['Active bg', '#4B3FFF', 'CDS blurple700'],
          ['Upcoming bg', '#DDDEDE', 'CDS g200'],
          ['Dot text', '12px / 600', 'DM Mono white'],
          ['Connector height', '2px', 'Between dots'],
          ['Connector done', '#037730', 'CDS green700'],
          ['Connector pending', '#DDDEDE', 'CDS g200'],
          ['Label font', '12px / 400-600', 'DM Sans'],
          ['Label-to-dot gap', '6px', 'Vertical'],
        ]} />} />

        <SL>Vertical</SL>
        <DocShowcase label="Vertical stepper" preview={
          <div style={{ padding: '8px 0' }}>
            <CdsStepper orientation="vertical" />
          </div>
        } code={`<Stepper activeStep={1} orientation="vertical">
  <Step label="Details" completed />
  <Step label="Review" active />
  <Step label="Submit" />
</Stepper>`} />
      </DocSection>

      <DocDivider />

      {/* ----- Props tables ----- */}
      <DocSection title="ToggleButton Props">
        <PropsTable props={[
          { name: 'value', type: 'string', required: true, description: 'Unique identifier within group' },
          { name: 'icon', type: 'ReactNode', required: true, description: 'Button icon content' },
          { name: 'active', type: 'boolean', default: 'false', description: 'Controlled active state' },
          { name: 'variant', type: "'standard' | 'filled'", default: "'standard'", description: 'Visual style variant' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
          { name: 'onPress', type: '() => void', description: 'Toggle press handler' },
        ]} />
      </DocSection>

      <DocSection title="ToggleButtonGroup Props">
        <PropsTable props={[
          { name: 'exclusive', type: 'boolean', default: 'false', description: 'Only one button active at a time' },
          { name: 'value', type: 'string | string[]', description: 'Controlled selected value(s)' },
          { name: 'onChange', type: '(value: string | string[]) => void', description: 'Selection change handler' },
          { name: 'variant', type: "'standard' | 'filled'", default: "'standard'", description: 'Variant for all children' },
          { name: 'children', type: 'ToggleButton[]', required: true, description: 'Toggle button children' },
        ]} />
      </DocSection>

      <DocSection title="Menu Props">
        <PropsTable props={[
          { name: 'trigger', type: 'ReactNode', required: true, description: 'Element that opens the menu' },
          { name: 'placement', type: "'bottom-start' | 'bottom-end'", default: "'bottom-start'", description: 'Menu placement' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Visibility change callback' },
          { name: 'children', type: 'MenuItem | MenuDivider', required: true, description: 'Menu content items' },
        ]} />
      </DocSection>

      <DocSection title="MenuItem Props">
        <PropsTable props={[
          { name: 'label', type: 'string', required: true, description: 'Menu item label' },
          { name: 'icon', type: 'ReactNode', description: 'Leading icon' },
          { name: 'destructive', type: 'boolean', default: 'false', description: 'Red destructive styling' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
          { name: 'onPress', type: '() => void', description: 'Press handler' },
        ]} />
      </DocSection>

      <DocSection title="Stepper Props">
        <PropsTable props={[
          { name: 'activeStep', type: 'number', required: true, description: 'Zero-indexed active step' },
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
          { name: 'children', type: 'Step[]', required: true, description: 'Step child components' },
          { name: 'onStepPress', type: '(index: number) => void', description: 'Step tap handler (for editable steps)' },
        ]} />
      </DocSection>

      <DocDivider />

      {/* ----- Accessibility ----- */}
      <DocSection title="Accessibility">
        <AccessSpec items={[
          { label: 'ToggleButton: role="switch" with aria-checked', value: 'Required', status: 'pass' },
          { label: 'ToggleGroup: role="toolbar" with arrow navigation', value: 'Left/Right keys', status: 'pass' },
          { label: 'Menu: role="menu" with role="menuitem" children', value: 'Required', status: 'pass' },
          { label: 'Menu: Esc to close, arrow keys to navigate', value: 'Required', status: 'pass' },
          { label: 'Menu: focus returns to trigger on close', value: 'Required', status: 'pass' },
          { label: 'Stepper: aria-current="step" on active', value: 'Required', status: 'pass' },
          { label: 'Stepper: completed steps announce status', value: '"Step 1: completed"', status: 'pass' },
          { label: 'All interactive: min 44pt touch target', value: 'WCAG 2.5.8', status: 'pass' },
        ]} />
      </DocSection>
    </DocPage>
  ),
}
