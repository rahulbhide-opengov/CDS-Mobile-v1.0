import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, StateGrid, SpecTable, PropsTable,
  DoDont, AccessSpec, DocDivider,
} from '../.shared/DocLayout'

const FONT = "'DM Sans', system-ui"
const C = {
  blurple: '#4B3FFF', blurpleDk: '#19009B', slate: '#546574',
  g100: '#F2F2F2', white: '#FFFFFF', black87: 'rgba(0,0,0,0.87)',
  black60: 'rgba(0,0,0,0.6)', black38: 'rgba(0,0,0,0.38)',
  red: '#D33423', border: '#DDDEDE',
}

// -- Icons (minimal inline SVGs) ------------------------------------------

const Ico = ({ d, color = C.slate, s = 16 }: { d: string; color?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
    <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const HomeIco = (c: string) => <Ico d="M3 12l9-8 9 8M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" color={c} />
const SearchIco = (c: string) => <><svg width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke={c} strokeWidth="2" /><path d="M16 16l4 4" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg></>
const CalIco = (c: string) => <Ico d="M3 4h18v17H3zM8 2v4M16 2v4M3 10h18" color={c} />
const ListIco = (c: string) => <Ico d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" color={c} />
const ClockIco = (c: string) => <><svg width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" /><path d="M12 7v5l3 3" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg></>

// -- CdsTab ---------------------------------------------------------------

function CdsTab({ label, active = false, disabled = false, icon, badge, onPress }: {
  label: string; active?: boolean; disabled?: boolean; icon?: React.ReactNode; badge?: number; onPress?: () => void
}) {
  const tc = disabled ? C.black38 : active ? C.blurple : C.slate
  return (
    <button onClick={disabled ? undefined : onPress} disabled={disabled} style={{
      display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6,
      height: 48, padding: '0 16px', border: 'none', background: 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: FONT, fontSize: 14,
      fontWeight: active ? 600 : 400, color: tc, opacity: disabled ? 0.38 : 1,
      borderBottom: active ? `2px solid ${C.blurple}` : '2px solid transparent', outline: 'none',
    }}>
      {icon}{label}
      {badge != null && badge > 0 && <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 16, height: 16, borderRadius: 8, padding: '0 4px',
        backgroundColor: C.red, color: C.white, fontSize: 10, fontWeight: 700,
      }}>{badge > 99 ? '99+' : badge}</span>}
    </button>
  )
}

const TabBar = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: C.white }}>{children}</div>
)

// -- CdsSegmentedControl --------------------------------------------------

function CdsSegCtrl({ items, activeKey, onSelect }: {
  items: { key: string; label: string }[]; activeKey: string; onSelect?: (k: string) => void
}) {
  return (
    <div style={{ display: 'flex', backgroundColor: C.g100, borderRadius: 4, padding: 4 }}>
      {items.map(i => {
        const a = i.key === activeKey
        return <button key={i.key} onClick={() => onSelect?.(i.key)} style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: 36, border: 'none', borderRadius: 4, cursor: 'pointer',
          backgroundColor: a ? C.white : 'transparent',
          boxShadow: a ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
          fontFamily: FONT, fontSize: 14, fontWeight: a ? 600 : 400,
          color: a ? C.black87 : C.black60, outline: 'none',
        }}>{i.label}</button>
      })}
    </div>
  )
}

// -- CdsSegmentedTabs -----------------------------------------------------

function CdsSegTabs({ items, activeKey, onSelect }: {
  items: { key: string; label: string; count?: number; icon?: (c: string) => React.ReactNode }[]
  activeKey: string; onSelect?: (k: string) => void
}) {
  return (
    <div style={{ display: 'flex', backgroundColor: C.g100, borderRadius: 8, padding: 4, gap: 4 }}>
      {items.map(i => {
        const a = i.key === activeKey
        const col = a ? C.blurple : C.black60
        return <button key={i.key} onClick={() => onSelect?.(i.key)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 2, padding: 8, border: 'none', borderRadius: 8,
          cursor: 'pointer', backgroundColor: a ? C.white : 'transparent',
          boxShadow: a ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', outline: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {i.icon?.(col)}
            <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 500, color: col }}>{i.label}</span>
          </div>
          {i.count != null && <span style={{
            fontFamily: FONT, fontSize: 11, fontWeight: 600, letterSpacing: 0.16,
            color: a ? C.blurpleDk : C.black60,
          }}>({i.count})</span>}
        </button>
      })}
    </div>
  )
}

