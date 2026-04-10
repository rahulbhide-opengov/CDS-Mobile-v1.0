import React, { useCallback, useEffect, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, Pressable } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Brand primary color for user bubble background */
const USER_BG = '#4B3FFF'
/** Neutral100 for assistant bubble background */
const ASSISTANT_BG = '#F5F5F5'
/** Typing indicator dot size */
const DOT_SIZE = 6
/** Number of dots in the typing indicator */
const DOT_COUNT = 3
/** Animation cycle length for each dot (ms) */
const DOT_CYCLE_DURATION = 1400

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const BubbleFrame = styled(Stack, {
  name: 'ChatBubbleFrame',
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  maxWidth: '80%',

  variants: {
    sender: {
      user: {
        backgroundColor: USER_BG,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 4,
      },
      assistant: {
        backgroundColor: ASSISTANT_BG,
        alignSelf: 'flex-start',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 16,
      },
    },
  } as const,

  defaultVariants: {
    sender: 'assistant',
  },
})

// ---------------------------------------------------------------------------
// Typing indicator with staggered opacity animation
// ---------------------------------------------------------------------------

function TypingDot({ delay }: { delay: number }) {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: DOT_CYCLE_DURATION / 3,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: DOT_CYCLE_DURATION / 3,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        // Pause until the full cycle elapses before looping
        Animated.delay(DOT_CYCLE_DURATION - delay - (DOT_CYCLE_DURATION / 3) * 2),
      ]),
    )
    animation.start()
    return () => animation.stop()
  }, [delay, opacity])

  return (
    <Animated.View
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: '#9E9E9E', // neutral500
        opacity,
      }}
    />
  )
}

const TypingIndicator = React.memo(function TypingIndicator() {
  return (
    <HStack gap="$1.5" alignItems="center" paddingVertical="$1" paddingHorizontal="$1">
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <TypingDot key={i} delay={i * (DOT_CYCLE_DURATION / DOT_COUNT)} />
      ))}
    </HStack>
  )
})

TypingIndicator.displayName = 'TypingIndicator'

// ---------------------------------------------------------------------------
// Status indicators (checkmarks for user messages)
// ---------------------------------------------------------------------------

function StatusIndicator({ status }: { status: ChatBubbleProps['status'] }) {
  if (!status || status === 'sending') return null

  // Single check for sent, double check for delivered, blue double check for read
  const checkColor = status === 'read' ? '#4B3FFF' : 'rgba(255,255,255,0.6)'

  return (
    <HStack gap={2} alignItems="center" marginLeft="$1">
      {/* First check mark */}
      <Stack
        width={8}
        height={4}
        borderBottomWidth={1.5}
        borderLeftWidth={1.5}
        borderColor={checkColor}
        transform={[{ rotate: '-45deg' }]}
        marginTop={-1}
      />
      {/* Second check mark (delivered, read) */}
      {(status === 'delivered' || status === 'read') && (
        <Stack
          width={8}
          height={4}
          borderBottomWidth={1.5}
          borderLeftWidth={1.5}
          borderColor={checkColor}
          transform={[{ rotate: '-45deg' }]}
          marginTop={-1}
          marginLeft={-4}
        />
      )}
    </HStack>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatBubbleProps {
  /** Message text to display */
  message: string
  /** Who sent the message */
  sender?: 'user' | 'assistant'
  /** Timestamp string (e.g. "2:34 PM") */
  timestamp?: string
  /** Delivery status for user messages */
  status?: 'sending' | 'sent' | 'delivered' | 'read'
  /** Whether to show the typing indicator instead of the message */
  loading?: boolean
  /** Avatar element rendered beside assistant messages */
  avatar?: React.ReactNode
  /** Callback fired on long-press (copy, reply actions) */
  onLongPress?: () => void
  /** Callback fired on press */
  onPress?: () => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `ChatBubble` -- conversational message bubble for OG Assist.
 *
 * Renders user messages right-aligned with brand color background and
 * assistant messages left-aligned with neutral background. Supports a
 * typing indicator (three animated dots), timestamps, delivery status
 * checkmarks, avatar slots, and long-press for contextual actions.
 */
export function ChatBubble({
  message,
  sender = 'assistant',
  timestamp,
  status = 'sent',
  loading = false,
  avatar,
  onLongPress,
  onPress,
}: ChatBubbleProps) {
  const isUser = sender === 'user'
  const textColor = isUser ? '#FFFFFF' : '#212121' // white : neutral1000
  const timestampColor = isUser ? 'rgba(255,255,255,0.7)' : '#9E9E9E' // neutral500

  // Sending state dims the bubble
  const sendingOpacity = status === 'sending' ? 0.7 : 1

  const handleLongPress = useCallback(() => {
    onLongPress?.()
  }, [onLongPress])

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  return (
    <Stack
      flexDirection={isUser ? 'row-reverse' : 'row'}
      gap="$2"
      alignItems="flex-end"
      paddingHorizontal="$3"
      paddingVertical="$1"
    >
      {/* Avatar slot -- only rendered for assistant messages */}
      {!isUser && avatar != null && (
        <Stack
          width={28}
          height={28}
          borderRadius={14}
          overflow="hidden"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          {avatar}
        </Stack>
      )}

      {/* Spacer when there is no avatar for assistant -- keeps alignment consistent */}
      {!isUser && avatar == null && <Stack width={28} />}

      <Pressable
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={!onPress && !onLongPress}
        accessibilityRole="text"
        accessibilityLabel={
          loading
            ? `${sender} is typing`
            : `${sender === 'user' ? 'You' : 'Assistant'}: ${message}${timestamp ? `, at ${timestamp}` : ''}`
        }
        accessibilityHint={onLongPress ? 'Long press for more options' : undefined}
        // Override Pressable min touch target -- bubble itself is large enough
        minWidth={0}
        minHeight={0}
        maxWidth="80%"
      >
        <BubbleFrame sender={sender} opacity={sendingOpacity}>
          {loading ? (
            <TypingIndicator />
          ) : (
            <>
              <Text
                variant="body2"
                color={textColor}
                selectable
              >
                {message}
              </Text>

              {/* Footer: timestamp + status */}
              {(timestamp || (isUser && status)) && (
                <HStack
                  alignItems="center"
                  justifyContent="flex-end"
                  gap="$1"
                  marginTop="$1"
                >
                  {timestamp && (
                    <Text
                      variant="caption"
                      color={timestampColor}
                      fontSize={10}
                      lineHeight={14}
                    >
                      {timestamp}
                    </Text>
                  )}
                  {isUser && <StatusIndicator status={status} />}
                </HStack>
              )}
            </>
          )}
        </BubbleFrame>
      </Pressable>
    </Stack>
  )
}
