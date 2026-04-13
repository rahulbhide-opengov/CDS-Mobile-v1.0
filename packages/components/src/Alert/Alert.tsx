/**
 * Alert -- CDS 37 Figma-accurate implementation
 *
 * Feedback banner with icon, title, description, close button, and
 * optional action.
 *
 * 4 severities: success, error, warning, info
 * 3 variants: standard, filled, outlined
 * Disabled: 38% opacity on the entire component (Figma opacity: 0.38)
 *
 * Standard variant: colored left border (4px), light bg, dark text
 * Filled variant: solid color bg, white text
 * Outlined variant: white bg, 1px colored border
 *
 * All colors reference `primitive` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'
import { Text as TamaguiText } from '@tamagui/core'
import { Svg, Path } from 'react-native-svg'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ALERT_RADIUS = 4
const CLOSE_ICON_SIZE = 20
const DEFAULT_ICON_SIZE = 22
const MIN_TOUCH_TARGET = 44

// ---------------------------------------------------------------------------
// Severity icon paths (Material Design icons, viewBox 0 0 24 24)
// ---------------------------------------------------------------------------

const ICON_PATHS = {
  success:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  error:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
  warning:
    'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
} as const

/** Close (X) icon path */
const CLOSE_PATH =
  'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'

// ---------------------------------------------------------------------------
// Color maps per severity
// ---------------------------------------------------------------------------

interface SeverityColors {
  /** Left border / accent color for standard variant */
  border: string
  /** Light background for standard variant */
  bgLight: string
  /** Solid background for filled variant */
  bgFilled: string
  /** Text color for standard + outlined variants */
  text: string
  /** Icon color for standard + outlined variants */
  icon: string
}

const SEVERITY_COLORS: Record<string, SeverityColors> = {
  success: {
    border: primitive.green700,
    bgLight: primitive.green50,
    bgFilled: primitive.green700,
    text: primitive.green700,
    icon: primitive.green700,
  },
  error: {
    border: primitive.red600,
    bgLight: primitive.red50,
    bgFilled: primitive.red600,
    text: primitive.red700,
    icon: primitive.red600,
  },
  warning: {
    border: primitive.yellow700,
    bgLight: primitive.orange50,
    bgFilled: primitive.yellow700,
    text: primitive.yellow700,
    icon: primitive.yellow700,
  },
  info: {
    border: primitive.cerulean700,
    bgLight: primitive.cerulean50,
    bgFilled: primitive.cerulean700,
    text: primitive.cerulean700,
    icon: primitive.cerulean700,
  },
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AlertSeverity = 'success' | 'error' | 'warning' | 'info'
export type AlertVariant = 'standard' | 'filled' | 'outlined'

export interface AlertAction {
  /** Label text for the action button. */
  label: string
  /** Press handler for the action. */
  onPress: () => void
}

export interface AlertProps {
  /** Severity determines icon and color scheme. Defaults to "info". */
  severity?: AlertSeverity
  /** Visual variant. Defaults to "standard". */
  variant?: AlertVariant
  /** Bold title line. Optional. */
  title?: string
  /** Description text below the title. */
  description?: string
  /** Whether the alert can be dismissed via close button. */
  closable?: boolean
  /** Called when the close button is pressed. */
  onClose?: () => void
  /** Custom icon element. Overrides the default severity icon. */
  icon?: React.ReactNode
  /** Optional action button rendered below the description. */
  action?: AlertAction
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Additional test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Default severity icon
// ---------------------------------------------------------------------------

function DefaultIcon({
  severity,
  color,
}: {
  severity: AlertSeverity
  color: string
}) {
  return (
    <Svg width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} viewBox="0 0 24 24">
      <Path d={ICON_PATHS[severity]} fill={color} />
    </Svg>
  )
}

// ---------------------------------------------------------------------------
// Close button
// ---------------------------------------------------------------------------

function CloseButton({
  onPress,
  color,
  testID,
}: {
  onPress: () => void
  color: string
  testID?: string
}) {
  const hitSlop = Math.ceil((MIN_TOUCH_TARGET - CLOSE_ICON_SIZE) / 2)

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      style={styles.closeButton}
      accessibilityRole="button"
      accessibilityLabel="Close alert"
      testID={testID ? `${testID}-close` : undefined}
    >
      <Svg width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} viewBox="0 0 24 24">
        <Path d={CLOSE_PATH} fill={color} />
      </Svg>
    </Pressable>
  )
}

// ---------------------------------------------------------------------------
// Alert component
// ---------------------------------------------------------------------------

export const Alert = React.memo(function Alert({
  severity = 'info',
  variant = 'standard',
  title,
  description,
  closable = false,
  onClose,
  icon,
  action,
  accessibilityLabel,
  testID,
}: AlertProps) {
  const colors = SEVERITY_COLORS[severity]

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  // Compute container styles based on variant
  const containerStyle = useMemo(() => {
    const base = {
      borderRadius: ALERT_RADIUS,
      flexDirection: 'row' as const,
      padding: 12,
      gap: 12,
    }

    switch (variant) {
      case 'standard':
        return {
          ...base,
          backgroundColor: colors.bgLight,
          borderLeftWidth: 4,
          borderLeftColor: colors.border,
        }
      case 'filled':
        return {
          ...base,
          backgroundColor: colors.bgFilled,
        }
      case 'outlined':
        return {
          ...base,
          backgroundColor: primitive.white,
          borderWidth: 1,
          borderColor: colors.border,
        }
      default:
        return base
    }
  }, [variant, colors])

  // Text and icon colors depend on variant
  const textColor = variant === 'filled' ? primitive.white : colors.text
  const iconColor = variant === 'filled' ? primitive.white : colors.icon
  const closeColor =
    variant === 'filled' ? primitive.white : primitive.slate700

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    const parts: string[] = [`${severity} alert`]
    if (title) parts.push(title)
    if (description) parts.push(description)
    return parts.join(': ')
  }, [accessibilityLabel, severity, title, description])

  return (
    <View
      style={containerStyle}
      accessibilityRole="alert"
      accessibilityLabel={a11yLabel}
      accessibilityState={{
        expanded: undefined,
      }}
      testID={testID}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        {icon ?? <DefaultIcon severity={severity} color={iconColor} />}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {title ? (
          <TamaguiText
            fontFamily="$body"
            fontSize={13}
            fontWeight="700"
            lineHeight={18}
            color={textColor}
            testID={testID ? `${testID}-title` : undefined}
          >
            {title}
          </TamaguiText>
        ) : null}

        {description ? (
          <TamaguiText
            fontFamily="$body"
            fontSize={14}
            fontWeight="500"
            lineHeight={20}
            color={textColor}
            marginTop={title ? 2 : 0}
            testID={testID ? `${testID}-description` : undefined}
          >
            {description}
          </TamaguiText>
        ) : null}

        {action ? (
          <Pressable
            onPress={action.onPress}
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            testID={testID ? `${testID}-action` : undefined}
          >
            <TamaguiText
              fontFamily="$body"
              fontSize={13}
              fontWeight="700"
              lineHeight={18}
              color={textColor}
              textDecorationLine="underline"
            >
              {action.label}
            </TamaguiText>
          </Pressable>
        ) : null}
      </View>

      {/* Close button */}
      {closable && onClose ? (
        <CloseButton onPress={handleClose} color={closeColor} testID={testID} />
      ) : null}
    </View>
  )
})

Alert.displayName = 'Alert'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: 1,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    flexShrink: 1,
  },
  closeButton: {
    flexShrink: 0,
    alignSelf: 'flex-start',
  },
  actionButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
})
