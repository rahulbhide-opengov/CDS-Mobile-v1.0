import { primitive, type PrimitiveTokens } from './primitive'

/**
 * SEMANTIC TOKENS -- Purpose-based aliases
 *
 * Layer 2 of the three-layer token architecture. Semantic tokens reference
 * primitive tokens and assign them meaning within the design system's visual
 * language. Theme switching (light/dark) happens by swapping semantic mappings
 * while the primitive palette stays unchanged.
 *
 * Every value here must trace back to a primitive token. Hard-coded values
 * are only permitted for rgba() composites that derive their base color and
 * opacity from primitives.
 *
 * @param p - Primitive token set (defaults to the CDS 37 palette). Pass a
 *            custom set produced by `createBrandConfig` to white-label.
 */
export function createSemanticTokens(p: PrimitiveTokens = primitive) {
  return {
    // -------------------------------------------------------------------------
    // Background
    // -------------------------------------------------------------------------
    bgDefault: p.white,
    bgPaper: p.white,
    bgStrong: p.neutral100,
    bgInverse: p.neutral900,

    // -------------------------------------------------------------------------
    // Text
    // -------------------------------------------------------------------------
    textPrimary: 'rgba(0, 0, 0, 0.87)',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textDisabled: `rgba(0, 0, 0, ${p.stateDisabledOpacity})`,
    textInverse: p.white,

    // -------------------------------------------------------------------------
    // Brand
    // -------------------------------------------------------------------------
    brandMain: p.brandPrimary,
    brandDark: p.brandPrimaryDark,
    brandLight: p.brandPrimaryLight,
    brandContrastText: p.brandPrimaryContrastText,

    // -------------------------------------------------------------------------
    // Semantic status colors
    // -------------------------------------------------------------------------
    errorMain: p.red600,
    errorLight: p.red50,
    errorDark: p.red700,

    successMain: p.green500,
    successLight: p.green50,
    successDark: p.green700,

    warningMain: p.amber500,
    warningLight: p.amber50,
    warningDark: p.amber700,

    infoMain: p.teal500,
    infoLight: p.teal50,
    infoDark: p.teal700,

    // -------------------------------------------------------------------------
    // Borders
    // -------------------------------------------------------------------------
    borderDefault: p.neutral200,
    borderStrong: p.neutral300,
    borderFocus: p.brandPrimary,
    borderError: p.red500,
    borderDisabled: p.neutral200,

    // -------------------------------------------------------------------------
    // Divider
    // -------------------------------------------------------------------------
    divider: 'rgba(0, 0, 0, 0.12)',

    // -------------------------------------------------------------------------
    // Action states (MUI-compatible opacity layers)
    // -------------------------------------------------------------------------
    actionHover: `rgba(0, 0, 0, ${p.stateHoverOpacity})`,
    actionFocus: `rgba(0, 0, 0, ${p.stateFocusOpacity})`,
    actionSelected: `rgba(0, 0, 0, ${p.stateSelectedOpacity})`,
    actionDisabled: `rgba(0, 0, 0, ${p.stateDisabledOpacity})`,

    // -------------------------------------------------------------------------
    // Shadow base color
    // -------------------------------------------------------------------------
    shadowColor: p.black,
  } as const
}

export const semantic = createSemanticTokens()
export type SemanticTokens = ReturnType<typeof createSemanticTokens>
