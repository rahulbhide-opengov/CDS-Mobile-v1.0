/**
 * BarChart -- CDS 37 data visualization bar chart
 *
 * A pure React Native bar chart using View height percentages for bars.
 * No SVG dependency required. Designed for simple data visualization
 * in dashboards, reports, and summary screens.
 *
 * Visual spec:
 *   - Bars: default blurple700, custom color per bar from CDS data viz palette
 *   - Bar border radius: 4px on top corners
 *   - Y-axis labels: caption (12/400), gray500
 *   - X-axis labels: caption (12/400), gray700
 *   - Grid lines: horizontal dashed, gray200
 *   - Value labels: help (10/600) above bars
 *   - Animated: bars grow from 0 to target height
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive, baseStyles } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default chart height in pixels */
const DEFAULT_HEIGHT = 200

/** Default bar width in pixels */
const DEFAULT_BAR_WIDTH = 32

/** Default gap between bars */
const DEFAULT_GAP = 8

/** Border radius on top corners of bars */
const BAR_RADIUS = 4

/** Number of horizontal grid lines (including 0 at bottom) */
const GRID_LINE_COUNT = 5

/** Width allocated for Y-axis labels */
const Y_AXIS_WIDTH = 40

/** Height allocated for X-axis labels */
const X_AXIS_HEIGHT = 24

/** Animation duration in ms */
const ANIMATION_DURATION = 600

/** Dash pattern for grid lines */
const DASH_LENGTH = 4
const DASH_GAP = 4

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BarChartDataPoint {
  /** Label displayed below the bar on the X-axis */
  label: string
  /** Numeric value determining bar height */
  value: number
  /** Optional custom color for this bar. Defaults to blurple700. */
  color?: string
}

export interface BarChartProps {
  /** Array of data points to render as bars. */
  data: BarChartDataPoint[]
  /** Overall chart height in pixels. Defaults to 200. */
  height?: number
  /** Width of each bar in pixels. Defaults to 32. */
  barWidth?: number
  /** Gap between bars in pixels. Defaults to 8. */
  gap?: number
  /** Show value labels above each bar. Defaults to false. */
  showValues?: boolean
  /** Show X-axis labels below each bar. Defaults to true. */
  showLabels?: boolean
  /** Render bars horizontally instead of vertically. Defaults to false. */
  horizontal?: boolean
  /** Animate bars growing from 0 to their value. Defaults to true. */
  animated?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Y-axis helpers
// ---------------------------------------------------------------------------

/**
 * Calculate "nice" Y-axis maximum and step values.
 * Rounds up to a clean number for readable grid lines.
 */
function computeYAxis(maxValue: number): { max: number; step: number } {
  if (maxValue <= 0) return { max: 100, step: 25 }

  // Find a nice ceiling
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))
  const normalized = maxValue / magnitude

  let niceMax: number
  if (normalized <= 1) niceMax = magnitude
  else if (normalized <= 2) niceMax = 2 * magnitude
  else if (normalized <= 5) niceMax = 5 * magnitude
  else niceMax = 10 * magnitude

  // Ensure max is at least slightly above the data max
  if (niceMax < maxValue) niceMax = niceMax * 2

  const step = niceMax / (GRID_LINE_COUNT - 1)
  return { max: niceMax, step }
}

/**
 * Format a number for axis labels -- compact display.
 */
function formatAxisValue(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  if (Number.isInteger(value)) return String(value)
  return value.toFixed(1)
}

// ---------------------------------------------------------------------------
// DashedLine -- horizontal dashed line via alternating views
// ---------------------------------------------------------------------------

const DashedLine = React.memo(function DashedLine({ width }: { width: number }) {
  const dashes = useMemo(() => {
    const count = Math.ceil(width / (DASH_LENGTH + DASH_GAP))
    return Array.from({ length: count }, (_, i) => (
      <View
        key={i}
        style={{
          width: DASH_LENGTH,
          height: 1,
          backgroundColor: primitive.gray200,
          marginRight: DASH_GAP,
        }}
      />
    ))
  }, [width])

  return (
    <View style={styles.dashedLineContainer}>
      {dashes}
    </View>
  )
})

