import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

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
  positive: { dot: primitive.green500, text: primitive.green700 },   // jade500, jade700
  negative: { dot: primitive.red500, text: primitive.red700 },   // red500, red700
  warning:  { dot: primitive.amber500, text: primitive.amber700 },   // amber500, amber700
  info:     { dot: primitive.blue500, text: primitive.blue700 },   // ogBlue500, ogBlue700
  neutral:  { dot: primitive.neutral400, text: primitive.neutral700 },   // neutral400, neutral700
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
            color={primitive.neutral500} // neutral500 / colorSecondary
          >
            {label}
          </Text>
        )}
        <Text
          variant="body3"
          color={primitive.neutral900} // neutral900
        >
          {date}
        </Text>
      </VStack>
    </DateStatusFrame>
  )
}
