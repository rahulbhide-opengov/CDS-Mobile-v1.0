import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, StateGrid, SpecTable, PropsTable,
  TokenRef, DoDont, AccessSpec, DocDivider,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// CDS 37 palette
// ---------------------------------------------------------------------------
const FONT = "'DM Sans', system-ui"
const C = {
  blurple700: '#4B3FFF', blurple100: '#EEF1FC', slate700: '#546574',
  gray300: '#DDDEDE', gray100: '#F2F2F2', gray50: '#F8F8F8',
  red600: '#D33423', white: '#FFFFFF',
  text87: 'rgba(0,0,0,0.87)', text60: 'rgba(0,0,0,0.6)', text38: 'rgba(0,0,0,0.38)',
} as const

// ---------------------------------------------------------------------------
// SVG icons (inline, no deps)
// ---------------------------------------------------------------------------
const Ico = {
  check: (c: string = C.white, s: number = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  minus: (c: string = C.white, s: number = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke={c} strokeWidth="3" strokeLinecap="round"/></svg>,
  search: (c: string = C.slate700, s: number = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="2"/><path d="M16 16l4 4" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  close: (c: string = C.slate700, s: number = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
}

// ---------------------------------------------------------------------------
// Component replicas — HTML/CSS, matching CDS 37 visuals
// ---------------------------------------------------------------------------
function CdsTextField({ variant = 'outlined', state = 'idle', size = 'md', label = 'Label', value = '' }: {
  variant?: 'outlined' | 'filled'; state?: 'idle' | 'focused' | 'error' | 'disabled'
  size?: 'sm' | 'md' | 'lg'; label?: string; value?: string
}) {
  const h = size === 'sm' ? 44 : size === 'lg' ? 56 : 48
  const fs = size === 'lg' ? 16 : 14
  const err = state === 'error', foc = state === 'focused', dis = state === 'disabled'
  const bc = err ? C.red600 : foc ? C.blurple700 : C.slate700
  const bw = foc || err ? 2 : 1
  const lc = err ? C.red600 : foc ? C.blurple700 : C.text60
  return (
    <div style={{ opacity: dis ? 0.38 : 1, width: 240, fontFamily: FONT }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: lc, marginBottom: 6 }}>{label}</div>
      <div style={{ height: h, display: 'flex', alignItems: 'center', padding: '0 12px', backgroundColor: variant === 'filled' ? C.gray100 : C.white, borderRadius: 4, border: `${bw}px solid ${bc}`, boxShadow: foc ? `0 0 0 2px ${C.blurple100}` : 'none' }}>
        <span style={{ fontSize: fs, color: value ? C.text87 : C.text38 }}>{value || 'Placeholder'}</span>
      </div>
      {err && <div style={{ fontSize: 12, color: C.red600, marginTop: 4 }}>This field is required</div>}
    </div>
  )
}

function CdsCheckbox({ state = 'unchecked', disabled = false, label = 'Option' }: {
  state?: 'unchecked' | 'checked' | 'indeterminate'; disabled?: boolean; label?: string
}) {
  const filled = state !== 'unchecked'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: disabled ? 0.38 : 1, fontFamily: FONT, minHeight: 44 }}>
      <div style={{ width: 20, height: 20, borderRadius: 4, flexShrink: 0, backgroundColor: filled ? C.blurple700 : C.white, border: filled ? 'none' : `2px solid ${C.slate700}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'checked' && Ico.check(C.white, 14)}
        {state === 'indeterminate' && Ico.minus(C.white, 14)}
      </div>
      <span style={{ fontSize: 14, color: C.text87 }}>{label}</span>
    </div>
  )
}

function CdsRadio({ selected = false, disabled = false, label = 'Option' }: {
  selected?: boolean; disabled?: boolean; label?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: disabled ? 0.38 : 1, fontFamily: FONT, minHeight: 44 }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, flexShrink: 0, border: `2px solid ${selected ? C.blurple700 : C.slate700}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selected && <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: C.blurple700 }} />}
      </div>
      <span style={{ fontSize: 14, color: C.text87 }}>{label}</span>
    </div>
  )
}

function CdsSwitch({ on = false, disabled = false, label }: {
  on?: boolean; disabled?: boolean; label?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: disabled ? 0.38 : 1, fontFamily: FONT, minHeight: 44 }}>
      <div style={{ width: 34, height: 14, borderRadius: 7, position: 'relative', backgroundColor: on ? C.blurple700 : C.gray300 }}>
        <div style={{ width: 20, height: 20, borderRadius: 10, position: 'absolute', top: -3, left: on ? 14 : 0, backgroundColor: on ? C.white : C.gray50, boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transition: 'left 150ms ease' }} />
      </div>
      {label && <span style={{ fontSize: 14, color: C.text87 }}>{label}</span>}
    </div>
  )
}

