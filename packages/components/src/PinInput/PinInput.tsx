/**
 * PinInput -- CDS 37 PIN code entry component
 *
 * A numeric-only PIN input that renders filled/empty circles (dot style)
 * with a hidden TextInput capturing keyboard entry. Designed for secure
 * code entry flows such as authentication, verification, and lock screens.
 *
 * Visual spec:
 *   - Empty circle: 16px diameter, gray300 border (1.5px), transparent fill
 *   - Filled circle: 16px diameter, blurple700 fill, no border
 *   - Error circle: 16px diameter, red600 fill
 *   - Gap: 16px between circles
 *   - Disabled: 38% opacity on entire component
 *   - Error: shake animation (Animated translateX)
 *
 * Accessibility:
 *   - Single hidden TextInput with keyboardType="number-pad"
 *   - secureTextEntry always enabled on the native input
 *   - Touch anywhere on the component to focus the input
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Pressable,
  TextInput,
  StyleSheet,
  type TextInputKeyPressEventData,
  type NativeSyntheticEvent,
  Platform,
} from 'react-native'
import { Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive, baseStyles } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Circle diameter in pixels */
const CIRCLE_SIZE = 16

/** Spacing between circles */
const CIRCLE_GAP = 16

/** Border width for empty circles */
const CIRCLE_BORDER_WIDTH = 1.5

/** Disabled state opacity -- matches CDS 37 Figma spec */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Shake animation: pixels to translate */
const SHAKE_DISTANCE = 10

/** Shake animation: duration of one oscillation in ms */
const SHAKE_DURATION = 60

