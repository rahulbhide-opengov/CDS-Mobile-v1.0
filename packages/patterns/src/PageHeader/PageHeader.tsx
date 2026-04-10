import React from 'react'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const PageHeaderFrame = styled(Stack, {
  name: 'PageHeader',
  backgroundColor: colors.white,
  paddingHorizontal: '$4',
  gap: '$2',

  variants: {
    variant: {
      standard: {
        paddingVertical: '$4',
      },
      prominent: {
        paddingVertical: '$6',
      },
      compact: {
        paddingVertical: '$2',
        gap: '$1',
      },
    },
    bordered: {
      true: {
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral200,
      },
    },
  } as const,

  defaultVariants: {
    variant: 'standard',
    bordered: true,
  },
})

// ---------------------------------------------------------------------------
// Title variant mapping
// ---------------------------------------------------------------------------

type PageHeaderVariant = 'standard' | 'prominent' | 'compact'

const TITLE_VARIANT_MAP: Record<PageHeaderVariant, 'h1' | 'h2' | 'h3' | 'h4'> = {
  prominent: 'h1',
  standard: 'h3',
  compact: 'h4',
}

const SUBTITLE_VARIANT_MAP: Record<PageHeaderVariant, 'body2' | 'body3' | 'caption'> = {
  prominent: 'body2',
  standard: 'body3',
  compact: 'caption',
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PageHeaderProps {
  /** Page title (required) */
  title: string
  /** Description or subtitle text below the title */
  subtitle?: string
  /** Breadcrumbs slot rendered above the title */
  breadcrumbs?: React.ReactNode
  /** Actions slot rendered right-aligned (standard/compact) or below (prominent) */
  actions?: React.ReactNode
  /** Visual size variant */
  variant?: PageHeaderVariant
  /** Whether to show a bottom border */
  bordered?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `PageHeader` -- mobile page header pattern for CDS screens.
 *
 * Provides a responsive header with title, optional subtitle, breadcrumbs
 * slot (above title), and actions slot. Three variants control sizing:
 * - `prominent`: Large h1 title, more vertical padding, actions below.
 * - `standard`: Default h3 title, standard padding, actions right-aligned.
 * - `compact`: Smaller h4 title, tight padding, actions right-aligned.
 *
 * The `bordered` prop adds a bottom separator (default: true).
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  variant = 'standard',
  bordered = true,
}: PageHeaderProps) {
  const titleVariant = TITLE_VARIANT_MAP[variant]
  const subtitleVariant = SUBTITLE_VARIANT_MAP[variant]

  // For prominent variant, actions go below the title instead of inline
  const isProminent = variant === 'prominent'

  return (
    <PageHeaderFrame
      variant={variant}
      bordered={bordered}
      accessibilityRole="header"
    >
      {/* Breadcrumbs */}
      {breadcrumbs != null && (
        <Stack marginBottom="$1">
          {breadcrumbs}
        </Stack>
      )}

      {/* Title row with inline actions (standard/compact) */}
      {!isProminent ? (
        <HStack justifyContent="space-between" alignItems="center" gap="$3">
          <VStack flex={1} gap="$0.5" minWidth={0}>
            <Text
              variant={titleVariant}
              numberOfLines={2}
              color={colors.neutral900}
            >
              {title}
            </Text>
            {subtitle != null && (
              <Text
                variant={subtitleVariant}
                color={colors.neutral500}
                numberOfLines={3}
              >
                {subtitle}
              </Text>
            )}
          </VStack>

          {actions != null && (
            <HStack gap="$2" alignItems="center" flexShrink={0}>
              {actions}
            </HStack>
          )}
        </HStack>
      ) : (
        /* Prominent: title/subtitle stacked, actions below */
        <VStack gap="$3">
          <VStack gap="$1">
            <Text
              variant={titleVariant}
              color={colors.neutral900}
              numberOfLines={3}
            >
              {title}
            </Text>
            {subtitle != null && (
              <Text
                variant={subtitleVariant}
                color={colors.neutral500}
                numberOfLines={4}
              >
                {subtitle}
              </Text>
            )}
          </VStack>

          {actions != null && (
            <HStack gap="$2" alignItems="center">
              {actions}
            </HStack>
          )}
        </VStack>
      )}
    </PageHeaderFrame>
  )
}
