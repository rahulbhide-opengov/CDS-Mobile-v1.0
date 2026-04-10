import React, { useCallback } from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TOP_BAR_HEIGHT = 56
const ONLINE_DOT_SIZE = 8

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const TopBarFrame = styled(HStack, {
  name: 'ChatTopBar',
  backgroundColor: '#FFFFFF',
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  alignItems: 'center',
  minHeight: TOP_BAR_HEIGHT,
  borderBottomWidth: 1,
  borderBottomColor: '#EEEEEE', // neutral200
  gap: '$3',
})

// ---------------------------------------------------------------------------
// Back arrow icon (pure Stack-based)
// ---------------------------------------------------------------------------

const BackArrow = React.memo(function BackArrow() {
  return (
    <Stack width={24} height={24} alignItems="center" justifyContent="center">
      {/* Left-pointing chevron */}
      <Stack
        width={10}
        height={10}
        borderLeftWidth={2}
        borderBottomWidth={2}
        borderColor="#4B3FFF"
        transform={[{ rotate: '45deg' }]}
        marginLeft={4}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Online status dot
// ---------------------------------------------------------------------------

const OnlineDot = React.memo(function OnlineDot({ online }: { online: boolean }) {
  return (
    <Stack
      width={ONLINE_DOT_SIZE}
      height={ONLINE_DOT_SIZE}
      borderRadius={ONLINE_DOT_SIZE / 2}
      backgroundColor={online ? '#4CAF50' : '#BDBDBD'} // jade500 : neutral400
      borderWidth={1.5}
      borderColor="#FFFFFF"
      position="absolute"
      bottom={0}
      right={0}
    />
  )
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatTopBarProps {
  /** Title displayed in the header (e.g. "OG Assist") */
  title: string
  /** Subtitle below the title (e.g. "Online" or "Last seen 2 min ago") */
  subtitle?: string
  /** Avatar element rendered beside the title */
  avatar?: React.ReactNode
  /** Called when the back button is tapped. Omit to hide the back button. */
  onBack?: () => void
  /** Up to 2 trailing action elements (icons/buttons) */
  trailingActions?: React.ReactNode[]
  /** Whether the assistant/agent is online */
  online?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `ChatTopBar` -- conversation header for OG Assist chat.
 *
 * Provides a back button, avatar with optional online indicator,
 * title/subtitle, and trailing action slots. Follows the standard
 * CDS top-bar height (56px) with a bottom border separator.
 */
export function ChatTopBar({
  title,
  subtitle,
  avatar,
  onBack,
  trailingActions,
  online,
}: ChatTopBarProps) {
  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  // Derive subtitle text from online prop when no explicit subtitle is given
  const resolvedSubtitle = subtitle ?? (online != null ? (online ? 'Online' : 'Offline') : undefined)

  return (
    <TopBarFrame
      accessibilityRole="header"
      accessibilityLabel={`${title}${resolvedSubtitle ? `, ${resolvedSubtitle}` : ''}`}
    >
      {/* Back button */}
      {onBack != null && (
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          width={40}
          height={40}
          borderRadius={20}
          alignItems="center"
          justifyContent="center"
          minWidth={40}
          minHeight={40}
        >
          <BackArrow />
        </Pressable>
      )}

      {/* Avatar with online indicator */}
      {avatar != null && (
        <Stack width={36} height={36} borderRadius={18} overflow="visible" flexShrink={0}>
          <Stack width={36} height={36} borderRadius={18} overflow="hidden">
            {avatar}
          </Stack>
          {online != null && <OnlineDot online={online} />}
        </Stack>
      )}

      {/* Title + subtitle */}
      <VStack flex={1} gap="$0.5" justifyContent="center">
        <Text
          variant="h5"
          numberOfLines={1}
          color="#212121" // neutral1000
        >
          {title}
        </Text>
        {resolvedSubtitle != null && (
          <HStack alignItems="center" gap="$1">
            {/* Small online dot inline with subtitle text when no avatar is present */}
            {avatar == null && online != null && (
              <Stack
                width={6}
                height={6}
                borderRadius={3}
                backgroundColor={online ? '#4CAF50' : '#BDBDBD'}
              />
            )}
            <Text
              variant="caption"
              color="#9E9E9E" // neutral500
              numberOfLines={1}
            >
              {resolvedSubtitle}
            </Text>
          </HStack>
        )}
      </VStack>

      {/* Trailing actions */}
      {trailingActions != null && trailingActions.length > 0 && (
        <HStack gap="$1" alignItems="center" flexShrink={0}>
          {trailingActions.map((action, index) => (
            <React.Fragment key={index}>{action}</React.Fragment>
          ))}
        </HStack>
      )}
    </TopBarFrame>
  )
}
