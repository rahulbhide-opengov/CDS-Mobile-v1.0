import { primitive, type PrimitiveTokens } from './primitive'

/**
 * SEMANTIC TOKENS -- Purpose-based aliases (Layer 2)
 *
 * Maps every token from the Figma CDS 37 Semantic Theme collection (Light mode)
 * to its primitive-layer reference. Theme switching (light/dark) swaps these
 * mappings while the primitive palette stays unchanged.
 *
 * Naming convention: Figma's slash-separated groups become camelCase.
 *   primary/main        -> primaryMain
 *   primary/states/hover -> primaryStatesHover
 *   background/default   -> bgDefault
 *
 * Source:
 *   Figma file MxdeZ8e13qSmlenBVMmzzI -- Semantic Theme collection, Light mode
 *
 * @param p - Primitive token set (defaults to the CDS 37 palette). Pass a
 *            custom set produced by `createBrandConfig` to white-label.
 */
export function createSemanticTokens(p: PrimitiveTokens = primitive) {
  return {
    // =========================================================================
    // PRIMARY
    // =========================================================================
    primaryMain: p.blurple700,
    primaryDark: p.blurple900,
    primaryLight: p.blurple100,
    primaryContrastText: '#FFFFFF',
    primaryStatesHover: 'rgba(75,63,255,0.04)',
    primaryStatesSelected: 'rgba(75,63,255,0.08)',
    primaryStatesFocus: 'rgba(75,63,255,0.12)',
    primaryStatesFocusVisible: 'rgba(75,63,255,0.3)',
    primaryStatesOutlinedBorder: 'rgba(75,63,255,0.5)',

    // =========================================================================
    // SECONDARY
    // =========================================================================
    secondaryMain: p.slate700,
    secondaryDark: p.slate900,
    secondaryLight: p.slate100,
    secondaryContrastText: '#FFFFFF',
    secondaryStatesHover: 'rgba(84,101,116,0.04)',
    secondaryStatesSelected: 'rgba(84,101,116,0.08)',
    secondaryStatesFocus: 'rgba(84,101,116,0.12)',
    secondaryStatesFocusVisible: 'rgba(84,101,116,0.3)',
    secondaryStatesOutlinedBorder: 'rgba(84,101,116,0.5)',

    // =========================================================================
    // ERROR
    // =========================================================================
    errorMain: p.red600,
    errorDark: p.red700,
    errorLight: p.red50,
    errorColor: p.red700,        // alias: errorDark
    errorBackground: p.red50,    // alias: errorLight
    errorContrastText: '#FFFFFF',
    errorStatesHover: 'rgba(243,92,73,0.04)',
    errorStatesSelected: 'rgba(243,92,73,0.08)',
    errorStatesFocusVisible: 'rgba(243,92,73,0.3)',
    errorStatesOutlinedBorder: 'rgba(243,92,73,0.5)',

    // =========================================================================
    // WARNING
    // =========================================================================
    warningMain: p.yellow700,    // #885604 -- Figma Colors/yellow/700
    warningDark: p.orange800,
    warningLight: p.orange50,
    warningColor: p.orange800,   // alias: warningDark
    warningBackground: p.orange50, // alias: warningLight
    warningContrastText: '#FFFFFF',
    warningStatesHover: 'rgba(239,108,0,0.04)',
    warningStatesSelected: 'rgba(239,108,0,0.08)',
    warningStatesFocusVisible: 'rgba(239,108,0,0.3)',
    warningStatesOutlinedBorder: 'rgba(239,108,0,0.5)',

    // =========================================================================
    // INFO
    // =========================================================================
    infoMain: p.cerulean700,
    infoDark: p.cerulean800,
    infoLight: p.cerulean50,
    infoColor: p.cerulean800,    // alias: infoDark
    infoBackground: p.cerulean50, // alias: infoLight
    infoContrastText: '#FFFFFF',
    infoStatesHover: 'rgba(2,136,209,0.04)',
    infoStatesSelected: 'rgba(2,136,209,0.08)',
    infoStatesFocusVisible: 'rgba(2,136,209,0.3)',
    infoStatesOutlinedBorder: 'rgba(2,136,209,0.5)',

    // =========================================================================
    // SUCCESS
    // =========================================================================
    successMain: p.green700,
    successDark: p.green800,
    successLight: p.green50,
    successColor: p.green700,
    successBackground: '#EDF7ED',
    successContrastText: '#FFFFFF',
    successStatesHover: 'rgba(46,125,50,0.04)',
    successStatesSelected: 'rgba(46,125,50,0.08)',
    successStatesFocusVisible: 'rgba(46,125,50,0.3)',
    successStatesOutlinedBorder: 'rgba(46,125,50,0.5)',

    // =========================================================================
    // TEXT
    // =========================================================================
    textPrimary: 'rgba(0,0,0,0.87)',
    textSecondary: 'rgba(0,0,0,0.6)',
    textDisabled: 'rgba(0,0,0,0.38)',
    textStatesHover: 'rgba(0,0,0,0.04)',
    textStatesSelected: 'rgba(0,0,0,0.08)',
    textStatesFocusVisible: 'rgba(0,0,0,0.3)',

    // =========================================================================
    // BACKGROUND
    // =========================================================================
    bgDefault: '#FFFFFF',
    bgSecondary: p.gray50,
    bgTertiary: p.gray100,
    bgPaperElevation0: '#FFFFFF',
    bgPaperElevation1: '#FFFFFF',

    // =========================================================================
    // ACTION
    // =========================================================================
    actionActive: 'rgba(0,0,0,0.56)',
    actionHover: 'rgba(0,0,0,0.04)',
    actionSelected: 'rgba(0,0,0,0.08)',
    actionFocus: 'rgba(0,0,0,0.12)',
    actionDisabled: 'rgba(0,0,0,0.38)',
    actionDisabledBackground: 'rgba(0,0,0,0.12)',

    // =========================================================================
    // DIVIDER
    // =========================================================================
    divider: 'rgba(0,0,0,0.12)',

    // =========================================================================
    // BORDERS / INPUTS
    // =========================================================================
    standardEnabledBorder: 'rgba(0,0,0,0.25)',
    standardHoverBorder: '#000000',
    filledEnabledFill: 'rgba(0,0,0,0.06)',
    filledHoverFill: 'rgba(0,0,0,0.09)',
    outlinedEnabledBorder: 'rgba(0,0,0,0.12)',
    outlinedHoverBorder: '#000000',
    elevationOutlined: '#E0E0E0',

    // =========================================================================
    // COMPONENT-SPECIFIC
    // =========================================================================
    avatarFill: p.gray400,
    switchKnobFillEnabled: p.gray50,
    switchSlideFill: '#000000',
    switchKnobFillDisabled: p.gray100,
    snackbarFill: '#323232',
    chipDefaultCloseFill: '#000000',
    chipDefaultHoverFill: 'rgba(0,0,0,0.12)',
    chipDefaultEnabledBorder: p.gray400,
    chipDefaultFocusFill: 'rgba(0,0,0,0.2)',
    tooltipFill: 'rgba(21,21,21,0.9)',
    backdropFill: 'rgba(0,0,0,0.5)',
    appBarDefaultFill: p.gray100,
    breadcrumbsCollapseFill: p.gray100,
    stepperConnector: p.gray400,
    ratingEnabledBorder: 'rgba(0,0,0,0.23)',
    ratingActiveFill: '#FFB400',
    statesFocus: 'rgba(0,0,0,0.12)',

    // =========================================================================
    // BLACK / WHITE STATES
    // =========================================================================
    blackStatesMain: '#000000',
    blackStatesHover: 'rgba(0,0,0,0.04)',
    blackStatesSelected: 'rgba(0,0,0,0.08)',
    blackStatesFocus: 'rgba(0,0,0,0.12)',
    blackStatesFocusVisible: 'rgba(0,0,0,0.3)',
    blackStatesOutlinedBorder: 'rgba(0,0,0,0.5)',
    whiteStatesMain: '#FFFFFF',
    whiteStatesHover: 'rgba(255,255,255,0.04)',
    whiteStatesSelected: 'rgba(255,255,255,0.08)',
    whiteStatesFocus: 'rgba(255,255,255,0.12)',
    whiteStatesFocusVisible: 'rgba(255,255,255,0.3)',
    whiteStatesOutlinedBorder: 'rgba(255,255,255,0.5)',

    // =========================================================================
    // DATA VISUALIZATION (18 series -- Figma Foundation references)
    // =========================================================================
    dataVizSeries1: p.violet500,
    dataVizSeries2: p.violet300,
    dataVizSeries3: p.red500,
    dataVizSeries4: p.red300,
    dataVizSeries5: p.cerulean500,
    dataVizSeries6: p.cerulean300,
    dataVizSeries7: p.magenta500,
    dataVizSeries8: p.magenta300,
    dataVizSeries9: p.blue500,
    dataVizSeries10: p.blue300,
    dataVizSeries11: p.pear500,
    dataVizSeries12: p.pear300,
    dataVizSeries13: p.gray500,
    dataVizSeries14: p.gray300,
    dataVizSeries15: p.orange500,
    dataVizSeries16: p.orange300,
    dataVizSeries17: p.terracotta500,
    dataVizSeries18: p.terracotta300,

    // =========================================================================
    // SHADOW (base color for elevation)
    // =========================================================================
    shadowColor: '#000000',
  } as const
}

export const semantic = createSemanticTokens()
export type SemanticTokens = ReturnType<typeof createSemanticTokens>
