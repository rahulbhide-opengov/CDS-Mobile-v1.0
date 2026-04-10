import { colors } from '@opengov/cds-tokens'

export const darkTheme = {
  // Backgrounds
  background: '#121212',
  backgroundHover: '#1E1E1E',
  backgroundPress: '#2C2C2C',
  backgroundFocus: '#1E1E1E',
  backgroundStrong: '#2C2C2C',
  backgroundTransparent: 'transparent',

  // Text colors
  color: '#FAFAFA',
  colorHover: colors.white,
  colorPress: '#E0E0E0',
  colorFocus: '#FAFAFA',
  colorSecondary: '#B0B0B0',
  colorTertiary: '#808080',
  colorDisabled: '#606060',

  // Border colors
  borderColor: '#333333',
  borderColorHover: '#444444',
  borderColorFocus: colors.primaryLight,
  borderColorPress: '#555555',
  borderColorDisabled: '#2C2C2C',

  // Brand
  brandBackground: colors.primaryLight,
  brandBackgroundHover: colors.primary,
  brandBackgroundPress: '#8A82FF',
  brandColor: colors.white,

  // Semantic — Success
  successBackground: '#1B3A1B',
  successColor: '#81C784',
  successBorderColor: '#4CAF50',

  // Semantic — Error
  errorBackground: '#3A1B1B',
  errorColor: '#EF9A9A',
  errorBorderColor: '#EF5350',

  // Semantic — Warning
  warningBackground: '#3A351B',
  warningColor: '#FFD54F',
  warningBorderColor: '#FFB300',

  // Semantic — Info
  infoBackground: '#1B2A3A',
  infoColor: '#90CAF9',
  infoBorderColor: '#42A5F5',

  // Placeholder & focus
  placeholderColor: '#606060',
  outlineColor: colors.primaryLight,
  focusRingColor: colors.primaryLight,

  // Selection
  selectionBackground: 'rgba(110, 100, 255, 0.12)',
  selectionBackgroundStrong: 'rgba(110, 100, 255, 0.24)',

  // Shadow
  shadowColor: '#000000',

  // Icon colors
  iconDefault: '#B0B0B0',
  iconSecondary: '#808080',
  iconDisabled: '#606060',
  iconBrand: colors.primaryLight,
  iconSuccess: '#81C784',
  iconError: '#EF9A9A',
  iconWarning: '#FFD54F',
} as const
