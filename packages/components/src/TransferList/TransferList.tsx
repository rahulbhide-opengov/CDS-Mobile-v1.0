/**
 * TransferList -- CDS 37 two-panel list with transfer controls
 *
 * Two list panels side by side (horizontal on wider screens) or stacked
 * (vertical on narrow mobile). Each panel has checkbox selection, optional
 * search, and a header with count badge. Transfer buttons in the center
 * move items between panels.
 *
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo, useState } from 'react'
import {
  FlatList,
  TextInput,
  useWindowDimensions,
} from 'react-native'
import { Stack } from '@tamagui/core'
import { Text, VStack, HStack, Pressable } from '@opengov/cds-primitives'
import { primitive, cornerRadius } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PANEL_BORDER_RADIUS = cornerRadius.small       // 4
const ITEM_HEIGHT = 44                                // mobile touch target
const DISABLED_OPACITY = primitive.stateDisabledOpacity // 0.38
const MIN_TOUCH_TARGET = 44

/** Threshold below which panels stack vertically */
const HORIZONTAL_BREAKPOINT = 540

// ---------------------------------------------------------------------------
// Inline icons (Stack composition -- no SVG dependency)
// ---------------------------------------------------------------------------

function CheckboxIcon({ checked, size = 18 }: { checked: boolean; size?: number }) {
  return (
    <Stack
      width={size}
      height={size}
      borderRadius={2}
      borderWidth={1}
      borderColor={checked ? primitive.blurple700 : primitive.slate700}
      backgroundColor={checked ? primitive.blurple700 : 'transparent'}
      alignItems="center"
      justifyContent="center"
    >
      {checked && (
        <Stack width={size * 0.55} height={size * 0.35} transform={[{ rotate: '-45deg' }]} marginTop={-1}>
          <Stack position="absolute" bottom={0} left={0} width={size * 0.55} height={1.5} backgroundColor={primitive.white} borderRadius={1} />
          <Stack position="absolute" bottom={0} left={0} width={1.5} height={size * 0.35} backgroundColor={primitive.white} borderRadius={1} />
        </Stack>
      )}
    </Stack>
  )
}

function ArrowRightIcon({ color = primitive.blurple700 }: { color?: string }) {
  return (
    <Stack width={16} height={16} alignItems="center" justifyContent="center">
      <Stack width={10} height={2} backgroundColor={color} borderRadius={1} />
      <Stack width={6} height={2} backgroundColor={color} borderRadius={1} position="absolute" right={1} top={4} transform={[{ rotate: '45deg' }]} />
      <Stack width={6} height={2} backgroundColor={color} borderRadius={1} position="absolute" right={1} bottom={4} transform={[{ rotate: '-45deg' }]} />
    </Stack>
  )
}

function ArrowLeftIcon({ color = primitive.blurple700 }: { color?: string }) {
  return (
    <Stack width={16} height={16} alignItems="center" justifyContent="center">
      <Stack width={10} height={2} backgroundColor={color} borderRadius={1} />
      <Stack width={6} height={2} backgroundColor={color} borderRadius={1} position="absolute" left={1} top={4} transform={[{ rotate: '-45deg' }]} />
      <Stack width={6} height={2} backgroundColor={color} borderRadius={1} position="absolute" left={1} bottom={4} transform={[{ rotate: '45deg' }]} />
    </Stack>
  )
}

function DoubleArrowRightIcon({ color = primitive.blurple700 }: { color?: string }) {
  return (
    <HStack gap={-4} alignItems="center" justifyContent="center">
      <ArrowRightIcon color={color} />
      <ArrowRightIcon color={color} />
    </HStack>
  )
}

function DoubleArrowLeftIcon({ color = primitive.blurple700 }: { color?: string }) {
  return (
    <HStack gap={-4} alignItems="center" justifyContent="center">
      <ArrowLeftIcon color={color} />
      <ArrowLeftIcon color={color} />
    </HStack>
  )
}

