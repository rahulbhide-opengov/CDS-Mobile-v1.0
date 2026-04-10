import React, { useCallback, useMemo, useState } from 'react'
import {
  FlatList,
  Modal,
  TextInput,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Platform,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCREEN_HEIGHT = Dimensions.get('window').height
const SHEET_HEIGHT_RATIO = 0.6
const SHEET_HEIGHT = SCREEN_HEIGHT * SHEET_HEIGHT_RATIO
const ITEM_HEIGHT = 48
const DISMISS_VELOCITY = 0.5
const DISMISS_DISTANCE_RATIO = 0.3

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const TriggerFrame = styled(Pressable, {
  name: 'SelectMenuTrigger',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: primitive.neutral200, // neutral200
  borderRadius: 4, // radii.md
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  backgroundColor: primitive.white,
  gap: '$2',

  variants: {
    size: {
      sm: { minHeight: 36, paddingHorizontal: '$2', paddingVertical: '$1' },
      md: { minHeight: 44, paddingHorizontal: '$3', paddingVertical: '$2' },
      lg: { minHeight: 52, paddingHorizontal: '$4', paddingVertical: '$3' },
    },
    error: {
      true: { borderColor: primitive.red700 }, // red700
    },
    disabled: {
      true: { opacity: 0.5 },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------

const ChevronDown = React.memo(function ChevronDown({ rotated }: { rotated?: boolean }) {
  return (
    <Stack
      width={12}
      height={12}
      alignItems="center"
      justifyContent="center"
      transform={rotated ? [{ rotate: '180deg' }] : undefined}
    >
      <Stack
        width={8}
        height={8}
        borderRightWidth={2}
        borderBottomWidth={2}
        borderColor={primitive.neutral500} // neutral500
        transform={[{ rotate: '45deg' }]}
        marginTop={-3}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Checkmark icon
// ---------------------------------------------------------------------------

const Checkmark = React.memo(function Checkmark() {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      <Stack
        width={12}
        height={6}
        borderBottomWidth={2}
        borderLeftWidth={2}
        borderColor={colors.primary} // primary
        transform={[{ rotate: '-45deg' }]}
        marginTop={-2}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Search icon
// ---------------------------------------------------------------------------

const SearchIcon = React.memo(function SearchIcon() {
  return (
    <Stack width={18} height={18} alignItems="center" justifyContent="center">
      <Stack
        width={11}
        height={11}
        borderWidth={2}
        borderColor={primitive.neutral500}
        borderRadius={6}
        position="absolute"
        top={1}
        left={1}
      />
      <Stack
        width={5}
        height={2}
        backgroundColor={primitive.neutral500}
        borderRadius={1}
        position="absolute"
        bottom={2}
        right={1}
        transform={[{ rotate: '45deg' }]}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Close icon
// ---------------------------------------------------------------------------

const CloseXIcon = React.memo(function CloseXIcon() {
  return (
    <Stack width={16} height={16} alignItems="center" justifyContent="center">
      <Stack
        width={12}
        height={2}
        backgroundColor={primitive.neutral700}
        borderRadius={1}
        position="absolute"
        transform={[{ rotate: '45deg' }]}
      />
      <Stack
        width={12}
        height={2}
        backgroundColor={primitive.neutral700}
        borderRadius={1}
        position="absolute"
        transform={[{ rotate: '-45deg' }]}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SelectMenuOption {
  /** Unique value for this option */
  value: string
  /** Display label */
  label: string
  /** Optional description shown below the label */
  description?: string
  /** Optional leading icon */
  icon?: React.ReactNode
  /** Whether this option is disabled */
  disabled?: boolean
  /** Group key for grouped options */
  group?: string
}

export interface SelectMenuOptionGroup {
  /** Group key matching SelectMenuOption.group */
  key: string
  /** Group header label */
  label: string
}

export interface SelectMenuProps {
  /** Available options */
  options: SelectMenuOption[]
  /** Currently selected value(s) */
  value?: string | string[]
  /** Called when an option is selected or deselected */
  onSelect: (value: string) => void
  /** Placeholder text when nothing is selected */
  placeholder?: string
  /** Label displayed above the trigger */
  label?: string
  /** Whether the trigger shows an error state */
  error?: boolean
  /** Error message displayed below the trigger */
  errorText?: string
  /** Whether the component is disabled */
  disabled?: boolean
  /** Enable multi-select mode */
  multiple?: boolean
  /** Enable search/filter within the dropdown */
  searchable?: boolean
  /** Option group definitions for grouped display */
  groups?: SelectMenuOptionGroup[]
  /** Trigger size */
  size?: 'sm' | 'md' | 'lg'
}

// ---------------------------------------------------------------------------
// Option row (memoized for FlatList performance)
// ---------------------------------------------------------------------------

interface OptionRowProps {
  option: SelectMenuOption
  isSelected: boolean
  onSelect: (value: string) => void
}

const OptionRow = React.memo(function OptionRow({ option, isSelected, onSelect }: OptionRowProps) {
  const handlePress = useCallback(() => {
    if (!option.disabled) {
      onSelect(option.value)
    }
  }, [option.value, option.disabled, onSelect])

  return (
    <Pressable
      onPress={handlePress}
      disabled={option.disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ selected: isSelected, disabled: option.disabled }}
      accessibilityLabel={`${option.label}${option.description ? `, ${option.description}` : ''}${isSelected ? ', selected' : ''}`}
      minWidth={0}
      minHeight={ITEM_HEIGHT}
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="$4"
      paddingVertical="$2"
      gap="$3"
      backgroundColor={isSelected ? 'rgba(75, 63, 255, 0.06)' : 'transparent'}
      opacity={option.disabled ? 0.5 : 1}
    >
      {/* Leading icon */}
      {option.icon != null && (
        <Stack width={20} height={20} alignItems="center" justifyContent="center" flexShrink={0}>
          {option.icon}
        </Stack>
      )}

      {/* Label + description */}
      <VStack flex={1} gap="$0.5" minWidth={0}>
        <Text
          variant="body2"
          color={primitive.neutral900}
          numberOfLines={1}
          fontWeight={isSelected ? '$medium' : '$regular'}
        >
          {option.label}
        </Text>
        {option.description != null && (
          <Text variant="caption" color={primitive.neutral500} numberOfLines={1}>
            {option.description}
          </Text>
        )}
      </VStack>

      {/* Check indicator */}
      {isSelected && (
        <Stack flexShrink={0}>
          <Checkmark />
        </Stack>
      )}
    </Pressable>
  )
})

// ---------------------------------------------------------------------------
// Group header row
// ---------------------------------------------------------------------------

interface GroupHeaderProps {
  label: string
}

const GroupHeader = React.memo(function GroupHeader({ label }: GroupHeaderProps) {
  return (
    <Stack paddingHorizontal="$4" paddingTop="$3" paddingBottom="$1.5">
      <Text
        variant="overline"
        color={primitive.neutral500} // neutral500
      >
        {label}
      </Text>
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `SelectMenu` -- dropdown selection pattern for CDS forms.
 *
 * Renders a trigger button showing the current selection. Tapping opens a
 * BottomSheet-style modal with the option list. Supports:
 * - Single and multi-select modes
 * - Search/filter within options
 * - Option groups with headers
 * - Check icons for selected items
 * - Error state and helper text
 * - Keyboard-aware scrolling
 */
export function SelectMenu({
  options,
  value,
  onSelect,
  placeholder = 'Select an option',
  label,
  error = false,
  errorText,
  disabled = false,
  multiple = false,
  searchable = false,
  groups,
  size = 'md',
}: SelectMenuProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // ---- Animated values for BottomSheet ------------------------------------

  const translateY = React.useRef(new Animated.Value(SHEET_HEIGHT)).current
  const backdropOpacity = React.useRef(new Animated.Value(0)).current

  // ---- Derived values -----------------------------------------------------

  const selectedValues = useMemo(() => {
    if (value == null) return new Set<string>()
    return new Set(Array.isArray(value) ? value : [value])
  }, [value])

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedValues.has(opt.value)),
    [options, selectedValues],
  )

  const displayText = useMemo(() => {
    if (selectedOptions.length === 0) return placeholder
    if (selectedOptions.length === 1) return selectedOptions[0].label
    return `${selectedOptions.length} selected`
  }, [selectedOptions, placeholder])

  // ---- Filtered + grouped list data ----------------------------------------

  type ListItem =
    | { type: 'group'; key: string; label: string }
    | { type: 'option'; key: string; option: SelectMenuOption }

  const listData: ListItem[] = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filteredOptions = normalizedQuery
      ? options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(normalizedQuery) ||
            opt.description?.toLowerCase().includes(normalizedQuery),
        )
      : options

    if (groups && groups.length > 0) {
      const items: ListItem[] = []
      const groupMap = new Map(groups.map((g) => [g.key, g]))

      // Group options by their group key
      const grouped = new Map<string, SelectMenuOption[]>()
      const ungrouped: SelectMenuOption[] = []

      for (const opt of filteredOptions) {
        if (opt.group && groupMap.has(opt.group)) {
          const list = grouped.get(opt.group) || []
          list.push(opt)
          grouped.set(opt.group, list)
        } else {
          ungrouped.push(opt)
        }
      }

      // Render groups in order
      for (const group of groups) {
        const groupOptions = grouped.get(group.key)
        if (groupOptions && groupOptions.length > 0) {
          items.push({ type: 'group', key: `group-${group.key}`, label: group.label })
          for (const opt of groupOptions) {
            items.push({ type: 'option', key: opt.value, option: opt })
          }
        }
      }

      // Ungrouped items at the end
      for (const opt of ungrouped) {
        items.push({ type: 'option', key: opt.value, option: opt })
      }

      return items
    }

    return filteredOptions.map((opt) => ({ type: 'option' as const, key: opt.value, option: opt }))
  }, [options, groups, searchQuery])

  // ---- Sheet animation helpers --------------------------------------------

  const slideIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 22,
        stiffness: 220,
        mass: 0.8,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()
  }, [translateY, backdropOpacity])

  const slideOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: SHEET_HEIGHT,
          useNativeDriver: true,
          damping: 22,
          stiffness: 220,
          mass: 0.8,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(callback)
    },
    [translateY, backdropOpacity],
  )

  // ---- Open / close handlers ----------------------------------------------

  const handleOpen = useCallback(() => {
    if (disabled) return
    setSearchQuery('')
    setOpen(true)
    // Schedule slide-in after modal mounts
    requestAnimationFrame(() => {
      translateY.setValue(SHEET_HEIGHT)
      backdropOpacity.setValue(0)
      slideIn()
    })
  }, [disabled, translateY, backdropOpacity, slideIn])

  const handleClose = useCallback(() => {
    slideOut(() => {
      setOpen(false)
      setSearchQuery('')
    })
  }, [slideOut])

  const handleSelect = useCallback(
    (optionValue: string) => {
      onSelect(optionValue)
      if (!multiple) {
        handleClose()
      }
    },
    [onSelect, multiple, handleClose],
  )

  // ---- PanResponder for swipe-to-dismiss ----------------------------------

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gs) =>
        gs.dy > 8 && Math.abs(gs.dy) > Math.abs(gs.dx),
      onPanResponderMove: (_, gs) => {
        if (gs.dy > 0) translateY.setValue(gs.dy)
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.vy > DISMISS_VELOCITY || gs.dy > SHEET_HEIGHT * DISMISS_DISTANCE_RATIO) {
          handleClose()
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 22,
            stiffness: 220,
          }).start()
        }
      },
    }),
  ).current

  // ---- Render item callback -----------------------------------------------

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === 'group') {
        return <GroupHeader label={item.label} />
      }
      return (
        <OptionRow
          option={item.option}
          isSelected={selectedValues.has(item.option.value)}
          onSelect={handleSelect}
        />
      )
    },
    [selectedValues, handleSelect],
  )

  const keyExtractor = useCallback((item: ListItem) => item.key, [])

  const getItemLayout = useCallback(
    (_data: ArrayLike<ListItem> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  )

  // ---- Render -------------------------------------------------------------

  const hasError = error || !!errorText
  const hasSelection = selectedOptions.length > 0

  return (
    <VStack gap="$1">
      {/* Label */}
      {label != null && (
        <Text
          variant="body3"
          fontWeight="$medium"
          color={hasError ? primitive.red700 : primitive.neutral900}
        >
          {label}
        </Text>
      )}

      {/* Trigger */}
      <TriggerFrame
        size={size}
        error={hasError}
        disabled={disabled}
        onPress={handleOpen}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled }}
        accessibilityLabel={`${label ?? 'Select'}: ${displayText}`}
        accessibilityHint="Double tap to open selection"
      >
        <Text
          flex={1}
          variant="body2"
          color={hasSelection ? primitive.neutral900 : primitive.neutral400}
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <ChevronDown rotated={open} />
      </TriggerFrame>

      {/* Error text */}
      {errorText != null && (
        <Text variant="caption" color={primitive.red700}>
          {errorText}
        </Text>
      )}

      {/* BottomSheet dropdown */}
      <Modal
        visible={open}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={handleClose}
        accessibilityViewIsModal
      >
        {/* Backdrop */}
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
        >
          <Stack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor="black"
            onPress={handleClose}
            accessibilityRole="none"
            accessibilityLabel="Close selection"
          />
        </Animated.View>

        {/* Sheet */}
        <Animated.View
          style={[
            styles.sheet,
            {
              height: SHEET_HEIGHT,
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Stack
            backgroundColor={primitive.white}
            borderTopLeftRadius={16}
            borderTopRightRadius={16}
            flex={1}
            overflow="hidden"
            shadowColor="black"
            shadowOffset={{ width: 0, height: -4 }}
            shadowOpacity={0.15}
            shadowRadius={16}
          >
            {/* Handle bar */}
            <Stack alignItems="center" paddingTop={8} paddingBottom={4}>
              <Stack
                width={32}
                height={4}
                borderRadius={2}
                backgroundColor={primitive.neutral400}
                opacity={0.5}
              />
            </Stack>

            {/* Header */}
            <HStack
              paddingHorizontal="$4"
              paddingBottom="$3"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text variant="h5" color={primitive.neutral900}>
                {label ?? 'Select'}
              </Text>
              <Pressable
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel="Close"
                width={32}
                height={32}
                borderRadius={16}
                alignItems="center"
                justifyContent="center"
                minWidth={32}
                minHeight={32}
              >
                <CloseXIcon />
              </Pressable>
            </HStack>

            {/* Search input */}
            {searchable && (
              <HStack
                marginHorizontal="$4"
                marginBottom="$2"
                backgroundColor={primitive.neutral100}
                borderRadius={8}
                paddingHorizontal="$3"
                paddingVertical="$2"
                alignItems="center"
                gap="$2"
              >
                <SearchIcon />
                <TextInput
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
                    color: primitive.neutral900,
                    padding: 0,
                    margin: 0,
                    minHeight: 24,
                  }}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search..."
                  placeholderTextColor={primitive.neutral400}
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="search"
                  accessibilityLabel="Search options"
                />
                {searchQuery.length > 0 && (
                  <Pressable
                    onPress={() => setSearchQuery('')}
                    accessibilityLabel="Clear search"
                    width={24}
                    height={24}
                    alignItems="center"
                    justifyContent="center"
                    minWidth={24}
                    minHeight={24}
                  >
                    <CloseXIcon />
                  </Pressable>
                )}
              </HStack>
            )}

            {/* Multi-select count indicator */}
            {multiple && selectedOptions.length > 0 && (
              <HStack
                paddingHorizontal="$4"
                paddingBottom="$2"
                alignItems="center"
                gap="$2"
              >
                <Text variant="caption" color={primitive.neutral500}>
                  {selectedOptions.length} selected
                </Text>
              </HStack>
            )}

            {/* Options list */}
            <FlatList<ListItem>
              data={listData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              getItemLayout={getItemLayout}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
              ListEmptyComponent={
                <Stack padding="$6" alignItems="center">
                  <Text variant="body3" color={primitive.neutral500}>
                    {searchQuery ? 'No matching options' : 'No options available'}
                  </Text>
                </Stack>
              }
            />
          </Stack>
        </Animated.View>
      </Modal>
    </VStack>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
})
