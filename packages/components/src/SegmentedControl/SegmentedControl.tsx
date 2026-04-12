import React, { useCallback, useEffect, useRef, useMemo } from 'react'
import { Animated, LayoutChangeEvent } from 'react-native'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { Pressable, HStack } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// SegmentedControlFrame -- outer container (neutral pill background)
// ---------------------------------------------------------------------------

const SegmentedControlFrame = styled(Stack, {
  name: 'SegmentedControl',
  flexDirection: 'row',
  alignItems: 'center',
  height: 36,
  backgroundColor: '$backgroundStrong',
  borderRadius: 4,
  padding: 4,
  overflow: 'hidden',

  variants: {
    fullWidth: {
      true: {
        alignSelf: 'stretch',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Segment touch target
// ---------------------------------------------------------------------------

const SegmentPressable = styled(Pressable, {
  name: 'SegmentPressable',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  height: 28,
  minHeight: 28,
  borderRadius: 2,
  zIndex: 1,
})

// ---------------------------------------------------------------------------
// Segment label text
// ---------------------------------------------------------------------------

const SegmentLabel = styled(TamaguiText, {
  name: 'SegmentLabel',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  textAlign: 'center',
  numberOfLines: 1,

  variants: {
    active: {
      true: {
        fontWeight: '$medium',
        color: '$color',
      },
      false: {
        fontWeight: '$regular',
        color: '$colorSecondary',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface SegmentedControlItem {
  /** Unique key to identify this segment. */
  key: string
  /** Display label text. */
  label: string
  /** Optional icon element rendered before the label. */
  icon?: React.ReactNode
}

export interface SegmentedControlProps {
  /** Array of 2-4 segment items. */
  items: SegmentedControlItem[]
  /** Key of the currently active segment. */
  activeKey: string
  /** Callback fired when a segment is selected. */
  onSelect?: (key: string) => void
  /** When true, stretches to fill parent width. Defaults to true. */
  fullWidth?: boolean
  /** Optional test ID. */
  testID?: string
}

/**
 * `SegmentedControl` -- iOS-style segmented control from CDS 37.
 *
 * Displays 2-4 mutually exclusive options with a sliding white pill indicator
 * that animates smoothly between segments. The active segment is highlighted
 * with a white background and subtle shadow.
 *
 * Uses `Animated.Value` for the sliding indicator position, interpolating
 * based on the active index for a fluid spring animation.
 */
export function SegmentedControl({
  items,
  activeKey,
  onSelect,
  fullWidth = true,
  testID,
}: SegmentedControlProps) {
  const segmentCount = items.length

  // Find active index
  const activeIndex = useMemo(() => {
    const idx = items.findIndex((item) => item.key === activeKey)
    return idx >= 0 ? idx : 0
  }, [items, activeKey])

  // Animated value for the sliding indicator position
  const slideAnim = useRef(new Animated.Value(activeIndex)).current

  const containerPadding = 4 // matches the padding in SegmentedControlFrame

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: activeIndex,
      useNativeDriver: false,
      tension: 120,
      friction: 14,
    }).start()
  }, [activeIndex, slideAnim])

  return (
    <SegmentedControlFrame
      fullWidth={fullWidth || undefined}
      accessibilityRole="tablist"
      testID={testID}
    >
      {/* Animated sliding indicator -- uses layout measurement for pixel-precise positioning */}
      <SlidingIndicator
        slideAnim={slideAnim}
        segmentCount={segmentCount}
        containerPadding={containerPadding}
      />

      {/* Segment items */}
      {items.map((item) => {
        const isActive = item.key === activeKey

        return (
          <SegmentPressable
            key={item.key}
            onPress={() => onSelect?.(item.key)}
            hitSlop={{ top: 8, bottom: 8, left: 0, right: 0 }}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={item.label}
          >
            <HStack alignItems="center" gap={6}>
              {item.icon && (
                <Stack
                  width={18}
                  height={18}
                  alignItems="center"
                  justifyContent="center"
                >
                  {item.icon}
                </Stack>
              )}

              <SegmentLabel active={isActive}>
                {item.label}
              </SegmentLabel>
            </HStack>
          </SegmentPressable>
        )
      })}
    </SegmentedControlFrame>
  )
}

// ---------------------------------------------------------------------------
// SlidingIndicator -- layout-aware animated pill
// ---------------------------------------------------------------------------

interface SlidingIndicatorProps {
  slideAnim: Animated.Value
  segmentCount: number
  containerPadding: number
}

/**
 * Renders a white pill that slides between segments. Uses `onLayout` to
 * measure the actual track width, then calculates pixel positions for
 * the `Animated.Value` interpolation. Before layout is measured, a
 * transparent placeholder captures dimensions.
 */
function SlidingIndicator({
  slideAnim,
  segmentCount,
  containerPadding,
}: SlidingIndicatorProps) {
  const [trackWidth, setTrackWidth] = React.useState(0)

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const newWidth = event.nativeEvent.layout.width
    if (newWidth !== trackWidth) {
      setTrackWidth(newWidth)
    }
  }, [trackWidth])

  const segmentPixelWidth = segmentCount > 0 ? trackWidth / segmentCount : 0

  // Input/output ranges for the interpolation
  const inputRange = useMemo(
    () => Array.from({ length: Math.max(segmentCount, 2) }, (_, i) => i),
    [segmentCount]
  )

  const outputRange = useMemo(
    () => Array.from({ length: Math.max(segmentCount, 2) }, (_, i) => i * segmentPixelWidth),
    [segmentCount, segmentPixelWidth]
  )

  return (
    <Stack
      position="absolute"
      top={containerPadding}
      bottom={containerPadding}
      left={containerPadding}
      right={containerPadding}
      onLayout={handleLayout as any}
      pointerEvents="none"
    >
      {trackWidth > 0 && segmentCount > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: segmentPixelWidth,
            borderRadius: 2,
            backgroundColor: colors.white,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.12,
            shadowRadius: 3,
            elevation: 2,
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange,
                  outputRange,
                }),
              },
            ],
          }}
        />
      )}
    </Stack>
  )
}