// ---------------------------------------------------------------------------
// AnimatedBar -- a single bar with optional grow animation
// ---------------------------------------------------------------------------

interface AnimatedBarProps {
  heightPercent: number
  color: string
  width: number
  chartHeight: number
  animated: boolean
  delay: number
}

const AnimatedBar = React.memo(function AnimatedBar({
  heightPercent,
  color,
  width,
  chartHeight,
  animated,
  delay,
}: AnimatedBarProps) {
  const animValue = useRef(new Animated.Value(animated ? 0 : heightPercent)).current

  useEffect(() => {
    if (animated) {
      Animated.timing(animValue, {
        toValue: heightPercent,
        duration: ANIMATION_DURATION,
        delay,
        useNativeDriver: false, // height animation requires layout driver
      }).start()
    } else {
      animValue.setValue(heightPercent)
    }
  }, [animated, animValue, heightPercent, delay])

  const barHeight = animValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, chartHeight],
    extrapolate: 'clamp',
  })

  return (
    <Animated.View
      style={{
        width,
        height: barHeight,
        backgroundColor: color,
        borderTopLeftRadius: BAR_RADIUS,
        borderTopRightRadius: BAR_RADIUS,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    />
  )
})

// ---------------------------------------------------------------------------
// BarChart component (vertical layout)
// ---------------------------------------------------------------------------

