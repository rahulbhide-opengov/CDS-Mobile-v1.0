import React from 'react'
import { styled, Stack, useTheme, type GetProps } from '@tamagui/core'
import Svg, { Path, type SvgProps } from 'react-native-svg'

const IconFrame = styled(Stack, {
  name: 'Icon',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      sm: { width: 16, height: 16 },
      md: { width: 20, height: 20 },
      lg: { width: 24, height: 24 },
      xl: { width: 32, height: 32 },
    },
  } as const,

  defaultVariants: {
    size: 'lg',
  },
})

type IconSize = 'sm' | 'md' | 'lg' | 'xl'

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export interface IconProps {
  size?: IconSize
  color?: string
  accessibilityLabel?: string
  children: (props: { size: number; color: string }) => React.ReactNode
}

export function Icon({ size = 'lg', color, accessibilityLabel, children }: IconProps) {
  const theme = useTheme()
  const resolvedColor = color || theme.iconDefault?.val || '#616161'
  const resolvedSize = sizeMap[size]

  return (
    <IconFrame
      size={size}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      {children({ size: resolvedSize, color: resolvedColor })}
    </IconFrame>
  )
}
