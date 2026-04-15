/**
 * ImageList -- CDS 37 grid of images / media
 *
 * Renders images in a configurable grid layout with three variants:
 *   standard: equal-sized grid cells
 *   quilted:  first item spans 2 columns (featured layout)
 *   masonry:  varied heights (approximated with alternating aspect ratios)
 *
 * Uses React Native Image + FlatList with numColumns for native performance.
 * All colors reference `primitive.*` from @opengov/cds-tokens.
 */

import React, { useCallback, useMemo, useState } from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native'
import { Stack } from '@tamagui/core'
import { Pressable } from '@opengov/cds-primitives'
import { primitive, cornerRadius } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const IMAGE_BORDER_RADIUS = cornerRadius.medium // 8
const DEFAULT_COLUMNS = 2
const DEFAULT_GAP = 8
const DEFAULT_ASPECT_RATIO = 1

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ImageListImage {
  /** Image URI (remote or local). */
  uri: string
  /** Alt text for accessibility. */
  alt: string
  /** Optional intrinsic width hint (used for masonry sizing). */
  width?: number
  /** Optional intrinsic height hint (used for masonry sizing). */
  height?: number
}

export type ImageListVariant = 'standard' | 'quilted' | 'masonry'

export interface ImageListProps {
  /** Array of images to display. */
  images: ImageListImage[]
  /** Number of columns. Defaults to 2. */
  columns?: number
  /** Gap between images in px. Defaults to 8. */
  gap?: number
  /** Layout variant. Defaults to "standard". */
  variant?: ImageListVariant
  /** Called when an image is pressed. Receives the pressed image and its index. */
  onImagePress?: (image: ImageListImage, index: number) => void
  /** Default aspect ratio for images (width/height). Defaults to 1 (square). */
  aspectRatio?: number
  /** Accessibility label for the image grid. */
  accessibilityLabel?: string
  /** Test ID for testing. */
  testID?: string
}

// ---------------------------------------------------------------------------
// Image placeholder (shown while loading)
// ---------------------------------------------------------------------------

function ImagePlaceholder({ width, height }: { width: number; height: number }) {
  return (
    <Stack
      width={width}
      height={height}
      backgroundColor={primitive.gray200}
      borderRadius={IMAGE_BORDER_RADIUS}
    />
  )
}

// ---------------------------------------------------------------------------
// Standard grid item
// ---------------------------------------------------------------------------

