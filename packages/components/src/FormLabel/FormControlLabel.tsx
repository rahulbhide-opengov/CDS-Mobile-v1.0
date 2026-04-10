import React, { useMemo, cloneElement, isValidElement } from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text } from '@opengov/cds-primitives'
import { Pressable as RNPressable, View } from 'react-native'

// ---------------------------------------------------------------------------
// Styled frame
// ---------------------------------------------------------------------------

const FormControlLabelFrame = styled(Stack, {
  name: 'FormControlLabel',
  alignItems: 'center',
  gap: '$2',

  variants: {
    labelPlacement: {
      end: {
        flexDirection: 'row',
      },
      start: {
        flexDirection: 'row-reverse',
      },
      top: {
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
      },
      bottom: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,

  defaultVariants: {
    labelPlacement: 'end',
  },
})

// ---------------------------------------------------------------------------
// Label text
// ---------------------------------------------------------------------------

const LabelText = styled(Text, {
  name: 'FormControlLabelText',
  fontFamily: '$body',
  fontSize: '$sm',
  lineHeight: '$sm',
  color: '$color',

  variants: {
    disabled: {
      true: {
        color: '$colorDisabled',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FormControlLabelProps {
  /** Label text displayed alongside the control. */
  label: string
  /** Position of the label relative to the control. */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'
  /** Disables both the label and passes disabled state to the control. */
  disabled?: boolean
  /** The form control element (Checkbox, Radio, Switch). */
  control: React.ReactElement
  /** Accessibility label override for the combined control + label. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// FormControlLabel component
//
// Wraps a form control (Checkbox, Radio, Switch) with a text label and
// forwards the disabled state to the control. Tapping the label toggles
// the control when the control supports an onPress or onChange callback.
// ---------------------------------------------------------------------------

export const FormControlLabel = React.memo(function FormControlLabel({
  label,
  labelPlacement = 'end',
  disabled = false,
  control,
  accessibilityLabel,
}: FormControlLabelProps) {
  // Clone the control element and inject the disabled prop if it differs
  const enhancedControl = useMemo(() => {
    if (!isValidElement(control)) return control
    const controlProps: Record<string, unknown> = {}
    if (disabled) {
      controlProps.disabled = true
    }
    return cloneElement(control, controlProps)
  }, [control, disabled])

  // Derive the onPress handler from the control's props so tapping the label
  // toggles the control.
  const handleLabelPress = useMemo(() => {
    if (disabled) return undefined
    if (!isValidElement(control)) return undefined

    const props = control.props as Record<string, unknown>
    // Support common callback patterns: onPress, onChange, onValueChange
    if (typeof props.onPress === 'function') return props.onPress as () => void
    if (typeof props.onChange === 'function') {
      // Toggle: if there's a "checked" prop, pass the opposite
      const checked = props.checked as boolean | undefined
      return () => (props.onChange as (v: boolean) => void)?.(!checked)
    }
    if (typeof props.onValueChange === 'function') {
      const checked = props.checked as boolean | undefined
      return () => (props.onValueChange as (v: boolean) => void)?.(!checked)
    }
    return undefined
  }, [control, disabled])

  const a11yLabel = accessibilityLabel ?? label

  return (
    <RNPressable
      onPress={handleLabelPress}
      disabled={disabled}
      accessibilityRole="none"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ disabled }}
    >
      <FormControlLabelFrame
        labelPlacement={labelPlacement}
        disabled={disabled || undefined}
      >
        {enhancedControl}
        <LabelText disabled={disabled || undefined}>
          {label}
        </LabelText>
      </FormControlLabelFrame>
    </RNPressable>
  )
})

FormControlLabel.displayName = 'FormControlLabel'
