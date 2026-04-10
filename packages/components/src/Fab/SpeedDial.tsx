import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, Pressable as RNPressable } from 'react-native'
import { Stack } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAIN_FAB_SIZE = 56
const ACTION_FAB_SIZE = 40
const ACTION_SPACING = 56
const ANIMATION_DURATION = 200
const STAGGER_DELAY = 40
const BACKDROP_OPACITY = 0.4

// ---------------------------------------------------------------------------
// Position offsets
// ---------------------------------------------------------------------------

const POSITION_MAP: Record<
  'bottomRight' | 'bottomLeft',
  { bottom: number; right?: number; left?: number; alignItems: 'flex-end' | 'flex-start' }
> = {
  bottomRight: {
    bottom: 24,
    right: 16,
    alignItems: 'flex-end',
  },
  bottomLeft: {
    bottom: 24,
    left: 16,
    alignItems: 'flex-start',
  },
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SpeedDialAction {
  /** Unique identifier for the action. */
  key: string
  /** Icon element for the mini-FAB. */
  icon: React.ReactNode
  /** Label displayed as a tooltip alongside the action. */
  label: string
  /** Called when this action is pressed. */
  onPress: () => void
  /** Background color for the mini-FAB. Defaults to $background. */
  color?: string
}

export interface SpeedDialProps {
  /** Icon element for the main toggle FAB. Rotates 45 degrees when open. */
  icon: React.ReactNode
  /** Action items that fan out from the main button (3-6 recommended). */
  actions: SpeedDialAction[]
  /** Controlled open state. Omit for uncontrolled behavior. */
  open?: boolean
  /** Called when the open/closed state changes. */
  onToggle?: (open: boolean) => void
  /** Position of the speed dial on screen. */
  position?: 'bottomRight' | 'bottomLeft'
}

// ---------------------------------------------------------------------------
// Single action item (animated mini-FAB + label)
// ---------------------------------------------------------------------------

function SpeedDialActionItem({
  action,
  index,
  isOpen,
  totalActions,
  onPress,
  alignRight,
}: {
  action: SpeedDialAction
  index: number
  isOpen: boolean
  totalActions: number
  onPress: (action: SpeedDialAction) => void
  alignRight: boolean
}) {
  const translateY = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.4)).current

  useEffect(() => {
    // Stagger index: bottom-most action animates first
    const staggerIndex = totalActions - 1 - index
    const delay = staggerIndex * STAGGER_DELAY

    if (isOpen) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -((index + 1) * ACTION_SPACING),
          duration: ANIMATION_DURATION,
          delay,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          delay,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          delay,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      // Reverse stagger: top-most action collapses first
      const reverseDelay = index * STAGGER_DELAY

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATION_DURATION * 0.8,
          delay: reverseDelay,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_DURATION * 0.6,
          delay: reverseDelay,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.4,
          duration: ANIMATION_DURATION * 0.8,
          delay: reverseDelay,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isOpen, index, totalActions, translateY, opacity, scaleAnim])

  const handlePress = useCallback(() => {
    onPress(action)
  }, [action, onPress])

  // Scale feedback on mini-FAB press
  const pressScaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(() => {
    Animated.spring(pressScaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [pressScaleAnim])

  const handlePressOut = useCallback(() => {
    Animated.spring(pressScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [pressScaleAnim])

  return (
    <Animated.View
      style={[
        styles.actionWrapper,
        {
          transform: [
            { translateY },
            { scale: Animated.multiply(scaleAnim, pressScaleAnim) },
          ],
          opacity,
        },
      ]}
      pointerEvents={isOpen ? 'auto' : 'none'}
    >
      <RNPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={action.label}
        style={[
          styles.actionRow,
          alignRight ? styles.actionRowRight : styles.actionRowLeft,
        ]}
      >
        {/* Label tooltip */}
        <Stack
          backgroundColor="$backgroundInverse"
          paddingHorizontal={12}
          paddingVertical={6}
          borderRadius="$sm"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 1 }}
          shadowOpacity={0.15}
          shadowRadius={3}
        >
          <Text variant="caption" color="$textInverse" fontWeight="$medium" numberOfLines={1}>
            {action.label}
          </Text>
        </Stack>

        {/* Mini-FAB */}
        <Stack
          width={ACTION_FAB_SIZE}
          height={ACTION_FAB_SIZE}
          borderRadius={ACTION_FAB_SIZE / 2}
          backgroundColor={action.color || '$background'}
          alignItems="center"
          justifyContent="center"
          shadowColor="$shadowColor"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.2}
          shadowRadius={4}
          borderWidth={action.color ? 0 : 1}
          borderColor="$borderColor"
        >
          {action.icon}
        </Stack>
      </RNPressable>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// SpeedDial component
// ---------------------------------------------------------------------------

/**
 * `SpeedDial` -- expandable Floating Action Button with multiple actions.
 *
 * The main FAB rotates its icon 45 degrees when open to indicate a close
 * action. Action items fan out upward with staggered entrance animations.
 * A semi-transparent backdrop overlay appears behind the actions for visual
 * separation and tap-to-dismiss behavior.
 *
 * Supports both controlled (`open` + `onToggle`) and uncontrolled usage.
 */
export function SpeedDial({
  icon,
  actions,
  open: controlledOpen,
  onToggle,
  position = 'bottomRight',
}: SpeedDialProps) {
  // ---- Open state (controlled / uncontrolled) ----
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen

  // ---- Rotation animation for main icon ----
  const rotateAnim = useRef(new Animated.Value(0)).current
  const mainScaleAnim = useRef(new Animated.Value(1)).current

  // ---- Backdrop fade ----
  const backdropAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: isOpen ? 1 : 0,
        duration: ANIMATION_DURATION,
        easing: isOpen ? Easing.out(Easing.back(1.5)) : Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: isOpen ? BACKDROP_OPACITY : 0,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }, [isOpen, rotateAnim, backdropAnim])

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  })

  // ---- Toggle handler ----
  const handleToggle = useCallback(() => {
    const nextState = !isOpen
    if (!isControlled) {
      setInternalOpen(nextState)
    }
    onToggle?.(nextState)
  }, [isOpen, isControlled, onToggle])

  // ---- Backdrop dismiss ----
  const handleBackdropPress = useCallback(() => {
    if (isOpen) {
      handleToggle()
    }
  }, [isOpen, handleToggle])

  // ---- Action press: close after firing action ----
  const handleActionPress = useCallback(
    (action: SpeedDialAction) => {
      action.onPress()
      // Auto-close after action
      if (!isControlled) {
        setInternalOpen(false)
      }
      onToggle?.(false)
    },
    [isControlled, onToggle]
  )

  // ---- Main FAB press feedback ----
  const handleMainPressIn = useCallback(() => {
    Animated.spring(mainScaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [mainScaleAnim])

  const handleMainPressOut = useCallback(() => {
    Animated.spring(mainScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [mainScaleAnim])

  // ---- Position ----
  const positionStyle = POSITION_MAP[position]
  const alignRight = position === 'bottomRight'

  return (
    <>
      {/* Backdrop overlay */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropAnim,
            pointerEvents: isOpen ? 'auto' : 'none',
          },
        ]}
      >
        <RNPressable
          onPress={handleBackdropPress}
          style={StyleSheet.absoluteFill}
          accessibilityRole="none"
          accessibilityLabel="Close speed dial"
          accessible={isOpen}
          accessibilityElementsHidden={!isOpen}
        />
      </Animated.View>

      {/* Speed dial container */}
      <Animated.View
        style={[
          styles.container,
          {
            bottom: positionStyle.bottom,
            ...(alignRight
              ? { right: positionStyle.right }
              : { left: positionStyle.left }),
            alignItems: positionStyle.alignItems,
          },
        ]}
      >
        {/* Action items (positioned relative to main FAB) */}
        {actions.map((action, index) => (
          <SpeedDialActionItem
            key={action.key}
            action={action}
            index={index}
            isOpen={isOpen}
            totalActions={actions.length}
            onPress={handleActionPress}
            alignRight={alignRight}
          />
        ))}

        {/* Main toggle FAB */}
        <Animated.View
          style={{
            transform: [{ scale: mainScaleAnim }],
          }}
        >
          <RNPressable
            onPress={handleToggle}
            onPressIn={handleMainPressIn}
            onPressOut={handleMainPressOut}
            accessibilityRole="button"
            accessibilityLabel={isOpen ? 'Close speed dial' : 'Open speed dial'}
            accessibilityState={{ expanded: isOpen }}
          >
            <Stack
              width={MAIN_FAB_SIZE}
              height={MAIN_FAB_SIZE}
              borderRadius={MAIN_FAB_SIZE / 2}
              backgroundColor="$brandBackground"
              alignItems="center"
              justifyContent="center"
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 4 }}
              shadowOpacity={0.25}
              shadowRadius={8}
            >
              <Animated.View
                style={{
                  transform: [{ rotate: rotateInterpolation }],
                }}
              >
                {icon}
              </Animated.View>
            </Stack>
          </RNPressable>
        </Animated.View>
      </Animated.View>
    </>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 899,
  },
  container: {
    position: 'absolute',
    zIndex: 900,
  },
  actionWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionRowRight: {
    flexDirection: 'row',
  },
  actionRowLeft: {
    flexDirection: 'row-reverse',
  },
})
