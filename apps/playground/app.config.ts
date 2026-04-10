import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'CDS Mobile Playground',
  slug: 'cds-mobile-playground',
  version: '0.1.0',
  orientation: 'default',
  userInterfaceStyle: 'automatic',
  ios: {
    bundleIdentifier: 'com.opengov.cds.playground',
    supportsTablet: true,
  },
  android: {
    package: 'com.opengov.cds.playground',
    adaptiveIcon: {
      backgroundColor: '#4B3FFF',
    },
  },
}

export default config
