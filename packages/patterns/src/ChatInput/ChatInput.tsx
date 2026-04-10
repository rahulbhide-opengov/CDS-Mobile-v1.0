import React, { useCallback, useRef, useState } from 'react'
import { TextInput, Animated, Easing, Platform } from 'react-native'
import { styled, Stack, type GetProps } from '@tamagui/core'
import { Text, HStack, VStack, Pressable } from '@opengov/cds-primitives'
import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum number of visible lines before scrolling */
const MAX_LINES = 5
/** Approximate line height for the input text at fontSize 16 */
const LINE_HEIGHT = 22
/** Single-line input height */
const SINGLE_LINE_HEIGHT = 36
/** Maximum height (MAX_LINES * LINE_HEIGHT + padding) */
const MAX_INPUT_HEIGHT = MAX_LINES * LINE_HEIGHT + 16
/** Button size for send / attach */
const BUTTON_SIZE = 36

// ---------------------------------------------------------------------------
// Styled primitives
// ---------------------------------------------------------------------------

const InputContainer = styled(HStack, {
  name: 'ChatInputContainer',
  backgroundColor: colors.white,
  borderTopWidth: 1,
  borderTopColor: colors.neutral200,
  paddingHorizontal: '$3',
  paddingVertical: '$2',
  alignItems: 'flex-end',
  gap: '$2',
})

// ---------------------------------------------------------------------------
// Send arrow icon (pure Stack-based, no SVG dependency at pattern level)
// ---------------------------------------------------------------------------

