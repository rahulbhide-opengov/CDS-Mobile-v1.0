import React, { useCallback, useMemo } from 'react'
import { Platform } from 'react-native'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { Pressable, Text, HStack, VStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default safe-area top inset fallback when react-native-safe-area-context is unavailable. */
const DEFAULT_STATUS_BAR_HEIGHT = Platform.select({ ios: 44, android: 24, default: 0 })

const VARIANT_HEIGHTS = {
  standard: 56,
  prominent: 112,
  dense: 48,
} as const

// ---------------------------------------------------------------------------
// AppBarFrame -- base container
// ---------------------------------------------------------------------------

const AppBarFrame = styled(Stack, {
  name: 'AppBar',
  flexDirection: 'column',
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',

  variants: {
    transparent: {
      true: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
      },
    },
    elevated: {
      true: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 4,
        borderBottomWidth: 0,
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// LeadingTouchTarget -- 48x48 minimum touch area for the leading icon
// ---------------------------------------------------------------------------

const LeadingTouchTarget = styled(Pressable, {
  name: 'AppBarLeadingTouch',
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 9999,

  pressStyle: {
    backgroundColor: '$backgroundPress',
  },
})

// ---------------------------------------------------------------------------
// TrailingAction -- 48x48 touch target per trailing icon
// ---------------------------------------------------------------------------

const TrailingAction = styled(Stack, {
  name: 'AppBarTrailingAction',
  width: 48,
  height: 48,
  minWidth: 48,
  minHeight: 48,
  alignItems: 'center',
  justifyContent: 'center',
})

// ---------------------------------------------------------------------------
// Title text
// ---------------------------------------------------------------------------

const TitleText = styled(TamaguiText, {
  name: 'AppBarTitle',
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: 20,
  lineHeight: 28,
  color: '$color',
  numberOfLines: 1,
})

// ---------------------------------------------------------------------------
// Subtitle text
// ---------------------------------------------------------------------------

const SubtitleText = styled(TamaguiText, {
  name: 'AppBarSubtitle',
  fontFamily: '$body',
  fontWeight: '$regular',
  fontSize: 14,
  lineHeight: 20,
  color: '$colorSecondary',
  numberOfLines: 1,
})

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface AppBarProps {
  /** Primary title displayed in the app bar. */
  title: string
  /** Optional subtitle displayed below the title (prominent variant recommended). */
  subtitle?: string
  /** Height and layout variant. Defaults to "standard". */
  variant?: 'standard' | 'prominent' | 'dense'
  /** Leading icon element (e.g., back arrow or menu icon). */
  leadingIcon?: React.ReactNode
  /** Callback fired when the leading icon area is pressed. */
  onLeadingPress?: () => void
  /** Array of trailing action elements (1-3 icons recommended). */
  trailingActions?: React.ReactNode[]
  /** When true, renders the app bar with a transparent background. */
  transparent?: boolean
  /** When true, applies elevation shadow to the app bar. */
  elevated?: boolean
  /** Override for the background color. */
  backgroundColor?: string
  /** Override for the title text color. */
  titleColor?: string
  /** Accessibility label override for the entire app bar. */
  accessibilityLabel?: string
  /** Optional test ID. */
  testID?: string
}

/**
 * `AppBar` -- mobile top navigation bar from CDS 37.
 *
 * Supports three height variants (standard 56px, prominent 112px, dense 48px),
 * a leading icon with 48x48 touch target, up to 3 trailing action icons,
 * optional subtitle, and transparent/elevated visual modes.
 *
 * The component respects the top safe area inset by applying appropriate
 * padding to avoid content overlapping with the device status bar.
 */
export const AppBar = React.memo(function AppBar({
  title,
  subtitle,
  variant = 'standard',
  leadingIcon,
  onLeadingPress,
  trailingActions,
  transparent = false,
  elevated = false,
  backgroundColor,
  titleColor,
  accessibilityLabel,
  testID,
}: AppBarProps) {
  const handleLeadingPress = useCallback(() => {
    onLeadingPress?.()
  }, [onLeadingPress])

  const barHeight = VARIANT_HEIGHTS[variant]
  const isProminent = variant === 'prominent'
  const isDense = variant === 'dense'

  // Dense variant uses smaller title
  const titleFontSize = isDense ? 16 : 20
  const titleLineHeight = isDense ? 22 : 28

  const resolvedA11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return subtitle ? `${title}, ${subtitle}` : title
  }, [accessibilityLabel, title, subtitle])

  // Clamp trailing actions to a maximum of 3
  const clampedTrailingActions = useMemo(() => {
    if (!trailingActions) return []
    return trailingActions.slice(0, 3)
  }, [trailingActions])

  // Prominent variant: two-row layout with title at the bottom
  if (isProminent) {
    return (
      <AppBarFrame
        transparent={transparent || undefined}
        elevated={elevated || undefined}
        paddingTop={DEFAULT_STATUS_BAR_HEIGHT}
        testID={testID}
        accessibilityRole="header"
        accessibilityLabel={resolvedA11yLabel}
        {...(backgroundColor ? { backgroundColor } : {})}
      >
        {/* Top row: leading icon + trailing actions */}
        <HStack
          alignItems="center"
          justifyContent="space-between"
          paddingHorizontal={4}
          height={56}
        >
          <Stack width={48} alignItems="flex-start">
            {leadingIcon && (
              <LeadingTouchTarget
                onPress={handleLeadingPress}
                accessibilityRole="button"
                accessibilityLabel="Navigate back"
              >
                {leadingIcon}
              </LeadingTouchTarget>
            )}
          </Stack>

          {clampedTrailingActions.length > 0 && (
            <HStack alignItems="center">
              {clampedTrailingActions.map((action, index) => (
                <TrailingAction key={index}>
                  {action}
                </TrailingAction>
              ))}
            </HStack>
          )}
        </HStack>

        {/* Bottom row: title + subtitle */}
        <VStack
          paddingHorizontal={16}
          paddingBottom={16}
          gap={2}
          flex={1}
          justifyContent="flex-end"
        >
          <TitleText
            fontSize={24}
            lineHeight={32}
            {...(titleColor ? { color: titleColor } : {})}
          >
            {title}
          </TitleText>
          {subtitle && (
            <SubtitleText>{subtitle}</SubtitleText>
          )}
        </VStack>
      </AppBarFrame>
    )
  }

  // Standard and dense: single-row layout
  return (
    <AppBarFrame
      transparent={transparent || undefined}
      elevated={elevated || undefined}
      paddingTop={DEFAULT_STATUS_BAR_HEIGHT}
      testID={testID}
      accessibilityRole="header"
      accessibilityLabel={resolvedA11yLabel}
      {...(backgroundColor ? { backgroundColor } : {})}
    >
      <HStack
        alignItems="center"
        height={barHeight}
        paddingHorizontal={4}
      >
        {/* Leading icon area */}
        {leadingIcon ? (
          <LeadingTouchTarget
            onPress={handleLeadingPress}
            accessibilityRole="button"
            accessibilityLabel="Navigate back"
          >
            {leadingIcon}
          </LeadingTouchTarget>
        ) : (
          // Reserve spacing when no leading icon for consistent title position
          <Stack width={8} />
        )}

        {/* Title + optional subtitle */}
        <VStack flex={1} paddingHorizontal={4} justifyContent="center">
          <TitleText
            fontSize={titleFontSize}
            lineHeight={titleLineHeight}
            {...(titleColor ? { color: titleColor } : {})}
          >
            {title}
          </TitleText>
          {subtitle && !isDense && (
            <SubtitleText>{subtitle}</SubtitleText>
          )}
        </VStack>

        {/* Trailing actions */}
        {clampedTrailingActions.length > 0 && (
          <HStack alignItems="center">
            {clampedTrailingActions.map((action, index) => (
              <TrailingAction key={index}>
                {action}
              </TrailingAction>
            ))}
          </HStack>
        )}
      </HStack>
    </AppBarFrame>
  )
})

AppBar.displayName = 'AppBar'
