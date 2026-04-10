import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  StyleSheet,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Variant color mapping
// ---------------------------------------------------------------------------

const VARIANT_COLORS = {
  default: '#323232',   // neutral900
  success: '#1B7D3E',   // green700
  error: '#CC2929',      // red600
  warning: '#B45309',    // amber700
  info: '#1D6DB0',       // blue700
} as const

// Swipe-to-dismiss threshold (px)
const SWIPE_THRESHOLD = 60

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SnackbarProps {
  /** Controls visibility of the snackbar. */
  visible: boolean
  /** Notification message text. */
  message: string
  /** Visual variant controlling background color. Defaults to "default". */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  /** Vertical position on screen. Defaults to "bottom". */
  position?: 'top' | 'bottom'
  /** Auto-dismiss duration in ms. Set to 0 to disable. Defaults to 4000. */
  duration?: number
  /** Called when the snackbar should be dismissed. */
  onDismiss: () => void
  /** Optional action button rendered at trailing edge. */
  action?: { label: string; onPress: () => void }
}

// ---------------------------------------------------------------------------
// Snackbar
// ---------------------------------------------------------------------------

/**
 * `Snackbar` -- brief notification toast with auto-dismiss and swipe-to-dismiss.
 *
 * Renders as an absolutely-positioned overlay that slides in from the top or
 * bottom edge (respecting safe areas). Supports five color variants, an
 * optional action button, and configurable auto-dismiss timing.
 */
export function Snackbar({
  visible,
  message,
  variant = 'default',
  position = 'bottom',
  duration = 4000,
  onDismiss,
  action,
}: SnackbarProps) {
  const screenHeight = Dimensions.get('window').height
  // Offset: slides 100px off the visible edge
  const offScreenOffset = position === 'top' ? -100 : 100

  const translateY = useRef(new Animated.Value(offScreenOffset)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---- Helpers ------------------------------------------------------------

  const clearTimer = useCallback(() => {
    if (dismissTimer.current != null) {
      clearTimeout(dismissTimer.current)
      dismissTimer.current = null
    }
  }, [])

  const animateIn = useCallback(() => {
    translateY.setValue(offScreenOffset)
    opacityAnim.setValue(0)

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 200,
        mass: 0.8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateY, opacityAnim, offScreenOffset])

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: offScreenOffset,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(callback)
    },
    [translateY, opacityAnim, offScreenOffset],
  )

  // ---- Visibility lifecycle -----------------------------------------------

  useEffect(() => {
    if (visible) {
      animateIn()

      // Auto-dismiss timer
      if (duration > 0) {
        clearTimer()
        dismissTimer.current = setTimeout(() => {
          animateOut(() => {
            onDismiss()
          })
        }, duration)
      }
    } else {
      clearTimer()
      animateOut()
    }

    return clearTimer
  }, [visible, duration, animateIn, animateOut, clearTimer, onDismiss])

  // ---- Swipe-to-dismiss PanResponder --------------------------------------

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Capture vertical swipes in the dismiss direction
        if (position === 'top') {
          return gestureState.dy < -8 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        }
        return gestureState.dy > 8 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
      },
      onPanResponderMove: (_, gestureState) => {
        // Allow dragging in dismiss direction only
        if (position === 'top' && gestureState.dy < 0) {
          translateY.setValue(gestureState.dy)
        } else if (position === 'bottom' && gestureState.dy > 0) {
          translateY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const absDistance = Math.abs(gestureState.dy)
        const absVelocity = Math.abs(gestureState.vy)

        if (absDistance > SWIPE_THRESHOLD || absVelocity > 0.5) {
          clearTimer()
          animateOut(() => {
            onDismiss()
          })
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 18,
            stiffness: 200,
          }).start()
        }
      },
    }),
  ).current

  // ---- Action press handler -----------------------------------------------

  const handleActionPress = useCallback(() => {
    clearTimer()
    action?.onPress()
    animateOut(() => {
      onDismiss()
    })
  }, [action, clearTimer, animateOut, onDismiss])

  // ---- Render --------------------------------------------------------------

  if (!visible) return null

  const backgroundColor = VARIANT_COLORS[variant]

  const positionStyles =
    position === 'top'
      ? { top: 56 } // Below status bar / safe area
      : { bottom: 40 } // Above bottom safe area

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyles,
        {
          opacity: opacityAnim,
          transform: [{ translateY }],
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      accessibilityLabel={message}
      {...panResponder.panHandlers}
    >
      <Stack
        backgroundColor={backgroundColor}
        borderRadius={8}
        paddingHorizontal={16}
        paddingVertical={12}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={12}
        minHeight={48}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.2}
        shadowRadius={12}
      >
        {/* Message */}
        <Text
          color="white"
          variant="body3"
          flex={1}
          numberOfLines={2}
        >
          {message}
        </Text>

        {/* Action button */}
        {action != null && (
          <Pressable
            onPress={handleActionPress}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            minWidth={0}
            minHeight={0}
          >
            <Text
              color="white"
              fontWeight="$bold"
              variant="body3"
              textDecorationLine="underline"
            >
              {action.label}
            </Text>
          </Pressable>
        )}
      </Stack>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 9999,
  },
})
