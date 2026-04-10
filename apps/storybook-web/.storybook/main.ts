import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path from 'path'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          'react-native': 'react-native-web',
          // Resolve workspace packages to source
          '@opengov/cds-tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
          '@opengov/cds-themes': path.resolve(__dirname, '../../../packages/themes/src'),
          '@opengov/cds-config': path.resolve(__dirname, '../../../packages/config/src'),
          '@opengov/cds-primitives': path.resolve(__dirname, '../../../packages/primitives/src'),
          '@opengov/cds-icons': path.resolve(__dirname, '../../../packages/icons/src'),
          '@opengov/cds-components': path.resolve(__dirname, '../../../packages/components/src'),
          '@opengov/cds-patterns': path.resolve(__dirname, '../../../packages/patterns/src'),
        },
      },
    })
  },
}

export default config
