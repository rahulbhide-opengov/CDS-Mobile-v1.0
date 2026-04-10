import { colors, primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 Light Theme — exact Figma semantic theme values
 *
 * Source: CDS 37 Figma Semantic Theme collection (Light mode)
 */
export const lightTheme = {
  // Backgrounds — from Figma background tokens
  background: primitive.white,              // background/default
  backgroundHover: primitive.neutral50,     // #F8F8F8
  backgroundPress: primitive.neutral100,    // #F2F2F2
  backgroundFocus: primitive.neutral50,
  backgroundStrong: primitive.neutral100,   // background/tertiary
  backgroundTransparent: 'transparent',

  // Text — from Figma text tokens (rgba with opacity)
  color: '#000000DE',                       // text/primary (87% black)
  colorHover: primitive.black,
  colorPress: primitive.neutral700,
  colorFocus: '#000000DE',
  colorSecondary: '#00000099',              // text/secondary (60% black)
  colorTertiary: '#00000061',               // text/disabled (38% black)
  colorDisabled: '#00000061',

  // Borders — from Figma input/outlined tokens
  borderColor: primitive.slate700,          // #546574 — standard/enabledBorder
  borderColorHover: primitive.slate800,     // #3F4C58
  borderColorFocus: primitive.brandPrimary, // #4B3FFF
  borderColorPress: primitive.slate900,
  borderColorDisabled: primitive.neutral200,

  // Brand
  brandBackground: primitive.brandPrimary,          // #4B3FFF
  brandBackgroundHover: primitive.brandPrimaryLight, // #7589FF
  brandBackgroundPress: primitive.brandPrimaryDark,  // #19009B
  brandColor: primitive.white,

  // Semantic — Success (CDS 37 green)
  successBackground: primitive.green50,     // #EFFDF1
  successColor: primitive.green700,         // #037730
  successBorderColor: primitive.green500,   // #08A847

  // Semantic — Error (CDS 37 red)
  errorBackground: primitive.red50,         // #FCF7F7
  errorColor: primitive.red700,             // #B12525
  errorBorderColor: primitive.red600,       // #D33423

  // Semantic — Warning (CDS 37 orange/yellow)
  warningBackground: primitive.amber50,     // #FDF7F4
  warningColor: primitive.amber700,         // #885604
  warningBorderColor: primitive.amber500,   // #E69E04

  // Semantic — Info (CDS 37 cerulean)
  infoBackground: primitive.teal50,         // #F1FAFC
  infoColor: primitive.teal700,             // #0E6F7F
  infoBorderColor: primitive.teal500,       // #16A7BF

  // Placeholder & focus
  placeholderColor: '#00000099',            // text/secondary
  outlineColor: primitive.brandPrimary,
  focusRingColor: primitive.brandPrimary,

  // Selection — from Figma action tokens
  selectionBackground: '#0000000A',         // action/hover
  selectionBackgroundStrong: 'rgba(75, 63, 255, 0.16)',

  // Shadow
  shadowColor: primitive.black,

  // Icon colors
  iconDefault: primitive.slate700,          // #546574
  iconSecondary: primitive.neutral500,
  iconDisabled: '#00000061',                // 38% black
  iconBrand: primitive.brandPrimary,
  iconSuccess: primitive.green700,
  iconError: primitive.red700,
  iconWarning: primitive.amber700,
} as const
