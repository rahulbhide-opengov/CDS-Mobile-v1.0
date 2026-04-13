/**
 * ToggleButton -- CDS 37 Figma-accurate implementation
 *
 * A button that toggles between selected and unselected states.
 * Supports "standard" and "filled" variants with group management.
 *
 * 2 variants: Standard, Filled
 * 3 sizes: Small (32), Medium (36), Large (48)
 * Disabled: 38% opacity on the entire component (Figma opacity: 0.38)
 *
 * All colors reference `primitive` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo, useState } from 'react'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: border radius 4px for all toggle button sizes */
const TOGGLE_RADIUS = 4

/** CDS 37: disabled state uses 38% opacity on the whole component */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

// ---------------------------------------------------------------------------
// ToggleButtonFrame -- Tamagui styled frame
// ---------------------------------------------------------------------------

const ToggleButtonFrame = styled(Stack, {
  name: 'ToggleButton',
  tag: 'button',
  role: 'button',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: TOGGLE_RADIUS,
  cursor: 'pointer',
  minWidth: 0,
  minHeight: 0,

  variants: {
    // -----------------------------------------------------------------------
    // size -- from Figma Semantic (Display) Mobile (390) column
    // -----------------------------------------------------------------------
    size: {
      sm: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        height: 32,
        minHeight: 32,
        gap: 4,
      },
      md: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        height: 36,
        minHeight: 36,
        gap: 4,
      },
      lg: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        height: 48,
        minHeight: 48,
        gap: 8,
      },
    },

    // -----------------------------------------------------------------------
    // disabled
    // -----------------------------------------------------------------------
    disabled: {
      true: {
        opacity: DISABLED_OPACITY,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// ToggleButtonText -- styled text with variant/selected color
// ---------------------------------------------------------------------------

const ToggleButtonText = styled(TamaguiText, {
  name: 'ToggleButtonText',
  fontFamily: '$body',
  userSelect: 'none',

  variants: {
    size: {
      sm: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 18,
      },
      md: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
      },
      lg: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToggleButtonVariant = 'standard' | 'filled'
export type ToggleButtonSize = 'sm' | 'md' | 'lg'

export interface ToggleButtonProps {
  /** Whether the toggle is currently selected. */
  selected?: boolean
  /** Called when the toggle state changes. */
  onToggle?: (selected: boolean) => void
  /** Visual variant. Defaults to "standard". */
  variant?: ToggleButtonVariant
  /** Size preset. Defaults to "md". */
  size?: ToggleButtonSize
  /** Disables the toggle -- applies 38% opacity per Figma spec. */
  disabled?: boolean
  /** Optional icon element rendered before the label text. */
  iconLeft?: React.ReactNode
  /** Toggle label. */
  children: React.ReactNode
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Style resolver -- returns frame + text styles based on variant + selected
// ---------------------------------------------------------------------------

function getToggleStyles(variant: ToggleButtonVariant, selected: boolean) {
  if (variant === 'filled') {
    return {
      frame: {
        backgroundColor: selected ? primitive.blurple700 : 'transparent',
        borderWidth: selected ? 0 : 1,
        borderColor: selected ? undefined : primitive.blurple700,
      },
      text: {
        color: selected ? primitive.white : primitive.blurple700,
      },
      pressStyle: {
        backgroundColor: selected ? primitive.blurple900 : primitive.blurple100,
      },
    }
  }

  // Standard variant
  return {
    frame: {
      backgroundColor: selected ? primitive.gray100 : 'transparent',
      borderWidth: selected ? 0 : 1,
      borderColor: selected ? undefined : primitive.slate700,
    },
    text: {
      color: primitive.slate700,
    },
    pressStyle: {
      backgroundColor: selected ? primitive.gray200 : primitive.gray100,
    },
  }
}

// ---------------------------------------------------------------------------
// ToggleButton component
// ---------------------------------------------------------------------------

export const ToggleButton = React.memo(function ToggleButton({
  selected = false,
  onToggle,
  variant = 'standard',
  size = 'md',
  disabled = false,
  iconLeft,
  children,
  accessibilityLabel,
  testID,
}: ToggleButtonProps) {
  const handlePress = useCallback(() => {
    if (!disabled && onToggle) {
      onToggle(!selected)
    }
  }, [disabled, onToggle, selected])

  const styles = useMemo(
    () => getToggleStyles(variant, selected),
    [variant, selected],
  )

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    if (typeof children === 'string') return children
    return undefined
  }, [accessibilityLabel, children])

  // hitSlop pads small/medium buttons to 44pt WCAG minimum touch target
  const hitSlop = useMemo(() => {
    if (size === 'sm') {
      const pad = Math.ceil((MIN_TOUCH_TARGET - 32) / 2)
      return { top: pad, bottom: pad, left: pad, right: pad }
    }
    if (size === 'md') {
      const pad = Math.ceil((MIN_TOUCH_TARGET - 36) / 2)
      return { top: pad, bottom: pad, left: pad, right: pad }
    }
    return undefined // lg=48 meets WCAG minimum
  }, [size])

  return (
    <ToggleButtonFrame
      size={size}
      disabled={disabled || undefined}
      onPress={handlePress}
      hitSlop={hitSlop}
      backgroundColor={styles.frame.backgroundColor}
      borderWidth={styles.frame.borderWidth}
      borderColor={styles.frame.borderColor}
      pressStyle={styles.pressStyle}
      hoverStyle={styles.pressStyle}
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{
        disabled,
        selected,
      }}
      testID={testID}
    >
      {iconLeft}

      {typeof children === 'string' ? (
        <ToggleButtonText size={size} color={styles.text.color}>
          {children}
        </ToggleButtonText>
      ) : (
        children
      )}
    </ToggleButtonFrame>
  )
})

ToggleButton.displayName = 'ToggleButton'

// ---------------------------------------------------------------------------
// ToggleButtonGroup -- manages exclusive selection within a group
// ---------------------------------------------------------------------------

export interface ToggleButtonGroupProps {
  /** Currently selected value. Pass null/undefined for no selection. */
  value?: string | null
  /** Called when selection changes. Receives the new value or null. */
  onChange?: (value: string | null) => void
  /** Whether selection is exclusive (only one at a time). Defaults to true. */
  exclusive?: boolean
  /** Visual variant applied to all child buttons. Defaults to "standard". */
  variant?: ToggleButtonVariant
  /** Size applied to all child buttons. Defaults to "md". */
  size?: ToggleButtonSize
  /** Disables the entire group. */
  disabled?: boolean
  /** ToggleButton elements. Each must have a `value` string prop via ToggleButtonGroupItem. */
  children: React.ReactNode
  /** Accessibility label for the group. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

export interface ToggleButtonGroupItemProps {
  /** Unique value for this item within the group. */
  value: string
  /** Optional icon element rendered before the label. */
  iconLeft?: React.ReactNode
  /** Toggle label. */
  children: React.ReactNode
  /** Disables this individual item. */
  disabled?: boolean
  /** Additional test ID for testing. */
  testID?: string
}

/**
 * ToggleButtonGroupItem -- a thin wrapper that receives group context.
 * Must be used as a direct child of ToggleButtonGroup.
 */
export const ToggleButtonGroupItem = React.memo(function ToggleButtonGroupItem(
  _props: ToggleButtonGroupItemProps,
) {
  // Rendering is handled by ToggleButtonGroup via cloneElement
  return null
})

ToggleButtonGroupItem.displayName = 'ToggleButtonGroupItem'

export const ToggleButtonGroup = React.memo(function ToggleButtonGroup({
  value,
  onChange,
  exclusive = true,
  variant = 'standard',
  size = 'md',
  disabled = false,
  children,
  accessibilityLabel,
  testID,
}: ToggleButtonGroupProps) {
  // For non-exclusive mode, track multiple selections internally
  const [multiValue, setMultiValue] = useState<Set<string>>(new Set())

  const handleToggle = useCallback(
    (itemValue: string) => {
      if (exclusive) {
        const newValue = value === itemValue ? null : itemValue
        onChange?.(newValue)
      } else {
        setMultiValue((prev) => {
          const next = new Set(prev)
          if (next.has(itemValue)) {
            next.delete(itemValue)
          } else {
            next.add(itemValue)
          }
          return next
        })
        onChange?.(itemValue)
      }
    },
    [exclusive, value, onChange],
  )

  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement<ToggleButtonGroupItemProps>(child)) return child

    const itemValue = child.props.value
    const isSelected = exclusive
      ? value === itemValue
      : multiValue.has(itemValue)

    return (
      <ToggleButton
        key={itemValue}
        selected={isSelected}
        onToggle={() => handleToggle(itemValue)}
        variant={variant}
        size={size}
        disabled={disabled || child.props.disabled}
        iconLeft={child.props.iconLeft}
        testID={child.props.testID}
      >
        {child.props.children}
      </ToggleButton>
    )
  })

  return (
    <ToggleButtonFrame
      flexDirection="row"
      gap={8}
      backgroundColor="transparent"
      borderWidth={0}
      height="auto"
      minHeight="auto"
      paddingHorizontal={0}
      paddingVertical={0}
      accessibilityRole="toolbar"
      accessibilityLabel={accessibilityLabel ?? 'Toggle button group'}
      testID={testID}
    >
      {items}
    </ToggleButtonFrame>
  )
})

ToggleButtonGroup.displayName = 'ToggleButtonGroup'
