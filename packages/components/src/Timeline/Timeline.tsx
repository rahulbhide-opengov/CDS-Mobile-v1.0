/**
 * Timeline -- CDS 37 chronological event display
 *
 * Renders a vertical list of timeline events with dots, connectors,
 * and content areas. Supports left, right, and alternating layouts.
 *
 * Features:
 *   - Dot: 12px circle, default gray400, custom color
 *   - Connector: 2px vertical line, gray300
 *   - Alternating: items switch between left and right sides
 *   - Content area: body2 (14/400)
 *   - Title: h5 (14/600), time: caption (12/400)
 *   - Full accessibility: role annotations
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useMemo } from 'react'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Dot diameter */
const DOT_SIZE = 12

/** Connector line width */
const CONNECTOR_WIDTH = 2

/** Default dot color */
const DEFAULT_DOT_COLOR = primitive.gray400

/** Connector color */
const CONNECTOR_COLOR = primitive.gray300

/** Center column width (dot + padding) */
const CENTER_COLUMN_WIDTH = 40

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type TimelinePosition = 'left' | 'right' | 'alternate'

export interface TimelineItemProps {
  /** Optional custom icon element to replace the default dot. */
  icon?: React.ReactNode
  /** Title text for this event. */
  title?: string
  /** Subtitle text rendered below the title. */
  subtitle?: string
  /** Time string displayed in secondary style. */
  time?: string
  /** Custom dot/icon color. Defaults to gray400. */
  color?: string
  /** Arbitrary content rendered in the item body. */
  children?: React.ReactNode
  /** Additional test ID. */
  testID?: string
}

