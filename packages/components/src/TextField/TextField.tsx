import React, { useCallback, useRef, useState } from 'react'
import { TextInput, type TextInputProps, Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const TextFieldContainer = styled(VStack, {
  name: 'TextFieldContainer',
  gap: '$1',
})

const InputFrame = styled(Stack, {
  name: 'TextFieldFrame',
  borderRadius: '$md',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$2',
  minHeight: 44,

  variants: {
    variant: {
      outlined: {
        borderWidth: 1,
        borderColor: '$borderColor',
        backgroundColor: '$background',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
      },
      filled: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '$borderColor',
        backgroundColor: '$backgroundStrong',
        paddingHorizontal: '$3',
        paddingVertical: '$2',
        borderTopLeftRadius: '$md',
        borderTopRightRadius: '$md',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    focused: {
      true: {},
    },
    error: {
      true: {},
    },
    disabled: {
      true: {
        backgroundColor: '$backgroundStrong',
        borderColor: '$borderColorDisabled',
        opacity: 0.6,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'outlined',
  },
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TextFieldProps {
  /** Floating or static label above the input */
  label?: string
  /** Placeholder text shown when the input is empty */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Called on every text change */
  onChangeText?: (text: string) => void
  /** Visual variant */
  variant?: 'outlined' | 'filled'
  /** Whether the field is in an error state */
  error?: boolean
  /** Error message displayed below the input (also sets error state) */
  errorText?: string
  /** Helper message displayed below the input */
  helperText?: string
  /** Disabled state -- prevents editing and dims the control */
  disabled?: boolean
  /** Multi-line / textarea mode */
  multiline?: boolean
  /** Number of visible lines when multiline is true */
  numberOfLines?: number
  /** Maximum character count */
  maxLength?: number
  /** Show a live character count indicator */
  showCharacterCount?: boolean
  /** Icon placed before the input text */
  leadingIcon?: React.ReactNode
  /** Icon placed after the input text */
  trailingIcon?: React.ReactNode
  /** Show a clear button when the input has content */
  clearable?: boolean
  /** Called when the clear button is pressed */
  onClear?: () => void
  /** Keyboard return key type */
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send'
  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url'
  /** Auto-capitalize behavior */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  /** Mask input for passwords */
  secureTextEntry?: boolean
  /** Auto-complete hint for the platform */
  autoComplete?: TextInputProps['autoComplete']
  /** Called when the input receives focus */
  onFocus?: () => void
  /** Called when the input loses focus */
  onBlur?: () => void
  /** Override accessibility label (defaults to label prop) */
  accessibilityLabel?: string
  /** Additional accessibility hint */
  accessibilityHint?: string
  /** Called when the submit / return key is pressed */
  onSubmitEditing?: () => void
  /** React ref forwarded to the underlying TextInput */
  inputRef?: React.Ref<TextInput>
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TextField({
  label,
  placeholder,
  value = '',
  onChangeText,
  variant = 'outlined',
  error = false,
  errorText,
  helperText,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  showCharacterCount = false,
  leadingIcon,
  trailingIcon,
  clearable = false,
  onClear,
  returnKeyType,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
  autoComplete,
  onFocus,
  onBlur,
  accessibilityLabel,
  accessibilityHint,
  onSubmitEditing,
  inputRef,
}: TextFieldProps) {
  // ---- Local state ----------------------------------------------------------
  const [isFocused, setIsFocused] = useState(false)
  const internalRef = useRef<TextInput>(null)
  const ref = (inputRef as React.RefObject<TextInput>) ?? internalRef

  // Animated border width/color via an Animated.Value that drives interpolation
  const focusAnim = useRef(new Animated.Value(0)).current

  const hasError = error || !!errorText
  const characterCount = value.length

  // ---- Handlers -------------------------------------------------------------

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
    onFocus?.()
  }, [focusAnim, onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
    onBlur?.()
  }, [focusAnim, onBlur])

  const handleClear = useCallback(() => {
    onChangeText?.('')
    onClear?.()
    // Refocus the input after clearing
    ;(ref as React.RefObject<TextInput>)?.current?.focus()
  }, [onChangeText, onClear, ref])

  const handleContainerPress = useCallback(() => {
    if (!disabled) {
      ;(ref as React.RefObject<TextInput>)?.current?.focus()
    }
  }, [disabled, ref])

  // ---- Derived border styles ------------------------------------------------
  // We compute the animated border color and width outside Tamagui's static
  // system so that focus/error transitions are smooth on native.

  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      hasError ? '#991F1F' : '#EEEEEE', // neutral200 / red700
      hasError ? '#991F1F' : '#4B3FFF',  // red700 / primary
    ],
  })

  const animatedBorderWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [hasError ? 2 : 1, 2],
  })

  // ---- Helper / Error / Count row -------------------------------------------

  const showBottomRow = !!errorText || !!helperText || (showCharacterCount && maxLength != null)
  const showClearButton = clearable && value.length > 0 && !disabled

  // ---- Render ---------------------------------------------------------------

  return (
    <TextFieldContainer>
      {/* Label */}
      {label != null && (
        <Text
          variant="body3"
          fontWeight="$medium"
          color={hasError ? '$errorColor' : disabled ? '$colorDisabled' : '$color'}
          marginBottom="$0.5"
        >
          {label}
        </Text>
      )}

      {/* Input row -- wrapped in Animated.View for border animation */}
      <Animated.View
        style={[
          {
            borderRadius: variant === 'filled' ? 0 : 4,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderWidth: variant === 'filled' ? 0 : animatedBorderWidth,
            borderBottomWidth: animatedBorderWidth,
            borderColor: animatedBorderColor,
            backgroundColor: disabled
              ? '#F5F5F5' // neutral100
              : variant === 'filled'
                ? '#F5F5F5' // neutral100 / backgroundStrong
                : '#FFFFFF',
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            minHeight: multiline ? 44 * Math.max(numberOfLines, 1) : 44,
            gap: 8,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        accessible={false}
      >
        {/* Leading icon */}
        {leadingIcon != null && (
          <Stack justifyContent="center" alignItems="center" width={20} height={20}>
            {leadingIcon}
          </Stack>
        )}

        {/* TextInput */}
        <TextInput
          ref={ref as React.RefObject<TextInput>}
          style={{
            flex: 1,
            fontSize: 16,
            fontFamily: 'System',
            color: disabled ? '#BDBDBD' : '#212121', // neutral400 / neutral1000
            padding: 0,
            margin: 0,
            textAlignVertical: multiline ? 'top' : 'center',
            minHeight: multiline ? 20 * Math.max(numberOfLines, 1) : undefined,
          }}
          value={value}
          onChangeText={disabled ? undefined : onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD" // neutral400 / placeholderColor
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          autoComplete={autoComplete}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={accessibilityHint}
          accessibilityState={{
            disabled,
          }}
          // Links label semantically to the input
          accessible
        />

        {/* Clear button */}
        {showClearButton && (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear text"
            minWidth={24}
            minHeight={24}
            alignItems="center"
            justifyContent="center"
          >
            {/* X icon rendered with styled Stacks */}
            <Stack width={16} height={16} alignItems="center" justifyContent="center">
              <Stack
                width={12}
                height={2}
                backgroundColor="$colorSecondary"
                borderRadius="$full"
                position="absolute"
                transform={[{ rotate: '45deg' }]}
              />
              <Stack
                width={12}
                height={2}
                backgroundColor="$colorSecondary"
                borderRadius="$full"
                position="absolute"
                transform={[{ rotate: '-45deg' }]}
              />
            </Stack>
          </Pressable>
        )}

        {/* Trailing icon */}
        {trailingIcon != null && (
          <Stack justifyContent="center" alignItems="center" width={20} height={20}>
            {trailingIcon}
          </Stack>
        )}
      </Animated.View>

      {/* Bottom row: helper text / error text / character count */}
      {showBottomRow && (
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          paddingTop="$0.5"
          gap="$2"
        >
          <Stack flex={1}>
            {errorText != null && (
              <Text
                variant="caption"
                color="$errorColor"
                accessibilityLiveRegion="polite"
              >
                {errorText}
              </Text>
            )}
            {errorText == null && helperText != null && (
              <Text variant="caption" color="$colorSecondary">
                {helperText}
              </Text>
            )}
          </Stack>
          {showCharacterCount && maxLength != null && (
            <Text
              variant="caption"
              color={characterCount >= maxLength ? '$errorColor' : '$colorSecondary'}
            >
              {characterCount}/{maxLength}
            </Text>
          )}
        </HStack>
      )}
    </TextFieldContainer>
  )
}
