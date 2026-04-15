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
  green700: '#037730', red600: '#D33423', red700: '#B12525',
  gray300: '#DDDEDE', gray100: '#F2F2F2', gray50: '#F8F8F8',
  white: '#FFFFFF',
  text87: 'rgba(0,0,0,0.87)', text60: 'rgba(0,0,0,0.6)', text38: 'rgba(0,0,0,0.38)',
  // Semantic border colors (Figma CDS 37)
  borderIdlePlaceholder: 'rgba(0,0,0,0.12)',   // outlined/enabledBorder
  borderIdleFilled: 'rgba(0,0,0,0.25)',         // standard/enabledBorder
  borderHover: 'rgba(0,0,0,0.5)',               // black_states/outlinedBorder
  borderDisabled: 'rgba(0,0,0,0.12)',
  borderReadOnly: 'rgba(0,0,0,0.12)',
  // Background states
  bgDisabled: '#F2F2F2',
  bgReadOnly: 'rgba(75,63,255,0.08)',           // blurple tint
  // Radio unselected border
  radioUnselected: 'rgba(0,0,0,0.6)',
  // SearchBar border
  searchBorderIdle: 'rgba(0,0,0,0.12)',
} as const

// ---------------------------------------------------------------------------
// SVG icons (inline, no deps)
// ---------------------------------------------------------------------------
const Ico = {
  check: (c: string = C.white, s: number = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  minus: (c: string = C.white, s: number = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke={c} strokeWidth="3" strokeLinecap="round"/></svg>,
  search: (c: string = C.slate700, s: number = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="2"/><path d="M16 16l4 4" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  close: (c: string = C.slate700, s: number = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  alertCircle: (c: string = C.red700, s: number = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="12" stroke={c} strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill={c}/></svg>,
  checkCircle: (c: string = C.green700, s: number = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2"/><path d="M8 12l3 3 5-5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
}

// ---------------------------------------------------------------------------
// Component replicas — HTML/CSS, matching CDS 37 visuals
// ---------------------------------------------------------------------------
function CdsTextField({ variant = 'outlined', state = 'idle-placeholder', size = 'md', label = 'Label', value = '', helperText, showFocusRing = false }: {
  variant?: 'outlined' | 'filled'
  state?: 'idle-placeholder' | 'idle-filled' | 'hover' | 'focused' | 'error' | 'success' | 'disabled' | 'readonly'
  size?: 'sm' | 'md' | 'lg'; label?: string; value?: string; helperText?: string; showFocusRing?: boolean
}) {
  const h = size === 'sm' ? 32 : size === 'lg' ? 48 : 40
  const fs = size === 'lg' ? 16 : 14
  const err = state === 'error'
  const suc = state === 'success'
  const foc = state === 'focused'
  const dis = state === 'disabled'
  const ro = state === 'readonly'
  const hov = state === 'hover'
  const hasFilled = state === 'idle-filled'

  // Border color per Figma CDS 37 semantic tokens
  const bc = err ? C.red600
    : suc ? C.green700
    : foc ? C.blurple700
    : hov ? C.borderHover
    : dis ? C.borderDisabled
    : ro ? C.borderReadOnly
    : hasFilled ? C.borderIdleFilled
    : C.borderIdlePlaceholder

  const bw = foc || err || suc ? 2 : 1

  // Label color
  const lc = err ? C.red700 : dis ? C.text38 : C.text87

  // Background
  const bg = dis ? C.bgDisabled : ro ? C.bgReadOnly : C.white

  // Text display
  const hasValue = !!value
  const displayText = hasValue ? value : 'Placeholder'
  const displayColor = dis ? C.text38 : hasValue ? C.text87 : C.text38

  // Focus ring
  const focusRingVisible = showFocusRing && foc

  return (
    <div style={{ width: 240, fontFamily: FONT }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: lc, marginBottom: 6 }}>{label}</div>
      <div style={focusRingVisible ? { border: `2px solid ${C.blurple700}`, borderRadius: 8, padding: 3 } : undefined}>
        <div style={{
          height: h, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8,
          backgroundColor: bg, borderRadius: 4, border: `${bw}px solid ${bc}`,
          boxShadow: foc && !showFocusRing ? `0 0 0 2px ${C.blurple100}` : 'none',
          opacity: 1,
        }}>
          <span style={{ flex: 1, fontSize: fs, color: displayColor }}>{displayText}</span>
          {ro && <span style={{ fontSize: 11, color: C.text38, fontStyle: 'italic' }}>Read only</span>}
        </div>
      </div>
      {err && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          {Ico.alertCircle(C.red700, 14)}
          <span style={{ fontSize: 12, fontWeight: 500, color: C.red700 }}>{helperText || 'This field is required'}</span>
        </div>
      )}
      {suc && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          {Ico.checkCircle(C.green700, 14)}
          <span style={{ fontSize: 12, fontWeight: 500, color: C.green700 }}>{helperText || 'Looks good!'}</span>
        </div>
      )}
    </div>
  )
}

function CdsCheckbox({ state = 'unchecked', disabled = false, label = 'Option' }: {
  state?: 'unchecked' | 'checked' | 'indeterminate'; disabled?: boolean; label?: string
}) {
  const filled = state !== 'unchecked'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: disabled ? 0.38 : 1, fontFamily: FONT, minHeight: 44, paddingTop: 8, paddingBottom: 8 }}>
      <div style={{ width: 18, height: 18, borderRadius: 2, flexShrink: 0, backgroundColor: filled ? C.blurple700 : C.white, border: filled ? 'none' : `1.5px solid ${C.radioUnselected}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'checked' && Ico.check(C.white, 12)}
        {state === 'indeterminate' && Ico.minus(C.white, 12)}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', letterSpacing: 0.15, color: disabled ? C.text38 : C.text87 }}>{label}</span>
    </div>
  )
}

function CdsRadio({ selected = false, disabled = false, label = 'Option' }: {
  selected?: boolean; disabled?: boolean; label?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: disabled ? 0.38 : 1, fontFamily: FONT, minHeight: 44, paddingTop: 8, paddingBottom: 8 }}>
      <div style={{ width: 24, height: 24, borderRadius: 12, flexShrink: 0, border: `2px solid ${selected ? C.blurple700 : C.radioUnselected}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selected && <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.blurple700 }} />}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '20px', letterSpacing: 0.15, color: disabled ? C.text38 : C.text87 }}>{label}</span>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px', backgroundColor: C.white, borderRadius: 100, width: 280, fontFamily: FONT, border: foc ? `2px solid ${C.blurple700}` : `1px solid ${C.searchBorderIdle}`, boxShadow: foc ? `0 0 0 2px ${C.blurple100}` : 'none' }}>
      {Ico.search(foc ? C.blurple700 : C.slate700, 20)}
      <span style={{ flex: 1, fontSize: 14, color: value ? C.text87 : C.text38 }}>{value || 'Search...'}</span>
      {value && <div style={{ width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.close(C.slate700, 16)}</div>}
    </div>
  )
}

