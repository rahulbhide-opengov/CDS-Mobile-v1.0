import React, { useCallback } from 'react'
import { Image } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'

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
  document:     { bg: '#EBF0FF', fg: '#1E55FF', label: 'DOC' },   // ogBlue50 / ogBlue500
  spreadsheet:  { bg: '#E8F5E9', fg: '#388E3C', label: 'XLS' },   // jade50 / jade700
  presentation: { bg: '#FFF8E1', fg: '#FFA000', label: 'PPT' },   // amber50 / amber700
  image:        { bg: '#F3E5F5', fg: '#9C27B0', label: 'IMG' },   // port50 / port500
  video:        { bg: '#FFF0F3', fg: '#E91E63', label: 'VID' },   // rose50 / rose500
  audio:        { bg: '#E0F7FA', fg: '#00796B', label: 'AUD' },   // teal50 / teal700
  archive:      { bg: '#FFF8E1', fg: '#FFA000', label: 'ZIP' },   // amber50 / amber700
  code:         { bg: '#F5F5F5', fg: '#616161', label: 'CODE' },  // neutral100 / neutral700
  unknown:      { bg: '#F5F5F5', fg: '#9E9E9E', label: 'FILE' },  // neutral100 / neutral500
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
  backgroundColor: '#FFFFFF',
  borderRadius: 8, // radii.lg
  borderWidth: 1,
  borderColor: '#EEEEEE', // neutral200
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
        borderTopColor="#4B3FFF"
        marginTop={2}
      />
      {/* Stem */}
      <Stack
        width={2}
        height={5}
        backgroundColor="#4B3FFF"
        position="absolute"
        top={2}
      />
      {/* Base line */}
      <Stack
        width={12}
        height={2}
        backgroundColor="#4B3FFF"
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
        backgroundColor="#991F1F" // red700
        borderRadius={1}
        position="absolute"
        top={4}
      />
      {/* Handle */}
      <Stack
        width={6}
        height={2}
        backgroundColor="#991F1F"
        borderRadius={1}
        position="absolute"
        top={2}
      />
      {/* Body */}
      <Stack
        width={10}
        height={9}
        borderWidth={1.5}
        borderColor="#991F1F"
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
      backgroundColor="#EEEEEE" // neutral200
      marginTop="$1.5"
      overflow="hidden"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      accessibilityLabel={`Upload progress: ${clampedProgress}%`}
    >
      <Stack
        height="100%"
        borderRadius={2}
        backgroundColor="#4B3FFF" // primary
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
          color="#212121" // neutral1000
        >
          {fileName}
        </Text>

        {(fileSize || fileType) && (
          <Text variant="caption" color="#9E9E9E" numberOfLines={1}>
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
