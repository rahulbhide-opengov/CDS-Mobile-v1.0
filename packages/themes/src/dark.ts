import { colors, primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 Dark Theme — from Figma semantic theme (Dark mode)
 */
export const darkTheme = {
  // Backgrounds — from Figma dark mode background tokens
  background: primitive.neutral1000,        // #121212
  backgroundHover: primitive.neutral900,    // #323334
  backgroundPress: primitive.neutral800,    // #494A4C
  backgroundFocus: primitive.neutral900,
  backgroundStrong: primitive.slate900,     // #2B343D — background/secondary dark
  backgroundTransparent: 'transparent',

  // Text — from Figma dark mode text tokens
  color: '#FFFFFF',                         // text/primary dark
  colorHover: primitive.white,
  colorPress: primitive.neutral300,
  colorFocus: '#FFFFFF',
  colorSecondary: '#FFFFFFB2',              // text/secondary dark (70% white)
  colorTertiary: '#FFFFFF61',               // text/disabled dark (38% white)
  colorDisabled: '#FFFFFF61',

  // Borders
  borderColor: primitive.slate800,          // #3F4C58
  borderColorHover: primitive.slate700,     // #546574
  borderColorFocus: primitive.blurple200,   // #D4DDFB — primary/main dark
  borderColorPress: primitive.neutral600,
  borderColorDisabled: primitive.neutral800,

  // Brand — lighter for dark backgrounds (from Figma dark primary)
  brandBackground: primitive.blurple200,    // #D4DDFB — primary/main dark mode
  brandBackgroundHover: primitive.blurple400, // #94A8FF — primary/dark dark mode
  brandBackgroundPress: primitive.brandPrimaryDark,
  brandColor: '#000000DE',                  // primary/contrastText dark

  // Semantic — from Figma dark mode values
  successBackground: '#0C130D',             // success/background dark
  successColor: '#38EE70',                  // success/main dark
  successBorderColor: primitive.green500,

  errorBackground: '#160B0B',               // error/background dark
  errorColor: primitive.red300,             // #F6B7AE — error/main dark
  errorBorderColor: primitive.red600,

  warningBackground: '#191207',             // warning/background dark
  warningColor: '#FBB797',                  // warning/main dark
  warningBorderColor: primitive.amber500,

  infoBackground: '#071318',               // info/background dark
  infoColor: primitive.cerulean300,        // #4CDEFA — info/main dark
  infoBorderColor: primitive.teal500,

  // Placeholder & focus
  placeholderColor: '#FFFFFF61',            // text/disabled dark
  outlineColor: primitive.blurple200,
  focusRingColor: primitive.blurple200,

  // Selection
  selectionBackground: '#FFFFFF14',         // action/hover dark
  selectionBackgroundStrong: 'rgba(110, 100, 255, 0.24)',

  // Shadow
  shadowColor: primitive.black,

  // Icon colors
  iconDefault: '#FFFFFF8F',                // action/active dark
  iconSecondary: '#FFFFFFB2',
  iconDisabled: '#FFFFFF61',
  iconBrand: primitive.blurple200,
  iconSuccess: '#38EE70',
  iconError: primitive.red300,
  iconWarning: '#FBB797',
} as const
