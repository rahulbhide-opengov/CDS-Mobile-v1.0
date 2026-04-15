import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, VStack, Pressable } from '@opengov/cds-primitives'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Optional native action sheet (peer dependency -- may not be installed)
// ---------------------------------------------------------------------------

let showNativeActionSheet: ((
  options: string[],
  callback: (index: number) => void,
  params?: Record<string, any>,
) => void) | null = null

try {
  const actionSheetModule = require('@expo/react-native-action-sheet')
  // The package exports a hook, but for imperative use outside a provider we
  // need the standalone `showActionSheetWithOptions` utility.
  if (actionSheetModule.showActionSheetWithOptions) {
    showNativeActionSheet = (labels, callback, params) => {
      actionSheetModule.showActionSheetWithOptions(
        { options: labels, ...params },
        callback,
      )
    }
  }
} catch {
  // @expo/react-native-action-sheet is not installed -- native mode will
  // fall back to the custom CDS ActionSheet implementation.
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ActionSheetOption {
  /** Label text for the action. */
  label: string
  /** Called when this option is pressed. */
  onPress: () => void
  /** Whether this is a destructive/dangerous action (renders in red). */
  destructive?: boolean
  /** Whether this option is disabled (dimmed, not pressable). */
  disabled?: boolean
  /** Optional leading icon. */
  icon?: React.ReactNode
}

export interface ActionSheetProps {
  /** Controls visibility of the action sheet. */
  visible: boolean
  /** Called when the action sheet should close. */
  onClose: () => void
  /** Optional title displayed at the top of the action group. */
  title?: string
  /** Optional message displayed below the title. */
  message?: string
  /** List of action options. */
  options: ActionSheetOption[]
  /** Label for the cancel button. Defaults to "Cancel". */
  cancelLabel?: string
  /**
   * When true and on iOS, attempts to use `@expo/react-native-action-sheet`
   * for a platform-native UIAlertController action sheet. Falls back to the
   * custom CDS implementation when the library is not installed, on Android,
   * or on web.
   *
   * @default false
   */
  native?: boolean
}

// ---------------------------------------------------------------------------
// ActionSheet
// ---------------------------------------------------------------------------

/**
 * `ActionSheet` -- iOS-style action list that slides up from the bottom.
 *
 * Renders a grouped list of actions inside a Modal with a dimmed backdrop.
 * The main option group and the cancel button are visually separated with
 * a gap, following the iOS action sheet pattern. Options support destructive
 * styling, disabled state, and optional leading icons. The sheet slides up
 * with a spring animation and slides down on dismiss.
 *
 * @platform Platform-Native (iOS: UIAlertController action sheet via
 *   `@expo/react-native-action-sheet`; Android: custom CDS implementation)
 */
export function ActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
  native = false,
}: ActionSheetProps) {
  const translateY = useRef(new Animated.Value(400)).current
  const backdropOpacity = useRef(new Animated.Value(0)).current

  // ---- Animation helpers --------------------------------------------------

  const slideIn = useCallback(() => {
    translateY.setValue(400)
    backdropOpacity.setValue(0)

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
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
  }, [translateY, backdropOpacity])

  const slideOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 400,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(callback)
    },
    [translateY, backdropOpacity],
  )

  // ---- Native iOS action sheet intercept -----------------------------------
  // When native=true on iOS and the native library is available, we bypass
  // the custom Modal entirely and delegate to the platform UIAlertController.

  const nativeHandled = useRef(false)

  useEffect(() => {
    if (
      visible &&
      native &&
      Platform.OS === 'ios' &&
      showNativeActionSheet != null
    ) {
      nativeHandled.current = true

      // Build the options list: user options + cancel at the end
      const labels = options.map((o) => o.label)
      labels.push(cancelLabel)

      const destructiveIndices = options
        .map((o, i) => (o.destructive ? i : -1))
        .filter((i) => i >= 0)

      const disabledIndices = options
        .map((o, i) => (o.disabled ? i : -1))
        .filter((i) => i >= 0)

      showNativeActionSheet!(
        labels,
        (selectedIndex: number) => {
          if (selectedIndex === options.length) {
            // Cancel was pressed
            onClose()
          } else if (selectedIndex >= 0 && selectedIndex < options.length) {
            const option = options[selectedIndex]
            if (!option.disabled) {
              option.onPress()
            }
            onClose()
          } else {
            onClose()
          }
          nativeHandled.current = false
        },
        {
          title: title ?? undefined,
          message: message ?? undefined,
          cancelButtonIndex: options.length,
          destructiveButtonIndex: destructiveIndices.length === 1
            ? destructiveIndices[0]
            : destructiveIndices.length > 1
              ? destructiveIndices
              : undefined,
          disabledButtonIndices: disabledIndices.length > 0 ? disabledIndices : undefined,
          tintColor: primitive.blurple700,
        },
      )
      return
    }

    nativeHandled.current = false
  }, [visible, native, options, cancelLabel, title, message, onClose])

  // ---- Visibility lifecycle -----------------------------------------------

  useEffect(() => {
    if (visible && !nativeHandled.current) {
      slideIn()
    }
  }, [visible, slideIn])

  // If native handled this render cycle, don't show the custom modal
  if (native && Platform.OS === 'ios' && showNativeActionSheet != null) {
    return null
  }

  // ---- Dismiss handler with exit animation --------------------------------

  const handleDismiss = useCallback(() => {
    slideOut(() => {
      onClose()
    })
  }, [slideOut, onClose])

  // ---- Option press handler -----------------------------------------------

  const handleOptionPress = useCallback(
    (option: ActionSheetOption) => {
      if (option.disabled) return

      slideOut(() => {
        option.onPress()
        onClose()
      })
    },
    [slideOut, onClose],
  )

  // ---- Render --------------------------------------------------------------

  const hasHeader = title != null || message != null

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
          accessibilityLabel="Close action sheet"
        />
      </Animated.View>

      {/* Action sheet container */}
      <Animated.View
        style={[
          styles.sheetContainer,
          { transform: [{ translateY }] },
        ]}
        accessibilityRole="menu"
        accessibilityLabel={title ? `Action sheet: ${title}` : 'Action sheet'}
      >
        {/* Main options group */}
        <Stack
          backgroundColor="$background"
          borderRadius={14}
          overflow="hidden"
        >
          {/* Header: title and message */}
          {hasHeader && (
            <Stack
              paddingVertical={14}
              paddingHorizontal={16}
              alignItems="center"
              borderBottomWidth={StyleSheet.hairlineWidth}
              borderBottomColor="$borderColor"
            >
              {title != null && (
                <Text
                  variant="body3"
                  fontWeight="$semibold"
                  color="$color"
                  textAlign="center"
                >
                  {title}
                </Text>
              )}
              {message != null && (
                <Text
                  variant="caption"
                  color="$colorSecondary"
                  textAlign="center"
                  marginTop={4}
                >
                  {message}
                </Text>
              )}
            </Stack>
          )}

          {/* Option items */}
          <ScrollView
            bounces={false}
            style={{ maxHeight: Dimensions.get('window').height * 0.5 }}
          >
            {options.map((option, index) => {
              const isLast = index === options.length - 1

              return (
                <Pressable
                  key={index}
                  onPress={() => handleOptionPress(option)}
                  disabled={option.disabled}
                  accessibilityRole="menuitem"
                  accessibilityLabel={option.label}
                  accessibilityState={{ disabled: option.disabled }}
                  minWidth={0}
                  minHeight={0}
                >
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={12}
                    paddingVertical={16}
                    paddingHorizontal={16}
                    minHeight={56}
                    borderBottomWidth={isLast ? 0 : StyleSheet.hairlineWidth}
                    borderBottomColor="$borderColor"
                    opacity={option.disabled ? 0.4 : 1}
                    pressStyle={
                      option.disabled
                        ? undefined
                        : { backgroundColor: '$backgroundPress' }
                    }
                  >
                    {/* Leading icon */}
                    {option.icon != null && (
                      <Stack width={24} height={24} alignItems="center" justifyContent="center">
                        {option.icon}
                      </Stack>
                    )}

                    {/* Label */}
                    <Text
                      variant="body2"
                      color={
                        option.disabled
                          ? '$colorDisabled'
                          : option.destructive
                            ? '$errorColor'
                            : '$brandBackground'
                      }
                      textAlign="center"
                    >
                      {option.label}
                    </Text>
                  </Stack>
                </Pressable>
              )
            })}
          </ScrollView>
        </Stack>

        {/* Cancel button -- separated from options group */}
        <Pressable
          onPress={handleDismiss}
          accessibilityRole="button"
          accessibilityLabel={cancelLabel}
          minWidth={0}
          minHeight={0}
        >
          <Stack
            backgroundColor="$background"
            borderRadius={14}
            paddingVertical={16}
            paddingHorizontal={16}
            alignItems="center"
            justifyContent="center"
            minHeight={56}
            pressStyle={{ backgroundColor: '$backgroundPress' }}
          >
            <Text
              variant="body2"
              fontWeight="$bold"
              color="$brandBackground"
            >
              {cancelLabel}
            </Text>
          </Stack>
        </Pressable>
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
  sheetContainer: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 34, // Safe area bottom inset
    gap: 8,
  },
})
