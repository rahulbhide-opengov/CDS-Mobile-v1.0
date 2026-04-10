import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbTravel: 16, padding: 2 },
  md: { trackWidth: 44, trackHeight: 24, thumbSize: 20, thumbTravel: 20, padding: 2 },
} as const

type SwitchSize = keyof typeof SIZE_MAP

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const SwitchContainer = styled(HStack, {
  name: 'SwitchContainer',
  alignItems: 'center',
  gap: '$2',
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SwitchProps {
  /** Whether the switch is toggled on */
  checked?: boolean
  /** Called when the user toggles the switch */
  onChange?: (checked: boolean) => void
  /** Visual size */
  size?: SwitchSize
  /** Disabled state */
  disabled?: boolean
  /** Optional label displayed beside the switch */
  label?: string
  /** Override accessibility label (defaults to label prop) */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Switch({
  checked = false,
  onChange,
  size = 'md',
  disabled = false,
  label,
  accessibilityLabel,
}: SwitchProps) {
  const dims = SIZE_MAP[size]

  // Animated value drives thumb translation and track color
  const toggleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current

  // Keep the animation in sync with the checked prop
  useEffect(() => {
    Animated.spring(toggleAnim, {
      toValue: checked ? 1 : 0,
      friction: 8,
      tension: 300,
      useNativeDriver: false, // backgroundColor cannot use native driver
    }).start()
  }, [checked, toggleAnim])

  // Scale animation on press
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 0.92,
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

  // ---- Interpolated styles --------------------------------------------------

  const trackBackgroundColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      '#E0E0E0', // neutral300 -- off track
      '#4B3FFF', // primary -- on track
    ],
  })

  const thumbTranslateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [dims.padding, dims.thumbTravel + dims.padding],
  })

  // Slight thumb size increase when pressed for tactile feedback
  // (handled by scaleAnim on the entire track to keep it simple)

  // ---- Render ---------------------------------------------------------------

  return (
    <SwitchContainer
      opacity={disabled ? 0.5 : 1}
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{
        checked,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label ?? 'Toggle switch'}
    >
      <Animated.View
        onTouchStart={disabled ? undefined : handlePressIn}
        onTouchEnd={disabled ? undefined : handlePressOut}
        onTouchCancel={disabled ? undefined : handlePressOut}
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Animated.View
          style={{
            width: dims.trackWidth,
            height: dims.trackHeight,
            borderRadius: dims.trackHeight / 2,
            backgroundColor: trackBackgroundColor,
            justifyContent: 'center',
            paddingHorizontal: 0,
          }}
        >
          {/* Thumb */}
          <Animated.View
            style={{
              width: dims.thumbSize,
              height: dims.thumbSize,
              borderRadius: dims.thumbSize / 2,
              backgroundColor: '#FFFFFF',
              // Subtle shadow for depth
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 2,
              transform: [{ translateX: thumbTranslateX }],
            }}
          />
        </Animated.View>
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
    </SwitchContainer>
  )
}
