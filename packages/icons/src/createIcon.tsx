import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon, type IconProps } from './Icon'

export interface CreateIconOptions {
  name: string
  path: string
  viewBox?: string
  defaultAccessibilityLabel?: string
}

export function createIcon({
  name,
  path,
  viewBox = '0 0 24 24',
  defaultAccessibilityLabel,
}: CreateIconOptions) {
  const IconComponent = React.memo(function IconComponent({
    size = 'lg',
    color,
    accessibilityLabel = defaultAccessibilityLabel || name,
  }: Omit<IconProps, 'children'>) {
    return (
      <Icon size={size} color={color} accessibilityLabel={accessibilityLabel}>
        {({ size: s, color: c }) => (
          <Svg width={s} height={s} viewBox={viewBox} fill="none">
            <Path d={path} fill={c} />
          </Svg>
        )}
      </Icon>
    )
  })

  IconComponent.displayName = `Icon${name}`
  return IconComponent
}