function StandardImageItem({
  image,
  index,
  itemWidth,
  aspectRatio,
  gap,
  onPress,
}: {
  image: ImageListImage
  index: number
  itemWidth: number
  aspectRatio: number
  gap: number
  onPress?: (image: ImageListImage, index: number) => void
}) {
  const [loading, setLoading] = useState(true)
  const itemHeight = itemWidth / aspectRatio

  const handlePress = useCallback(() => {
    onPress?.(image, index)
  }, [onPress, image, index])

  const handleLoad = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <Pressable
      onPress={onPress ? handlePress : undefined}
      disabled={!onPress}
      accessibilityRole="image"
      accessibilityLabel={image.alt}
      style={{ marginRight: gap, marginBottom: gap }}
    >
      <Stack
        width={itemWidth}
        height={itemHeight}
        borderRadius={IMAGE_BORDER_RADIUS}
        overflow="hidden"
      >
        {loading && (
          <Stack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor={primitive.gray200}
          />
        )}
        <Image
          source={{ uri: image.uri }}
          style={{
            width: itemWidth,
            height: itemHeight,
            borderRadius: IMAGE_BORDER_RADIUS,
          }}
          resizeMode="cover"
          onLoad={handleLoad}
          accessible
          accessibilityRole="image"
          accessibilityLabel={image.alt}
        />
      </Stack>
    </Pressable>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const ImageList = React.memo(function ImageList({
  images,
  columns = DEFAULT_COLUMNS,
  gap = DEFAULT_GAP,
  variant = 'standard',
  onImagePress,
  aspectRatio = DEFAULT_ASPECT_RATIO,
  accessibilityLabel,
  testID,
}: ImageListProps) {
  const [containerWidth, setContainerWidth] = useState(0)

  const handleLayout = useCallback((event: any) => {
    setContainerWidth(event.nativeEvent.layout.width)
  }, [])

  // Calculate item width accounting for gaps
  const itemWidth = useMemo(() => {
    if (containerWidth === 0) return 0
    // Total gap space = (columns - 1) * gap
    return (containerWidth - (columns - 1) * gap) / columns
  }, [containerWidth, columns, gap])

  // Quilted variant: first item spans multiple columns
  const quiltedItemWidth = useMemo(() => {
    if (containerWidth === 0) return 0
    // Featured item spans 2 columns (or all if columns < 2)
    const featuredCols = Math.min(2, columns)
    return (containerWidth - (columns - 1) * gap) / columns * featuredCols + (featuredCols - 1) * gap
  }, [containerWidth, columns, gap])

  // ---- Standard variant: FlatList with numColumns -------------------------

  if (variant === 'standard') {
    const renderStandardItem = ({ item, index }: { item: ImageListImage; index: number }) => (
      <StandardImageItem
        image={item}
        index={index}
        itemWidth={itemWidth}
        aspectRatio={aspectRatio}
        gap={gap}
        onPress={onImagePress}
      />
    )

    return (
      <Stack
        width="100%"
        onLayout={handleLayout}
        accessibilityRole="list"
        accessibilityLabel={accessibilityLabel ?? 'Image grid'}
        testID={testID}
      >
        {containerWidth > 0 && (
          <FlatList
            data={images}
            renderItem={renderStandardItem}
            keyExtractor={keyExtractor}
            numColumns={columns}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Stack>
    )
  }

  // ---- Quilted variant: featured first item + standard grid ---------------

  if (variant === 'quilted') {
    const featuredImage = images[0]
    const restImages = images.slice(1)
    const featuredHeight = quiltedItemWidth / aspectRatio

    const renderRestItem = ({ item, index }: { item: ImageListImage; index: number }) => (
      <StandardImageItem
        image={item}
        index={index + 1}
        itemWidth={itemWidth}
        aspectRatio={aspectRatio}
        gap={gap}
        onPress={onImagePress}
      />
    )

    return (
      <Stack
        width="100%"
        onLayout={handleLayout}
        accessibilityRole="list"
        accessibilityLabel={accessibilityLabel ?? 'Image grid'}
        testID={testID}
      >
        {containerWidth > 0 && (
          <>
            {/* Featured item */}
            {featuredImage && (
              <QuiltedfeaturedItem
                image={featuredImage}
                width={quiltedItemWidth}
                height={featuredHeight}
                gap={gap}
                onPress={onImagePress ? () => onImagePress(featuredImage, 0) : undefined}
              />
            )}

            {/* Rest in standard grid */}
            {restImages.length > 0 && (
              <FlatList
                data={restImages}
                renderItem={renderRestItem}
                keyExtractor={keyExtractor}
                numColumns={columns}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            )}
          </>
        )}
      </Stack>
    )
  }

  // ---- Masonry variant: two-column layout with varied heights -------------

  const leftColumn: { image: ImageListImage; index: number }[] = []
  const rightColumn: { image: ImageListImage; index: number }[] = []
  let leftHeight = 0
  let rightHeight = 0

  images.forEach((image, index) => {
    // Calculate item aspect ratio from intrinsic dimensions or use alternating pattern
    const imgAspect = image.width && image.height
      ? image.width / image.height
      : index % 3 === 0
        ? aspectRatio * 0.75  // taller
        : index % 3 === 1
          ? aspectRatio * 1.25 // wider
          : aspectRatio         // standard
    const imgHeight = itemWidth / imgAspect

    // Shortest column algorithm
    if (leftHeight <= rightHeight) {
      leftColumn.push({ image, index })
      leftHeight += imgHeight + gap
    } else {
      rightColumn.push({ image, index })
      rightHeight += imgHeight + gap
    }
  })

  return (
    <Stack
      width="100%"
      onLayout={handleLayout}
      accessibilityRole="list"
      accessibilityLabel={accessibilityLabel ?? 'Image grid'}
      testID={testID}
    >
      {containerWidth > 0 && (
        <Stack flexDirection="row" gap={gap}>
          {/* Left column */}
          <Stack flex={1}>
            {leftColumn.map(({ image, index }) => {
              const imgAspect = image.width && image.height
                ? image.width / image.height
                : index % 3 === 0
                  ? aspectRatio * 0.75
                  : index % 3 === 1
                    ? aspectRatio * 1.25
                    : aspectRatio
              return (
                <MasonryImageItem
                  key={`left-${index}`}
                  image={image}
                  index={index}
                  itemWidth={itemWidth}
                  aspectRatio={imgAspect}
                  gap={gap}
                  onPress={onImagePress}
                />
              )
            })}
          </Stack>

          {/* Right column */}
          <Stack flex={1}>
            {rightColumn.map(({ image, index }) => {
              const imgAspect = image.width && image.height
                ? image.width / image.height
                : index % 3 === 0
                  ? aspectRatio * 0.75
                  : index % 3 === 1
                    ? aspectRatio * 1.25
                    : aspectRatio
              return (
                <MasonryImageItem
                  key={`right-${index}`}
                  image={image}
                  index={index}
                  itemWidth={itemWidth}
                  aspectRatio={imgAspect}
                  gap={gap}
                  onPress={onImagePress}
                />
              )
            })}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
})

ImageList.displayName = 'ImageList'

// ---------------------------------------------------------------------------
// Quilted featured item
// ---------------------------------------------------------------------------

function QuiltedfeaturedItem({
  image,
  width,
  height,
  gap,
  onPress,
}: {
  image: ImageListImage
  width: number
  height: number
  gap: number
  onPress?: () => void
}) {
  const [loading, setLoading] = useState(true)

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="image"
      accessibilityLabel={image.alt}
      style={{ marginBottom: gap }}
    >
      <Stack
        width={width}
        height={height}
        borderRadius={IMAGE_BORDER_RADIUS}
        overflow="hidden"
      >
        {loading && (
          <Stack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor={primitive.gray200}
          />
        )}
        <Image
          source={{ uri: image.uri }}
          style={{
            width,
            height,
            borderRadius: IMAGE_BORDER_RADIUS,
          }}
          resizeMode="cover"
          onLoad={() => setLoading(false)}
          accessible
          accessibilityRole="image"
          accessibilityLabel={image.alt}
        />
      </Stack>
    </Pressable>
  )
}

// ---------------------------------------------------------------------------
// Masonry image item
// ---------------------------------------------------------------------------

function MasonryImageItem({
  image,
  index,
  itemWidth,
  aspectRatio,
  gap,
  onPress,
}: {
  image: ImageListImage
  index: number
  itemWidth: number
  aspectRatio: number
  gap: number
  onPress?: (image: ImageListImage, index: number) => void
}) {
  const [loading, setLoading] = useState(true)
  const itemHeight = itemWidth / aspectRatio

  const handlePress = useCallback(() => {
    onPress?.(image, index)
  }, [onPress, image, index])

  return (
    <Pressable
      onPress={onPress ? handlePress : undefined}
      disabled={!onPress}
      accessibilityRole="image"
      accessibilityLabel={image.alt}
      style={{ marginBottom: gap }}
    >
      <Stack
        width="100%"
        height={itemHeight}
        borderRadius={IMAGE_BORDER_RADIUS}
        overflow="hidden"
      >
        {loading && (
          <Stack
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            backgroundColor={primitive.gray200}
          />
        )}
        <Image
          source={{ uri: image.uri }}
          style={{
            width: '100%' as any,
            height: itemHeight,
            borderRadius: IMAGE_BORDER_RADIUS,
          }}
          resizeMode="cover"
          onLoad={() => setLoading(false)}
          accessible
          accessibilityRole="image"
          accessibilityLabel={image.alt}
        />
      </Stack>
    </Pressable>
  )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function keyExtractor(item: ImageListImage, index: number) {
  return `${item.uri}-${index}`
}