function CdsSlider({ value = 40, min = 0, max = 100, disabled = false }: {
  value?: number; min?: number; max?: number; disabled?: boolean
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ width: 240, fontFamily: FONT, opacity: disabled ? 0.38 : 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
        <span style={{ color: C.text60 }}>{min}</span>
        <span style={{ fontWeight: 600, color: C.blurple700, fontSize: 14 }}>{value}</span>
        <span style={{ color: C.text60 }}>{max}</span>
      </div>
      <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 2, backgroundColor: C.gray300 }} />
        <div style={{ position: 'absolute', left: 0, width: `${pct}%`, height: 4, borderRadius: 2, backgroundColor: C.blurple700 }} />
        <div style={{ position: 'absolute', left: `${pct}%`, transform: 'translateX(-50%)', width: 20, height: 20, borderRadius: 10, backgroundColor: C.white, boxShadow: '0 1px 4px rgba(0,0,0,0.25)', border: `2px solid ${C.blurple700}` }} />
      </div>
    </div>
  )
}

function CdsSearchBar({ state = 'idle', value = '' }: { state?: 'idle' | 'focused'; value?: string }) {
  const foc = state === 'focused'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 12px', backgroundColor: C.gray100, borderRadius: 4, width: 280, fontFamily: FONT, border: foc ? `2px solid ${C.blurple700}` : `1px solid ${C.gray300}`, boxShadow: foc ? `0 0 0 2px ${C.blurple100}` : 'none' }}>
      {Ico.search(foc ? C.blurple700 : C.slate700, 18)}
      <span style={{ flex: 1, fontSize: 14, color: value ? C.text87 : C.text38 }}>{value || 'Search...'}</span>
      {value && <div style={{ width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.close(C.slate700, 16)}</div>}
    </div>
  )
}

// ---------------------------------------------------------------------------
const FIELD_STATES = [
  { label: 'Idle', key: 'idle', description: 'Default' },
  { label: 'Focused', key: 'focused', description: 'Active input' },
  { label: 'Error', key: 'error', description: 'Validation fail' },
  { label: 'Disabled', key: 'disabled', description: 'Non-interactive' },
]

