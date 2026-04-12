import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Pressable as RNPressable,
  StyleSheet,
  View,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, Pressable } from '@opengov/cds-primitives'
// ---------------------------------------------------------------------------
// Arrow dimensions & tooltip colors
// ---------------------------------------------------------------------------

const TOOLTIP_BG = 'rgba(21,21,21,0.9)' // tooltipFill token
const ARROW_SIZE = 5
const TOOLTIP_MAX_WIDTH = 240
const AUTO_DISMISS_MS = 3000

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TooltipProps {
  /** Text content displayed inside the tooltip. */
  content: string
  /** Placement relative to the anchor child. Defaults to "top". */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /** Anchor element -- receives a long-press handler. */
  children: React.ReactNode
  /** Override: delay before showing tooltip on long-press (ms). Defaults to 500. */
  delayMs?: number
}

// ---------------------------------------------------------------------------
// Arrow component
// ---------------------------------------------------------------------------

function Arrow({ placement }: { placement: 'top' | 'bottom' | 'left' | 'right' }) {
  const baseStyle = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent' as const,
    borderStyle: 'solid' as const,
  }

  switch (placement) {
    case 'top':
      // Arrow points down (below tooltip, pointing toward anchor)
      return (
        <View
          style={[
            baseStyle,
            {
              alignSelf: 'center',
              borderLeftWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderTopWidth: ARROW_SIZE,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: TOOLTIP_BG,
            },
          ]}
        />
      )
    case 'bottom':
      // Arrow points up
      return (
        <View
          style={[
            baseStyle,
            {
              alignSelf: 'center',
              borderLeftWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: TOOLTIP_BG,
            },
          ]}
        />
      )
    case 'left':
      // Arrow points right
      return (
        <View
          style={[
            baseStyle,
            {
              alignSelf: 'center',
              borderTopWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderLeftWidth: ARROW_SIZE,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: TOOLTIP_BG,
            },
          ]}
        />
      )
    case 'right':
      // Arrow points left
      return (
        <View
          style={[
            baseStyle,
            {
              alignSelf: 'center',
              borderTopWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderRightColor: TOOLTIP_BG,
            },
          ]}
        />
      )
  }
}

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

/**
 * `Tooltip` -- long-press-triggered informational overlay with arrow.
 *
 * Wraps its child in a Pressable that triggers tooltip display on long-press.
 * The tooltip renders as an absolutely-positioned bubble with an arrow
 * pointing toward the anchor element. Auto-dismisses after 3 seconds.
 * Placement supports four directions: top, bottom, left, right.
 */
export function Tooltip({
  content,
  placement = 'top',
  children,
  delayMs = 500,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [anchorLayout, setAnchorLayout] = useState({
    width: 0,
    height: 0,
  })

  const opacityAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ---- Cleanup on unmount ------------------------------------------------

  useEffect(() => {
    return () => {
      if (dismissTimer.current != null) {
        clearTimeout(dismissTimer.current)
      }
    }
  }, [])

  // ---- Show / Hide -------------------------------------------------------

  const showTooltip = useCallback(() => {
    setIsVisible(true)
    opacityAnim.setValue(0)
    scaleAnim.setValue(0.9)

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 18,
        stiffness: 300,
      }),
    ]).start()

    // Auto-dismiss
    if (dismissTimer.current != null) {
      clearTimeout(dismissTimer.current)
    }
    dismissTimer.current = setTimeout(() => {
      hideTooltip()
    }, AUTO_DISMISS_MS)
  }, [opacityAnim, scaleAnim])

  const hideTooltip = useCallback(() => {
    if (dismissTimer.current != null) {
      clearTimeout(dismissTimer.current)
      dismissTimer.current = null
    }

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(false)
    })
  }, [opacityAnim, scaleAnim])

  // ---- Long-press handler ------------------------------------------------

  const handleLongPress = useCallback(() => {
    showTooltip()
  }, [showTooltip])

  const handlePress = useCallback(() => {
    if (isVisible) {
      hideTooltip()
    }
  }, [isVisible, hideTooltip])

  // ---- Anchor layout measurement -----------------------------------------

  const handleAnchorLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setAnchorLayout({ width, height })
  }, [])

  // ---- Position calculation -----------------------------------------------

  const getTooltipPositionStyle = () => {
    const { width: anchorW, height: anchorH } = anchorLayout
    const offset = ARROW_SIZE + 4 // arrow + gap

    switch (placement) {
      case 'top':
        return {
          bottom: anchorH + offset,
          alignSelf: 'center' as const,
        }
      case 'bottom':
        return {
          top: anchorH + offset,
          alignSelf: 'center' as const,
        }
      case 'left':
        return {
          right: anchorW + offset,
          top: 0,
          alignSelf: 'auto' as const,
        }
      case 'right':
        return {
          left: anchorW + offset,
          top: 0,
          alignSelf: 'auto' as const,
        }
    }
  }

  // ---- Container flex direction for arrow placement -----------------------

  const getContainerDirection = (): 'column' | 'column-reverse' | 'row' | 'row-reverse' => {
    switch (placement) {
      case 'top':
        return 'column'         // tooltip then arrow (arrow at bottom)
      case 'bottom':
        return 'column'         // arrow then tooltip (arrow at top)
      case 'left':
        return 'row'            // tooltip then arrow (arrow at right)
      case 'right':
        return 'row'            // arrow then tooltip (arrow at left)
    }
  }

  // ---- Render tooltip bubble ----------------------------------------------

  const renderBubble = () => {
    const isVertical = placement === 'top' || placement === 'bottom'

    return (
      <Animated.View
        style={[
          styles.tooltipContainer,
          getTooltipPositionStyle(),
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
            flexDirection: isVertical ? 'column' : 'row',
          },
        ]}
        pointerEvents="none"
      >
        {/* Arrow before tooltip for bottom/right placement */}
        {(placement === 'bottom' || placement === 'right') && (
          <Arrow placement={placement} />
        )}

        {/* Tooltip bubble */}
        <View
          style={styles.bubble}
          accessible
          accessibilityRole="text"
          accessibilityLabel={content}
          accessibilityLiveRegion="polite"
        >
          <Text
            color="white"
            fontSize={12}
            fontWeight="$medium"
            lineHeight={16}
            textAlign="center"
          >
            {content}
          </Text>
        </View>

        {/* Arrow after tooltip for top/left placement */}
        {(placement === 'top' || placement === 'left') && (
          <Arrow placement={placement} />
        )}
      </Animated.View>
    )
  }

  // ---- Main render --------------------------------------------------------

  return (
    <View style={styles.wrapper}>
      {/* Tooltip overlay */}
      {isVisible && renderBubble()}

      {/* Anchor child */}
      <RNPressable
        onLongPress={handleLongPress}
        onPress={handlePress}
        delayLongPress={delayMs}
        onLayout={handleAnchorLayout}
        accessibilityHint="Long press to show tooltip"
      >
        {children}
      </RNPressable>
    </View>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  tooltipContainer: {
    position: 'absolute',
    zIndex: 9999,
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: TOOLTIP_BG,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: TOOLTIP_MAX_WIDTH,
  },
})
