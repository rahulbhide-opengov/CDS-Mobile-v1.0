import React, { useCallback, useMemo, useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { HStack } from '@opengov/cds-primitives'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants -- Figma CDS 37, node 1479:32615
// ---------------------------------------------------------------------------

/** WCAG 2.5.8 minimum touch target */
const TOUCH_TARGET = 44

/**
 * Figma exact color values for Radio states
 *
 * text/primary:   rgba(0,0,0,0.87)
 * text/secondary: rgba(0,0,0,0.6)
 * text/disabled:  rgba(0,0,0,0.38)
 * error/main:     #D33423 (primitive.red600)
 * action/active:  blurple700 (#4B3FFF)
 */
const FIGMA_TEXT_PRIMARY = 'rgba(0,0,0,0.87)'
const FIGMA_TEXT_DISABLED = 'rgba(0,0,0,0.38)'
const FIGMA_BORDER_UNSELECTED = 'rgba(0,0,0,0.6)'

// ---------------------------------------------------------------------------
// Size maps (Figma CDS 37 -- Radio circle dimensions)
//
// Figma spec: Radio circle is a 24px container with SVG icon inside.
// We provide sm/md/lg but the Figma default is 24px (lg in old code, now md).
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { outer: 20, inner: 10, borderWidth: 2 },
  md: { outer: 24, inner: 12, borderWidth: 2 },
  lg: { outer: 28, inner: 14, borderWidth: 2 },
} as const

type RadioSize = keyof typeof SIZE_MAP

// ---------------------------------------------------------------------------
// RadioContainer -- Figma layout: row, gap 8px, py=8px, px=0
// ---------------------------------------------------------------------------

const RadioContainer = styled(HStack, {
  name: 'RadioContainer',
  alignItems: 'center',
  gap: 8,
  paddingVertical: 8,
  paddingHorizontal: 0,
})

// ---------------------------------------------------------------------------
// RadioLabel -- Figma: Inputs/Label lg = DM Sans Regular, 16px, lh 20px,
//               letterSpacing 0.15px
// ---------------------------------------------------------------------------

const RadioLabel = styled(TamaguiText, {
  name: 'RadioLabel',
  fontFamily: '$body',
  fontSize: 16,
  fontWeight: '400',
  lineHeight: 20,
  letterSpacing: 0.15,
  color: FIGMA_TEXT_PRIMARY,

  variants: {
    disabled: {
      true: {
        color: FIGMA_TEXT_DISABLED,
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RadioProps {
  /** Whether this radio is currently selected */
  selected?: boolean
  /** Called when the user selects this radio */
  onSelect?: () => void
  /** Visual size. Defaults to "md" (24px circle per Figma). */
  size?: RadioSize
  /** Disabled state -- 38% opacity on entire row per Figma */
  disabled?: boolean
  /** Optional label displayed beside the radio */
  label?: string
  /** Value associated with this radio (used by radio groups) */
  value?: string
  /** Override accessibility label (defaults to label prop) */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function Radio({
  selected = false,
  onSelect,
  size = 'md',
  disabled = false,
  label,
  value,
  accessibilityLabel,
}: RadioProps) {
  const dims = SIZE_MAP[size]

  // Scale animation on press for tactile feedback
  const scaleAnim = useRef(new Animated.Value(1)).current
  // Inner dot scale -- animates in/out when selected changes
  const dotScale = useRef(new Animated.Value(selected ? 1 : 0)).current

  // Keep dotScale in sync with selected prop
  React.useEffect(() => {
    Animated.spring(dotScale, {
      toValue: selected ? 1 : 0,
      friction: 6,
      tension: 300,
      useNativeDriver: true,
    }).start()
  }, [selected, dotScale])

  const handlePressIn = useCallback(() => {
    Animated.timing(scaleAnim, {
      toValue: 0.9,
      duration: 80,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [scaleAnim])

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 200,
      useNativeDriver: true,
    }).start()
  }, [scaleAnim])

  const handlePress = useCallback(() => {
    if (disabled) return
    onSelect?.()
  }, [disabled, onSelect])

  // ---- Derived styles -------------------------------------------------------
  // Figma: selected = blurple700 filled circle; unselected = outlined circle
  // in standard border color (text/secondary = rgba(0,0,0,0.6))
  const borderColor = selected ? primitive.blurple700 : FIGMA_BORDER_UNSELECTED
  const dotColor = primitive.blurple700

  // hitSlop expands the touch target to 44px without changing visual size
  const hitSlop = useMemo(() => {
    const pad = Math.max(0, (TOUCH_TARGET - dims.outer) / 2)
    return { top: pad, bottom: pad, left: pad, right: pad }
  }, [dims.outer])

  // ---- Render ---------------------------------------------------------------

  return (
    <RadioContainer
      opacity={disabled ? 0.38 : 1}
      onPress={handlePress}
      hitSlop={hitSlop}
      accessibilityRole="radio"
      accessibilityState={{
        selected,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label ?? 'Radio'}
    >
      <Animated.View
        onTouchStart={disabled ? undefined : handlePressIn}
        onTouchEnd={disabled ? undefined : handlePressOut}
        onTouchCancel={disabled ? undefined : handlePressOut}
        style={{
          transform: [{ scale: scaleAnim }],
          width: dims.outer,
          height: dims.outer,
          borderRadius: dims.outer / 2,
          borderWidth: dims.borderWidth,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <Animated.View
          style={{
            width: dims.inner,
            height: dims.inner,
            borderRadius: dims.inner / 2,
            backgroundColor: dotColor,
            transform: [{ scale: dotScale }],
          }}
        />
      </Animated.View>

      {label != null && (
        <RadioLabel
          disabled={disabled || undefined}
          onPress={disabled ? undefined : handlePress}
        >
          {label}
        </RadioLabel>
      )}
    </RadioContainer>
  )
}
