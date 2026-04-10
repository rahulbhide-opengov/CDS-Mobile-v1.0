import { ExpoConfig } from 'expo/config'

const config: ExpoConfig = {
  name: 'CDS Mobile Preview',
  slug: 'cds-mobile-preview',
  version: '0.1.0',
  web: {
    bundler: 'metro',
    output: 'static',
  },
  scheme: 'cds-preview',
}

export default config
