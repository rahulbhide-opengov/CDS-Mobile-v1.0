/**
 * Select -- CDS 37 Figma-accurate dropdown select
 *
 * Standalone dropdown select for single or multiple option selection.
 * Trigger styling mirrors TextField (outlined input with chevron icon).
 *
 * Sizes follow Figma Input Mobile (390) column:
 *   Small:  32px
 *   Medium: 40px
 *   Large:  48px
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 *
 * @platform Platform-Native (iOS: `@react-native-picker/picker` native wheel
 *   for small option lists on iOS when `native={true}` and options.length <= 10.
 *   The trigger always remains the custom CDS TextField-style control.)
 */

import React, { useCallback, useMemo, useState } from 'react'
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { Stack } from '@tamagui/core'
import { Text, VStack, HStack, Pressable } from '@opengov/cds-primitives'
import { primitive, inputSizes, inputStyles, cornerRadius } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Optional native picker (peer dependency -- may not be installed)
// ---------------------------------------------------------------------------

let NativePicker: React.ComponentType<any> | null = null
let NativePickerItem: React.ComponentType<any> | null = null
try {
  const pickerMod = require('@react-native-picker/picker')
  NativePicker = pickerMod.Picker ?? null
  NativePickerItem = pickerMod.Picker?.Item ?? null
} catch {
  // @react-native-picker/picker is not installed -- native mode will fall
  // back to the custom CDS dropdown implementation.
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INPUT_BORDER_RADIUS = cornerRadius.small // 4
const DROPDOWN_RADIUS = cornerRadius.medium   // 8
const OPTION_HEIGHT = 48                       // mobile touch target
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38
const MIN_TOUCH_TARGET = 44

// ---------------------------------------------------------------------------
// Size presets (Figma Mobile 390 column)
// ---------------------------------------------------------------------------

type SelectSize = 'sm' | 'md' | 'lg'

const HEIGHT_MAP: Record<SelectSize, number> = {
  sm: inputSizes.small.mobile,   // 32
  md: inputSizes.medium.mobile,  // 40
  lg: inputSizes.large.mobile,   // 48
}

const VALUE_STYLE: Record<SelectSize, { fontSize: number; fontWeight: number; lineHeight: number }> = {
  sm: inputStyles.valueSm.mobile,
  md: inputStyles.valueMd.mobile,
  lg: inputStyles.valueLg.mobile,
}

const LABEL_STYLE: Record<SelectSize, { fontSize: number; fontWeight: number; lineHeight: number }> = {
  sm: inputStyles.labelSm.mobile,
  md: inputStyles.labelMd.mobile,
  lg: inputStyles.labelLg.mobile,
}

const PADDING_MAP: Record<SelectSize, [number, number, number, number]> = {
  sm: [4, 12, 4, 8],
  md: [4, 12, 4, 8],
  lg: [4, 12, 4, 12],
}

// ---------------------------------------------------------------------------
// Inline icons (no SVG dependency -- Stack composition pattern)
// ---------------------------------------------------------------------------

function ChevronDownIcon({ color = primitive.slate700, size = 20 }: { color?: string; size?: number }) {
  const armLen = size * 0.4
  const stroke = 2
  return (
    <Stack width={size} height={size} alignItems="center" justifyContent="center">
      <Stack
        width={armLen}
        height={stroke}
        backgroundColor={color}
        borderRadius={1}
        position="absolute"
        transform={[{ rotate: '45deg' }]}
        left={size * 0.15}
        top={size * 0.42}
      />
      <Stack
        width={armLen}
        height={stroke}
        backgroundColor={color}
        borderRadius={1}
        position="absolute"
        transform={[{ rotate: '-45deg' }]}
        right={size * 0.15}
        top={size * 0.42}
      />
    </Stack>
  )
}

function CheckIcon({ color = primitive.blurple700 }: { color?: string }) {
  return (
    <Stack width={16} height={12} alignItems="center" justifyContent="center" transform={[{ rotate: '-45deg' }]} marginTop={-2}>
      <Stack position="absolute" bottom={0} left={0} width={12} height={2} backgroundColor={color} borderRadius={1} />
      <Stack position="absolute" bottom={0} left={0} width={2} height={8} backgroundColor={color} borderRadius={1} />
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  /** Currently selected value (string for single, string[] for multiple). */
  value?: string | string[]
  /** Called when selection changes. */
  onValueChange?: (value: string | string[]) => void
  /** Array of selectable options. */
  options: SelectOption[]
  /** Placeholder text shown when no value is selected. */
  placeholder?: string
  /** Label text displayed above the select trigger. */
  label?: string
  /** Size preset controlling height and typography. Defaults to "md". */
  size?: SelectSize
  /** Visual variant. Defaults to "outlined". */
  variant?: 'outlined' | 'filled'
  /** Whether the field is in an error state. */
  error?: boolean
  /** Error message displayed below the select (also sets error state). */
  errorText?: string
  /** Helper message displayed below the select. */
  helperText?: string
  /** Disabled state -- prevents interaction and dims the control. */
  disabled?: boolean
  /** Enable multiple selection. Defaults to false. */
  multiple?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
  /**
   * When true, on iOS with 10 or fewer options (single-select only), uses
   * `@react-native-picker/picker` to render a native iOS wheel picker.
   * The trigger control always stays as the custom CDS TextField-style.
   * Falls back to the custom dropdown when the library is not installed,
   * on Android, on web, or for multiple-select / large option sets.
   *
   * @default false
   */
  native?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Maximum options count for native iOS wheel picker */
const NATIVE_PICKER_MAX_OPTIONS = 10

export const Select = React.memo(function Select({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  label,
  size = 'md',
  variant = 'outlined',
  error = false,
  errorText,
  helperText,
  disabled = false,
  multiple = false,
  accessibilityLabel,
  testID,
  native = false,
}: SelectProps) {
  // Resolve whether the native iOS picker should be used
  const useNativePicker =
    native &&
    !multiple &&
    Platform.OS === 'ios' &&
    NativePicker != null &&
    NativePickerItem != null &&
    options.length <= NATIVE_PICKER_MAX_OPTIONS
  const [isOpen, setIsOpen] = useState(false)
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const hasError = error || !!errorText
  const height = HEIGHT_MAP[size]
  const valueStyle = VALUE_STYLE[size]
  const labelStyle = LABEL_STYLE[size]
  const padding = PADDING_MAP[size]

  // Normalize value to array for unified handling
  const selectedValues = useMemo(() => {
    if (!value) return [] as string[]
    return Array.isArray(value) ? value : [value]
  }, [value])

  // Derive display text
  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return ''
    const labels = selectedValues
      .map((v) => options.find((o) => o.value === v)?.label)
      .filter(Boolean)
    return labels.join(', ')
  }, [selectedValues, options])

  // Border color logic
  const borderColor = useMemo(() => {
    if (hasError) return primitive.red600
    if (isOpen) return primitive.blurple700
    return primitive.slate700
  }, [hasError, isOpen])

  const borderWidth = isOpen ? 2 : 1

  // ---- Handlers ------------------------------------------------------------

  const handleOpen = useCallback(() => {
    if (disabled) return
    setIsOpen(true)
  }, [disabled])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleOptionPress = useCallback(
    (optionValue: string) => {
      if (multiple) {
        const next = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue]
        onValueChange?.(next)
      } else {
        onValueChange?.(optionValue)
        setIsOpen(false)
      }
    },
    [multiple, selectedValues, onValueChange],
  )

  // Handler for native iOS picker value change
  const handleNativePickerChange = useCallback(
    (itemValue: string) => {
      onValueChange?.(itemValue)
      setIsOpen(false)
    },
    [onValueChange],
  )

  // ---- hitSlop for small trigger sizes ------------------------------------

  const hitSlop = useMemo(() => {
    if (height >= MIN_TOUCH_TARGET) return undefined
    const pad = Math.ceil((MIN_TOUCH_TARGET - height) / 2)
    return { top: pad, bottom: pad, left: 0, right: 0 }
  }, [height])

  // ---- Render option item -------------------------------------------------

  const renderOption = useCallback(
    ({ item }: { item: SelectOption }) => {
      const isSelected = selectedValues.includes(item.value)
      const isOptionDisabled = item.disabled
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => !isOptionDisabled && handleOptionPress(item.value)}
          disabled={isOptionDisabled}
          accessibilityRole="menuitem"
          accessibilityState={{ selected: isSelected, disabled: isOptionDisabled }}
          accessibilityLabel={item.label}
        >
          <HStack
            height={OPTION_HEIGHT}
            paddingHorizontal={16}
            alignItems="center"
            backgroundColor={isSelected ? primitive.blurple50 : 'transparent'}
            opacity={isOptionDisabled ? DISABLED_OPACITY : 1}
            gap={12}
          >
            <Text
              flex={1}
              fontSize={14}
              fontWeight={isSelected ? '500' : '400'}
              lineHeight={20}
              color={isSelected ? primitive.blurple700 : primitive.slate900}
              fontFamily="DM Sans"
            >
              {item.label}
            </Text>
            {isSelected && <CheckIcon color={primitive.blurple700} />}
          </HStack>
        </TouchableOpacity>
      )
    },
    [selectedValues, handleOptionPress],
  )

  const keyExtractor = useCallback((item: SelectOption) => item.value, [])

  // ---- a11y label ----------------------------------------------------------

  const a11yLabel = accessibilityLabel ?? label ?? placeholder

  // ---- Render --------------------------------------------------------------

  return (
    <VStack gap={4} testID={testID}>
      {/* Label */}
      {label != null && (
        <Text
          fontSize={labelStyle.fontSize}
          fontWeight={String(labelStyle.fontWeight) as '400'}
          lineHeight={labelStyle.lineHeight}
          color={hasError ? primitive.red600 : primitive.slate700}
          fontFamily="DM Sans"
        >
          {label}
        </Text>
      )}

      {/* Trigger */}
      <Pressable
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityLabel={a11yLabel}
        accessibilityState={{
          disabled,
          expanded: isOpen,
        }}
        accessibilityHint={`Double tap to ${isOpen ? 'close' : 'open'} dropdown`}
        hitSlop={hitSlop}
      >
        <HStack
          height={height}
          borderWidth={borderWidth}
          borderColor={borderColor}
          borderRadius={INPUT_BORDER_RADIUS}
          backgroundColor={variant === 'filled' ? primitive.neutral100 : 'transparent'}
          paddingTop={padding[0]}
          paddingRight={padding[1]}
          paddingBottom={padding[2]}
          paddingLeft={padding[3]}
          alignItems="center"
          opacity={disabled ? DISABLED_OPACITY : 1}
          gap={8}
        >
          {/* Value or placeholder */}
          <Text
            flex={1}
            fontSize={valueStyle.fontSize}
            fontWeight={displayText ? String(valueStyle.fontWeight) as '500' : '400'}
            lineHeight={valueStyle.lineHeight}
            color={displayText ? primitive.slate900 : primitive.slate500}
            fontFamily="DM Sans"
            numberOfLines={1}
          >
            {displayText || placeholder}
          </Text>

          {/* Chevron */}
          <Stack
            transform={isOpen ? [{ rotate: '180deg' }] : undefined}
          >
            <ChevronDownIcon
              color={disabled ? primitive.slate500 : hasError ? primitive.red600 : primitive.slate700}
              size={20}
            />
          </Stack>
        </HStack>
      </Pressable>

      {/* Helper / Error text */}
      {(errorText || helperText) && (
        <Text
          fontSize={12}
          fontWeight="500"
          lineHeight={20}
          color={hasError ? primitive.red600 : primitive.slate500}
          fontFamily="DM Sans"
        >
          {errorText || helperText}
        </Text>
      )}

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
        statusBarTranslucent
      >
        <Pressable
          onPress={handleClose}
          style={styles.overlay}
          accessibilityRole="none"
        >
          <Stack
            alignSelf="center"
            marginTop={windowHeight * 0.25}
            width={Math.min(windowWidth - 32, 400)}
            maxHeight={windowHeight * 0.5}
            backgroundColor={primitive.white}
            borderRadius={DROPDOWN_RADIUS}
            overflow="hidden"
            shadowColor={primitive.black}
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.15}
            shadowRadius={12}
            /* elevation={8} -- Android shadow via shadowColor/Offset/Opacity */
          >
            {/* Native iOS wheel picker path */}
            {useNativePicker && NativePicker && NativePickerItem ? (
              <View style={{ paddingVertical: 8 }}>
                <NativePicker
                  selectedValue={selectedValues[0] ?? ''}
                  onValueChange={handleNativePickerChange}
                  itemStyle={{
                    color: primitive.slate900,
                    fontSize: 16,
                  }}
                  testID={testID ? `${testID}-native-picker` : undefined}
                  accessibilityLabel={`${a11yLabel} picker`}
                >
                  {/* Placeholder item */}
                  <NativePickerItem
                    label={placeholder}
                    value=""
                    color={primitive.slate500}
                  />
                  {options.map((opt) => (
                    <NativePickerItem
                      key={opt.value}
                      label={opt.label}
                      value={opt.value}
                      enabled={!opt.disabled}
                      color={opt.disabled ? primitive.gray400 : primitive.slate900}
                    />
                  ))}
                </NativePicker>
              </View>
            ) : (
              <>
                {/* Dropdown header for multiple select */}
                {multiple && selectedValues.length > 0 && (
                  <HStack
                    paddingHorizontal={16}
                    paddingVertical={12}
                    borderBottomWidth={1}
                    borderBottomColor={primitive.gray200}
                    alignItems="center"
                  >
                    <Text
                      fontSize={13}
                      fontWeight="600"
                      lineHeight={16}
                      color={primitive.slate700}
                      fontFamily="DM Sans"
                    >
                      {selectedValues.length} selected
                    </Text>
                  </HStack>
                )}

                {/* Options list */}
                <FlatList
                  data={options}
                  renderItem={renderOption}
                  keyExtractor={keyExtractor}
                  bounces={false}
                  showsVerticalScrollIndicator
                  accessibilityRole="menu"
                  accessibilityLabel={`${a11yLabel} options`}
                />
              </>
            )}
          </Stack>
        </Pressable>
      </Modal>
    </VStack>
  )
})

Select.displayName = 'Select'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})