// -- Interactive wrappers -------------------------------------------------

function LiveTabBar() {
  const [a, setA] = useState('overview')
  return (<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <TabBar>
      <CdsTab label="Overview" active={a === 'overview'} onPress={() => setA('overview')} />
      <CdsTab label="Details" active={a === 'details'} onPress={() => setA('details')} />
      <CdsTab label="Activity" active={a === 'activity'} onPress={() => setA('activity')} />
    </TabBar>
    <div style={{ padding: 16, backgroundColor: C.g100, borderRadius: 8, fontFamily: FONT, fontSize: 13, color: C.black60, textAlign: 'center' }}>
      Content for: <strong>{a}</strong>
    </div>
  </div>)
}

function LiveSegCtrl() {
  const [a, setA] = useState('week')
  return <CdsSegCtrl items={[{ key: 'day', label: 'Day' }, { key: 'week', label: 'Week' }, { key: 'month', label: 'Month' }, { key: 'year', label: 'Year' }]} activeKey={a} onSelect={setA} />
}

function LiveSegTabs() {
  const [a, setA] = useState('scheduled')
  return <CdsSegTabs items={[
    { key: 'scheduled', label: 'Scheduled', count: 4, icon: CalIco },
    { key: 'missed', label: 'Missed', count: 1, icon: ClockIco },
    { key: 'requested', label: 'Requested', count: 4, icon: ListIco },
  ]} activeKey={a} onSelect={setA} />
}

// -- Meta -----------------------------------------------------------------

const meta: Meta = { title: 'Components/Navigation', parameters: { layout: 'fullscreen' } }
export default meta

