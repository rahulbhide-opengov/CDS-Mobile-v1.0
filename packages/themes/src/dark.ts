import { colors, primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 Dark Theme
 *
 * Uses ONLY colors from the CDS palette (primitive tokens).
 * Dark surfaces use the neutral scale inverted; brand colors
 * shift to the lighter variant for sufficient contrast on dark backgrounds.
 */
export const darkTheme = {
  // Backgrounds — using CDS neutral scale (inverted)
  background: primitive.neutral1000,       // #121212
  backgroundHover: primitive.neutral900,   // #212121
  backgroundPress: primitive.neutral800,   // #424242
  backgroundFocus: primitive.neutral900,   // #212121
  backgroundStrong: primitive.neutral800,  // #424242
  backgroundTransparent: 'transparent',

  // Text colors — using CDS neutral scale
  color: primitive.neutral50,              // #FAFAFA
  colorHover: primitive.white,             // #FFFFFF
  colorPress: primitive.neutral300,        // #E0E0E0
  colorFocus: primitive.neutral50,         // #FAFAFA
  colorSecondary: primitive.neutral400,    // #BDBDBD
  colorTertiary: primitive.neutral500,     // #9E9E9E
  colorDisabled: primitive.neutral600,     // #757575

  // Border colors — using CDS neutral scale
  borderColor: primitive.neutral800,       // #424242
  borderColorHover: primitive.neutral700,  // #616161
  borderColorFocus: primitive.brandPrimaryLight,  // #7C73FF
  borderColorPress: primitive.neutral600,  // #757575
  borderColorDisabled: primitive.neutral800, // #424242

  // Brand — lighter variant for dark bg contrast
  brandBackground: primitive.brandPrimaryLight,   // #7C73FF
  brandBackgroundHover: primitive.brandPrimary,    // #4B3FFF
  brandBackgroundPress: primitive.brandPrimaryDark, // #19009B
  brandColor: primitive.white,

  // Semantic — Success (CDS green scale)
  successBackground: primitive.green50,    // #E8F5E9 (very muted on dark)
  successColor: primitive.green500,        // #4CAF50
  successBorderColor: primitive.green500,  // #4CAF50

  // Semantic — Error (CDS red scale)
  errorBackground: primitive.red50,        // #FFF0F0
  errorColor: primitive.red500,            // #FF3333
  errorBorderColor: primitive.red500,      // #FF3333

  // Semantic — Warning (CDS amber scale)
  warningBackground: primitive.amber50,    // #FFF8E1
  warningColor: primitive.amber500,        // #FFC107
  warningBorderColor: primitive.amber500,  // #FFC107

  // Semantic — Info (CDS blue scale)
  infoBackground: primitive.blue50,        // #EBF0FF
  infoColor: primitive.blue400,            // #4774FF
  infoBorderColor: primitive.blue500,      // #1E55FF

  // Placeholder & focus
  placeholderColor: primitive.neutral600,   // #757575
  outlineColor: primitive.brandPrimaryLight,
  focusRingColor: primitive.brandPrimaryLight,

  // Selection — using brand primary with opacity
  selectionBackground: 'rgba(75, 63, 255, 0.12)',
  selectionBackgroundStrong: 'rgba(75, 63, 255, 0.24)',

  // Shadow
  shadowColor: primitive.black,

  // Icon colors — CDS neutral scale
  iconDefault: primitive.neutral400,       // #BDBDBD
  iconSecondary: primitive.neutral500,     // #9E9E9E
  iconDisabled: primitive.neutral600,      // #757575
  iconBrand: primitive.brandPrimaryLight,  // #7C73FF
  iconSuccess: primitive.green500,         // #4CAF50
  iconError: primitive.red500,             // #FF3333
  iconWarning: primitive.amber500,         // #FFC107
} as const
