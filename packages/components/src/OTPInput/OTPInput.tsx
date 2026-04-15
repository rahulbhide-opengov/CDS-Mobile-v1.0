/**
 * OTPInput -- CDS 37 Figma-accurate implementation
 *
 * One-time password / verification code input with individual digit boxes.
 *
 * Features:
 *   - Configurable length (default 6)
 *   - Individual box sizing: sm=40x40, md=48x48, lg=56x56
 *   - Auto-advance on digit entry, backspace returns to previous box
 *   - Clipboard paste support fills all boxes
 *   - Secure mode shows dots instead of digits
 *   - Variants: outlined (border) and filled (gray background)
 *   - Error state with error text
 *   - Accessible: each box is a TextInput with maxLength=1
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native'
import { Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BOX_RADIUS = 4
const BOX_GAP = 8
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Box dimensions per size */
const BOX_SIZE_MAP: Record<OTPInputSize, number> = {
  sm: 40,
  md: 48,
  lg: 56,
}

/** Font size per box size */
const FONT_SIZE_MAP: Record<OTPInputSize, number> = {
  sm: 18,
  md: 20,
  lg: 24,
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type OTPInputSize = 'sm' | 'md' | 'lg'
export type OTPInputVariant = 'outlined' | 'filled'

export interface OTPInputProps {
  /** Number of OTP digit boxes. Defaults to 6. */
  length?: number
  /** Current OTP value as a string */
  value?: string
  /** Called on every change with the full OTP string */
  onChangeText?: (text: string) => void
  /** Called when all digits are filled */
  onComplete?: (code: string) => void
  /** Auto-focus the first box on mount */
  autoFocus?: boolean
  /** Visual variant. Defaults to "outlined". */
  variant?: OTPInputVariant
  /** Size preset. Defaults to "md". */
  size?: OTPInputSize
  /** Whether the input is in an error state */
  error?: boolean
  /** Error message displayed below the boxes */
  errorText?: string
  /** Show dots instead of digits */
  secureEntry?: boolean
  /** Disables all boxes -- applies 38% opacity per Figma spec. */
  disabled?: boolean
  /** Accessibility label for the OTP input group */
  accessibilityLabel?: string
  /** Test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Single digit box
// ---------------------------------------------------------------------------

interface DigitBoxProps {
  index: number
  digit: string
  isFocused: boolean
  variant: OTPInputVariant
  size: OTPInputSize
  error: boolean
  secureEntry: boolean
  disabled: boolean
  inputRef: (el: TextInput | null) => void
  onChangeDigit: (index: number, text: string) => void
  onKeyPress: (index: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void
  onFocus: (index: number) => void
  onPaste: (index: number, text: string) => void
  testID?: string
}

const DigitBox = React.memo(function DigitBox({
  index,
  digit,
  isFocused,
  variant,
  size,
  error,
  secureEntry,
  disabled,
  inputRef,
  onChangeDigit,
  onKeyPress,
  onFocus,
  onPaste,
  testID,
}: DigitBoxProps) {
  const boxSize = BOX_SIZE_MAP[size]
  const fontSize = FONT_SIZE_MAP[size]

  // Animated border for focus state
  const focusAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [isFocused, focusAnim])

  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      error ? primitive.red600 : primitive.slate700,
      error ? primitive.red600 : primitive.blurple700,
    ],
  })

  const animatedBorderWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? 2 : 1, 2],
  })

  const backgroundColor =
    variant === 'filled'
      ? isFocused
        ? primitive.white
        : primitive.gray100
      : primitive.white

  const handleTextChange = useCallback(
    (text: string) => {
      // Filter to digits only
      const cleaned = text.replace(/[^0-9]/g, '')
      if (cleaned.length > 1) {
        // Paste detected -- delegate to parent
        onPaste(index, cleaned)
        return
      }
      onChangeDigit(index, cleaned)
    },
    [index, onChangeDigit, onPaste],
  )

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      onKeyPress(index, e)
    },
    [index, onKeyPress],
  )

  const handleFocus = useCallback(() => {
    onFocus(index)
  }, [index, onFocus])

  const displayValue = useMemo(() => {
    if (!digit) return ''
    if (secureEntry) return '\u2022' // bullet
    return digit
  }, [digit, secureEntry])

  return (
    <Animated.View
      style={{
        width: boxSize,
        height: boxSize,
        borderRadius: BOX_RADIUS,
        borderWidth: variant === 'outlined' ? animatedBorderWidth : isFocused ? animatedBorderWidth : 0,
        borderColor: variant === 'outlined' ? animatedBorderColor : isFocused ? animatedBorderColor : 'transparent',
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <TextInput
        ref={inputRef}
        value={secureEntry && digit ? '\u2022' : digit}
        onChangeText={handleTextChange}
        onKeyPress={handleKeyPress}
        onFocus={handleFocus}
        maxLength={1}
        keyboardType="number-pad"
        editable={!disabled}
        selectTextOnFocus
        caretHidden
        textContentType="oneTimeCode"
        autoComplete={index === 0 ? 'sms-otp' : 'off'}
        accessibilityLabel={`Digit ${index + 1}`}
        accessibilityHint={`Enter digit ${index + 1} of verification code`}
        testID={testID ? `${testID}-box-${index}` : undefined}
        style={{
          width: boxSize,
          height: boxSize,
          textAlign: 'center',
          fontSize,
          fontWeight: '600',
          fontFamily: 'DM Sans',
          color: error ? primitive.red600 : primitive.slate900,
          padding: 0,
          margin: 0,
        }}
      />
    </Animated.View>
  )
})

// ---------------------------------------------------------------------------
// OTPInput component
// ---------------------------------------------------------------------------

export const OTPInput = React.memo(function OTPInput({
  length = 6,
  value = '',
  onChangeText,
  onComplete,
  autoFocus = false,
  variant = 'outlined',
  size = 'md',
  error = false,
  errorText,
  secureEntry = false,
  disabled = false,
  accessibilityLabel,
  testID,
}: OTPInputProps) {
  // ---- Refs ----------------------------------------------------------------
  const inputRefs = useRef<(TextInput | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const hasError = error || !!errorText

  // ---- Derived digit array -------------------------------------------------
  const digits = useMemo(() => {
    const arr: string[] = []
    for (let i = 0; i < length; i++) {
      arr.push(value[i] ?? '')
    }
    return arr
  }, [value, length])

  // ---- Auto-focus on mount -------------------------------------------------
  useEffect(() => {
    if (autoFocus && !disabled) {
      // Small delay to ensure refs are mounted
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [autoFocus, disabled])

  // ---- Focus management ----------------------------------------------------
  const focusBox = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    },
    [length],
  )

  // ---- Value update helper -------------------------------------------------
  const updateValue = useCallback(
    (newDigits: string[]) => {
      const newValue = newDigits.join('')
      onChangeText?.(newValue)
      if (newValue.length === length && !newDigits.includes('')) {
        onComplete?.(newValue)
      }
    },
    [length, onChangeText, onComplete],
  )

  // ---- Handlers ------------------------------------------------------------
  const handleChangeDigit = useCallback(
    (index: number, text: string) => {
      const newDigits = [...digits]
      newDigits[index] = text
      updateValue(newDigits)

      // Auto-advance to next box
      if (text && index < length - 1) {
        focusBox(index + 1)
      }
    },
    [digits, length, updateValue, focusBox],
  )

  const handleKeyPress = useCallback(
    (index: number, e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      const key = e.nativeEvent.key

      if (key === 'Backspace') {
        if (digits[index] === '' && index > 0) {
          // Current box is empty -- move to previous and clear it
          const newDigits = [...digits]
          newDigits[index - 1] = ''
          updateValue(newDigits)
          focusBox(index - 1)
        } else {
          // Clear current box
          const newDigits = [...digits]
          newDigits[index] = ''
          updateValue(newDigits)
        }
      }
    },
    [digits, updateValue, focusBox],
  )

  const handleFocus = useCallback((index: number) => {
    setFocusedIndex(index)
  }, [])

  const handlePaste = useCallback(
    (startIndex: number, pastedText: string) => {
      const pastedDigits = pastedText.replace(/[^0-9]/g, '').split('')
      const newDigits = [...digits]

      for (let i = 0; i < pastedDigits.length && startIndex + i < length; i++) {
        newDigits[startIndex + i] = pastedDigits[i]
      }

      updateValue(newDigits)

      // Focus the last filled box or the next empty one
      const lastFilledIndex = Math.min(startIndex + pastedDigits.length - 1, length - 1)
      const nextEmpty = newDigits.findIndex((d, i) => i > lastFilledIndex && d === '')
      focusBox(nextEmpty >= 0 ? nextEmpty : lastFilledIndex)
    },
    [digits, length, updateValue, focusBox],
  )

  // ---- Ref setters (stable callback refs for each index) -------------------
  const refCallbacks = useRef<((el: TextInput | null) => void)[]>([])
  if (refCallbacks.current.length !== length) {
    refCallbacks.current = Array.from({ length }, (_, i) => (el: TextInput | null) => {
      inputRefs.current[i] = el
    })
  }
  const setRef = useCallback(
    (index: number) => refCallbacks.current[index],
    [length],
  )

  // ---- Render --------------------------------------------------------------
  return (
    <View
      style={{ opacity: disabled ? DISABLED_OPACITY : 1 }}
      testID={testID}
    >
      {/* Digit boxes row */}
      <View
        style={{
          flexDirection: 'row',
          gap: BOX_GAP,
          justifyContent: 'center',
        }}
        accessibilityRole="none"
        accessibilityLabel={accessibilityLabel ?? `${length}-digit verification code`}
      >
        {digits.map((digit, index) => (
          <DigitBox
            key={index}
            index={index}
            digit={digit}
            isFocused={focusedIndex === index}
            variant={variant}
            size={size}
            error={hasError}
            secureEntry={secureEntry}
            disabled={disabled}
            inputRef={setRef(index)}
            onChangeDigit={handleChangeDigit}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            onPaste={handlePaste}
            testID={testID}
          />
        ))}
      </View>

      {/* Error text */}
      {errorText != null && (
        <TamaguiText
          fontSize={12}
          fontWeight="500"
          lineHeight={20}
          color={primitive.red600}
          textAlign="center"
          marginTop={8}
          accessibilityLiveRegion="polite"
        >
          {errorText}
        </TamaguiText>
      )}
    </View>
  )
})

OTPInput.displayName = 'OTPInput'
