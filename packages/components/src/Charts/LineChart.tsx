/**
 * LineChart -- CDS 37 data visualization line chart
 *
 * A line chart rendered with react-native-svg for crisp Path rendering.
 * Supports multiple datasets, optional area fill, animated line drawing,
 * and interactive data point dots.
 *
 * Visual spec:
 *   - Line: 2px stroke, blurple700 default
 *   - Dots: 6px circles at data points, same color as line
 *   - Fill: optional area fill below line with 10% opacity
 *   - Grid: horizontal dashed lines, gray200
 *   - Y-axis labels: caption (12/400), gray500
 *   - X-axis labels: caption (12/400), gray700
 *   - Value labels: help (10/600) above dots
 *   - Animated: line draws from left to right
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Stack, Text as TamaguiText } from '@tamagui/core'
import Svg, { Path, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg'
import { primitive, baseStyles } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default chart height in pixels */
const DEFAULT_HEIGHT = 200

/** Line stroke width */
const LINE_WIDTH = 2

/** Dot radius at data points */
const DOT_RADIUS = 3

/** Number of horizontal grid lines */
const GRID_LINE_COUNT = 5

/** Width allocated for Y-axis labels */
const Y_AXIS_WIDTH = 40

/** Height allocated for X-axis labels */
const X_AXIS_HEIGHT = 24

/** Padding inside the SVG chart area */
const CHART_PADDING = { top: 8, right: 8, bottom: 0, left: 0 }

/** Animation duration in ms */
const ANIMATION_DURATION = 800

/** Dash pattern for grid lines */
const DASH_LENGTH = 4
const DASH_GAP = 4

/** Fill opacity for area beneath lines */
const AREA_FILL_OPACITY = 0.1

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LineChartDataPoint {
  /** Label displayed on the X-axis */
  label: string
  /** Numeric value */
  value: number
}

export interface LineChartDataset {
  /** Array of data points for this line */
  data: LineChartDataPoint[]
  /** Line color. Defaults to blurple700. */
  lineColor?: string
  /** Optional area fill color below the line. Uses lineColor with 10% opacity if true. */
  fillColor?: string | boolean
  /** Label for this dataset (used in legends/accessibility) */
  label?: string
}

export interface LineChartProps {
  /** Dataset(s) to render. Can be a single dataset array or multiple LineChartDataset objects. */
  data: LineChartDataPoint[] | LineChartDataset[]
  /** Overall chart height in pixels. Defaults to 200. */
  height?: number
  /** Line color for single-dataset mode. Defaults to blurple700. */
  lineColor?: string
  /** Optional area fill color or boolean for single-dataset mode. */
  fillColor?: string | boolean
  /** Show dots at data points. Defaults to true. */
  showDots?: boolean
  /** Show value labels above data points. Defaults to false. */
  showValues?: boolean
  /** Show horizontal grid lines. Defaults to true. */
  showGrid?: boolean
  /** Animate line drawing from left to right. Defaults to true. */
  animated?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Y-axis helpers (shared with BarChart)
// ---------------------------------------------------------------------------

function computeYAxis(maxValue: number): { max: number; step: number } {
  if (maxValue <= 0) return { max: 100, step: 25 }

  const magnitude = Math.pow(10, Math.floor(Math.log10(maxValue)))
  const normalized = maxValue / magnitude

  let niceMax: number
  if (normalized <= 1) niceMax = magnitude
  else if (normalized <= 2) niceMax = 2 * magnitude
  else if (normalized <= 5) niceMax = 5 * magnitude
  else niceMax = 10 * magnitude

  if (niceMax < maxValue) niceMax = niceMax * 2

  const step = niceMax / (GRID_LINE_COUNT - 1)
  return { max: niceMax, step }
}

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
    <View style={localStyles.dashedLineContainer}>
      {dashes}
    </View>
  )
})

