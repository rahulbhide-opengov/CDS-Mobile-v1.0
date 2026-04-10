import React, { useCallback, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  TextInput,
  type TextInputProps,
  StyleSheet,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Size presets (min-height in dp)
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: 36,
  md: 44,
  lg: 48,
} as const

const FONT_SIZE_MAP = {
  sm: 14,
  md: 16,
  lg: 16,
} as const

// Cancel button width for animated slide-in
const CANCEL_WIDTH = 64

// ---------------------------------------------------------------------------
// Search icon (inline SVG-like Stack composition, matching codebase pattern)
// ---------------------------------------------------------------------------

function SearchIcon({ color = '#9E9E9E' }: { color?: string }) {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      {/* Circle */}
      <Stack
        width={12}
        height={12}
        borderRadius={6}
        borderWidth={2}
        borderColor={color}
        position="absolute"
        top={2}
        left={2}
      />
      {/* Handle */}
      <Stack
        width={6}
        height={2}
        backgroundColor={color}
        borderRadius={1}
        position="absolute"
        bottom={3}
        right={2}
        transform={[{ rotate: '45deg' }]}
      />
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Clear icon (X mark, matching TextField pattern)
// ---------------------------------------------------------------------------

function ClearIcon() {
  return (
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
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SearchBarProps {
  /** Controlled value of the search input. */
  value?: string
  /** Called on every text change. */
  onChangeText?: (text: string) => void
  /** Placeholder text. Defaults to "Search...". */
  placeholder?: string
  /** Visual variant. Defaults to "filled". */
  variant?: 'filled' | 'outlined'
  /** Size preset controlling height. Defaults to "md". */
  size?: 'sm' | 'md' | 'lg'
  /** Called when the input receives focus. */
  onFocus?: () => void
  /** Called when the input loses focus. */
  onBlur?: () => void
  /** Called when the cancel button is pressed. */
  onCancel?: () => void
  /** Whether to show the cancel button. Defaults to false (auto-shows on focus). */
  showCancel?: boolean
  /** Auto-focus the input on mount. */
  autoFocus?: boolean
}

// ---------------------------------------------------------------------------
// SearchBar
// ---------------------------------------------------------------------------

/**
 * `SearchBar` -- mobile search input with leading icon, trailing clear button,
 * and animated cancel button.
 *
 * Two visual variants (filled, outlined) and three sizes. The cancel button
 * slides in from the right when the input is focused and slides out on cancel
 * or blur (unless `showCancel` forces it visible).
 */
export function SearchBar({
  value = '',
  onChangeText,
  placeholder = 'Search...',
  variant = 'filled',
  size = 'md',
  onFocus,
  onBlur,
  onCancel,
  showCancel = false,
  autoFocus = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput>(null)

  // Animated values
  const focusBorderAnim = useRef(new Animated.Value(0)).current
  const cancelAnim = useRef(new Animated.Value(showCancel ? 1 : 0)).current

  const minHeight = SIZE_MAP[size]
  const fontSize = FONT_SIZE_MAP[size]
  const showClearButton = value.length > 0
  const shouldShowCancel = showCancel || isFocused

  // ---- Focus / Blur handlers ----------------------------------------------

  const handleFocus = useCallback(() => {
    setIsFocused(true)

    Animated.parallel([
      Animated.timing(focusBorderAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      Animated.timing(cancelAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start()

    onFocus?.()
  }, [focusBorderAnim, cancelAnim, onFocus])

  const handleBlur = useCallback(() => {
    setIsFocused(false)

    Animated.parallel([
      Animated.timing(focusBorderAnim, {
        toValue: 0,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      // Only hide cancel if showCancel is not forced
      ...(!showCancel
        ? [
            Animated.timing(cancelAnim, {
              toValue: 0,
              duration: 200,
              easing: Easing.in(Easing.ease),
              useNativeDriver: false,
            }),
          ]
        : []),
    ]).start()

    onBlur?.()
  }, [focusBorderAnim, cancelAnim, showCancel, onBlur])

  // ---- Clear handler ------------------------------------------------------

  const handleClear = useCallback(() => {
    onChangeText?.('')
    inputRef.current?.focus()
  }, [onChangeText])

  // ---- Cancel handler -----------------------------------------------------

  const handleCancel = useCallback(() => {
    onChangeText?.('')
    inputRef.current?.blur()

    Animated.timing(cancelAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start()

    onCancel?.()
  }, [cancelAnim, onChangeText, onCancel])

  // ---- Derived animated styles --------------------------------------------

  const animatedBorderColor = focusBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      variant === 'outlined' ? '#EEEEEE' : 'transparent',
      '#4B3FFF',
    ],
  })

  const animatedBorderWidth = focusBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [variant === 'outlined' ? 1 : 0, 2],
  })

  const cancelWidth = cancelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CANCEL_WIDTH],
  })

  const cancelOpacity = cancelAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  })

  // ---- Render --------------------------------------------------------------

  return (
    <HStack gap={0} alignItems="center">
      {/* Input container */}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            minHeight,
            backgroundColor: variant === 'filled' ? '#F5F5F5' : 'transparent',
            borderColor: animatedBorderColor,
            borderWidth: variant === 'outlined' ? animatedBorderWidth : 0,
            borderRadius: minHeight / 2,
          },
        ]}
      >
        {/* Leading search icon */}
        <SearchIcon color={isFocused ? '#4B3FFF' : '#9E9E9E'} />

        {/* TextInput */}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              fontSize,
              lineHeight: fontSize * 1.4,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#BDBDBD"
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessible
          accessibilityRole="search"
          accessibilityLabel={placeholder}
        />

        {/* Clear button */}
        {showClearButton && (
          <Pressable
            onPress={handleClear}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            minWidth={24}
            minHeight={24}
            alignItems="center"
            justifyContent="center"
          >
            <ClearIcon />
          </Pressable>
        )}
      </Animated.View>

      {/* Animated cancel button */}
      <Animated.View
        style={{
          width: cancelWidth,
          opacity: cancelOpacity,
          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Pressable
          onPress={handleCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancel search"
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
          minWidth={0}
          minHeight={0}
          paddingLeft={8}
        >
          <Text color="$brandBackground" variant="body3" fontWeight="$medium">
            Cancel
          </Text>
        </Pressable>
      </Animated.View>
    </HStack>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'System',
    color: '#212121',
    padding: 0,
    margin: 0,
  },
})
