import React, { useCallback, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: 40,
  md: 56,
  lg: 72,
} as const

const ICON_SIZE_MAP = {
  sm: 18,
  md: 24,
  lg: 28,
} as const

// ---------------------------------------------------------------------------
// Position offsets (with safe-area-compatible bottom padding)
// ---------------------------------------------------------------------------

const POSITION_MAP = {
  bottomRight: { bottom: 24, right: 16 },
  bottomLeft: { bottom: 24, left: 16 },
  bottomCenter: { bottom: 24, alignSelf: 'center' as const },
} as const

// ---------------------------------------------------------------------------
// Color schemes
// ---------------------------------------------------------------------------

const COLOR_TOKENS = {
  primary: {
    background: '$brandBackground',
    text: '$brandColor',
    pressedBackground: '$brandBackgroundPressed',
  },
  secondary: {
    background: '$background',
    text: '$text',
    pressedBackground: '$backgroundPress',
  },
  tertiary: {
    background: '$backgroundStrong',
    text: '$text',
    pressedBackground: '$backgroundStrongPress',
  },
} as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FabProps {
  /** Icon element rendered inside the button. */
  icon: React.ReactNode
  /** Optional text label. Shown alongside icon when `extended` is true. */
  label?: string
  /** Size of the FAB. */
  size?: 'sm' | 'md' | 'lg'
  /** Color scheme of the FAB. */
  color?: 'primary' | 'secondary' | 'tertiary'
  /** Absolute position within the parent container. */
  position?: 'bottomRight' | 'bottomLeft' | 'bottomCenter'
  /** Press callback. */
  onPress?: () => void
  /** Disables the button and reduces opacity. */
  disabled?: boolean
  /** When true, renders as a pill shape with icon + label. */
  extended?: boolean
}

// ---------------------------------------------------------------------------
// FAB component
// ---------------------------------------------------------------------------

/**
 * `Fab` -- Floating Action Button following CDS 37 mobile patterns.
 *
 * Renders a circular (or extended pill-shaped) button positioned absolutely
 * within its parent container. Provides spring-based scale feedback on press,
 * three color schemes, three sizes, and safe-area-aware positioning.
 *
 * For multiple related actions, pair with `SpeedDial` instead.
 */
export function Fab({
  icon,
  label,
  size = 'md',
  color = 'primary',
  position = 'bottomRight',
  onPress,
  disabled = false,
  extended = false,
}: FabProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const elevationAnim = useRef(new Animated.Value(8)).current

  // ---- Press feedback ----
  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.92,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.timing(elevationAnim, {
        toValue: 12,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start()
  }, [scaleAnim, elevationAnim])

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }),
      Animated.timing(elevationAnim, {
        toValue: 8,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start()
  }, [scaleAnim, elevationAnim])

  // ---- Dimensions ----
  const dimension = SIZE_MAP[size]
  const showLabel = extended && label

  // ---- Position style ----
  const positionStyle = POSITION_MAP[position]

  // ---- Color tokens (resolve to themed values via styled wrappers) ----
  const colorScheme = COLOR_TOKENS[color]

  // ---- Accessibility label ----
  const accessibilityText = label || 'Floating action button'

  return (
    <Animated.View
      style={[
        styles.container,
        {
          ...positionStyle,
          transform: [{ scale: scaleAnim }],
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <Stack
        width={showLabel ? undefined : dimension}
        height={dimension}
        minWidth={showLabel ? dimension : undefined}
        paddingHorizontal={showLabel ? 20 : 0}
        borderRadius={showLabel ? dimension / 2 : dimension / 2}
        backgroundColor={colorScheme.background}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={showLabel ? 8 : 0}
        shadowColor="$shadowColor"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.25}
        shadowRadius={8}
        borderWidth={color === 'secondary' ? 1 : 0}
        borderColor={color === 'secondary' ? '$borderColor' : undefined}
        onPress={disabled ? undefined : onPress}
        pressStyle={
          disabled
            ? undefined
            : { backgroundColor: colorScheme.pressedBackground }
        }
        onPressIn={disabled ? undefined : handlePressIn}
        onPressOut={disabled ? undefined : handlePressOut}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        accessibilityRole="button"
        accessibilityLabel={accessibilityText}
        accessibilityState={{ disabled }}
      >
        {/* Icon */}
        <Stack
          width={ICON_SIZE_MAP[size]}
          height={ICON_SIZE_MAP[size]}
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Stack>

        {/* Extended label */}
        {showLabel && (
          <Text
            variant="body3"
            fontWeight="$semibold"
            color={
              color === 'primary' ? '$brandColor' : '$text'
            }
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </Stack>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 900,
  },
})
