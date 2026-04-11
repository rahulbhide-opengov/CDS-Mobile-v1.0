import React, { useState, useEffect, createContext, useContext } from 'react'

// ---------------------------------------------------------------------------
// CDS 37 design tokens used in doc layout (inline to avoid RN dep)
// ---------------------------------------------------------------------------
const T = {
  // Colors
  bg: '#FFFFFF',
  bgSecondary: '#F8F8F8',
  bgTertiary: '#F2F2F2',
  bgCode: '#1E1E2E',     // Catppuccin-style dark code bg
  border: '#DDDEDE',
  borderStrong: '#C8C9CA',
  text: 'rgba(0,0,0,0.87)',
  textSecondary: 'rgba(0,0,0,0.6)',
  textTertiary: 'rgba(0,0,0,0.38)',
  brand: '#4B3FFF',
  brandLight: '#EEF1FC',
  brandDark: '#19009B',
  error: '#D33423',
  success: '#037730',
  warning: '#885604',
  white: '#FFFFFF',
  codeText: '#CDD6F4',   // Catppuccin text
  codeKeyword: '#CBA6F7', // purple
  codeString: '#A6E3A1',  // green
  codeComment: '#6C7086',  // overlay
  // Font
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  mono: "'DM Mono', 'SF Mono', Menlo, monospace",
  // Radius
  radius: 8,
  radiusSm: 4,
}

// ---------------------------------------------------------------------------
// Google Fonts loader
// ---------------------------------------------------------------------------
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap'

