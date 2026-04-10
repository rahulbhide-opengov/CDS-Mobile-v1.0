import React, { useEffect, useRef } from 'react'
import { Animated, Easing, View, type DimensionValue } from 'react-native'
import { Stack } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SkeletonLoaderProps {
  /** Shape variant of the skeleton placeholder. */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /** Width of the skeleton. Accepts a number (pixels) or string (e.g. "100%"). */
  width?: number | string
  /** Height of the skeleton in pixels. Defaults based on variant. */
  height?: number
  /** Number of skeleton items to render in a vertical stack. */
  count?: number
  /** Animation style. "pulse" fades opacity; "wave" slides a shimmer highlight. */
  animation?: 'pulse' | 'wave'
  /** Vertical spacing between items when count > 1. Defaults to 8. */
  spacing?: number
  /** Accessibility label override. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const BASE_COLOR = primitive.neutral300 // neutral300
const HIGHLIGHT_COLOR = primitive.neutral100 // neutral100

const DEFAULT_HEIGHTS: Record<string, number> = {
  text: 16,
  circular: 40,
  rectangular: 80,
  rounded: 80,
}

// ---------------------------------------------------------------------------
// PulseAnimation -- fades opacity between 0.3 and 1.0
// ---------------------------------------------------------------------------

function PulseAnimation({ children }: { children: React.ReactNode }) {
  const opacityAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    )
    animation.start()

    return () => animation.stop()
  }, [opacityAnim])

  return (
    <Animated.View style={{ opacity: opacityAnim }}>
      {children}
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// WaveAnimation -- slides a highlight bar across the skeleton shape
// ---------------------------------------------------------------------------

function WaveAnimation({
  width,
  height,
  borderRadius,
}: {
  width: number | string
  height: number
  borderRadius: number
}) {
  const translateXAnim = useRef(new Animated.Value(-1)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(translateXAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    )
    animation.start()

    return () => animation.stop()
  }, [translateXAnim])

  // Slide a highlight band across; uses a fixed 200px wide highlight
  // that translates from -200 to container width (estimated at 400 for safety).
  const shimmerTranslate = translateXAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 600],
  })

  return (
    <View
      style={{
        width: width as DimensionValue,
        height,
        borderRadius,
        backgroundColor: BASE_COLOR,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: 200,
          backgroundColor: HIGHLIGHT_COLOR,
          opacity: 0.6,
          transform: [{ translateX: shimmerTranslate }],
        }}
      />
    </View>
  )
}

// ---------------------------------------------------------------------------
// SkeletonItem -- a single skeleton shape
// ---------------------------------------------------------------------------

function SkeletonItem({
  variant = 'text',
  width: widthProp,
  height: heightProp,
  animation = 'pulse',
}: SkeletonLoaderProps) {
  const resolvedHeight = heightProp ?? DEFAULT_HEIGHTS[variant] ?? 16

  // Resolve width: circular variant defaults to a square
  const resolvedWidth: number | string =
    widthProp ??
    (variant === 'circular' ? resolvedHeight : '100%')

  // Border radius per variant
  const borderRadius =
    variant === 'circular'
      ? (typeof resolvedWidth === 'number' ? resolvedWidth / 2 : resolvedHeight / 2)
      : variant === 'rounded'
        ? 12
        : variant === 'text'
          ? 4
          : 4 // rectangular

  if (animation === 'wave') {
    return (
      <WaveAnimation
        width={resolvedWidth}
        height={resolvedHeight}
        borderRadius={borderRadius}
      />
    )
  }

  // Pulse animation (default)
  return (
    <PulseAnimation>
      <View
        style={{
          width: resolvedWidth as DimensionValue,
          height: resolvedHeight,
          borderRadius,
          backgroundColor: BASE_COLOR,
        }}
      />
    </PulseAnimation>
  )
}

// ---------------------------------------------------------------------------
// SkeletonLoader component
// ---------------------------------------------------------------------------

export const SkeletonLoader = React.memo(function SkeletonLoader({
  variant = 'text',
  width,
  height,
  count = 1,
  animation = 'pulse',
  spacing = 8,
  accessibilityLabel,
}: SkeletonLoaderProps) {
  const a11yLabel = accessibilityLabel ?? 'Loading content'

  if (count > 1) {
    return (
      <Stack
        gap={spacing}
        accessibilityRole="none"
        accessibilityLabel={a11yLabel}
      >
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonItem
            key={index}
            variant={variant}
            width={width}
            height={height}
            animation={animation}
          />
        ))}
      </Stack>
    )
  }

  return (
    <View
      accessibilityRole="none"
      accessibilityLabel={a11yLabel}
    >
      <SkeletonItem
        variant={variant}
        width={width}
        height={height}
        animation={animation}
      />
    </View>
  )
})

SkeletonLoader.displayName = 'SkeletonLoader'
