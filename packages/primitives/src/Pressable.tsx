import { styled, Stack } from '@tamagui/core'

export const Pressable = styled(Stack, {
  name: 'Pressable',
  tag: 'button',
  role: 'button',
  minWidth: '$touchTarget',
  minHeight: '$touchTarget',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  } as const,
})
