import React, { useCallback } from 'react'
import { Image } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ICON_CONTAINER_SIZE = 44
const THUMBNAIL_SIZE = 44

// ---------------------------------------------------------------------------
// File type color mapping
// ---------------------------------------------------------------------------

type FileCategory = 'document' | 'spreadsheet' | 'presentation' | 'image' | 'video' | 'audio' | 'archive' | 'code' | 'unknown'

const FILE_CATEGORY_COLORS: Record<FileCategory, { bg: string; fg: string; label: string }> = {
  document:     { bg: primitive.blue50, fg: primitive.blue500, label: 'DOC' },
  spreadsheet:  { bg: colors.jade50, fg: colors.jade700, label: 'XLS' },
  presentation: { bg: primitive.amber50, fg: colors.amber700, label: 'PPT' },
  image:        { bg: primitive.port50, fg: primitive.port500, label: 'IMG' },
  video:        { bg: primitive.rose50, fg: primitive.rose500, label: 'VID' },
  audio:        { bg: primitive.teal50, fg: colors.teal700, label: 'AUD' },
  archive:      { bg: primitive.amber50, fg: colors.amber700, label: 'ZIP' },
  code:         { bg: colors.neutral100, fg: colors.neutral700, label: 'CODE' },
  unknown:      { bg: colors.neutral100, fg: colors.neutral500, label: 'FILE' },
}

const EXTENSION_MAP: Record<string, FileCategory> = {
  // Documents
  pdf: 'document', doc: 'document', docx: 'document', txt: 'document', rtf: 'document', odt: 'document',
  // Spreadsheets
  xls: 'spreadsheet', xlsx: 'spreadsheet', csv: 'spreadsheet', ods: 'spreadsheet',
  // Presentations
  ppt: 'presentation', pptx: 'presentation', odp: 'presentation', key: 'presentation',
  // Images
  jpg: 'image', jpeg: 'image', png: 'image', gif: 'image', svg: 'image', webp: 'image', bmp: 'image', heic: 'image',
  // Video
  mp4: 'video', mov: 'video', avi: 'video', mkv: 'video', webm: 'video',
  // Audio
  mp3: 'audio', wav: 'audio', aac: 'audio', flac: 'audio', ogg: 'audio',
  // Archive
  zip: 'archive', rar: 'archive', tar: 'archive', gz: 'archive', '7z': 'archive',
  // Code
  js: 'code', ts: 'code', jsx: 'code', tsx: 'code', py: 'code', java: 'code', json: 'code', xml: 'code', html: 'code', css: 'code',
}

function getFileCategory(fileType?: string, fileName?: string): FileCategory {
  // Try fileType first
  if (fileType) {
    const normalized = fileType.toLowerCase().replace(/^\./, '')
    if (normalized in EXTENSION_MAP) return EXTENSION_MAP[normalized]
  }
  // Fallback: extract extension from file name
  if (fileName) {
    const parts = fileName.split('.')
    if (parts.length > 1) {
      const ext = parts[parts.length - 1].toLowerCase()
      if (ext in EXTENSION_MAP) return EXTENSION_MAP[ext]
    }
  }
  return 'unknown'
}

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const FileCardFrame = styled(Pressable, {
  name: 'FileCard',
  backgroundColor: colors.white,
  borderRadius: 8, // radii.lg
  borderWidth: 1,
  borderColor: colors.neutral200,
  padding: '$3',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$3',
  minWidth: 0,
  minHeight: 0,
})

// ---------------------------------------------------------------------------
// Download icon (downward arrow with line)
// ---------------------------------------------------------------------------

