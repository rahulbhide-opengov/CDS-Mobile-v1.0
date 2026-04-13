/**
 * Pagination -- CDS 37 page navigation control
 *
 * A row of page buttons with previous/next arrows, ellipsis for truncated
 * ranges, and active page highlighting.
 *
 * Features:
 *   - Three sizes: sm (32px), md (36px), lg (48px)
 *   - Configurable siblingCount for visible pages around current
 *   - Active page: blurple700 background, white text
 *   - Disabled arrows at first/last page (38% opacity)
 *   - Full accessibility: role annotations, disabled states
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo } from 'react'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'
import Svg, { Path } from 'react-native-svg'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** CDS 37: page button border radius */
const PAGE_RADIUS = 4

/** CDS 37: disabled state uses 38% opacity */
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38

/** Minimum touch target per WCAG / iOS HIG */
const MIN_TOUCH_TARGET = 44

/** Gap between page buttons */
const BUTTON_GAP = 4

// ---------------------------------------------------------------------------
// Size map -- matches Button sizes from CDS 37 Figma Semantic (Display) Mobile
// ---------------------------------------------------------------------------

const SIZE_MAP = {
  sm: { size: 32, iconSize: 16, fontSize: 14 as const, lineHeight: 20 },
  md: { size: 36, iconSize: 18, fontSize: 14 as const, lineHeight: 20 },
  lg: { size: 48, iconSize: 20, fontSize: 14 as const, lineHeight: 20 },
} as const

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PaginationSize = 'sm' | 'md' | 'lg'

export interface PaginationProps {
  /** The current active page (1-indexed). */
  currentPage: number
  /** Total number of pages. */
  totalPages: number
  /** Called when a page button is pressed. Receives the page number. */
  onPageChange: (page: number) => void
  /** Number of sibling pages to show around the current page. Defaults to 1. */
  siblingCount?: number
  /** Size preset. Defaults to "md". */
  size?: PaginationSize
  /** Whether the entire component is disabled. */
  disabled?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Arrow icons
// ---------------------------------------------------------------------------

function ChevronLeftIcon({ size = 18, color = primitive.slate700 }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
        fill={color}
      />
    </Svg>
  )
}

