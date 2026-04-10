import { colors, primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 Light Theme
 *
 * All values reference the CDS palette via `colors` or `primitive` imports.
 * No hardcoded hex values outside the token system.
 */
export const lightTheme = {
  // Backgrounds
  background: primitive.white,
  backgroundHover: primitive.neutral50,
  backgroundPress: primitive.neutral100,
  backgroundFocus: primitive.neutral50,
  backgroundStrong: primitive.neutral100,
  backgroundTransparent: 'transparent',

  // Text colors
  color: primitive.neutral1000,
  colorHover: primitive.black,
  colorPress: primitive.neutral700,
  colorFocus: primitive.neutral1000,
  colorSecondary: primitive.neutral500,
  colorTertiary: primitive.neutral400,
  colorDisabled: primitive.neutral400,

  // Border colors
  borderColor: primitive.neutral200,
  borderColorHover: primitive.neutral300,
  borderColorFocus: primitive.brandPrimary,
  borderColorPress: primitive.neutral400,
  borderColorDisabled: primitive.neutral200,

  // Brand
  brandBackground: primitive.brandPrimary,
  brandBackgroundHover: primitive.brandPrimaryLight,
  brandBackgroundPress: primitive.brandPrimaryDark,
  brandColor: primitive.white,

  // Semantic — Success
  successBackground: primitive.green50,
  successColor: primitive.green700,
  successBorderColor: primitive.green500,

  // Semantic — Error
  errorBackground: primitive.red50,
  errorColor: primitive.red700,
  errorBorderColor: primitive.red500,

  // Semantic — Warning
  warningBackground: primitive.amber50,
  warningColor: primitive.amber700,
  warningBorderColor: primitive.amber500,

  // Semantic — Info
  infoBackground: primitive.blue50,
  infoColor: primitive.blue700,
  infoBorderColor: primitive.blue500,

  // Placeholder & focus
  placeholderColor: primitive.neutral400,
  outlineColor: primitive.brandPrimary,
  focusRingColor: primitive.brandPrimary,

  // Selection
  selectionBackground: 'rgba(75, 63, 255, 0.08)',
  selectionBackgroundStrong: 'rgba(75, 63, 255, 0.16)',

  // Shadow
  shadowColor: primitive.black,

  // Icon colors
  iconDefault: primitive.neutral700,
  iconSecondary: primitive.neutral500,
  iconDisabled: primitive.neutral400,
  iconBrand: primitive.brandPrimary,
  iconSuccess: primitive.green700,
  iconError: primitive.red700,
  iconWarning: primitive.amber700,
} as const
