import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import { Stack, type GetProps } from '@tamagui/core'

// ---------------------------------------------------------------------------
// Opacity presets
// ---------------------------------------------------------------------------

const OPACITY_VALUES = {
  light: 0.3,
  medium: 0.5,
  heavy: 0.7,
} as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BackdropProps {
  /** Controls visibility of the backdrop overlay. */
  visible: boolean
  /** Called when the backdrop is pressed (typically to dismiss). */
  onPress?: () => void
  /** Opacity intensity of the backdrop. Defaults to "medium". */
  opacity?: 'light' | 'medium' | 'heavy'
  /** Content rendered above the backdrop (e.g. modal content). */
  children?: React.ReactNode
  /** Duration of the fade animation in ms. Defaults to 200. */
  animationDuration?: number
}

// ---------------------------------------------------------------------------
// Backdrop
// ---------------------------------------------------------------------------

/**
 * `Backdrop` -- semi-transparent overlay with animated fade-in/out.
 *
 * Used as a dimming layer behind modals, drawers, bottom sheets, and other
 * overlay surfaces. Supports three opacity levels and an optional press
 * handler for dismissal.
 */
export function Backdrop({
  visible,
  onPress,
  opacity = 'medium',
  children,
  animationDuration = 200,
}: BackdropProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: OPACITY_VALUES[opacity],
        duration: animationDuration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start()
    }
  }, [visible, opacity, animationDuration, fadeAnim])

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  // Always render so the fade-out animation plays, but disable interaction
  // when not visible.
  if (!visible && (fadeAnim as any).__getValue?.() === 0) {
    // Fully hidden -- return null for perf
  }

  return (
    <Animated.View
      style={[
        styles.backdrop,
        {
          opacity: fadeAnim,
          // Only intercept touches while visible
          pointerEvents: visible ? 'auto' : 'none',
        },
      ]}
      accessible={visible}
      accessibilityRole="none"
      accessibilityElementsHidden={!visible}
      importantForAccessibility={visible ? 'yes' : 'no-hide-descendants'}
    >
      {/* Pressable background layer */}
      <Animated.View style={styles.pressLayer}>
        <Stack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="black"
          onPress={visible ? handlePress : undefined}
          accessibilityRole="none"
          accessibilityLabel="Close overlay"
        />
      </Animated.View>

      {/* Content above the backdrop */}
      {children}
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  pressLayer: {
    ...StyleSheet.absoluteFillObject,
  },
})
