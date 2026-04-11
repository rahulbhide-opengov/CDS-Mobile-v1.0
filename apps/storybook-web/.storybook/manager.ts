import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming/create'

const cdsTheme = create({
  base: 'light',

  // Brand
  brandTitle: 'CDS Mobile',
  brandUrl: 'https://github.com/rahulbhide-opengov/CDS-Mobile-v1.0',

  // Colors
  colorPrimary: '#4B3FFF',
  colorSecondary: '#4B3FFF',

  // UI
  appBg: '#F8F8F8',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#DDDEDE',
  appBorderRadius: 8,

  // Text
  textColor: 'rgba(0,0,0,0.87)',
  textInverseColor: '#FFFFFF',
  textMutedColor: 'rgba(0,0,0,0.6)',

  // Toolbar
  barTextColor: 'rgba(0,0,0,0.6)',
  barSelectedColor: '#4B3FFF',
  barHoverColor: '#4B3FFF',
  barBg: '#FFFFFF',

  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#DDDEDE',
  inputTextColor: 'rgba(0,0,0,0.87)',
  inputBorderRadius: 4,

  // Typography
  fontBase: "'DM Sans', system-ui, -apple-system, sans-serif",
  fontCode: "'DM Mono', 'SF Mono', monospace",
})

addons.setConfig({
  theme: cdsTheme,
  sidebar: {
    showRoots: true,
  },
})
