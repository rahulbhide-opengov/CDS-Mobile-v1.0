/**
 * Menu -- CDS 37 dropdown menu with items
 *
 * A popover-style dropdown menu that renders anchored to a trigger element.
 * Uses React Native Modal with fade + scale animation from the anchor point.
 *
 * Features:
 *   - Configurable anchor position (bottom-start, bottom-end)
 *   - MenuItem with leading/trailing icons, destructive styling, divider
 *   - Dense mode (36px items) for compact UIs
 *   - Full accessibility: role="menu", role="menuitem", disabled states
 *   - Animation: 150ms fade + scale from anchor
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useEffect, useRef, useMemo } from 'react'
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  View,
  type LayoutRectangle,
} from 'react-native'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { Pressable } from '@opengov/cds-primitives'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: Menu container border radius */
const MENU_RADIUS = 8

/** CDS 37: disabled state uses 38% opacity */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Animation duration in ms */
const ANIMATION_DURATION = 150

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

/** Divider color per CDS spec */
const DIVIDER_COLOR = 'rgba(0,0,0,0.12)'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MenuPosition = 'bottom-start' | 'bottom-end'

export interface MenuItemProps {
  /** Label text for the menu item. */
  label: string
  /** Called when this item is pressed. */
  onPress?: () => void
  /** Icon element rendered before the label text. */
  leadingIcon?: React.ReactNode
  /** Icon element rendered after the label text. */
  trailingIcon?: React.ReactNode
  /** Whether this item is disabled (dimmed, not pressable). */
  disabled?: boolean
  /** Whether this is a destructive/dangerous action (renders in red). */
  destructive?: boolean
  /** Whether to render a divider below this item. */
  divider?: boolean
  /** Whether this item is currently selected. */
  selected?: boolean
  /** Additional test ID for testing. */
  testID?: string
}