// ---------------------------------------------------------------------------
const FIELD_STATES = [
  { label: 'Idle (Placeholder)', key: 'idle-placeholder', description: 'Empty field' },
  { label: 'Idle (Filled)',      key: 'idle-filled',      description: 'Has value' },
  { label: 'Hover',              key: 'hover',            description: 'Mouse over' },
  { label: 'Focused',            key: 'focused',          description: 'Active input' },
  { label: 'Error',              key: 'error',            description: 'Validation fail' },
  { label: 'Success',            key: 'success',          description: 'Validation pass' },
  { label: 'Disabled',           key: 'disabled',         description: 'Non-interactive' },
  { label: 'Read Only',          key: 'readonly',         description: 'View only' },
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
      <DocSection title="TextField" description="Single-line text input with label, placeholder, helper text, error/success messaging, and read-only mode. 7 interactive states with semantic border colors per CDS 37 Figma spec.">
        <DocShowcase
          label="7 States Overview"
          preview={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <CdsTextField state="idle-placeholder" label="Idle (Placeholder)" />
                <CdsTextField state="idle-filled" label="Idle (Filled)" value="Jane Doe" />
                <CdsTextField state="hover" label="Hover" value="Hovering..." />
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <CdsTextField state="focused" label="Focused" value="Typing..." />
                <CdsTextField state="error" label="Error" value="bad-email" helperText="Invalid email address" />
                <CdsTextField state="success" label="Success" value="jane@opengov.com" helperText="Email verified" />
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <CdsTextField state="disabled" label="Disabled" value="Cannot edit" />
                <CdsTextField state="readonly" label="Read Only" value="View only value" />
              </div>
            </div>
          }
          code={`import { TextField } from '@opengov/cds-components'

<TextField label="Full name" value={name} onChangeText={setName} />
<TextField label="Email" placeholder="you@example.com" />
<TextField label="Username" errorText="Invalid email address" />
<TextField label="Verified" value="jane@opengov.com" success successText="Email verified" />
<TextField label="Locked" value="Cannot edit" disabled />
<TextField label="Reference" value="View only value" readOnly />`}
          specs={<SpecTable headers={['State', 'Border', 'Border Width', 'Background', 'Notes']} rows={[
            ['Idle (Placeholder)', 'rgba(0,0,0,0.12)', '1px', 'white (#FFFFFF)', 'Empty field, lightest border'],
            ['Idle (Filled)',      'rgba(0,0,0,0.25)', '1px', 'white (#FFFFFF)', 'Has value, slightly stronger border'],
            ['Hover',              'rgba(0,0,0,0.5)',  '1px', 'white (#FFFFFF)', 'Mouse over, darkened border'],
            ['Focused',            'blurple700 (#4B3FFF)', '2px', 'white (#FFFFFF)', 'Active input, brand color'],
            ['Error',              'red600 (#D33423)', '2px', 'white (#FFFFFF)', 'alert-circle icon + error text'],
            ['Success',            'green700 (#037730)', '2px', 'white (#FFFFFF)', 'check-circle icon + success text'],
            ['Disabled',           'rgba(0,0,0,0.12)', '1px', '#F2F2F2',         'Gray background, no interaction'],
            ['Read Only',          'rgba(0,0,0,0.12)', '1px', 'rgba(75,63,255,0.08)', 'Blurple-tinted background'],
          ]} />}
        />

        {/* Focus Ring Demo */}
        <DocShowcase
          label="Focus Ring"
          preview={
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <CdsTextField state="focused" label="Standard focus" value="No ring" />
              <CdsTextField state="focused" label="With focus ring" value="Ring visible" showFocusRing />
            </div>
          }
          code={`<TextField label="Standard" value={text} onChangeText={setText} />
<TextField label="With Ring" value={text} onChangeText={setText} showFocusRing />`}
          specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
            ['Focus ring width', '2px', 'blurple700 (#4B3FFF)'],
            ['Focus ring radius', '8px', 'Larger than input radius'],
            ['Focus ring offset', '5px (inset)', 'Figma: -5px from input edge'],
          ]} />}
        />

        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text60, marginBottom: 12, fontFamily: FONT }}>All 7+1 Interactive States (State Grid)</div>
          <StateGrid states={FIELD_STATES} renderCell={(k) => {
            const valueMap: Record<string, string> = {
              'idle-placeholder': '', 'idle-filled': 'Value', 'hover': 'Value',
              'focused': 'Typing...', 'error': 'Invalid', 'success': 'Valid',
              'disabled': 'Disabled', 'readonly': 'Read only',
            }
            return <CdsTextField state={k as any} label="Label" value={valueMap[k] || ''} />
          }} />
        </div>

        <DocShowcase label="3 sizes" preview={
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <CdsTextField size="sm" state="idle-filled" label="Small (32px)" value="Content" />
            <CdsTextField size="md" state="idle-filled" label="Medium (40px)" value="Content" />
            <CdsTextField size="lg" state="idle-filled" label="Large (48px)" value="Content" />
          </div>
        } specs={<SpecTable headers={['Size', 'Height', 'Font Size', 'Touch Target']} rows={[
          ['sm', '32px', '14px', '44pt via hitSlop (WCAG 2.5.8)'],
          ['md', '40px', '14px', '44pt via hitSlop'],
          ['lg', '48px', '16px', '48pt native'],
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
          ['Box size', '18 x 18 px', 'Visual checkbox element'],
          ['Touch target', '44 x 44 px', 'WCAG 2.5.8 via hitSlop'],
          ['Border radius', '2px', 'Subtle rounding (not 4px)'],
          ['Unchecked border', '1.5px solid rgba(0,0,0,0.6)', 'Figma standard border'],
          ['Checked fill', 'blurple700 (#4B3FFF)', 'White check mark 12px'],
          ['Indeterminate fill', 'blurple700 (#4B3FFF)', 'White minus icon 12px'],
          ['Label font', '16px / 400 / Regular', 'DM Sans, letterSpacing 0.15'],
          ['Label gap', '8px', 'Between box and text'],
          ['Vertical padding', 'py = 8px', 'Per checkbox row'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ---- Radio ---- */}
      <DocSection title="Radio" description="Single-selection control for mutually exclusive options. 24px circle with inner dot when selected, 16px label, 8px gap, and py=8px vertical padding.">
        <DocShowcase label="States" preview={
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <CdsRadio selected={false} label="Unselected" />
            <CdsRadio selected label="Selected" />
            <CdsRadio selected disabled label="Disabled selected" />
            <CdsRadio selected={false} disabled label="Disabled unselected" />
          </div>
        } code={`import { RadioGroup, Radio } from '@opengov/cds-components'

<RadioGroup value={plan} onChange={setPlan}>
  <Radio value="free" label="Free tier" />
  <Radio value="pro" label="Professional" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Outer circle', '24 x 24 px', 'Visual radio element (was 20px)'],
          ['Inner dot', '12 x 12 px', 'Appears when selected'],
          ['Touch target', '44 x 44 px', 'WCAG 2.5.8 via hitSlop'],
          ['Unselected border', '2px solid rgba(0,0,0,0.6)', 'text/secondary semantic color'],
          ['Selected border', '2px solid blurple700 (#4B3FFF)', 'Brand color border'],
          ['Dot fill', 'blurple700 (#4B3FFF)', 'Solid inner circle'],
          ['Label font', '16px / 400 / DM Sans', 'Regular weight, lh 20px'],
          ['Label gap', '8px', 'Between circle and text'],
          ['Vertical padding', 'py = 8px', 'Top and bottom padding on row'],
          ['Letter spacing', '0.15px', 'Figma label spec'],
        ]} />} />
        <DocShowcase label="Radio Group Example" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 280 }}>
            <CdsRadio selected label="Monthly billing" />
            <CdsRadio selected={false} label="Annual billing (save 20%)" />
            <CdsRadio selected={false} label="Enterprise (custom)" />
          </div>
        } code={`<RadioGroup value={billing} onChange={setBilling}>
  <Radio value="monthly" label="Monthly billing" />
  <Radio value="annual" label="Annual billing (save 20%)" />
  <Radio value="enterprise" label="Enterprise (custom)" />
</RadioGroup>`} />
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
      <DocSection title="SearchBar" description="Pill-shaped search input with leading icon, clear button, animated cancel, and focused state. Uses a 100px border radius (capsule shape) per CDS 37 Figma spec.">
        <DocShowcase label="States" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <CdsSearchBar state="idle" />
            <CdsSearchBar state="focused" value="Annual report" />
            <CdsSearchBar state="idle" value="Budget review" />
          </div>
        } code={`import { SearchBar } from '@opengov/cds-components'

<SearchBar value={query} onChangeText={setQuery} placeholder="Search..." />
<SearchBar value={query} autoFocus onCancel={() => setQuery('')} />
<SearchBar value={query} variant="outlined" size="lg" />`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Height', '40px (md)', 'Size-dependent (32/40/48)'],
          ['Background', 'white (#FFFFFF)', 'Clean white container'],
          ['Border idle', '1px solid rgba(0,0,0,0.12)', 'Semantic outlined/enabledBorder'],
          ['Border focused', '2px solid blurple700 (#4B3FFF)', 'Brand focus color'],
          ['Border radius', '100px', 'Pill / capsule shape (not 4px)'],
          ['Placeholder color', 'rgba(0,0,0,0.38)', 'text/disabled semantic token'],
          ['Search icon', '20px, neutral500', 'Left-aligned, 8px gap'],
          ['Clear button', '32 x 32 px', 'Visible when value present'],
          ['Padding', 'px=16, py=4', 'Figma horizontal/vertical padding'],
          ['Font', '14px / 400 DM Sans', 'Body text style (size-dependent)'],
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
            { name: 'size',               type: "'sm' | 'md' | 'lg'",         default: "'md'",       description: 'Height preset (32/40/48px)' },
            { name: 'label',              type: 'string',                      description: 'Label text above input' },
            { name: 'placeholder',        type: 'string',                      description: 'Placeholder when empty' },
            { name: 'error',              type: 'boolean',                     default: 'false', description: 'Puts field in error state' },
            { name: 'errorText',          type: 'string',                      description: 'Error message (also sets error state). Shows alert-circle icon.' },
            { name: 'success',            type: 'boolean',                     default: 'false', description: 'Puts field in success state (green700 border)' },
            { name: 'successText',        type: 'string',                      description: 'Success message (also sets success state). Shows check-circle icon.' },
            { name: 'helperText',         type: 'string',                      description: 'Helper text below input' },
            { name: 'disabled',           type: 'boolean',                     default: 'false', description: 'Disables input (#F2F2F2 bg, rgba(0,0,0,0.12) border)' },
            { name: 'readOnly',           type: 'boolean',                     default: 'false', description: 'Read-only mode (blurple-tinted bg, non-editable)' },
            { name: 'showFocusRing',      type: 'boolean',                     default: 'false', description: 'Show 2px blurple focus ring with 8px radius when focused' },
            { name: 'clearable',          type: 'boolean',                     default: 'false', description: 'Show clear button when input has content' },
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
            <span style={{ fontWeight: 600, minWidth: 160 }}>Border idle (empty)</span>
            <TokenRef name="outlined/enabledBorder" value="rgba(0,0,0,0.12)" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Border idle (filled)</span>
            <TokenRef name="standard/enabledBorder" value="rgba(0,0,0,0.25)" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Border hover</span>
            <TokenRef name="black_states/outlinedBorder" value="rgba(0,0,0,0.5)" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Border focus</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Border error</span>
            <TokenRef name="red600" value="#D33423" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Border success</span>
            <TokenRef name="green700" value="#037730" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Checked / On</span>
            <TokenRef name="blurple700" value="#4B3FFF" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Radio unselected</span>
            <TokenRef name="text/secondary" value="rgba(0,0,0,0.6)" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Switch off</span>
            <TokenRef name="gray300" value="#DDDEDE" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Disabled bg</span>
            <TokenRef name="gray100" value="#F2F2F2" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Read-only bg</span>
            <TokenRef name="primary/selected" value="rgba(75,63,255,0.08)" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Search border radius</span>
            <TokenRef name="pill" value="100px" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 600, minWidth: 160 }}>Disabled opacity</span>
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
