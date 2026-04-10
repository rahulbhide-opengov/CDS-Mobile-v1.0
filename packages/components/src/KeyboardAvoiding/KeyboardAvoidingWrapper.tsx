import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KeyboardAvoidingWrapperProps {
  /**
   * Strategy for avoiding the keyboard.
   *
   * - `'padding'` -- adds padding to the bottom (recommended for iOS)
   * - `'height'`  -- shrinks the view height (recommended for Android)
   * - `'position'` -- repositions the view upward
   *
   * Defaults to `'padding'` on iOS and `'height'` on Android.
   */
  behavior?: 'height' | 'position' | 'padding'
  /**
   * Additional vertical offset (in points) to add on top of the
   * automatically computed keyboard avoidance. Useful when a fixed
   * header or tab bar is present.
   *
   * Defaults to 0.
   */
  keyboardVerticalOffset?: number
  /**
   * When false, keyboard avoidance is disabled entirely.
   * Defaults to true.
   */
  enabled?: boolean
  /** Content that should be pushed above the keyboard. */
  children: React.ReactNode
}

// ---------------------------------------------------------------------------
// Platform defaults
// ---------------------------------------------------------------------------

function getDefaultBehavior(): 'height' | 'position' | 'padding' {
  return Platform.OS === 'ios' ? 'padding' : 'height'
}

// ---------------------------------------------------------------------------
// KeyboardAvoidingWrapper
// ---------------------------------------------------------------------------

/**
 * `KeyboardAvoidingWrapper` -- platform-aware keyboard avoidance container.
 *
 * Wraps React Native's `KeyboardAvoidingView` with sensible defaults per
 * platform. On iOS the default behavior is `'padding'` (the most reliable
 * strategy for most layouts); on Android it defaults to `'height'`.
 *
 * Use the `keyboardVerticalOffset` prop to account for persistent UI chrome
 * such as navigation headers or tab bars that are rendered outside of this
 * wrapper but consume vertical space.
 *
 * ```tsx
 * <KeyboardAvoidingWrapper keyboardVerticalOffset={64}>
 *   <TextField label="Email" />
 *   <TextField label="Password" />
 * </KeyboardAvoidingWrapper>
 * ```
 */
export function KeyboardAvoidingWrapper({
  behavior,
  keyboardVerticalOffset = 0,
  enabled = true,
  children,
}: KeyboardAvoidingWrapperProps) {
  const resolvedBehavior = behavior ?? getDefaultBehavior()

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={resolvedBehavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={enabled}
      accessible={false}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
