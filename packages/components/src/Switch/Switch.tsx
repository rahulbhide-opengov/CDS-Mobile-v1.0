import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** WCAG 2.5.8 minimum touch target */
const TOUCH_TARGET = 44

/** CDS 37 animation: 150ms ease-out slide */
const TOGGLE_DURATION = 150

// ---------------------------------------------------------------------------
// Size maps (Figma CDS 37 -- Mobile 390 column)
//
// md (default): track 34x14, thumb 20px -- per Figma spec
// sm: proportionally smaller track 28x12, thumb 16px
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { trackWidth: 28, trackHeight: 12, thumbSize: 16, thumbTravel: 12, padding: -2 },
  md: { trackWidth: 34, trackHeight: 14, thumbSize: 20, thumbTravel: 14, padding: -3 },
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

  // Keep the animation in sync with the checked prop (CDS 37: 150ms ease-out)
  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: checked ? 1 : 0,
      duration: TOGGLE_DURATION,
      easing: Easing.out(Easing.ease),
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
      primitive.gray300, // CDS 37: off track is gray300
      primitive.blurple700, // CDS 37: on track is blurple700
    ],
  })

  const thumbBackgroundColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      primitive.gray50, // CDS 37: off thumb is gray50
      primitive.white, // CDS 37: on thumb is white
    ],
  })

  const thumbTranslateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [dims.padding, dims.thumbTravel + dims.padding],
  })

  // hitSlop expands the touch target to 44px without changing visual size
  const hitSlop = useMemo(() => {
    const padV = Math.max(0, (TOUCH_TARGET - dims.thumbSize) / 2) // thumb is tallest element
    const padH = Math.max(0, (TOUCH_TARGET - dims.trackWidth) / 2)
    return { top: padV, bottom: padV, left: padH, right: padH }
  }, [dims.thumbSize, dims.trackWidth])

  // ---- Render ---------------------------------------------------------------

  return (
    <SwitchContainer
      opacity={disabled ? 0.38 : 1}
      onPress={handlePress}
      hitSlop={hitSlop}
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
              backgroundColor: thumbBackgroundColor,
              // Small shadow for depth (CDS 37)
              shadowColor: primitive.black,
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
