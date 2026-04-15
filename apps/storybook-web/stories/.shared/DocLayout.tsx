/**
 * CDS Mobile — Storybook Documentation Layout System
 *
 * Professional design-system-grade documentation components.
 * All styling uses CDS 37 Foundation tokens (no arbitrary hex).
 *
 * Components:
 *   DocPage       — Full page shell with header + badge
 *   DocSection    — Grouped content with heading
 *   DocShowcase   — Tabbed card (Preview | Code | Specs)
 *   StateGrid     — Interactive state matrix (idle/hover/pressed/focused/disabled/loading)
 *   SpecTable     — Measurement/property specs table
 *   PropsTable    — Component API reference
 *   TokenRef      — Token reference inline display
 *   DoDont        — Usage guideline split cards
 *   Anatomy       — Component anatomy diagram
 *   AccessSpec    — Accessibility specification card
 *   StatusBadge   — Component maturity indicator
 *   ColorSwatch   — Click-to-copy palette swatch
 *   ColorScale    — Row of palette swatches
 */
import React, { useState, useEffect, useRef, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Design tokens (inline to avoid RN dependency in web Storybook)
// ---------------------------------------------------------------------------
const T = {
  // Brand
  brand: '#4B3FFF',
  brandDark: '#19009B',
  brandLight: '#EEF1FC',
  brandLight2: '#F7F8FD',
  // Secondary
  secondary: '#546574',
  secondaryLight: '#F0F2F4',
  // Surfaces
  bg: '#FFFFFF',
  bgSecondary: '#F8F8F8',
  bgTertiary: '#F2F2F2',
  bgCode: '#1B1B2F',
  // Text
  text: 'rgba(0,0,0,0.87)',
  textSecondary: 'rgba(0,0,0,0.6)',
  textTertiary: 'rgba(0,0,0,0.38)',
  textInverse: '#FFFFFF',
  // Status
  success: '#037730',
  successBg: '#EFFDF1',
  error: '#D33423',
  errorBg: '#FCF7F7',
  warning: '#885604',
  warningBg: '#FDF7F4',
  info: '#0E6F7F',
  infoBg: '#F1FAFC',
  // Borders
  border: '#DDDEDE',
  borderStrong: '#C8C9CA',
  // Code
  codeText: '#E2E8F0',
  codeKeyword: '#C4B5FD',
  codeString: '#86EFAC',
  codeProp: '#93C5FD',
  codeComment: '#64748B',
  // Font
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  mono: "'DM Mono', 'SF Mono', 'Fira Code', monospace",
  // Radius
  radius: 12,
  radiusSm: 6,
  radiusXs: 4,
}

// ---------------------------------------------------------------------------
// Google Fonts loader
// ---------------------------------------------------------------------------
const FONTS = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000&display=swap'

export function FontLoader({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (document.querySelector(`link[href="${FONTS}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS
    document.head.appendChild(link)
  }, [])
  return <>{children}</>
}

// ---------------------------------------------------------------------------
// DocPage — Page shell
// ---------------------------------------------------------------------------
export function DocPage({ title, description, badge, status, children }: {
  title: string
  description: string
  badge?: string
  status?: 'stable' | 'beta' | 'new' | 'deprecated'
  children: React.ReactNode
}) {
  return (
    <FontLoader>
      <div style={{
        fontFamily: T.font, color: T.text,
        maxWidth: 980, margin: '0 auto', padding: '32px 24px 64px',
      }}>
        {/* Navigation breadcrumb */}
        <div style={{
          fontSize: 12, fontWeight: 500, color: T.textTertiary,
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: T.mono,
        }}>
          <span style={{ color: T.brand }}>CDS Mobile</span>
          <span>/</span>
          <span>{title}</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, letterSpacing: -0.5, lineHeight: 1.1 }}>
              {title}
            </h1>
            {status && <StatusBadge status={status} />}
            {badge && (
              <span style={{
                fontSize: 11, fontWeight: 500, fontFamily: T.mono,
                padding: '3px 10px', borderRadius: 20,
                backgroundColor: T.brandLight, color: T.brand,
              }}>
                {badge}
              </span>
            )}
          </div>
          <p style={{
            fontSize: 16, lineHeight: '24px', color: T.textSecondary,
            margin: 0, maxWidth: 680,
          }}>
            {description}
          </p>
        </div>

        {children}
      </div>
    </FontLoader>
  )
}

// ---------------------------------------------------------------------------
// DocSection — Grouped content
// ---------------------------------------------------------------------------
export function DocSection({ title, description, id, children }: {
  title: string
  description?: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <section id={id || title.toLowerCase().replace(/\s+/g, '-')} style={{ marginBottom: 48 }}>
      <h2 style={{
        fontSize: 20, fontWeight: 600, margin: '0 0 4px 0',
        letterSpacing: -0.3, lineHeight: 1.3,
      }}>
        {title}
      </h2>
      {description && (
        <p style={{
          fontSize: 14, color: T.textSecondary,
          margin: '0 0 20px 0', lineHeight: '20px', maxWidth: 640,
        }}>
          {description}
        </p>
      )}
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
// DocShowcase — Tabbed Preview/Code/Specs card
// ---------------------------------------------------------------------------
type TabKey = 'preview' | 'code' | 'specs'

export function DocShowcase({ preview, code, specs, label, previewBg, previewPadding }: {
  preview: React.ReactNode
  code?: string
  specs?: React.ReactNode
  label?: string
  previewBg?: 'light' | 'dark' | 'checkerboard' | 'transparent'
  previewPadding?: number
}) {
  const [tab, setTab] = useState<TabKey>('preview')

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'preview', label: 'Preview' },
    ...(code ? [{ key: 'code' as TabKey, label: 'Code' }] : []),
    ...(specs ? [{ key: 'specs' as TabKey, label: 'Specs' }] : []),
  ]

  const bg = previewBg === 'dark' ? '#121212'
    : previewBg === 'transparent' ? 'transparent'
    : previewBg === 'checkerboard' ? undefined
    : T.bgSecondary

  return (
    <div style={{
      border: `1px solid ${T.border}`, borderRadius: T.radius,
      overflow: 'hidden', marginBottom: 20, background: T.bg,
    }}>
      {/* Tab bar + optional label */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${T.border}`, padding: '0 16px',
        background: T.bg,
      }}>
        <div style={{ display: 'flex' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                fontFamily: T.font, fontSize: 13, fontWeight: tab === t.key ? 600 : 400,
                color: tab === t.key ? T.brand : T.textTertiary,
                padding: '12px 16px', border: 'none', background: 'none', cursor: 'pointer',
                borderBottom: tab === t.key ? `2px solid ${T.brand}` : '2px solid transparent',
                marginBottom: -1, transition: 'all 100ms ease',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {label && (
          <span style={{
            fontSize: 11, fontFamily: T.mono, color: T.textTertiary,
            fontWeight: 500,
          }}>
            {label}
          </span>
        )}
      </div>

      {/* Content */}
      {tab === 'preview' && (
        <div style={{
          padding: previewPadding ?? 28, backgroundColor: bg,
          ...(previewBg === 'checkerboard' ? {
            backgroundImage: 'linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)',
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          } : {}),
        }}>
          {preview}
        </div>
      )}

      {tab === 'code' && code && (
        <div style={{
          backgroundColor: T.bgCode, padding: 20, overflowX: 'auto',
          maxHeight: 480,
        }}>
          <pre style={{
            fontFamily: T.mono, fontSize: 13, lineHeight: '21px',
            color: T.codeText, margin: 0, whiteSpace: 'pre',
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
// StateGrid — Interactive state demonstration matrix
// ---------------------------------------------------------------------------
export function StateGrid({ states, renderCell }: {
  states: { label: string; key: string; description?: string }[]
  renderCell: (stateKey: string) => React.ReactNode
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${states.length}, 1fr)`,
      gap: 1, backgroundColor: T.border, borderRadius: T.radius,
      overflow: 'hidden', border: `1px solid ${T.border}`,
    }}>
      {states.map(s => (
        <div key={s.key} style={{
          backgroundColor: T.bg, padding: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        }}>
          {/* State label */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: 11, fontWeight: 600, fontFamily: T.mono,
              color: T.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8,
              marginBottom: 2,
            }}>
              {s.label}
            </div>
            {s.description && (
              <div style={{ fontSize: 10, color: T.textTertiary, fontFamily: T.mono }}>
                {s.description}
              </div>
            )}
          </div>
          {/* Component */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 48 }}>
            {renderCell(s.key)}
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SpecTable
// ---------------------------------------------------------------------------
export function SpecTable({ headers, rows }: {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: T.font, fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{
                padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                color: T.textTertiary, borderBottom: `2px solid ${T.border}`,
                textTransform: 'uppercase', letterSpacing: 0.6,
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ transition: 'background 80ms' }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '10px 14px', borderBottom: `1px solid ${T.border}`,
                  fontFamily: j === 0 ? T.font : T.mono,
                  fontWeight: j === 0 ? 500 : 400,
                  color: j === 0 ? T.text : T.textSecondary,
                  fontSize: 13, lineHeight: '18px',
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
// PropsTable — Component API
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
                padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                color: T.textTertiary, borderBottom: `2px solid ${T.border}`,
                textTransform: 'uppercase', letterSpacing: 0.6,
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
                padding: '10px 14px', borderBottom: `1px solid ${T.border}`,
                fontFamily: T.mono, fontWeight: 600, color: T.brand, fontSize: 13,
              }}>
                {p.name}{p.required && <span style={{ color: T.error, marginLeft: 2 }}>*</span>}
              </td>
              <td style={{
                padding: '10px 14px', borderBottom: `1px solid ${T.border}`,
                fontFamily: T.mono, color: T.textSecondary, fontSize: 12,
              }}>
                {p.type}
              </td>
              <td style={{
                padding: '10px 14px', borderBottom: `1px solid ${T.border}`,
                fontFamily: T.mono, color: p.default ? T.text : T.textTertiary, fontSize: 12,
              }}>
                {p.default || '—'}
              </td>
              <td style={{
                padding: '10px 14px', borderBottom: `1px solid ${T.border}`,
                color: T.textSecondary, fontSize: 13, lineHeight: '18px',
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
// TokenRef — Inline token reference badge
// ---------------------------------------------------------------------------
export function TokenRef({ name, value }: { name: string; value?: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 12, fontFamily: T.mono, fontWeight: 500,
      padding: '2px 8px', borderRadius: 4,
      backgroundColor: T.brandLight, color: T.brand,
    }}>
      {value && (
        <span style={{
          width: 12, height: 12, borderRadius: 3,
          backgroundColor: value, border: `1px solid ${T.border}`,
          flexShrink: 0,
        }} />
      )}
      {name}
    </span>
  )
}

// ---------------------------------------------------------------------------
// DoDont — Usage guideline cards
// ---------------------------------------------------------------------------
export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{
        borderRadius: T.radius, padding: 20,
        border: `1px solid ${T.success}22`, backgroundColor: T.successBg,
      }}>
        <div style={{
          fontSize: 13, fontWeight: 700, color: T.success,
          marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={T.success} fillOpacity={0.15} />
            <path d="M8 12l3 3 5-5" stroke={T.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Do
        </div>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: '22px', color: T.text }}>
          {dos.map((d, i) => <li key={i} style={{ marginBottom: 4 }}>{d}</li>)}
        </ul>
      </div>
      <div style={{
        borderRadius: T.radius, padding: 20,
        border: `1px solid ${T.error}22`, backgroundColor: T.errorBg,
      }}>
        <div style={{
          fontSize: 13, fontWeight: 700, color: T.error,
          marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill={T.error} fillOpacity={0.15} />
            <path d="M15 9l-6 6M9 9l6 6" stroke={T.error} strokeWidth="2" strokeLinecap="round" />
          </svg>
          Don't
        </div>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: '22px', color: T.text }}>
          {donts.map((d, i) => <li key={i} style={{ marginBottom: 4 }}>{d}</li>)}
        </ul>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Anatomy — Component anatomy diagram
// ---------------------------------------------------------------------------
export function Anatomy({ src, alt, labels }: {
  src?: string
  alt?: string
  labels?: { text: string; position: string }[]
}) {
  return (
    <div style={{
      border: `1px solid ${T.border}`, borderRadius: T.radius,
      padding: 32, backgroundColor: T.bgSecondary,
      fontFamily: T.mono, fontSize: 12, color: T.textSecondary,
      textAlign: 'center',
    }}>
      {src ? (
        <img src={src} alt={alt || 'Component anatomy'} style={{ maxWidth: '100%' }} />
      ) : (
        <pre style={{ margin: 0, textAlign: 'left', display: 'inline-block' }}>
{`┌──────────────────────────────────────────┐
│                                          │
│   [icon]   Label Text   [icon]           │
│                                          │
└──────────────────────────────────────────┘
     ↑              ↑            ↑
  leading        label       trailing
   icon          text          icon`}
        </pre>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// AccessSpec — Accessibility specification card
// ---------------------------------------------------------------------------
export function AccessSpec({ items }: {
  items: { label: string; value: string; status?: 'pass' | 'warn' | 'fail' }[]
}) {
  const statusColor = (s?: string) =>
    s === 'pass' ? T.success : s === 'warn' ? T.warning : s === 'fail' ? T.error : T.textSecondary

  return (
    <div style={{
      border: `1px solid ${T.border}`, borderRadius: T.radius,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '12px 16px', backgroundColor: T.infoBg,
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke={T.info} strokeWidth="2" />
          <path d="M12 16v-4M12 8h.01" stroke={T.info} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.info }}>Accessibility</span>
      </div>
      <div style={{ padding: 4 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '8px 12px', borderRadius: T.radiusSm,
          }}>
            <span style={{ fontSize: 13, color: T.text }}>{item.label}</span>
            <span style={{
              fontSize: 12, fontFamily: T.mono, fontWeight: 500,
              color: statusColor(item.status),
            }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// StatusBadge
// ---------------------------------------------------------------------------
export function StatusBadge({ status }: { status: 'stable' | 'beta' | 'deprecated' | 'new' }) {
  const styles = {
    stable: { bg: T.successBg, text: T.success, border: `${T.success}33` },
    beta: { bg: T.warningBg, text: T.warning, border: `${T.warning}33` },
    deprecated: { bg: T.errorBg, text: T.error, border: `${T.error}33` },
    new: { bg: T.brandLight, text: T.brand, border: `${T.brand}33` },
  }
  const s = styles[status]
  return (
    <span style={{
      fontSize: 11, fontWeight: 600, fontFamily: T.mono, textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 20,
      backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}`,
      letterSpacing: 0.5,
    }}>
      {status}
    </span>
  )
}

// ---------------------------------------------------------------------------
// ColorSwatch — Click-to-copy
// ---------------------------------------------------------------------------
export function ColorSwatch({ name, hex, token }: { name: string; hex: string; token: string }) {
  const isDark = ['600', '700', '800', '900', 'A200', 'A400', 'A700', 'main', 'dark'].includes(name)
  const isVeryLight = hex.toUpperCase() === '#FFFFFF' || hex.toUpperCase() === '#F8F8F8'
  const [copied, setCopied] = useState(false)

  return (
    <div
      onClick={() => {
        navigator.clipboard?.writeText(hex).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1200)
        })
      }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: 80, gap: 3, cursor: 'pointer',
        transition: 'transform 80ms ease',
      }}
      title={`Click to copy ${hex}`}
    >
      <div style={{
        width: 60, height: 60, borderRadius: T.radiusSm,
        backgroundColor: hex,
        border: isVeryLight ? `1px solid ${T.border}` : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 80ms ease',
      }}>
        <span style={{
          fontSize: 10, fontFamily: T.mono, fontWeight: 600,
          color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.4)',
        }}>
          {copied ? '✓' : name}
        </span>
      </div>
      <span style={{ fontSize: 10, fontFamily: T.mono, fontWeight: 500, color: T.text }}>
        {hex}
      </span>
      <code style={{ fontSize: 8, fontFamily: T.mono, color: T.textTertiary, textAlign: 'center' }}>
        {token}
      </code>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PlatformBadge — Custom vs Platform-Native indicator
// ---------------------------------------------------------------------------
export function PlatformBadge({ type, ios, android }: {
  type: 'custom' | 'platform-native'
  ios?: string
  android?: string
}) {
  const isNative = type === 'platform-native'
  const bg = isNative ? T.brandLight : T.bgTertiary
  const color = isNative ? T.brand : T.textSecondary
  const label = isNative ? 'Platform-Native' : 'Custom'

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 600, fontFamily: T.mono, textTransform: 'uppercase',
        padding: '3px 10px', borderRadius: 20,
        backgroundColor: bg, color,
        letterSpacing: 0.5, position: 'relative',
        cursor: isNative && (ios || android) ? 'help' : 'default',
      }}
      title={
        isNative && (ios || android)
          ? `iOS: ${ios || 'N/A'} / Android: ${android || 'N/A'}`
          : undefined
      }
    >
      {isNative && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <rect x="5" y="1" width="14" height="22" rx="3" stroke={color} strokeWidth="2" />
          <line x1="9" y1="19" x2="15" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {label}
    </span>
  )
}

// ---------------------------------------------------------------------------
// ColorScale
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
// Divider
// ---------------------------------------------------------------------------
export function DocDivider() {
  return <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '40px 0' }} />
}
