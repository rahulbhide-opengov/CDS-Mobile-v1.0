import React, { useCallback, useRef, useState } from 'react'
import { TextInput, type TextInputProps, Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'
import { primitive, inputSizes, inputStyles, cornerRadius } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Size presets (Figma Mobile 390 column)
// ---------------------------------------------------------------------------

type TextFieldSize = 'sm' | 'md' | 'lg'

const HEIGHT_MAP: Record<TextFieldSize, number> = {
  sm: inputSizes.small.mobile,   // 32
  md: inputSizes.medium.mobile,  // 40
  lg: inputSizes.large.mobile,   // 48
}

/** Label typography per size (mobile column) */
const LABEL_STYLE: Record<TextFieldSize, { fontSize: number; fontWeight: number; lineHeight: number }> = {
  sm: inputStyles.labelSm.mobile,
  md: inputStyles.labelMd.mobile,
  lg: inputStyles.labelLg.mobile,
}

/** Value typography per size (mobile column) */
const VALUE_STYLE: Record<TextFieldSize, { fontSize: number; fontWeight: number; lineHeight: number }> = {
  sm: inputStyles.valueSm.mobile,
  md: inputStyles.valueMd.mobile,
  lg: inputStyles.valueLg.mobile,
}

/**
 * Padding per size: [top, right, bottom, left]
 * Figma specs: sm=4/12/4/8, md=4/12/4/8, lg=4/12/4/12
 */
const PADDING_MAP: Record<TextFieldSize, [number, number, number, number]> = {
  sm: [4, 12, 4, 8],
  md: [4, 12, 4, 8],
  lg: [4, 12, 4, 12],
}

// Border radius: Figma corner radius "small" = 4px
const INPUT_BORDER_RADIUS = cornerRadius.small // 4

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const TextFieldContainer = styled(VStack, {
  name: 'TextFieldContainer',
  gap: '$1',
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
  /** Size preset controlling height and typography. Defaults to "md". */
  size?: TextFieldSize
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
  size = 'md',
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
      hasError ? primitive.red600 : primitive.slate700, // Figma: error=red600, default=slate700
      hasError ? primitive.red600 : primitive.blurple700, // Figma: error=red600, focused=blurple700
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
          fontSize={LABEL_STYLE[size].fontSize}
          fontWeight={LABEL_STYLE[size].fontWeight as any}
          lineHeight={LABEL_STYLE[size].lineHeight}
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
            borderRadius: variant === 'filled' ? 0 : INPUT_BORDER_RADIUS,
            borderTopLeftRadius: INPUT_BORDER_RADIUS,
            borderTopRightRadius: INPUT_BORDER_RADIUS,
            borderWidth: variant === 'filled' ? 0 : animatedBorderWidth,
            borderBottomWidth: animatedBorderWidth,
            borderColor: animatedBorderColor,
            backgroundColor: disabled
              ? primitive.neutral100
              : variant === 'filled'
                ? primitive.neutral100
                : primitive.white,
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            paddingTop: PADDING_MAP[size][0],
            paddingRight: PADDING_MAP[size][1],
            paddingBottom: PADDING_MAP[size][2],
            paddingLeft: PADDING_MAP[size][3],
            minHeight: multiline
              ? HEIGHT_MAP[size] * Math.max(numberOfLines, 1)
              : HEIGHT_MAP[size],
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
            fontSize: VALUE_STYLE[size].fontSize,
            fontWeight: String(VALUE_STYLE[size].fontWeight) as '400' | '500',
            lineHeight: VALUE_STYLE[size].lineHeight,
            fontFamily: 'DM Sans',
            color: disabled ? primitive.neutral400 : primitive.neutral900,
            padding: 0,
            margin: 0,
            textAlignVertical: multiline ? 'top' : 'center',
            minHeight: multiline
              ? VALUE_STYLE[size].lineHeight * Math.max(numberOfLines, 1)
              : undefined,
          }}
          value={value}
          onChangeText={disabled ? undefined : onChangeText}
          placeholder={placeholder}
          placeholderTextColor={primitive.neutral400} // neutral400 / placeholderColor
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
                fontSize={inputStyles.helper.mobile.fontSize}
                fontWeight={inputStyles.helper.mobile.fontWeight as any}
                lineHeight={inputStyles.helper.mobile.lineHeight}
                color="$errorColor"
                accessibilityLiveRegion="polite"
              >
                {errorText}
              </Text>
            )}
            {errorText == null && helperText != null && (
              <Text
                fontSize={inputStyles.description.mobile.fontSize}
                fontWeight={inputStyles.description.mobile.fontWeight as any}
                lineHeight={inputStyles.description.mobile.lineHeight}
                color="$colorSecondary"
              >
                {helperText}
              </Text>
            )}
          </Stack>
          {showCharacterCount && maxLength != null && (
            <Text
              fontSize={inputStyles.helper.mobile.fontSize}
              fontWeight={inputStyles.helper.mobile.fontWeight as any}
              lineHeight={inputStyles.helper.mobile.lineHeight}
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
