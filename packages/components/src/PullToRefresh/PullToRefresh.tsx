import React, { useMemo } from 'react'
import { ScrollView, RefreshControl, View } from 'react-native'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PullToRefreshProps {
  /** Whether the refresh indicator is currently spinning. */
  refreshing: boolean
  /** Callback invoked when the user pulls to refresh. */
  onRefresh: () => void
  /** Content to display inside the scrollable area. */
  children: React.ReactNode
  /** Tint color of the refresh spinner. Defaults to the CDS primary color. */
  tintColor?: string
  /** Offset in pixels for the refresh indicator position (Android only). */
  progressViewOffset?: number
  /** Background color of the refresh indicator (Android only). */
  progressBackgroundColor?: string
  /** Accessibility label for the refresh control. */
  accessibilityLabel?: string
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_TINT_COLOR = '#4B3FFF' // CDS primary

// ---------------------------------------------------------------------------
// PullToRefresh component
//
// Wraps children in a ScrollView with the platform-native RefreshControl.
// This approach ensures the pull-to-refresh experience matches platform
// conventions on both iOS and Android, including the correct inertia,
// spinner position, and haptic feedback.
// ---------------------------------------------------------------------------

export const PullToRefresh = React.memo(function PullToRefresh({
  refreshing,
  onRefresh,
  children,
  tintColor = DEFAULT_TINT_COLOR,
  progressViewOffset = 0,
  progressBackgroundColor,
  accessibilityLabel,
}: PullToRefreshProps) {
  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={tintColor}
        colors={[tintColor]} // Android: array of colors for the spinner cycle
        progressViewOffset={progressViewOffset}
        progressBackgroundColor={progressBackgroundColor}
        accessibilityLabel={accessibilityLabel ?? 'Pull to refresh'}
        accessibilityRole="adjustable"
      />
    ),
    [
      refreshing,
      onRefresh,
      tintColor,
      progressViewOffset,
      progressBackgroundColor,
      accessibilityLabel,
    ],
  )

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={refreshControl}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
})

PullToRefresh.displayName = 'PullToRefresh'
