import { primitive, type PrimitiveTokens } from './primitive'
import { semantic, createSemanticTokens, type SemanticTokens } from './semantic'

/**
 * COMPONENT TOKENS -- Per-component design decisions
 *
 * Layer 3 of the three-layer token architecture. Component tokens reference
 * semantic tokens (and occasionally primitives for raw scale values like
 * spacing and radius) to encode the specific visual decisions for each
 * component in the design system.
 *
 * When white-labeling, these tokens recalculate automatically because they
 * derive from semantic tokens which derive from primitives.
 *
 * @param s - Semantic token set (defaults to CDS 37 light theme).
 * @param p - Primitive token set (defaults to CDS 37 palette).
 */
export function createComponentTokens(
  s: SemanticTokens = semantic,
  p: PrimitiveTokens = primitive,
) {
  return {
    // -------------------------------------------------------------------------
    // Button
    // -------------------------------------------------------------------------
    buttonRadius: p.radiusBase,
    buttonPaddingH: p.spacingUnit * 2, // 8px -- CDS 37: 4px 8px padding
    buttonPaddingV: p.spacingUnit, // 4px
    buttonGap: p.spacingUnit, // 4px
    buttonPrimaryBg: s.brandMain,
    buttonPrimaryText: s.brandContrastText,
    buttonPrimaryHoverBg: s.brandDark,
    buttonSecondaryBg: s.bgDefault,
    buttonSecondaryText: s.brandMain,
    buttonSecondaryBorder: s.borderStrong,
    buttonDestructiveBg: s.errorMain,
    buttonDestructiveText: p.white,
    buttonDisabledBg: s.bgStrong,
    buttonDisabledText: s.textDisabled,

    // -------------------------------------------------------------------------
    // TextField
    // -------------------------------------------------------------------------
    textFieldRadius: p.radiusBase,
    textFieldBorderDefault: s.borderStrong,
    textFieldBorderFocus: s.brandMain,
    textFieldBorderError: s.borderError,
    textFieldBg: s.bgDefault,
    textFieldDisabledBg: s.bgStrong,
    textFieldLabelColor: s.textSecondary,
    textFieldHelperColor: s.textSecondary,

    // -------------------------------------------------------------------------
    // Card
    // -------------------------------------------------------------------------
    cardRadius: p.radiusBase,
    cardBg: s.bgDefault,
    cardBorder: s.borderDefault,

    // -------------------------------------------------------------------------
    // Chip
    // -------------------------------------------------------------------------
    chipRadius: p.radiusBase,
    chipGap: p.spacingUnit,

    // -------------------------------------------------------------------------
    // Dialog
    // -------------------------------------------------------------------------
    dialogRadius: p.radiusBase * 2, // 8px for dialogs
    dialogBg: s.bgDefault,

    // -------------------------------------------------------------------------
    // BottomSheet
    // -------------------------------------------------------------------------
    bottomSheetRadius: p.radiusBase * 4, // 16px top corners
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
