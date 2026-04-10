import React, { useEffect } from 'react'
import {
  StatusBar as RNStatusBar,
  Platform,
} from 'react-native'

// ---------------------------------------------------------------------------
// Style mapping
// ---------------------------------------------------------------------------

/**
 * Maps the simplified CDS style prop to the React Native StatusBar barStyle values.
 * - "light": light icons/text for dark backgrounds
 * - "dark": dark icons/text for light backgrounds
 * - "auto": platform default
 */
function resolveBarStyle(
  style: StatusBarStyle
): 'light-content' | 'dark-content' | 'default' {
  switch (style) {
    case 'light':
      return 'light-content'
    case 'dark':
      return 'dark-content'
    case 'auto':
    default:
      return 'default'
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

type StatusBarStyle = 'light' | 'dark' | 'auto'

export interface StatusBarProps {
  /** Status bar icon/text style. Defaults to "auto". */
  style?: StatusBarStyle
  /** When true, the app content renders under the status bar (Android). */
  translucent?: boolean
  /** When true, hides the status bar entirely. */
  hidden?: boolean
  /** Background color of the status bar area (Android only). */
  backgroundColor?: string
  /** Whether to animate style transitions. Defaults to true. */
  animated?: boolean
}

/**
 * `StatusBar` -- declarative status bar theming component from CDS 37.
 *
 * Provides a React-friendly wrapper around the native `StatusBar` API for
 * consistent status bar styling across the application. Supports imperative
 * updates via `useEffect` so the status bar always reflects the latest props.
 *
 * On iOS: controls the text/icon color (light or dark) and visibility.
 * On Android: additionally supports background color and translucent mode.
 *
 * This is a logical component that renders no visible UI. Place it at the
 * top of your screen component to declaratively set the status bar style.
 *
 * Usage:
 * ```tsx
 * // Dark background screen
 * <StatusBar style="light" backgroundColor="#1A1A1A" />
 *
 * // Light background screen
 * <StatusBar style="dark" />
 *
 * // Hidden status bar (e.g., full-screen media)
 * <StatusBar hidden />
 * ```
 */
export function StatusBar({
  style = 'auto',
  translucent = true,
  hidden = false,
  backgroundColor,
  animated = true,
}: StatusBarProps) {
  const barStyle = resolveBarStyle(style)

  // Apply status bar style imperatively so it updates on every render
  useEffect(() => {
    RNStatusBar.setBarStyle(barStyle, animated)
  }, [barStyle, animated])

  // Apply hidden state
  useEffect(() => {
    RNStatusBar.setHidden(hidden, animated ? 'fade' : 'none')
  }, [hidden, animated])

  // Android-specific: background color and translucent mode
  useEffect(() => {
    if (Platform.OS !== 'android') return

    if (backgroundColor) {
      RNStatusBar.setBackgroundColor(backgroundColor, animated)
    }

    RNStatusBar.setTranslucent(translucent)
  }, [backgroundColor, translucent, animated])

  // Render the declarative React Native StatusBar component as well,
  // which serves as a fallback for environments where the imperative
  // API may be unavailable (e.g., Expo managed workflow).
  return (
    <RNStatusBar
      barStyle={barStyle}
      translucent={translucent}
      hidden={hidden}
      backgroundColor={backgroundColor}
      animated={animated}
    />
  )
}