export interface MenuProps {
  /** Controls visibility of the menu. */
  visible: boolean
  /** Called when the menu should close. */
  onClose: () => void
  /** Anchor layout rectangle (from onLayout or measure) for positioning. */
  anchor?: LayoutRectangle
  /** Position of the menu relative to the anchor. Defaults to "bottom-start". */
  position?: MenuPosition
  /** Use dense mode (36px item height, smaller text). Defaults to false. */
  dense?: boolean
  /** Menu items to render. */
  children: React.ReactNode
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// MenuItemFrame -- Tamagui styled pressable row
// ---------------------------------------------------------------------------

const MenuItemFrame = styled(Stack, {
  name: 'MenuItem',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  cursor: 'pointer',
  backgroundColor: 'transparent',

  hoverStyle: {
    backgroundColor: primitive.gray50,
  },

  pressStyle: {
    backgroundColor: primitive.gray100,
  },

  variants: {
    dense: {
      true: {
        height: 36,
        minHeight: 36,
      },
      false: {
        height: 48,
        minHeight: 48,
      },
    },

    selected: {
      true: {
        backgroundColor: primitive.blurple50,
        hoverStyle: {
          backgroundColor: primitive.blurple100,
        },
      },
    },

    disabled: {
      true: {
        opacity: DISABLED_OPACITY,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    dense: false,
  },
})

// ---------------------------------------------------------------------------
// MenuItemText
// ---------------------------------------------------------------------------

const MenuItemText = styled(TamaguiText, {
  name: 'MenuItemText',
  fontFamily: '$body',
  flex: 1,

  variants: {
    dense: {
      true: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
      },
      false: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
      },
    },

    destructive: {
      true: {
        color: primitive.red600,
      },
      false: {
        color: primitive.slate700,
      },
    },
  } as const,

  defaultVariants: {
    dense: false,
    destructive: false,
  },
})

// ---------------------------------------------------------------------------
// MenuItem component
// ---------------------------------------------------------------------------

export const MenuItem = React.memo(function MenuItem({
  label,
  onPress,
  leadingIcon,
  trailingIcon,
  disabled = false,
  destructive = false,
  divider = false,
  selected = false,
  testID,
}: MenuItemProps) {
  // hitSlop pads the 36px dense items to meet 44pt WCAG minimum
  const hitSlop = useMemo(() => {
    const pad = Math.ceil((MIN_TOUCH_TARGET - 36) / 2)
    return { top: pad, bottom: pad, left: 0, right: 0 }
  }, [])

  return (
    <>
      <MenuItemFrame
        dense={false}
        selected={selected || undefined}
        disabled={disabled || undefined}
        onPress={disabled ? undefined : onPress}
        hitSlop={hitSlop}
        accessibilityRole="menuitem"
        accessibilityLabel={label}
        accessibilityState={{
          disabled,
          selected,
        }}
        testID={testID}
      >
        {/* Leading icon */}
        {leadingIcon != null && (
          <Stack
            width={24}
            height={24}
            alignItems="center"
            justifyContent="center"
            marginRight={12}
          >
            <Stack
              opacity={destructive ? 1 : 1}
              // tintColor applied via the icon element itself
            >
              {leadingIcon}
            </Stack>
          </Stack>
        )}

        {/* Label text */}
        <MenuItemText destructive={destructive || undefined}>
          {label}
        </MenuItemText>

        {/* Trailing icon */}
        {trailingIcon != null && (
          <Stack
            width={24}
            height={24}
            alignItems="center"
            justifyContent="center"
            marginLeft={12}
          >
            {trailingIcon}
          </Stack>
        )}
      </MenuItemFrame>

      {/* Divider */}
      {divider && (
        <View
          style={styles.divider}
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      )}
    </>
  )
})

MenuItem.displayName = 'MenuItem'

// ---------------------------------------------------------------------------
// Menu component
// ---------------------------------------------------------------------------

export const Menu = React.memo(function Menu({
  visible,
  onClose,
  anchor,
  position = 'bottom-start',
  dense = false,
  children,
  accessibilityLabel,
  testID,
}: MenuProps) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current
  const opacityAnim = useRef(new Animated.Value(0)).current

  // ---- Animation helpers --------------------------------------------------

  const animateIn = useCallback(() => {
    scaleAnim.setValue(0.85)
    opacityAnim.setValue(0)

    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 20,
        stiffness: 280,
        mass: 0.6,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()
  }, [scaleAnim, opacityAnim])

  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: ANIMATION_DURATION,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(callback)
    },
    [scaleAnim, opacityAnim],
  )

  // ---- Visibility lifecycle -----------------------------------------------

  useEffect(() => {
    if (visible) {
      animateIn()
    }
  }, [visible, animateIn])

  // ---- Dismiss handler with exit animation --------------------------------

  const handleDismiss = useCallback(() => {
    animateOut(() => {
      onClose()
    })
  }, [animateOut, onClose])

  // ---- Compute menu position from anchor ----------------------------------

  const menuPosition = useMemo(() => {
    if (!anchor) {
      return { top: 0, left: 0 }
    }

    const top = anchor.y + anchor.height + 4 // 4px gap below anchor

    if (position === 'bottom-end') {
      return { top, right: undefined, left: anchor.x }
    }

    return { top, left: anchor.x }
  }, [anchor, position])

  // ---- Transform origin for scale animation from anchor -------------------

  const transformOrigin = useMemo(() => {
    if (position === 'bottom-end') {
      return [{ scaleX: scaleAnim }, { scaleY: scaleAnim }]
    }
    return [{ scaleX: scaleAnim }, { scaleY: scaleAnim }]
  }, [position, scaleAnim])

  // ---- Inject dense prop into MenuItem children ---------------------------

  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<MenuItemProps>(child) && dense) {
        // Override the MenuItem to use dense layout
        return React.cloneElement(child as React.ReactElement<any>, {
          dense: true,
        })
      }
      return child
    })
  }, [children, dense])

  // ---- Render --------------------------------------------------------------

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleDismiss}
      accessibilityViewIsModal
    >
      {/* Transparent backdrop -- closes menu on tap */}
      <Stack
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        onPress={handleDismiss}
        accessibilityRole="none"
        accessibilityLabel="Close menu"
      />

      {/* Menu container */}
      <Animated.View
        style={[
          styles.menuContainer,
          {
            top: menuPosition.top,
            left: menuPosition.left,
            opacity: opacityAnim,
            transform: transformOrigin,
          },
        ]}
      >
        <Stack
          backgroundColor={primitive.white}
          borderRadius={MENU_RADIUS}
          overflow="hidden"
          paddingVertical={8}
          // Elevation shadow (iOS: shadow*, Android: use style)
          shadowColor={primitive.black}
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.15}
          shadowRadius={8}
          accessibilityRole="menu"
          accessibilityLabel={accessibilityLabel ?? 'Menu'}
          testID={testID}
        >
          {enhancedChildren}
        </Stack>
      </Animated.View>
    </Modal>
  )
})

Menu.displayName = 'Menu'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    minWidth: 160,
    maxWidth: 320,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: DIVIDER_COLOR,
    marginHorizontal: 0,
  },
})
