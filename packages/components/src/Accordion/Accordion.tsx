/**
 * Accordion -- CDS 37 Figma-accurate implementation
 *
 * Expandable content sections with animated height transitions.
 *
 * AccordionItem: individual expandable section
 * Accordion: container managing exclusive or multi-expand behavior
 *
 * Header: 48px height, body1 (16/400), chevron icon rotates on expand
 * Divider: rgba(0,0,0,0.12) between items
 * Disabled: 38% opacity on the entire item
 * Chevron: 24px, slate700 color
 *
 * All colors reference `primitive` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import {
  View,
  Pressable,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native'
import { Text as TamaguiText } from '@tamagui/core'
import { Svg, Path } from 'react-native-svg'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Enable LayoutAnimation on Android
// ---------------------------------------------------------------------------

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: disabled state uses 38% opacity on the whole component */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Header height per Figma spec */
const HEADER_HEIGHT = 48

/** Chevron icon size */
const CHEVRON_SIZE = 24

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

/** Divider color (rgba(0,0,0,0.12)) */
const DIVIDER_COLOR = 'rgba(0,0,0,0.12)'

/** Chevron down path (Material Design expand_more, viewBox 0 0 24 24) */
const CHEVRON_DOWN_PATH = 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'

// ---------------------------------------------------------------------------
// Animation config
// ---------------------------------------------------------------------------

const EXPAND_ANIMATION = LayoutAnimation.create(
  250,
  LayoutAnimation.Types.easeInEaseOut,
  LayoutAnimation.Properties.opacity,
)

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionItemProps {
  /** Header title text. */
  title: string
  /** Content rendered when expanded. */
  children: React.ReactNode
  /** Whether this item is expanded. Controlled prop. */
  expanded?: boolean
  /** Called when the header is pressed. */
  onToggle?: () => void
  /** Disables the item -- applies 38% opacity per Figma spec. */
  disabled?: boolean
  /** Whether to show a divider below this item. Defaults to true. */
  showDivider?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

export interface AccordionProps {
  /** AccordionItem children. */
  children: React.ReactNode
  /** When true, only one item can be expanded at a time. Defaults to false. */
  exclusive?: boolean
  /** Index (or indices) of initially expanded items. */
  defaultExpanded?: number | number[]
  /** Accessibility label for the accordion container. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Animated Chevron
// ---------------------------------------------------------------------------

interface ChevronProps {
  expanded: boolean
}

const AnimatedChevron = React.memo(function AnimatedChevron({
  expanded,
}: ChevronProps) {
  const rotation = useRef(new Animated.Value(expanded ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start()
  }, [expanded, rotation])

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
      <Svg
        width={CHEVRON_SIZE}
        height={CHEVRON_SIZE}
        viewBox="0 0 24 24"
      >
        <Path d={CHEVRON_DOWN_PATH} fill={primitive.slate700} />
      </Svg>
    </Animated.View>
  )
})

AnimatedChevron.displayName = 'AnimatedChevron'

// ---------------------------------------------------------------------------
// AccordionItem component
// ---------------------------------------------------------------------------

export const AccordionItem = React.memo(function AccordionItem({
  title,
  children,
  expanded = false,
  onToggle,
  disabled = false,
  showDivider = true,
  accessibilityLabel,
  testID,
}: AccordionItemProps) {
  const handlePress = useCallback(() => {
    if (!disabled && onToggle) {
      LayoutAnimation.configureNext(EXPAND_ANIMATION)
      onToggle()
    }
  }, [disabled, onToggle])

  const a11yLabel = accessibilityLabel ?? title

  return (
    <View
      style={[disabled && { opacity: DISABLED_OPACITY }]}
      testID={testID}
    >
      {/* Header */}
      <Pressable
        onPress={handlePress}
        style={styles.header}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        accessibilityState={{
          disabled,
          expanded,
        }}
        accessibilityHint={
          expanded ? 'Double tap to collapse' : 'Double tap to expand'
        }
        testID={testID ? `${testID}-header` : undefined}
      >
        <TamaguiText
          fontFamily="$body"
          fontSize={16}
          fontWeight="400"
          lineHeight={24}
          color={primitive.slate900}
          flex={1}
          numberOfLines={1}
        >
          {title}
        </TamaguiText>

        <AnimatedChevron expanded={expanded} />
      </Pressable>

      {/* Content */}
      {expanded ? (
        <View
          style={styles.content}
          accessibilityRole="summary"
          testID={testID ? `${testID}-content` : undefined}
        >
          {children}
        </View>
      ) : null}

      {/* Divider */}
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  )
})

AccordionItem.displayName = 'AccordionItem'

// ---------------------------------------------------------------------------
// Accordion component -- manages expanded state for children
// ---------------------------------------------------------------------------

export const Accordion = React.memo(function Accordion({
  children,
  exclusive = false,
  defaultExpanded,
  accessibilityLabel,
  testID,
}: AccordionProps) {
  // Normalize defaultExpanded to a Set of indices
  const initialExpanded = useMemo(() => {
    if (defaultExpanded == null) return new Set<number>()
    if (typeof defaultExpanded === 'number') return new Set([defaultExpanded])
    return new Set(defaultExpanded)
  }, []) // Only compute on mount -- defaultExpanded is initial only

  const [expandedSet, setExpandedSet] = useState<Set<number>>(initialExpanded)

  const handleToggle = useCallback(
    (index: number) => {
      setExpandedSet((prev) => {
        const next = new Set(prev)

        if (next.has(index)) {
          next.delete(index)
        } else {
          if (exclusive) {
            // In exclusive mode, close all others
            next.clear()
          }
          next.add(index)
        }

        return next
      })
    },
    [exclusive],
  )

  const childArray = React.Children.toArray(children)

  return (
    <View
      accessibilityRole="list"
      accessibilityLabel={accessibilityLabel ?? 'Accordion'}
      testID={testID}
    >
      {childArray.map((child, index) => {
        if (!React.isValidElement<AccordionItemProps>(child)) return child

        const isExpanded = expandedSet.has(index)
        const isLast = index === childArray.length - 1

        return React.cloneElement(child, {
          key: index,
          expanded: isExpanded,
          onToggle: () => handleToggle(index),
          showDivider: !isLast,
        })
      })}
    </View>
  )
})

Accordion.displayName = 'Accordion'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    minHeight: HEADER_HEIGHT,
    paddingHorizontal: 16,
    gap: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: DIVIDER_COLOR,
    marginHorizontal: 0,
  },
})
