/**
 * LabelValuePair -- CDS 37 Figma-accurate implementation
 *
 * Displays a label-value pair in either horizontal (side-by-side) or stacked
 * (top-to-bottom) layout. Supports three size presets and an optional copy
 * action on the value.
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 * Typography uses `baseStyles` from @opengov/cds-tokens (mobile column).
 */

import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text as TamaguiText, styled } from '@tamagui/core'
import { Pressable } from '@opengov/cds-primitives'
import { primitive, baseStyles } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Gap between label and value in stacked layout */
const GAP_STACKED = 8

/** Gap between label and value in horizontal layout */
const GAP_HORIZONTAL = 16

/** Label width ratio in horizontal layout */
const LABEL_WIDTH_RATIO = 0.4

/** Value width ratio in horizontal layout */
const VALUE_WIDTH_RATIO = 0.6

/** Copy icon touch target */
const COPY_ICON_SIZE = 16

/** Semantic text colors */
const TEXT_PRIMARY = 'rgba(0,0,0,0.87)'
const TEXT_SECONDARY = 'rgba(0,0,0,0.6)'

// ---------------------------------------------------------------------------
// Typography config per size
// ---------------------------------------------------------------------------

interface TypographyConfig {
  label: {
    fontSize: number
    fontWeight: string
    lineHeight: number
    letterSpacing: number
  }
  value: {
    fontSize: number
    fontWeight: string
    lineHeight: number
    letterSpacing: number
  }
}

const TYPOGRAPHY: Record<'sm' | 'md' | 'lg', TypographyConfig> = {
  sm: {
    label: {
      fontSize: baseStyles.body3.mobile.fontSize,     // 13
      fontWeight: '400',
      lineHeight: baseStyles.body3.mobile.lineHeight,  // 16
      letterSpacing: baseStyles.body3.mobile.letterSpacing,
    },
    value: {
      fontSize: baseStyles.body3.mobile.fontSize,     // 13
      fontWeight: '400',
      lineHeight: baseStyles.body3.mobile.lineHeight,  // 16
      letterSpacing: baseStyles.body3.mobile.letterSpacing,
    },
  },
  md: {
    label: {
      fontSize: baseStyles.body3.mobile.fontSize,     // 13
      fontWeight: '400',
      lineHeight: baseStyles.body3.mobile.lineHeight,  // 16
      letterSpacing: baseStyles.body3.mobile.letterSpacing,
    },
    value: {
      fontSize: baseStyles.body2.mobile.fontSize,     // 14
      fontWeight: '500',
      lineHeight: baseStyles.body2.mobile.lineHeight,  // 18
      letterSpacing: baseStyles.body2.mobile.letterSpacing,
    },
  },
  lg: {
    label: {
      fontSize: baseStyles.body2.mobile.fontSize,     // 14
      fontWeight: '400',
      lineHeight: baseStyles.body2.mobile.lineHeight,  // 18
      letterSpacing: baseStyles.body2.mobile.letterSpacing,
    },
    value: {
      fontSize: baseStyles.body1.mobile.fontSize,     // 16
      fontWeight: '500',
      lineHeight: baseStyles.body1.mobile.lineHeight,  // 20
      letterSpacing: baseStyles.body1.mobile.letterSpacing,
    },
  },
}

// ---------------------------------------------------------------------------
// CopyIcon -- minimal inline SVG-like copy indicator
// (Consumers should provide a proper icon via their icon library)
// ---------------------------------------------------------------------------