export const BarChart = React.memo(function BarChart({
  data,
  height = DEFAULT_HEIGHT,
  barWidth = DEFAULT_BAR_WIDTH,
  gap = DEFAULT_GAP,
  showValues = false,
  showLabels = true,
  horizontal = false,
  animated = true,
  accessibilityLabel,
  testID,
}: BarChartProps) {
  // Compute Y-axis scale
  const dataMax = useMemo(
    () => Math.max(...data.map((d) => d.value), 0),
    [data],
  )
  const { max: yMax, step: yStep } = useMemo(() => computeYAxis(dataMax), [dataMax])

  // Y-axis labels (from top to bottom)
  const yLabels = useMemo(() => {
    const labels: string[] = []
    for (let i = GRID_LINE_COUNT - 1; i >= 0; i--) {
      labels.push(formatAxisValue(i * yStep))
    }
    return labels
  }, [yStep])

  // Chart area dimensions
  const chartHeight = height
  const chartWidth = data.length * barWidth + (data.length - 1) * gap

  // Accessibility
  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return `Bar chart with ${data.length} data points. Maximum value: ${formatAxisValue(dataMax)}.`
  }, [accessibilityLabel, data.length, dataMax])

  // Horizontal layout is a 90-degree rotation of the vertical chart
  if (horizontal) {
    return (
      <Stack
        accessibilityRole="image"
        accessibilityLabel={a11yLabel}
        testID={testID}
      >
        {/* Horizontal bars */}
        <Stack gap={gap}>
          {data.map((point, index) => {
            const widthPercent = yMax > 0 ? (point.value / yMax) * 100 : 0
            const barColor = point.color || primitive.blurple700

            return (
              <Stack key={index} flexDirection="row" alignItems="center" gap={8}>
                {/* Label */}
                {showLabels && (
                  <TamaguiText
                    fontFamily="$body"
                    fontSize={baseStyles.caption.mobile.fontSize}
                    fontWeight={String(baseStyles.caption.mobile.fontWeight) as '400'}
                    lineHeight={baseStyles.caption.mobile.lineHeight}
                    color={primitive.gray700}
                    width={Y_AXIS_WIDTH}
                    textAlign="right"
                    numberOfLines={1}
                  >
                    {point.label}
                  </TamaguiText>
                )}

                {/* Bar */}
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  flex={1}
                >
                  <View
                    style={{
                      height: barWidth,
                      width: `${widthPercent}%`,
                      backgroundColor: barColor,
                      borderTopRightRadius: BAR_RADIUS,
                      borderBottomRightRadius: BAR_RADIUS,
                      minWidth: widthPercent > 0 ? 2 : 0,
                    }}
                  />

                  {/* Value label */}
                  {showValues && (
                    <TamaguiText
                      fontFamily="$body"
                      fontSize={baseStyles.help.mobile.fontSize}
                      fontWeight={String(baseStyles.help.mobile.fontWeight) as '600'}
                      lineHeight={baseStyles.help.mobile.lineHeight}
                      letterSpacing={baseStyles.help.mobile.letterSpacing}
                      color={primitive.gray700}
                      marginLeft={4}
                    >
                      {formatAxisValue(point.value)}
                    </TamaguiText>
                  )}
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    )
  }

  // Vertical layout (default)
  return (
    <Stack
      accessibilityRole="image"
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      <Stack flexDirection="row">
        {/* Y-axis labels */}
        <Stack
          width={Y_AXIS_WIDTH}
          height={chartHeight}
          justifyContent="space-between"
          paddingRight={8}
        >
          {yLabels.map((label, index) => (
            <TamaguiText
              key={index}
              fontFamily="$body"
              fontSize={baseStyles.caption.mobile.fontSize}
              fontWeight={String(baseStyles.caption.mobile.fontWeight) as '400'}
              lineHeight={baseStyles.caption.mobile.lineHeight}
              color={primitive.gray500}
              textAlign="right"
              numberOfLines={1}
            >
              {label}
            </TamaguiText>
          ))}
        </Stack>

        {/* Chart area */}
        <Stack flex={1}>
          {/* Grid lines (absolute positioned) */}
          <View style={[styles.gridContainer, { height: chartHeight }]}>
            {yLabels.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.gridLineRow,
                  {
                    top: (index / (GRID_LINE_COUNT - 1)) * chartHeight - 0.5,
                  },
                ]}
              >
                <DashedLine width={chartWidth} />
              </View>
            ))}
          </View>

          {/* Bars */}
          <Stack
            flexDirection="row"
            alignItems="flex-end"
            height={chartHeight}
            gap={gap}
          >
            {data.map((point, index) => {
              const heightPercent = yMax > 0 ? (point.value / yMax) * 100 : 0
              const barColor = point.color || primitive.blurple700

              return (
                <Stack key={index} alignItems="center" gap={4}>
                  {/* Value label above bar */}
                  {showValues && (
                    <TamaguiText
                      fontFamily="$body"
                      fontSize={baseStyles.help.mobile.fontSize}
                      fontWeight={String(baseStyles.help.mobile.fontWeight) as '600'}
                      lineHeight={baseStyles.help.mobile.lineHeight}
                      letterSpacing={baseStyles.help.mobile.letterSpacing}
                      color={primitive.gray700}
                      numberOfLines={1}
                    >
                      {formatAxisValue(point.value)}
                    </TamaguiText>
                  )}

                  {/* Animated bar */}
                  <AnimatedBar
                    heightPercent={heightPercent}
                    color={barColor}
                    width={barWidth}
                    chartHeight={chartHeight}
                    animated={animated}
                    delay={index * 50}
                  />
                </Stack>
              )
            })}
          </Stack>
        </Stack>
      </Stack>

      {/* X-axis labels */}
      {showLabels && (
        <Stack
          flexDirection="row"
          marginLeft={Y_AXIS_WIDTH}
          height={X_AXIS_HEIGHT}
          alignItems="flex-start"
          paddingTop={4}
          gap={gap}
        >
          {data.map((point, index) => (
            <TamaguiText
              key={index}
              fontFamily="$body"
              fontSize={baseStyles.caption.mobile.fontSize}
              fontWeight={String(baseStyles.caption.mobile.fontWeight) as '400'}
              lineHeight={baseStyles.caption.mobile.lineHeight}
              color={primitive.gray700}
              width={barWidth}
              textAlign="center"
              numberOfLines={1}
            >
              {point.label}
            </TamaguiText>
          ))}
        </Stack>
      )}
    </Stack>
  )
})

BarChart.displayName = 'BarChart'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  gridContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  gridLineRow: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  dashedLineContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
})
