/**
 * useHaptics — CDS haptic feedback hook
 *
 * Wraps expo-haptics with graceful fallback. If expo-haptics is not installed
 * or not available (web, simulator without haptic engine), all calls are no-ops.
 *
 * Usage:
 *   const haptics = useHaptics()
 *   haptics.impact('light')       // button press
 *   haptics.impact('medium')      // toggle, switch
 *   haptics.impact('heavy')       // destructive action confirm
 *   haptics.notification('success') // success snackbar
 *   haptics.notification('warning') // warning action
 *   haptics.notification('error')   // error feedback
 *   haptics.selection()           // slider step, picker change
 */
import { useCallback, useMemo } from 'react'

// Dynamic import to handle cases where expo-haptics isn't installed
let Haptics: any = null
try {
  Haptics = require('expo-haptics')
} catch {
  // expo-haptics not available — all haptic calls will be no-ops
}

type ImpactStyle = 'light' | 'medium' | 'heavy'
type NotificationType = 'success' | 'warning' | 'error'

const IMPACT_MAP: Record<ImpactStyle, string> = {
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
}

const NOTIFICATION_MAP: Record<NotificationType, string> = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
}

export function useHaptics() {
  const impact = useCallback((style: ImpactStyle = 'light') => {
    if (!Haptics) return
    try {
      const feedbackStyle = (Haptics as any).ImpactFeedbackStyle?.[IMPACT_MAP[style]]
      if (feedbackStyle != null) {
        ;(Haptics as any).impactAsync(feedbackStyle)
      }
    } catch {
      // Silently fail on unsupported platforms
    }
  }, [])

  const notification = useCallback((type: NotificationType = 'success') => {
    if (!Haptics) return
    try {
      const feedbackType = (Haptics as any).NotificationFeedbackType?.[NOTIFICATION_MAP[type]]
      if (feedbackType != null) {
        ;(Haptics as any).notificationAsync(feedbackType)
      }
    } catch {
      // Silently fail
    }
  }, [])

  const selection = useCallback(() => {
    if (!Haptics) return
    try {
      ;(Haptics as any).selectionAsync()
    } catch {
      // Silently fail
    }
  }, [])

  return useMemo(() => ({ impact, notification, selection }), [impact, notification, selection])
}

export type HapticsAPI = ReturnType<typeof useHaptics>
