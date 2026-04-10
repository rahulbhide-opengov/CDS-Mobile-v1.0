import React, { useState, useMemo } from 'react'
import { Image } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Size configuration
// ---------------------------------------------------------------------------

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE_MAP: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
}

const FONT_SIZE_MAP: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 20,
  xl: 26,
}

const STATUS_DOT_SIZE: Record<AvatarSize, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 14,
  xl: 16,
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
  '#4B3FFF', // primary
  '#1E55FF', // ogBlue500
  '#009688', // teal500
  '#4CAF50', // jade500
  '#FFC107', // amber500
  '#E91E63', // rose500
  '#9C27B0', // port500
  '#FF5722', // dataSeries16
  '#3F51B5', // dataSeries12
  '#00796B', // teal700
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
  online: '#4CAF50', // jade500
  offline: '#9E9E9E', // neutral500
  busy: '#CC2929', // red600
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
            fontWeight="$semibold"
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
