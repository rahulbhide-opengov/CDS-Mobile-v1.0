import type { StorybookConfig } from '@storybook/react-native'

const main: StorybookConfig = {
  stories: [
    '../../packages/components/src/**/*.stories.tsx',
    '../../packages/patterns/src/**/*.stories.tsx',
    '../../packages/primitives/src/**/*.stories.tsx',
    '../stories/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
}

export default main