// -- Story ----------------------------------------------------------------

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage title="Navigation" description="Navigation components for switching views and filtering content. CDS 37 provides Tab/TabBar for page-level navigation, SegmentedControl for value selection, and SegmentedTabs for filtered content views." badge="@opengov/cds-components" status="stable">

      {/* ---- Tab / TabBar ------------------------------------------------ */}
      <DocSection title="Tab / TabBar" description="Horizontal tab bar with underline indicator. Supports fixed and scrollable layout. 48px tall, meeting WCAG 2.5.8.">
        <DocShowcase label="Interactive" preview={<LiveTabBar />} code={`<TabBar variant="primary">
  <Tab label="Overview" active={active === 'overview'} onPress={() => set('overview')} />
  <Tab label="Details" active={false} onPress={...} />
  <Tab label="Activity" active={false} onPress={...} />
</TabBar>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Height', '48px', 'WCAG 2.5.8 compliant'],
          ['Active text', '#4B3FFF', 'blurple700'],
          ['Inactive text', '#546574', 'slate700'],
          ['Indicator', '2px bottom border', 'blurple700, radius 2px'],
          ['Font', '14px / DM Sans', 'SemiBold 600 active, Regular 400 idle'],
          ['Icon size', '18px', '18x18 container, 6px gap'],
          ['Padding H', '16px', 'Per tab'],
        ]} />} />
      </DocSection>

      <DocSection title="With Icons and Badges" description="Tabs accept a leading icon and/or trailing badge count (capped at 99+).">
        <DocShowcase label="Icons" preview={
          <TabBar>
            <CdsTab label="Home" active icon={HomeIco(C.blurple)} />
            <CdsTab label="Search" icon={SearchIco(C.slate)} />
            <CdsTab label="Calendar" icon={CalIco(C.slate)} />
          </TabBar>
        } />
        <DocShowcase label="Badges" preview={
          <TabBar>
            <CdsTab label="Inbox" active badge={12} />
            <CdsTab label="Drafts" badge={3} />
            <CdsTab label="Sent" />
          </TabBar>
        } />
      </DocSection>

      <DocSection title="Tab States" description="Idle, active, and disabled states for the primary variant.">
        <StateGrid states={[
          { label: 'Idle', key: 'idle', description: 'Default' },
          { label: 'Active', key: 'active', description: 'Selected' },
          { label: 'Disabled', key: 'disabled', description: 'disabled=true' },
        ]} renderCell={(k) => k === 'active' ? <CdsTab label="Active" active /> : k === 'disabled' ? <CdsTab label="Disabled" disabled /> : <CdsTab label="Idle" />} />
      </DocSection>

      <DocDivider />

      {/* ---- SegmentedControl -------------------------------------------- */}
      <DocSection title="SegmentedControl" description="iOS-style segmented control for mutually exclusive options. Active segment shows a white pill with shadow. Animated spring transition between segments.">
        <DocShowcase label="Interactive (Day/Week/Month/Year)" preview={<div style={{ maxWidth: 360 }}><LiveSegCtrl /></div>} code={`<SegmentedControl
  items={[{ key: 'day', label: 'Day' }, { key: 'week', label: 'Week' }, ...]}
  activeKey={period}
  onSelect={setPeriod}
/>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Container bg', '#F2F2F2', '$backgroundStrong'],
          ['Container / segment radius', '4px', 'Outer and inner'],
          ['Padding', '4px', 'Around segments'],
          ['Segment height', '36px', '+ hitSlop 4px = 44px touch'],
          ['Active bg', '#FFFFFF + shadow', '0 1px 3px rgba(0,0,0,0.12)'],
          ['Active text', 'rgba(0,0,0,0.87)', 'SemiBold 600'],
          ['Inactive text', 'rgba(0,0,0,0.6)', 'Regular 400'],
          ['Font', '14px / DM Sans', '$body'],
          ['Animation', 'Spring tension 120, friction 14', 'Animated.spring'],
        ]} />} />
        <DocShowcase label="2 and 3 segments" preview={<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
          <CdsSegCtrl items={[{ key: 'list', label: 'List' }, { key: 'map', label: 'Map' }]} activeKey="list" />
          <CdsSegCtrl items={[{ key: 'd', label: 'Day' }, { key: 'w', label: 'Week' }, { key: 'm', label: 'Month' }]} activeKey="w" />
        </div>} />
      </DocSection>

      <DocDivider />

      {/* ---- SegmentedTabs ----------------------------------------------- */}
      <DocSection title="SegmentedTabs" description="Segmented tabs with icon, label, and optional count badge for filtering countable content. Active tab turns blurple with white background and shadow.">
        <DocShowcase label="Interactive (icon + label + count)" preview={<div style={{ maxWidth: 400 }}><LiveSegTabs /></div>} code={`<SegmentedTabs
  items={[
    { key: 'scheduled', label: 'Scheduled', count: 4, icon: <CalendarIcon /> },
    { key: 'missed', label: 'Missed', count: 1, icon: <ClockIcon /> },
    { key: 'requested', label: 'Requested', count: 4, icon: <ListIcon /> },
  ]}
  activeKey={filter}
  onSelect={setFilter}
/>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Container bg', '#F2F2F2', '$backgroundStrong'],
          ['Container radius', '8px / $md', 'Rounded container'],
          ['Active bg', '#FFFFFF + shadow', '0 2px 8px rgba(0,0,0,0.08)'],
          ['Active label', '#4B3FFF', 'blurple700 / Medium 500'],
          ['Active count', '#19009B', 'blurpleDark / SemiBold 600'],
          ['Inactive text', 'rgba(0,0,0,0.6)', '$colorSecondary'],
          ['Label / count size', '14px / 11px', '$sm / $xs'],
          ['Chip radius', '8px / $md', 'Inner pill corners'],
          ['hitSlop', 'top: 6, bottom: 6', 'Ensures 44px touch'],
        ]} />} />
        <DocShowcase label="Label-only (no icons)" preview={<div style={{ maxWidth: 360 }}>
          <CdsSegTabs items={[
            { key: 'all', label: 'All', count: 24 },
            { key: 'active', label: 'Active', count: 12 },
            { key: 'pending', label: 'Pending', count: 8 },
          ]} activeKey="all" />
        </div>} />
      </DocSection>

      <DocDivider />

      {/* ---- Accessibility ----------------------------------------------- */}
      <DocSection title="Accessibility">
        <AccessSpec items={[
          { label: 'Tab touch target', value: '48px height', status: 'pass' },
          { label: 'SegmentedControl touch', value: '36px + hitSlop = 44px', status: 'pass' },
          { label: 'SegmentedTabs touch', value: 'hitSlop top/bottom 6px', status: 'pass' },
          { label: 'Role: tablist / tab', value: 'All containers + items', status: 'pass' },
          { label: 'Selected state', value: 'accessibilityState={{ selected }}', status: 'pass' },
          { label: 'Badge a11y', value: 'Count in accessibilityLabel', status: 'pass' },
          { label: 'Contrast', value: 'blurple700 on white > 4.5:1', status: 'pass' },
        ]} />
      </DocSection>

      <DocDivider />

      {/* ---- Guidelines -------------------------------------------------- */}
      <DocSection title="Usage Guidelines">
        <DoDont dos={[
          'Use Tab/TabBar for page-level view switching (2-7 tabs)',
          'Use SegmentedControl for mutually exclusive value selection (2-4 options)',
          'Use SegmentedTabs for filtering countable content with badges',
          'Keep labels short and scannable (1-2 words)',
        ]} donts={[
          'Don\'t use SegmentedControl for navigation -- use Tab/TabBar',
          'Don\'t exceed 4 segments in SegmentedControl',
          'Don\'t mix icon-only and label tabs in SegmentedTabs',
          'Don\'t use tabs for actions -- use Buttons instead',
        ]} />
      </DocSection>

      <DocDivider />

      {/* ---- Props ------------------------------------------------------- */}
      <DocSection title="Tab Props">
        <PropsTable props={[
          { name: 'label', type: 'string', required: true, description: 'Display text' },
          { name: 'active', type: 'boolean', default: 'false', description: 'Currently selected' },
          { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Underline or pill variant' },
          { name: 'icon', type: 'ReactNode', description: 'Optional leading icon' },
          { name: 'badge', type: 'number', description: 'Notification count (capped 99+)' },
          { name: 'onPress', type: '() => void', description: 'Press callback' },
        ]} />
      </DocSection>

      <DocSection title="TabBar Props">
        <PropsTable props={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Tab components' },
          { name: 'variant', type: "'primary' | 'secondary'", default: "'primary'", description: 'Matches child Tab variant' },
          { name: 'scrollable', type: 'boolean', default: 'false', description: 'Horizontal scroll for overflow' },
        ]} />
      </DocSection>

      <DocSection title="SegmentedControl Props">
        <PropsTable props={[
          { name: 'items', type: '{ key, label, icon? }[]', required: true, description: 'Segment items (2-4)' },
          { name: 'activeKey', type: 'string', required: true, description: 'Active segment key' },
          { name: 'onSelect', type: '(key: string) => void', description: 'Selection callback' },
          { name: 'fullWidth', type: 'boolean', default: 'true', description: 'Stretch to fill parent' },
        ]} />
      </DocSection>

      <DocSection title="SegmentedTabs Props">
        <PropsTable props={[
          { name: 'items', type: '{ key, label?, count?, icon? }[]', required: true, description: 'Tab items' },
          { name: 'activeKey', type: 'string', required: true, description: 'Active tab key' },
          { name: 'onSelect', type: '(key: string) => void', description: 'Selection callback' },
          { name: 'variant', type: "'default' | 'iconOnly'", default: "'default'", description: 'Label or icon-only mode' },
        ]} />
      </DocSection>
    </DocPage>
  ),
}
