/**
 * DateTimePicker -- CDS 37 Figma-accurate implementation
 *
 * Pure React Native date/time picker with:
 *   - TextField-style trigger showing formatted date/time + calendar icon
 *   - Modal calendar grid (7 columns, 6 rows) for date selection
 *   - Hour/minute wheel-style inputs for time selection
 *   - Modes: 'date', 'time', 'datetime'
 *
 * Sizes follow Figma Input mobile sizes:
 *   Small: 32px, Medium: 40px, Large: 48px
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Modal,
  Pressable as RNPressable,
  ScrollView,
  TextInput,
  View,
} from 'react-native'
import { styled, Stack, Text as TamaguiText } from '@tamagui/core'
import { primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TRIGGER_RADIUS = 4
const MODAL_RADIUS = 12
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38
const DAY_CELL_SIZE = 40
const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const

/** Trigger height per size (Figma Input mobile sizes) */
const HEIGHT_MAP: Record<DateTimePickerSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
}

/** Padding per size: [vertical, horizontal] */
const PADDING_MAP: Record<DateTimePickerSize, [number, number]> = {
  sm: [4, 8],
  md: [4, 12],
  lg: [4, 12],
}

/** Label font per size */
const LABEL_FONT: Record<DateTimePickerSize, { fontSize: number; lineHeight: number }> = {
  sm: { fontSize: 13, lineHeight: 16 },
  md: { fontSize: 14, lineHeight: 20 },
  lg: { fontSize: 16, lineHeight: 24 },
}

