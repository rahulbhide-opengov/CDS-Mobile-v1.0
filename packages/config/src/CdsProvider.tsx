import React from 'react'
import { TamaguiProvider, type TamaguiProviderProps } from '@tamagui/core'
import { config } from './tamagui.config'

export type CdsTheme = 'light' | 'dark' | 'light_high_contrast'

export interface CdsProviderProps {
  theme?: CdsTheme
  children: React.ReactNode
}

export function CdsProvider({ theme = 'light', children }: CdsProviderProps) {
  return (
    <TamaguiProvider config={config} defaultTheme={theme}>
      {children}
    </TamaguiProvider>
  )
}
