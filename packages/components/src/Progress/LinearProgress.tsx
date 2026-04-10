import React, { useEffect, useRef, useMemo } from 'react'
import { Animated, Easing, View, LayoutChangeEvent } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Size map -- track heights per size variant
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: 2,
  md: 4,
  lg: 8,
} as const

type LinearProgressSize = keyof typeof SIZE_MAP

// ---------------------------------------------------------------------------
// Color map -- semantic colors for the fill bar
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

export interface LinearProgressProps {
  /** Progress value from 0 to 100. When omitted the bar runs in indeterminate mode. */
  value?: number
  /** Track height preset. Defaults to "md". */
  size?: LinearProgressSize
  /** Semantic color of the progress fill. */
  color?: 'primary' | 'success' | 'error' | 'warning' | 'neutral'
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// LinearProgress component
// ---------------------------------------------------------------------------

export const LinearProgress = React.memo(function LinearProgress({
  value,
  size = 'md',
  color = 'primary',
  accessibilityLabel,
}: LinearProgressProps) {
  const trackHeight = SIZE_MAP[size]
  const borderRadius = trackHeight / 2
  const fillColor = COLOR_MAP[color] ?? COLOR_MAP.primary

  const isIndeterminate = value == null
  const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value))

  // -- Track width measurement -----------------------------------------------

  const trackWidth = useRef(0)
  const onLayout = (event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width
  }

  // -- Determinate fill animation --------------------------------------------

  const fillWidthAnim = useRef(new Animated.Value(clampedValue)).current

  useEffect(() => {
    if (isIndeterminate) return

    Animated.timing(fillWidthAnim, {
      toValue: clampedValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false, // width cannot use native driver
    }).start()
  }, [clampedValue, isIndeterminate, fillWidthAnim])

  // Width interpolation maps 0-100 to "0%"-"100%"
  const fillWidth = fillWidthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  })

  // -- Indeterminate sliding animation ---------------------------------------

  const slideAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!isIndeterminate) return

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    )
    animation.start()

    return () => animation.stop()
  }, [isIndeterminate, slideAnim])

  // Slide the 30%-wide bar across the full track width.
  // We use a percentage-based translateX approach:
  // At 0: the bar starts off-screen to the left (-30% of track)
  // At 1: the bar exits off-screen to the right (+100% of track)
  // Since we cannot interpolate to percentage-based translateX with native
  // driver cleanly, we use a large enough range and let overflow: hidden clip.
  const slideTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 600],
  })

  // -- Accessibility ---------------------------------------------------------

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return isIndeterminate
      ? 'Loading'
      : `Progress: ${Math.round(clampedValue)} percent`
  }, [accessibilityLabel, isIndeterminate, clampedValue])

  // -- Render ----------------------------------------------------------------

  return (
    <View
      onLayout={onLayout}
      style={{
        height: trackHeight,
        borderRadius,
        backgroundColor: TRACK_COLOR,
        overflow: 'hidden',
        alignSelf: 'stretch',
      }}
      accessibilityRole="progressbar"
      accessibilityLabel={a11yLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: isIndeterminate ? undefined : clampedValue,
      }}
    >
      {isIndeterminate ? (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '30%',
            borderRadius,
            backgroundColor: fillColor,
            transform: [{ translateX: slideTranslateX }],
          }}
        />
      ) : (
        <Animated.View
          style={{
            height: '100%',
            borderRadius,
            backgroundColor: fillColor,
            width: fillWidth,
          }}
        />
      )}
    </View>
  )
})

LinearProgress.displayName = 'LinearProgress'
