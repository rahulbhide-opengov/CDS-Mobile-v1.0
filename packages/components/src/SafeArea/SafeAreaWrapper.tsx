import React, { useMemo } from 'react'
import { Platform } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'

// ---------------------------------------------------------------------------
// Default safe area inset fallbacks
// ---------------------------------------------------------------------------

/**
 * Provides default safe area inset values when `react-native-safe-area-context`
 * is not available. These are reasonable fallback values for common devices.
 *
 * For precise values, install and wrap your app with:
 * `import { SafeAreaProvider } from 'react-native-safe-area-context'`
 */
const DEFAULT_INSETS = Platform.select({
  ios: {
    top: 44,    // notch / dynamic island
    bottom: 34, // home indicator
    left: 0,
    right: 0,
  },
  android: {
    top: 24,    // status bar
    bottom: 0,
    left: 0,
    right: 0,
  },
  default: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}) as { top: number; bottom: number; left: number; right: number }

// ---------------------------------------------------------------------------
// Attempt to import useSafeAreaInsets at runtime
// ---------------------------------------------------------------------------

type Insets = { top: number; bottom: number; left: number; right: number }

/**
 * Tries to use the native safe area insets hook. Falls back to platform defaults
 * if the library is not installed.
 */
function useSafeInsets(): Insets {
  try {
    // Dynamic require so this module does not hard-fail when the dependency
    // is absent from the bundle.
    const safeAreaContext = require('react-native-safe-area-context')
    if (safeAreaContext && typeof safeAreaContext.useSafeAreaInsets === 'function') {
      // The hook must be called unconditionally per rules of hooks, but since
      // this entire function is a hook wrapper, it is safe here.
      return safeAreaContext.useSafeAreaInsets()
    }
  } catch {
    // Library not installed -- fall through to defaults
  }

  return DEFAULT_INSETS
}

// ---------------------------------------------------------------------------
// SafeAreaFrame -- base container
// ---------------------------------------------------------------------------

const SafeAreaFrame = styled(Stack, {
  name: 'SafeAreaWrapper',
  flex: 1,
})

// ---------------------------------------------------------------------------
// Edge type
// ---------------------------------------------------------------------------

type SafeAreaEdge = 'top' | 'bottom' | 'left' | 'right'

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface SafeAreaWrapperProps {
  /** Which edges to apply safe area insets for. Defaults to all edges. */
  edges?: SafeAreaEdge[]
  /** Whether to apply insets as padding (default) or margin. */
  mode?: 'padding' | 'margin'
  /** Child content. */
  children: React.ReactNode
  /** Additional background color. */
  backgroundColor?: string
  /** Optional test ID. */
  testID?: string
}

/**
 * `SafeAreaWrapper` -- safe area utility component from CDS 37.
 *
 * Wraps children with appropriate padding or margin to avoid device-specific
 * safe areas (notch, home indicator, status bar). Supports selective edge
 * configuration and both padding and margin application modes.
 *
 * When `react-native-safe-area-context` is installed and the app is wrapped
 * in `<SafeAreaProvider>`, this component uses the precise device insets.
 * Otherwise, it falls back to reasonable platform defaults (iOS: 44 top /
 * 34 bottom; Android: 24 top).
 *
 * Usage:
 * ```tsx
 * // Protect all edges
 * <SafeAreaWrapper>
 *   <MyScreen />
 * </SafeAreaWrapper>
 *
 * // Protect only top and bottom
 * <SafeAreaWrapper edges={['top', 'bottom']}>
 *   <MyScreen />
 * </SafeAreaWrapper>
 *
 * // Use margin instead of padding
 * <SafeAreaWrapper mode="margin" edges={['top']}>
 *   <MyScreen />
 * </SafeAreaWrapper>
 * ```
 */
export function SafeAreaWrapper({
  edges,
  mode = 'padding',
  children,
  backgroundColor,
  testID,
}: SafeAreaWrapperProps) {
  const insets = useSafeInsets()

  // Determine which edges to apply
  const activeEdges = useMemo<Set<SafeAreaEdge>>(() => {
    if (!edges || edges.length === 0) {
      // Default: all edges
      return new Set<SafeAreaEdge>(['top', 'bottom', 'left', 'right'])
    }
    return new Set<SafeAreaEdge>(edges)
  }, [edges])

  // Compute the style values for the requested edges
  const insetStyles = useMemo(() => {
    const top = activeEdges.has('top') ? insets.top : 0
    const bottom = activeEdges.has('bottom') ? insets.bottom : 0
    const left = activeEdges.has('left') ? insets.left : 0
    const right = activeEdges.has('right') ? insets.right : 0

    if (mode === 'margin') {
      return {
        marginTop: top,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
      }
    }

    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    }
  }, [activeEdges, insets, mode])

  return (
    <SafeAreaFrame
      testID={testID}
      {...insetStyles}
      {...(backgroundColor ? { backgroundColor } : {})}
    >
      {children}
    </SafeAreaFrame>
  )
}
