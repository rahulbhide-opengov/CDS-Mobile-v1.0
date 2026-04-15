import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
} from 'react-native'
import { Stack, type GetProps } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Optional native gesture handler (peer dependency -- may not be installed)
// ---------------------------------------------------------------------------

let GestureDetector: React.ComponentType<any> | null = null
let GestureModule: any = null
try {
  const ghModule = require('react-native-gesture-handler')
  GestureDetector = ghModule.GestureDetector ?? null
  GestureModule = ghModule.Gesture ?? null
} catch {
  // react-native-gesture-handler is not installed -- native mode will fall
  // back to the built-in PanResponder implementation.
}

// ---------------------------------------------------------------------------
// Width presets (dp)
// ---------------------------------------------------------------------------

const WIDTH_MAP = {
  sm: 280,
  md: 320,
  lg: 360,
} as const

// Swipe velocity / distance thresholds
const DISMISS_VELOCITY = 0.5
const DISMISS_DISTANCE_RATIO = 0.35

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DrawerProps {
  /** Controls visibility of the drawer. */
  visible: boolean
  /** Called when the drawer should close (backdrop press or swipe). */
  onClose: () => void
  /** Which edge the drawer slides in from. Defaults to "left". */
  anchor?: 'left' | 'right'
  /** Width preset. Defaults to "md". */
  width?: 'sm' | 'md' | 'lg'
  /** Content rendered inside the drawer panel. */
  children: React.ReactNode
  /**
   * When true, attempts to use `react-native-gesture-handler` Gesture.Pan()
   * for smoother, more responsive swipe-to-dismiss instead of the built-in
   * PanResponder. Falls back to PanResponder when the library is not installed.
   *
   * @default false
   */
  native?: boolean
}

// ---------------------------------------------------------------------------
// Drawer
// ---------------------------------------------------------------------------

/**
 * `Drawer` -- side panel that slides in from the left or right edge.
 *
 * Renders inside a React Native `Modal` with a dimmed backdrop. The drawer
 * width is controlled by size presets. Supports swipe-to-dismiss in the
 * anchor direction and backdrop press dismiss. Uses `Animated.spring` for
 * natural slide transitions.
 *
 * @platform Platform-Native (iOS/Android: `react-native-gesture-handler`
 *   Gesture.Pan() for hardware-accelerated gesture recognition)
 */