const SendArrow = React.memo(function SendArrow({ color }: { color: string }) {
  return (
    <Stack width={16} height={16} alignItems="center" justifyContent="center">
      {/* Upward-pointing triangle arrow */}
      <Stack
        width={0}
        height={0}
        borderLeftWidth={5}
        borderRightWidth={5}
        borderBottomWidth={8}
        borderLeftColor="transparent"
        borderRightColor="transparent"
        borderBottomColor={color}
        marginBottom={1}
      />
      {/* Stem */}
      <Stack width={2} height={6} backgroundColor={color} marginTop={-1} />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Attachment icon (plus in circle)
// ---------------------------------------------------------------------------

const AttachIcon = React.memo(function AttachIcon() {
  return (
    <Stack width={20} height={20} alignItems="center" justifyContent="center">
      {/* Horizontal bar */}
      <Stack
        width={14}
        height={2}
        backgroundColor={colors.neutral500}
        borderRadius={1}
        position="absolute"
      />
      {/* Vertical bar */}
      <Stack
        width={2}
        height={14}
        backgroundColor={colors.neutral500}
        borderRadius={1}
        position="absolute"
      />
    </Stack>
  )
})

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatInputProps {
  /** Controlled value of the text input */
  value?: string
  /** Called on every text change */
  onChangeText?: (text: string) => void
  /** Called when the user taps the send button. Receives the trimmed message. */
  onSend?: (message: string) => void
  /** Called when the attachment button is tapped */
  onAttach?: () => void
  /** Placeholder text shown in the empty input */
  placeholder?: string
  /** Maximum character count. When set, shows a character counter. */
  maxLength?: number
  /** Whether the input and send button are disabled */
  disabled?: boolean
  /** Whether to show the attachment button */
  showAttachment?: boolean
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * `ChatInput` -- message composer bar for OG Assist chat.
 *
 * Features a multi-line expandable TextInput (up to 5 lines), an optional
 * attachment button, optional character limit indicator, and a send button
 * that enables/disables based on input content. Designed to sit at the
 * bottom of a chat screen with a border-top separator.
 */
export function ChatInput({
  value = '',
  onChangeText,
  onSend,
  onAttach,
  placeholder = 'Type a message...',
  maxLength,
  disabled = false,
  showAttachment = true,
}: ChatInputProps) {
  const inputRef = useRef<TextInput>(null)
  const [inputHeight, setInputHeight] = useState(SINGLE_LINE_HEIGHT)

  // Scale animation for the send button
  const sendScale = useRef(new Animated.Value(1)).current

  const trimmedValue = value.trim()
  const canSend = trimmedValue.length > 0 && !disabled

  // ---- Handlers -----------------------------------------------------------

  const handleContentSizeChange = useCallback(
    (event: { nativeEvent: { contentSize: { height: number } } }) => {
      const contentHeight = event.nativeEvent.contentSize.height
      const newHeight = Math.min(Math.max(contentHeight, SINGLE_LINE_HEIGHT), MAX_INPUT_HEIGHT)
      setInputHeight(newHeight)
    },
    [],
  )

  const handleSend = useCallback(() => {
    if (!canSend || !onSend) return

    // Brief scale-down animation on tap
    Animated.sequence([
      Animated.timing(sendScale, {
        toValue: 0.85,
        duration: 80,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(sendScale, {
        toValue: 1,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start()

    onSend(trimmedValue)
  }, [canSend, onSend, trimmedValue, sendScale])

  const handleChangeText = useCallback(
    (text: string) => {
      if (disabled) return
      if (maxLength != null && text.length > maxLength) return
      onChangeText?.(text)
    },
    [disabled, maxLength, onChangeText],
  )

  // ---- Derived values -----------------------------------------------------

  const characterCount = value.length
  const showCharCounter = maxLength != null && maxLength > 0
  const isNearLimit = maxLength != null && characterCount >= maxLength * 0.9
  const isAtLimit = maxLength != null && characterCount >= maxLength

  // ---- Render -------------------------------------------------------------

  return (
    <VStack>
      {/* Character counter row */}
      {showCharCounter && characterCount > 0 && (
        <HStack
          justifyContent="flex-end"
          paddingHorizontal="$4"
          paddingVertical="$1"
          backgroundColor={colors.white}
        >
          <Text
            variant="caption"
            color={isAtLimit ? '$errorColor' : isNearLimit ? '$warningColor' : '$colorSecondary'}
          >
            {characterCount}/{maxLength}
          </Text>
        </HStack>
      )}

      <InputContainer>
        {/* Attachment button */}
        {showAttachment && onAttach && (
          <Pressable
            onPress={onAttach}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel="Add attachment"
            width={BUTTON_SIZE}
            height={BUTTON_SIZE}
            borderRadius={BUTTON_SIZE / 2}
            alignItems="center"
            justifyContent="center"
            opacity={disabled ? 0.4 : 1}
          >
            <AttachIcon />
          </Pressable>
        )}

        {/* Expandable text input */}
        <Stack
          flex={1}
          backgroundColor={colors.neutral50}
          borderRadius={20}
          paddingHorizontal="$4"
          paddingVertical="$2"
          justifyContent="center"
        >
          <TextInput
            ref={inputRef}
            style={{
              fontSize: 16,
              lineHeight: LINE_HEIGHT,
              fontFamily: Platform.OS === 'ios' ? 'DM Sans' : 'Roboto',
              color: disabled ? colors.neutral400 : colors.neutral900,
              padding: 0,
              margin: 0,
              maxHeight: MAX_INPUT_HEIGHT,
              height: inputHeight,
              textAlignVertical: 'center',
            }}
            value={value}
            onChangeText={handleChangeText}
            onContentSizeChange={handleContentSizeChange}
            placeholder={placeholder}
            placeholderTextColor={colors.neutral400}
            editable={!disabled}
            multiline
            maxLength={maxLength}
            scrollEnabled={inputHeight >= MAX_INPUT_HEIGHT}
            textAlignVertical="center"
            returnKeyType="default"
            blurOnSubmit={false}
            accessibilityLabel={placeholder}
            accessibilityState={{ disabled }}
            accessibilityHint="Type your message here"
          />
        </Stack>

        {/* Send button */}
        <Animated.View style={{ transform: [{ scale: sendScale }] }}>
          <Pressable
            onPress={handleSend}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            accessibilityState={{ disabled: !canSend }}
            width={BUTTON_SIZE}
            height={BUTTON_SIZE}
            borderRadius={BUTTON_SIZE / 2}
            backgroundColor={canSend ? colors.primary : colors.neutral300}
            alignItems="center"
            justifyContent="center"
            minWidth={BUTTON_SIZE}
            minHeight={BUTTON_SIZE}
          >
            <SendArrow color={canSend ? primitive.white : colors.neutral500} />
          </Pressable>
        </Animated.View>
      </InputContainer>
    </VStack>
  )
}
