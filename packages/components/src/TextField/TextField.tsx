import React, { useCallback, useRef, useState } from 'react'
import { TextInput, type TextInputProps, Animated, Easing, View } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'
import { primitive, inputSizes, inputStyles, cornerRadius, semantic } from '@opengov/cds-tokens'

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
const VALUE_STYLE: Record<TextFieldSize, { fontSize: number; fontWeight: number; lineHeight: number; letterSpacing: number }> = {
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
// Figma semantic border colors (CDS 37, node 14866:130693)
// ---------------------------------------------------------------------------

/** Idle (Placeholder): outlined/enabledBorder */
const BORDER_IDLE_PLACEHOLDER = semantic.outlinedEnabledBorder   // rgba(0,0,0,0.12)
/** Idle (Filled / has value): standard/enabledBorder */
const BORDER_IDLE_FILLED = semantic.standardEnabledBorder        // rgba(0,0,0,0.25)
/** Hover: black_states/outlinedBorder */
const BORDER_HOVER = semantic.blackStatesOutlinedBorder          // rgba(0,0,0,0.5)
/** Error: error/main */
const BORDER_ERROR = primitive.red600                            // #D33423
/** Success: success/main */
const BORDER_SUCCESS = primitive.green700                        // #037730
/** Disabled: same as idle placeholder */
const BORDER_DISABLED = semantic.outlinedEnabledBorder           // rgba(0,0,0,0.12)
/** ReadOnly: same as idle placeholder */
const BORDER_READONLY = semantic.outlinedEnabledBorder           // rgba(0,0,0,0.12)

// Figma background states
const BG_DEFAULT = primitive.white                               // #FFFFFF
const BG_DISABLED = primitive.gray100                            // #F2F2F2
const BG_READONLY = semantic.primaryStatesSelected               // rgba(75,63,255,0.08)

// Figma text colors
const PLACEHOLDER_COLOR = semantic.textDisabled                  // rgba(0,0,0,0.38)
const TEXT_COLOR = semantic.textPrimary                          // rgba(0,0,0,0.87)
const DISABLED_TEXT_COLOR = semantic.textDisabled                 // rgba(0,0,0,0.38)
const ERROR_TEXT_COLOR = primitive.red700                         // #B12525 (error/dark)
const SUCCESS_TEXT_COLOR = primitive.green700                     // #037730 (success/main)
const HELPER_TEXT_COLOR = semantic.textSecondary                  // rgba(0,0,0,0.6)

// Focus ring: Figma 2px border, blurple, 8px radius, offset -5px
const FOCUS_RING_COLOR = primitive.blurple700                    // #4B3FFF
const FOCUS_RING_WIDTH = 2
const FOCUS_RING_RADIUS = 8
const FOCUS_RING_OFFSET = 5 // inset from input edge

// Icon sizes: Figma 16px for status/left/right icons in TextField
const ICON_SIZE = 16

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
  /** Whether the field is in a success state */
  success?: boolean
  /** Success message displayed below the input (also sets success state) */
  successText?: string
  /** Helper message displayed below the input */
  helperText?: string
  /** Disabled state -- prevents editing and dims the control */
  disabled?: boolean
  /** Read-only state -- displays value but prevents editing. Uses blurple-tinted bg. */
  readOnly?: boolean
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
  /** Show a focus ring around the input when focused (Figma: 2px blurple, 8px radius) */
  showFocusRing?: boolean
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
// Inline status icons (Figma: 16px, matching codebase Stack pattern)
// ---------------------------------------------------------------------------

/** Alert-circle icon for error state (16px) */
function AlertCircleIcon({ color }: { color: string }) {
  return (
    <Stack width={ICON_SIZE} height={ICON_SIZE} alignItems="center" justifyContent="center">
      {/* Outer circle */}
      <Stack
        width={14}
        height={14}
        borderRadius={7}
        borderWidth={1.5}
        borderColor={color}
        position="absolute"
      />
      {/* Exclamation line */}
      <Stack
        width={1.5}
        height={5}
        backgroundColor={color}
        borderRadius={0.75}
        position="absolute"
        top={4}
      />
      {/* Exclamation dot */}
      <Stack
        width={1.5}
        height={1.5}
        backgroundColor={color}
        borderRadius={0.75}
        position="absolute"
        bottom={3.5}
      />
    </Stack>
  )
}

/** Check-circle icon for success state (16px) */
function CheckCircleIcon({ color }: { color: string }) {
  return (
    <Stack width={ICON_SIZE} height={ICON_SIZE} alignItems="center" justifyContent="center">
      {/* Outer circle */}
      <Stack
        width={14}
        height={14}
        borderRadius={7}
        borderWidth={1.5}
        borderColor={color}
        position="absolute"
      />
      {/* Checkmark -- simplified as two rotated lines */}
      <Stack
        width={3}
        height={1.5}
        backgroundColor={color}
        borderRadius={0.75}
        position="absolute"
        top={7}
        left={3.5}
        transform={[{ rotate: '45deg' }]}
      />
      <Stack
        width={6}
        height={1.5}
        backgroundColor={color}
        borderRadius={0.75}
        position="absolute"
        top={6}
        left={5}
        transform={[{ rotate: '-45deg' }]}
      />
    </Stack>
  )
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
  success = false,
  successText,
  helperText,
  disabled = false,
  readOnly = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  showCharacterCount = false,
  leadingIcon,
  trailingIcon,
  clearable = false,
  onClear,
  showFocusRing = false,
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
  const hasSuccess = success || !!successText
  const characterCount = value.length
  const isEditable = !disabled && !readOnly

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
    if (isEditable) {
      ;(ref as React.RefObject<TextInput>)?.current?.focus()
    }
  }, [isEditable, ref])

  // ---- Derived border styles ------------------------------------------------
  // Border colors per Figma CDS 37 node 14866:130693:
  //   Idle (placeholder): rgba(0,0,0,0.12) -- outlinedEnabledBorder
  //   Idle (filled/value): rgba(0,0,0,0.25) -- standardEnabledBorder
  //   Error: #D33423 (red600) -- error/main
  //   Success: #037730 (green700) -- success/main
  //   Disabled: rgba(0,0,0,0.12) -- same as idle placeholder
  //   ReadOnly: rgba(0,0,0,0.12) -- same as idle placeholder
  //   Focused: #4B3FFF (blurple700) -- primary/main

  const getIdleBorderColor = () => {
    if (hasError) return BORDER_ERROR
    if (hasSuccess) return BORDER_SUCCESS
    if (disabled) return BORDER_DISABLED
    if (readOnly) return BORDER_READONLY
    // Has value = standard/enabledBorder, empty = outlined/enabledBorder
    return value.length > 0 ? BORDER_IDLE_FILLED : BORDER_IDLE_PLACEHOLDER
  }

  const getFocusedBorderColor = () => {
    if (hasError) return BORDER_ERROR
    if (hasSuccess) return BORDER_SUCCESS
    return primitive.blurple700
  }

  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [getIdleBorderColor(), getFocusedBorderColor()],
  })

  const animatedBorderWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [(hasError || hasSuccess) ? 2 : 1, 2],
  })

  // ---- Helper / Error / Success / Count row ---------------------------------

  const showBottomRow = !!errorText || !!successText || !!helperText || (showCharacterCount && maxLength != null)
  const showClearButton = clearable && value.length > 0 && isEditable

  // ---- Render ---------------------------------------------------------------

  return (
    <TextFieldContainer>
      {/* Label */}
      {label != null && (
        <Text
          fontSize={LABEL_STYLE[size].fontSize}
          fontWeight={LABEL_STYLE[size].fontWeight as any}
          lineHeight={LABEL_STYLE[size].lineHeight}
          letterSpacing={0.15}
          color={hasError ? ERROR_TEXT_COLOR : disabled ? DISABLED_TEXT_COLOR : TEXT_COLOR}
          marginBottom="$0.5"
        >
          {label}
        </Text>
      )}

      {/* Focus ring wrapper -- Figma: 2px blurple, 8px radius, offset -5px */}
      <View
        style={
          showFocusRing && isFocused
            ? {
                borderWidth: FOCUS_RING_WIDTH,
                borderColor: FOCUS_RING_COLOR,
                borderRadius: FOCUS_RING_RADIUS,
                padding: FOCUS_RING_OFFSET - FOCUS_RING_WIDTH, // net inset
              }
            : undefined
        }
      >
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
              // Figma background by state:
              //   Default: white, Disabled: #F2F2F2, ReadOnly: rgba(75,63,255,0.08)
              backgroundColor: disabled
                ? BG_DISABLED
                : readOnly
                  ? BG_READONLY
                  : BG_DEFAULT,
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
              // Figma: no opacity reduction on disabled -- bg color change handles it
              opacity: 1,
            },
          ]}
          accessible={false}
        >
          {/* Leading icon -- Figma: 16px */}
          {leadingIcon != null && (
            <Stack justifyContent="center" alignItems="center" width={ICON_SIZE} height={ICON_SIZE}>
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
              letterSpacing: VALUE_STYLE[size].letterSpacing,
              fontFamily: 'DM Sans',
              color: disabled ? DISABLED_TEXT_COLOR : TEXT_COLOR,
              padding: 0,
              margin: 0,
              textAlignVertical: multiline ? 'top' : 'center',
              minHeight: multiline
                ? VALUE_STYLE[size].lineHeight * Math.max(numberOfLines, 1)
                : undefined,
            }}
            value={value}
            onChangeText={isEditable ? onChangeText : undefined}
            placeholder={placeholder}
            placeholderTextColor={PLACEHOLDER_COLOR} // Figma text/disabled rgba(0,0,0,0.38)
            editable={isEditable}
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
              {/* X icon rendered with styled Stacks -- 16px */}
              <Stack width={ICON_SIZE} height={ICON_SIZE} alignItems="center" justifyContent="center">
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

          {/* Trailing icon -- Figma: 16px */}
          {trailingIcon != null && (
            <Stack justifyContent="center" alignItems="center" width={ICON_SIZE} height={ICON_SIZE}>
              {trailingIcon}
            </Stack>
          )}
        </Animated.View>
      </View>

      {/* Bottom row: error / success / helper text / character count */}
      {showBottomRow && (
        <HStack
          justifyContent="space-between"
          alignItems="flex-start"
          paddingTop="$0.5"
          gap="$2"
        >
          <Stack flex={1}>
            {/* Error text: 12px/500/Medium, #B12525, with alert-circle icon */}
            {errorText != null && (
              <HStack alignItems="center" gap="$1">
                <AlertCircleIcon color={ERROR_TEXT_COLOR} />
                <Text
                  fontSize={inputStyles.helper.mobile.fontSize}
                  fontWeight={inputStyles.helper.mobile.fontWeight as any}
                  lineHeight={inputStyles.helper.mobile.lineHeight}
                  color={ERROR_TEXT_COLOR}
                  accessibilityLiveRegion="polite"
                >
                  {errorText}
                </Text>
              </HStack>
            )}
            {/* Success text: 12px/500/Medium, #037730, with check-circle icon */}
            {errorText == null && successText != null && (
              <HStack alignItems="center" gap="$1">
                <CheckCircleIcon color={SUCCESS_TEXT_COLOR} />
                <Text
                  fontSize={inputStyles.helper.mobile.fontSize}
                  fontWeight={inputStyles.helper.mobile.fontWeight as any}
                  lineHeight={inputStyles.helper.mobile.lineHeight}
                  color={SUCCESS_TEXT_COLOR}
                  accessibilityLiveRegion="polite"
                >
                  {successText}
                </Text>
              </HStack>
            )}
            {/* Helper text: 12px/400/Regular, rgba(0,0,0,0.6) */}
            {errorText == null && successText == null && helperText != null && (
              <Text
                fontSize={inputStyles.description.mobile.fontSize}
                fontWeight={inputStyles.description.mobile.fontWeight as any}
                lineHeight={inputStyles.description.mobile.lineHeight}
                letterSpacing={inputStyles.description.mobile.letterSpacing}
                color={HELPER_TEXT_COLOR}
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
              color={characterCount >= maxLength ? ERROR_TEXT_COLOR : HELPER_TEXT_COLOR}
            >
              {characterCount}/{maxLength}
            </Text>
          )}
        </HStack>
      )}
    </TextFieldContainer>
  )
}
