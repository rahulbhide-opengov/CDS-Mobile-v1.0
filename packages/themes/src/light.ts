import { primitive } from '@opengov/cds-tokens'

/**
 * CDS 37 Light Theme -- Figma Semantic Theme collection (Light mode)
 *
 * Source: Figma file MxdeZ8e13qSmlenBVMmzzI
 *        Semantic Theme collection, Light mode
 *
 * Token naming preserves backwards compatibility with the Tamagui theme shape
 * consumed by all CDS components. Each value traces to either a primitive token
 * or a Figma semantic literal (rgba composites, hardcoded hex).
 */
export const lightTheme = {
  // ---------------------------------------------------------------------------
  // Backgrounds (Figma: background/*)
  // ---------------------------------------------------------------------------
  background: '#FFFFFF',                       // bgDefault
  backgroundHover: primitive.gray50,           // bgSecondary
  backgroundPress: primitive.gray100,          // bgTertiary
  backgroundFocus: primitive.gray50,
  backgroundStrong: primitive.gray100,         // bgTertiary
  backgroundTransparent: 'transparent',

  // Paper / elevation surfaces
  backgroundPaper: '#FFFFFF',                  // bgPaperElevation0
  backgroundPaperElevated: '#FFFFFF',          // bgPaperElevation1

  // ---------------------------------------------------------------------------
  // Text (Figma: text/*)
  // ---------------------------------------------------------------------------
  color: 'rgba(0,0,0,0.87)',                   // textPrimary
  colorHover: '#000000',
  colorPress: primitive.slate700,
  colorFocus: 'rgba(0,0,0,0.87)',
  colorSecondary: 'rgba(0,0,0,0.6)',           // textSecondary
  colorTertiary: 'rgba(0,0,0,0.38)',           // textDisabled
  colorDisabled: 'rgba(0,0,0,0.38)',           // textDisabled

  // ---------------------------------------------------------------------------
  // Borders (Figma: inputs/* + standard/*)
  // ---------------------------------------------------------------------------
  borderColor: primitive.slate700,             // CDS standardEnabledBorder equiv
  borderColorHover: '#000000',                 // standardHoverBorder
  borderColorFocus: primitive.blurple700,      // primaryMain
  borderColorPress: primitive.slate900,
  borderColorDisabled: 'rgba(0,0,0,0.12)',     // outlinedEnabledBorder

  // ---------------------------------------------------------------------------
  // Brand / Primary (Figma: primary/*)
  // ---------------------------------------------------------------------------
  brandBackground: primitive.blurple700,       // primaryMain
  brandBackgroundHover: primitive.blurple900,  // primaryDark -- CDS hover
  brandBackgroundPress: primitive.blurple900,  // primaryDark
  brandColor: '#FFFFFF',                       // primaryContrastText

  // ---------------------------------------------------------------------------
  // Success (Figma: success/*)
  // ---------------------------------------------------------------------------
  successBackground: '#EDF7ED',                // successBackground
  successColor: primitive.green700,            // successMain / successColor
  successBorderColor: primitive.green700,      // successColor

  // ---------------------------------------------------------------------------
  // Error (Figma: error/*)
  // ---------------------------------------------------------------------------
  errorBackground: primitive.red50,            // errorLight / errorBackground
  errorColor: primitive.red700,                // errorDark / errorColor
  errorBorderColor: primitive.red600,          // errorMain

  // ---------------------------------------------------------------------------
  // Warning (Figma: warning/*)
  // ---------------------------------------------------------------------------
  warningBackground: primitive.orange50,       // warningLight / warningBackground
  warningColor: primitive.yellow700,           // warningMain (#885604)
  warningBorderColor: primitive.orange800,     // warningDark

  // ---------------------------------------------------------------------------
  // Info (Figma: info/*)
  // ---------------------------------------------------------------------------
  infoBackground: primitive.cerulean50,        // infoLight / infoBackground
  infoColor: primitive.cerulean700,            // infoMain
  infoBorderColor: primitive.cerulean800,      // infoDark / infoColor

  // ---------------------------------------------------------------------------
  // Placeholder & focus rings
  // ---------------------------------------------------------------------------
  placeholderColor: 'rgba(0,0,0,0.6)',         // textSecondary
  outlineColor: primitive.blurple700,          // primaryMain
  focusRingColor: 'rgba(75,63,255,0.3)',       // primaryStatesFocusVisible

  // ---------------------------------------------------------------------------
  // Action states (Figma: action/*)
  // ---------------------------------------------------------------------------
  actionActive: 'rgba(0,0,0,0.56)',
  actionHover: 'rgba(0,0,0,0.04)',
  actionSelected: 'rgba(0,0,0,0.08)',
  actionFocus: 'rgba(0,0,0,0.12)',
  actionDisabled: 'rgba(0,0,0,0.38)',
  actionDisabledBackground: 'rgba(0,0,0,0.12)',

  // Selection
  selectionBackground: 'rgba(0,0,0,0.04)',     // actionHover
  selectionBackgroundStrong: 'rgba(75,63,255,0.08)', // primaryStatesSelected

  // ---------------------------------------------------------------------------
  // Divider
  // ---------------------------------------------------------------------------
  divider: 'rgba(0,0,0,0.12)',

  // ---------------------------------------------------------------------------
  // Component-specific (Figma component tokens)
  // ---------------------------------------------------------------------------
  snackbarFill: '#323232',
  tooltipFill: 'rgba(21,21,21,0.9)',
  chipDefaultEnabledBorder: primitive.gray400,
  chipDefaultCloseFill: '#000000',
  chipDefaultHoverFill: 'rgba(0,0,0,0.12)',
  chipDefaultFocusFill: 'rgba(0,0,0,0.2)',
  avatarFill: primitive.gray400,
  switchKnobFillEnabled: primitive.gray50,
  switchSlideFill: '#000000',
  switchKnobFillDisabled: primitive.gray100,
  backdropFill: 'rgba(0,0,0,0.5)',
  appBarDefaultFill: primitive.gray100,
  breadcrumbsCollapseFill: primitive.gray100,
  stepperConnector: primitive.gray400,
  ratingEnabledBorder: 'rgba(0,0,0,0.23)',
  ratingActiveFill: '#FFB400',
  elevationOutlined: '#E0E0E0',

  // ---------------------------------------------------------------------------
  // Shadow
  // ---------------------------------------------------------------------------
  shadowColor: '#000000',

  // ---------------------------------------------------------------------------
  // Icon colors
  // ---------------------------------------------------------------------------
  iconDefault: primitive.slate700,             // secondaryMain
  iconSecondary: 'rgba(0,0,0,0.56)',           // actionActive
  iconDisabled: 'rgba(0,0,0,0.38)',            // textDisabled
  iconBrand: primitive.blurple700,             // primaryMain
  iconSuccess: primitive.green700,
  iconError: primitive.red700,                 // errorColor
  iconWarning: primitive.yellow700,            // warningMain
  iconInfo: primitive.cerulean700,             // infoMain
} as const
