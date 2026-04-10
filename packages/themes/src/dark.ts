import { primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 Dark Theme -- Figma Semantic Theme collection (Dark mode)
 *
 * Source: Figma file MxdeZ8e13qSmlenBVMmzzI
 *        Semantic Theme collection, Dark mode
 *
 * Dark mode inverts the lightness scale: main colors use the 200-300 range
 * for readability on dark surfaces, backgrounds use deep slate/gray values,
 * and contrast text flips to dark-on-light.
 */
export const darkTheme = {
  // ---------------------------------------------------------------------------
  // Backgrounds (Figma dark: background/*)
  // ---------------------------------------------------------------------------
  background: primitive.slateA200,             // Figma: Colors/slate/A100 -> #13181D
  backgroundHover: primitive.slate900,         // bgSecondary dark
  backgroundPress: primitive.slate800,         // bgTertiary dark
  backgroundFocus: primitive.slate900,
  backgroundStrong: primitive.slate800,        // bgTertiary dark
  backgroundTransparent: 'transparent',

  // Paper / elevation surfaces
  backgroundPaper: '#121212',                  // bgPaperElevation0 dark
  backgroundPaperElevated: '#121212',          // bgPaperElevation1 dark

  // ---------------------------------------------------------------------------
  // Text (Figma dark: text/*)
  // ---------------------------------------------------------------------------
  color: '#FFFFFF',                            // textPrimary dark
  colorHover: '#FFFFFF',
  colorPress: 'rgba(255,255,255,0.7)',
  colorFocus: '#FFFFFF',
  colorSecondary: 'rgba(255,255,255,0.7)',     // textSecondary dark
  colorTertiary: 'rgba(255,255,255,0.38)',     // textDisabled dark
  colorDisabled: 'rgba(255,255,255,0.38)',     // textDisabled dark

  // ---------------------------------------------------------------------------
  // Borders
  // ---------------------------------------------------------------------------
  borderColor: primitive.slate800,
  borderColorHover: primitive.slate700,
  borderColorFocus: primitive.blurple200,      // primaryMain dark
  borderColorPress: primitive.slate600,
  borderColorDisabled: 'rgba(255,255,255,0.12)',

  // ---------------------------------------------------------------------------
  // Brand / Primary dark (Figma dark: primary/*)
  // ---------------------------------------------------------------------------
  brandBackground: primitive.blurple200,       // primaryMain dark
  brandBackgroundHover: primitive.blurple400,  // primaryDark dark
  brandBackgroundPress: primitive.blurple400,
  brandColor: 'rgba(0,0,0,0.87)',              // primaryContrastText dark

  // ---------------------------------------------------------------------------
  // Success dark (Figma dark: success/*)
  // ---------------------------------------------------------------------------
  successBackground: '#0C130D',                // success/background dark
  successColor: primitive.green300,            // successMain dark
  successBorderColor: primitive.green300,

  // ---------------------------------------------------------------------------
  // Error dark (Figma dark: error/*)
  // ---------------------------------------------------------------------------
  errorBackground: '#160B0B',                  // error/background dark
  errorColor: primitive.red300,                // errorMain dark
  errorBorderColor: primitive.red300,

  // ---------------------------------------------------------------------------
  // Warning dark (Figma dark: warning/*)
  // ---------------------------------------------------------------------------
  warningBackground: '#191207',                // warning/background dark
  warningColor: primitive.orange300,           // warningMain dark
  warningBorderColor: primitive.orange300,

  // ---------------------------------------------------------------------------
  // Info dark (Figma dark: info/*)
  // ---------------------------------------------------------------------------
  infoBackground: '#071318',                   // info/background dark
  infoColor: primitive.cerulean300,            // infoMain dark
  infoBorderColor: primitive.cerulean300,

  // ---------------------------------------------------------------------------
  // Placeholder & focus rings
  // ---------------------------------------------------------------------------
  placeholderColor: 'rgba(255,255,255,0.38)',  // textDisabled dark
  outlineColor: primitive.blurple200,          // primaryMain dark
  focusRingColor: 'rgba(75,63,255,0.3)',       // primaryStatesFocusVisible (shared)

  // ---------------------------------------------------------------------------
  // Action states dark (Figma dark: action/*)
  // ---------------------------------------------------------------------------
  actionActive: 'rgba(255,255,255,0.56)',
  actionHover: 'rgba(255,255,255,0.04)',
  actionSelected: 'rgba(255,255,255,0.08)',
  actionFocus: 'rgba(255,255,255,0.12)',
  actionDisabled: 'rgba(255,255,255,0.38)',
  actionDisabledBackground: 'rgba(255,255,255,0.12)',

  // Selection
  selectionBackground: 'rgba(255,255,255,0.04)',
  selectionBackgroundStrong: 'rgba(110,100,255,0.24)',

  // ---------------------------------------------------------------------------
  // Divider dark
  // ---------------------------------------------------------------------------
  divider: 'rgba(255,255,255,0.12)',

  // ---------------------------------------------------------------------------
  // Component-specific dark
  // ---------------------------------------------------------------------------
  snackbarFill: '#2C2C2C',                    // paper-elevation-6 dark
  tooltipFill: 'rgba(97,97,97,0.9)',
  chipDefaultEnabledBorder: 'rgba(255,255,255,0.23)',
  chipDefaultCloseFill: '#FFFFFF',
  chipDefaultHoverFill: 'rgba(255,255,255,0.12)',
  chipDefaultFocusFill: 'rgba(255,255,255,0.2)',
  avatarFill: primitive.gray600,
  switchKnobFillEnabled: primitive.gray300,
  switchSlideFill: '#FFFFFF',
  switchKnobFillDisabled: primitive.gray600,
  backdropFill: 'rgba(0,0,0,0.5)',
  appBarDefaultFill: primitive.slate900,
  breadcrumbsCollapseFill: primitive.slate800,
  stepperConnector: primitive.gray600,
  ratingEnabledBorder: 'rgba(255,255,255,0.23)',
  ratingActiveFill: '#FFB400',
  elevationOutlined: 'rgba(255,255,255,0.12)',

  // ---------------------------------------------------------------------------
  // Shadow
  // ---------------------------------------------------------------------------
  shadowColor: '#000000',

  // ---------------------------------------------------------------------------
  // Icon colors dark
  // ---------------------------------------------------------------------------
  iconDefault: 'rgba(255,255,255,0.56)',       // actionActive dark
  iconSecondary: 'rgba(255,255,255,0.7)',      // textSecondary dark
  iconDisabled: 'rgba(255,255,255,0.38)',      // textDisabled dark
  iconBrand: primitive.blurple200,             // primaryMain dark
  iconSuccess: primitive.green300,             // successMain dark
  iconError: primitive.red300,                 // errorMain dark
  iconWarning: primitive.orange300,            // warningMain dark
  iconInfo: primitive.cerulean300,             // infoMain dark
} as const
