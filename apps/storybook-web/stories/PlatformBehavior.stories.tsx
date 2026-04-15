import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DocPage, DocSection, DocDivider, FontLoader, SpecTable } from './.shared/DocLayout'

// ---------------------------------------------------------------------------
// Design tokens (inline to avoid RN dependency in web Storybook)
// ---------------------------------------------------------------------------
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
  bgTertiary: '#F2F2F2',
  bgCode: '#1B1B2F',
  codeText: '#E2E8F0',
  success: '#037730',
  successBg: '#EFFDF1',
  warning: '#885604',
  warningBg: '#FDF7F4',
  radius: 12,
  radiusSm: 6,
}

const meta: Meta = {
  title: 'Platform Behavior',
  parameters: { layout: 'fullscreen' },
}
export default meta

// ---------------------------------------------------------------------------
// Platform-Native components data
// ---------------------------------------------------------------------------

const PLATFORM_NATIVE_COMPONENTS = [
  {
    component: 'Switch',
    ios: 'UISwitch with CDS tintColor',
    android: 'MaterialSwitch with CDS trackColor',
    nativeLib: 'react-native (built-in)',
    fallback: 'Custom animated toggle',
  },
  {
    component: 'DatePicker',
    ios: 'UIDatePicker (wheel/compact)',
    android: 'MaterialDatePicker dialog',
    nativeLib: '@react-native-community/datetimepicker',
    fallback: 'Custom scroll picker',
  },
  {
    component: 'TimePicker',
    ios: 'UIDatePicker time mode',
    android: 'MaterialTimePicker dialog',
    nativeLib: '@react-native-community/datetimepicker',
    fallback: 'Custom scroll picker',
  },
  {
    component: 'ActionSheet',
    ios: 'UIAlertController.actionSheet',
    android: 'BottomSheet dialog',
    nativeLib: '@expo/react-native-action-sheet',
    fallback: 'Custom bottom sheet',
  },
  {
    component: 'Alert',
    ios: 'UIAlertController.alert',
    android: 'AlertDialog',
    nativeLib: 'react-native Alert API',
    fallback: 'Custom Dialog overlay',
  },
  {
    component: 'Haptics',
    ios: 'UIImpactFeedbackGenerator',
    android: 'VibrationEffect (API 26+)',
    nativeLib: 'expo-haptics',
    fallback: 'No-op (silent)',
  },
  {
    component: 'StatusBar',
    ios: 'UIStatusBarManager',
    android: 'Window.statusBarColor',
    nativeLib: 'expo-status-bar',
    fallback: 'N/A',
  },
  {
    component: 'NavigationBar',
    ios: 'UINavigationBar (large title)',
    android: 'MaterialToolbar (collapsing)',
    nativeLib: '@react-navigation/native-stack',
    fallback: 'Custom header frame',
  },
  {
    component: 'TabBar',
    ios: 'UITabBarController',
    android: 'BottomNavigationView',
    nativeLib: '@react-navigation/bottom-tabs',
    fallback: 'Custom tab row',
  },
  {
    component: 'SegmentedControl',
    ios: 'UISegmentedControl',
    android: 'MaterialButtonToggleGroup',
    nativeLib: '@react-native-segmented-control/segmented-control',
    fallback: 'Custom pill toggle',
  },
]

// ---------------------------------------------------------------------------
// Custom components grouped by category
// ---------------------------------------------------------------------------

const CUSTOM_COMPONENT_GROUPS = [
  {
    category: 'Buttons & Actions',
    components: ['Button', 'IconButton', 'FAB', 'LinkButton', 'SplitButton'],
  },
  {
    category: 'Form Controls',
    components: ['TextField', 'TextArea', 'Checkbox', 'Radio', 'RadioGroup', 'Slider', 'SearchField', 'SelectMenu', 'Stepper'],
  },
  {
    category: 'Data Display',
    components: ['Avatar', 'AvatarGroup', 'Badge', 'Chip', 'Tag', 'ProgressBar', 'Meter', 'Tooltip', 'DataTable'],
  },
  {
    category: 'Navigation',
    components: ['Breadcrumb', 'Pagination', 'Tabs', 'Link'],
  },
  {
    category: 'Feedback',
    components: ['Snackbar', 'Banner', 'Dialog', 'Spinner', 'Skeleton', 'EmptyState'],
  },
  {
    category: 'Surfaces',
    components: ['Card', 'Accordion', 'Divider', 'Sheet', 'Popover'],
  },
  {
    category: 'Layout',
    components: ['Stack', 'Grid', 'Container', 'ScrollView'],
  },
  {
    category: 'Charts',
    components: ['BarChart', 'LineChart', 'PieChart', 'SparkLine'],
  },
  {
    category: 'Patterns',
    components: ['PageHeader', 'ChatBubble', 'FileCard', 'FormField', 'ListItem'],
  },
]

