/**
 * Popover -- CDS 37 Figma-accurate implementation
 *
 * A floating content panel anchored to a trigger element. Renders via React
 * Native Modal for correct z-ordering across all platforms. Supports four
 * positions, an optional arrow indicator, and animated entrance/exit.
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 * Shadows reference `shadows.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  LayoutChangeEvent,
  Modal,
  Pressable as RNPressable,
  StyleSheet,
  View,
  type LayoutRectangle,
  type ViewStyle,
} from 'react-native'
import { primitive, shadows } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Popover background */
const POPOVER_BG = primitive.white

/** Border radius */
const POPOVER_RADIUS = 8

/** Content padding */
const CONTENT_PADDING = 12

/** Arrow size (width and height of the triangle) */
const ARROW_SIZE = 8

/** Animation duration in milliseconds */
const ANIMATION_DURATION = 150

/** Elevation 8 shadow for the popover surface */
const POPOVER_SHADOW = shadows.xl

/** Minimum distance from screen edges */
const SCREEN_EDGE_PADDING = 8

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right'

export interface PopoverProps {
  /** Controls visibility. Popover renders when true. */
  visible: boolean
  /** Called when the popover should close (backdrop tap or programmatic). */
  onClose: () => void
  /**
   * Anchor measurements. Pass the layout rect of the trigger element.
   * Obtain via `onLayout` or `measure()` on the trigger ref.
   * Shape: { x, y, width, height } in screen coordinates.
   */
  anchor: LayoutRectangle
  /** Preferred position relative to the anchor. Defaults to "bottom". */
  position?: PopoverPosition
  /** Content rendered inside the popover panel. */
  children: React.ReactNode
  /** Show a directional arrow pointing toward the anchor. Defaults to true. */
  arrow?: boolean
  /** Override content padding (default 12px). */
  contentPadding?: number
  /** Accessibility label for the popover container. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Arrow component
// ---------------------------------------------------------------------------

function PopoverArrow({
  position,
  color,
}: {
  position: PopoverPosition
  color: string
}) {
  const base: ViewStyle = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  }

  switch (position) {
    case 'bottom':
      // Popover is below anchor -- arrow points UP (sits on top of popover)
      return (
        <View
          style={[
            base,
            {
              alignSelf: 'center',
              borderLeftWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: color,
            },
          ]}
        />
      )
    case 'top':
      // Popover is above anchor -- arrow points DOWN
      return (
        <View
          style={[
            base,
            {
              alignSelf: 'center',
              borderLeftWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderTopWidth: ARROW_SIZE,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: color,
            },
          ]}
        />
      )
    case 'right':
      // Popover is right of anchor -- arrow points LEFT
      return (
        <View
          style={[
            base,
            {
              alignSelf: 'center',
              borderTopWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderRightWidth: ARROW_SIZE,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderRightColor: color,
            },
          ]}
        />
      )
    case 'left':
      // Popover is left of anchor -- arrow points RIGHT
      return (
        <View
          style={[
            base,
            {
              alignSelf: 'center',
              borderTopWidth: ARROW_SIZE,
              borderBottomWidth: ARROW_SIZE,
              borderLeftWidth: ARROW_SIZE,
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
              borderLeftColor: color,
            },
          ]}
        />
      )
  }
}

// ---------------------------------------------------------------------------
// Popover component
// ---------------------------------------------------------------------------

/**
 * `Popover` -- floating content panel anchored to a trigger element.
 *
 * Renders inside a React Native Modal with a transparent backdrop that
 * dismisses on tap. The popover panel uses elevation-8 shadow for depth
 * and animates in with a combined fade + scale transition (150ms).
 *
 * The anchor prop expects screen-coordinate measurements of the trigger
 * element. Use `ref.measure()` or `onLayout` to obtain these values.
 */
export function Popover({
  visible,
  onClose,
  anchor,
  position = 'bottom',
  children,
  arrow = true,
  contentPadding = CONTENT_PADDING,
  accessibilityLabel,
  testID,
}: PopoverProps) {
  const opacityAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.85)).current
  const [popoverLayout, setPopoverLayout] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const [isRendered, setIsRendered] = useState(false)

  // ---- Animate in/out -------------------------------------------------------

  useEffect(() => {
    if (visible) {
      setIsRendered(true)
      opacityAnim.setValue(0)
      scaleAnim.setValue(0.85)

      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start()
    } else if (isRendered) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION * 0.75,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: ANIMATION_DURATION * 0.75,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsRendered(false)
      })
    }
  }, [visible])

  // ---- Measure popover for positioning --------------------------------------

  const handlePopoverLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setPopoverLayout({ width, height })
  }, [])

  // ---- Position calculation -------------------------------------------------

  const getPopoverPosition = useCallback((): ViewStyle => {
    const screen = Dimensions.get('window')
    const arrowOffset = arrow ? ARROW_SIZE : 0

    let top = 0
    let left = 0

    switch (position) {
      case 'bottom':
        top = anchor.y + anchor.height + arrowOffset
        left = anchor.x + anchor.width / 2 - popoverLayout.width / 2
        break
      case 'top':
        top = anchor.y - popoverLayout.height - arrowOffset
        left = anchor.x + anchor.width / 2 - popoverLayout.width / 2
        break
      case 'right':
        top = anchor.y + anchor.height / 2 - popoverLayout.height / 2
        left = anchor.x + anchor.width + arrowOffset
        break
      case 'left':
        top = anchor.y + anchor.height / 2 - popoverLayout.height / 2
        left = anchor.x - popoverLayout.width - arrowOffset
        break
    }

    // Clamp to screen edges
    left = Math.max(SCREEN_EDGE_PADDING, Math.min(left, screen.width - popoverLayout.width - SCREEN_EDGE_PADDING))
    top = Math.max(SCREEN_EDGE_PADDING, Math.min(top, screen.height - popoverLayout.height - SCREEN_EDGE_PADDING))

    return { position: 'absolute', top, left }
  }, [anchor, position, popoverLayout, arrow])

  // ---- Transform origin hint (scale from anchor direction) ------------------

  const getTransformOrigin = useCallback((): { translateX: number; translateY: number } => {
    // Offset the scale animation toward the anchor for a natural feel.
    // The offset is small (4px) so the popover "grows" from near the arrow.
    switch (position) {
      case 'bottom':
        return { translateX: 0, translateY: -4 }
      case 'top':
        return { translateX: 0, translateY: 4 }
      case 'right':
        return { translateX: -4, translateY: 0 }
      case 'left':
        return { translateX: 4, translateY: 0 }
    }
  }, [position])

  // ---- Backdrop tap handler -------------------------------------------------

  const handleBackdropPress = useCallback(() => {
    onClose()
  }, [onClose])

  // ---- Early return when not visible and animation complete ------------------

  if (!isRendered && !visible) {
    return null
  }

  const transformOrigin = getTransformOrigin()
  const positionStyle = getPopoverPosition()

  // Determine flex direction for arrow placement relative to panel
  const isVertical = position === 'top' || position === 'bottom'
  const containerDirection = isVertical ? 'column' : 'row'

  return (
    <Modal
      transparent
      visible={isRendered}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      supportedOrientations={['portrait', 'landscape']}
    >
      {/* Transparent backdrop -- dismisses on tap */}
      <RNPressable
        style={styles.backdrop}
        onPress={handleBackdropPress}
        accessibilityRole="none"
        accessibilityLabel="Close popover"
      />

      {/* Popover panel */}
      <Animated.View
        style={[
          positionStyle,
          {
            opacity: opacityAnim,
            transform: [
              { translateX: transformOrigin.translateX },
              { translateY: transformOrigin.translateY },
              { scale: scaleAnim },
              { translateX: -transformOrigin.translateX },
              { translateY: -transformOrigin.translateY },
            ],
            flexDirection: containerDirection,
            alignItems: 'center',
            zIndex: 9999,
          },
        ]}
        onLayout={handlePopoverLayout}
        accessibilityRole="none"
        accessibilityViewIsModal
        testID={testID}
      >
        {/* Arrow before panel for bottom/right (arrow on top/left side) */}
        {arrow && (position === 'bottom' || position === 'right') && (
          <PopoverArrow position={position} color={POPOVER_BG} />
        )}

        {/* Content panel */}
        <View
          style={[
            styles.panel,
            { padding: contentPadding },
          ]}
          accessible
          accessibilityRole="none"
          accessibilityLabel={accessibilityLabel ?? 'Popover'}
          accessibilityLiveRegion="polite"
        >
          {children}
        </View>

        {/* Arrow after panel for top/left (arrow on bottom/right side) */}
        {arrow && (position === 'top' || position === 'left') && (
          <PopoverArrow position={position} color={POPOVER_BG} />
        )}
      </Animated.View>
    </Modal>
  )
}

Popover.displayName = 'Popover'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  panel: {
    backgroundColor: POPOVER_BG,
    borderRadius: POPOVER_RADIUS,
    // Elevation 8 shadow
    shadowColor: POPOVER_SHADOW.shadowColor,
    shadowOffset: POPOVER_SHADOW.shadowOffset,
    shadowOpacity: POPOVER_SHADOW.shadowOpacity,
    shadowRadius: POPOVER_SHADOW.shadowRadius,
    elevation: POPOVER_SHADOW.elevation,
    // Prevent content overflow past rounded corners
    overflow: 'hidden',
  },
})
