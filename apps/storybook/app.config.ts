import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'CDS Mobile Storybook',
  slug: 'cds-mobile-storybook',
  version: '0.1.0',
  orientation: 'default',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'com.opengov.cds.storybook',
    supportsTablet: true,
  },
  android: {
    package: 'com.opengov.cds.storybook',
    adaptiveIcon: {
      backgroundColor: '#4B3FFF',
    },
  },
}

export default config
