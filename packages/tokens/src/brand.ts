import { primitive, type PrimitiveTokens } from './primitive'
import { createSemanticTokens } from './semantic'
import { createComponentTokens } from './component-tokens'

/**
 * WHITE-LABEL BRAND CONFIGURATION
 *
 * The entire CDS Mobile design system can be re-branded by overriding
 * primitive tokens. Only the values you specify will change; everything
 * else falls back to the default CDS 37 palette.
 *
 * The override cascades through all three layers:
 *   Primitive (your overrides) -> Semantic (auto-recalculated) -> Component (auto-recalculated)
 *
 * @example
 * ```typescript
 * import { createBrandConfig, createThemedTokens } from '@opengov/cds-tokens'
 *
 * // 1. Define your brand palette
 * const myBrand = createBrandConfig({
 *   brandPrimary: '#0066CC',
 *   brandPrimaryDark: '#004D99',
 *   brandPrimaryLight: '#3399FF',
 *   fontFamily: 'Inter',
 * })
 *
 * // 2. Generate all three token layers from the brand
 * const tokens = createThemedTokens(myBrand)
 * // tokens.primitive  -- merged primitives
 * // tokens.semantic    -- recalculated semantic tokens
 * // tokens.component   -- recalculated component tokens
 *
 * // 3. Use in CdsProvider
 * <CdsProvider brand={myBrand}>
 *   <App />
 * </CdsProvider>
 * ```
 */
export type BrandConfig = Partial<PrimitiveTokens>

/**
 * Merge brand overrides into the default primitive palette.
 *
 * Returns a complete `PrimitiveTokens` object where only the keys you
 * provided differ from the CDS 37 defaults.
 */
export function createBrandConfig(overrides: BrandConfig): PrimitiveTokens {
  return { ...primitive, ...overrides }
}

/**
 * Generate all three token layers from a branded primitive palette.
 *
 * This is the primary entry point for white-labeling. Pass the output of
 * `createBrandConfig` (or a full `PrimitiveTokens` object) and receive
 * a complete, coherent token set where semantic and component tokens have
 * been recalculated against your brand values.
 */
export function createThemedTokens(brandedPrimitive: PrimitiveTokens = primitive) {
  const semanticTokens = createSemanticTokens(brandedPrimitive)
  const componentTokensResult = createComponentTokens(semanticTokens, brandedPrimitive)

  return {
    primitive: brandedPrimitive,
    semantic: semanticTokens,
    component: componentTokensResult,
  } as const
}

// ---------------------------------------------------------------------------
// Pre-built brand presets
// ---------------------------------------------------------------------------
export const brands = {
  /** Default OpenGov CDS 37 brand */
  opengov: primitive,

  /** Example: Government blue brand */
  govBlue: createBrandConfig({
    brandPrimary: '#1A56DB',
    brandPrimaryDark: '#1442A8',
    brandPrimaryLight: '#4F83E3',
    fontFamily: 'Inter',
  }),

  /** Example: Civic green brand */
  civicGreen: createBrandConfig({
    brandPrimary: '#059669',
    brandPrimaryDark: '#047857',
    brandPrimaryLight: '#34D399',
    fontFamily: 'Plus Jakarta Sans',
  }),
} as const
