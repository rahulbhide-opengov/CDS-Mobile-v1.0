/**
 * List / ListItem -- CDS 37 Figma-accurate implementation
 *
 * A vertical list container with individually configurable list items.
 * Supports primary/secondary text, leading/trailing icons, trailing text,
 * selection highlighting, dividers, and dense mode.
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 * Typography uses `baseStyles` from @opengov/cds-tokens (mobile column).
 */

import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { Pressable } from '@opengov/cds-primitives'
import { primitive, baseStyles } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default list-item height (mobile) */
const ITEM_HEIGHT_DEFAULT = 48

/** Dense list-item height (mobile) */
const ITEM_HEIGHT_DENSE = 36

/** Leading icon area width */
const LEADING_AREA_WIDTH = 40

/** Leading icon size */
const ICON_SIZE = 24

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

/** Divider color -- semantic divider token */
const DIVIDER_COLOR = 'rgba(0,0,0,0.12)'

/** Disabled opacity -- matches CDS 37 */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

// ---------------------------------------------------------------------------
// ListItemFrame -- Tamagui styled pressable row
// ---------------------------------------------------------------------------

const ListItemFrame = styled(Stack, {
  name: 'ListItem',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 16,
  borderRadius: 0,
  cursor: 'pointer',
  minWidth: 0,
  minHeight: 0,

  variants: {
    dense: {
      true: {
        height: ITEM_HEIGHT_DENSE,
        minHeight: ITEM_HEIGHT_DENSE,
      },
      false: {
        height: ITEM_HEIGHT_DEFAULT,
        minHeight: ITEM_HEIGHT_DEFAULT,
      },
    },

    selected: {
      true: {
        backgroundColor: primitive.blurple50,
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
    selected: false,
  },
})

// ---------------------------------------------------------------------------
// Text sub-components
// ---------------------------------------------------------------------------

const PrimaryText = styled(TamaguiText, {
  name: 'ListItemPrimaryText',
  fontFamily: '$body',
  fontSize: baseStyles.body1.mobile.fontSize,       // 16
  fontWeight: String(baseStyles.body1.mobile.fontWeight) as '400',
  lineHeight: baseStyles.body1.mobile.lineHeight,    // 20
  letterSpacing: baseStyles.body1.mobile.letterSpacing,
  color: 'rgba(0,0,0,0.87)', // textPrimary
  numberOfLines: 1,
})

const SecondaryText = styled(TamaguiText, {
  name: 'ListItemSecondaryText',
  fontFamily: '$body',
  fontSize: baseStyles.body3.mobile.fontSize,        // 13
  fontWeight: String(baseStyles.body3.mobile.fontWeight) as '400',
  lineHeight: baseStyles.body3.mobile.lineHeight,     // 16
  letterSpacing: baseStyles.body3.mobile.letterSpacing,
  color: 'rgba(0,0,0,0.6)', // textSecondary
  numberOfLines: 1,
})

const TrailingText = styled(TamaguiText, {
  name: 'ListItemTrailingText',
  fontFamily: '$body',
  fontSize: baseStyles.body3.mobile.fontSize,        // 13
  fontWeight: String(baseStyles.body3.mobile.fontWeight) as '400',
  lineHeight: baseStyles.body3.mobile.lineHeight,     // 16
  letterSpacing: baseStyles.body3.mobile.letterSpacing,
  color: 'rgba(0,0,0,0.6)', // textSecondary
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ListItemProps {
  /** Primary text line displayed in body1 typography. */
  primary: string
  /** Optional secondary text line displayed below primary in body3 typography. */
  secondary?: string
  /** Icon element rendered in the leading area (24px inside 40px-wide slot). */
  leadingIcon?: React.ReactNode
  /** Icon element rendered on the trailing side. */
  trailingIcon?: React.ReactNode
  /** Text rendered on the trailing side (mutually exclusive with trailingIcon in layout). */
  trailingText?: string
  /** Press handler. Not called when disabled. */
  onPress?: () => void
  /** Disables the item -- applies 38% opacity per CDS 37 spec. */
  disabled?: boolean
  /** Selected state -- applies blurple50 background and blurple700 leading icon tint. */
  selected?: boolean
  /** Renders a bottom divider below this item. */
  divider?: boolean
  /** Dense mode -- reduces item height to 36px. Inherited from parent List if not set. */
  dense?: boolean
  /** Accessibility label override. Falls back to primary text. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

export interface ListProps {
  /** ListItem elements. */
  children: React.ReactNode
  /** Dense mode -- reduces all child item heights to 36px. */
  dense?: boolean
  /** Accessibility label for the list container. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// ListItem component
// ---------------------------------------------------------------------------

export const ListItem = React.memo(function ListItem({
  primary,
  secondary,
  leadingIcon,
  trailingIcon,
  trailingText,
  onPress,
  disabled = false,
  selected = false,
  divider = false,
  dense = false,
  accessibilityLabel,
  testID,
}: ListItemProps) {
  const handlePress = useCallback(() => {
    if (!disabled && onPress) {
      onPress()
    }
  }, [disabled, onPress])

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    if (secondary) return `${primary}, ${secondary}`
    return primary
  }, [accessibilityLabel, primary, secondary])

  // For two-line items (with secondary), switch to taller auto height
  const hasTwoLines = !!secondary
  const itemHeight = hasTwoLines
    ? undefined
    : dense
      ? ITEM_HEIGHT_DENSE
      : ITEM_HEIGHT_DEFAULT
  const itemMinHeight = dense ? ITEM_HEIGHT_DENSE : ITEM_HEIGHT_DEFAULT

  // hitSlop for dense items under 44px touch target
  const hitSlop = useMemo(() => {
    const height = itemHeight ?? itemMinHeight
    if (height < MIN_TOUCH_TARGET) {
      const pad = Math.ceil((MIN_TOUCH_TARGET - height) / 2)
      return { top: pad, bottom: pad, left: 0, right: 0 }
    }
    return undefined
  }, [itemHeight, itemMinHeight])

  // Leading icon color: blurple700 when selected, slate700 otherwise
  const leadingIconColor = selected ? primitive.blurple700 : primitive.slate700

  const content = (
    <ListItemFrame
      dense={dense || undefined}
      selected={selected || undefined}
      disabled={disabled || undefined}
      {...(hasTwoLines ? { height: 'auto', minHeight: itemMinHeight, paddingVertical: 8 } : {})}
      hoverStyle={!disabled ? { backgroundColor: primitive.gray50 } : undefined}
      pressStyle={!disabled ? { backgroundColor: primitive.gray100 } : undefined}
      testID={testID}
    >
      {/* Leading icon area */}
      {leadingIcon && (
        <View
          style={[
            styles.leadingArea,
            {},
          ]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {React.isValidElement(leadingIcon)
            ? React.cloneElement(leadingIcon as React.ReactElement<any>, {
                color: leadingIconColor,
                width: ICON_SIZE,
                height: ICON_SIZE,
                size: ICON_SIZE,
              })
            : leadingIcon}
        </View>
      )}

      {/* Text content -- fills available space */}
      <View style={styles.textContainer}>
        <PrimaryText>{primary}</PrimaryText>
        {secondary && <SecondaryText>{secondary}</SecondaryText>}
      </View>

      {/* Trailing content */}
      {trailingText && (
        <TrailingText>{trailingText}</TrailingText>
      )}
      {trailingIcon && (
        <View
          style={styles.trailingIconArea}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {trailingIcon}
        </View>
      )}
    </ListItemFrame>
  )

  return (
    <>
      {onPress ? (
        <Pressable
          onPress={handlePress}
          disabled={disabled}
          hitSlop={hitSlop}
          accessibilityRole="button"
          accessibilityLabel={a11yLabel}
          accessibilityState={{
            disabled,
            selected,
          }}
          minWidth={0}
          minHeight={0}
        >
          {content}
        </Pressable>
      ) : (
        <View
          accessible
          accessibilityRole="text"
          accessibilityLabel={a11yLabel}
          accessibilityState={{ selected }}
        >
          {content}
        </View>
      )}
      {divider && <View style={styles.divider} />}
    </>
  )
})

ListItem.displayName = 'ListItem'

// ---------------------------------------------------------------------------
// List container
// ---------------------------------------------------------------------------

/**
 * `List` -- vertical list container following CDS 37 patterns.
 *
 * Wraps ListItem children in an accessible list container. When `dense` is
 * set, all child ListItems inherit 36px height instead of the default 48px.
 * Children receive the dense prop automatically via React.cloneElement.
 */
export function List({
  children,
  dense = false,
  accessibilityLabel,
  testID,
}: ListProps) {
  // Clone children to inject dense prop from parent
  const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<ListItemProps>(child) && child.type === ListItem) {
        // Only inject dense if the child does not already specify it
        if (child.props.dense === undefined) {
          return React.cloneElement(child, { dense })
        }
      }
      return child
    })
  }, [children, dense])

  return (
    <View
      style={styles.listContainer}
      accessibilityRole="list"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {enhancedChildren}
    </View>
  )
}

List.displayName = 'List'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  leadingArea: {
    width: LEADING_AREA_WIDTH,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  trailingIconArea: {
    marginLeft: 8,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: DIVIDER_COLOR,
    marginLeft: 16,
  },
})
