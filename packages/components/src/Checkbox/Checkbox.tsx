import React, { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { box: 18, checkWidth: 10, checkHeight: 6, borderWidth: 1.5, dashWidth: 8, dashHeight: 2 },
  md: { box: 20, checkWidth: 12, checkHeight: 7, borderWidth: 2, dashWidth: 10, dashHeight: 2 },
  lg: { box: 24, checkWidth: 14, checkHeight: 8, borderWidth: 2, dashWidth: 12, dashHeight: 2 },
} as const

type CheckboxSize = keyof typeof SIZE_MAP

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const CheckboxContainer = styled(HStack, {
  name: 'CheckboxContainer',
  alignItems: 'center',
  gap: '$2',
})

// ---------------------------------------------------------------------------
// Check mark -- built from two rotated Stacks forming an "L" shape
// This avoids an SVG dependency while staying purely declarative.
// ---------------------------------------------------------------------------

function CheckIcon({ size }: { size: CheckboxSize }) {
  const dims = SIZE_MAP[size]
  // We compose two bars to form the checkmark at a 45-degree rotation.
  // Short bar = left leg, long bar = bottom leg.
  const shortLen = dims.checkHeight
  const longLen = dims.checkWidth
  const strokeWidth = dims.borderWidth

  return (
    <Stack
      width={longLen}
      height={shortLen}
      alignItems="center"
      justifyContent="center"
      transform={[{ rotate: '-45deg' }]}
      marginTop={-1}
    >
      {/* Bottom horizontal bar */}
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        width={longLen}
        height={strokeWidth}
        backgroundColor="white"
        borderRadius="$sm"
      />
      {/* Left vertical bar */}
      <Stack
        position="absolute"
        bottom={0}
        left={0}
        width={strokeWidth}
        height={shortLen}
        backgroundColor="white"
        borderRadius="$sm"
      />
    </Stack>
  )
}

function IndeterminateIcon({ size }: { size: CheckboxSize }) {
  const dims = SIZE_MAP[size]
  return (
    <Stack
      width={dims.dashWidth}
      height={dims.dashHeight}
      backgroundColor="white"
      borderRadius="$full"
    />
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Whether the checkbox is in an indeterminate / mixed state */
  indeterminate?: boolean
  /** Called when the user toggles the checkbox */
  onChange?: (checked: boolean) => void
  /** Visual size */
  size?: CheckboxSize
  /** Disabled state */
  disabled?: boolean
  /** Error state -- shows red border when unchecked */
  error?: boolean
  /** Optional label displayed beside the checkbox */
  label?: string
  /** Override accessibility label (defaults to label prop) */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  size = 'md',
  disabled = false,
  error = false,
  label,
  accessibilityLabel,
}: CheckboxProps) {
  const dims = SIZE_MAP[size]

  // Scale animation on press
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 80,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [scaleAnim])

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 200,
      useNativeDriver: true,
    }).start()
  }, [scaleAnim])

  const handlePress = useCallback(() => {
    if (disabled) return
    onChange?.(!checked)
  }, [disabled, onChange, checked])

  // ---- Derived styles -------------------------------------------------------
  const isActive = checked || indeterminate
  const borderColor = error && !isActive
    ? '#991F1F' // red700 / errorColor
    : isActive
      ? '#4B3FFF' // primary
      : '#BDBDBD' // neutral400

  const backgroundColor = isActive ? '#4B3FFF' : 'transparent'

  // ---- Render ---------------------------------------------------------------

  return (
    <CheckboxContainer
      opacity={disabled ? 0.5 : 1}
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? 'mixed' : checked,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label ?? 'Checkbox'}
    >
      <Animated.View
        onTouchStart={disabled ? undefined : handlePressIn}
        onTouchEnd={disabled ? undefined : handlePressOut}
        onTouchCancel={disabled ? undefined : handlePressOut}
        style={{
          transform: [{ scale: scaleAnim }],
          width: dims.box,
          height: dims.box,
          borderRadius: 3,
          borderWidth: dims.borderWidth,
          borderColor,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked && !indeterminate && <CheckIcon size={size} />}
        {indeterminate && <IndeterminateIcon size={size} />}
      </Animated.View>

      {label != null && (
        <Text
          variant="body2"
          color={disabled ? '$colorDisabled' : '$color'}
          onPress={disabled ? undefined : handlePress}
        >
          {label}
        </Text>
      )}
    </CheckboxContainer>
  )
}
