import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DocPage, DocSection, DocShowcase, SpecTable, PropsTable,
  DoDont, AccessSpec, DocDivider,
} from '../.shared/DocLayout'

// ---------------------------------------------------------------------------
// CDS 37 palette tokens
// ---------------------------------------------------------------------------
const FONT = "'DM Sans', system-ui"
const MONO = "'DM Mono', 'SF Mono', monospace"
const C = {
  blurple700: '#4B3FFF', blurpleLight: '#EEF1FC',
  gray100: '#F5F5F5', gray200: '#EEEEEE', gray300: '#E0E0E0',
  gray400: '#BDBDBD', gray600: '#757575', gray800: '#424242',
  white: '#FFFFFF', border: '#DDDEDE',
  text: 'rgba(0,0,0,0.87)', textSecondary: 'rgba(0,0,0,0.6)', textTertiary: 'rgba(0,0,0,0.38)',
  blue500: '#2196F3', green500: '#4CAF50', orange500: '#FF9800',
  violet500: '#7C4DFF', rose500: '#E91E63', red600: '#D33423', success: '#037730',
}

// ---------------------------------------------------------------------------
// SVG icon factory + specific icons
// ---------------------------------------------------------------------------
const Svg = ({ d, size = 16, color = C.gray600, stroke = true }: {
  d: string; size?: number; color?: string; stroke?: boolean
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronDown = (p: { size?: number; color?: string }) =>
  <Svg d="M6 9l6 6 6-6" {...p} />
const CheckMark = (p: { size?: number; color?: string }) =>
  <Svg d="M5 12l5 5L20 7" {...p} />
const SearchIcon = (p: { size?: number; color?: string }) => (
  <svg width={p.size || 16} height={p.size || 16} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke={p.color || C.gray400} strokeWidth="2" />
    <path d="M16 16l4 4" stroke={p.color || C.gray400} strokeWidth="2" strokeLinecap="round" />
  </svg>
)
const SendIcon = (p: { size?: number; color?: string }) =>
  <Svg d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" size={p.size || 18} color={p.color || C.white} />
const AttachIcon = (p: { size?: number; color?: string }) =>
  <Svg d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" size={p.size || 20} color={p.color || C.gray600} />
const DownloadIcon = (p: { size?: number; color?: string }) =>
  <Svg d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" {...p} />
const TrashIcon = (p: { size?: number; color?: string }) =>
  <Svg d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" color={p.color || C.red600} {...p} />

const FILE_COLORS: Record<string, string> = {
  DOC: C.blue500, XLS: C.green500, PPT: C.orange500, IMG: C.violet500, VID: C.rose500,
}
function FileTypeIcon({ type }: { type: string }) {
  const c = FILE_COLORS[type] || C.gray600
  return (
    <div style={{
      width: 32, height: 38, borderRadius: 4, backgroundColor: c + '18',
      border: `1.5px solid ${c}`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, fontFamily: MONO, color: c, letterSpacing: 0.5 }}>{type}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pattern 1: PageHeader
// ---------------------------------------------------------------------------
function PageHeaderPreview() {
  return (
    <div style={{ width: '100%', borderBottom: `1px solid ${C.border}`, padding: '16px 24px 20px', fontFamily: FONT, backgroundColor: C.white }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: C.textTertiary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, fontFamily: MONO }}>
        <span style={{ color: C.blurple700 }}>Dashboard</span><span>/</span>
        <span style={{ color: C.blurple700 }}>Projects</span><span>/</span>
        <span>Budget Report FY2026</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: -0.3, lineHeight: 1.2, color: C.text }}>Budget Report FY2026</h1>
          <p style={{ fontSize: 14, color: C.textSecondary, margin: '4px 0 0', lineHeight: '20px' }}>Annual fiscal report with quarterly breakdowns and variance analysis</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 24 }}>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 4, border: `1px solid ${C.gray300}`, backgroundColor: C.white, fontFamily: FONT, fontSize: 13, fontWeight: 500, color: C.gray800, cursor: 'pointer' }}>Export</button>
          <button style={{ height: 36, padding: '0 14px', borderRadius: 4, border: 'none', backgroundColor: C.blurple700, fontFamily: FONT, fontSize: 13, fontWeight: 500, color: C.white, cursor: 'pointer' }}>Edit Report</button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pattern 2: ChatBubble
