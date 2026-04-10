import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DOT_SIZE = 8

// ---------------------------------------------------------------------------
// Status color mapping -- maps semantic statuses to CDS color tokens
// ---------------------------------------------------------------------------

type DateStatusType = 'neutral' | 'positive' | 'negative' | 'warning' | 'info'

interface StatusColorSet {
  dot: string
  text: string
}

const STATUS_COLORS: Record<DateStatusType, StatusColorSet> = {
  positive: { dot: '#4CAF50', text: '#388E3C' },   // jade500, jade700
  negative: { dot: '#FF3333', text: '#991F1F' },   // red500, red700
  warning:  { dot: '#FFC107', text: '#FFA000' },   // amber500, amber700
  info:     { dot: '#1E55FF', text: '#123399' },   // ogBlue500, ogBlue700
  neutral:  { dot: '#BDBDBD', text: '#616161' },   // neutral400, neutral700
}

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const DateStatusFrame = styled(HStack, {
  name: 'DateStatus',
  alignItems: 'center',
  gap: '$2',
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DateStatusProps {
  /** Date string to display (e.g. "Mar 15, 2026", "2 days ago") */
  date: string
  /** Semantic status that determines the dot color */
  status: DateStatusType
  /** Optional label displayed above the date (e.g. "Due date", "Created") */
  label?: string
  /** Whether to show the colored status dot. Defaults to true. */
  showDot?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `DateStatus` -- date display with a semantic status indicator.
 *
 * Renders a date string alongside a colored dot that conveys status at a
 * glance. Supports an optional label above the date for context (e.g.
 * "Due date"). The dot colors follow CDS semantic conventions:
 * - positive: jade500
 * - negative: red500
 * - warning: amber500
 * - info: ogBlue500
 * - neutral: neutral400
 */
export function DateStatus({
  date,
  status,
  label,
  showDot = true,
}: DateStatusProps) {
  const colors = STATUS_COLORS[status]

  return (
    <DateStatusFrame
      accessibilityLabel={`${label ? `${label}: ` : ''}${date}, status: ${status}`}
      accessibilityRole="text"
    >
      {/* Status dot */}
      {showDot && (
        <Stack
          width={DOT_SIZE}
          height={DOT_SIZE}
          borderRadius={DOT_SIZE / 2}
          backgroundColor={colors.dot}
          flexShrink={0}
          accessibilityElementsHidden
        />
      )}

      {/* Label + date */}
      <VStack gap="$0.5">
        {label != null && (
          <Text
            variant="caption"
            color="#9E9E9E" // neutral500 / colorSecondary
          >
            {label}
          </Text>
        )}
        <Text
          variant="body3"
          color="#212121" // neutral1000
        >
          {date}
        </Text>
      </VStack>
    </DateStatusFrame>
  )
}
