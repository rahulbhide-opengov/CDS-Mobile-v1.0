import React, { useMemo } from 'react'
import { styled, Stack, Text as TamaguiText, type GetProps } from '@tamagui/core'
import { Pressable, Text, HStack } from '@opengov/cds-primitives'
import Svg, { Path } from 'react-native-svg'

// ---------------------------------------------------------------------------
// BreadcrumbsFrame
// ---------------------------------------------------------------------------

const BreadcrumbsFrame = styled(HStack, {
  name: 'Breadcrumbs',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: 4,
  paddingVertical: 8,
  paddingHorizontal: 16,
})

// ---------------------------------------------------------------------------
// Breadcrumb link (tappable item)
// ---------------------------------------------------------------------------

const BreadcrumbLink = styled(Pressable, {
  name: 'BreadcrumbLink',
  hitSlop: { top: 8, bottom: 8, left: 4, right: 4 },
  minHeight: 32,
  justifyContent: 'center',

  pressStyle: {
    opacity: 0.6,
  },
})

// ---------------------------------------------------------------------------
// Text styles
// ---------------------------------------------------------------------------

const BreadcrumbLinkText = styled(TamaguiText, {
  name: 'BreadcrumbLinkText',
  fontFamily: '$body',
  fontWeight: '$regular',
  fontSize: 14,
  lineHeight: 20,
  color: '$brandBackground',
  numberOfLines: 1,
})

const BreadcrumbCurrentText = styled(TamaguiText, {
  name: 'BreadcrumbCurrentText',
  fontFamily: '$body',
  fontWeight: '$semibold',
  fontSize: 14,
  lineHeight: 20,
  color: '$color',
  numberOfLines: 1,
})

const BreadcrumbEllipsis = styled(TamaguiText, {
  name: 'BreadcrumbEllipsis',
  fontFamily: '$body',
  fontWeight: '$regular',
  fontSize: 14,
  lineHeight: 20,
  color: '$colorSecondary',
})

// ---------------------------------------------------------------------------
// Default chevron separator icon
// ---------------------------------------------------------------------------

function ChevronRight({ size = 16, color = '#9E9E9E' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
        fill={color}
      />
    </Svg>
  )
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  /** Display label for this breadcrumb level. */
  label: string
  /** Press handler. When provided, the item renders as a tappable link. */
  onPress?: () => void
}

export interface BreadcrumbsProps {
  /** Ordered list of breadcrumb items from root to current. */
  items: BreadcrumbItem[]
  /** Custom separator element. Defaults to a chevron-right icon. */
  separator?: React.ReactNode
  /** Maximum number of visible items before truncation. Defaults to 3. */
  maxItems?: number
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Optional test ID. */
  testID?: string
}

/**
 * `Breadcrumbs` -- simplified mobile breadcrumb navigation from CDS 37.
 *
 * Displays a horizontal trail of navigation items with separator icons.
 * Optimized for mobile with a maximum of 2-3 visible levels. When items
 * exceed `maxItems`, intermediate items are collapsed into an ellipsis.
 * The last item is always rendered as the current (non-tappable, bold) item.
 */
export function Breadcrumbs({
  items,
  separator,
  maxItems = 3,
  accessibilityLabel,
  testID,
}: BreadcrumbsProps) {
  // Build the display items, collapsing the middle when exceeding maxItems
  const displayItems = useMemo(() => {
    if (items.length <= maxItems) {
      return items.map((item, i) => ({
        ...item,
        type: i === items.length - 1 ? 'current' as const : 'link' as const,
      }))
    }

    // Show first item, ellipsis, and the last (maxItems - 1) items
    const tailCount = Math.max(maxItems - 1, 1)
    const firstItem = { ...items[0], type: 'link' as const }
    const ellipsisItem = { label: '...', type: 'ellipsis' as const }
    const tailItems = items.slice(-tailCount).map((item, i, arr) => ({
      ...item,
      type: i === arr.length - 1 ? 'current' as const : 'link' as const,
    }))

    return [firstItem, ellipsisItem, ...tailItems]
  }, [items, maxItems])

  const resolvedA11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    return `Breadcrumb navigation, ${items.length} levels, current: ${items[items.length - 1]?.label ?? ''}`
  }, [accessibilityLabel, items])

  const separatorElement = separator ?? <ChevronRight />

  if (items.length === 0) {
    return null
  }

  return (
    <BreadcrumbsFrame
      accessibilityRole="menu"
      accessibilityLabel={resolvedA11yLabel}
      testID={testID}
    >
      {displayItems.map((item, index) => (
        <React.Fragment key={index}>
          {/* Separator between items */}
          {index > 0 && (
            <Stack accessibilityElementsHidden importantForAccessibility="no">
              {separatorElement}
            </Stack>
          )}

          {/* Breadcrumb item */}
          {item.type === 'current' ? (
            <BreadcrumbCurrentText
              accessibilityRole="text"
              accessibilityLabel={`Current page: ${item.label}`}
            >
              {item.label}
            </BreadcrumbCurrentText>
          ) : item.type === 'ellipsis' ? (
            <BreadcrumbEllipsis
              accessibilityLabel={`${items.length - maxItems} collapsed levels`}
            >
              {item.label}
            </BreadcrumbEllipsis>
          ) : item.onPress ? (
            <BreadcrumbLink
              onPress={item.onPress}
              accessibilityRole="link"
              accessibilityLabel={item.label}
            >
              <BreadcrumbLinkText>{item.label}</BreadcrumbLinkText>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLinkText
              color="$colorSecondary"
              accessibilityLabel={item.label}
            >
              {item.label}
            </BreadcrumbLinkText>
          )}
        </React.Fragment>
      ))}
    </BreadcrumbsFrame>
  )
}