function CopyIcon({ color }: { color: string }) {
  return (
    <View style={styles.copyIconContainer}>
      {/* Placeholder visual -- two overlapping squares */}
      <View
        style={[
          styles.copyIconBack,
          { borderColor: color },
        ]}
      />
      <View
        style={[
          styles.copyIconFront,
          { borderColor: color, backgroundColor: primitive.white },
        ]}
      />
    </View>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LabelValuePairProps {
  /** Label text (typically the field name). */
  label: string
  /** Value text (the data). Can be a string or React node for rich content. */
  value: React.ReactNode
  /** Layout variant. Defaults to "stacked". */
  variant?: 'horizontal' | 'stacked'
  /** Size preset affecting typography. Defaults to "md". */
  size?: 'sm' | 'md' | 'lg'
  /** Shows a copy icon next to the value. Fires onCopy when pressed. */
  copyable?: boolean
  /** Callback when the copy icon is pressed. */
  onCopy?: () => void
  /** Override the label text color. */
  labelColor?: string
  /** Override the value text color. */
  valueColor?: string
  /** Accessibility label override for screen readers. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// LabelValuePair component
// ---------------------------------------------------------------------------

/**
 * `LabelValuePair` -- displays a label and value in horizontal or stacked layout.
 *
 * Useful for detail views, data summaries, and form read-only fields.
 * Follows CDS 37 typography with three size presets (sm, md, lg) and
 * supports an optional copy action on the value.
 */
export const LabelValuePair = React.memo(function LabelValuePair({
  label,
  value,
  variant = 'stacked',
  size = 'md',
  copyable = false,
  onCopy,
  labelColor,
  valueColor,
  accessibilityLabel,
  testID,
}: LabelValuePairProps) {
  const typo = TYPOGRAPHY[size]

  const handleCopy = useCallback(() => {
    if (onCopy) {
      onCopy()
    }
  }, [onCopy])

  const a11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel
    const valueStr = typeof value === 'string' ? value : ''
    return `${label}: ${valueStr}`
  }, [accessibilityLabel, label, value])

  const resolvedLabelColor = labelColor ?? TEXT_SECONDARY
  const resolvedValueColor = valueColor ?? TEXT_PRIMARY

  const isHorizontal = variant === 'horizontal'

  // ---- Render label --------------------------------------------------------

  const labelElement = (
    <TamaguiText
      fontFamily="$body"
      fontSize={typo.label.fontSize}
      fontWeight={typo.label.fontWeight as any}
      lineHeight={typo.label.lineHeight}
      letterSpacing={typo.label.letterSpacing}
      color={resolvedLabelColor}
      numberOfLines={isHorizontal ? 2 : undefined}
      style={isHorizontal ? { width: `${LABEL_WIDTH_RATIO * 100}%` as any } : undefined}
    >
      {label}
    </TamaguiText>
  )

  // ---- Render value + optional copy icon -----------------------------------

  const valueElement = (
    <View
      style={[
        styles.valueRow,
        isHorizontal ? { width: `${VALUE_WIDTH_RATIO * 100}%` as any } : undefined,
      ]}
    >
      {typeof value === 'string' ? (
        <TamaguiText
          fontFamily="$body"
          fontSize={typo.value.fontSize}
          fontWeight={typo.value.fontWeight as any}
          lineHeight={typo.value.lineHeight}
          letterSpacing={typo.value.letterSpacing}
          color={resolvedValueColor}
          flexShrink={1}
        >
          {value}
        </TamaguiText>
      ) : (
        <View style={styles.valueContent}>{value}</View>
      )}

      {copyable && (
        <Pressable
          onPress={handleCopy}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={`Copy ${label}`}
          accessibilityHint="Copies the value to clipboard"
          minWidth={0}
          minHeight={0}
          style={styles.copyButton}
        >
          <CopyIcon color={resolvedValueColor} />
        </Pressable>
      )}
    </View>
  )

  // ---- Layout --------------------------------------------------------------

  return (
    <View
      style={[
        isHorizontal ? styles.horizontal : styles.stacked,
      ]}
      accessible
      accessibilityRole="text"
      accessibilityLabel={a11yLabel}
      testID={testID}
    >
      {labelElement}
      {valueElement}
    </View>
  )
})

LabelValuePair.displayName = 'LabelValuePair'

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  stacked: {
    flexDirection: 'column',
    gap: GAP_STACKED,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: GAP_HORIZONTAL,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  valueContent: {
    flexShrink: 1,
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  copyIconContainer: {
    width: COPY_ICON_SIZE,
    height: COPY_ICON_SIZE,
    position: 'relative',
  },
  copyIconBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderRadius: 1,
  },
  copyIconFront: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderWidth: 1.5,
    borderRadius: 1,
  },
})
