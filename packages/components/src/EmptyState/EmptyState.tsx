import React, { useCallback, useMemo } from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, VStack, HStack } from '@opengov/cds-primitives'
import { Pressable as RNPressable, View } from 'react-native'

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const EmptyStateFrame = styled(Stack, {
  name: 'EmptyState',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$6',
  paddingVertical: '$6',
  gap: '$4',

  variants: {
    compact: {
      true: {
        paddingHorizontal: '$4',
        paddingVertical: '$4',
        gap: '$3',
      },
      false: {
        flex: 1,
      },
    },
  } as const,

  defaultVariants: {
    compact: false,
  },
})

const ActionButton = styled(Stack, {
  name: 'EmptyStateAction',
  backgroundColor: '$brandBackground',
  borderRadius: '$md',
  paddingHorizontal: 16,
  paddingVertical: 8,
  minHeight: 40,
  alignItems: 'center',
  justifyContent: 'center',
})

const ActionButtonText = styled(Text, {
  name: 'EmptyStateActionText',
  color: 'white',
  fontWeight: '$medium',
  fontSize: '$sm',
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmptyStateProps {
  /** Icon or illustration element displayed above the title. */
  icon?: React.ReactNode
  /** Primary heading text. Required. */
  title: string
  /** Supporting description text below the title. */
  description?: string
  /** Optional action button with label and press handler. */
  action?: {
    label: string
    onPress: () => void
  }
  /** When true, uses reduced padding and sizing for inline placement. */
  compact?: boolean
  /** Accessibility label override for the entire empty state region. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// EmptyState component
// ---------------------------------------------------------------------------

export const EmptyState = React.memo(function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
  accessibilityLabel,
}: EmptyStateProps) {
  const handleAction = useCallback(() => {
    action?.onPress()
  }, [action])

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    const parts = [title]
    if (description) parts.push(description)
    if (action) parts.push(`Action: ${action.label}`)
    return parts.join('. ')
  }, [accessibilityLabel, title, description, action])

  return (
    <EmptyStateFrame
      compact={compact}
      accessibilityRole="summary"
      accessibilityLabel={a11yLabel}
    >
      {/* Illustration / icon slot */}
      {icon != null && (
        <Stack
          marginBottom="$2"
          opacity={0.6}
          alignItems="center"
          justifyContent="center"
        >
          {icon}
        </Stack>
      )}

      {/* Text content */}
      <VStack gap="$2" alignItems="center">
        <Text
          variant={compact ? 'h5' : 'h4'}
          textAlign="center"
          color="$color"
        >
          {title}
        </Text>
        {description != null && (
          <Text
            variant="body2"
            textAlign="center"
            color="$colorSecondary"
            maxWidth={320}
          >
            {description}
          </Text>
        )}
      </VStack>

      {/* Action button */}
      {action != null && (
        <RNPressable
          onPress={handleAction}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={{ marginTop: 8 }}
        >
          <ActionButton>
            <ActionButtonText>{action.label}</ActionButtonText>
          </ActionButton>
        </RNPressable>
      )}
    </EmptyStateFrame>
  )
})

EmptyState.displayName = 'EmptyState'
