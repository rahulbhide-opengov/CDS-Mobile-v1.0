import React, { useEffect, useRef, useMemo } from 'react'
import { Animated, Easing, View } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Size map -- pixel dimensions per size variant
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { dimension: 24, strokeWidth: 2, fontSize: 12 },
  md: { dimension: 36, strokeWidth: 3, fontSize: 12 },
  lg: { dimension: 48, strokeWidth: 4, fontSize: 12 },
} as const

type CircularProgressSize = keyof typeof SIZE_MAP

// ---------------------------------------------------------------------------
// Color map -- semantic colors for the progress arc
// ---------------------------------------------------------------------------

const COLOR_MAP: Record<string, string> = {
  primary: colors.primary,
  success: colors.jade700,
  error: colors.red600,
  warning: colors.amber700,
  neutral: primitive.neutral500,
}

const TRACK_COLOR = primitive.neutral300 // neutral300

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CircularProgressProps {
  /** Progress value from 0 to 100. When omitted the spinner runs in indeterminate mode. */
  value?: number
  /** Diameter preset. Defaults to "md". */
  size?: CircularProgressSize
  /** Semantic color of the progress arc. */
  color?: 'primary' | 'success' | 'error' | 'warning' | 'neutral'
  /** When true, displays the numeric percentage in the center (determinate only). */
  showValue?: boolean
  /** Overrides the default stroke width derived from size. */
  strokeWidth?: number
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// HalfCircle -- renders one half of the circular track using clip masking
// ---------------------------------------------------------------------------

interface HalfCircleProps {
  dimension: number
  strokeWidth: number
  color: string
  rotation: Animated.AnimatedInterpolation<string> | string
  side: 'left' | 'right'
}

function HalfCircle({ dimension, strokeWidth, color, rotation, side }: HalfCircleProps) {
  const radius = dimension / 2

  // The full circle is split into two halves. Each half is a circle clipped to
  // show only its left or right portion, then rotated to represent the fill.
  const clipStyle =
    side === 'left'
      ? { left: 0, width: radius, overflow: 'hidden' as const }
      : { right: 0, width: radius, overflow: 'hidden' as const }

  const innerOffset = side === 'left' ? {} : { left: -radius }

  return (
    <View
      style={[
        {
          position: 'absolute',
          top: 0,
          height: dimension,
        },
        clipStyle,
      ]}
    >
      <Animated.View
        style={[
          {
            width: dimension,
            height: dimension,
            borderRadius: radius,
            borderWidth: strokeWidth,
            borderColor: color,
            position: 'absolute',
            top: 0,
          },
          innerOffset,
          {
            transform: [
              { translateX: side === 'left' ? radius / 2 : -radius / 2 },
              { rotate: rotation },
              { translateX: side === 'left' ? -radius / 2 : radius / 2 },
            ],
          },
        ]}
      />
    </View>
  )
}

// ---------------------------------------------------------------------------
// CircularProgress component
// ---------------------------------------------------------------------------

export const CircularProgress = React.memo(function CircularProgress({
  value,
  size = 'md',
  color = 'primary',
  showValue = false,
  strokeWidth: strokeWidthOverride,
  accessibilityLabel,
}: CircularProgressProps) {
  const dims = SIZE_MAP[size]
  const resolvedStroke = strokeWidthOverride ?? dims.strokeWidth
  const arcColor = COLOR_MAP[color] ?? COLOR_MAP.primary

  const isIndeterminate = value == null
  const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value))

  // -- Indeterminate rotation animation --------------------------------------

  const spinAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!isIndeterminate) return

    const animation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )
    animation.start()

    return () => animation.stop()
  }, [isIndeterminate, spinAnim])

  const spinRotation = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  // -- Determinate fill animation --------------------------------------------

  const fillAnim = useRef(new Animated.Value(clampedValue)).current

  useEffect(() => {
    if (isIndeterminate) return

    Animated.timing(fillAnim, {
      toValue: clampedValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // rotating halves cannot use native driver
    }).start()
  }, [clampedValue, isIndeterminate, fillAnim])

  // Derive the rotation angles for the two half-circles from the fill value.
  // 0-50%: rotate the right half from 0-180 degrees, left stays hidden.
  // 50-100%: right half stays at 180 degrees, left half rotates 0-180 degrees.

  const rightRotation = fillAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['0deg', '180deg', '180deg'],
    extrapolate: 'clamp',
  })

  const leftRotation = fillAnim.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['0deg', '0deg', '180deg'],
    extrapolate: 'clamp',
  })

  // -- Accessibility ---------------------------------------------------------

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return isIndeterminate
      ? 'Loading'
      : `Progress: ${Math.round(clampedValue)} percent`
  }, [accessibilityLabel, isIndeterminate, clampedValue])

  // -- Render ----------------------------------------------------------------

  const dimension = dims.dimension

  const circleContent = (
    <View
      style={{
        width: dimension,
        height: dimension,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background track circle */}
      <View
        style={{
          position: 'absolute',
          width: dimension,
          height: dimension,
          borderRadius: dimension / 2,
          borderWidth: resolvedStroke,
          borderColor: TRACK_COLOR,
        }}
      />

      {/* Progress fill -- two half-circles */}
      <HalfCircle
        dimension={dimension}
        strokeWidth={resolvedStroke}
        color={arcColor}
        rotation={rightRotation}
        side="right"
      />
      <HalfCircle
        dimension={dimension}
        strokeWidth={resolvedStroke}
        color={arcColor}
        rotation={leftRotation}
        side="left"
      />

      {/* Value label in center */}
      {showValue && !isIndeterminate && (
        <Text
          fontSize={dims.fontSize}
          fontWeight="$medium"
          color="$color"
          textAlign="center"
        >
          {Math.round(clampedValue)}%
        </Text>
      )}
    </View>
  )

  if (isIndeterminate) {
    return (
      <Animated.View
        style={{
          width: dimension,
          height: dimension,
          transform: [{ rotate: spinRotation }],
        }}
        accessibilityRole="progressbar"
        accessibilityLabel={a11yLabel}
        accessibilityValue={{
          min: 0,
          max: 100,
          now: undefined,
        }}
      >
        {/* For indeterminate mode, draw a partial arc (~75%) that spins */}
        <View
          style={{
            width: dimension,
            height: dimension,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Track */}
          <View
            style={{
              position: 'absolute',
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
              borderWidth: resolvedStroke,
              borderColor: TRACK_COLOR,
            }}
          />
          {/* Partial arc: top-right-bottom visible, left clipped (75% fill) */}
          <View
            style={{
              position: 'absolute',
              width: dimension,
              height: dimension,
              borderRadius: dimension / 2,
              borderWidth: resolvedStroke,
              borderColor: 'transparent',
              borderTopColor: arcColor,
              borderRightColor: arcColor,
              borderBottomColor: arcColor,
            }}
          />
        </View>
      </Animated.View>
    )
  }

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={a11yLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: clampedValue,
      }}
    >
      {circleContent}
    </View>
  )
})

CircularProgress.displayName = 'CircularProgress'
