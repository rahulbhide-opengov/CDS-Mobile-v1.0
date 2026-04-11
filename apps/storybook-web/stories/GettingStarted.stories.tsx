import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

const T = {
  font: "'DM Sans', system-ui, sans-serif",
  mono: "'DM Mono', monospace",
  brand: '#4B3FFF',
  brandLight: '#EEF1FC',
  brandDark: '#19009B',
  text: 'rgba(0,0,0,0.87)',
  textSecondary: 'rgba(0,0,0,0.6)',
  textTertiary: 'rgba(0,0,0,0.38)',
  border: '#DDDEDE',
  bg: '#FFFFFF',
  bgSecondary: '#F8F8F8',
  bgCode: '#1B1B2F',
  codeText: '#E2E8F0',
  success: '#037730',
  radius: 12,
}

const meta: Meta = {
  title: 'Getting Started',
  parameters: { layout: 'fullscreen' },
}
export default meta

const PACKAGES = [
  { name: '@opengov/cds-tokens', desc: '247 Foundation + 239 Semantic color tokens, typography scales, spacing', color: '#4B3FFF' },
  { name: '@opengov/cds-themes', desc: 'Light, dark, and high-contrast Tamagui themes', color: '#546574' },
  { name: '@opengov/cds-config', desc: 'Tamagui config factory + CdsProvider with DM Sans font loading', color: '#0E6F7F' },
  { name: '@opengov/cds-primitives', desc: 'Text, Box, VStack, HStack, Pressable — styled base components', color: '#037730' },
  { name: '@opengov/cds-icons', desc: 'SVG icon components (24px grid, stroke-based)', color: '#885604' },
  { name: '@opengov/cds-components', desc: '40+ UI components: Button, TextField, Chip, Card, Dialog, etc.', color: '#D33423' },
  { name: '@opengov/cds-patterns', desc: 'Compound patterns: PageHeader, ChatBubble, FileCard, SelectMenu', color: '#7F00DE' },
]

export const Introduction: StoryObj = {
  name: 'Introduction',
  render: () => (
    <div style={{ fontFamily: T.font, color: T.text, maxWidth: 980, margin: '0 auto', padding: '48px 24px 80px' }}>
      {/* Hero */}
      <div style={{ marginBottom: 48 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 56, height: 56, borderRadius: 14, backgroundColor: T.brand,
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#FFF', fontFamily: T.font }}>CDS</span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.8, lineHeight: 1.1 }}>
          CDS Mobile
        </h1>
        <p style={{ fontSize: 18, color: T.textSecondary, margin: '0 0 16px 0', lineHeight: '28px', maxWidth: 600 }}>
          OpenGov Component Design System for React Native. Built on Tamagui + Expo,
          porting CDS 37 to native mobile and tablet.
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['v0.1.0', 'React Native', 'Tamagui', 'Expo SDK 52', 'DM Sans', 'WCAG 2.5.8'].map(tag => (
            <span key={tag} style={{
              fontSize: 12, fontWeight: 500, fontFamily: T.mono,
              padding: '4px 12px', borderRadius: 20,
              backgroundColor: T.bgSecondary, color: T.textSecondary,
              border: `1px solid ${T.border}`,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px 0', letterSpacing: -0.3 }}>Architecture</h2>
        <div style={{
          border: `1px solid ${T.border}`, borderRadius: T.radius,
          padding: 24, backgroundColor: T.bgSecondary,
          fontFamily: T.mono, fontSize: 13, lineHeight: '22px', color: T.textSecondary,
        }}>
          <pre style={{ margin: 0 }}>
{`┌─────────────────────────────────────────────────────────┐
│                     Your App (Expo)                      │
├─────────────────────────────────────────────────────────┤
│  CdsProvider   ← Theme + DM Sans font loading           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Components  (Button, TextField, Card, Dialog…)   │  │
│  │  Patterns    (PageHeader, ChatBubble, FileCard…)  │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  Primitives  (Text, Box, VStack, HStack…)         │  │
│  │  Icons       (SVG icon components)                │  │
│  ├───────────────────────────────────────────────────┤  │
│  │  Tokens      Primitive → Semantic → Component     │  │
│  │  Themes      Light / Dark / High Contrast         │  │
│  └───────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  Tamagui Core  +  React Native  +  Expo                  │
└─────────────────────────────────────────────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Packages */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 16px 0', letterSpacing: -0.3 }}>Packages</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, backgroundColor: T.border, borderRadius: T.radius, overflow: 'hidden', border: `1px solid ${T.border}` }}>
          {PACKAGES.map(pkg => (
            <div key={pkg.name} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
              backgroundColor: T.bg,
            }}>
              <div style={{ width: 4, height: 32, borderRadius: 2, backgroundColor: pkg.color, flexShrink: 0 }} />
              <div>
                <code style={{ fontSize: 13, fontFamily: T.mono, fontWeight: 600, color: T.text }}>{pkg.name}</code>
                <div style={{ fontSize: 13, color: T.textSecondary, marginTop: 2 }}>{pkg.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 16px 0', letterSpacing: -0.3 }}>Quick Start</h2>
        <div style={{
          backgroundColor: T.bgCode, borderRadius: T.radius, padding: 20, overflow: 'auto',
        }}>
          <pre style={{ fontFamily: T.mono, fontSize: 13, lineHeight: '22px', color: T.codeText, margin: 0 }}>
{`import { CdsProvider } from '@opengov/cds-config'
import { Button } from '@opengov/cds-components'
import { Text, VStack } from '@opengov/cds-primitives'

export default function App() {
  return (
    <CdsProvider theme="light">
      <VStack padding="$4" gap="$3">
        <Text variant="h1">Hello CDS Mobile</Text>
        <Button variant="primary" size="md" onPress={() => {}}>
          Get Started
        </Button>
      </VStack>
    </CdsProvider>
  )
}`}
          </pre>
        </div>
      </section>

      {/* Token Architecture */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 12px 0', letterSpacing: -0.3 }}>Token Architecture</h2>
        <p style={{ fontSize: 14, color: T.textSecondary, marginBottom: 16, lineHeight: '20px' }}>
          Three-layer token system enables white-labeling at any level.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            { layer: 'Primitive', count: '247 colors', desc: 'Raw palette values. Override to white-label.', color: T.brand },
            { layer: 'Semantic', count: '239 tokens', desc: 'Purpose-based aliases (Light + Dark modes).', color: '#546574' },
            { layer: 'Component', count: 'Per-component', desc: 'Button sizes, TextField borders, Chip radii.', color: '#037730' },
          ].map(l => (
            <div key={l.layer} style={{
              border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 20,
              borderTop: `3px solid ${l.color}`,
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{l.layer}</div>
              <div style={{ fontSize: 12, fontFamily: T.mono, color: l.color, marginBottom: 8 }}>{l.count}</div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: '18px' }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Principles */}
      <section>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 16px 0', letterSpacing: -0.3 }}>Design Principles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: 'Figma-accurate', desc: 'Every color, size, and spacing value traces directly to a CDS 37 Figma variable.' },
            { title: 'Mobile-native', desc: 'All touch targets meet WCAG 2.5.8 (44px minimum). Typography uses the Figma mobile column.' },
            { title: 'White-label ready', desc: 'Override the primitive token layer to rebrand the entire system in one step.' },
            { title: 'Accessible first', desc: 'WCAG AA contrast ratios, semantic ARIA roles, screen reader labels on every component.' },
          ].map(p => (
            <div key={p.title} style={{
              border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 20,
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 13, color: T.textSecondary, lineHeight: '18px' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}