/** Inline search icon (matches SearchBar pattern) */
function SearchIcon({ color = primitive.neutral500 }: { color?: string }) {
  return (
    <Stack width={16} height={16} alignItems="center" justifyContent="center">
      <Stack width={10} height={10} borderRadius={5} borderWidth={1.5} borderColor={color} position="absolute" top={1} left={1} />
      <Stack width={5} height={1.5} backgroundColor={color} borderRadius={1} position="absolute" bottom={2} right={1} transform={[{ rotate: '45deg' }]} />
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TransferListItem {
  id: string
  label: string
  disabled?: boolean
}

export interface TransferListProps {
  /** Items in the left (source) panel. */
  leftItems: TransferListItem[]
  /** Items in the right (destination) panel. */
  rightItems: TransferListItem[]
  /** Called when items are transferred between panels. */
  onTransfer: (leftItems: TransferListItem[], rightItems: TransferListItem[]) => void
  /** Title for the left panel. Defaults to "Available". */
  leftTitle?: string
  /** Title for the right panel. Defaults to "Selected". */
  rightTitle?: string
  /** Show search bars in each panel. Defaults to false. */
  searchable?: boolean
  /** Accessibility label override. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Transfer button
// ---------------------------------------------------------------------------

function TransferButton({
  onPress,
  disabled,
  icon,
  accessibilityLabel,
}: {
  onPress: () => void
  disabled: boolean
  icon: React.ReactNode
  accessibilityLabel: string
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
    >
      <Stack
        width={36}
        height={36}
        borderRadius={cornerRadius.small}
        borderWidth={1}
        borderColor={disabled ? primitive.gray300 : primitive.blurple700}
        backgroundColor="transparent"
        alignItems="center"
        justifyContent="center"
        opacity={disabled ? DISABLED_OPACITY : 1}
        hoverStyle={disabled ? undefined : { backgroundColor: primitive.blurple50 }}
        pressStyle={disabled ? undefined : { backgroundColor: primitive.blurple100 }}
      >
        {icon}
      </Stack>
    </Pressable>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const TransferList = React.memo(function TransferList({
  leftItems,
  rightItems,
  onTransfer,
  leftTitle = 'Available',
  rightTitle = 'Selected',
  searchable = false,
  accessibilityLabel,
  testID,
}: TransferListProps) {
  const { width: windowWidth } = useWindowDimensions()
  const isHorizontal = windowWidth >= HORIZONTAL_BREAKPOINT

  // Selection state
  const [leftSelected, setLeftSelected] = useState<Set<string>>(new Set())
  const [rightSelected, setRightSelected] = useState<Set<string>>(new Set())

  // Search state
  const [leftSearch, setLeftSearch] = useState('')
  const [rightSearch, setRightSearch] = useState('')

  // ---- Filtered items based on search ------------------------------------

  const filteredLeftItems = useMemo(() => {
    if (!searchable || !leftSearch) return leftItems
    const query = leftSearch.toLowerCase()
    return leftItems.filter((item) => item.label.toLowerCase().includes(query))
  }, [leftItems, leftSearch, searchable])

  const filteredRightItems = useMemo(() => {
    if (!searchable || !rightSearch) return rightItems
    const query = rightSearch.toLowerCase()
    return rightItems.filter((item) => item.label.toLowerCase().includes(query))
  }, [rightItems, rightSearch, searchable])

  // ---- Selection handlers ------------------------------------------------

  const toggleLeftSelection = useCallback((id: string) => {
    setLeftSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleRightSelection = useCallback((id: string) => {
    setRightSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // ---- Transfer handlers -------------------------------------------------

  const moveRight = useCallback(() => {
    const toMove = leftItems.filter((item) => leftSelected.has(item.id) && !item.disabled)
    if (toMove.length === 0) return
    const newLeft = leftItems.filter((item) => !leftSelected.has(item.id))
    const newRight = [...rightItems, ...toMove]
    setLeftSelected(new Set())
    onTransfer(newLeft, newRight)
  }, [leftItems, rightItems, leftSelected, onTransfer])

  const moveLeft = useCallback(() => {
    const toMove = rightItems.filter((item) => rightSelected.has(item.id) && !item.disabled)
    if (toMove.length === 0) return
    const newRight = rightItems.filter((item) => !rightSelected.has(item.id))
    const newLeft = [...leftItems, ...toMove]
    setRightSelected(new Set())
    onTransfer(newLeft, newRight)
  }, [leftItems, rightItems, rightSelected, onTransfer])

  const moveAllRight = useCallback(() => {
    const movable = leftItems.filter((item) => !item.disabled)
    const stuck = leftItems.filter((item) => item.disabled)
    if (movable.length === 0) return
    onTransfer(stuck, [...rightItems, ...movable])
    setLeftSelected(new Set())
  }, [leftItems, rightItems, onTransfer])

  const moveAllLeft = useCallback(() => {
    const movable = rightItems.filter((item) => !item.disabled)
    const stuck = rightItems.filter((item) => item.disabled)
    if (movable.length === 0) return
    onTransfer([...leftItems, ...movable], stuck)
    setRightSelected(new Set())
  }, [leftItems, rightItems, onTransfer])

  // ---- Derived state for button disabled ----------------------------------

  const canMoveRight = useMemo(
    () => leftItems.some((item) => leftSelected.has(item.id) && !item.disabled),
    [leftItems, leftSelected],
  )
  const canMoveLeft = useMemo(
    () => rightItems.some((item) => rightSelected.has(item.id) && !item.disabled),
    [rightItems, rightSelected],
  )
  const canMoveAllRight = useMemo(
    () => leftItems.some((item) => !item.disabled),
    [leftItems],
  )
  const canMoveAllLeft = useMemo(
    () => rightItems.some((item) => !item.disabled),
    [rightItems],
  )

  // ---- Render list item ---------------------------------------------------

  const renderItem = useCallback(
    (
      item: TransferListItem,
      selectedSet: Set<string>,
      toggleSelection: (id: string) => void,
    ) => {
      const isSelected = selectedSet.has(item.id)
      const isDisabled = !!item.disabled
      return (
        <Pressable
          key={item.id}
          onPress={() => !isDisabled && toggleSelection(item.id)}
          disabled={isDisabled}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isSelected, disabled: isDisabled }}
          accessibilityLabel={item.label}
        >
          <HStack
            height={ITEM_HEIGHT}
            paddingHorizontal={12}
            alignItems="center"
            gap={10}
            opacity={isDisabled ? DISABLED_OPACITY : 1}
            hoverStyle={isDisabled ? undefined : { backgroundColor: primitive.gray50 }}
            pressStyle={isDisabled ? undefined : { backgroundColor: primitive.gray100 }}
          >
            <CheckboxIcon checked={isSelected} />
            <Text
              flex={1}
              fontSize={14}
              fontWeight="400"
              lineHeight={20}
              color={primitive.slate900}
              fontFamily="DM Sans"
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </HStack>
        </Pressable>
      )
    },
    [],
  )

  // ---- Render panel -------------------------------------------------------

  const renderPanel = useCallback(
    (
      title: string,
      items: TransferListItem[],
      filteredItems: TransferListItem[],
      selectedSet: Set<string>,
      toggleSelection: (id: string) => void,
      searchValue: string,
      onSearchChange: (text: string) => void,
      panelTestID?: string,
    ) => (
      <VStack
        flex={1}
        borderWidth={1}
        borderColor={primitive.gray300}
        borderRadius={PANEL_BORDER_RADIUS}
        overflow="hidden"
        minHeight={200}
        testID={panelTestID}
      >
        {/* Header */}
        <HStack
          paddingHorizontal={12}
          paddingVertical={8}
          borderBottomWidth={1}
          borderBottomColor={primitive.gray200}
          alignItems="center"
          backgroundColor={primitive.gray50}
        >
          <Text
            flex={1}
            fontSize={14}
            fontWeight="600"
            lineHeight={16}
            color={primitive.slate900}
            fontFamily="DM Sans"
          >
            {title}
          </Text>
          {/* Count badge */}
          <Stack
            paddingHorizontal={8}
            paddingVertical={2}
            borderRadius={10}
            backgroundColor={primitive.blurple100}
          >
            <Text
              fontSize={12}
              fontWeight="600"
              lineHeight={16}
              color={primitive.blurple700}
              fontFamily="DM Sans"
            >
              {items.length}
            </Text>
          </Stack>
        </HStack>

        {/* Search (optional) */}
        {searchable && (
          <HStack
            paddingHorizontal={10}
            paddingVertical={6}
            borderBottomWidth={1}
            borderBottomColor={primitive.gray200}
            alignItems="center"
            gap={6}
          >
            <SearchIcon />
            <TextInput
              value={searchValue}
              onChangeText={onSearchChange}
              placeholder="Search..."
              placeholderTextColor={primitive.neutral400}
              style={{
                flex: 1,
                fontFamily: 'DM Sans',
                fontSize: 13,
                lineHeight: 18,
                color: primitive.slate900,
                padding: 0,
                margin: 0,
              }}
              accessibilityRole="search"
              accessibilityLabel="Search items"
            />
          </HStack>
        )}

        {/* List items */}
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => renderItem(item, selectedSet, toggleSelection)}
          keyExtractor={(item) => item.id}
          bounces={false}
          showsVerticalScrollIndicator
          style={{ flex: 1 }}
        />
      </VStack>
    ),
    [searchable, renderItem],
  )

  // ---- Transfer controls --------------------------------------------------

  const controls = (
    <VStack
      alignItems="center"
      justifyContent="center"
      gap={8}
      paddingHorizontal={isHorizontal ? 8 : 0}
      paddingVertical={isHorizontal ? 0 : 8}
      flexDirection={isHorizontal ? 'column' : 'row'}
    >
      <TransferButton
        onPress={moveAllRight}
        disabled={!canMoveAllRight}
        icon={<DoubleArrowRightIcon color={canMoveAllRight ? primitive.blurple700 : primitive.gray400} />}
        accessibilityLabel="Move all to right"
      />
      <TransferButton
        onPress={moveRight}
        disabled={!canMoveRight}
        icon={<ArrowRightIcon color={canMoveRight ? primitive.blurple700 : primitive.gray400} />}
        accessibilityLabel="Move selected to right"
      />
      <TransferButton
        onPress={moveLeft}
        disabled={!canMoveLeft}
        icon={<ArrowLeftIcon color={canMoveLeft ? primitive.blurple700 : primitive.gray400} />}
        accessibilityLabel="Move selected to left"
      />
      <TransferButton
        onPress={moveAllLeft}
        disabled={!canMoveAllLeft}
        icon={<DoubleArrowLeftIcon color={canMoveAllLeft ? primitive.blurple700 : primitive.gray400} />}
        accessibilityLabel="Move all to left"
      />
    </VStack>
  )

  // ---- Main render --------------------------------------------------------

  const ContainerComponent = isHorizontal ? HStack : VStack

  return (
    <ContainerComponent
      gap={0}
      alignItems={isHorizontal ? 'stretch' : 'stretch'}
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel ?? 'Transfer list'}
      testID={testID}
    >
      {renderPanel(
        leftTitle,
        leftItems,
        filteredLeftItems,
        leftSelected,
        toggleLeftSelection,
        leftSearch,
        setLeftSearch,
        testID ? `${testID}-left` : undefined,
      )}

      {controls}

      {renderPanel(
        rightTitle,
        rightItems,
        filteredRightItems,
        rightSelected,
        toggleRightSelection,
        rightSearch,
        setRightSearch,
        testID ? `${testID}-right` : undefined,
      )}
    </ContainerComponent>
  )
})

TransferList.displayName = 'TransferList'
