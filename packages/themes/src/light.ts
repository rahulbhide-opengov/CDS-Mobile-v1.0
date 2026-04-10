import { colors } from '@opengov/cds-tokens'

export const lightTheme = {
  // Backgrounds
  background: colors.white,
  backgroundHover: colors.neutral50,
  backgroundPress: colors.neutral100,
  backgroundFocus: colors.neutral50,
  backgroundStrong: colors.neutral100,
  backgroundTransparent: colors.transparent,

  // Text colors
  color: colors.neutral1000,
  colorHover: colors.black,
  colorPress: colors.neutral700,
  colorFocus: colors.neutral1000,
  colorSecondary: colors.neutral500,
  colorTertiary: colors.neutral400,
  colorDisabled: colors.neutral400,

  // Border colors
  borderColor: colors.neutral200,
  borderColorHover: colors.neutral300,
  borderColorFocus: colors.primary,
  borderColorPress: colors.neutral400,
  borderColorDisabled: colors.neutral200,

  // Brand
  brandBackground: colors.primary,
  brandBackgroundHover: colors.primaryLight,
  brandBackgroundPress: colors.primaryDark,
  brandColor: colors.white,

  // Semantic — Success
  successBackground: colors.jade50,
  successColor: colors.jade700,
  successBorderColor: colors.jade500,

  // Semantic — Error
  errorBackground: colors.red50,
  errorColor: colors.red700,
  errorBorderColor: colors.red500,

  // Semantic — Warning
  warningBackground: colors.amber50,
  warningColor: colors.amber700,
  warningBorderColor: colors.amber500,

  // Semantic — Info
  infoBackground: colors.ogBlue50,
  infoColor: colors.ogBlue700,
  infoBorderColor: colors.ogBlue500,

  // Placeholder & focus
  placeholderColor: colors.neutral400,
  outlineColor: colors.primary,
  focusRingColor: colors.primary,

  // Selection
  selectionBackground: 'rgba(75, 63, 255, 0.08)',
  selectionBackgroundStrong: 'rgba(75, 63, 255, 0.16)',

  // Shadow
  shadowColor: colors.black,

  // Icon colors
  iconDefault: colors.neutral700,
  iconSecondary: colors.neutral500,
  iconDisabled: colors.neutral400,
  iconBrand: colors.primary,
  iconSuccess: colors.jade700,
  iconError: colors.red700,
  iconWarning: colors.amber700,
} as const
