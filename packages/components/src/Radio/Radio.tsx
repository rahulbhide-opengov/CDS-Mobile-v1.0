import React, { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { outer: 18, inner: 8, borderWidth: 2 },
  md: { outer: 20, inner: 10, borderWidth: 2 },
  lg: { outer: 24, inner: 12, borderWidth: 2 },
} as const

type RadioSize = keyof typeof SIZE_MAP

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const RadioContainer = styled(HStack, {
  name: 'RadioContainer',
  alignItems: 'center',
  gap: '$2',
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RadioProps {
  /** Whether this radio is currently selected */
  selected?: boolean
  /** Called when the user selects this radio */
  onSelect?: () => void
  /** Visual size */
  size?: RadioSize
  /** Disabled state */
  disabled?: boolean
  /** Optional label displayed beside the radio */
  label?: string
  /** Value associated with this radio (used by radio groups) */
  value?: string
  /** Override accessibility label (defaults to label prop) */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Radio({
  selected = false,
  onSelect,
  size = 'md',
  disabled = false,
  label,
  value,
  accessibilityLabel,
}: RadioProps) {
  const dims = SIZE_MAP[size]

  // Scale animation on press for tactile feedback
  const scaleAnim = useRef(new Animated.Value(1)).current
  // Inner dot scale -- animates in/out when selected changes
  const dotScale = useRef(new Animated.Value(selected ? 1 : 0)).current

  // Keep dotScale in sync with selected prop
  React.useEffect(() => {
    Animated.spring(dotScale, {
      toValue: selected ? 1 : 0,
      friction: 6,
      tension: 300,
      useNativeDriver: true,
    }).start()
  }, [selected, dotScale])

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
    onSelect?.()
  }, [disabled, onSelect])

  // ---- Derived styles -------------------------------------------------------
  const borderColor = selected ? colors.primary : primitive.neutral400 // primary / neutral400
  const dotColor = colors.primary // primary

  // ---- Render ---------------------------------------------------------------

  return (
    <RadioContainer
      opacity={disabled ? 0.5 : 1}
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{
        selected,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label ?? 'Radio'}
    >
      <Animated.View
        onTouchStart={disabled ? undefined : handlePressIn}
        onTouchEnd={disabled ? undefined : handlePressOut}
        onTouchCancel={disabled ? undefined : handlePressOut}
        style={{
          transform: [{ scale: scaleAnim }],
          width: dims.outer,
          height: dims.outer,
          borderRadius: dims.outer / 2,
          borderWidth: dims.borderWidth,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Animated.View
          style={{
            width: dims.inner,
            height: dims.inner,
            borderRadius: dims.inner / 2,
            backgroundColor: dotColor,
            transform: [{ scale: dotScale }],
          }}
        />
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
    </RadioContainer>
  )
}
