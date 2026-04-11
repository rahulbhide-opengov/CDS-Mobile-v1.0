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
  blurple: '#4B3FFF', blurpleDk: '#19009B', blurpleLt: '#EEF1FC', white: '#FFFFFF',
  g100: '#F2F2F2', g200: '#DDDEDE', g300: '#C8C9CA', g400: '#9E9E9E', g700: '#546574',
  dark: 'rgba(21,21,21,0.9)', backdrop: 'rgba(0,0,0,0.5)', snack: '#323232',
  green: '#037730', red: '#D33423', yellow: '#885604', cerulean: '#0E6F7F',
  t87: 'rgba(0,0,0,0.87)', t60: 'rgba(0,0,0,0.6)',
} as const

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------
const Ico = {
  info: (c: string, s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={c} strokeWidth="2" />
    <path d="M12 16v-4M12 8h.01" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
  box: (c: string, s = 48) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  plus: (c: string, s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2" strokeLinecap="round" /></svg>,
}
const SPIN = `@keyframes cds-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`

// Section label helper
const SL = ({ children }: { children: string }) => (
  <div style={{ fontSize: 12, fontFamily: M, fontWeight: 500, color: C.t60,
    marginBottom: 12, textTransform: 'uppercase' as const, letterSpacing: 0.6 }}>{children}</div>
)

// ---------------------------------------------------------------------------
// Dialog
// ---------------------------------------------------------------------------
function CdsDialog({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ position: 'relative', width: 340, height: 220, backgroundColor: C.backdrop,
      borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: C.white, borderRadius: 8, padding: 24, width: 280,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, fontFamily: F, color: C.t87 }}>{title}</h3>
        <p style={{ margin: '0 0 20px', fontSize: 14, fontFamily: F, color: C.t60, lineHeight: '20px' }}>{desc}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          {['Cancel', 'Confirm'].map((l, i) => (
            <button key={l} style={{ height: 36, padding: '0 16px', border: 'none', borderRadius: 4,
              backgroundColor: i ? C.blurple : 'transparent', color: i ? C.white : C.blurple,
              fontFamily: F, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Snackbar
// ---------------------------------------------------------------------------
type SV = 'default' | 'success' | 'error' | 'warning' | 'info'
const SB: Record<SV, string> = {
  default: C.snack, success: C.green, error: C.red, warning: C.yellow, info: C.cerulean,
}
function CdsSnackbar({ msg, v = 'default', action }: { msg: string; v?: SV; action?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: SB[v],
      borderRadius: 4, padding: '10px 16px', minWidth: 288, maxWidth: 400 }}>
      <span style={{ flex: 1, fontSize: 14, fontFamily: F, color: C.white, lineHeight: '20px' }}>{msg}</span>
      {action && <button style={{ border: 'none', background: 'none', padding: 0,
        color: v === 'default' ? '#A5D6FF' : 'rgba(255,255,255,0.9)',
        fontFamily: F, fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>{action}</button>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------
type TP = 'top' | 'bottom' | 'left' | 'right'
function CdsTooltip({ label, pos = 'top' }: { label: string; pos?: TP }) {
  const a = 5
  const p: Record<TP, React.CSSProperties> = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: a + 2 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: a + 2 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: a + 2 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: a + 2 },
  }
  const ar: Record<TP, React.CSSProperties> = {
    top: { bottom: -a, left: '50%', transform: 'translateX(-50%)', borderLeft: `${a}px solid transparent`,
      borderRight: `${a}px solid transparent`, borderTop: `${a}px solid ${C.dark}` },
    bottom: { top: -a, left: '50%', transform: 'translateX(-50%)', borderLeft: `${a}px solid transparent`,
      borderRight: `${a}px solid transparent`, borderBottom: `${a}px solid ${C.dark}` },
    left: { right: -a, top: '50%', transform: 'translateY(-50%)', borderTop: `${a}px solid transparent`,
      borderBottom: `${a}px solid transparent`, borderLeft: `${a}px solid ${C.dark}` },
    right: { left: -a, top: '50%', transform: 'translateY(-50%)', borderTop: `${a}px solid transparent`,
      borderBottom: `${a}px solid transparent`, borderRight: `${a}px solid ${C.dark}` },
  }
  return (
    <div style={{ position: 'relative', display: 'inline-block', padding: 30 }}>
      <div style={{ width: 36, height: 36, borderRadius: 4, backgroundColor: C.blurpleLt,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {Ico.info(C.blurple, 18)}
      </div>
      <div style={{ position: 'absolute', ...p[pos], backgroundColor: C.dark, borderRadius: 4,
        padding: '6px 10px', whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 12, fontFamily: F, color: C.white, fontWeight: 500 }}>{label}</span>
        <div style={{ position: 'absolute', width: 0, height: 0, ...ar[pos] }} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------
function CdsEmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      padding: 32, maxWidth: 320 }}>
      {Ico.box(C.g400, 48)}
      <h3 style={{ margin: '16px 0 8px', fontSize: 18, fontWeight: 600, fontFamily: F, color: C.t87 }}>
        No records found</h3>
      <p style={{ margin: '0 0 20px', fontSize: 14, fontFamily: F, color: C.t60, lineHeight: '20px' }}>
        There are no items matching your criteria. Create a new record to get started.</p>
      <button style={{ height: 44, padding: '0 24px', border: 'none', borderRadius: 4,
        backgroundColor: C.blurple, color: C.white, fontFamily: F, fontSize: 14, fontWeight: 500,
        cursor: 'pointer' }}>Create Record</button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CircularProgress
// ---------------------------------------------------------------------------
type PC = 'primary' | 'success' | 'error'
const PCC: Record<PC, string> = { primary: C.blurple, success: C.green, error: C.red }
function CdsCircular({ value, size = 'md', color = 'primary', spin }: {
  value?: number; size?: 'sm' | 'md' | 'lg'; color?: PC; spin?: boolean
}) {
  const px = { sm: 24, md: 40, lg: 56 }[size]
  const sw = size === 'sm' ? 3 : size === 'md' ? 3.5 : 4
  const r = px / 2 - sw, circ = 2 * Math.PI * r
  const off = spin ? circ * 0.75 : circ * (1 - (value ?? 0) / 100)
  return (
    <div style={{ position: 'relative', width: px, height: px, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center' }}>
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`}
        style={{ transform: 'rotate(-90deg)', ...(spin ? { animation: 'cds-spin 0.8s linear infinite' } : {}) }}>
        <style>{SPIN}</style>
        <circle cx={px / 2} cy={px / 2} r={r} stroke={C.g200} strokeWidth={sw} fill="none" />
        <circle cx={px / 2} cy={px / 2} r={r} stroke={PCC[color]} strokeWidth={sw} fill="none"
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: spin ? 'none' : 'stroke-dashoffset 300ms ease' }} />
      </svg>
      {!spin && value !== undefined && size !== 'sm' && (
        <span style={{ position: 'absolute', fontSize: size === 'lg' ? 13 : 10,
          fontFamily: M, fontWeight: 600, color: C.t87 }}>{value}%</span>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// LinearProgress
// ---------------------------------------------------------------------------
function CdsLinear({ value, spin, color = 'primary' }: { value?: number; spin?: boolean; color?: PC }) {
  const fill = PCC[color]
  return (
    <div style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: C.g200,
      overflow: 'hidden', position: 'relative' }}>
      {spin ? (<>
        <style>{`@keyframes cds-lp{0%{left:-40%;width:40%}50%{left:20%;width:50%}100%{left:100%;width:40%}}`}</style>
        <div style={{ position: 'absolute', top: 0, height: '100%', borderRadius: 2,
          backgroundColor: fill, animation: 'cds-lp 1.4s ease-in-out infinite' }} />
      </>) : (
        <div style={{ width: `${Math.min(100, value ?? 0)}%`, height: '100%', borderRadius: 2,
          backgroundColor: fill, transition: 'width 300ms ease' }} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SkeletonLoader
// ---------------------------------------------------------------------------
function CdsSkeleton({ variant = 'text', w, h, lines = 3 }: {
  variant?: 'text' | 'circular' | 'rectangular'; w?: number; h?: number; lines?: number
}) {
  const sh: React.CSSProperties = { backgroundColor: C.g300,
    backgroundImage: `linear-gradient(90deg,${C.g300} 0%,${C.g100} 50%,${C.g300} 100%)`,
    backgroundSize: '200% 100%', animation: 'cds-sh 1.5s ease-in-out infinite' }
  return (<div>
    <style>{`@keyframes cds-sh{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
    {variant === 'text' && Array.from({ length: lines }).map((_, i) => (
      <div key={i} style={{ ...sh, height: 14, borderRadius: 4,
        width: i === lines - 1 ? '60%' : '100%', marginBottom: i < lines - 1 ? 10 : 0 }} />
    ))}
    {variant === 'circular' && <div style={{ ...sh, width: w ?? 48, height: h ?? 48, borderRadius: 9999 }} />}
    {variant === 'rectangular' && <div style={{ ...sh, width: w ?? '100%', height: h ?? 120, borderRadius: 8 }} />}
  </div>)
}

// ---------------------------------------------------------------------------
// FAB
// ---------------------------------------------------------------------------
function CdsFab({ size = 'md', ext, label, disabled }: {
  size?: 'sm' | 'md' | 'lg'; ext?: boolean; label?: string; disabled?: boolean
}) {
  const [hov, setHov] = useState(false)
  const px = { sm: 36, md: 44, lg: 48 }[size]
  const bg = disabled ? C.g300 : hov ? C.blurpleDk : C.blurple
  return (
    <button disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: ext ? 8 : 0, height: px, minWidth: px, width: ext ? undefined : px,
        padding: ext ? `0 ${px === 36 ? 12 : 16}px` : 0,
        backgroundColor: bg, color: C.white, border: 'none',
        borderRadius: ext ? px / 2 : 9999, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.38 : 1, fontFamily: F, fontSize: 14, fontWeight: 600,
        boxShadow: '0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px rgba(0,0,0,0.14),0 1px 18px rgba(0,0,0,0.12)',
        transition: 'all 120ms ease' }}>
      {Ico.plus(C.white, size === 'sm' ? 16 : 20)}
      {ext && label && <span>{label}</span>}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
const meta: Meta = { title: 'Components/Feedback', parameters: { layout: 'fullscreen' } }
export default meta

// ---------------------------------------------------------------------------
// Overview Story
// ---------------------------------------------------------------------------
export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Feedback"
      description="Feedback components communicate status, progress, and contextual information. CDS 37 provides dialogs, snackbars, tooltips, progress indicators, skeleton loaders, empty states, and FABs."
      badge="@opengov/cds-components"
      status="stable"
    >
      {/* ----- Dialog ----- */}
      <DocSection title="Dialog" description="Modal overlay that interrupts user flow for decisions. Uses a 50% black backdrop with a white card surface.">
        <DocShowcase label="Confirm dialog" preview={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CdsDialog title="Discard changes?" desc="You have unsaved edits. Discarding will permanently remove your changes." />
          </div>
        } code={`<Dialog open={showDialog} onClose={() => setShowDialog(false)}>
  <Dialog.Title>Discard changes?</Dialog.Title>
  <Dialog.Description>You have unsaved edits.</Dialog.Description>
  <Dialog.Actions>
    <Button variant="secondaryAlt" onPress={onCancel}>Cancel</Button>
    <Button variant="primary" onPress={onConfirm}>Confirm</Button>
  </Dialog.Actions>
</Dialog>`} specs={<SpecTable headers={['Property', 'Value', 'Token']} rows={[
          ['Backdrop', 'rgba(0,0,0,0.50)', 'overlay.backdrop'],
          ['Card radius', '8px', 'radius.md'],
          ['Card padding', '24px', 'spacing.600'],
          ['Title', '18px / SemiBold (600)', 'text.h3'],
          ['Description', '14px / Regular (400)', 'text.body2'],
          ['Action gap', '8px', 'spacing.200'],
          ['Shadow', '0 8px 32px rgba(0,0,0,0.18)', 'elevation.modal'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Snackbar ----- */}
      <DocSection title="Snackbar" description="Bottom-anchored transient notification. Auto-dismisses after configurable duration. Five semantic variants.">
        <DocShowcase label="5 variants" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <CdsSnackbar msg="File has been saved" />
            <CdsSnackbar msg="Record created successfully" v="success" />
            <CdsSnackbar msg="Failed to upload attachment" v="error" action="Retry" />
            <CdsSnackbar msg="Your session will expire soon" v="warning" action="Extend" />
            <CdsSnackbar msg="New version available" v="info" action="Update" />
          </div>
        } code={`<Snackbar message="File has been saved" />
<Snackbar message="Record created" variant="success" />
<Snackbar message="Upload failed" variant="error"
  action={{ label: 'Retry', onPress: handleRetry }} />
<Snackbar message="Session expiring" variant="warning"
  action={{ label: 'Extend', onPress: handleExtend }} duration={8000} />`} specs={<SpecTable
          headers={['Variant', 'Background', 'Text', 'Use Case']}
          rows={[
            ['default', '#323232 (dark gray)', '#FFFFFF', 'Neutral confirmations'],
            ['success', '#037730 (green700)', '#FFFFFF', 'Successful operations'],
            ['error', '#D33423 (red600)', '#FFFFFF', 'Failures, validation errors'],
            ['warning', '#885604 (yellow700)', '#FFFFFF', 'Caution, expiring states'],
            ['info', '#0E6F7F (cerulean700)', '#FFFFFF', 'Informational updates'],
          ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Tooltip ----- */}
      <DocSection title="Tooltip" description="Contextual hint on long-press (mobile) or hover (web). Dark background with arrow pointer in four positions.">
        <DocShowcase label="4 positions" preview={
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', padding: '16px 0' }}>
            <CdsTooltip label="Top tooltip" pos="top" />
            <CdsTooltip label="Bottom tooltip" pos="bottom" />
            <CdsTooltip label="Left tooltip" pos="left" />
            <CdsTooltip label="Right tooltip" pos="right" />
          </div>
        } code={`<Tooltip content="Helpful hint" position="top">
  <IconButton icon={<InfoIcon />} />
</Tooltip>
<Tooltip content="More details" position="bottom">
  <Text>Hover me</Text>
</Tooltip>`} specs={<SpecTable headers={['Property', 'Value', 'Token']} rows={[
          ['Background', 'rgba(21,21,21,0.9)', 'color.tooltip.bg'],
          ['Text', '#FFFFFF / 12px Medium', 'text.caption'],
          ['Border radius', '4px', 'radius.xs'],
          ['Padding', '6px 10px', 'spacing.150 / spacing.250'],
          ['Arrow size', '5px', 'tooltip.arrow'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- EmptyState ----- */}
      <DocSection title="Empty State" description="Zero-data placeholder with icon, title, description, and optional action to guide users.">
        <DocShowcase label="With action" preview={
          <div style={{ display: 'flex', justifyContent: 'center' }}><CdsEmptyState /></div>
        } code={`<EmptyState
  icon={<BoxIcon size={48} color={colors.gray400} />}
  title="No records found"
  description="Create a new record to get started."
  action={{ label: 'Create Record', onPress: handleCreate }}
/>`} specs={<SpecTable headers={['Element', 'Spec', 'Token']} rows={[
          ['Icon', '48px, gray400', 'icon.xl / color.textDisabled'],
          ['Title', '18px / SemiBold (600)', 'text.h3'],
          ['Description', '14px / Regular, text60', 'text.body2'],
          ['Icon-title gap', '16px', 'spacing.400'],
          ['Desc-action gap', '20px', 'spacing.500'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- CircularProgress ----- */}
      <DocSection title="Circular Progress" description="Ring-shaped indicator in determinate (with value) or indeterminate (spinning) modes. Three sizes and semantic colors.">
        <DocShowcase label="Sizes and modes" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <SL>Determinate</SL>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <CdsCircular value={25} size="sm" />
                <CdsCircular value={50} size="md" />
                <CdsCircular value={75} size="lg" />
                <CdsCircular value={60} size="lg" color="success" />
                <CdsCircular value={30} size="lg" color="error" />
              </div>
            </div>
            <div>
              <SL>Indeterminate</SL>
              <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                <CdsCircular spin size="sm" />
                <CdsCircular spin size="md" />
                <CdsCircular spin size="lg" />
              </div>
            </div>
          </div>
        } code={`<CircularProgress value={75} size="lg" />
<CircularProgress indeterminate size="md" />
<CircularProgress value={100} color="success" />`} specs={<SpecTable
          headers={['Size', 'Diameter', 'Stroke', 'Label Font']}
          rows={[
            ['sm', '24px', '3px', 'No label'],
            ['md', '40px', '3.5px', '10px DM Mono 600'],
            ['lg', '56px', '4px', '13px DM Mono 600'],
          ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- LinearProgress ----- */}
      <DocSection title="Linear Progress" description="Horizontal bar indicator. Determinate fills proportionally; indeterminate shows an animated sliding bar.">
        <DocShowcase label="Modes and colors" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
            {([['Determinate (65%)', 65, false, 'primary'],
              ['Success (100%)', 100, false, 'success'],
              ['Error (40%)', 40, false, 'error'],
              ['Indeterminate', 0, true, 'primary']] as const).map(([lbl, val, sp, col]) => (
              <div key={lbl}>
                <div style={{ fontSize: 12, fontFamily: M, fontWeight: 500, color: C.t60, marginBottom: 8 }}>{lbl}</div>
                <CdsLinear value={val} spin={sp} color={col} />
              </div>
            ))}
          </div>
        } code={`<LinearProgress value={65} />
<LinearProgress value={100} color="success" />
<LinearProgress indeterminate />`} specs={<SpecTable headers={['Property', 'Value', 'Token']} rows={[
          ['Height', '4px', 'progress.bar.height'],
          ['Border radius', '2px', 'radius.xxs'],
          ['Track', '#DDDEDE (gray200)', 'color.surfaceDisabled'],
          ['Fill (primary)', '#4B3FFF (blurple700)', 'color.primary'],
          ['Animation', '1.4s ease-in-out', 'motion.progress'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- SkeletonLoader ----- */}
      <DocSection title="Skeleton Loader" description="Shimmer placeholders displayed while content loads. Mirrors incoming layout to improve perceived performance.">
        <DocShowcase label="3 variants" preview={
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 200 }}>
              <SL>Text</SL><CdsSkeleton variant="text" lines={3} />
            </div>
            <div>
              <SL>Circular</SL>
              <div style={{ display: 'flex', gap: 12 }}>
                <CdsSkeleton variant="circular" w={32} h={32} />
                <CdsSkeleton variant="circular" w={48} h={48} />
              </div>
            </div>
            <div>
              <SL>Rectangular</SL>
              <CdsSkeleton variant="rectangular" w={160} h={96} />
            </div>
          </div>
        } code={`<Skeleton variant="text" lines={3} />
<Skeleton variant="circular" size={48} />
<Skeleton variant="rectangular" width={160} height={96} />`} specs={<SpecTable
          headers={['Property', 'Value', 'Token']} rows={[
          ['Base color', '#C8C9CA (gray300)', 'color.skeleton.base'],
          ['Highlight', '#F2F2F2 (gray100)', 'color.skeleton.highlight'],
          ['Animation', '1.5s ease-in-out infinite', 'motion.shimmer'],
          ['Text height', '14px, gap 10px', 'skeleton.text'],
          ['Last line width', '60%', 'skeleton.text.lastLineRatio'],
        ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- FAB ----- */}
      <DocSection title="FAB (Floating Action Button)" description="Prominent circular button for the primary screen action. Elevated with shadow. Extended variant adds a text label.">
        <DocShowcase label="Sizes and extended" preview={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <SL>Standard sizes</SL>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <CdsFab size="sm" /><CdsFab size="md" /><CdsFab size="lg" /><CdsFab size="md" disabled />
              </div>
            </div>
            <div>
              <SL>Extended with label</SL>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <CdsFab size="md" ext label="Create" />
                <CdsFab size="lg" ext label="New Record" />
              </div>
            </div>
          </div>
        } code={`<Fab size="md" icon={<PlusIcon />} onPress={onCreate} />
<Fab extended label="Create" onPress={onCreate} />
<Fab size="lg" extended label="New Record"
  position={{ bottom: 16, right: 16 }} />`} specs={<SpecTable
          headers={['Size', 'Diameter', 'Icon', 'Touch Target', 'WCAG 2.5.8']}
          rows={[
            ['sm', '36px', '16px', '44pt via hitSlop', 'Pass (padded)'],
            ['md', '44px', '20px', '44pt native', 'Pass'],
            ['lg', '48px', '20px', '48pt native', 'Pass (exceeds)'],
          ]} />} />
      </DocSection>

      <DocDivider />

      {/* ----- Usage Guidelines ----- */}
      <DocSection title="Usage Guidelines">
        <DoDont
          dos={[
            'Use Dialog for critical decisions requiring explicit confirmation',
            'Keep Snackbar messages concise (one line when possible)',
            'Use indeterminate progress when duration is unknown',
            'Combine Skeleton variants to mirror actual content layout',
            'Limit one FAB per screen for the most promoted action',
          ]}
          donts={[
            'Stack multiple Dialogs -- resolve one before showing another',
            'Use Snackbar for errors requiring user action (use Dialog)',
            'Show Tooltip on self-explanatory elements',
            'Use circular progress at sm size with percentage labels',
            'Place FAB where it obscures critical content or navigation',
          ]}
        />
      </DocSection>

      <DocDivider />

      {/* ----- Accessibility ----- */}
      <DocSection title="Accessibility">
        <AccessSpec items={[
          { label: 'Dialog: role="dialog" with aria-modal', value: 'Required', status: 'pass' },
          { label: 'Dialog: focus trap within modal', value: 'Required', status: 'pass' },
          { label: 'Snackbar: role="status" live region', value: 'aria-live="polite"', status: 'pass' },
          { label: 'Tooltip: accessible via long-press (mobile)', value: 'Required', status: 'pass' },
          { label: 'Progress: role="progressbar" + aria-valuenow', value: 'Required', status: 'pass' },
          { label: 'Skeleton: aria-busy="true" on container', value: 'Required', status: 'pass' },
          { label: 'FAB: sm touch target with hitSlop', value: '44pt minimum', status: 'pass' },
          { label: 'All interactive: min 44pt touch target', value: 'WCAG 2.5.8', status: 'pass' },
        ]} />
      </DocSection>
    </DocPage>
  ),
}
