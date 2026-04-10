import React, { useCallback, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, Pressable } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_MESSAGE =
  'AI-generated content may contain errors. Please verify important information.'

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const DisclaimerFrame = styled(Stack, {
  name: 'AiDisclaimer',
  gap: '$2',

  variants: {
    variant: {
      inline: {
        backgroundColor: primitive.blue50,
        borderRadius: 8, // radii.lg
        padding: '$3',
        borderWidth: 1,
        borderColor: primitive.blue100, // ogBlue100
      },
      banner: {
        backgroundColor: primitive.blue50,
        borderRadius: 0,
        paddingHorizontal: '$4',
        paddingVertical: '$3',
        borderBottomWidth: 1,
        borderBottomColor: primitive.blue100, // ogBlue100
      },
    },
  } as const,

  defaultVariants: {
    variant: 'inline',
  },
})

// ---------------------------------------------------------------------------
// AI sparkle icon (pure Stack-based, no external SVG dependency)
// ---------------------------------------------------------------------------

const AiSparkleIcon = React.memo(function AiSparkleIcon() {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      {/* Central diamond */}
      <Stack
        width={8}
        height={8}
        backgroundColor={primitive.blue500} // ogBlue500
        transform={[{ rotate: '45deg' }]}
        borderRadius={1}
      />
      {/* Top sparkle dot */}
      <Stack
        width={3}
        height={3}
        backgroundColor={primitive.blue500}
        borderRadius={1.5}
        position="absolute"
        top={1}
        right={5}
      />
      {/* Bottom-right sparkle dot */}
      <Stack
        width={3}
        height={3}
        backgroundColor={primitive.blue500}
        borderRadius={1.5}
        position="absolute"
        bottom={2}
        right={2}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Close (X) icon
// ---------------------------------------------------------------------------

const CloseXIcon = React.memo(function CloseXIcon() {
  return (
    <Stack width={16} height={16} alignItems="center" justifyContent="center">
      <Stack
        width={12}
        height={2}
        backgroundColor={colors.neutral700} // neutral700
        borderRadius={1}
        position="absolute"
        transform={[{ rotate: '45deg' }]}
      />
      <Stack
        width={12}
        height={2}
        backgroundColor={colors.neutral700}
        borderRadius={1}
        position="absolute"
        transform={[{ rotate: '-45deg' }]}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AiDisclaimerProps {
  /** Visual variant: inline (compact rounded card) or banner (full-width bar) */
  variant?: 'inline' | 'banner'
  /** Whether a dismiss/close button is shown */
  dismissible?: boolean
  /** Called when the dismiss button is pressed */
  onDismiss?: () => void
  /** URL for the "Learn more" link (informational, passed to onLearnMore) */
  learnMoreUrl?: string
  /** Called when "Learn more" is tapped */
  onLearnMore?: () => void
  /** Custom disclaimer message. Defaults to the standard AI disclaimer text. */
  message?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `AiDisclaimer` -- AI-generated content disclaimer for OG Assist.
 *
 * Provides an inline or banner variant with an info/AI icon, customizable
 * message, optional "Learn more" link, and an optional dismiss button.
 * The dismiss action plays a fade-out animation before invoking onDismiss.
 */
export function AiDisclaimer({
  variant = 'inline',
  dismissible = false,
  onDismiss,
  learnMoreUrl,
  onLearnMore,
  message = DEFAULT_MESSAGE,
}: AiDisclaimerProps) {
  const fadeAnim = useRef(new Animated.Value(1)).current
  const heightAnim = useRef(new Animated.Value(1)).current

  const handleDismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      // Note: scaleY is used instead of height for useNativeDriver compatibility
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.()
    })
  }, [fadeAnim, heightAnim, onDismiss])

  const handleLearnMore = useCallback(() => {
    onLearnMore?.()
  }, [onLearnMore])

  const showDismiss = dismissible || onDismiss != null

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scaleY: heightAnim }],
      }}
      accessibilityRole="alert"
      accessibilityLabel={`AI disclaimer: ${message}`}
    >
      <DisclaimerFrame variant={variant}>
        <HStack gap="$2" alignItems="flex-start">
          {/* AI icon */}
          <Stack marginTop={2} flexShrink={0}>
            <AiSparkleIcon />
          </Stack>

          {/* Message body */}
          <Stack flex={1} gap="$1">
            <Text
              variant="body3"
              color={primitive.blue700} // ogBlue800 closest match
              lineHeight={20}
            >
              {message}
            </Text>

            {/* Learn more link */}
            {(onLearnMore != null || learnMoreUrl != null) && (
              <Pressable
                onPress={handleLearnMore}
                accessibilityRole="link"
                accessibilityLabel="Learn more about AI-generated content"
                alignSelf="flex-start"
                minWidth={0}
                minHeight={0}
                paddingVertical="$0.5"
              >
                <Text
                  variant="body3"
                  color={colors.primary}
                  fontWeight="$semibold"
                  textDecorationLine="underline"
                >
                  Learn more
                </Text>
              </Pressable>
            )}
          </Stack>

          {/* Dismiss button */}
          {showDismiss && (
            <Pressable
              onPress={handleDismiss}
              accessibilityRole="button"
              accessibilityLabel="Dismiss disclaimer"
              width={28}
              height={28}
              borderRadius={14}
              alignItems="center"
              justifyContent="center"
              marginTop={-2}
              marginRight={-4}
              minWidth={28}
              minHeight={28}
            >
              <CloseXIcon />
            </Pressable>
          )}
        </HStack>
      </DisclaimerFrame>
    </Animated.View>
  )
}
