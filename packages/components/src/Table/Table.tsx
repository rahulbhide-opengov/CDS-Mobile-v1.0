import React, { useCallback, useMemo, useRef } from 'react'
import {
  Animated,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Pressable as RNPressable,
  StyleSheet,
  type ListRenderItemInfo,
} from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack } from '@opengov/cds-primitives'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Phone breakpoint (width below this renders card-style rows). */
const PHONE_BREAKPOINT = 768

const MIN_ROW_HEIGHT = 48
const HEADER_HEIGHT = 44

// ---------------------------------------------------------------------------
// Sort direction indicator
// ---------------------------------------------------------------------------

function SortIndicator({
  active,
  direction,
}: {
  active: boolean
  direction: 'asc' | 'desc'
}) {
  if (!active) {
    return (
      <Text variant="caption" color="$textMuted" marginLeft={4}>
        {'\u2195'}
      </Text>
    )
  }

  return (
    <Text variant="caption" color="$brandColor" marginLeft={4}>
      {direction === 'asc' ? '\u2191' : '\u2193'}
    </Text>
  )
}

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const TableFrame = styled(Stack, {
  name: 'Table',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$md',
  overflow: 'hidden',
  backgroundColor: '$background',
})

const HeaderCellFrame = styled(Stack, {
  name: 'TableHeaderCell',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 12,
  paddingVertical: 10,
  backgroundColor: '$backgroundStrong',
  minHeight: HEADER_HEIGHT,
})

const BodyCellFrame = styled(Stack, {
  name: 'TableBodyCell',
  paddingHorizontal: 12,
  paddingVertical: 10,
  justifyContent: 'center',
  minHeight: MIN_ROW_HEIGHT,
})

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