const meta: Meta = { title: 'Components/Form Controls', parameters: { layout: 'fullscreen' } }
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------
export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Form Controls"
      description="Input components for collecting user data. CDS 37 defines consistent styling, focus behaviors, error states, and WCAG 2.5.8 mobile touch targets across all form elements."
      badge="@opengov/cds-components"
      status="stable"
    >
      {/* ---- TextField ---- */}
      <DocSection title="TextField" description="Single-line text input with label, placeholder, helper text, and error messaging. Two visual variants: outlined and filled.">
        <DocShowcase
          label="Outlined + Filled"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <CdsTextField variant="outlined" state="idle" label="Full name" value="Jane Doe" />
                <CdsTextField variant="filled" state="idle" label="Email address" />
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <CdsTextField variant="outlined" state="error" label="Username" value="" />
                <CdsTextField variant="outlined" state="disabled" label="Read only" value="Locked" />
              </div>
            </div>
          }
          code={`import { TextField } from '@opengov/cds-components'

<TextField label="Full name" value={name} onChangeText={setName} variant="outlined" />
<TextField label="Email" variant="filled" placeholder="you@example.com" />
<TextField label="Username" error="This field is required" />
<TextField label="Read only" value="Locked" disabled />`}
          specs={<SpecTable headers={['Property', 'Outlined', 'Filled']} rows={[
            ['Background', 'white (#FFFFFF)', 'gray100 (#F2F2F2)'],
            ['Border idle', '1px solid slate700 (#546574)', '1px solid slate700'],
            ['Border focused', '2px solid blurple700 (#4B3FFF)', '2px solid blurple700'],
            ['Border error', '2px solid red600 (#D33423)', '2px solid red600'],
            ['Border radius', '4px', '4px'],
            ['Label font', '12px / 500 DM Sans', '12px / 500 DM Sans'],
            ['Input font', '14px / 400 DM Sans', '14px / 400 DM Sans'],
          ]} />}
        />
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text60, marginBottom: 12, fontFamily: FONT }}>Interactive States</div>
          <StateGrid states={FIELD_STATES} renderCell={(k) => <CdsTextField state={k as any} label="Label" value={k === 'idle' || k === 'disabled' ? 'Value' : k === 'focused' ? 'Typing...' : ''} />} />
        </div>
        <DocShowcase label="3 sizes" preview={
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <CdsTextField size="sm" label="Small (44px)" value="Content" />
            <CdsTextField size="md" label="Medium (48px)" value="Content" />
            <CdsTextField size="lg" label="Large (56px)" value="Content" />
          </div>
        } specs={<SpecTable headers={['Size', 'Height', 'Font Size', 'Touch Target']} rows={[
          ['sm', '44px', '14px', '44pt native (WCAG 2.5.8)'],
          ['md', '48px', '14px', '48pt native'],
          ['lg', '56px', '16px', '56pt native'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- Checkbox ---- */}
      <DocSection title="Checkbox" description="Binary or tri-state selection control. Supports unchecked, checked, and indeterminate states with a 44px minimum touch target.">
        <DocShowcase label="States" preview={
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CdsCheckbox state="unchecked" label="Unchecked" />
            <CdsCheckbox state="checked" label="Checked" />
            <CdsCheckbox state="indeterminate" label="Indeterminate" />
            <CdsCheckbox state="checked" disabled label="Disabled" />
          </div>
        } code={`import { Checkbox } from '@opengov/cds-components'

<Checkbox checked={isChecked} onChange={setIsChecked} label="Accept terms" />
<Checkbox checked="indeterminate" onChange={handleToggle} label="Select all" />
<Checkbox checked disabled label="Locked" />`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Box size', '20 x 20 px', 'Visual checkbox element'],
          ['Touch target', '44 x 44 px', 'WCAG 2.5.8 minimum'],
          ['Border radius', '4px', 'Rounded square'],
          ['Unchecked border', '2px solid slate700 (#546574)', 'Default'],
          ['Checked fill', 'blurple700 (#4B3FFF)', 'White check mark'],
          ['Indeterminate fill', 'blurple700 (#4B3FFF)', 'White minus icon'],
          ['Label gap', '12px', 'Between box and text'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- Radio ---- */}
      <DocSection title="Radio" description="Single-selection control for mutually exclusive options. Rendered as a circle with an inner dot when selected.">
        <DocShowcase label="States" preview={
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CdsRadio selected={false} label="Unselected" />
            <CdsRadio selected label="Selected" />
            <CdsRadio selected disabled label="Disabled" />
          </div>
        } code={`import { RadioGroup, Radio } from '@opengov/cds-components'

<RadioGroup value={plan} onChange={setPlan}>
  <Radio value="free" label="Free tier" />
  <Radio value="pro" label="Professional" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Outer circle', '20 x 20 px', 'Visual radio element'],
          ['Inner dot', '10 x 10 px', 'Appears when selected'],
          ['Touch target', '44 x 44 px', 'WCAG 2.5.8 minimum'],
          ['Unselected border', '2px solid slate700 (#546574)', 'Default'],
          ['Selected border', '2px solid blurple700 (#4B3FFF)', 'Active border'],
          ['Dot fill', 'blurple700 (#4B3FFF)', 'Solid inner circle'],
          ['Label gap', '12px', 'Between circle and text'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- Switch ---- */}
      <DocSection title="Switch" description="Toggle control for binary on/off states. Uses a sliding thumb animation with distinct track colors.">
        <DocShowcase label="States" preview={
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CdsSwitch on={false} label="Off" />
            <CdsSwitch on label="On" />
            <CdsSwitch on={false} disabled label="Disabled off" />
            <CdsSwitch on disabled label="Disabled on" />
          </div>
        } code={`import { Switch } from '@opengov/cds-components'

<Switch value={enabled} onValueChange={setEnabled} label="Enable notifications" />
<Switch value={false} disabled label="Locked" />`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Track size', '34 x 14 px', 'Pill-shaped background'],
          ['Thumb size', '20 x 20 px', 'Circular sliding handle'],
          ['Touch target', '44 x 44 px', 'WCAG 2.5.8 via hitSlop'],
          ['Off track', 'gray300 (#DDDEDE)', 'Neutral background'],
          ['On track', 'blurple700 (#4B3FFF)', 'Active background'],
          ['Thumb off', 'gray50 (#F8F8F8)', 'Raised with shadow'],
          ['Thumb on', 'white (#FFFFFF)', 'Raised with shadow'],
          ['Animation', '150ms ease', 'Thumb slide + track color'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- Slider ---- */}
      <DocSection title="Slider" description="Range selection control for numeric values. Displays a filled track, thumb handle, and value label.">
        <DocShowcase label="Values" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <CdsSlider value={25} />
            <CdsSlider value={60} />
            <CdsSlider value={90} />
            <CdsSlider value={40} disabled />
          </div>
        } code={`import { Slider } from '@opengov/cds-components'

<Slider value={volume} onValueChange={setVolume} min={0} max={100} step={1} />
<Slider value={40} disabled />`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Track height', '4px', 'Rounded ends (2px radius)'],
          ['Track fill', 'blurple700 (#4B3FFF)', 'Active portion'],
          ['Track empty', 'gray300 (#DDDEDE)', 'Inactive portion'],
          ['Thumb size', '20 x 20 px', 'Circular handle'],
          ['Thumb fill', 'white + 2px blurple700 border', 'Elevated'],
          ['Thumb shadow', '0 1px 4px rgba(0,0,0,0.25)', 'Elevation hint'],
          ['Touch target', '44 x 44 px', 'WCAG 2.5.8 via hitSlop'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- SearchBar ---- */}
      <DocSection title="SearchBar" description="Specialized text input with search icon, clear button, and focused state for list filtering and navigation headers.">
        <DocShowcase label="States" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CdsSearchBar state="idle" />
            <CdsSearchBar state="focused" value="Annual report" />
            <CdsSearchBar state="idle" value="Budget review" />
          </div>
        } code={`import { SearchBar } from '@opengov/cds-components'

<SearchBar value={query} onChangeText={setQuery} placeholder="Search..." onClear={() => setQuery('')} />
<SearchBar value={query} autoFocus />`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Height', '44px', 'WCAG 2.5.8 touch target'],
          ['Background', 'gray100 (#F2F2F2)', 'Subtle container'],
          ['Border idle', '1px solid gray300 (#DDDEDE)', 'Low contrast'],
          ['Border focused', '2px solid blurple700 (#4B3FFF)', 'Active state'],
          ['Border radius', '4px', 'Consistent with TextField'],
          ['Search icon', '18px, slate700', 'Left-aligned'],
          ['Clear button', '28 x 28 px', 'When value present'],
          ['Font', '14px / 400 DM Sans', 'Body text style'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- Accessibility ---- */}
      <DocSection title="Accessibility" description="All form controls meet WCAG 2.1 AA and 2.2 requirements for mobile touch targets, focus indicators, and screen reader support.">
        <AccessSpec items={[
          { label: 'Touch target (all controls)',  value: '44px minimum (WCAG 2.5.8)',      status: 'pass' },
          { label: 'Focus indicator',              value: '2px blurple ring + glow',         status: 'pass' },
          { label: 'TextField ARIA',               value: 'role=textbox, aria-label',        status: 'pass' },
          { label: 'Checkbox ARIA',                value: 'role=checkbox, aria-checked',     status: 'pass' },
          { label: 'Radio ARIA',                   value: 'role=radio, aria-checked',        status: 'pass' },
          { label: 'Switch ARIA',                  value: 'role=switch, aria-checked',       status: 'pass' },
          { label: 'Slider ARIA',                  value: 'role=slider, aria-valuenow',      status: 'pass' },
          { label: 'Error announcement',           value: 'aria-live=polite on error text',  status: 'pass' },
          { label: 'Disabled state',               value: 'aria-disabled + 38% opacity',     status: 'pass' },
          { label: 'Color contrast',               value: '4.5:1 text, 3:1 borders',        status: 'pass' },
        ]} />
      </DocSection>

      <DocDivider />

      {/* ---- API Reference ---- */}
      <DocSection title="API Reference" description="Prop interfaces for all form control components.">
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', fontFamily: FONT, color: C.text87 }}>TextField</h3>
          <PropsTable props={[
            { name: 'value',              type: 'string',                      description: 'Current input value', required: true },
            { name: 'onChangeText',       type: '(text: string) => void',      description: 'Text change handler', required: true },
            { name: 'variant',            type: "'outlined' | 'filled'",       default: "'outlined'", description: 'Visual style variant' },
            { name: 'size',               type: "'sm' | 'md' | 'lg'",         default: "'md'",       description: 'Height preset (44/48/56px)' },
            { name: 'label',              type: 'string',                      description: 'Label text above input' },
            { name: 'placeholder',        type: 'string',                      description: 'Placeholder when empty' },
            { name: 'error',              type: 'string',                      description: 'Error message (triggers error state)' },
            { name: 'helper',             type: 'string',                      description: 'Helper text below input' },
            { name: 'disabled',           type: 'boolean',                     default: 'false', description: 'Disables input (38% opacity)' },
          ]} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', fontFamily: FONT, color: C.text87 }}>Checkbox</h3>
          <PropsTable props={[
            { name: 'checked',            type: "boolean | 'indeterminate'",   default: 'false',  description: 'Checked state' },
            { name: 'onChange',           type: '(checked: boolean) => void',  description: 'Change handler', required: true },
            { name: 'label',              type: 'string',                      description: 'Label text to the right' },
            { name: 'disabled',           type: 'boolean',                     default: 'false',  description: 'Disables interaction' },
          ]} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', fontFamily: FONT, color: C.text87 }}>Radio</h3>
          <PropsTable props={[
            { name: 'value',              type: 'string',                      description: 'Value when selected', required: true },
            { name: 'label',              type: 'string',                      description: 'Label text to the right' },
            { name: 'disabled',           type: 'boolean',                     default: 'false',  description: 'Disables interaction' },
          ]} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', fontFamily: FONT, color: C.text87 }}>Switch</h3>
          <PropsTable props={[
            { name: 'value',              type: 'boolean',                     default: 'false',  description: 'On/off state', required: true },
            { name: 'onValueChange',      type: '(value: boolean) => void',    description: 'Toggle handler', required: true },
            { name: 'label',              type: 'string',                      description: 'Label text to the right' },
            { name: 'disabled',           type: 'boolean',                     default: 'false',  description: 'Disables interaction' },
          ]} />
        </div>
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', fontFamily: FONT, color: C.text87 }}>Slider</h3>
          <PropsTable props={[
            { name: 'value',              type: 'number',                      description: 'Current value', required: true },
            { name: 'onValueChange',      type: '(value: number) => void',     description: 'Value change handler', required: true },
            { name: 'min',                type: 'number',                      default: '0',     description: 'Minimum value' },
            { name: 'max',                type: 'number',                      default: '100',   description: 'Maximum value' },
            { name: 'step',               type: 'number',                      default: '1',     description: 'Value increment step' },
            { name: 'disabled',           type: 'boolean',                     default: 'false', description: 'Disables interaction' },
          ]} />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 16px 0', fontFamily: FONT, color: C.text87 }}>SearchBar</h3>
          <PropsTable props={[
            { name: 'value',              type: 'string',                      description: 'Current search text', required: true },
            { name: 'onChangeText',       type: '(text: string) => void',      description: 'Text change handler', required: true },
            { name: 'placeholder',        type: 'string',                      default: "'Search...'", description: 'Placeholder text' },
            { name: 'onClear',            type: '() => void',                  description: 'Clear button handler' },
            { name: 'autoFocus',          type: 'boolean',                     default: 'false', description: 'Focus on mount' },
          ]} />
        </div>
      </DocSection>

      <DocDivider />

      {/* ---- Token Reference ---- */}
      <DocSection title="Token Reference" description="Design tokens consumed by form controls. All values derive from the CDS 37 Foundation palette.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 13, fontFamily: FONT, lineHeight: '28px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Border idle</span>
            <TokenRef name="slate700" value="#546574" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Border focus</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Border error</span>
            <TokenRef name="red600" value="#D33423" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Checked / On</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Switch off</span>
            <TokenRef name="gray300" value="#DDDEDE" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 120 }}>Disabled</span>
            <span style={{ color: C.text60 }}>opacity =</span>
            <TokenRef name="0.38" />
          </div>
        </div>
      </DocSection>

      <DocDivider />

      {/* ---- Usage Guidelines ---- */}
      <DocSection title="Usage Guidelines" description="Best practices for form controls in mobile layouts.">
        <DoDont
          dos={[
            'Always provide a visible label for text fields',
            'Use error messages that explain how to fix the issue',
            'Group related radio buttons in a RadioGroup',
            'Use Switch for immediate toggles, Checkbox for multi-select',
            'Ensure all controls meet 44px minimum touch target',
          ]}
          donts={[
            'Use placeholder text as the only label',
            'Show error states before user interaction',
            'Mix Checkbox and Radio for the same selection group',
            'Use Slider when exact numeric input is needed',
            'Disable form controls without explanation',
          ]}
        />
      </DocSection>
    </DocPage>
  ),
}