export function Drawer({
  visible,
  onClose,
  anchor = 'left',
  width = 'md',
  children,
  native = false,
}: DrawerProps) {
  const drawerWidth = WIDTH_MAP[width]

  // The off-screen position: left drawer starts at -drawerWidth, right at +drawerWidth
  const offScreen = anchor === 'left' ? -drawerWidth : drawerWidth
  const onScreen = 0

  const translateX = useRef(new Animated.Value(offScreen)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  // ---- Animation helpers --------------------------------------------------

  const slideIn = useCallback(() => {
    translateX.setValue(offScreen)
    backdropOpacity.setValue(0)

    Animated.parallel([
      Animated.spring(translateX, {
        toValue: onScreen,
        useNativeDriver: true,
        damping: 22,
        stiffness: 200,
        mass: 0.8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateX, backdropOpacity, offScreen, onScreen])

  const slideOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: offScreen,
          useNativeDriver: true,
          damping: 22,
          stiffness: 200,
          mass: 0.8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(callback)
    },
    [translateX, backdropOpacity, offScreen],
  )

  // ---- Visibility lifecycle -----------------------------------------------

  useEffect(() => {
    if (visible) {
      slideIn()
    }
  }, [visible, slideIn])

  // ---- Dismiss handler with exit animation --------------------------------

  const handleDismiss = useCallback(() => {
    slideOut(() => {
      onClose()
    })
  }, [slideOut, onClose])

  // ---- Resolve whether native gesture handler is available -----------------
  const useNativeGesture = native && GestureDetector != null && GestureModule != null && Platform.OS !== 'web'

  // ---- Native Gesture.Pan() for swipe-to-dismiss --------------------------
  const nativeGesture = useMemo(() => {
    if (!useNativeGesture || !GestureModule) return null

    return GestureModule.Pan()
      .activeOffsetX(anchor === 'left' ? -8 : 8)
      .onUpdate((event: any) => {
        if (anchor === 'left' && event.translationX < 0) {
          translateX.setValue(event.translationX)
        } else if (anchor === 'right' && event.translationX > 0) {
          translateX.setValue(event.translationX)
        }
      })
      .onEnd((event: any) => {
        const absDistance = Math.abs(event.translationX)
        const absVelocity = Math.abs(event.velocityX) / 1000 // px/s -> px/ms

        if (
          absVelocity > DISMISS_VELOCITY ||
          absDistance > drawerWidth * DISMISS_DISTANCE_RATIO
        ) {
          handleDismiss()
        } else {
          Animated.spring(translateX, {
            toValue: onScreen,
            useNativeDriver: true,
            damping: 22,
            stiffness: 200,
          }).start()
        }
      })
  }, [useNativeGesture, anchor, translateX, drawerWidth, onScreen, handleDismiss])

  // ---- PanResponder for swipe-to-dismiss (fallback) -----------------------

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Capture horizontal swipes toward the anchor side
        const isHorizontal = Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        if (!isHorizontal || Math.abs(gestureState.dx) < 8) return false

        if (anchor === 'left') {
          return gestureState.dx < 0 // Swipe left to dismiss
        }
        return gestureState.dx > 0 // Swipe right to dismiss
      },
      onPanResponderMove: (_, gestureState) => {
        // Allow dragging toward the anchor edge only
        if (anchor === 'left' && gestureState.dx < 0) {
          translateX.setValue(gestureState.dx)
        } else if (anchor === 'right' && gestureState.dx > 0) {
          translateX.setValue(gestureState.dx)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const absDistance = Math.abs(gestureState.dx)
        const absVelocity = Math.abs(gestureState.vx)

        if (
          absVelocity > DISMISS_VELOCITY ||
          absDistance > drawerWidth * DISMISS_DISTANCE_RATIO
        ) {
          handleDismiss()
        } else {
          // Snap back to open
          Animated.spring(translateX, {
            toValue: onScreen,
            useNativeDriver: true,
            damping: 22,
            stiffness: 200,
          }).start()
        }
      },
    }),
  ).current

  // ---- Render --------------------------------------------------------------

  const drawerPositionStyle =
    anchor === 'left'
      ? { left: 0 }
      : { right: 0 }

  // Wrap the drawer panel in either GestureDetector or PanResponder handlers
  const drawerPanel = (
    <Animated.View
      style={[
        styles.drawer,
        drawerPositionStyle,
        {
          width: drawerWidth,
          transform: [{ translateX }],
        },
      ]}
      accessibilityRole="menu"
      accessibilityLabel={`${anchor === 'left' ? 'Left' : 'Right'} drawer`}
      {...(!useNativeGesture ? panResponder.panHandlers : {})}
    >
      <Stack
        flex={1}
        backgroundColor="$background"
        shadowColor="$shadowColor"
        shadowOffset={{
          width: anchor === 'left' ? 4 : -4,
          height: 0,
        }}
        shadowOpacity={0.15}
        shadowRadius={16}
      >
        {children}
      </Stack>
    </Animated.View>
  )

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleDismiss}
      accessibilityViewIsModal
    >
      {/* Backdrop */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      >
        <Stack
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="black"
          onPress={handleDismiss}
          accessibilityRole="none"
          accessibilityLabel="Close drawer"
        />
      </Animated.View>

      {/* Drawer panel: wrapped in GestureDetector when native, raw otherwise */}
      {useNativeGesture && GestureDetector && nativeGesture ? (
        <GestureDetector gesture={nativeGesture}>
          {drawerPanel}
        </GestureDetector>
      ) : (
        drawerPanel
      )}
    </Modal>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
})
