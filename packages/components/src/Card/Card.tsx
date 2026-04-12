import React, { useCallback, useRef } from 'react'
import { Animated } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Pressable, VStack } from '@opengov/cds-primitives'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Padding map
// ---------------------------------------------------------------------------

const PADDING_MAP = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 24,
} as const

// ---------------------------------------------------------------------------
// Styled card frame (non-pressable base)
// ---------------------------------------------------------------------------

const CardFrame = styled(Stack, {
  name: 'Card',
  backgroundColor: '$background',
  borderRadius: '$md',
  overflow: 'hidden',

  variants: {
    variant: {
      elevated: {
        backgroundColor: '$background',
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      outlined: {
        backgroundColor: '$background',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: primitive.gray50,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'elevated',
  },
})

// ---------------------------------------------------------------------------
// Pressable card wrapper -- provides press feedback via opacity animation
// ---------------------------------------------------------------------------

function PressableCard({
  children,
  onPress,
  disabled,
  variant,
  padding,
  accessibilityLabel,
  ...rest
}: {
  children: React.ReactNode
  onPress: () => void
  disabled?: boolean
  variant: 'elevated' | 'outlined' | 'filled'
  padding: 'none' | 'sm' | 'md' | 'lg'
  accessibilityLabel?: string
}) {
  const animatedScale = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(() => {
    Animated.spring(animatedScale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [animatedScale])

  const handlePressOut = useCallback(() => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [animatedScale])

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={disabled ? undefined : handlePressIn}
        onPressOut={disabled ? undefined : handlePressOut}
        disabled={disabled}
        minWidth={0}
        minHeight={0}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled }}
      >
        <CardFrame
          variant={variant}
          padding={PADDING_MAP[padding]}
          opacity={disabled ? 0.5 : 1}
          {...rest}
        >
          {children}
        </CardFrame>
      </Pressable>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Card.Header / Card.Content / Card.Footer sub-components
// ---------------------------------------------------------------------------

export interface CardSectionProps {
  children: React.ReactNode
  /** Additional padding override for this section. */
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

function CardHeader({ children, padding }: CardSectionProps) {
  const p = padding ? PADDING_MAP[padding] : undefined
  return (
    <VStack
      {...(p != null ? { padding: p } : {})}
      paddingBottom={8}
      accessibilityRole="header"
    >
      {children}
    </VStack>
  )
}
CardHeader.displayName = 'Card.Header'

function CardContent({ children, padding }: CardSectionProps) {
  const p = padding ? PADDING_MAP[padding] : undefined
  return (
    <VStack {...(p != null ? { padding: p } : {})}>
      {children}
    </VStack>
  )
}
CardContent.displayName = 'Card.Content'

function CardFooter({ children, padding }: CardSectionProps) {
  const p = padding ? PADDING_MAP[padding] : undefined
  return (
    <VStack
      {...(p != null ? { padding: p } : {})}
      paddingTop={8}
    >
      {children}
    </VStack>
  )
}
CardFooter.displayName = 'Card.Footer'

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface CardProps {
  /** Visual style of the card. */
  variant?: 'elevated' | 'outlined' | 'filled'
  /** Inner padding preset. */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Makes the entire card tappable with press-scale feedback. */
  onPress?: () => void
  /** Disable the card and prevent interaction. */
  disabled?: boolean
  /** Card content -- use `Card.Header`, `Card.Content`, `Card.Footer` for slots. */
  children: React.ReactNode
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
}

/**
 * `Card` -- content container following CDS 37 card patterns.
 *
 * Supports three visual variants (elevated, outlined, filled), four padding
 * presets, and an optional press handler that enables spring-based scale
 * feedback. Compose with `Card.Header`, `Card.Content`, and `Card.Footer`
 * sub-components for structured layouts.
 */
export function Card({
  variant = 'elevated',
  padding = 'md',
  onPress,
  disabled = false,
  children,
  accessibilityLabel,
}: CardProps) {
  // Pressable card
  if (onPress) {
    return (
      <PressableCard
        onPress={onPress}
        disabled={disabled}
        variant={variant}
        padding={padding}
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </PressableCard>
    )
  }

  // Static card
  return (
    <CardFrame
      variant={variant}
      padding={PADDING_MAP[padding]}
      opacity={disabled ? 0.5 : 1}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </CardFrame>
  )
}

// Attach sub-components
Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
