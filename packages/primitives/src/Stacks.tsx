import { styled, Stack } from '@tamagui/core'

export const HStack = styled(Stack, {
  name: 'HStack',
  flexDirection: 'row',
  alignItems: 'center',
})

export const VStack = styled(Stack, {
  name: 'VStack',
  flexDirection: 'column',
})

export const ZStack = styled(Stack, {
  name: 'ZStack',
  position: 'relative',
  variants: {
    fullscreen: {
      true: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
  } as const,
})

export const Center = styled(Stack, {
  name: 'Center',
  alignItems: 'center',
  justifyContent: 'center',
})
