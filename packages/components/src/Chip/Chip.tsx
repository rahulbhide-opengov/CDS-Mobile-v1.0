import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Pressable, Text, HStack } from '@opengov/cds-primitives'
import Svg, { Path } from 'react-native-svg'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Semantic color maps per variant
// ---------------------------------------------------------------------------

type ChipVariant = 'neutral' | 'positive' | 'negative' | 'warning' | 'strong'
type ChipStyle = 'filled' | 'outlined'

interface ChipColorScheme {
  bg: string
  text: string
  border: string
}

const FILLED_COLORS: Record<ChipVariant, ChipColorScheme> = {
  neutral: { bg: primitive.neutral100, text: primitive.neutral700, border: 'transparent' }, // neutral100, neutral700
  positive: { bg: colors.jade50, text: colors.green700, border: 'transparent' }, // jade50, green700
  negative: { bg: colors.red50, text: colors.red600, border: 'transparent' }, // red50, red600
  warning: { bg: primitive.amber50, text: colors.yellow700, border: 'transparent' }, // amber50, yellow700
  strong: { bg: colors.blurple700, text: colors.white, border: 'transparent' }, // blurple700, white
}

const OUTLINED_COLORS: Record<ChipVariant, ChipColorScheme> = {
  neutral: { bg: 'transparent', text: primitive.neutral700, border: primitive.gray400 }, // neutral700, gray400
  positive: { bg: 'transparent', text: colors.green700, border: colors.green700 }, // green700
  negative: { bg: 'transparent', text: colors.red600, border: colors.red600 }, // red600
  warning: { bg: 'transparent', text: colors.yellow700, border: colors.yellow700 }, // yellow700
  strong: { bg: 'transparent', text: colors.blurple700, border: colors.blurple700 }, // blurple700
}

// ---------------------------------------------------------------------------
// Size configuration
// ---------------------------------------------------------------------------

type ChipSize = 'sm' | 'md' | 'lg'

interface ChipSizeConfig {
  height: number
  paddingH: number
  fontSize: number
  lineHeight: number
  iconSize: number
  gap: number
}

const SIZE_CONFIG: Record<ChipSize, ChipSizeConfig> = {
  sm: { height: 32, paddingH: 8, fontSize: 12, lineHeight: 18, iconSize: 14, gap: 4 },
  md: { height: 36, paddingH: 12, fontSize: 13, lineHeight: 18, iconSize: 16, gap: 6 },
  lg: { height: 44, paddingH: 14, fontSize: 14, lineHeight: 20, iconSize: 18, gap: 6 },
}

// ---------------------------------------------------------------------------
// Close button (X icon)
// ---------------------------------------------------------------------------

function CloseButton({
  onClose,
  iconSize,
  iconColor,
  disabled,
}: {
  onClose: () => void
  iconSize: number
  iconColor: string
  disabled?: boolean
}) {
  return (
    <Pressable
      onPress={disabled ? undefined : onClose}
      hitSlop={{ top: 8, bottom: 8, left: 4, right: 8 }}
      minWidth={0}
      minHeight={0}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Remove"
    >
      <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
        <Path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          fill={iconColor}
        />
      </Svg>
    </Pressable>
  )
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ChipProps {
  /** Display text of the chip. */
  label: string
  /** Semantic color variant following CDS 37 chip styles. */
  variant?: ChipVariant
  /** Visual style: filled background or outlined border. */
  style?: ChipStyle
  /** Size preset. */
  size?: ChipSize
  /** Optional leading icon element (rendered before the label). */
  leadingIcon?: React.ReactNode
  /** When `true`, appends a close/X button and enables `onClose`. */
  closable?: boolean
  /** Callback fired when the close button is pressed. */
  onClose?: () => void
  /** When `true`, renders the chip in a "selected" visual state. */
  selected?: boolean
  /** Press handler for the entire chip. */
  onPress?: () => void
  /** Disable the chip and prevent all interactions. */
  disabled?: boolean
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

/**
 * `Chip` -- compact status indicator or filter tag from CDS 37.
 *
 * Supports five semantic color variants in both filled and outlined styles,
 * with optional leading icon, trailing close button, and selectable state.
 */
export function Chip({
  label,
  variant = 'neutral',
  style: chipStyle = 'filled',
  size = 'md',
  leadingIcon,
  closable = false,
  onClose,
  selected = false,
  onPress,
  disabled = false,
  accessibilityLabel,
}: ChipProps) {
  const sizeConfig = SIZE_CONFIG[size]
  const colorMap = chipStyle === 'outlined' ? OUTLINED_COLORS : FILLED_COLORS
  const colors = colorMap[variant]

  // Selected state overrides: use the strong-filled palette
  const resolvedBg = selected ? FILLED_COLORS.strong.bg : colors.bg
  const resolvedText = selected ? FILLED_COLORS.strong.text : colors.text
  const resolvedBorder = selected ? 'transparent' : colors.border

  // Disabled visual overrides
  const finalBg = disabled ? primitive.neutral100 : resolvedBg // neutral100
  const finalText = disabled ? primitive.neutral400 : resolvedText // neutral400
  const finalBorder = disabled ? primitive.neutral200 : resolvedBorder // neutral200
  const finalOpacity = disabled ? 0.6 : 1

  const isPressable = !!onPress && !disabled
  const isClosable = closable && !!onClose && !disabled

  // WCAG touch-target compliance: expand effective touch area to 44pt minimum
  const hitSlopMap: Record<ChipSize, { top: number; bottom: number; left: number; right: number }> = {
    sm: { top: 6, bottom: 6, left: 4, right: 4 },    // 32 + 12 = 44
    md: { top: 4, bottom: 4, left: 4, right: 4 },    // 36 + 8 = 44
    lg: { top: 0, bottom: 0, left: 4, right: 4 },    // 44 + 0 = 44
  }
  const chipHitSlop = hitSlopMap[size]

  // The chip body (used in both pressable and static modes)
  const chipContent = (
    <HStack
      height={sizeConfig.height}
      paddingHorizontal={sizeConfig.paddingH}
      backgroundColor={finalBg}
      borderRadius={4}
      borderWidth={chipStyle === 'outlined' ? 1 : 0}
      borderColor={finalBorder}
      alignItems="center"
      gap={sizeConfig.gap}
      opacity={finalOpacity}
    >
      {leadingIcon && (
        <Stack width={sizeConfig.iconSize} height={sizeConfig.iconSize} alignItems="center" justifyContent="center">
          {leadingIcon}
        </Stack>
      )}

      <Text
        fontSize={sizeConfig.fontSize}
        lineHeight={sizeConfig.lineHeight}
        fontWeight="$medium"
        letterSpacing={0.16}
        color={finalText}
        numberOfLines={1}
      >
        {label}
      </Text>

      {isClosable && (
        <CloseButton
          onClose={onClose!}
          iconSize={sizeConfig.iconSize}
          iconColor={finalText}
          disabled={disabled}
        />
      )}
    </HStack>
  )

  // Wrap in Pressable when there is an onPress handler
  if (isPressable) {
    return (
      <Pressable
        onPress={onPress}
        hitSlop={chipHitSlop}
        minWidth={0}
        minHeight={0}
        alignSelf="flex-start"
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ selected, disabled }}
      >
        {chipContent}
      </Pressable>
    )
  }

  // Static chip (may still be closable)
  return (
    <Stack
      alignSelf="flex-start"
      accessibilityRole={isClosable ? 'button' : 'text'}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ selected, disabled }}
    >
      {chipContent}
    </Stack>
  )
}
