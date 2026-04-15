import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Optional native bottom sheet (peer dependency -- may not be installed)
// ---------------------------------------------------------------------------

let GorhomBottomSheet: React.ComponentType<any> | null = null
let GorhomBottomSheetView: React.ComponentType<any> | null = null
try {
  const mod = require('@gorhom/bottom-sheet')
  GorhomBottomSheet = mod.default ?? mod.BottomSheet ?? null
  GorhomBottomSheetView = mod.BottomSheetView ?? null
} catch {
  // @gorhom/bottom-sheet is not installed -- native mode will fall back to
  // the custom PanResponder-based implementation.
}

// ---------------------------------------------------------------------------
// Snap-point height percentages
// ---------------------------------------------------------------------------

const SNAP_POINTS = {
  quarter: 0.25,
  half: 0.5,
  threeQuarter: 0.75,
  full: 0.9,
} as const

// Velocity threshold for swipe-to-dismiss (px/ms)
const DISMISS_VELOCITY = 0.5
// Distance threshold -- if dragged more than 30% of sheet height, dismiss
const DISMISS_DISTANCE_RATIO = 0.3

// ---------------------------------------------------------------------------
// Styled handle bar
// ---------------------------------------------------------------------------

const HandleBar = styled(Stack, {
  name: 'BottomSheetHandle',
  width: 32,
  height: 4,
  borderRadius: '$full',
  backgroundColor: '$colorSecondary',
  alignSelf: 'center',
  marginTop: '$2',
  marginBottom: '$3',
  opacity: 0.4,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BottomSheetProps {
  /** Controls the visibility of the bottom sheet. */
  visible: boolean
  /** Called when the sheet should close (backdrop press or swipe-down). */
  onClose: () => void
  /** Height snap point. Defaults to "half". */
  snapPoint?: 'quarter' | 'half' | 'threeQuarter' | 'full'
  /** Whether to show the drag handle bar at the top. Defaults to true. */
  showHandle?: boolean
  /** Whether to show the backdrop overlay. Defaults to true. */
  showBackdrop?: boolean
  /** Content rendered inside the bottom sheet. */
  children: React.ReactNode
  /**
   * When true, attempts to use `@gorhom/bottom-sheet` for a native-gesture-
   * driven bottom sheet with smooth reanimated transitions. Falls back to the
   * custom PanResponder implementation when the library is not installed.
   *
   * @default false
   */
  native?: boolean
}

// ---------------------------------------------------------------------------
// BottomSheet
// ---------------------------------------------------------------------------

/**
 * `BottomSheet` -- gesture-aware modal sheet that slides up from the bottom.
 *
 * Renders inside a React Native `Modal` with a transparent background. The
 * sheet height is driven by snap points (25%, 50%, 75%, 90% of screen).
 * Supports swipe-down-to-dismiss via PanResponder and backdrop press dismiss.
 * Uses `Animated.spring` for smooth entrance and exit transitions.
 *
 * @platform Platform-Native (iOS/Android: `@gorhom/bottom-sheet` with
 *   Reanimated-powered gestures and smooth snap-point transitions)
 */
export function BottomSheet({
  visible,
  onClose,
  snapPoint = 'half',
  showHandle = true,
  showBackdrop = true,
  children,
  native = false,
}: BottomSheetProps) {
  // Resolve whether the native bottom sheet is actually usable
  const useNativeSheet = native && GorhomBottomSheet != null && Platform.OS !== 'web'
  const screenHeight = Dimensions.get('window').height
  const sheetHeight = screenHeight * SNAP_POINTS[snapPoint]

  // Animated values
  const translateY = useRef(new Animated.Value(sheetHeight)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  // Track whether the modal was previously visible for exit animation
  const wasVisible = useRef(false)

  // ---- Slide animation helpers --------------------------------------------

  const slideIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
        mass: 0.8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateY, backdropOpacity])

  const slideOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: sheetHeight,
          useNativeDriver: true,
          damping: 20,
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
    [translateY, backdropOpacity, sheetHeight],
  )

  // ---- Visibility lifecycle -----------------------------------------------

  useEffect(() => {
    if (visible) {
      // Reset to off-screen, then slide in
      translateY.setValue(sheetHeight)
      backdropOpacity.setValue(0)
      slideIn()
      wasVisible.current = true
    }
  }, [visible, sheetHeight, translateY, backdropOpacity, slideIn])

  // ---- Dismiss handler (with exit animation) ------------------------------

  const handleDismiss = useCallback(() => {
    slideOut(() => {
      onClose()
    })
  }, [slideOut, onClose])

  // ---- PanResponder for swipe-to-dismiss ----------------------------------

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only capture downward vertical gestures
        return gestureState.dy > 8 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow dragging downward (positive dy)
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocity = gestureState.vy
        const distance = gestureState.dy

        // Dismiss if swiped fast enough or far enough
        if (
          velocity > DISMISS_VELOCITY ||
          distance > sheetHeight * DISMISS_DISTANCE_RATIO
        ) {
          handleDismiss()
        } else {
          // Snap back to open position
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
          }).start()
        }
      },
    }),
  ).current

  // ---- Snap points for @gorhom/bottom-sheet --------------------------------
  const gorhomSnapPoints = useMemo(() => {
    const pct = `${Math.round(SNAP_POINTS[snapPoint] * 100)}%`
    return [pct]
  }, [snapPoint])

  // Ref for the gorhom bottom sheet imperative API
  const gorhomRef = useRef<any>(null)

  // Open/close the gorhom sheet when visibility changes
  useEffect(() => {
    if (!useNativeSheet || !gorhomRef.current) return
    if (visible) {
      gorhomRef.current.snapToIndex(0)
    } else {
      gorhomRef.current.close()
    }
  }, [visible, useNativeSheet])

  // ---- Render (native @gorhom/bottom-sheet path) --------------------------

  if (useNativeSheet && GorhomBottomSheet) {
    const NativeSheet = GorhomBottomSheet
    const NativeView = GorhomBottomSheetView

    return (
      <NativeSheet
        ref={gorhomRef}
        index={visible ? 0 : -1}
        snapPoints={gorhomSnapPoints}
        enablePanDownToClose
        onClose={onClose}
        handleIndicatorStyle={{ backgroundColor: primitive.gray300 }}
        backgroundStyle={{ backgroundColor: primitive.white }}
        enableHandlePanningGesture={showHandle}
        accessibilityLabel="Bottom sheet"
      >
        {NativeView ? (
          <NativeView style={{ flex: 1 }}>
            {children}
          </NativeView>
        ) : (
          children
        )}
      </NativeSheet>
    )
  }

  // ---- Render (custom PanResponder path) ----------------------------------

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
      {showBackdrop && (
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropOpacity },
          ]}
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
            accessibilityLabel="Close bottom sheet"
          />
        </Animated.View>
      )}

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetHeight,
            transform: [{ translateY }],
          },
        ]}
        accessibilityRole="none"
        accessibilityLabel="Bottom sheet"
        {...panResponder.panHandlers}
      >
        <Stack
          backgroundColor="$background"
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
          flex={1}
          overflow="hidden"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: -4 }}
          shadowOpacity={0.15}
          shadowRadius={16}
        >
          {/* Handle */}
          {showHandle && (
            <Stack
              alignItems="center"
              paddingTop={8}
              paddingBottom={4}
              accessibilityRole="adjustable"
              accessibilityLabel="Drag handle. Swipe down to close."
              accessibilityHint="Swipe down to dismiss the bottom sheet"
            >
              <HandleBar />
            </Stack>
          )}

          {/* Content */}
          <Stack flex={1} overflow="hidden">
            {children}
          </Stack>
        </Stack>
      </Animated.View>
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
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
})