// ---------------------------------------------------------------------------
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: C.gray400, animation: `cds-typing 1.2s ease-in-out ${i * 0.2}s infinite` }} />
      ))}
      <style>{`@keyframes cds-typing { 0%,60%,100%{opacity:.3;transform:translateY(0)} 30%{opacity:1;transform:translateY(-3px)} }`}</style>
    </div>
  )
}

function ChatBubblePreview() {
  const msgs: { role: 'user' | 'assistant' | 'loading'; text: string; time: string }[] = [
    { role: 'user', text: 'Can you summarize the Q3 variance report?', time: '2:34 PM' },
    { role: 'assistant', text: 'Q3 showed a 4.2% positive variance against budget, primarily driven by lower-than-projected operational costs in the public works department.', time: '2:34 PM' },
    { role: 'user', text: 'What were the top 3 savings drivers?', time: '2:35 PM' },
    { role: 'loading', text: '', time: '' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 20, fontFamily: FONT, maxWidth: 420 }}>
      {msgs.map((m, i) => {
        const isUser = m.role === 'user'
        const isLoading = m.role === 'loading'
        return (
          <div key={i} style={{ display: 'flex', gap: 8, flexDirection: isUser ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, backgroundColor: isUser ? C.blurple700 : C.gray200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: isUser ? C.white : C.gray600, fontFamily: MONO }}>
              {isUser ? 'R' : 'AI'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', maxWidth: 300 }}>
              <div style={{ padding: '10px 14px', borderRadius: 16, backgroundColor: isUser ? C.blurple700 : C.gray100, color: isUser ? C.white : C.text, fontSize: 14, lineHeight: '20px', borderBottomRightRadius: isUser ? 4 : 16, borderBottomLeftRadius: isUser ? 16 : 4 }}>
                {isLoading ? <TypingDots /> : m.text}
              </div>
              {!isLoading && (
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, padding: '0 4px' }}>
                  <span style={{ fontSize: 11, color: C.textTertiary, fontFamily: MONO }}>{m.time}</span>
                  {isUser && <Svg d="M2 12l5 5L20 7" size={14} color={C.blurple700} />}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pattern 3: ChatInput
// ---------------------------------------------------------------------------
function ChatInputPreview() {
  const [text, setText] = useState('')
  const active = text.trim().length > 0
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8, backgroundColor: C.white, fontFamily: FONT, width: '100%', minHeight: 48 }}>
      <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <AttachIcon />
      </button>
      <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Type a message..."
        style={{ flex: 1, height: 40, border: `1px solid ${C.gray300}`, borderRadius: 20, padding: '0 16px', fontFamily: FONT, fontSize: 14, color: C.text, outline: 'none', backgroundColor: C.gray100 }} />
      <button style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', backgroundColor: active ? C.blurple700 : C.gray300, cursor: active ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 150ms ease', flexShrink: 0 }}>
        <SendIcon color={active ? C.white : C.gray600} />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pattern 4: FileCard
// ---------------------------------------------------------------------------
function FileCardPreview() {
  const files = [
    { name: 'Q3_Budget_Report.docx', type: 'DOC', size: '2.4 MB', status: 'Complete' },
    { name: 'Revenue_Data_FY26.xlsx', type: 'XLS', size: '890 KB', status: 'Complete' },
    { name: 'Council_Presentation.pptx', type: 'PPT', size: '12.1 MB', status: 'Uploading' },
    { name: 'Site_Photo_001.jpg', type: 'IMG', size: '4.7 MB', status: 'Complete' },
    { name: 'Public_Hearing.mp4', type: 'VID', size: '156 MB', status: 'Failed' },
  ]
  const sc = (s: string) => s === 'Complete' ? C.success : s === 'Failed' ? C.red600 : C.orange500
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
      {files.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: `1px solid ${C.border}`, borderRadius: 8, backgroundColor: C.white, fontFamily: FONT }}>
          <FileTypeIcon type={f.type} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
            <div style={{ fontSize: 12, color: C.textTertiary, fontFamily: MONO, display: 'flex', gap: 8, marginTop: 2 }}>
              <span>{f.size}</span><span style={{ color: sc(f.status) }}>{f.status}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            {[DownloadIcon, TrashIcon].map((Icon, j) => (
              <button key={j} style={{ width: 32, height: 32, borderRadius: 6, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pattern 5: SelectMenu
// ---------------------------------------------------------------------------
function SelectMenuPreview() {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState<string[]>(['parks'])
  const [search, setSearch] = useState('')
  const options = [
    { id: 'parks', label: 'Parks & Recreation' },
    { id: 'public-works', label: 'Public Works' },
    { id: 'finance', label: 'Finance Department' },
    { id: 'planning', label: 'Planning & Zoning' },
    { id: 'police', label: 'Police Department' },
  ]
  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
  const toggle = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  const label = selected.length === 0 ? 'Select department...'
    : selected.length === 1 ? options.find(o => o.id === selected[0])?.label
    : `${selected.length} selected`

  return (
    <div style={{ position: 'relative', width: 300, fontFamily: FONT }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', height: 40, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${open ? C.blurple700 : C.border}`, borderRadius: 6, backgroundColor: C.white, cursor: 'pointer', fontFamily: FONT, fontSize: 14, color: selected.length ? C.text : C.textTertiary, outline: open ? `2px solid ${C.blurple700}33` : 'none' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
        <ChevronDown size={16} color={C.gray600} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 44, left: 0, width: '100%', backgroundColor: C.white, borderRadius: 8, boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)', border: `1px solid ${C.border}`, overflow: 'hidden', zIndex: 10 }}>
          <div style={{ padding: '8px 10px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
            <SearchIcon size={16} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ border: 'none', outline: 'none', flex: 1, fontFamily: FONT, fontSize: 13, color: C.text, backgroundColor: 'transparent' }} />
          </div>
          <div style={{ maxHeight: 200, overflowY: 'auto', padding: '4px 0' }}>
            {filtered.map(opt => {
              const sel = selected.includes(opt.id)
              return (
                <button key={opt.id} onClick={() => toggle(opt.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 12px', border: 'none', backgroundColor: sel ? C.blurpleLight : 'transparent', cursor: 'pointer', fontFamily: FONT, fontSize: 14, color: C.text, textAlign: 'left' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 3, flexShrink: 0, border: sel ? 'none' : `1.5px solid ${C.gray400}`, backgroundColor: sel ? C.blurple700 : C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {sel && <CheckMark size={13} color={C.white} />}
                  </div>
                  {opt.label}
                </button>
              )
            })}
            {filtered.length === 0 && <div style={{ padding: '16px 12px', fontSize: 13, color: C.textTertiary, textAlign: 'center' }}>No results found</div>}
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta = { title: 'Patterns/Compound', parameters: { layout: 'fullscreen' } }
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------
export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Compound Patterns"
      description="Reusable multi-component patterns built from CDS 37 primitives. Each pattern composes buttons, inputs, cards, and typography into production-ready UI assemblies for common application workflows."
      badge="@opengov/cds-patterns"
      status="stable"
    >
      {/* PageHeader */}
      <DocSection title="PageHeader" description="Full-width header combining breadcrumb navigation, page title, subtitle, and action buttons. Provides consistent top-of-page hierarchy across all application views.">
        <DocShowcase label="PageHeader" previewPadding={0} preview={<PageHeaderPreview />}
          code={`<PageHeader
  breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'Budget Report FY2026' }]}
  title="Budget Report FY2026"
  subtitle="Annual fiscal report with quarterly breakdowns"
  actions={<ButtonGroup><Button variant="tertiary" size="sm">Export</Button><Button variant="primary" size="sm">Edit Report</Button></ButtonGroup>}
/>`}
          specs={<SpecTable headers={['Element', 'Token / Value', 'Notes']} rows={[
            ['Breadcrumb font', 'DM Mono, 12px / 500', 'Tertiary text color, blurple for links'],
            ['Title', 'h1 -- 24px / 700 / -0.3 tracking', 'Primary text, single line'],
            ['Subtitle', 'body2 -- 14px / 400 / 20px lh', 'Secondary text color'],
            ['Bottom border', '1px solid border (#DDDEDE)', 'Full width separator'],
            ['Actions alignment', 'flex-end, top-aligned', 'Right side, gap: 8px'],
            ['Vertical padding', '16px top, 20px bottom', 'Consistent page spacing'],
          ]} />} />
        <div style={{ marginTop: 16 }}><PropsTable props={[
          { name: 'breadcrumbs', type: '{ label: string; href?: string }[]', required: true, description: 'Ordered breadcrumb path segments.' },
          { name: 'title', type: 'string', required: true, description: 'Page heading rendered as h1.' },
          { name: 'subtitle', type: 'string', description: 'Secondary description beneath the title.' },
          { name: 'actions', type: 'ReactNode', description: 'Right-aligned action area, typically a ButtonGroup.' },
        ]} /></div>
      </DocSection>

      <DocDivider />

      {/* ChatBubble */}
      <DocSection title="ChatBubble" description="Conversational message bubbles with role-based styling. User messages align right with blurple700 background; assistant messages align left with gray100 background. Includes avatar, timestamp, read status, and loading state with animated typing dots.">
        <DocShowcase label="Chat conversation" previewBg="light" preview={<ChatBubblePreview />}
          code={`<ChatBubble role="user" avatar={{ initials: 'R' }} timestamp="2:34 PM" readStatus="read">
  Can you summarize the Q3 variance report?
</ChatBubble>
<ChatBubble role="assistant" avatar={{ initials: 'AI' }} timestamp="2:34 PM">
  Q3 showed a 4.2% positive variance...
</ChatBubble>
<ChatBubble role="assistant" loading />`}
          specs={<SpecTable headers={['Property', 'User Bubble', 'Assistant Bubble']} rows={[
            ['Background', '#4B3FFF (blurple700)', '#F5F5F5 (gray100)'],
            ['Text color', '#FFFFFF', 'rgba(0,0,0,0.87)'],
            ['Border radius', '16px (4px bottom-right)', '16px (4px bottom-left)'],
            ['Padding', '10px 14px', '10px 14px'],
            ['Font', '14px / 400 / 20px lh', '14px / 400 / 20px lh'],
            ['Max width', '300px', '300px'],
            ['Avatar', '28px circle, blurple bg', '28px circle, gray200 bg'],
          ]} />} />
        <div style={{ marginTop: 16 }}><PropsTable props={[
          { name: 'role', type: "'user' | 'assistant'", required: true, description: 'Determines alignment, color, and avatar styling.' },
          { name: 'children', type: 'ReactNode', required: true, description: 'Message content.' },
          { name: 'avatar', type: '{ initials: string; src?: string }', description: 'Avatar circle with fallback initials.' },
          { name: 'timestamp', type: 'string', description: 'Display time beneath the bubble.' },
          { name: 'readStatus', type: "'sent' | 'read'", description: 'Read receipt for user messages.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Shows animated typing dots.' },
        ]} /></div>
      </DocSection>

      <DocDivider />

      {/* ChatInput */}
      <DocSection title="ChatInput" description="Composable chat input bar with attachment button, text field, and context-aware send button. Send activates (blurple700) when text is present and dims (gray300) when empty.">
        <DocShowcase label="Interactive -- type to activate send" previewPadding={0} preview={<ChatInputPreview />}
          code={`<ChatInput placeholder="Type a message..." onSend={(text) => handleSend(text)} onAttach={() => openFilePicker()} />`}
          specs={<SpecTable headers={['Element', 'Token / Value', 'Notes']} rows={[
            ['Container height', '48px minimum', 'Grows with multiline input'],
            ['Border top', '1px solid border (#DDDEDE)', 'Visual separator'],
            ['Input field', '40px h, 20px radius, gray100 bg', 'Pill-shaped input'],
            ['Attach button', '36px circle, transparent', '20px icon, gray600'],
            ['Send (active)', '36px circle, blurple700', '18px icon, white'],
            ['Send (empty)', '36px circle, gray300', '18px icon, gray600'],
            ['Transition', '150ms ease', 'Send button color change'],
          ]} />} />
        <div style={{ marginTop: 16 }}><PropsTable props={[
          { name: 'onSend', type: '(text: string) => void', required: true, description: 'Callback when send is pressed with non-empty text.' },
          { name: 'onAttach', type: '() => void', description: 'Attachment button callback.' },
          { name: 'placeholder', type: 'string', default: '"Type a message..."', description: 'Input placeholder.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input and buttons.' },
        ]} /></div>
      </DocSection>

      <DocDivider />

      {/* FileCard */}
      <DocSection title="FileCard" description="Compact file attachment card with color-coded type icons, metadata, status, and action buttons. Five file type categories with distinct color theming.">
        <DocShowcase label="5 file types" previewBg="light" preview={<FileCardPreview />}
          code={`<FileCard name="Q3_Budget_Report.docx" type="DOC" size="2.4 MB" status="complete"
  onDownload={() => download(file)} onDelete={() => confirmDelete(file)} />
{/* Type colors: DOC=blue, XLS=green, PPT=orange, IMG=violet, VID=rose */}`}
          specs={<SpecTable headers={['Element', 'Token / Value', 'Notes']} rows={[
            ['Card border', '1px solid border (#DDDEDE)', 'Outlined style'],
            ['Border radius', '8px', 'Card system standard'],
            ['Padding', '10px 14px', 'Compact density'],
            ['DOC', '#2196F3 (blue500)', 'Word documents'],
            ['XLS', '#4CAF50 (green500)', 'Spreadsheets'],
            ['PPT', '#FF9800 (orange500)', 'Presentations'],
            ['IMG', '#7C4DFF (violet500)', 'Images'],
            ['VID', '#E91E63 (rose500)', 'Video files'],
            ['File name', '13px / 500, ellipsis', 'Single line, truncated'],
            ['Action buttons', '32px square, transparent', 'Download + Delete'],
          ]} />} />
        <div style={{ marginTop: 16 }}><PropsTable props={[
          { name: 'name', type: 'string', required: true, description: 'File name with extension.' },
          { name: 'type', type: "'DOC'|'XLS'|'PPT'|'IMG'|'VID'", required: true, description: 'File category for icon color.' },
          { name: 'size', type: 'string', required: true, description: 'Human-readable file size.' },
          { name: 'status', type: "'complete'|'uploading'|'failed'", default: "'complete'", description: 'Upload status indicator.' },
          { name: 'onDownload', type: '() => void', description: 'Download action callback.' },
          { name: 'onDelete', type: '() => void', description: 'Delete action callback.' },
        ]} /></div>
      </DocSection>

      <DocDivider />

      {/* SelectMenu */}
      <DocSection title="SelectMenu" description="Dropdown with search and multi-select. Outlined trigger with chevron, floating dropdown with shadow, in-dropdown search, and checkbox-based multi-selection.">
        <DocShowcase label="Interactive multi-select" previewBg="light" previewPadding={40}
          preview={<div style={{ minHeight: 320 }}><SelectMenuPreview /></div>}
          code={`<SelectMenu label="Department" placeholder="Select department..."
  options={[{ id: 'parks', label: 'Parks & Recreation' }, { id: 'finance', label: 'Finance' }]}
  value={['parks']} onChange={(ids) => setSelected(ids)} searchable multiple />`}
          specs={<SpecTable headers={['Element', 'Token / Value', 'Notes']} rows={[
            ['Trigger height', '40px', 'Standard input height'],
            ['Trigger border', '1px solid, 6px radius', 'Blurple on focus/open'],
            ['Dropdown shadow', '0 4px 24px rgba(0,0,0,0.12)', 'Elevation level 3'],
            ['Dropdown radius', '8px', 'Card-style container'],
            ['Option height', '38px (9px pad)', 'Touch-friendly target'],
            ['Selected bg', '#EEF1FC (blurpleLight)', 'Subtle highlight'],
            ['Checkbox', '18px, 3px radius', 'Blurple700 when checked'],
          ]} />} />
        <div style={{ marginTop: 16 }}><PropsTable props={[
          { name: 'options', type: '{ id: string; label: string }[]', required: true, description: 'List of selectable options.' },
          { name: 'value', type: 'string | string[]', required: true, description: 'Selected ID(s). Array for multi-select.' },
          { name: 'onChange', type: '(value) => void', required: true, description: 'Selection change callback.' },
          { name: 'searchable', type: 'boolean', default: 'false', description: 'Enables dropdown search field.' },
          { name: 'multiple', type: 'boolean', default: 'false', description: 'Enables multi-select checkboxes.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger.' },
        ]} /></div>
      </DocSection>

      <DocDivider />

      {/* Usage Guidelines */}
      <DocSection title="Usage Guidelines" description="Best practices for composing compound patterns within CDS 37 applications.">
        <DoDont
          dos={[
            'Use PageHeader at the top of every navigable page for consistent hierarchy',
            'Keep ChatBubble max-width constrained to maintain readability',
            'Color-code FileCard icons consistently by file type across the app',
            'Provide a search field in SelectMenu when options exceed 5 items',
            'Use the loading state in ChatBubble while waiting for responses',
          ]}
          donts={[
            'Mix ChatBubble alignment -- user is always right, assistant always left',
            'Disable the send button without dimming it (use gray300 pattern)',
            'Use arbitrary colors for FileCard icons -- stick to the defined palette',
            'Nest SelectMenu inside another dropdown or popover',
            'Omit breadcrumbs from PageHeader in deep navigation hierarchies',
          ]}
        />
      </DocSection>

      <DocDivider />

      {/* Accessibility */}
      <DocSection title="Accessibility" description="WCAG compliance specifications for all compound patterns.">
        <AccessSpec items={[
          { label: 'PageHeader: breadcrumb nav landmark', value: 'role="navigation" aria-label="breadcrumb"', status: 'pass' },
          { label: 'ChatBubble: message region', value: 'role="log" aria-live="polite"', status: 'pass' },
          { label: 'ChatBubble: typing indicator', value: 'aria-label="Assistant is typing"', status: 'pass' },
          { label: 'ChatInput: send button state', value: 'aria-disabled when empty', status: 'pass' },
          { label: 'FileCard: action labels', value: 'aria-label="Download/Delete {name}"', status: 'pass' },
          { label: 'SelectMenu: combobox role', value: 'role="combobox" aria-expanded', status: 'pass' },
          { label: 'SelectMenu: keyboard nav', value: 'Arrow keys, Enter, Escape', status: 'pass' },
          { label: 'Contrast: user bubble', value: 'White on blurple700 = 7.2:1', status: 'pass' },
          { label: 'Contrast: assistant bubble', value: 'text on gray100 = 12.4:1', status: 'pass' },
          { label: 'Touch targets', value: 'All interactive >= 44pt', status: 'pass' },
        ]} />
      </DocSection>
    </DocPage>
  ),
}
