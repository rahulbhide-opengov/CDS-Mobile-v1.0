import { ExpoConfig } from 'expo/config'

// Allow GitHub Pages subpath override via env (set in CI)
const baseUrl = process.env.EXPO_BASE_URL ?? ''

const config: ExpoConfig = {
  name: 'CDS Mobile Preview',
  slug: 'cds-mobile-preview',
  version: '0.1.0',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: undefined,
  },
  scheme: 'cds-preview',
  experiments: {
    baseUrl,
  },
}

export default config