// ---------------------------------------------------------------------------
// Normalize data prop into datasets array
// ---------------------------------------------------------------------------

function normalizeDatasets(
  data: LineChartDataPoint[] | LineChartDataset[],
  lineColor?: string,
  fillColor?: string | boolean,
): LineChartDataset[] {
  // Check if it's an array of datasets or a flat array of data points
  if (data.length === 0) return []

  const first = data[0]
  if ('data' in first && Array.isArray((first as LineChartDataset).data)) {
    return data as LineChartDataset[]
  }

  // Single dataset mode
  return [
    {
      data: data as LineChartDataPoint[],
      lineColor,
      fillColor,
    },
  ]
}

// ---------------------------------------------------------------------------
// SVG path builder
// ---------------------------------------------------------------------------

interface ChartPoint {
  x: number
  y: number
  value: number
  label: string
}

function buildPoints(
  data: LineChartDataPoint[],
  chartWidth: number,
  chartHeight: number,
  yMax: number,
): ChartPoint[] {
  if (data.length === 0) return []
  if (data.length === 1) {
    return [
      {
        x: CHART_PADDING.left + chartWidth / 2,
        y: CHART_PADDING.top + chartHeight - (data[0].value / yMax) * chartHeight,
        value: data[0].value,
        label: data[0].label,
      },
    ]
  }

  const drawableWidth = chartWidth - CHART_PADDING.left - CHART_PADDING.right
  const drawableHeight = chartHeight - CHART_PADDING.top - CHART_PADDING.bottom

  return data.map((point, index) => ({
    x: CHART_PADDING.left + (index / (data.length - 1)) * drawableWidth,
    y: CHART_PADDING.top + drawableHeight - (point.value / yMax) * drawableHeight,
    value: point.value,
    label: point.label,
  }))
}

