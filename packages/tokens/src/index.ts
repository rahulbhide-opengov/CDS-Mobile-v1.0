// =============================================================================
// THREE-LAYER TOKEN ARCHITECTURE
// =============================================================================

// Layer 1: Primitive -- raw palette values (the white-label layer)
export { primitive, type PrimitiveTokens } from './primitive'

// Layer 2: Semantic -- purpose-based aliases derived from primitives
export { semantic, createSemanticTokens, type SemanticTokens } from './semantic'

// Layer 3: Component -- per-component tokens derived from semantic + primitive
export { componentTokens, createComponentTokens, type ComponentTokens } from './component-tokens'

// Brand configuration -- white-label entry point
export {
  createBrandConfig,
  createThemedTokens,
  brands,
  type BrandConfig,
} from './brand'

// =============================================================================
// EXISTING EXPORTS (backwards compatibility)
// =============================================================================

// Colors (flat map, now derived from primitive layer)
export { colors, type ColorToken } from './colors'

// Typography
export {
  fontFamily,
  fontFamilyMono,
  fontFamilyFallback,
  dmSansFontFaces,
  type DmSansFontFace,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  type FontSizeToken,
  type FontWeightToken,
  type LineHeightToken,
} from './typography'

// Spacing
export { space, negativeSpace, type SpaceToken } from './spacing'

// Border radii (now derived from primitive.radiusBase)
export { radii, type RadiusToken } from './radii'

// Shadows
export { shadows, type ShadowStyle, type ShadowToken } from './shadows'

// Breakpoints
export { breakpoints, type BreakpointToken } from './breakpoints'

// Animations
export { animations } from './animations'
