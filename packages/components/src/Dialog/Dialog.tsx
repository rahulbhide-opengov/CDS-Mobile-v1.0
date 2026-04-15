import React, { useCallback, useEffect, useRef } from 'react'
import { Alert, Animated, Easing, Modal, Platform, StyleSheet } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'
import { primitive } from '@opengov/cds-tokens'

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

/**
 * Configuration for a button rendered in the native `Alert.alert()` dialog.
 * Used only when `useNativeAlert={true}`.
 */
export interface DialogNativeButton {
  /** Button label text. */
  text: string
  /** Called when the button is pressed. */
  onPress?: () => void
  /**
   * Button style hint for the native alert.
   * - "default" -- standard button
   * - "cancel"  -- bold cancel button (iOS)
   * - "destructive" -- red destructive button (iOS)
   */
  style?: 'default' | 'cancel' | 'destructive'
}

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
  /**
   * When true, uses React Native's built-in `Alert.alert()` for a platform-
   * native dialog experience (iOS UIAlertController / Android AlertDialog).
   * Only works for simple title + description + button dialogs. Custom
   * `children` content is ignored in native mode.
   *
   * Provide `nativeButtons` to define the alert buttons; otherwise a single
   * "OK" button that calls `onClose` is used.
   *
   * @default false
   */
  useNativeAlert?: boolean
  /**
   * Buttons to display when `useNativeAlert={true}`. Each entry maps to a
   * native `Alert.alert()` button with an optional style hint.
   */
  nativeButtons?: DialogNativeButton[]
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
 *
 * @platform Platform-Native (iOS: UIAlertController, Android: AlertDialog)
 *   When `useNativeAlert={true}`, uses React Native's built-in `Alert.alert()`
 *   for simple title + description + buttons dialogs.
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
  useNativeAlert = false,
  nativeButtons,
}: DialogProps) {
  // ---- Native Alert.alert() intercept -------------------------------------
  // When useNativeAlert is enabled, we show the platform's native alert
  // dialog instead of rendering the custom Modal. This effect fires when
  // visible becomes true and short-circuits the rest of the component.

  const nativeAlertShown = useRef(false)

  useEffect(() => {
    if (!useNativeAlert || !visible) {
      nativeAlertShown.current = false
      return
    }

    // Avoid showing multiple alerts for the same visibility cycle
    if (nativeAlertShown.current) return
    nativeAlertShown.current = true

    const alertButtons: Array<{
      text: string
      onPress?: () => void
      style?: 'default' | 'cancel' | 'destructive'
    }> = nativeButtons
      ? nativeButtons.map((btn) => ({
          text: btn.text,
          onPress: () => {
            btn.onPress?.()
            onClose()
          },
          style: btn.style ?? 'default',
        }))
      : [{ text: 'OK', onPress: onClose, style: 'default' as const }]

    Alert.alert(title ?? '', description ?? '', alertButtons, {
      cancelable: closeOnBackdrop,
      onDismiss: onClose,
    })
  }, [visible, useNativeAlert, title, description, nativeButtons, closeOnBackdrop, onClose])

  // When using native alert, do not render the custom Modal at all
  if (useNativeAlert) {
    return null
  }

  // ---- Custom Modal implementation ----------------------------------------
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
