import React, { useMemo } from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Styled label text
// ---------------------------------------------------------------------------

const FormLabelText = styled(Text, {
  name: 'FormLabel',
  fontFamily: '$body',
  fontWeight: '$medium',
  fontSize: '$sm',
  lineHeight: '$sm',
  color: '$color',

  variants: {
    size: {
      sm: { fontSize: '$xs', lineHeight: '$xs' },
      md: { fontSize: '$sm', lineHeight: '$sm' },
      lg: { fontSize: '$md', lineHeight: '$md' },
    },
    error: {
      true: {
        color: '$errorColor',
      },
    },
    disabled: {
      true: {
        color: '$colorDisabled',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

const RequiredAsterisk = styled(Text, {
  name: 'FormLabelAsterisk',
  color: '$errorColor',
  fontSize: '$sm',
  fontWeight: '$medium',
  marginLeft: 2,
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FormLabelProps {
  /** Label text content. */
  label: string
  /** When true, displays a red asterisk after the label. */
  required?: boolean
  /** Applies error color styling to the label. */
  error?: boolean
  /** Applies disabled color styling to the label. */
  disabled?: boolean
  /** Forwarded to the underlying text for nativeID association. Not used on native. */
  htmlFor?: string
  /** Size preset. Defaults to "md". */
  size?: 'sm' | 'md' | 'lg'
  /** Accessibility label override. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// FormLabel component
// ---------------------------------------------------------------------------

export const FormLabel = React.memo(function FormLabel({
  label,
  required = false,
  error = false,
  disabled = false,
  htmlFor,
  size = 'md',
  accessibilityLabel,
}: FormLabelProps) {
  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return required ? `${label}, required` : label
  }, [accessibilityLabel, label, required])

  return (
    <HStack
      alignItems="center"
      marginBottom="$1"
      accessibilityRole="text"
      accessibilityLabel={a11yLabel}
    >
      <FormLabelText
        size={size}
        error={error || undefined}
        disabled={disabled || undefined}
        nativeID={htmlFor}
      >
        {label}
      </FormLabelText>
      {required && (
        <RequiredAsterisk
          accessibilityLabel="required"
          aria-hidden
        >
          *
        </RequiredAsterisk>
      )}
    </HStack>
  )
})

FormLabel.displayName = 'FormLabel'
