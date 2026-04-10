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
    // Status colors — Figma Semantic Theme "main" uses the 700-weight,
    // "dark" uses 800 or deeper, "light" uses the 50 background.
    errorMain: p.red600,       // #D33423 — Figma error/main
    errorLight: p.red50,       // #FCF7F7 — Figma error/background
    errorDark: p.red700,       // #B12525 — Figma error/dark

    successMain: p.green700,   // #037730 — Figma success/main (was green500)
    successLight: p.green50,   // #EFFDF1 — Figma success/background
    successDark: p.green800,   // #015A2D — Figma success/dark

    warningMain: p.amber700,   // #885604 — Figma warning/main (was amber500)
    warningLight: p.amber50,   // #FDF7F4 — Figma warning/background
    warningDark: p.amber800,   // #7D2E04 — Figma warning/dark

    infoMain: p.teal700,       // #0E6F7F — Figma info/main (was teal500)
    infoLight: p.teal50,       // #F1FAFC — Figma info/background
    infoDark: p.cerulean800,   // #085461 — Figma info/dark

    // -------------------------------------------------------------------------
    // Borders
    // -------------------------------------------------------------------------
    borderDefault: p.neutral200,
    borderStrong: p.neutral300,
    borderFocus: p.brandPrimary,
    borderError: p.red600,     // #D33423 — Figma error/main
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