/** Shake animation: number of oscillations */
const SHAKE_COUNT = 4

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PinInputProps {
  /** Number of PIN digits. Defaults to 4. */
  length?: number
  /** Current PIN value (controlled). */
  value?: string
  /** Called on every character change. */
  onChangeText?: (text: string) => void
  /** Called when all digits are entered. Receives the complete PIN string. */
  onComplete?: (pin: string) => void
  /** Always true -- PIN display uses filled circles. Kept for API symmetry. Defaults to true. */
  secureEntry?: boolean
  /** Whether the input is in an error state. Triggers red circles and shake. */
  error?: boolean
  /** Error message displayed below the circles. */
  errorText?: string
  /** Disables the input -- applies 38% opacity per CDS 37 spec. */
  disabled?: boolean
  /** Whether to auto-focus the hidden input on mount. Defaults to false. */
  autoFocus?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Shake animation helper
// ---------------------------------------------------------------------------

function useShakeAnimation() {
  const translateX = useRef(new Animated.Value(0)).current

  const shake = useCallback(() => {
    // Build a sequence: right, left, right, left, ... center
    const sequence: Animated.CompositeAnimation[] = []
    for (let i = 0; i < SHAKE_COUNT; i++) {
      sequence.push(
        Animated.timing(translateX, {
          toValue: SHAKE_DISTANCE,
          duration: SHAKE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -SHAKE_DISTANCE,
          duration: SHAKE_DURATION,
          useNativeDriver: true,
        }),
      )
    }
    // Return to center
    sequence.push(
      Animated.timing(translateX, {
        toValue: 0,
        duration: SHAKE_DURATION,
        useNativeDriver: true,
      }),
    )

    Animated.sequence(sequence).start()
  }, [translateX])

  return { translateX, shake }
}

// ---------------------------------------------------------------------------
// PinCircle -- individual dot indicator
// ---------------------------------------------------------------------------

interface PinCircleProps {
  filled: boolean
  error: boolean
}

const PinCircle = React.memo(function PinCircle({ filled, error }: PinCircleProps) {
  const circleStyle = useMemo(() => {
    if (error && filled) {
      return {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: primitive.red600,
        borderWidth: 0,
      }
    }
    if (error && !filled) {
      return {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: 'transparent',
        borderWidth: CIRCLE_BORDER_WIDTH,
        borderColor: primitive.red600,
      }
    }
    if (filled) {
      return {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: primitive.blurple700,
        borderWidth: 0,
      }
    }
    // Empty, no error
    return {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      backgroundColor: 'transparent',
      borderWidth: CIRCLE_BORDER_WIDTH,
      borderColor: primitive.gray300,
    }
  }, [filled, error])

  return <Stack style={circleStyle} />
})

// ---------------------------------------------------------------------------
// PinInput component
// ---------------------------------------------------------------------------

export const PinInput = React.memo(function PinInput({
  length = 4,
  value: controlledValue,
  onChangeText,
  onComplete,
  secureEntry = true,
  error = false,
  errorText,
  disabled = false,
  autoFocus = false,
  accessibilityLabel,
  testID,
}: PinInputProps) {
  // Internal state for uncontrolled usage
  const [internalValue, setInternalValue] = useState('')
  const inputRef = useRef<TextInput>(null)
  const { translateX, shake } = useShakeAnimation()
  const prevErrorRef = useRef(error)

  // Determine the active value (controlled vs uncontrolled)
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue

  // Trigger shake when error transitions from false to true
  useEffect(() => {
    if (error && !prevErrorRef.current) {
      shake()
    }
    prevErrorRef.current = error
  }, [error, shake])

  // Focus the hidden input when the user taps the circles
  const handleContainerPress = useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  // Handle text changes from the hidden input
  const handleChange = useCallback(
    (text: string) => {
      // Filter to numeric only and clamp to length
      const numeric = text.replace(/[^0-9]/g, '').slice(0, length)

      if (controlledValue === undefined) {
        setInternalValue(numeric)
      }
      onChangeText?.(numeric)

      if (numeric.length === length) {
        onComplete?.(numeric)
      }
    },
    [length, controlledValue, onChangeText, onComplete],
  )

  // Derive the accessibility label
  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    const filledCount = currentValue.length
    if (error && errorText) {
      return `PIN input, ${filledCount} of ${length} digits entered. Error: ${errorText}`
    }
    return `PIN input, ${filledCount} of ${length} digits entered`
  }, [accessibilityLabel, currentValue.length, length, error, errorText])

  // Render circles
  const circles = useMemo(() => {
    const items: React.ReactNode[] = []
    for (let i = 0; i < length; i++) {
      items.push(
        <PinCircle key={i} filled={i < currentValue.length} error={error} />,
      )
    }
    return items
  }, [length, currentValue.length, error])

  return (
    <Stack
      alignItems="center"
      opacity={disabled ? DISABLED_OPACITY : 1}
      testID={testID}
    >
      {/* Touchable area wrapping the circles */}
      <Pressable
        onPress={handleContainerPress}
        disabled={disabled}
        accessibilityRole="none"
        style={styles.pressable}
      >
        <Animated.View
          style={[styles.circlesRow, { transform: [{ translateX }] }]}
        >
          {circles}
        </Animated.View>
      </Pressable>

      {/* Hidden TextInput for keyboard capture */}
      <TextInput
        ref={inputRef}
        value={currentValue}
        onChangeText={handleChange}
        keyboardType="number-pad"
        secureTextEntry={secureEntry}
        maxLength={length}
        autoFocus={autoFocus}
        editable={!disabled}
        caretHidden
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
        style={styles.hiddenInput}
        accessibilityLabel={a11yLabel}
        accessibilityRole="text"
        accessibilityState={{
          disabled,
        }}
        testID={testID ? `${testID}-input` : undefined}
      />

      {/* Error text */}
      {error && errorText ? (
        <TamaguiText
          fontFamily="$body"
          fontSize={baseStyles.caption.mobile.fontSize}
          fontWeight={String(baseStyles.caption.mobile.fontWeight) as '400'}
          lineHeight={baseStyles.caption.mobile.lineHeight}
          letterSpacing={baseStyles.caption.mobile.letterSpacing}
          color={primitive.red600}
          marginTop={8}
          accessibilityRole="alert"
          testID={testID ? `${testID}-error` : undefined}
        >
          {errorText}
        </TamaguiText>
      ) : null}
    </Stack>
  )
})

PinInput.displayName = 'PinInput'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    // Minimum touch target per WCAG
    minHeight: 44,
    paddingHorizontal: 16,
  },
  circlesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CIRCLE_GAP,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
    // On web, push it off screen to avoid layout interference
    ...(Platform.OS === 'web'
      ? { left: -9999 }
      : {}),
  },
})
