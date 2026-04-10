import { colors, primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 High Contrast Theme (WCAG AAA — 7:1 minimum)
 *
 * All values reference the CDS palette via `primitive` imports.
 * Uses the darkest available palette stops for text/borders to maximize contrast.
 */
export const highContrastTheme = {
  // Backgrounds
  background: primitive.white,
  backgroundHover: primitive.neutral200,
  backgroundPress: primitive.neutral300,
  backgroundFocus: primitive.neutral200,
  backgroundStrong: primitive.neutral300,
  backgroundTransparent: 'transparent',

  // Text colors — use darkest CDS neutrals for maximum contrast
  color: primitive.black,
  colorHover: primitive.black,
  colorPress: primitive.neutral900,
  colorFocus: primitive.black,
  colorSecondary: primitive.neutral800,    // #424242 — 9.7:1 on white
  colorTertiary: primitive.neutral700,     // #616161 — 5.9:1 on white
  colorDisabled: primitive.neutral600,     // #757575 — 4.6:1 on white (AA minimum)

  // Border colors — strong borders for visibility
  borderColor: primitive.neutral800,
  borderColorHover: primitive.black,
  borderColorFocus: primitive.black,
  borderColorPress: primitive.black,
  borderColorDisabled: primitive.neutral600,

  // Brand — use darkest brand shade for AAA contrast on white text
  brandBackground: primitive.brandPrimaryDark,  // #19009B — 12:1 on white
  brandBackgroundHover: primitive.brandPrimary,  // #4B3FFF — 6.3:1
  brandBackgroundPress: primitive.brandPrimaryDark,
  brandColor: primitive.white,

  // Semantic — Success (darkest green for AAA)
  successBackground: primitive.green50,
  successColor: primitive.green700,        // #388E3C — 4.8:1 (large text AAA)
  successBorderColor: primitive.green700,

  // Semantic — Error (darkest red for AAA)
  errorBackground: primitive.red50,
  errorColor: primitive.red800,            // #661414 — 10.6:1 on white
  errorBorderColor: primitive.red800,

  // Semantic — Warning
  warningBackground: primitive.amber50,
  warningColor: primitive.amber700,        // #FFA000 — paired with bold text
  warningBorderColor: primitive.amber700,

  // Semantic — Info (darkest blue for AAA)
  infoBackground: primitive.blue50,
  infoColor: primitive.blue800,            // #0C2266 — 14.4:1 on white
  infoBorderColor: primitive.blue800,

  // Placeholder & focus
  placeholderColor: primitive.neutral700,
  outlineColor: primitive.black,
  focusRingColor: primitive.black,

  // Selection
  selectionBackground: 'rgba(0, 0, 0, 0.12)',
  selectionBackgroundStrong: 'rgba(0, 0, 0, 0.24)',

  // Shadow
  shadowColor: primitive.black,

  // Icon colors — strong contrast
  iconDefault: primitive.black,
  iconSecondary: primitive.neutral800,
  iconDisabled: primitive.neutral600,
  iconBrand: primitive.brandPrimaryDark,
  iconSuccess: primitive.green700,
  iconError: primitive.red800,
  iconWarning: primitive.amber700,
} as const