const DownloadIcon = React.memo(function DownloadIcon() {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      {/* Down arrow */}
      <Stack
        width={0}
        height={0}
        borderLeftWidth={4}
        borderRightWidth={4}
        borderTopWidth={6}
        borderLeftColor="transparent"
        borderRightColor="transparent"
        borderTopColor={colors.primary}
        marginTop={2}
      />
      {/* Stem */}
      <Stack
        width={2}
        height={5}
        backgroundColor={colors.primary}
        position="absolute"
        top={2}
      />
      {/* Base line */}
      <Stack
        width={12}
        height={2}
        backgroundColor={colors.primary}
        borderRadius={1}
        position="absolute"
        bottom={2}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Delete icon (trash can)
// ---------------------------------------------------------------------------

const TrashIcon = React.memo(function TrashIcon() {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      {/* Lid */}
      <Stack
        width={14}
        height={2}
        backgroundColor={colors.red700}
        borderRadius={1}
        position="absolute"
        top={4}
      />
      {/* Handle */}
      <Stack
        width={6}
        height={2}
        backgroundColor={colors.red700}
        borderRadius={1}
        position="absolute"
        top={2}
      />
      {/* Body */}
      <Stack
        width={10}
        height={9}
        borderWidth={1.5}
        borderColor={colors.red700}
        borderTopWidth={0}
        borderBottomLeftRadius={2}
        borderBottomRightRadius={2}
        position="absolute"
        bottom={3}
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function ProgressBar({ progress }: { progress: number }) {
  const clampedProgress = Math.max(0, Math.min(100, progress))

  return (
    <Stack
      height={3}
      borderRadius={2}
      backgroundColor={colors.neutral200}
      marginTop="$1.5"
      overflow="hidden"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      accessibilityLabel={`Upload progress: ${clampedProgress}%`}
    >
      <Stack
        height="100%"
        borderRadius={2}
        backgroundColor={colors.primary}
        width={`${clampedProgress}%`}
      />
    </Stack>
  )
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FileCardProps {
  /** File name displayed as primary text */
  fileName: string
  /** Human-readable file size (e.g. "2.4 MB") */
  fileSize?: string
  /** File extension or MIME type for icon selection (e.g. "pdf", ".xlsx") */
  fileType?: string
  /** URI for thumbnail preview (images only). Overrides the type icon. */
  thumbnailUri?: string
  /** Upload/download progress (0-100). When provided, shows a progress bar. */
  progress?: number
  /** Called when the card body is tapped */
  onPress?: () => void
  /** Called when the delete action is tapped */
  onDelete?: () => void
  /** Called when the download action is tapped */
  onDownload?: () => void
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `FileCard` -- file attachment preview card for OG Assist.
 *
 * Displays a file type icon (derived from extension), file name, size,
 * optional thumbnail preview for images, upload/download progress bar,
 * and download/delete action buttons. Uses a color-coded icon system
 * based on file category for quick visual identification.
 */
export function FileCard({
  fileName,
  fileSize,
  fileType,
  thumbnailUri,
  progress,
  onPress,
  onDelete,
  onDownload,
}: FileCardProps) {
  const category = getFileCategory(fileType, fileName)
  const { bg, fg, label } = FILE_CATEGORY_COLORS[category]

  const handlePress = useCallback(() => {
    onPress?.()
  }, [onPress])

  const handleDelete = useCallback(() => {
    onDelete?.()
  }, [onDelete])

  const handleDownload = useCallback(() => {
    onDownload?.()
  }, [onDownload])

  const isUploading = progress != null && progress >= 0 && progress < 100
  const displayExtension = fileType?.toUpperCase().replace(/^\./, '').slice(0, 4) || label

  return (
    <FileCardFrame
      onPress={handlePress}
      disabled={!onPress}
      accessibilityRole="button"
      accessibilityLabel={`File: ${fileName}${fileSize ? `, ${fileSize}` : ''}${isUploading ? `, uploading ${progress}%` : ''}`}
      opacity={isUploading ? 0.85 : 1}
    >
      {/* File type icon or thumbnail */}
      {thumbnailUri ? (
        <Stack
          width={THUMBNAIL_SIZE}
          height={THUMBNAIL_SIZE}
          borderRadius={6}
          overflow="hidden"
          flexShrink={0}
        >
          <Image
            source={{ uri: thumbnailUri }}
            style={{ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE }}
            resizeMode="cover"
            accessibilityLabel={`Preview of ${fileName}`}
          />
        </Stack>
      ) : (
        <Stack
          width={ICON_CONTAINER_SIZE}
          height={ICON_CONTAINER_SIZE}
          borderRadius={8}
          backgroundColor={bg}
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          <Text
            variant="caption"
            fontWeight="$bold"
            color={fg}
            fontSize={10}
            letterSpacing={0.5}
          >
            {displayExtension}
          </Text>
        </Stack>
      )}

      {/* File info */}
      <VStack flex={1} gap="$0.5" minWidth={0}>
        <Text
          variant="body3"
          fontWeight="$medium"
          numberOfLines={1}
          color={colors.neutral900}
        >
          {fileName}
        </Text>

        {(fileSize || fileType) && (
          <Text variant="caption" color={colors.neutral500} numberOfLines={1}>
            {[fileType?.toUpperCase().replace(/^\./, ''), fileSize].filter(Boolean).join(' \u00b7 ')}
          </Text>
        )}

        {/* Progress bar */}
        {progress != null && <ProgressBar progress={progress} />}
      </VStack>

      {/* Action buttons */}
      <HStack gap="$1" flexShrink={0} alignItems="center">
        {onDownload && !isUploading && (
          <Pressable
            onPress={handleDownload}
            accessibilityRole="button"
            accessibilityLabel={`Download ${fileName}`}
            width={32}
            height={32}
            borderRadius={16}
            alignItems="center"
            justifyContent="center"
            minWidth={32}
            minHeight={32}
          >
            <DownloadIcon />
          </Pressable>
        )}
        {onDelete && (
          <Pressable
            onPress={handleDelete}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${fileName}`}
            width={32}
            height={32}
            borderRadius={16}
            alignItems="center"
            justifyContent="center"
            minWidth={32}
            minHeight={32}
          >
            <TrashIcon />
          </Pressable>
        )}
      </HStack>
    </FileCardFrame>
  )
}
