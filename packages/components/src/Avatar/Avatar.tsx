import React, { useState, useMemo } from 'react'
import { Image } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Size configuration
// ---------------------------------------------------------------------------

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 20,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
}

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 16,
  xl: 22,
}

const FONT_WEIGHT_MAP: Record<AvatarSize, string> = {
  xs: '$regular',
  sm: '$regular',
  md: '$semibold',
  lg: '$semibold',
  xl: '$semibold',
}

const STATUS_DOT_SIZE: Record<AvatarSize, number> = {
  xs: 5,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
}

const STATUS_BORDER: Record<AvatarSize, number> = {
  xs: 1,
  sm: 1.5,
  md: 2,
  lg: 2,
  xl: 3,
}

// ---------------------------------------------------------------------------
// Shape radius mapping
// ---------------------------------------------------------------------------

type AvatarShape = 'circle' | 'rounded' | 'square'

const SHAPE_RADIUS: Record<AvatarShape, number> = {
  circle: 9999,
  rounded: 8,
  square: 4,
}

// ---------------------------------------------------------------------------
// Deterministic background colors for initials
// ---------------------------------------------------------------------------

const AVATAR_PALETTE = [
  colors.primary, // primary
  primitive.blue500, // ogBlue500
  primitive.teal500, // teal500
  colors.jade500, // jade500
  colors.amber500, // amber500
  primitive.rose500, // rose500
  primitive.port500, // port500
  primitive.dataSeries16, // dataSeries16
  primitive.dataSeries12, // dataSeries12
  primitive.teal700, // teal700
]

function hashName(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

// ---------------------------------------------------------------------------
// Status indicator dot
// ---------------------------------------------------------------------------

type StatusType = 'online' | 'offline' | 'busy'

const STATUS_COLORS: Record<StatusType, string> = {
  online: colors.jade500, // jade500
  offline: primitive.neutral500, // neutral500
  busy: colors.red600, // red600
}

const STATUS_LABELS: Record<StatusType, string> = {
  online: 'Online',
  offline: 'Offline',
  busy: 'Busy',
}

function StatusDot({
  status,
  size,
}: {
  status: StatusType
  size: AvatarSize
}) {
  const dotSize = STATUS_DOT_SIZE[size]
  const borderWidth = STATUS_BORDER[size]

  return (
    <Stack
      position="absolute"
      bottom={0}
      right={0}
      width={dotSize}
      height={dotSize}
      borderRadius={9999}
      backgroundColor={STATUS_COLORS[status]}
      borderWidth={borderWidth}
      borderColor="white"
      zIndex={1}
      role="status"
      accessibilityLabel={STATUS_LABELS[status]}
    />
  )
}

// ---------------------------------------------------------------------------
// Styled frame
// ---------------------------------------------------------------------------

const AvatarFrame = styled(Stack, {
  name: 'Avatar',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
})

// ---------------------------------------------------------------------------
// Initials extraction
// ---------------------------------------------------------------------------

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? ''
  return (
    (parts[0][0] ?? '') + (parts[parts.length - 1][0] ?? '')
  ).toUpperCase()
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface AvatarProps {
  /** Image source URI. Falls back to initials when the image fails to load. */
  source?: { uri: string }
  /** Full name of the person -- used to derive initials and background color. */
  name?: string
  /** Size preset. */
  size?: AvatarSize
  /** Border radius shape. */
  shape?: AvatarShape
  /** Online presence status indicator dot. */
  status?: StatusType
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

/**
 * `Avatar` -- user identity element displaying an image, or initials as
 * a fallback with a deterministic background color.
 *
 * Conforms to CDS 37 avatar specifications with five size presets, three
 * shape options, and an optional status indicator dot.
 */
export function Avatar({
  source,
  name,
  size = 'md',
  shape = 'circle',
  status,
  accessibilityLabel,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const dimension = SIZE_MAP[size]
  const borderRadius = SHAPE_RADIUS[shape]
  const fontSize = FONT_SIZE_MAP[size]
  const fontWeight = FONT_WEIGHT_MAP[size]

  // Deterministic background based on the name string
  const backgroundColor = useMemo(() => {
    if (!name) return AVATAR_PALETTE[0]
    return AVATAR_PALETTE[hashName(name) % AVATAR_PALETTE.length]
  }, [name])

  const initials = name ? getInitials(name) : ''

  const showImage = source?.uri && !imageError
  const label =
    accessibilityLabel ?? (name ? `Avatar for ${name}` : 'Avatar')

  return (
    <Stack position="relative" alignSelf="flex-start">
      <AvatarFrame
        width={dimension}
        height={dimension}
        borderRadius={borderRadius}
        backgroundColor={showImage ? '$background' : backgroundColor}
        accessibilityRole="image"
        accessibilityLabel={label}
      >
        {showImage ? (
          <Image
            source={{ uri: source!.uri }}
            style={{
              width: dimension,
              height: dimension,
              borderRadius,
            }}
            onError={() => setImageError(true)}
            accessibilityIgnoresInvertColors
          />
        ) : (
          <Text
            color="white"
            fontSize={fontSize}
            fontWeight={fontWeight as any}
            textAlign="center"
            accessibilityElementsHidden
          >
            {initials}
          </Text>
        )}
      </AvatarFrame>

      {status && <StatusDot status={status} size={size} />}
    </Stack>
  )
}