function buildLinePath(points: ChartPoint[]): string {
  if (points.length === 0) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`
  }
  return d
}

function buildAreaPath(points: ChartPoint[], chartHeight: number): string {
  if (points.length === 0) return ''
  const bottom = CHART_PADDING.top + chartHeight - CHART_PADDING.bottom
  let d = `M ${points[0].x} ${bottom}`
  d += ` L ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`
  }
  d += ` L ${points[points.length - 1].x} ${bottom}`
  d += ' Z'
  return d
}

// ---------------------------------------------------------------------------
// Animated SVG path -- line draw effect via strokeDashoffset
// ---------------------------------------------------------------------------

const AnimatedPath = Animated.createAnimatedComponent(Path)

/**
 * Hook that returns an Animated.Value driving strokeDashoffset from
 * totalLength to 0, producing a "draw from left to right" effect.
 */
function useLineDraw(animated: boolean, pathLength: number) {
  const offset = useRef(new Animated.Value(animated ? pathLength : 0)).current

  useEffect(() => {
    if (animated && pathLength > 0) {
      offset.setValue(pathLength)
      Animated.timing(offset, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }).start()
    } else {
      offset.setValue(0)
    }
  }, [animated, offset, pathLength])

  return offset
}

/**
 * Estimate the total length of a polyline path built from ChartPoints.
 * Used as the strokeDasharray/strokeDashoffset base for the draw animation.
 */
function estimatePathLength(points: ChartPoint[]): number {
  let length = 0
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x
    const dy = points[i].y - points[i - 1].y
    length += Math.sqrt(dx * dx + dy * dy)
  }
  return length
}

// ---------------------------------------------------------------------------
// LineChart component
// ---------------------------------------------------------------------------

export const LineChart = React.memo(function LineChart({
  data,
  height = DEFAULT_HEIGHT,
  lineColor: propLineColor,
  fillColor: propFillColor,
  showDots = true,
  showValues = false,
  showGrid = true,
  animated = true,
  accessibilityLabel,
  testID,
}: LineChartProps) {
  // Normalize to datasets
  const datasets = useMemo(
    () => normalizeDatasets(data, propLineColor, propFillColor),
    [data, propLineColor, propFillColor],
  )

  // Compute global Y-axis from all datasets
  const globalMax = useMemo(() => {
    let max = 0
    for (const ds of datasets) {
      for (const pt of ds.data) {
        if (pt.value > max) max = pt.value
      }
    }
    return max
  }, [datasets])

  const { max: yMax, step: yStep } = useMemo(() => computeYAxis(globalMax), [globalMax])

  // Y-axis labels (top to bottom)
  const yLabels = useMemo(() => {
    const labels: string[] = []
    for (let i = GRID_LINE_COUNT - 1; i >= 0; i--) {
      labels.push(formatAxisValue(i * yStep))
    }
    return labels
  }, [yStep])

  // X-axis labels from the first dataset (all datasets should share labels)
  const xLabels = useMemo(() => {
    if (datasets.length === 0) return []
    return datasets[0].data.map((pt) => pt.label)
  }, [datasets])

  // Chart dimensions (SVG drawing area, excluding axis labels)
  const chartHeight = height - CHART_PADDING.top - CHART_PADDING.bottom

  // Measure the SVG width from the data count and distribute evenly
  // For layout, we use a flexible approach with the SVG filling available space
  const svgWidth = useMemo(() => {
    const pointCount = xLabels.length
    if (pointCount <= 1) return 200
    // Approximate: ~50px per data point, minimum 200
    return Math.max(200, pointCount * 50)
  }, [xLabels.length])

  // Build points and paths for each dataset
  const chartData = useMemo(() => {
    return datasets.map((ds) => {
      const points = buildPoints(ds.data, svgWidth, chartHeight, yMax)
      const linePath = buildLinePath(points)
      const areaPath = buildAreaPath(points, chartHeight)
      const color = ds.lineColor || primitive.blurple700

      let fill: string | undefined
      if (ds.fillColor === true) {
        fill = color
      } else if (typeof ds.fillColor === 'string') {
        fill = ds.fillColor
      }

      const pathLength = estimatePathLength(points)
      return { points, linePath, areaPath, color, fill, label: ds.label, pathLength }
    })
  }, [datasets, svgWidth, chartHeight, yMax])

  // Animation -- use the longest path length for the draw animation
  const maxPathLength = useMemo(
    () => Math.max(...chartData.map((cd) => cd.pathLength), 0),
    [chartData],
  )
  const dashOffset = useLineDraw(animated, maxPathLength)

  // Accessibility
  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    const dsCount = datasets.length
    const ptCount = datasets[0]?.data.length || 0
    return `Line chart with ${dsCount} dataset${dsCount > 1 ? 's' : ''}, ${ptCount} data points. Maximum value: ${formatAxisValue(globalMax)}.`
  }, [accessibilityLabel, datasets, globalMax])

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
          height={height}
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
          {/* Grid lines (behind SVG) */}
          {showGrid && (
            <View style={[localStyles.gridContainer, { height }]}>
              {yLabels.map((_, index) => (
                <View
                  key={index}
                  style={[
                    localStyles.gridLineRow,
                    {
                      top: (index / (GRID_LINE_COUNT - 1)) * height - 0.5,
                    },
                  ]}
                >
                  <DashedLine width={svgWidth} />
                </View>
              ))}
            </View>
          )}

          {/* SVG chart */}
          <Svg width={svgWidth} height={height} style={localStyles.svg}>
            <Defs>
              {/* Gradient fills for each dataset */}
              {chartData.map((cd, dsIndex) =>
                cd.fill ? (
                  <LinearGradient
                    key={`fill-${dsIndex}`}
                    id={`areaFill${dsIndex}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <Stop
                      offset="0"
                      stopColor={cd.fill}
                      stopOpacity={String(AREA_FILL_OPACITY)}
                    />
                    <Stop
                      offset="1"
                      stopColor={cd.fill}
                      stopOpacity="0"
                    />
                  </LinearGradient>
                ) : null,
              )}
            </Defs>

            {/* Render each dataset */}
            {chartData.map((cd, dsIndex) => (
              <G key={dsIndex}>
                {/* Area fill */}
                {cd.fill && (
                  <Path
                    d={cd.areaPath}
                    fill={`url(#areaFill${dsIndex})`}
                    strokeWidth={0}
                  />
                )}

                {/* Line path -- animated draw via strokeDashoffset */}
                <AnimatedPath
                  d={cd.linePath}
                  stroke={cd.color}
                  strokeWidth={LINE_WIDTH}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={animated ? `${cd.pathLength}` : undefined}
                  strokeDashoffset={animated ? dashOffset : undefined}
                />

                {/* Data point dots */}
                {showDots &&
                  cd.points.map((pt, ptIndex) => (
                    <Circle
                      key={ptIndex}
                      cx={pt.x}
                      cy={pt.y}
                      r={DOT_RADIUS}
                      fill={primitive.white}
                      stroke={cd.color}
                      strokeWidth={LINE_WIDTH}
                    />
                  ))}
              </G>
            ))}
          </Svg>

          {/* Value labels (positioned above dots via absolute layout) */}
          {showValues && chartData.length > 0 && (
            <View style={[localStyles.valuesOverlay, { width: svgWidth, height }]}>
              {chartData.map((cd, dsIndex) =>
                cd.points.map((pt, ptIndex) => (
                  <View
                    key={`${dsIndex}-${ptIndex}`}
                    style={[
                      localStyles.valueLabel,
                      {
                        left: pt.x,
                        top: pt.y - 18,
                      },
                    ]}
                  >
                    <TamaguiText
                      fontFamily="$body"
                      fontSize={baseStyles.help.mobile.fontSize}
                      fontWeight={String(baseStyles.help.mobile.fontWeight) as '600'}
                      lineHeight={baseStyles.help.mobile.lineHeight}
                      letterSpacing={baseStyles.help.mobile.letterSpacing}
                      color={primitive.gray700}
                    >
                      {formatAxisValue(pt.value)}
                    </TamaguiText>
                  </View>
                )),
              )}
            </View>
          )}
        </Stack>
      </Stack>

      {/* X-axis labels */}
      {xLabels.length > 0 && (
        <Stack
          flexDirection="row"
          marginLeft={Y_AXIS_WIDTH}
          height={X_AXIS_HEIGHT}
          alignItems="flex-start"
          paddingTop={4}
        >
          {xLabels.map((label, index) => {
            // Position labels to align with data points
            const pointCount = xLabels.length
            const drawableWidth = svgWidth - CHART_PADDING.left - CHART_PADDING.right
            const x =
              pointCount <= 1
                ? svgWidth / 2
                : CHART_PADDING.left + (index / (pointCount - 1)) * drawableWidth

            return (
              <View
                key={index}
                style={[
                  localStyles.xLabel,
                  { left: x },
                ]}
              >
                <TamaguiText
                  fontFamily="$body"
                  fontSize={baseStyles.caption.mobile.fontSize}
                  fontWeight={String(baseStyles.caption.mobile.fontWeight) as '400'}
                  lineHeight={baseStyles.caption.mobile.lineHeight}
                  color={primitive.gray700}
                  numberOfLines={1}
                  textAlign="center"
                >
                  {label}
                </TamaguiText>
              </View>
            )
          })}
        </Stack>
      )}
    </Stack>
  )
})

LineChart.displayName = 'LineChart'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const localStyles = StyleSheet.create({
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
  svg: {
    overflow: 'visible',
  },
  valuesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  valueLabel: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }],
  },
  xLabel: {
    position: 'absolute',
    transform: [{ translateX: -20 }],
    width: 40,
    alignItems: 'center',
  },
})