export function FontLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.querySelector(`link[href="${FONTS_URL}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_URL
    document.head.appendChild(link)
  }, [])
  return <>{children}</>
}

// ---------------------------------------------------------------------------
// Page Shell — wraps a full docs page
// ---------------------------------------------------------------------------
export function DocPage({ title, description, badge, children }: {
  title: string
  description: string
  badge?: string
  children: React.ReactNode
}) {
  return (
    <FontLoader>
      <div style={{ fontFamily: T.font, color: T.text, maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, paddingBottom: 20, borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: -0.4 }}>{title}</h1>
            {badge && (
              <span style={{
                fontSize: 11, fontWeight: 600, fontFamily: T.mono,
                padding: '2px 8px', borderRadius: 4,
                backgroundColor: T.brandLight, color: T.brand,
              }}>
                {badge}
              </span>
            )}
          </div>
          <p style={{ fontSize: 15, lineHeight: '22px', color: T.textSecondary, margin: 0, maxWidth: 640 }}>
            {description}
          </p>
        </div>
        {children}
      </div>
    </FontLoader>
  )
}

// ---------------------------------------------------------------------------
// Section — groups related content with a heading
// ---------------------------------------------------------------------------
export function DocSection({ title, description, children }: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px 0', letterSpacing: -0.2 }}>{title}</h2>
      {description && (
        <p style={{ fontSize: 13, color: T.textSecondary, margin: '0 0 16px 0', lineHeight: '18px' }}>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Preview + Code tabbed card
// ---------------------------------------------------------------------------
type TabKey = 'preview' | 'code' | 'specs'

export function DocShowcase({ preview, code, specs, previewBg }: {
  preview: React.ReactNode
  code?: string
  specs?: React.ReactNode
  previewBg?: 'light' | 'dark' | 'checkerboard'
}) {
  const [tab, setTab] = useState<TabKey>('preview')

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'preview', label: 'Preview' },
    ...(code ? [{ key: 'code' as TabKey, label: 'Code' }] : []),
    ...(specs ? [{ key: 'specs' as TabKey, label: 'Specs' }] : []),
  ]

  const bgStyle = previewBg === 'dark'
    ? { backgroundColor: '#121212' }
    : previewBg === 'checkerboard'
    ? { backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }
    : { backgroundColor: T.bgSecondary }

  return (
    <div style={{ border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: 'hidden', marginBottom: 16 }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex', borderBottom: `1px solid ${T.border}`, backgroundColor: T.bg,
        padding: '0 4px',
      }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              fontFamily: T.font, fontSize: 13, fontWeight: tab === t.key ? 600 : 400,
              color: tab === t.key ? T.brand : T.textSecondary,
              padding: '10px 14px', border: 'none', background: 'none', cursor: 'pointer',
              borderBottom: tab === t.key ? `2px solid ${T.brand}` : '2px solid transparent',
              marginBottom: -1, transition: 'all 120ms ease',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'preview' && (
        <div style={{ padding: 24, ...bgStyle }}>
          {preview}
        </div>
      )}

      {tab === 'code' && code && (
        <div style={{ backgroundColor: T.bgCode, padding: 20, overflowX: 'auto' }}>
          <pre style={{
            fontFamily: T.mono, fontSize: 13, lineHeight: '20px',
            color: T.codeText, margin: 0, whiteSpace: 'pre-wrap',
          }}>
            {code}
          </pre>
        </div>
      )}

      {tab === 'specs' && specs && (
        <div style={{ padding: 20 }}>
          {specs}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Spec Table — for documenting props, tokens, measurements
// ---------------------------------------------------------------------------
export function SpecTable({ headers, rows }: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: T.font, fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                color: T.textSecondary, borderBottom: `2px solid ${T.border}`,
                textTransform: 'uppercase', letterSpacing: 0.5,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '8px 12px', borderBottom: `1px solid ${T.border}`,
                  fontFamily: j === 0 ? T.font : T.mono,
                  fontWeight: j === 0 ? 500 : 400,
                  color: j === 0 ? T.text : T.textSecondary,
                  whiteSpace: 'nowrap',
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Props Table — for documenting component API
// ---------------------------------------------------------------------------
export function PropsTable({ props }: {
  props: { name: string; type: string; default?: string; required?: boolean; description: string }[]
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: T.font, fontSize: 13 }}>
        <thead>
          <tr>
            {['Prop', 'Type', 'Default', 'Description'].map(h => (
              <th key={h} style={{
                padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                color: T.textSecondary, borderBottom: `2px solid ${T.border}`,
                textTransform: 'uppercase', letterSpacing: 0.5,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.map(p => (
            <tr key={p.name}>
              <td style={{
                padding: '8px 12px', borderBottom: `1px solid ${T.border}`,
                fontFamily: T.mono, fontWeight: 600, color: T.brand,
              }}>
                {p.name}{p.required && <span style={{ color: T.error }}> *</span>}
              </td>
              <td style={{
                padding: '8px 12px', borderBottom: `1px solid ${T.border}`,
                fontFamily: T.mono, color: T.textSecondary,
              }}>
                {p.type}
              </td>
              <td style={{
                padding: '8px 12px', borderBottom: `1px solid ${T.border}`,
                fontFamily: T.mono, color: p.default ? T.text : T.textTertiary,
              }}>
                {p.default || '—'}
              </td>
              <td style={{
                padding: '8px 12px', borderBottom: `1px solid ${T.border}`,
                color: T.textSecondary,
              }}>
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Color Swatch — consistent across all palette stories
// ---------------------------------------------------------------------------
export function ColorSwatch({ name, hex, token }: { name: string; hex: string; token: string }) {
  const isDark = ['600', '700', '800', '900', 'A200', 'A400', 'A700', 'main', 'dark'].includes(name)
  const isVeryLight = hex.toUpperCase() === '#FFFFFF' || hex.toUpperCase() === '#F8F8F8'
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard?.writeText(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    })
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 80, gap: 3, cursor: 'pointer',
      }}
      title={`Click to copy ${hex}`}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 6,
        backgroundColor: hex,
        border: isVeryLight ? `1px solid ${T.border}` : 'none',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end',
        padding: 4, position: 'relative',
        transition: 'transform 100ms ease',
      }}>
        <span style={{
          fontSize: 9, fontFamily: T.mono,
          color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.35)',
        }}>
          {copied ? '✓' : name}
        </span>
      </div>
      <span style={{ fontSize: 10, fontFamily: T.mono, fontWeight: 500, color: T.text, textAlign: 'center' }}>
        {hex}
      </span>
      <code style={{ fontSize: 8, fontFamily: T.mono, color: T.textTertiary, textAlign: 'center', wordBreak: 'break-all' }}>
        {token}
      </code>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Color Scale Section
// ---------------------------------------------------------------------------
export function ColorScale({ title, description, swatches }: {
  title: string
  description: string
  swatches: { name: string; hex: string; token: string }[]
}) {
  return (
    <DocSection title={title} description={description}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {swatches.map(s => <ColorSwatch key={s.token} {...s} />)}
      </div>
    </DocSection>
  )
}

// ---------------------------------------------------------------------------
// Do / Don't cards
// ---------------------------------------------------------------------------
export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{
        border: `1px solid ${T.success}20`, borderRadius: T.radius,
        backgroundColor: '#EFFDF1', padding: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.success, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16 }}>✓</span> Do
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: '20px', color: T.text }}>
          {dos.map((d, i) => <li key={i} style={{ marginBottom: 4 }}>{d}</li>)}
        </ul>
      </div>
      <div style={{
        border: `1px solid ${T.error}20`, borderRadius: T.radius,
        backgroundColor: '#FCF7F7', padding: 16,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.error, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 16 }}>✕</span> Don't
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: '20px', color: T.text }}>
          {donts.map((d, i) => <li key={i} style={{ marginBottom: 4 }}>{d}</li>)}
        </ul>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------
export function StatusBadge({ status }: { status: 'stable' | 'beta' | 'deprecated' | 'new' }) {
  const colors = {
    stable: { bg: '#EFFDF1', text: '#037730' },
    beta: { bg: '#FDF7F4', text: '#885604' },
    deprecated: { bg: '#FCF7F7', text: '#D33423' },
    new: { bg: '#EEF1FC', text: '#4B3FFF' },
  }
  const c = colors[status]
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, fontFamily: T.mono, textTransform: 'uppercase',
      padding: '2px 6px', borderRadius: 3, backgroundColor: c.bg, color: c.text,
      letterSpacing: 0.5,
    }}>
      {status}
    </span>
  )
}
