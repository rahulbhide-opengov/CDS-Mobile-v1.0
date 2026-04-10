import { primitive, type PrimitiveTokens } from './primitive'
import { semantic, createSemanticTokens, type SemanticTokens } from './semantic'

/**
 * COMPONENT TOKENS -- Per-component design decisions
 *
 * Layer 3 of the three-layer token architecture. All values sourced from
 * CDS 37 Figma component inspection (April 2026).
 *
 * Button node: 17621:64726
 * TextField node: 14866:130693
 */
export function createComponentTokens(
  s: SemanticTokens = semantic,
  p: PrimitiveTokens = primitive,
) {
  return {
    // -------------------------------------------------------------------------
    // Button (from Figma: 7 types × 3 states × 3 sizes)
    // -------------------------------------------------------------------------
    buttonRadius: p.radiusBase, // 4px — confirmed in Figma

    // Button sizes from Figma:
    //   Small:  h=28, padding 4/8,  gap 4, fontSize 12
    //   Medium: h=32, padding 4/12, gap 4, fontSize 14
    //   Large:  h=40, padding 8/16, gap 8, fontSize 16
    buttonSmHeight: 28,
    buttonSmPaddingH: 8,
    buttonSmPaddingV: 4,
    buttonSmFontSize: 12,
    buttonMdHeight: 32,
    buttonMdPaddingH: 12,
    buttonMdPaddingV: 4,
    buttonMdFontSize: 14,
    buttonLgHeight: 40,
    buttonLgPaddingH: 16,
    buttonLgPaddingV: 8,
    buttonLgFontSize: 16,
    buttonGap: 4,

    // Primary: filled blurple
    buttonPrimaryBg: s.brandMain,           // #4B3FFF
    buttonPrimaryText: s.brandContrastText, // #FFFFFF
    buttonPrimaryHoverBg: s.brandDark,      // #19009B

    // Secondary: outlined blurple
    buttonSecondaryBg: 'transparent',
    buttonSecondaryText: s.brandMain,       // #4B3FFF
    buttonSecondaryBorder: s.brandMain,     // #4B3FFF border
    buttonSecondaryHoverBg: p.blurple100,   // #EEF1FC
    buttonSecondaryHoverText: s.brandDark,  // #19009B

    // Tertiary: outlined slate
    buttonTertiaryText: p.slate700,         // #546574
    buttonTertiaryBorder: p.slate700,       // #546574
    buttonTertiaryHoverBg: p.neutral100,    // #F2F2F2

    // Destructive: filled red
    buttonDestructiveBg: p.red600,          // #D33423
    buttonDestructiveText: p.white,
    buttonDestructiveHoverBg: p.red700,     // #B12525

    // Destructive-alt: text red
    buttonDestructiveAltText: p.red600,     // #D33423
    buttonDestructiveAltHoverBg: p.red700,  // #B12525
    buttonDestructiveAltHoverText: p.white,

    // Disabled: 38% opacity on primary
    buttonDisabledBg: s.bgStrong,
    buttonDisabledText: s.textDisabled,

    // -------------------------------------------------------------------------
    // TextField (from Figma: 7 states × 3 sizes)
    // -------------------------------------------------------------------------
    textFieldRadius: p.radiusBase, // 4px
    textFieldBorderDefault: p.slate700,    // #546574 — Figma input border
    textFieldBorderFocus: s.brandMain,     // #4B3FFF
    textFieldBorderError: p.red600,        // #D33423
    textFieldBorderSuccess: p.green700,    // #037730
    textFieldBg: s.bgDefault,              // #FFFFFF
    textFieldDisabledBg: p.neutral100,     // #F2F2F2
    textFieldLabelColor: 'rgba(0, 0, 0, 0.87)',  // text/primary
    textFieldValueColor: 'rgba(0, 0, 0, 0.87)',   // filled
    textFieldPlaceholderColor: 'rgba(0, 0, 0, 0.6)', // text/secondary
    textFieldHelperColor: 'rgba(0, 0, 0, 0.6)',
    textFieldErrorTextColor: p.red700,     // #B12525

    // TextField sizes from Figma:
    //   Small:  inputH=28, padding 4/12/4/8
    //   Medium: inputH=32, padding 4/12/4/8
    //   Large:  inputH=40, padding 4/12/4/12
    textFieldSmHeight: 28,
    textFieldMdHeight: 32,
    textFieldLgHeight: 40,

    // -------------------------------------------------------------------------
    // Card
    // -------------------------------------------------------------------------
    cardRadius: p.radiusBase * 2, // 8px (medium in Figma radii)
    cardBg: s.bgDefault,
    cardBorder: s.borderDefault,

    // -------------------------------------------------------------------------
    // Chip (same height scale as buttons)
    // -------------------------------------------------------------------------
    chipRadius: p.radiusBase, // 4px
    chipGap: 4,
    chipSmHeight: 28,
    chipMdHeight: 32,
    chipLgHeight: 40,

    // -------------------------------------------------------------------------
    // Dialog
    // -------------------------------------------------------------------------
    dialogRadius: 8,  // Figma medium radius
    dialogBg: s.bgDefault,

    // -------------------------------------------------------------------------
    // BottomSheet
    // -------------------------------------------------------------------------
    bottomSheetRadius: 16, // Figma xlarge radius
    bottomSheetHandleColor: p.neutral300,

    // -------------------------------------------------------------------------
    // Navigation
    // -------------------------------------------------------------------------
    navBarBg: s.bgDefault,
    navBarBorder: s.divider,
    navBarActiveColor: s.brandMain,
    navBarInactiveColor: p.neutral500,

    // -------------------------------------------------------------------------
    // Focus ring (accessibility)
    // -------------------------------------------------------------------------
    focusRingColor: s.brandMain,
    focusRingWidth: 2,

    // -------------------------------------------------------------------------
    // Touch targets (WCAG 2.5.8 / Apple HIG / Material Design 3)
    // -------------------------------------------------------------------------
    touchTargetMin: 44, // iOS HIG + WCAG AAA
    touchTargetMd3: 48, // Material Design 3
  } as const
}

export const componentTokens = createComponentTokens()
export type ComponentTokens = ReturnType<typeof createComponentTokens>