function ChevronRightIcon({ size = 18, color = primitive.slate700 }: { size?: number; color?: string }) {
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
// Page button styled frame
// ---------------------------------------------------------------------------

const PageButton = styled(Stack, {
  name: 'PageButton',
  tag: 'button',
  role: 'button',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: PAGE_RADIUS,
  cursor: 'pointer',
  minWidth: 0,
  minHeight: 0,

  hoverStyle: {
    backgroundColor: primitive.gray50,
  },

  pressStyle: {
    backgroundColor: primitive.gray100,
  },

  variants: {
    active: {
      true: {
        backgroundColor: primitive.blurple700,
        hoverStyle: {
          backgroundColor: primitive.blurple900,
        },
        pressStyle: {
          backgroundColor: primitive.blurple900,
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
})

// ---------------------------------------------------------------------------
// Page number text
// ---------------------------------------------------------------------------

const PageText = styled(TamaguiText, {
  name: 'PageText',
  fontFamily: '$body',
  fontSize: 14,
  fontWeight: '500',
  lineHeight: 20,
  color: primitive.slate700,
  userSelect: 'none',

  variants: {
    active: {
      true: {
        color: primitive.white,
      },
    },

    ellipsis: {
      true: {
        color: primitive.gray500,
        cursor: 'default',
      },
    },
  } as const,
})

// ---------------------------------------------------------------------------
// Range computation -- generates the array of page numbers and ellipsis
// ---------------------------------------------------------------------------

type PageItem = number | 'ellipsis-start' | 'ellipsis-end'

function computePageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PageItem[] {
  // Total number of visible slots: first + last + current + 2*siblings + 2 ellipses
  const totalSlots = siblingCount * 2 + 5

  // If total pages fit within the slot count, show all pages
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    // Show full left side, ellipsis on right
    const leftRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => i + 1,
    )
    return [...leftRange, 'ellipsis-end', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Ellipsis on left, full right side
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1,
    )
    return [1, 'ellipsis-start', ...rightRange]
  }

  // Ellipsis on both sides
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  )
  return [1, 'ellipsis-start', ...middleRange, 'ellipsis-end', totalPages]
}

// ---------------------------------------------------------------------------
// Pagination component
// ---------------------------------------------------------------------------

export const Pagination = React.memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  disabled = false,
  accessibilityLabel,
  testID,
}: PaginationProps) {
  const sizeConfig = SIZE_MAP[size]
  const buttonDimension = sizeConfig.size

  // Compute the visible page items
  const pageItems = useMemo(
    () => computePageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount],
  )

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }, [currentPage, onPageChange])

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }, [currentPage, totalPages, onPageChange])

  const handlePagePress = useCallback(
    (page: number) => {
      if (page !== currentPage) {
        onPageChange(page)
      }
    },
    [currentPage, onPageChange],
  )

  // hitSlop pads small buttons to 44pt WCAG minimum touch target
  const hitSlop = useMemo(() => {
    if (buttonDimension >= MIN_TOUCH_TARGET) return undefined
    const pad = Math.ceil((MIN_TOUCH_TARGET - buttonDimension) / 2)
    return { top: pad, bottom: pad, left: 0, right: 0 }
  }, [buttonDimension])

  const isFirstPage = currentPage <= 1
  const isLastPage = currentPage >= totalPages

  const a11yLabel = accessibilityLabel ?? `Page ${currentPage} of ${totalPages}`

  if (totalPages <= 0) {
    return null
  }

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={BUTTON_GAP}
      accessibilityRole="tablist"
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      {/* Previous button */}
      <PageButton
        width={buttonDimension}
        height={buttonDimension}
        disabled={isFirstPage || disabled || undefined}
        onPress={handlePrevious}
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled: isFirstPage || disabled }}
        testID={testID ? `${testID}-prev` : undefined}
      >
        <ChevronLeftIcon
          size={sizeConfig.iconSize}
          color={isFirstPage || disabled ? primitive.gray400 : primitive.slate700}
        />
      </PageButton>

      {/* Page buttons */}
      {pageItems.map((item, index) => {
        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
          return (
            <Stack
              key={`ellipsis-${item}`}
              width={buttonDimension}
              height={buttonDimension}
              alignItems="center"
              justifyContent="center"
            >
              <PageText ellipsis accessibilityLabel="More pages">
                ...
              </PageText>
            </Stack>
          )
        }

        const isActive = item === currentPage

        return (
          <PageButton
            key={item}
            width={buttonDimension}
            height={buttonDimension}
            active={isActive || undefined}
            disabled={disabled || undefined}
            onPress={() => handlePagePress(item)}
            hitSlop={hitSlop}
            accessibilityRole="tab"
            accessibilityLabel={`Page ${item}`}
            accessibilityState={{
              selected: isActive,
              disabled,
            }}
            testID={testID ? `${testID}-page-${item}` : undefined}
          >
            <PageText active={isActive || undefined}>{String(item)}</PageText>
          </PageButton>
        )
      })}

      {/* Next button */}
      <PageButton
        width={buttonDimension}
        height={buttonDimension}
        disabled={isLastPage || disabled || undefined}
        onPress={handleNext}
        hitSlop={hitSlop}
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled: isLastPage || disabled }}
        testID={testID ? `${testID}-next` : undefined}
      >
        <ChevronRightIcon
          size={sizeConfig.iconSize}
          color={isLastPage || disabled ? primitive.gray400 : primitive.slate700}
        />
      </PageButton>
    </Stack>
  )
})

Pagination.displayName = 'Pagination'
