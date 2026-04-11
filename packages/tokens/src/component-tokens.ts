import { primitive, type PrimitiveTokens } from './primitive'
import { semantic, createSemanticTokens, type SemanticTokens } from './semantic'

/**
 * COMPONENT TOKENS -- Per-component design decisions (Layer 3)
 *
 * All values sourced from CDS 37 Figma component inspection.
 * References semantic tokens (s.*) for theme-aware values and
 * primitive tokens (p.*) for raw palette/scale values.
 */
export function createComponentTokens(
  s: SemanticTokens = semantic,
  p: PrimitiveTokens = primitive,
) {
  return {
    // -------------------------------------------------------------------------
    // Button (Figma node: 17621:64726)
    //
    // Figma Semantic (Display) responsive sizes:
    //   Small:  D=28, T=32, M=32
    //   Medium: D=32, T=36, M=36
    //   Large:  D=40, T=48, M=48
    //
    // For React Native (mobile-first), we use the MOBILE column as default.
    // Tablet overrides applied via Tamagui media queries.
    // -------------------------------------------------------------------------
    buttonRadius: p.radiusBase, // 4px

    // Mobile defaults (from Figma Mobile 390 column)
    buttonSmHeight: 32,
    buttonSmPaddingH: 8,
    buttonSmPaddingV: 4,
    buttonSmFontSize: 13,
    buttonMdHeight: 36,
    buttonMdPaddingH: 12,
    buttonMdPaddingV: 4,
    buttonMdFontSize: 14,
    buttonLgHeight: 48,
    buttonLgPaddingH: 16,
    buttonLgPaddingV: 8,
    buttonLgFontSize: 16,
    buttonGap: 4,

    // Primary: filled blurple
    buttonPrimaryBg: s.primaryMain,
    buttonPrimaryText: s.primaryContrastText,
    buttonPrimaryHoverBg: s.primaryDark,

    // Secondary: outlined blurple
    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: s.primaryMain,
    buttonSecondaryBorder: s.primaryMain,
    buttonSecondaryHoverBg: p.blurple100,
    buttonSecondaryHoverText: s.primaryDark,

    // Tertiary: outlined slate
    buttonTertiaryText: s.secondaryMain,
    buttonTertiaryBorder: s.secondaryMain,
    buttonTertiaryHoverBg: p.gray100,

    // Destructive: filled red
    buttonDestructiveBg: s.errorMain,
    buttonDestructiveText: s.errorContrastText,
    buttonDestructiveHoverBg: s.errorDark,

    // Destructive-alt: text red
    buttonDestructiveAltText: s.errorMain,
    buttonDestructiveAltHoverBg: s.errorDark,
    buttonDestructiveAltHoverText: s.errorContrastText,

    // Disabled
    buttonDisabledBg: s.actionDisabledBackground,
    buttonDisabledText: s.textDisabled,

    // -------------------------------------------------------------------------
    // TextField (Figma node: 14866:130693)
    // -------------------------------------------------------------------------
    textFieldRadius: p.radiusBase,
    textFieldBorderDefault: s.secondaryMain,     // slate700
    textFieldBorderFocus: s.primaryMain,         // blurple700
    textFieldBorderError: s.errorMain,           // red600
    textFieldBorderSuccess: s.successMain,       // green700
    textFieldBg: s.bgDefault,
    textFieldDisabledBg: s.bgTertiary,
    textFieldLabelColor: s.textPrimary,
    textFieldValueColor: s.textPrimary,
    textFieldPlaceholderColor: s.textSecondary,
    textFieldHelperColor: s.textSecondary,
    textFieldErrorTextColor: s.errorColor,

    // Figma Mobile (390) column: Inputs/Small=32, Medium=40, Large=48
    textFieldSmHeight: 32,
    textFieldMdHeight: 40,
    textFieldLgHeight: 48,

    // -------------------------------------------------------------------------
    // Card
    // -------------------------------------------------------------------------
    cardRadius: p.radiusBase * 2, // 8px
    cardBg: s.bgDefault,
    cardBorder: s.outlinedEnabledBorder,

    // -------------------------------------------------------------------------
    // Chip
    // -------------------------------------------------------------------------
    chipRadius: p.radiusBase,
    chipGap: 4,
    // Figma Mobile (390) column: Chip/Small=32, Medium=36, Large=44
    chipSmHeight: 32,
    chipMdHeight: 36,
    chipLgHeight: 44,
    chipDefaultBorder: s.chipDefaultEnabledBorder,
    chipDefaultHoverFill: s.chipDefaultHoverFill,
    chipDefaultFocusFill: s.chipDefaultFocusFill,

    // -------------------------------------------------------------------------
    // Dialog
    // -------------------------------------------------------------------------
    dialogRadius: 8,
    dialogBg: s.bgDefault,

    // -------------------------------------------------------------------------
    // BottomSheet
    // -------------------------------------------------------------------------
    bottomSheetRadius: 16,
    bottomSheetHandleColor: p.gray300,

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------
    navBarBg: s.bgDefault,
    navBarBorder: s.divider,
    navBarActiveColor: s.primaryMain,
    navBarInactiveColor: s.actionActive,

    // -------------------------------------------------------------------------
    // Focus ring
    // -------------------------------------------------------------------------
    focusRingColor: s.primaryStatesFocusVisible,
    focusRingWidth: 2,

    // -------------------------------------------------------------------------
    // Touch targets
    // -------------------------------------------------------------------------
    touchTargetMin: 44,
    touchTargetMd3: 48,
  } as const
}

export const componentTokens = createComponentTokens()
export type ComponentTokens = ReturnType<typeof createComponentTokens>