function TableEmpty({ message }: { message: string }) {
  return (
    <Stack
      paddingVertical={48}
      alignItems="center"
      justifyContent="center"
    >
      <Text variant="body3" color="$textMuted">
        {message}
      </Text>
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Loading skeleton rows
// ---------------------------------------------------------------------------

function TableLoadingRows({ columnCount }: { columnCount: number }) {
  const shimmerAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    )
    animation.start()
    return () => animation.stop()
  }, [shimmerAnim])

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  })

  return (
    <Stack>
      {Array.from({ length: 5 }).map((_, rowIdx) => (
        <Stack
          key={`loading-${rowIdx}`}
          flexDirection="row"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          minHeight={MIN_ROW_HEIGHT}
          alignItems="center"
        >
          {Array.from({ length: columnCount }).map((_, colIdx) => (
            <Stack
              key={`loading-${rowIdx}-${colIdx}`}
              flex={1}
              paddingHorizontal={12}
              paddingVertical={10}
            >
              <Animated.View
                style={[
                  styles.loadingBar,
                  { opacity },
                ]}
              />
            </Stack>
          ))}
        </Stack>
      ))}
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TableColumn<T = any> {
  /** Unique key matching a field on data items. */
  key: string
  /** Column header text. */
  title: string
  /** Fixed width (number = pixels, string = e.g. '30%'). Defaults to flex. */
  width?: number | string
  /** Text alignment within the column. */
  align?: 'left' | 'center' | 'right'
  /** Custom render function for cell content. */
  render?: (item: T, index: number) => React.ReactNode
  /** Whether this column supports sorting. */
  sortable?: boolean
}

export interface TableProps<T = any> {
  /** Column definitions. */
  columns: TableColumn<T>[]
  /** Row data. */
  data: T[]
  /** Unique key extractor for FlatList virtualization. */
  keyExtractor: (item: T, index: number) => string
  /** Called when a row is pressed. */
  onRowPress?: (item: T, index: number) => void
  /** Alternating row background colors. */
  striped?: boolean
  /** Currently sorted column key. */
  sortColumn?: string
  /** Current sort direction. */
  sortDirection?: 'asc' | 'desc'
  /** Called when a sortable column header is pressed. */
  onSort?: (column: string) => void
  /** Text displayed when data is empty. */
  emptyMessage?: string
  /** Shows skeleton loading rows instead of data. */
  loading?: boolean
}

// ---------------------------------------------------------------------------
// Alignment helpers
// ---------------------------------------------------------------------------

function alignToFlex(align?: 'left' | 'center' | 'right') {
  switch (align) {
    case 'center':
      return 'center' as const
    case 'right':
      return 'flex-end' as const
    default:
      return 'flex-start' as const
  }
}

// ---------------------------------------------------------------------------
// Phone card row (responsive: displays data as labeled key-value pairs)
// ---------------------------------------------------------------------------

function PhoneCardRow<T>({
  item,
  index,
  columns,
  onPress,
  striped,
}: {
  item: T
  index: number
  columns: TableColumn<T>[]
  onPress?: (item: T, index: number) => void
  striped: boolean
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [scaleAnim])

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [scaleAnim])

  const backgroundColor = striped && index % 2 === 1
    ? '$backgroundStrong'
    : '$background'

  const content = (
    <Stack
      backgroundColor={backgroundColor}
      borderRadius="$md"
      padding={12}
      marginHorizontal={8}
      marginVertical={4}
      borderWidth={1}
      borderColor="$borderColor"
      gap={8}
    >
      {columns.map((col) => {
        const value = col.render
          ? col.render(item, index)
          : (item as any)?.[col.key]

        return (
          <HStack key={col.key} justifyContent="space-between" alignItems="center">
            <Text variant="caption" color="$textMuted" fontWeight="$semibold">
              {col.title}
            </Text>
            <Stack alignItems={alignToFlex(col.align)} flex={1} marginLeft={12}>
              {typeof value === 'string' || typeof value === 'number' ? (
                <Text variant="body3">{String(value)}</Text>
              ) : (
                value
              )}
            </Stack>
          </HStack>
        )
      })}
    </Stack>
  )

  if (!onPress) return content

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <RNPressable
        onPress={() => onPress(item, index)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`Row ${index + 1}`}
      >
        {content}
      </RNPressable>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Tablet / desktop condensed row
// ---------------------------------------------------------------------------

function CondensedRow<T>({
  item,
  index,
  columns,
  onPress,
  striped,
}: {
  item: T
  index: number
  columns: TableColumn<T>[]
  onPress?: (item: T, index: number) => void
  striped: boolean
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = useCallback(() => {
    if (!onPress) return
    Animated.spring(scaleAnim, {
      toValue: 0.99,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [scaleAnim, onPress])

  const handlePressOut = useCallback(() => {
    if (!onPress) return
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start()
  }, [scaleAnim, onPress])

  const backgroundColor = striped && index % 2 === 1
    ? '$backgroundStrong'
    : '$background'

  const row = (
    <Stack
      flexDirection="row"
      backgroundColor={backgroundColor}
      borderBottomWidth={1}
      borderBottomColor="$borderColor"
      minHeight={MIN_ROW_HEIGHT}
      alignItems="center"
    >
      {columns.map((col) => {
        const value = col.render
          ? col.render(item, index)
          : (item as any)?.[col.key]

        const widthStyle: Record<string, unknown> = col.width != null
          ? { width: col.width, flexShrink: 0 }
          : { flex: 1 }

        return (
          <BodyCellFrame
            key={col.key}
            alignItems={alignToFlex(col.align)}
            {...widthStyle}
          >
            {typeof value === 'string' || typeof value === 'number' ? (
              <Text variant="body3">{String(value)}</Text>
            ) : (
              value
            )}
          </BodyCellFrame>
        )
      })}
    </Stack>
  )

  if (!onPress) return row

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <RNPressable
        onPress={() => onPress(item, index)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={`Row ${index + 1}`}
      >
        {row}
      </RNPressable>
    </Animated.View>
  )
}

// ---------------------------------------------------------------------------
// Table component
// ---------------------------------------------------------------------------

/**
 * `Table` -- mobile-adapted data table built on FlatList.
 *
 * On phone-width screens (< 768px) rows render as card-style key-value
 * layouts. On tablet and wider screens rows render as condensed horizontal
 * rows with a sticky header. Supports column sorting, striped rows, custom
 * cell renderers, loading skeletons, and horizontal scrolling for wide data.
 */
export function Table<T = any>({
  columns,
  data,
  keyExtractor,
  onRowPress,
  striped = false,
  sortColumn,
  sortDirection = 'asc',
  onSort,
  emptyMessage = 'No data to display',
  loading = false,
}: TableProps<T>) {
  const { width: screenWidth } = useWindowDimensions()
  const isPhone = screenWidth < PHONE_BREAKPOINT

  // ---- Compute total minimum width for horizontal scroll ----
  const totalMinWidth = useMemo(() => {
    let total = 0
    let flexCount = 0
    for (const col of columns) {
      if (typeof col.width === 'number') {
        total += col.width
      } else {
        flexCount += 1
      }
    }
    // Give each flex column at least 120px
    return total + flexCount * 120
  }, [columns])

  // ---- Header row (tablet / desktop only) ----
  const renderHeader = useCallback(() => {
    if (isPhone) return null

    return (
      <Stack
        flexDirection="row"
        backgroundColor="$backgroundStrong"
        borderBottomWidth={1}
        borderBottomColor="$borderColor"
        minHeight={HEADER_HEIGHT}
        alignItems="center"
      >
        {columns.map((col) => {
          const widthStyle: Record<string, unknown> = col.width != null
            ? { width: col.width, flexShrink: 0 }
            : { flex: 1 }

          const isSorted = sortColumn === col.key

          const handleHeaderPress = () => {
            if (col.sortable && onSort) {
              onSort(col.key)
            }
          }

          const headerContent = (
            <HeaderCellFrame
              justifyContent={alignToFlex(col.align)}
              {...widthStyle}
            >
              <Text
                variant="body3"
                fontWeight="$semibold"
                color={isSorted ? '$brandColor' : '$text'}
              >
                {col.title}
              </Text>
              {col.sortable && (
                <SortIndicator
                  active={isSorted}
                  direction={isSorted ? sortDirection : 'asc'}
                />
              )}
            </HeaderCellFrame>
          )

          if (col.sortable && onSort) {
            return (
              <RNPressable
                key={col.key}
                onPress={handleHeaderPress}
                accessibilityRole="button"
                accessibilityLabel={`Sort by ${col.title}`}
                accessibilityState={{
                  selected: isSorted,
                }}
                style={col.width != null
                  ? { width: col.width as number, flexShrink: 0 }
                  : { flex: 1 }
                }
              >
                {headerContent}
              </RNPressable>
            )
          }

          return (
            <Stack key={col.key} {...widthStyle}>
              {headerContent}
            </Stack>
          )
        })}
      </Stack>
    )
  }, [columns, isPhone, onSort, sortColumn, sortDirection])

  // ---- Row renderer ----
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<T>) => {
      if (isPhone) {
        return (
          <PhoneCardRow
            item={item}
            index={index}
            columns={columns}
            onPress={onRowPress}
            striped={striped}
          />
        )
      }

      return (
        <CondensedRow
          item={item}
          index={index}
          columns={columns}
          onPress={onRowPress}
          striped={striped}
        />
      )
    },
    [columns, isPhone, onRowPress, striped]
  )

  // ---- Empty state ----
  const renderEmpty = useCallback(() => {
    if (loading) return null
    return <TableEmpty message={emptyMessage} />
  }, [emptyMessage, loading])

  // ---- Loading state ----
  const renderFooter = useCallback(() => {
    if (!loading) return null
    return <TableLoadingRows columnCount={columns.length} />
  }, [loading, columns.length])

  // ---- Phone layout: simple vertical FlatList ----
  if (isPhone) {
    return (
      <Stack
        accessibilityRole="list"
        accessibilityLabel="Data table"
      >
        {loading ? (
          <Stack padding={8}>
            <TableLoadingRows columnCount={columns.length} />
          </Stack>
        ) : (
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.phoneListContent}
          />
        )}
      </Stack>
    )
  }

  // ---- Tablet / desktop: horizontal ScrollView wrapping vertical FlatList ----
  return (
    <TableFrame
      accessibilityRole="list"
      accessibilityLabel="Data table"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        bounces={false}
        contentContainerStyle={{ minWidth: totalMinWidth }}
      >
        <Stack flex={1} minWidth={totalMinWidth}>
          {/* Sticky header */}
          {renderHeader()}

          {/* Loading state */}
          {loading ? (
            <TableLoadingRows columnCount={columns.length} />
          ) : (
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ListEmptyComponent={renderEmpty}
              showsVerticalScrollIndicator={false}
              scrollEnabled={true}
              nestedScrollEnabled
            />
          )}
        </Stack>
      </ScrollView>
    </TableFrame>
  )
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  loadingBar: {
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '80%',
  },
  phoneListContent: {
    paddingVertical: 4,
  },
})
