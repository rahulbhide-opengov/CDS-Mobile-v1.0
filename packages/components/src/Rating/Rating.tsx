/**
 * Rating -- CDS 37 Figma-accurate implementation
 *
 * Star rating component with half-star support, touch-optimized sizing,
 * and full accessibility.
 *
 * Star sizes (mobile):
 *   Small:  20px
 *   Medium: 24px
 *   Large:  32px
 *
 * Active fill: semantic.ratingActiveFill (#FFB400)
 * Empty border: semantic.ratingEnabledBorder (rgba(0,0,0,0.23))
 * Disabled: 38% opacity on the entire component
 *
 * All colors reference `primitive` and `semantic` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import { Svg, Path, Defs, ClipPath, Rect } from 'react-native-svg'
import { primitive, semantic } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: disabled state uses 38% opacity on the whole component */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

/** Star SVG path -- standard 5-point star, viewBox 0 0 24 24 */
const STAR_PATH =
  'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'

/** Empty star outline path */
const STAR_OUTLINE_PATH =
  'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z'

// ---------------------------------------------------------------------------
// Star dimensions per size variant
// ---------------------------------------------------------------------------

const STAR_SIZES = {
  sm: 20,
  md: 24,
  lg: 32,
} as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps {
  /** Current rating value (0 to maxStars). Supports half values (e.g. 3.5). */
  value: number
  /** Maximum number of stars. Defaults to 5. */
  maxStars?: number
  /** Size preset. Defaults to "md". */
  size?: RatingSize
  /** When true, the rating cannot be changed by the user. */
  readOnly?: boolean
  /** Disables the component -- applies 38% opacity per Figma spec. */
  disabled?: boolean
  /** Called when the user taps a star. Receives the new integer value (1-based). */
  onChange?: (value: number) => void
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Star component -- renders a single filled, half-filled, or empty star
// ---------------------------------------------------------------------------

type StarFill = 'full' | 'half' | 'empty'

interface StarProps {
  fill: StarFill
  size: number
  index: number
  onPress?: (index: number) => void
  readOnly: boolean
  disabled: boolean
  testID?: string
}

const Star = React.memo(function Star({
  fill,
  size,
  index,
  onPress,
  readOnly,
  disabled,
  testID,
}: StarProps) {
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(index + 1)
    }
  }, [onPress, index])

  // Compute hitSlop so the touch target is at least 44px
  const hitSlop = useMemo(() => {
    if (size >= MIN_TOUCH_TARGET) return undefined
    const pad = Math.ceil((MIN_TOUCH_TARGET - size) / 2)
    return { top: pad, bottom: pad, left: pad, right: pad }
  }, [size])

  const activeFill = semantic.ratingActiveFill
  const emptyStroke = semantic.ratingEnabledBorder

  const starContent = (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      testID={testID ? `${testID}-star-svg-${index}` : undefined}
    >
      {fill === 'full' ? (
        <Path d={STAR_PATH} fill={activeFill} />
      ) : fill === 'half' ? (
        <>
          <Defs>
            <ClipPath id={`half-clip-${index}`}>
              <Rect x="0" y="0" width="12" height="24" />
            </ClipPath>
          </Defs>
          {/* Empty star as base */}
          <Path d={STAR_OUTLINE_PATH} fill={emptyStroke} />
          {/* Filled half clipped to left side */}
          <Path
            d={STAR_PATH}
            fill={activeFill}
            clipPath={`url(#half-clip-${index})`}
          />
        </>
      ) : (
        <Path d={STAR_OUTLINE_PATH} fill={emptyStroke} />
      )}
    </Svg>
  )

  if (readOnly || disabled) {
    return (
      <View
        testID={testID ? `${testID}-star-${index}` : undefined}
        accessibilityRole="image"
        accessibilityLabel={`Star ${index + 1}, ${fill}`}
      >
        {starContent}
      </View>
    )
  }

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={hitSlop}
      testID={testID ? `${testID}-star-${index}` : undefined}
      accessibilityRole="button"
      accessibilityLabel={`Rate ${index + 1} star${index === 0 ? '' : 's'}`}
      accessibilityState={{ selected: fill !== 'empty' }}
    >
      {starContent}
    </Pressable>
  )
})

Star.displayName = 'Star'

// ---------------------------------------------------------------------------
// Rating component
// ---------------------------------------------------------------------------

export const Rating = React.memo(function Rating({
  value,
  maxStars = 5,
  size = 'md',
  readOnly = false,
  disabled = false,
  onChange,
  accessibilityLabel,
  testID,
}: RatingProps) {
  const starSize = STAR_SIZES[size]

  const handleStarPress = useCallback(
    (starValue: number) => {
      if (!disabled && !readOnly && onChange) {
        onChange(starValue)
      }
    },
    [disabled, readOnly, onChange],
  )

  // Build star fill states
  const stars = useMemo(() => {
    const result: StarFill[] = []
    for (let i = 0; i < maxStars; i++) {
      if (value >= i + 1) {
        result.push('full')
      } else if (value >= i + 0.5) {
        result.push('half')
      } else {
        result.push('empty')
      }
    }
    return result
  }, [value, maxStars])

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return `Rating: ${value} out of ${maxStars} stars`
  }, [accessibilityLabel, value, maxStars])

  return (
    <View
      style={[
        styles.container,
        disabled && { opacity: DISABLED_OPACITY },
      ]}
      accessibilityRole="adjustable"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled }}
      accessibilityValue={{
        min: 0,
        max: maxStars,
        now: value,
        text: `${value} of ${maxStars}`,
      }}
      testID={testID}
    >
      {stars.map((fill, index) => (
        <Star
          key={index}
          fill={fill}
          size={starSize}
          index={index}
          onPress={readOnly || disabled ? undefined : handleStarPress}
          readOnly={readOnly}
          disabled={disabled}
          testID={testID}
        />
      ))}
    </View>
  )
})

Rating.displayName = 'Rating'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
})
