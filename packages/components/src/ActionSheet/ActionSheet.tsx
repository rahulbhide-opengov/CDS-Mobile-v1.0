import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, VStack, Pressable } from '@opengov/cds-primitives'

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
 */
export function ActionSheet({
  visible,
  onClose,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
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