// ---------------------------------------------------------------------------
// Badge helper
// ---------------------------------------------------------------------------

function TypeBadge({ type }: { type: 'custom' | 'native' }) {
  const isNative = type === 'native'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: 11, fontWeight: 600, fontFamily: T.mono, textTransform: 'uppercase',
      padding: '2px 8px', borderRadius: 12,
      backgroundColor: isNative ? T.brandLight : T.bgTertiary,
      color: isNative ? T.brand : T.textSecondary,
      letterSpacing: 0.4,
    }}>
      {isNative && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="1" width="14" height="22" rx="3" stroke={T.brand} strokeWidth="2.5" />
          <line x1="9" y1="19" x2="15" y2="19" stroke={T.brand} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      {isNative ? 'Platform-Native' : 'Custom'}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Story
// ---------------------------------------------------------------------------

export const Overview: StoryObj = {
  name: 'Overview',
  render: () => (
    <DocPage
      title="Platform Behavior"
      description="How CDS Mobile components behave across iOS and Android. 47 custom components render identically on both platforms for brand consistency. 10 platform-native components use OS controls for familiar interaction patterns, with CDS theming applied."
      badge="57 components"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Introduction */}
      {/* ------------------------------------------------------------------ */}
      <DocSection
        title="Custom vs Platform-Native"
        description="CDS Mobile categorizes every component into one of two platform behavior types."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 8 }}>
          {/* Custom card */}
          <div style={{
            border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 24,
            borderTop: `3px solid ${T.textSecondary}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <TypeBadge type="custom" />
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>47 components</span>
            </div>
            <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: '20px', margin: 0 }}>
              Rendered entirely with React Native Views and Tamagui styled components.
              Identical appearance and behavior on iOS and Android, ensuring pixel-perfect
              brand consistency across platforms.
            </p>
          </div>

          {/* Platform-Native card */}
          <div style={{
            border: `1px solid ${T.brand}33`, borderRadius: T.radius, padding: 24,
            borderTop: `3px solid ${T.brand}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <TypeBadge type="native" />
              <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>10 components</span>
            </div>
            <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: '20px', margin: 0 }}>
              Delegate to OS-level controls (UISwitch, MaterialDatePicker, etc.) for
              interactions users expect to feel native. CDS tokens are applied via
              accentColor, tintColor, and backgroundStyle to maintain brand alignment.
            </p>
          </div>
        </div>
      </DocSection>

      <DocDivider />

      {/* ------------------------------------------------------------------ */}
      {/* Platform-Native Components table */}
      {/* ------------------------------------------------------------------ */}
      <DocSection
        title="Platform-Native Components"
        description="These components delegate to OS-level controls and apply CDS design tokens for consistent branding."
      >
        <SpecTable
          headers={['Component', 'iOS Behavior', 'Android Behavior', 'Native Library', 'Fallback']}
          rows={PLATFORM_NATIVE_COMPONENTS.map(c => [
            <span key={c.component} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <code style={{ fontFamily: T.mono, fontWeight: 600, color: T.brand, fontSize: 13 }}>
                {c.component}
              </code>
            </span>,
            <span key={`${c.component}-ios`} style={{ fontSize: 12 }}>{c.ios}</span>,
            <span key={`${c.component}-android`} style={{ fontSize: 12 }}>{c.android}</span>,
            <code key={`${c.component}-lib`} style={{ fontFamily: T.mono, fontSize: 11, color: T.textSecondary }}>
              {c.nativeLib}
            </code>,
            <span key={`${c.component}-fb`} style={{ fontSize: 12, color: T.textTertiary }}>{c.fallback}</span>,
          ])}
        />
      </DocSection>

      <DocDivider />

      {/* ------------------------------------------------------------------ */}
      {/* Custom Components grouped table */}
      {/* ------------------------------------------------------------------ */}
      <DocSection
        title="Custom Components"
        description="These components render identically on iOS and Android using React Native Views and Tamagui styling."
      >
        <div style={{
          border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: 'hidden',
        }}>
          {CUSTOM_COMPONENT_GROUPS.map((group, gi) => (
            <div key={group.category} style={{
              borderBottom: gi < CUSTOM_COMPONENT_GROUPS.length - 1 ? `1px solid ${T.border}` : 'none',
            }}>
              <div style={{
                padding: '10px 16px', backgroundColor: T.bgSecondary,
                borderBottom: `1px solid ${T.border}`,
              }}>
                <span style={{
                  fontSize: 12, fontWeight: 600, color: T.textSecondary,
                  fontFamily: T.mono, textTransform: 'uppercase', letterSpacing: 0.5,
                }}>
                  {group.category}
                </span>
              </div>
              <div style={{
                padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: 8,
              }}>
                {group.components.map(c => (
                  <code key={c} style={{
                    fontFamily: T.mono, fontSize: 12, fontWeight: 500,
                    padding: '3px 10px', borderRadius: 4,
                    backgroundColor: T.bgTertiary, color: T.text,
                  }}>
                    {c}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      <DocDivider />

      {/* ------------------------------------------------------------------ */}
      {/* Theming Strategy */}
      {/* ------------------------------------------------------------------ */}
      <DocSection
        title="Theming Strategy"
        description="How CDS design tokens are applied to native OS controls to maintain brand consistency."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
          {[
            {
              prop: 'accentColor',
              desc: 'Primary interactive tint applied to switches, checkmarks, and selection highlights.',
              token: 'primitive.blurple700',
              value: '#4B3FFF',
            },
            {
              prop: 'tintColor',
              desc: 'Navigation bar items, tab bar icons, and action sheet action text.',
              token: 'primitive.blurple700',
              value: '#4B3FFF',
            },
            {
              prop: 'backgroundStyle',
              desc: 'Status bar and navigation bar background treatment using semantic surface tokens.',
              token: 'semantic.surface1',
              value: '#FFFFFF',
            },
          ].map(t => (
            <div key={t.prop} style={{
              border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 4,
                  backgroundColor: t.value, border: `1px solid ${T.border}`,
                  flexShrink: 0,
                }} />
                <code style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 600, color: T.brand }}>
                  {t.prop}
                </code>
              </div>
              <p style={{ fontSize: 13, color: T.textSecondary, lineHeight: '18px', margin: '0 0 8px 0' }}>
                {t.desc}
              </p>
              <code style={{ fontFamily: T.mono, fontSize: 11, color: T.textTertiary }}>
                {t.token}
              </code>
            </div>
          ))}
        </div>
      </DocSection>

      <DocDivider />

      {/* ------------------------------------------------------------------ */}
      {/* Dependencies */}
      {/* ------------------------------------------------------------------ */}
      <DocSection
        title="Optional Peer Dependencies"
        description="Platform-native components require these packages. Install only those you use."
      >
        <div style={{
          backgroundColor: T.bgCode, borderRadius: T.radius, padding: 20, overflow: 'auto',
        }}>
          <pre style={{
            fontFamily: T.mono, fontSize: 13, lineHeight: '22px',
            color: T.codeText, margin: 0,
          }}>
{`# Date & Time pickers
npx expo install @react-native-community/datetimepicker

# Segmented Control (iOS-native)
npx expo install @react-native-segmented-control/segmented-control

# Action Sheet
npx expo install @expo/react-native-action-sheet

# Haptic Feedback
npx expo install expo-haptics

# Status Bar
npx expo install expo-status-bar

# Navigation (Tab Bar + Navigation Bar)
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs`}
          </pre>
        </div>
      </DocSection>

      <DocDivider />

      {/* ------------------------------------------------------------------ */}
      {/* Escape Hatch */}
      {/* ------------------------------------------------------------------ */}
      <DocSection
        title="Escape Hatch"
        description="Force custom rendering when you need pixel-perfect control over a platform-native component."
      >
        <div style={{
          border: `1px solid ${T.warning}44`, borderRadius: T.radius, padding: 20,
          backgroundColor: T.warningBg,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01" stroke={T.warning} strokeWidth="2" strokeLinecap="round" />
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke={T.warning} strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.warning }}>
              The native prop
            </span>
          </div>
          <p style={{ fontSize: 13, color: T.text, lineHeight: '20px', margin: '0 0 16px 0' }}>
            Every platform-native component accepts a <code style={{
              fontFamily: T.mono, fontSize: 12, padding: '1px 6px', borderRadius: 4,
              backgroundColor: T.bgTertiary,
            }}>native=&#123;false&#125;</code> prop that
            forces the custom (cross-platform) fallback renderer. This is useful when
            you need identical visuals on both platforms, or when running on web where
            native controls are unavailable.
          </p>
          <div style={{
            backgroundColor: T.bgCode, borderRadius: T.radiusSm, padding: 16,
          }}>
            <pre style={{
              fontFamily: T.mono, fontSize: 13, lineHeight: '21px',
              color: T.codeText, margin: 0,
            }}>
{`// Default: uses native UISwitch on iOS, MaterialSwitch on Android
<Switch checked={on} onChange={setOn} />

// Force custom renderer on all platforms
<Switch checked={on} onChange={setOn} native={false} />

// Force custom DatePicker (no native dialog)
<DatePicker value={date} onChange={setDate} native={false} />`}
            </pre>
          </div>
        </div>
      </DocSection>
    </DocPage>
  ),
}
