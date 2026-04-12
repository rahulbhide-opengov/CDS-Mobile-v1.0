import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing, Modal, StyleSheet } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Size presets (width in dp)
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: 280,
  md: 340,
  lg: 400,
} as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DialogProps {
  /** Controls visibility of the dialog. */
  visible: boolean
  /** Called when the dialog should close. */
  onClose: () => void
  /** Title text rendered at the top of the dialog. */
  title?: string
  /** Descriptive body text rendered below the title. */
  description?: string
  /** Size preset controlling dialog width. Defaults to "md". */
  size?: 'sm' | 'md' | 'lg'
  /** Action buttons rendered in a trailing row at the bottom. */
  actions?: React.ReactNode
  /** Whether pressing the backdrop dismisses the dialog. Defaults to true. */
  closeOnBackdrop?: boolean
  /** Arbitrary content rendered between description and actions. */
  children?: React.ReactNode
}

// ---------------------------------------------------------------------------
// Dialog
// ---------------------------------------------------------------------------

/**
 * `Dialog` -- centered modal dialog with animated scale entrance.
 *
 * Renders inside a React Native `Modal` with a semi-transparent backdrop.
 * Supports title, description, custom children, and an action button row.
 * Entrance is an animated scale + fade; exit reverses the animation before
 * invoking `onClose`.
 */
export function Dialog({
  visible,
  onClose,
  title,
  description,
  size = 'md',
  actions,
  closeOnBackdrop = true,
  children,
}: DialogProps) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current
  const opacityAnim = useRef(new Animated.Value(0)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  const width = SIZE_MAP[size]

  // ---- Entrance / Exit animations -----------------------------------------

  const animateIn = useCallback(() => {
    scaleAnim.setValue(0.85)
    opacityAnim.setValue(0)
    backdropOpacity.setValue(0)

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 18,
        stiffness: 220,
        mass: 0.7,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [scaleAnim, opacityAnim, backdropOpacity])

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(callback)
    },
    [scaleAnim, opacityAnim, backdropOpacity],
  )

  useEffect(() => {
    if (visible) {
      animateIn()
    }
  }, [visible, animateIn])

  // ---- Dismiss handler with exit animation --------------------------------

  const handleDismiss = useCallback(() => {
    animateOut(() => {
      onClose()
    })
  }, [animateOut, onClose])

  const handleBackdropPress = useCallback(() => {
    if (closeOnBackdrop) {
      handleDismiss()
    }
  }, [closeOnBackdrop, handleDismiss])

  // ---- Render --------------------------------------------------------------

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
          onPress={handleBackdropPress}
          accessibilityRole="none"
          accessibilityLabel="Close dialog"
        />
      </Animated.View>

      {/* Centered container */}
      <Animated.View
        style={[
          styles.centeredContainer,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
        // Prevent press-through to backdrop
        pointerEvents="box-none"
      >
        <Stack
          width={width}
          maxWidth="90%"
          backgroundColor="$background"
          borderRadius={8}
          padding={24}
          gap={12}
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 8 }}
          shadowOpacity={0.15}
          shadowRadius={24}
          accessibilityRole="alert"
          accessibilityLabel={title ? `Dialog: ${title}` : 'Dialog'}
        >
          {/* Title */}
          {title != null && (
            <Text
              variant="h3"
              accessibilityRole="header"
            >
              {title}
            </Text>
          )}

          {/* Description */}
          {description != null && (
            <Text variant="body2" color="$colorSecondary">
              {description}
            </Text>
          )}

          {/* Custom content */}
          {children}

          {/* Action buttons */}
          {actions != null && (
            <HStack
              justifyContent="flex-end"
              gap={8}
              marginTop={8}
            >
              {actions}
            </HStack>
          )}
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
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
