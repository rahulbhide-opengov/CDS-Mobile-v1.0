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
  folder: (c: string, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke={c} strokeWidth="2" strokeLinejoin="round" /></svg>,
  file: (c: string, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={c} strokeWidth="2" strokeLinejoin="round" /><path d="M14 2v6h6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  user: (c: string, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={c} strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="7" r="4" stroke={c} strokeWidth="2" /></svg>,
  mail: (c: string, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke={c} strokeWidth="2" /><path d="M22 7l-10 7L2 7" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  chevR: (c: string, s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  chevL: (c: string, s = 14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  star: (filled: boolean, c: string, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" stroke={c} strokeWidth="2" strokeLinejoin="round" /></svg>,
  dot: (c: string, s = 10) => <svg width={s} height={s} viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill={c} /></svg>,
}

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------
function CdsList() {
  const items = [
    { icon: Ico.folder(C.blurple), primary: 'Project documents', secondary: '24 files', trailing: Ico.chevR(C.t38) },
    { icon: Ico.file(C.slate), primary: 'Budget report Q4', secondary: 'Modified 2 days ago', trailing: Ico.chevR(C.t38) },
    { icon: Ico.user(C.green), primary: 'Team members', secondary: '12 people', trailing: Ico.chevR(C.t38) },
    { icon: Ico.mail(C.cerulean), primary: 'Notifications', secondary: '3 unread', trailing: <span style={{ fontFamily: M, fontSize: 11, fontWeight: 600, color: C.white, backgroundColor: C.red, borderRadius: 10, padding: '2px 7px' }}>3</span> },
  ]
  return (
    <div style={{ width: 360, borderRadius: 8, border: `1px solid ${C.g200}`, overflow: 'hidden' }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
          borderTop: i > 0 ? `1px solid ${C.g200}` : 'none',
          backgroundColor: C.white, cursor: 'pointer',
        }}>
          <div style={{ flexShrink: 0 }}>{it.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 500, color: C.t87, lineHeight: '20px' }}>{it.primary}</div>
            <div style={{ fontFamily: F, fontSize: 12, color: C.t60, lineHeight: '16px' }}>{it.secondary}</div>
          </div>
          <div style={{ flexShrink: 0 }}>{it.trailing}</div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// LabelValuePair
// ---------------------------------------------------------------------------
function CdsLabelValue({ stacked = false }: { stacked?: boolean }) {
  const pairs = [
    { label: 'Status', value: 'Active' },
    { label: 'Priority', value: 'High' },
    { label: 'Assigned to', value: 'Jane Cooper' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: stacked ? 16 : 10, width: 300 }}>
      {pairs.map((p, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: stacked ? 'column' : 'row',
          justifyContent: stacked ? 'flex-start' : 'space-between',
          alignItems: stacked ? 'flex-start' : 'center',
          gap: stacked ? 2 : 16,
        }}>
          <span style={{ fontFamily: F, fontSize: 13, color: C.t60, fontWeight: 400 }}>{p.label}</span>
          <span style={{ fontFamily: F, fontSize: 14, color: C.t87, fontWeight: 500 }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Rating
// ---------------------------------------------------------------------------
function CdsRating() {
  const [rating, setRating] = useState(3)
  const [hover, setHover] = useState(0)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n}
          onClick={() => setRating(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 2 }}
        >
          {Ico.star(n <= (hover || rating), n <= (hover || rating) ? C.yellow : C.g200)}
        </button>
      ))}
      <span style={{ fontFamily: M, fontSize: 13, color: C.t60, marginLeft: 8 }}>{hover || rating}/5</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
function CdsPagination() {
  const [page, setPage] = useState(3)
  const total = 8
  const range = () => {
    const pages: (number | string)[] = [1]
    if (page > 3) pages.push('...')
    for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) pages.push(i)
    if (page < total - 2) pages.push('...')
    if (total > 1) pages.push(total)
    return pages
  }
  const Btn = ({ children, active, disabled, onClick }: { children: React.ReactNode; active?: boolean; disabled?: boolean; onClick?: () => void }) => (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      width: 36, height: 36, borderRadius: 8, border: active ? 'none' : `1px solid ${C.g200}`,
      backgroundColor: active ? C.blurple : C.white, color: active ? C.white : disabled ? C.t38 : C.t87,
      fontFamily: F, fontSize: 13, fontWeight: active ? 600 : 400, cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>{children}</button>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Btn disabled={page === 1} onClick={() => setPage(p => p - 1)}>{Ico.chevL(page === 1 ? C.t38 : C.t87)}</Btn>
      {range().map((p, i) =>
        typeof p === 'string'
          ? <span key={`e${i}`} style={{ fontFamily: F, fontSize: 13, color: C.t38, width: 36, textAlign: 'center' }}>...</span>
          : <Btn key={p} active={p === page} onClick={() => setPage(p)}>{p}</Btn>
      )}
      <Btn disabled={page === total} onClick={() => setPage(p => p + 1)}>{Ico.chevR(page === total ? C.t38 : C.t87)}</Btn>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------
function CdsTimeline() {
  const events = [
    { label: 'Created', desc: 'Permit application submitted', time: 'Jan 15, 2024', color: C.blurple, done: true },
    { label: 'Review', desc: 'Under departmental review', time: 'Jan 22, 2024', color: C.green, done: true },
    { label: 'Approved', desc: 'Approved by planning board', time: 'Feb 3, 2024', color: C.green, done: true },
    { label: 'Pending', desc: 'Awaiting final inspection', time: 'Upcoming', color: C.t38, done: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 8, width: 320 }}>
      {events.map((ev, i) => (
        <div key={i} style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: ev.color, flexShrink: 0, marginTop: 4, border: ev.done ? 'none' : `2px solid ${C.g200}`, boxSizing: 'border-box' as const }} />
            {i < events.length - 1 && <div style={{ width: 2, flex: 1, backgroundColor: i < events.length - 2 && events[i + 1].done ? C.green : C.g200, minHeight: 32 }} />}
          </div>
          <div style={{ paddingBottom: i < events.length - 1 ? 24 : 0 }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: ev.done ? C.t87 : C.t38, lineHeight: '20px' }}>{ev.label}</div>
            <div style={{ fontFamily: F, fontSize: 13, color: C.t60, lineHeight: '18px', marginTop: 2 }}>{ev.desc}</div>
            <div style={{ fontFamily: M, fontSize: 11, color: C.t38, marginTop: 4 }}>{ev.time}</div>
          </div>
        </div>
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
const meta: Meta = { title: 'Components/Lists & Data', parameters: { layout: 'fullscreen' } }
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------
export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Lists & Data"
      description="Components for displaying structured data, collections, and sequential information. CDS 37 provides List, LabelValuePair, Rating, Pagination, and Timeline patterns."
      badge="@opengov/cds-components"
      status="new"
    >
      {/* ----- List ----- */}
      <DocSection title="List / ListItem" description="Vertical collection of items with leading icon, primary/secondary text, and trailing content. Optimized for touch interaction with 48px minimum row height.">
        <DocShowcase label="Standard list" preview={<CdsList />} code={`<List>
  <ListItem
    leadingIcon={<FolderIcon />}
    primary="Project documents"
    secondary="24 files"
    trailing={<ChevronRight />}
    onPress={() => navigate('docs')}
  />
</List>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Row height (min)', '48px', 'Single-line: 48px, two-line: 56px'],
          ['Padding horizontal', '16px', 'Left and right'],
          ['Padding vertical', '12px', 'Top and bottom per item'],
          ['Icon size', '18px', 'Leading icon'],
          ['Gap (icon to text)', '12px', 'Leading icon spacing'],
          ['Primary text', '14px / 500', 'DM Sans medium'],
          ['Secondary text', '12px / 400', 'DM Sans regular'],
          ['Divider', '1px solid', 'CDS g200 (#DDDEDE)'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- LabelValuePair ----- */}
      <DocSection title="LabelValuePair" description="Key-value display for metadata. Available in horizontal (inline) and stacked (vertical) layout variants.">
        <SL>Horizontal layout</SL>
        <DocShowcase label="Horizontal" preview={<CdsLabelValue stacked={false} />} code={`<LabelValuePair label="Status" value="Active" />
<LabelValuePair label="Priority" value="High" />`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Label font', '13px / 400', 'DM Sans regular'],
          ['Value font', '14px / 500', 'DM Sans medium'],
          ['Label color', 'rgba(0,0,0,0.6)', 'Secondary text'],
          ['Value color', 'rgba(0,0,0,0.87)', 'Primary text'],
          ['Row gap', '10px', 'Between pairs (horizontal)'],
        ]} />} />
        <SL>Stacked layout</SL>
        <DocShowcase label="Stacked" preview={<CdsLabelValue stacked />} code={`<LabelValuePair
  layout="stacked"
  label="Assigned to"
  value="Jane Cooper"
/>`} />
      </DocSection>

      <DocDivider />

      {/* ----- Rating ----- */}
      <DocSection title="Rating" description="Interactive star rating with 1-5 scale. Shows hover preview on web and tap selection on mobile. Uses CDS yellow700 for filled stars.">
        <DocShowcase label="Interactive rating" preview={<CdsRating />} code={`<Rating
  value={3}
  onChange={(val) => setRating(val)}
  max={5}
/>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Star size', '20px', 'Touch area 36px via padding'],
          ['Star gap', '4px', 'Between stars'],
          ['Filled color', '#885604', 'CDS yellow700'],
          ['Empty color', '#DDDEDE', 'CDS g200'],
          ['Touch target', '36px', 'Per star (padding expansion)'],
          ['Animation', 'scale 100ms', 'On press feedback'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Pagination ----- */}
      <DocSection title="Pagination" description="Page navigation with numbered buttons, previous/next controls, and ellipsis truncation for large page counts.">
        <DocShowcase label="Interactive pagination" preview={<CdsPagination />} code={`<Pagination
  currentPage={3}
  totalPages={8}
  onPageChange={(page) => setPage(page)}
/>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Button size', '36px x 36px', 'Square touch target'],
          ['Border radius', '8px', 'Rounded corners'],
          ['Active bg', '#4B3FFF', 'CDS blurple700'],
          ['Active text', '#FFFFFF', 'White on blurple'],
          ['Inactive border', '1px solid #DDDEDE', 'CDS g200'],
          ['Gap between', '6px', 'Button spacing'],
          ['Font', '13px / 400-600', 'DM Sans'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Timeline ----- */}
      <DocSection title="Timeline" description="Chronological event display with status dots, connector lines, and metadata. Supports completed, active, and upcoming states.">
        <DocShowcase label="Permit timeline" preview={<CdsTimeline />} code={`<Timeline>
  <TimelineItem
    status="completed"
    label="Created"
    description="Permit application submitted"
    timestamp="Jan 15, 2024"
  />
  <TimelineItem status="upcoming" label="Pending" />
</Timeline>`} specs={<SpecTable headers={['Property', 'Value', 'Notes']} rows={[
          ['Dot size', '12px', 'Status indicator'],
          ['Dot completed', '#037730', 'CDS green700, filled'],
          ['Dot upcoming', '#DDDEDE border', 'Hollow with g200 border'],
          ['Connector width', '2px', 'Vertical line'],
          ['Connector completed', '#037730', 'CDS green700'],
          ['Connector upcoming', '#DDDEDE', 'CDS g200'],
          ['Gap (dot to text)', '16px', 'Horizontal'],
          ['Item spacing', '24px', 'Bottom padding between items'],
          ['Label font', '14px / 600', 'DM Sans semibold'],
          ['Time font', '11px / 400', 'DM Mono'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Props tables ----- */}
      <DocSection title="List Props">
        <PropsTable props={[
          { name: 'children', type: 'ListItem[]', required: true, description: 'ListItem components' },
          { name: 'divider', type: 'boolean', default: 'true', description: 'Show dividers between items' },
          { name: 'bordered', type: 'boolean', default: 'false', description: 'Outer border around list' },
        ]} />
      </DocSection>

      <DocSection title="ListItem Props">
        <PropsTable props={[
          { name: 'primary', type: 'string', required: true, description: 'Primary label text' },
          { name: 'secondary', type: 'string', description: 'Secondary description text' },
          { name: 'leadingIcon', type: 'ReactNode', description: 'Icon before text content' },
          { name: 'trailing', type: 'ReactNode', description: 'Content at trailing edge' },
          { name: 'onPress', type: '() => void', description: 'Tap handler for the row' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable interaction' },
        ]} />
      </DocSection>

      <DocSection title="LabelValuePair Props">
        <PropsTable props={[
          { name: 'label', type: 'string', required: true, description: 'Key/label text' },
          { name: 'value', type: 'string | ReactNode', required: true, description: 'Value content' },
          { name: 'layout', type: "'horizontal' | 'stacked'", default: "'horizontal'", description: 'Layout direction' },
        ]} />
      </DocSection>

      <DocSection title="Rating Props">
        <PropsTable props={[
          { name: 'value', type: 'number', required: true, description: 'Current rating (1-5)' },
          { name: 'onChange', type: '(value: number) => void', description: 'Rating change handler' },
          { name: 'max', type: 'number', default: '5', description: 'Maximum star count' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Disable interaction' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Star size variant' },
        ]} />
      </DocSection>

      <DocSection title="Pagination Props">
        <PropsTable props={[
          { name: 'currentPage', type: 'number', required: true, description: 'Active page number' },
          { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages' },
          { name: 'onPageChange', type: '(page: number) => void', required: true, description: 'Page change callback' },
          { name: 'siblingCount', type: 'number', default: '1', description: 'Pages shown beside current' },
        ]} />
      </DocSection>

      <DocSection title="Timeline Props">
        <PropsTable props={[
          { name: 'children', type: 'TimelineItem[]', required: true, description: 'Timeline event items' },
          { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction' },
        ]} />
      </DocSection>

      <DocDivider />

      {/* ----- Accessibility ----- */}
      <DocSection title="Accessibility">
        <AccessSpec items={[
          { label: 'List: role="list" with role="listitem" children', value: 'Required', status: 'pass' },
          { label: 'ListItem: focusable and pressable via keyboard', value: 'Enter/Space', status: 'pass' },
          { label: 'Rating: role="radiogroup" with star radio buttons', value: 'Arrow keys to select', status: 'pass' },
          { label: 'Rating: aria-label with current value', value: '"3 out of 5 stars"', status: 'pass' },
          { label: 'Pagination: nav with aria-label="Pagination"', value: 'Required', status: 'pass' },
          { label: 'Pagination: aria-current="page" on active', value: 'Required', status: 'pass' },
          { label: 'Timeline: ordered list semantics', value: 'role="list"', status: 'pass' },
          { label: 'All interactive: min 44pt touch target', value: 'WCAG 2.5.8', status: 'pass' },
        ]} />
      </DocSection>
    </DocPage>
  ),
}
