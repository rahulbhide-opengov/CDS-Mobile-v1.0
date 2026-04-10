import React, { useRef, useCallback, useMemo } from 'react'
import { Animated, PanResponder, View, Pressable as RNPressable, LayoutChangeEvent } from 'react-native'
import { Stack } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'
import { colors } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SwipeableRowAction {
  /** Unique key for the action. */
  key: string
  /** Label text displayed below the icon. */
  label: string
  /** Icon element displayed above the label. */
  icon?: React.ReactNode
  /** Background color of the action cell. */
  color: string
  /** Callback invoked when the action is pressed. */
  onPress: () => void
}

export interface SwipeableRowProps {
  /** Actions revealed when swiping to the right (left panel). */
  leftActions?: SwipeableRowAction[]
  /** Actions revealed when swiping to the left (right panel). */
  rightActions?: SwipeableRowAction[]
  /** Distance in pixels the user must swipe to reveal actions. Defaults to 80. */
  threshold?: number
  /** The primary row content. */
  children: React.ReactNode
  /** Called when a swipe gesture starts. */
  onSwipeStart?: () => void
  /** Called when the row snaps back to its closed position. */
  onSwipeEnd?: () => void
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ACTION_WIDTH = 72 // Minimum width per action cell
const SNAP_DURATION = 250

// ---------------------------------------------------------------------------
// ActionPanel -- renders a row of action buttons
// ---------------------------------------------------------------------------

function ActionPanel({
  actions,
  side,
  onActionPress,
}: {
  actions: SwipeableRowAction[]
  side: 'left' | 'right'
  onActionPress: (action: SwipeableRowAction) => void
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        bottom: 0,
        [side === 'left' ? 'left' : 'right']: 0,
      }}
    >
      {actions.map((action) => (
        <RNPressable
          key={action.key}
          onPress={() => onActionPress(action)}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={{
            backgroundColor: action.color,
            width: ACTION_WIDTH,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 8,
          }}
        >
          {action.icon != null && (
            <View style={{ marginBottom: 4 }}>{action.icon}</View>
          )}
          <Text
            color="white"
            fontSize={11}
            fontWeight="$medium"
            textAlign="center"
            numberOfLines={1}
          >
            {action.label}
          </Text>
        </RNPressable>
      ))}
    </View>
  )
}

// ---------------------------------------------------------------------------
// SwipeableRow component
// ---------------------------------------------------------------------------

export const SwipeableRow = React.memo(function SwipeableRow({
  leftActions = [],
  rightActions = [],
  threshold = 80,
  children,
  onSwipeStart,
  onSwipeEnd,
}: SwipeableRowProps) {
  const translateX = useRef(new Animated.Value(0)).current
  const currentOffset = useRef(0)
  const isOpen = useRef(false)

  // Total width of each action panel
  const leftPanelWidth = leftActions.length * ACTION_WIDTH
  const rightPanelWidth = rightActions.length * ACTION_WIDTH

  // Max translation bounds
  const maxLeft = leftActions.length > 0 ? leftPanelWidth : 0
  const maxRight = rightActions.length > 0 ? -rightPanelWidth : 0

  // Snap back to closed position
  const snapToClose = useCallback(() => {
    isOpen.current = false
    currentOffset.current = 0
    Animated.spring(translateX, {
      toValue: 0,
      friction: 8,
      tension: 300,
      useNativeDriver: true,
    }).start(() => {
      onSwipeEnd?.()
    })
  }, [translateX, onSwipeEnd])

  // Snap to open position
  const snapToOpen = useCallback(
    (targetX: number) => {
      isOpen.current = true
      currentOffset.current = targetX
      Animated.spring(translateX, {
        toValue: targetX,
        friction: 8,
        tension: 300,
        useNativeDriver: true,
      }).start()
    },
    [translateX],
  )

  // Handle action press: fire the callback then auto-close
  const handleActionPress = useCallback(
    (action: SwipeableRowAction) => {
      action.onPress()
      snapToClose()
    },
    [snapToClose],
  )

  // -- PanResponder ----------------------------------------------------------

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_evt, gestureState) => {
          // Only capture horizontal drags that exceed a threshold
          return (
            Math.abs(gestureState.dx) > 10 &&
            Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
          )
        },
        onPanResponderGrant: () => {
          onSwipeStart?.()
          // Flatten the current animated value so offset math is correct
          translateX.setOffset(currentOffset.current)
          translateX.setValue(0)
        },
        onPanResponderMove: (_evt, gestureState) => {
          let newX = currentOffset.current + gestureState.dx

          // Clamp within bounds with rubber-band resistance beyond edges
          if (newX > maxLeft) {
            newX = maxLeft + (newX - maxLeft) * 0.3
          } else if (newX < maxRight) {
            newX = maxRight + (newX - maxRight) * 0.3
          }

          translateX.setOffset(0)
          translateX.setValue(newX)
        },
        onPanResponderRelease: (_evt, gestureState) => {
          translateX.flattenOffset()
          const finalX = currentOffset.current + gestureState.dx
          const velocity = gestureState.vx

          // Determine if we should snap open or closed based on threshold and velocity
          if (finalX > 0 && leftActions.length > 0) {
            // Swiped right -- left panel
            if (finalX > threshold || velocity > 0.5) {
              snapToOpen(leftPanelWidth)
            } else {
              snapToClose()
            }
          } else if (finalX < 0 && rightActions.length > 0) {
            // Swiped left -- right panel
            if (Math.abs(finalX) > threshold || velocity < -0.5) {
              snapToOpen(-rightPanelWidth)
            } else {
              snapToClose()
            }
          } else {
            snapToClose()
          }
        },
        onPanResponderTerminate: () => {
          translateX.flattenOffset()
          snapToClose()
        },
      }),
    [
      translateX,
      maxLeft,
      maxRight,
      threshold,
      leftActions.length,
      rightActions.length,
      leftPanelWidth,
      rightPanelWidth,
      snapToOpen,
      snapToClose,
      onSwipeStart,
    ],
  )

  // -- Render ----------------------------------------------------------------

  return (
    <View
      style={{
        overflow: 'hidden',
        position: 'relative',
      }}
      accessibilityRole="none"
    >
      {/* Left actions (revealed on right swipe) */}
      {leftActions.length > 0 && (
        <ActionPanel
          actions={leftActions}
          side="left"
          onActionPress={handleActionPress}
        />
      )}

      {/* Right actions (revealed on left swipe) */}
      {rightActions.length > 0 && (
        <ActionPanel
          actions={rightActions}
          side="right"
          onActionPress={handleActionPress}
        />
      )}

      {/* Sliding content */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX }],
          backgroundColor: colors.white,
        }}
      >
        {children}
      </Animated.View>
    </View>
  )
})

SwipeableRow.displayName = 'SwipeableRow'
