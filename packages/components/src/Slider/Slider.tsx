import React, { useRef, useCallback, useMemo, useState } from 'react'
import { Animated, PanResponder, View, LayoutChangeEvent, type DimensionValue } from 'react-native'
import { Stack } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const THUMB_SIZE = 24
const THUMB_HIT_SLOP = 12 // extra pixels around the thumb for easier grabbing
const TRACK_HEIGHT = 4
const ACTIVE_TRACK_HEIGHT = 4
const VALUE_LABEL_OFFSET = -32 // vertical offset above thumb for the value label

const FILL_COLOR = '#4B3FFF' // primary
const TRACK_COLOR = '#E0E0E0' // neutral300
const THUMB_COLOR = '#FFFFFF'
const THUMB_SHADOW = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SliderProps {
  /** Current value of the slider. */
  value: number
  /** Callback invoked as the user drags the thumb. */
  onValueChange?: (value: number) => void
  /** Callback invoked when the user releases the thumb. */
  onSlidingComplete?: (value: number) => void
  /** Minimum value. Defaults to 0. */
  min?: number
  /** Maximum value. Defaults to 100. */
  max?: number
  /** Step increment. Defaults to 1. */
  step?: number
  /** Disables interaction. */
  disabled?: boolean
  /** Shows the current value label above the thumb while dragging. */
  showValue?: boolean
  /** Track background color override. */
  trackColor?: string
  /** Filled portion color override. */
  fillColor?: string
  /** Thumb color override. */
  thumbColor?: string
  /** Accessibility label override. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/** Snaps a value to the nearest step within [min, max]. */
function snapToStep(rawValue: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, rawValue))
  if (step <= 0) return clamped
  const stepped = Math.round((clamped - min) / step) * step + min
  // Floating-point correction
  return Math.min(max, Math.max(min, parseFloat(stepped.toFixed(10))))
}

// ---------------------------------------------------------------------------
// Slider component
// ---------------------------------------------------------------------------

export const Slider = React.memo(function Slider({
  value,
  onValueChange,
  onSlidingComplete,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  trackColor = TRACK_COLOR,
  fillColor: fillColorProp = FILL_COLOR,
  thumbColor = THUMB_COLOR,
  accessibilityLabel,
}: SliderProps) {
  // -- State & refs ----------------------------------------------------------

  const trackWidth = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  // Convert value to a 0-1 fraction for positioning
  const fraction = max === min ? 0 : (value - min) / (max - min)
  const clampedFraction = Math.min(1, Math.max(0, fraction))

  // -- Layout measurement ----------------------------------------------------

  const onTrackLayout = useCallback((event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width
  }, [])

  // -- Gesture handling ------------------------------------------------------

  const resolveValue = useCallback(
    (pageX: number, trackStartX: number): number => {
      const position = pageX - trackStartX
      const rawFraction = trackWidth.current > 0 ? position / trackWidth.current : 0
      const rawValue = min + rawFraction * (max - min)
      return snapToStep(rawValue, min, max, step)
    },
    [min, max, step],
  )

  const trackStartX = useRef(0)

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt) => {
          setIsDragging(true)
          // Record the track's starting X position relative to the page
          trackStartX.current =
            evt.nativeEvent.pageX - evt.nativeEvent.locationX -
            (clampedFraction * trackWidth.current - THUMB_SIZE / 2)
        },
        onPanResponderMove: (evt) => {
          const newValue = resolveValue(evt.nativeEvent.pageX, trackStartX.current)
          onValueChange?.(newValue)
        },
        onPanResponderRelease: (evt) => {
          setIsDragging(false)
          const finalValue = resolveValue(evt.nativeEvent.pageX, trackStartX.current)
          onValueChange?.(finalValue)
          onSlidingComplete?.(finalValue)
        },
        onPanResponderTerminate: () => {
          setIsDragging(false)
        },
      }),
    [disabled, clampedFraction, resolveValue, onValueChange, onSlidingComplete],
  )

  // -- Track press handler (tap to set value) --------------------------------

  const trackRef = useRef<View>(null)

  const handleTrackPress = useCallback(
    (event: { nativeEvent: { pageX: number } }) => {
      if (disabled) return
      trackRef.current?.measureInWindow((x) => {
        if (x != null) {
          const newValue = resolveValue(event.nativeEvent.pageX, x)
          onValueChange?.(newValue)
          onSlidingComplete?.(newValue)
        }
      })
    },
    [disabled, resolveValue, onValueChange, onSlidingComplete],
  )

  // -- Accessibility ---------------------------------------------------------

  const a11yLabel = accessibilityLabel ?? 'Slider'

  // Accessibility actions: increment and decrement by step
  const handleAccessibilityAction = useCallback(
    (event: { nativeEvent: { actionName: string } }) => {
      if (disabled) return
      const actionName = event.nativeEvent.actionName
      let newValue = value
      if (actionName === 'increment') {
        newValue = snapToStep(value + step, min, max, step)
      } else if (actionName === 'decrement') {
        newValue = snapToStep(value - step, min, max, step)
      }
      onValueChange?.(newValue)
      onSlidingComplete?.(newValue)
    },
    [disabled, value, step, min, max, onValueChange, onSlidingComplete],
  )

  // -- Render ----------------------------------------------------------------

  // Thumb position as a percentage string
  const thumbLeftPercent = `${clampedFraction * 100}%` as DimensionValue
  const fillWidthPercent = `${clampedFraction * 100}%` as DimensionValue

  return (
    <View
      style={{
        paddingVertical: 16,
        opacity: disabled ? 0.5 : 1,
      }}
      accessibilityRole="adjustable"
      accessibilityLabel={a11yLabel}
      accessibilityValue={{
        min,
        max,
        now: value,
      }}
      accessibilityActions={[
        { name: 'increment', label: 'Increase value' },
        { name: 'decrement', label: 'Decrease value' },
      ]}
      onAccessibilityAction={handleAccessibilityAction}
    >
      {/* Value label above thumb */}
      {showValue && isDragging && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: thumbLeftPercent,
            transform: [{ translateX: -16 }],
            width: 32,
            alignItems: 'center',
          }}
          pointerEvents="none"
        >
          <View
            style={{
              backgroundColor: '#333333',
              borderRadius: 4,
              paddingHorizontal: 6,
              paddingVertical: 2,
            }}
          >
            <Text
              color="white"
              fontSize={11}
              fontWeight="$medium"
              textAlign="center"
            >
              {Math.round(value)}
            </Text>
          </View>
        </View>
      )}

      {/* Track */}
      <View
        ref={trackRef}
        onLayout={onTrackLayout}
        onTouchEnd={handleTrackPress}
        style={{
          height: TRACK_HEIGHT,
          borderRadius: TRACK_HEIGHT / 2,
          backgroundColor: trackColor,
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Filled portion */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: fillWidthPercent,
            borderRadius: TRACK_HEIGHT / 2,
            backgroundColor: fillColorProp,
          }}
        />

        {/* Thumb */}
        <View
          style={{
            position: 'absolute',
            left: thumbLeftPercent,
            top: -(THUMB_SIZE - TRACK_HEIGHT) / 2,
            marginLeft: -(THUMB_SIZE / 2),
            width: THUMB_SIZE + THUMB_HIT_SLOP * 2,
            height: THUMB_SIZE + THUMB_HIT_SLOP * 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...panResponder.panHandlers}
        >
          <View
            style={{
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: thumbColor,
              borderWidth: 2,
              borderColor: fillColorProp,
              ...THUMB_SHADOW,
            }}
          />
        </View>
      </View>
    </View>
  )
})

Slider.displayName = 'Slider'