/** Value font per size */
const VALUE_FONT: Record<DateTimePickerSize, { fontSize: number; fontWeight: string }> = {
  sm: { fontSize: 13, fontWeight: '500' },
  md: { fontSize: 14, fontWeight: '500' },
  lg: { fontSize: 16, fontWeight: '500' },
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type DateTimePickerSize = 'sm' | 'md' | 'lg'
export type DateTimePickerMode = 'date' | 'time' | 'datetime'

export interface DateTimePickerProps {
  /** Currently selected date/time value */
  value?: Date
  /** Called when the user confirms a selection */
  onChange?: (date: Date) => void
  /** Picker mode -- date only, time only, or both. Defaults to "date". */
  mode?: DateTimePickerMode
  /** Minimum selectable date (inclusive) */
  minDate?: Date
  /** Maximum selectable date (inclusive) */
  maxDate?: Date
  /** Label displayed above the trigger */
  label?: string
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Size preset. Defaults to "md". */
  size?: DateTimePickerSize
  /** Disables the picker -- applies 38% opacity per Figma spec. */
  disabled?: boolean
  /** Whether the field is in an error state */
  error?: boolean
  /** Error message displayed below the trigger */
  errorText?: string
  /** Accessibility label override */
  accessibilityLabel?: string
  /** Test ID for testing */
  testID?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date())
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isDateInRange(d: Date, min?: Date, max?: Date): boolean {
  if (min) {
    const minStart = new Date(min.getFullYear(), min.getMonth(), min.getDate())
    if (d < minStart) return false
  }
  if (max) {
    const maxEnd = new Date(max.getFullYear(), max.getMonth(), max.getDate(), 23, 59, 59, 999)
    if (d > maxEnd) return false
  }
  return true
}

function formatDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${mm}/${dd}/${yyyy}`
}

function formatTime(d: Date): string {
  let hours = d.getHours()
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12
  return `${hours}:${minutes} ${ampm}`
}

function formatDateTime(d: Date, mode: DateTimePickerMode): string {
  if (mode === 'date') return formatDate(d)
  if (mode === 'time') return formatTime(d)
  return `${formatDate(d)} ${formatTime(d)}`
}

function padTwo(n: number): string {
  return String(n).padStart(2, '0')
}

// ---------------------------------------------------------------------------
// Calendar Icon (inline SVG-free, built with View elements)
// ---------------------------------------------------------------------------

function CalendarIcon({ color, size: iconSize }: { color: string; size: number }) {
  const s = iconSize
  const bodyH = s * 0.6
  const bodyW = s * 0.75
  const topBar = s * 0.12
  const dotSize = s * 0.12

  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      {/* Calendar body */}
      <View
        style={{
          width: bodyW,
          height: bodyH,
          borderRadius: 2,
          borderWidth: 1.5,
          borderColor: color,
          marginTop: topBar + 2,
          position: 'relative',
        }}
      >
        {/* Top bar */}
        <View
          style={{
            position: 'absolute',
            top: -topBar - 1,
            left: 0,
            right: 0,
            height: topBar,
            backgroundColor: color,
            borderTopLeftRadius: 1,
            borderTopRightRadius: 1,
          }}
        />
        {/* Dots grid (2x2) */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: dotSize,
            padding: dotSize,
            marginTop: topBar * 0.5,
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <View
              key={i}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: color,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// Clock Icon (inline, built with View elements)
// ---------------------------------------------------------------------------

function ClockIcon({ color, size: iconSize }: { color: string; size: number }) {
  const s = iconSize
  const circleSize = s * 0.75
  const handLen = circleSize * 0.25
  const handW = 1.5

  return (
    <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          borderWidth: 1.5,
          borderColor: color,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Hour hand (vertical) */}
        <View
          style={{
            position: 'absolute',
            width: handW,
            height: handLen,
            backgroundColor: color,
            bottom: circleSize / 2 - 1,
            borderRadius: handW,
          }}
        />
        {/* Minute hand (horizontal) */}
        <View
          style={{
            position: 'absolute',
            width: handLen * 0.8,
            height: handW,
            backgroundColor: color,
            left: circleSize / 2 - 1,
            borderRadius: handW,
          }}
        />
        {/* Center dot */}
        <View
          style={{
            width: 3,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// Chevron icons for month navigation
// ---------------------------------------------------------------------------

function ChevronLeft({ color }: { color: string }) {
  return (
    <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 10,
          height: 10,
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: 4,
        }}
      />
    </View>
  )
}

function ChevronRight({ color }: { color: string }) {
  return (
    <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 10,
          height: 10,
          borderRightWidth: 2,
          borderTopWidth: 2,
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginRight: 4,
        }}
      />
    </View>
  )
}

// ---------------------------------------------------------------------------
// Time Wheel Component (scrollable number selector)
// ---------------------------------------------------------------------------

function TimeWheel({
  values,
  selectedValue,
  onSelect,
  label,
  testID,
}: {
  values: number[]
  selectedValue: number
  onSelect: (v: number) => void
  label: string
  testID?: string
}) {
  const ITEM_HEIGHT = 40
  const VISIBLE_ITEMS = 5
  const scrollRef = useRef<ScrollView>(null)

  const handleScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const y = event.nativeEvent.contentOffset.y
      const index = Math.round(y / ITEM_HEIGHT)
      const clampedIndex = Math.max(0, Math.min(index, values.length - 1))
      onSelect(values[clampedIndex])
    },
    [onSelect, values],
  )

  // Scroll to selected value on mount
  React.useEffect(() => {
    const idx = values.indexOf(selectedValue)
    if (idx >= 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ y: idx * ITEM_HEIGHT, animated: false })
    }
  }, []) // Only on mount

  return (
    <View
      style={{ alignItems: 'center' }}
      accessibilityRole="adjustable"
      accessibilityLabel={label}
    >
      <TamaguiText
        fontSize={12}
        fontWeight="500"
        color={primitive.slate700}
        marginBottom={4}
      >
        {label}
      </TamaguiText>
      <View
        style={{
          height: ITEM_HEIGHT * VISIBLE_ITEMS,
          width: 56,
          overflow: 'hidden',
          borderRadius: 8,
          backgroundColor: primitive.gray50,
        }}
      >
        {/* Selected indicator */}
        <View
          style={{
            position: 'absolute',
            top: ITEM_HEIGHT * 2,
            left: 4,
            right: 4,
            height: ITEM_HEIGHT,
            backgroundColor: primitive.blurple50,
            borderRadius: 4,
            zIndex: 0,
          }}
        />
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScrollEnd}
          contentContainerStyle={{
            paddingTop: ITEM_HEIGHT * 2,
            paddingBottom: ITEM_HEIGHT * 2,
          }}
          testID={testID}
        >
          {values.map((v) => (
            <RNPressable
              key={v}
              onPress={() => onSelect(v)}
              style={{
                height: ITEM_HEIGHT,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TamaguiText
                fontSize={v === selectedValue ? 18 : 16}
                fontWeight={v === selectedValue ? '600' : '400'}
                color={v === selectedValue ? primitive.blurple700 : primitive.slate700}
              >
                {padTwo(v)}
              </TamaguiText>
            </RNPressable>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

// ---------------------------------------------------------------------------
// DateTimePicker component
// ---------------------------------------------------------------------------

export const DateTimePicker = React.memo(function DateTimePicker({
  value,
  onChange,
  mode = 'date',
  minDate,
  maxDate,
  label,
  placeholder,
  size = 'md',
  disabled = false,
  error = false,
  errorText,
  accessibilityLabel,
  testID,
}: DateTimePickerProps) {
  // ---- State ---------------------------------------------------------------
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => value ?? new Date())
  const [pendingDate, setPendingDate] = useState(() => value ?? new Date())
  const [pendingHour, setPendingHour] = useState(() => (value ?? new Date()).getHours())
  const [pendingMinute, setPendingMinute] = useState(() => (value ?? new Date()).getMinutes())

  const hasError = error || !!errorText
  const hasValue = value != null

  // Trigger border animation
  const focusAnim = useRef(new Animated.Value(0)).current

  // ---- Derived values ------------------------------------------------------
  const displayText = useMemo(() => {
    if (!hasValue) return ''
    return formatDateTime(value!, mode)
  }, [hasValue, value, mode])

  const placeholderText = useMemo(() => {
    if (placeholder) return placeholder
    if (mode === 'date') return 'MM/DD/YYYY'
    if (mode === 'time') return 'HH:MM AM'
    return 'MM/DD/YYYY HH:MM AM'
  }, [placeholder, mode])

  // Calendar grid data
  const calendarGrid = useMemo(() => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)

    const cells: (Date | null)[] = []
    // Leading blanks
    for (let i = 0; i < firstDay; i++) cells.push(null)
    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(year, month, d))
    }
    // Trailing blanks to fill 6 rows
    while (cells.length < 42) cells.push(null)
    return cells
  }, [viewDate])

  // Time arrays
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), [])
  const minutes = useMemo(() => Array.from({ length: 60 }, (_, i) => i), [])

  // ---- Handlers ------------------------------------------------------------
  const openPicker = useCallback(() => {
    if (disabled) return
    // Sync pending state with current value
    const d = value ?? new Date()
    setViewDate(d)
    setPendingDate(d)
    setPendingHour(d.getHours())
    setPendingMinute(d.getMinutes())
    setIsOpen(true)

    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [disabled, value, focusAnim])

  const closePicker = useCallback(() => {
    setIsOpen(false)
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [focusAnim])

  const handleConfirm = useCallback(() => {
    let result: Date
    if (mode === 'date') {
      result = new Date(
        pendingDate.getFullYear(),
        pendingDate.getMonth(),
        pendingDate.getDate(),
      )
    } else if (mode === 'time') {
      const now = new Date()
      result = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        pendingHour,
        pendingMinute,
      )
    } else {
      result = new Date(
        pendingDate.getFullYear(),
        pendingDate.getMonth(),
        pendingDate.getDate(),
        pendingHour,
        pendingMinute,
      )
    }
    onChange?.(result)
    closePicker()
  }, [mode, pendingDate, pendingHour, pendingMinute, onChange, closePicker])

  const handleDayPress = useCallback(
    (day: Date) => {
      if (!isDateInRange(day, minDate, maxDate)) return
      setPendingDate(day)
    },
    [minDate, maxDate],
  )

  const navigateMonth = useCallback(
    (delta: number) => {
      setViewDate((prev) => {
        const next = new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
        return next
      })
    },
    [],
  )

  // ---- Animated border -----------------------------------------------------
  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      hasError ? primitive.red600 : primitive.slate700,
      hasError ? primitive.red600 : primitive.blurple700,
    ],
  })

  const animatedBorderWidth = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [hasError ? 2 : 1, 2],
  })

  const triggerIconColor = hasError ? primitive.red600 : primitive.slate700

  // ---- Render: Trigger -----------------------------------------------------
  return (
    <View style={{ opacity: disabled ? DISABLED_OPACITY : 1 }} testID={testID}>
      {/* Label */}
      {label != null && (
        <TamaguiText
          fontSize={LABEL_FONT[size].fontSize}
          fontWeight="400"
          lineHeight={LABEL_FONT[size].lineHeight}
          color={hasError ? primitive.red600 : primitive.slate700}
          marginBottom={2}
        >
          {label}
        </TamaguiText>
      )}

      {/* Trigger */}
      <RNPressable
        onPress={openPicker}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label ?? 'Select date'}
        accessibilityState={{ disabled, expanded: isOpen }}
        accessibilityHint="Opens date picker"
      >
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: HEIGHT_MAP[size],
            paddingVertical: PADDING_MAP[size][0],
            paddingHorizontal: PADDING_MAP[size][1],
            borderRadius: TRIGGER_RADIUS,
            borderWidth: animatedBorderWidth,
            borderColor: animatedBorderColor,
            backgroundColor: primitive.white,
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <TamaguiText
              fontSize={Number(VALUE_FONT[size].fontSize)}
              fontWeight={VALUE_FONT[size].fontWeight as '400' | '500'}
              color={hasValue ? primitive.slate900 : primitive.gray400}
              numberOfLines={1}
            >
              {hasValue ? displayText : placeholderText}
            </TamaguiText>
          </View>

          {/* Icon */}
          {mode === 'time' ? (
            <ClockIcon color={triggerIconColor} size={20} />
          ) : (
            <CalendarIcon color={triggerIconColor} size={20} />
          )}
        </Animated.View>
      </RNPressable>

      {/* Error text */}
      {errorText != null && (
        <TamaguiText
          fontSize={12}
          fontWeight="500"
          lineHeight={20}
          color={primitive.red600}
          marginTop={2}
          accessibilityLiveRegion="polite"
        >
          {errorText}
        </TamaguiText>
      )}

      {/* ---- Modal --------------------------------------------------------- */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
        statusBarTranslucent
      >
        <RNPressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
          onPress={closePicker}
        >
          <RNPressable
            style={{
              backgroundColor: primitive.white,
              borderRadius: MODAL_RADIUS,
              width: '100%',
              maxWidth: 360,
              overflow: 'hidden',
            }}
            // Prevent press-through to the backdrop
            onPress={() => {}}
          >
            {/* ---- Calendar section ---- */}
            {(mode === 'date' || mode === 'datetime') && (
              <View style={{ padding: 16 }}>
                {/* Month/year navigation */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                  }}
                >
                  <RNPressable
                    onPress={() => navigateMonth(-1)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    accessibilityRole="button"
                    accessibilityLabel="Previous month"
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                    }}
                  >
                    <ChevronLeft color={primitive.slate700} />
                  </RNPressable>

                  <TamaguiText
                    fontSize={16}
                    fontWeight="600"
                    lineHeight={20}
                    color={primitive.slate900}
                  >
                    {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </TamaguiText>

                  <RNPressable
                    onPress={() => navigateMonth(1)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    accessibilityRole="button"
                    accessibilityLabel="Next month"
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                    }}
                  >
                    <ChevronRight color={primitive.slate700} />
                  </RNPressable>
                </View>

                {/* Day-of-week headers */}
                <View style={{ flexDirection: 'row' }}>
                  {DAYS_OF_WEEK.map((day, i) => (
                    <View
                      key={`header-${i}`}
                      style={{
                        flex: 1,
                        height: DAY_CELL_SIZE,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TamaguiText
                        fontSize={12}
                        fontWeight="500"
                        color={primitive.gray500}
                        textAlign="center"
                      >
                        {day}
                      </TamaguiText>
                    </View>
                  ))}
                </View>

                {/* Calendar grid -- 6 rows x 7 columns */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {calendarGrid.map((cell, idx) => {
                    if (!cell) {
                      return (
                        <View
                          key={`empty-${idx}`}
                          style={{ width: `${100 / 7}%`, height: DAY_CELL_SIZE }}
                        />
                      )
                    }

                    const isSelected = isSameDay(cell, pendingDate)
                    const isTodayCell = isToday(cell)
                    const inRange = isDateInRange(cell, minDate, maxDate)

                    return (
                      <View
                        key={`day-${cell.getDate()}-${idx}`}
                        style={{ width: `${100 / 7}%`, height: DAY_CELL_SIZE, alignItems: 'center', justifyContent: 'center' }}
                      >
                        <RNPressable
                          onPress={() => handleDayPress(cell)}
                          disabled={!inRange}
                          accessibilityRole="button"
                          accessibilityLabel={`${MONTH_NAMES[cell.getMonth()]} ${cell.getDate()}, ${cell.getFullYear()}`}
                          accessibilityState={{ selected: isSelected, disabled: !inRange }}
                          style={{
                            width: DAY_CELL_SIZE,
                            height: DAY_CELL_SIZE,
                            borderRadius: DAY_CELL_SIZE / 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: isSelected
                              ? primitive.blurple700
                              : isTodayCell
                                ? primitive.blurple50
                                : 'transparent',
                            opacity: inRange ? 1 : DISABLED_OPACITY,
                          }}
                        >
                          <TamaguiText
                            fontSize={14}
                            fontWeight={isSelected || isTodayCell ? '600' : '400'}
                            color={
                              isSelected
                                ? primitive.white
                                : isTodayCell
                                  ? primitive.blurple700
                                  : primitive.slate900
                            }
                          >
                            {cell.getDate()}
                          </TamaguiText>
                        </RNPressable>
                      </View>
                    )
                  })}
                </View>
              </View>
            )}

            {/* ---- Divider between date and time ---- */}
            {mode === 'datetime' && (
              <View
                style={{
                  height: 1,
                  backgroundColor: primitive.gray200,
                  marginHorizontal: 16,
                }}
              />
            )}

            {/* ---- Time section ---- */}
            {(mode === 'time' || mode === 'datetime') && (
              <View
                style={{
                  padding: 16,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 24,
                  alignItems: 'flex-start',
                }}
              >
                <TimeWheel
                  values={hours}
                  selectedValue={pendingHour}
                  onSelect={setPendingHour}
                  label="Hour"
                  testID={testID ? `${testID}-hour-wheel` : undefined}
                />
                <View style={{ justifyContent: 'center', paddingTop: 28, height: 40 * 5 + 28 }}>
                  <TamaguiText fontSize={24} fontWeight="600" color={primitive.slate700}>
                    :
                  </TamaguiText>
                </View>
                <TimeWheel
                  values={minutes}
                  selectedValue={pendingMinute}
                  onSelect={setPendingMinute}
                  label="Minute"
                  testID={testID ? `${testID}-minute-wheel` : undefined}
                />
              </View>
            )}

            {/* ---- Action row ---- */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 8,
                padding: 16,
                borderTopWidth: 1,
                borderTopColor: primitive.gray200,
              }}
            >
              <RNPressable
                onPress={closePicker}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: TRIGGER_RADIUS,
                }}
              >
                <TamaguiText fontSize={14} fontWeight="500" color={primitive.slate700}>
                  Cancel
                </TamaguiText>
              </RNPressable>
              <RNPressable
                onPress={handleConfirm}
                accessibilityRole="button"
                accessibilityLabel="Confirm selection"
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: TRIGGER_RADIUS,
                  backgroundColor: primitive.blurple700,
                }}
              >
                <TamaguiText fontSize={14} fontWeight="500" color={primitive.white}>
                  Confirm
                </TamaguiText>
              </RNPressable>
            </View>
          </RNPressable>
        </RNPressable>
      </Modal>
    </View>
  )
})

DateTimePicker.displayName = 'DateTimePicker'