export interface TimelineProps {
  /** TimelineItem elements to render. */
  children: React.ReactNode
  /** Content position relative to the timeline axis. Defaults to "left". */
  position?: TimelinePosition
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const TitleText = styled(TamaguiText, {
  name: 'TimelineTitle',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '600',
  color: primitive.slate700,
})

const SubtitleText = styled(TamaguiText, {
  name: 'TimelineSubtitle',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400',
  color: primitive.slate700,
})

const TimeText = styled(TamaguiText, {
  name: 'TimelineTime',
  fontFamily: '$body',
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  color: primitive.gray500,
})

const BodyText = styled(TamaguiText, {
  name: 'TimelineBody',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '400',
  color: primitive.slate700,
})

// ---------------------------------------------------------------------------
// Timeline dot
// ---------------------------------------------------------------------------

function TimelineDot({
  color = DEFAULT_DOT_COLOR,
  icon,
}: {
  color?: string
  icon?: React.ReactNode
}) {
  if (icon) {
    return (
      <Stack
        width={24}
        height={24}
        borderRadius={12}
        alignItems="center"
        justifyContent="center"
        backgroundColor={color}
      >
        {icon}
      </Stack>
    )
  }

  return (
    <Stack
      width={DOT_SIZE}
      height={DOT_SIZE}
      borderRadius={DOT_SIZE / 2}
      backgroundColor={color}
    />
  )
}

// ---------------------------------------------------------------------------
// Timeline connector (vertical line between dots)
// ---------------------------------------------------------------------------

function TimelineConnector() {
  return (
    <Stack
      width={CONNECTOR_WIDTH}
      flex={1}
      minHeight={24}
      backgroundColor={CONNECTOR_COLOR}
    />
  )
}

// ---------------------------------------------------------------------------
// TimelineItem component
// ---------------------------------------------------------------------------

export const TimelineItem = React.memo(function TimelineItem({
  icon,
  title,
  subtitle,
  time,
  color,
  children,
  testID,
}: TimelineItemProps) {
  // TimelineItem is rendered as-is and laid out by the parent Timeline.
  // Its raw props are read by Timeline via React.Children iteration.
  // This component serves as the public API container.
  return null as any // Rendering is handled by TimelineItemRenderer below
})

TimelineItem.displayName = 'TimelineItem'

// ---------------------------------------------------------------------------
// Internal renderer -- positions content relative to the axis
// ---------------------------------------------------------------------------

function TimelineItemRenderer({
  icon,
  title,
  subtitle,
  time,
  color = DEFAULT_DOT_COLOR,
  children,
  isLast,
  contentSide,
  testID,
}: TimelineItemProps & {
  isLast: boolean
  contentSide: 'left' | 'right'
}) {
  const a11yLabel = useMemo(() => {
    const parts: string[] = []
    if (title) parts.push(title)
    if (subtitle) parts.push(subtitle)
    if (time) parts.push(time)
    return parts.join(', ')
  }, [title, subtitle, time])

  // Content block
  const contentBlock = (
    <Stack
      flex={1}
      paddingBottom={isLast ? 0 : 24}
      accessibilityRole="text"
      accessibilityLabel={a11yLabel}
    >
      {time != null && (
        <TimeText marginBottom={2}>{time}</TimeText>
      )}
      {title != null && (
        <TitleText>{title}</TitleText>
      )}
      {subtitle != null && (
        <SubtitleText marginTop={2}>{subtitle}</SubtitleText>
      )}
      {children != null && (
        <Stack marginTop={8}>
          {typeof children === 'string' ? (
            <BodyText>{children}</BodyText>
          ) : (
            children
          )}
        </Stack>
      )}
    </Stack>
  )

  // Center column: dot + connector
  const centerColumn = (
    <Stack
      width={CENTER_COLUMN_WIDTH}
      alignItems="center"
      paddingTop={2}
    >
      <TimelineDot color={color} icon={icon} />
      {!isLast && <TimelineConnector />}
    </Stack>
  )

  if (contentSide === 'right') {
    // Content on the right, center column on the left
    return (
      <Stack
        flexDirection="row"
        testID={testID}
      >
        {centerColumn}
        {contentBlock}
      </Stack>
    )
  }

  // Content on the left, center column on the right
  return (
    <Stack
      flexDirection="row"
      testID={testID}
    >
      <Stack flex={1} alignItems="flex-end" paddingRight={0}>
        <Stack
          flex={1}
          paddingBottom={isLast ? 0 : 24}
          alignItems="flex-end"
          accessibilityRole="text"
          accessibilityLabel={a11yLabel}
        >
          {time != null && (
            <TimeText marginBottom={2}>{time}</TimeText>
          )}
          {title != null && (
            <TitleText textAlign="right">{title}</TitleText>
          )}
          {subtitle != null && (
            <SubtitleText textAlign="right" marginTop={2}>{subtitle}</SubtitleText>
          )}
          {children != null && (
            <Stack marginTop={8} alignItems="flex-end">
              {typeof children === 'string' ? (
                <BodyText textAlign="right">{children}</BodyText>
              ) : (
                children
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
      {centerColumn}
      {/* Empty spacer for symmetry in alternate mode */}
      <Stack flex={1} />
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Timeline component
// ---------------------------------------------------------------------------

export const Timeline = React.memo(function Timeline({
  children,
  position = 'left',
  accessibilityLabel,
  testID,
}: TimelineProps) {
  // Extract props from TimelineItem children
  const items = useMemo(() => {
    const result: Array<TimelineItemProps & { key: string | number }> = []

    React.Children.forEach(children, (child, index) => {
      if (React.isValidElement<TimelineItemProps>(child)) {
        result.push({
          ...(child.props as TimelineItemProps),
          key: child.key ?? index,
        })
      }
    })

    return result
  }, [children])

  const a11yLabel = accessibilityLabel ?? `Timeline with ${items.length} events`

  if (items.length === 0) {
    return null
  }

  return (
    <Stack
      accessibilityRole="list"
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        // Determine content side based on position prop
        let contentSide: 'left' | 'right'
        if (position === 'left') {
          // "left" position means the axis is on the left, content is to the right
          contentSide = 'right'
        } else if (position === 'right') {
          // "right" position means the axis is on the right, content is to the left
          contentSide = 'left'
        } else {
          // Alternate: even indices on right, odd on left
          contentSide = index % 2 === 0 ? 'right' : 'left'
        }

        return (
          <TimelineItemRenderer
            key={item.key}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            time={item.time}
            color={item.color}
            isLast={isLast}
            contentSide={contentSide}
            testID={item.testID ?? (testID ? `${testID}-item-${index}` : undefined)}
          >
            {item.children}
          </TimelineItemRenderer>
        )
      })}
    </Stack>
  )
})

Timeline.displayName = 'Timeline'
