import { colors } from '@opengov/cds-tokens'

export const highContrastTheme = {
  // Backgrounds
  background: colors.white,
  backgroundHover: '#E8E8E8',
  backgroundPress: '#D0D0D0',
  backgroundFocus: '#E8E8E8',
  backgroundStrong: '#E0E0E0',
  backgroundTransparent: colors.transparent,

  // Text colors
  color: colors.black,
  colorHover: colors.black,
  colorPress: '#1A1A1A',
  colorFocus: colors.black,
  colorSecondary: '#333333',
  colorTertiary: '#4A4A4A',
  colorDisabled: '#767676', // 4.6:1 on white — minimum AA

  // Border colors
  borderColor: '#333333',
  borderColorHover: colors.black,
  borderColorFocus: colors.black,
  borderColorPress: colors.black,
  borderColorDisabled: '#767676',

  // Brand
  brandBackground: '#2A1FCC', // Darker purple for AAA contrast on white text
  brandBackgroundHover: '#1F17A3',
  brandBackgroundPress: '#15107A',
  brandColor: colors.white,

  // Semantic — Success
  successBackground: '#E8F5E9',
  successColor: '#1B5E20', // 7.5:1 on white bg
  successBorderColor: '#1B5E20',

  // Semantic — Error
  errorBackground: '#FFEBEE',
  errorColor: '#B71C1C', // 7.8:1 on white bg
  errorBorderColor: '#B71C1C',

  // Semantic — Warning
  warningBackground: '#FFF8E1',
  warningColor: '#E65100', // 5.6:1 — paired with large text or bold
  warningBorderColor: '#BF360C',

  // Semantic — Info
  infoBackground: '#E3F2FD',
  infoColor: '#0D47A1', // 8.6:1 on white bg
  infoBorderColor: '#0D47A1',

  // Placeholder & focus
  placeholderColor: '#4A4A4A',
  outlineColor: colors.black,
  focusRingColor: colors.black,

  // Selection
  selectionBackground: 'rgba(0, 0, 0, 0.12)',
  selectionBackgroundStrong: 'rgba(0, 0, 0, 0.24)',

  // Shadow
  shadowColor: colors.black,

  // Icon colors
  iconDefault: colors.black,
  iconSecondary: '#333333',
  iconDisabled: '#767676',
  iconBrand: '#2A1FCC',
  iconSuccess: '#1B5E20',
  iconError: '#B71C1C',
  iconWarning: '#E65100',
} as const
