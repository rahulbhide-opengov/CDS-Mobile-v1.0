/**
 * PRIMITIVE TOKENS -- The White-Label Layer
 *
 * These are the raw palette values that form the foundation of the entire
 * design system. Every semantic token and every component token ultimately
 * derives from a value defined here.
 *
 * SOURCE OF TRUTH: CDS 37 Figma -- Foundation collection
 *   File: MxdeZ8e13qSmlenBVMmzzI
 *   Collection: Foundation (Colors)
 *   Total Foundation color variables: 247
 *
 * Token naming convention:
 *   Figma "Colors/blurple/50"   --> blurple50
 *   Figma "Colors/blurple/A200" --> blurpleA200
 *   Figma "Colors/blurmuda/main" --> blurmudaMain
 *
 * To white-label the design system, override this single layer using
 * `createBrandConfig` from `./brand.ts`. All downstream tokens will
 * recalculate automatically. The object is NOT declared `as const` so
 * that white-label overrides can be applied with standard spread syntax.
 */
export const primitive = {
  // ===========================================================================
  // Brand aliases (quick reference to key palette stops)
  // ===========================================================================
  brandPrimary: '#4B3FFF',              // alias for blurple700
  brandPrimaryDark: '#19009B',          // alias for blurple900
  brandPrimaryLight: '#7589FF',         // alias for blurple500
  brandPrimaryContrastText: '#FFFFFF',
  brandSecondary: '#2B343D',            // alias for slate900
  brandSecondaryLight: '#546574',       // alias for slate700

  // ===========================================================================
  // Base
  // ===========================================================================
  white: '#FFFFFF',
  black: '#000000',

  // ===========================================================================
  // Blurple (13)
  // ===========================================================================
  /** Colors/blurple/50 */
  blurple50: '#F7F8FD',
  /** Colors/blurple/100 */
  blurple100: '#EEF1FC',
  /** Colors/blurple/200 */
  blurple200: '#D4DDFB',
  /** Colors/blurple/300 */
  blurple300: '#B8C6FB',
  /** Colors/blurple/400 */
  blurple400: '#94A8FF',
  /** Colors/blurple/500 */
  blurple500: '#7589FF',
  /** Colors/blurple/600 */
  blurple600: '#5A65FF',
  /** Colors/blurple/700 */
  blurple700: '#4B3FFF',
  /** Colors/blurple/800 */
  blurple800: '#2C01D6',
  /** Colors/blurple/900 */
  blurple900: '#19009B',
  /** Colors/blurple/A200 */
  blurpleA200: '#448AFF',
  /** Colors/blurple/A400 */
  blurpleA400: '#2979FF',
  /** Colors/blurple/A700 */
  blurpleA700: '#2962FF',

  // ===========================================================================
  // Slate (13)
  // ===========================================================================
  /** Colors/slate/50 */
  slate50: '#F7F9FA',
  /** Colors/slate/100 */
  slate100: '#F0F2F4',
  /** Colors/slate/200 */
  slate200: '#D8DFE5',
  /** Colors/slate/300 */
  slate300: '#BECBD6',
  /** Colors/slate/400 */
  slate400: '#9CB1C3',
  /** Colors/slate/500 */
  slate500: '#8099AE',
  /** Colors/slate/600 */
  slate600: '#758CA0',
  /** Colors/slate/700 */
  slate700: '#546574',
  /** Colors/slate/800 */
  slate800: '#3F4C58',
  /** Colors/slate/900 */
  slate900: '#2B343D',
  /** Colors/slate/A200 */
  slateA200: '#13181D',
  /** Colors/slate/A400 */
  slateA400: '#090C0E',
  /** Colors/slate/A700 */
  slateA700: '#000000',

  // ===========================================================================
  // Turquoise (13)
  // ===========================================================================
  /** Colors/turquoise/50 */
  turquoise50: '#ECFDFA',
  /** Colors/turquoise/100 */
  turquoise100: '#D4FCF5',
  /** Colors/turquoise/200 */
  turquoise200: '#59FBE9',
  /** Colors/turquoise/300 */
  turquoise300: '#32E6D4',
  /** Colors/turquoise/400 */
  turquoise400: '#00CDBC',
  /** Colors/turquoise/500 */
  turquoise500: '#03AC9E',
  /** Colors/turquoise/600 */
  turquoise600: '#019184',
  /** Colors/turquoise/700 */
  turquoise700: '#007369',
  /** Colors/turquoise/800 */
  turquoise800: '#01574F',
  /** Colors/turquoise/900 */
  turquoise900: '#003C37',
  /** Colors/turquoise/A200 */
  turquoiseA200: '#18FFFF',
  /** Colors/turquoise/A400 */
  turquoiseA400: '#00E5FF',
  /** Colors/turquoise/A700 */
  turquoiseA700: '#00B8D4',

  // ===========================================================================
  // Terracotta (13)
  // ===========================================================================
  /** Colors/terracotta/50 */
  terracotta50: '#FCF7F6',
  /** Colors/terracotta/100 */
  terracotta100: '#FAEFEC',
  /** Colors/terracotta/200 */
  terracotta200: '#F9D5CB',
  /** Colors/terracotta/300 */
  terracotta300: '#F9B7A5',
  /** Colors/terracotta/400 */
  terracotta400: '#FA8A6E',
  /** Colors/terracotta/500 */
  terracotta500: '#F95728',
  /** Colors/terracotta/600 */
  terracotta600: '#DF461B',
  /** Colors/terracotta/700 */
  terracotta700: '#AB3312',
  /** Colors/terracotta/800 */
  terracotta800: '#83250A',
  /** Colors/terracotta/900 */
  terracotta900: '#5D1805',
  /** Colors/terracotta/A200 */
  terracottaA200: '#FF6E40',
  /** Colors/terracotta/A400 */
  terracottaA400: '#FF3D00',
  /** Colors/terracotta/A700 */
  terracottaA700: '#DD2C00',

  // ===========================================================================
  // Violet (13)
  // ===========================================================================
  /** Colors/violet/50 */
  violet50: '#F9F7FD',
  /** Colors/violet/100 */
  violet100: '#F3F0FB',
  /** Colors/violet/200 */
  violet200: '#E3D7FA',
  /** Colors/violet/300 */
  violet300: '#D2BCFB',
  /** Colors/violet/400 */
  violet400: '#BD96FF',
  /** Colors/violet/500 */
  violet500: '#AB6FFE',
  /** Colors/violet/600 */
  violet600: '#9626FF',
  /** Colors/violet/700 */
  violet700: '#7F00DE',
  /** Colors/violet/800 */
  violet800: '#6100AB',
  /** Colors/violet/900 */
  violet900: '#44007A',
  /** Colors/violet/A200 */
  violetA200: '#7C4DFF',
  /** Colors/violet/A400 */
  violetA400: '#651FFF',
  /** Colors/violet/A700 */
  violetA700: '#6200EA',

  // ===========================================================================
  // Green (13)
  // ===========================================================================
  /** Colors/green/50 */
  green50: '#EFFDF1',
  /** Colors/green/100 */
  green100: '#DCFCE0',
  /** Colors/green/200 */
  green200: '#8DFBA2',
  /** Colors/green/300 */
  green300: '#38EE70',
  /** Colors/green/400 */
  green400: '#10D05A',
  /** Colors/green/500 */
  green500: '#08A847',
  /** Colors/green/600 */
  green600: '#07963F',
  /** Colors/green/700 */
  green700: '#037730',
  /** Colors/green/800 */
  green800: '#015A2D',
  /** Colors/green/900 */
  green900: '#003E20',
  /** Colors/green/A200 */
  greenA200: '#69F0AE',
  /** Colors/green/A400 */
  greenA400: '#00E676',
  /** Colors/green/A700 */
  greenA700: '#00C853',

  // ===========================================================================
  // Cerulean (13)
  // ===========================================================================
  /** Colors/cerulean/50 */
  cerulean50: '#F1FAFC',
  /** Colors/cerulean/100 */
  cerulean100: '#E1F6FB',
  /** Colors/cerulean/200 */
  cerulean200: '#A9EBFA',
  /** Colors/cerulean/300 */
  cerulean300: '#4CDEFA',
  /** Colors/cerulean/400 */
  cerulean400: '#1DC2DE',
  /** Colors/cerulean/500 */
  cerulean500: '#16A7BF',
  /** Colors/cerulean/600 */
  cerulean600: '#128CA1',
  /** Colors/cerulean/700 */
  cerulean700: '#0E6F7F',
  /** Colors/cerulean/800 */
  cerulean800: '#085461',
  /** Colors/cerulean/900 */
  cerulean900: '#043A44',
  /** Colors/cerulean/A200 */
  ceruleanA200: '#40C4FF',
  /** Colors/cerulean/A400 */
  ceruleanA400: '#00B0FF',
  /** Colors/cerulean/A700 */
  ceruleanA700: '#0091EA',

  // ===========================================================================
  // Jade (13)
  // ===========================================================================
  /** Colors/jade/50 */
  jade50: '#EEFDF6',
  /** Colors/jade/100 */
  jade100: '#D8FBEC',
  /** Colors/jade/200 */
  jade200: '#77FBCB',
  /** Colors/jade/300 */
  jade300: '#41F2BB',
  /** Colors/jade/400 */
  jade400: '#04CC9A',
  /** Colors/jade/500 */
  jade500: '#08AF84',
  /** Colors/jade/600 */
  jade600: '#03936E',
  /** Colors/jade/700 */
  jade700: '#037456',
  /** Colors/jade/800 */
  jade800: '#025841',
  /** Colors/jade/900 */
  jade900: '#013D2C',
  /** Colors/jade/A200 */
  jadeA200: '#B2FF59',
  /** Colors/jade/A400 */
  jadeA400: '#76FF03',
  /** Colors/jade/A700 */
  jadeA700: '#64DD17',

  // ===========================================================================
  // Pear (13)
  // ===========================================================================
  /** Colors/pear/50 */
  pear50: '#F2FDEA',
  /** Colors/pear/100 */
  pear100: '#E2FCCF',
  /** Colors/pear/200 */
  pear200: '#A7FA50',
  /** Colors/pear/300 */
  pear300: '#92E431',
  /** Colors/pear/400 */
  pear400: '#79C410',
  /** Colors/pear/500 */
  pear500: '#69AB0B',
  /** Colors/pear/600 */
  pear600: '#578F07',
  /** Colors/pear/700 */
  pear700: '#447205',
  /** Colors/pear/800 */
  pear800: '#325603',
  /** Colors/pear/900 */
  pear900: '#213C01',
  /** Colors/pear/A200 */
  pearA200: '#EEFF41',
  /** Colors/pear/A400 */
  pearA400: '#C6FF00',
  /** Colors/pear/A700 */
  pearA700: '#AEEA00',

  // ===========================================================================
  // Orange (13)
  // ===========================================================================
  /** Colors/orange/50 */
  orange50: '#FDF7F4',
  /** Colors/orange/100 */
  orange100: '#FBEFE9',
  /** Colors/orange/200 */
  orange200: '#FBD5C3',
  /** Colors/orange/300 */
  orange300: '#FBB797',
  /** Colors/orange/400 */
  orange400: '#FE8A51',
  /** Colors/orange/500 */
  orange500: '#F86A0B',
  /** Colors/orange/600 */
  orange600: '#CD4F09',
  /** Colors/orange/700 */
  orange700: '#A43D06',
  /** Colors/orange/800 */
  orange800: '#7D2E04',
  /** Colors/orange/900 */
  orange900: '#581E01',
  /** Colors/orange/A200 */
  orangeA200: '#FFAB40',
  /** Colors/orange/A400 */
  orangeA400: '#FF9100',
  /** Colors/orange/A700 */
  orangeA700: '#FF6D00',

  // ===========================================================================
  // Magenta (13)
  // ===========================================================================
  /** Colors/magenta/50 */
  magenta50: '#FCF6FC',
  /** Colors/magenta/100 */
  magenta100: '#FBECFA',
  /** Colors/magenta/200 */
  magenta200: '#FBCCF8',
  /** Colors/magenta/300 */
  magenta300: '#FCA6F8',
  /** Colors/magenta/400 */
  magenta400: '#FF61FD',
  /** Colors/magenta/500 */
  magenta500: '#FF00FF',
  /** Colors/magenta/600 */
  magenta600: '#CA00CA',
  /** Colors/magenta/700 */
  magenta700: '#A100A1',
  /** Colors/magenta/800 */
  magenta800: '#7B017B',
  /** Colors/magenta/900 */
  magenta900: '#570057',
  /** Colors/magenta/A200 */
  magentaA200: '#FF4081',
  /** Colors/magenta/A400 */
  magentaA400: '#F50057',
  /** Colors/magenta/A700 */
  magentaA700: '#C51162',

  // ===========================================================================
  // Purple (13)
  // ===========================================================================
  /** Colors/purple/50 */
  purple50: '#FAF7FC',
  /** Colors/purple/100 */
  purple100: '#F4EFFB',
  /** Colors/purple/200 */
  purple200: '#E8D5FA',
  /** Colors/purple/300 */
  purple300: '#D9B9FC',
  /** Colors/purple/400 */
  purple400: '#C691FF',
  /** Colors/purple/500 */
  purple500: '#B056FF',
  /** Colors/purple/600 */
  purple600: '#A627FF',
  /** Colors/purple/700 */
  purple700: '#8700D3',
  /** Colors/purple/800 */
  purple800: '#6801A1',
  /** Colors/purple/900 */
  purple900: '#4A0171',
  /** Colors/purple/A200 */
  purpleA200: '#E040FB',
  /** Colors/purple/A400 */
  purpleA400: '#D500F9',
  /** Colors/purple/A700 */
  purpleA700: '#AA00FF',

  // ===========================================================================
  // Red (13)
  // ===========================================================================
  /** Colors/red/50 */
  red50: '#FCF7F7',
  /** Colors/red/100 */
  red100: '#FBEFED',
  /** Colors/red/200 */
  red200: '#F7D5D0',
  /** Colors/red/300 */
  red300: '#F6B7AE',
  /** Colors/red/400 */
  red400: '#F68C7D',
  /** Colors/red/500 */
  red500: '#F35C49',
  /** Colors/red/600 */
  red600: '#D33423',
  /** Colors/red/700 */
  red700: '#B12525',
  /** Colors/red/800 */
  red800: '#881A1C',
  /** Colors/red/900 */
  red900: '#610F11',
  /** Colors/red/A200 */
  redA200: '#FF5252',
  /** Colors/red/A400 */
  redA400: '#FF1744',
  /** Colors/red/A700 */
  redA700: '#D50000',

  // ===========================================================================
  // Teal (13)
  // ===========================================================================
  /** Colors/teal/50 */
  teal50: '#E0F2F1',
  /** Colors/teal/100 */
  teal100: '#B2DFDB',
  /** Colors/teal/200 */
  teal200: '#80CBC4',
  /** Colors/teal/300 */
  teal300: '#4DB6AC',
  /** Colors/teal/400 */
  teal400: '#26A69A',
  /** Colors/teal/500 */
  teal500: '#009688',
  /** Colors/teal/600 */
  teal600: '#00897B',
  /** Colors/teal/700 */
  teal700: '#00796B',
  /** Colors/teal/800 */
  teal800: '#00695C',
  /** Colors/teal/900 */
  teal900: '#004D40',
  /** Colors/teal/A200 */
  tealA200: '#64FFDA',
  /** Colors/teal/A400 */
  tealA400: '#1DE9B6',
  /** Colors/teal/A700 */
  tealA700: '#00BFA5',

  // ===========================================================================
  // Yellow (13)
  // ===========================================================================
  /** Colors/yellow/50 */
  yellow50: '#FDF8F1',
  /** Colors/yellow/100 */
  yellow100: '#FCF0DF',
  /** Colors/yellow/200 */
  yellow200: '#FCD8A3',
  /** Colors/yellow/300 */
  yellow300: '#FFB636',
  /** Colors/yellow/400 */
  yellow400: '#E69E04',
  /** Colors/yellow/500 */
  yellow500: '#C68700',
  /** Colors/yellow/600 */
  yellow600: '#A67103',
  /** Colors/yellow/700 */
  yellow700: '#885604',
  /** Colors/yellow/800 */
  yellow800: '#674101',
  /** Colors/yellow/900 */
  yellow900: '#472D01',
  /** Colors/yellow/A200 */
  yellowA200: '#FFFF00',
  /** Colors/yellow/A400 */
  yellowA400: '#FFEA00',
  /** Colors/yellow/A700 */
  yellowA700: '#FFD600',

  // ===========================================================================
  // Periwinkle (13)
  // ===========================================================================
  /** Colors/periwinkle/50 */
  periwinkle50: '#F7F8FD',
  /** Colors/periwinkle/100 */
  periwinkle100: '#F0F1FB',
  /** Colors/periwinkle/200 */
  periwinkle200: '#D8DBFB',
  /** Colors/periwinkle/300 */
  periwinkle300: '#BFC4FB',
  /** Colors/periwinkle/400 */
  periwinkle400: '#9FA3FF',
  /** Colors/periwinkle/500 */
  periwinkle500: '#8483FF',
  /** Colors/periwinkle/600 */
  periwinkle600: '#6C5EFF',
  /** Colors/periwinkle/700 */
  periwinkle700: '#5E39FF',
  /** Colors/periwinkle/800 */
  periwinkle800: '#4302C8',
  /** Colors/periwinkle/900 */
  periwinkle900: '#2D0090',
  /** Colors/periwinkle/A200 */
  periwinkleA200: '#140048',
  /** Colors/periwinkle/A400 */
  periwinkleA400: '#10003A',
  /** Colors/periwinkle/A700 */
  periwinkleA700: '#09001F',

  // ===========================================================================
  // Blurmuda (3)
  // ===========================================================================
  /** Colors/blurmuda/main */
  blurmudaMain: '#2270EE',
  /** Colors/blurmuda/light */
  blurmudaLight: '#6397F0',
  /** Colors/blurmuda/dark */
  blurmudaDark: '#1D54BB',

  // ===========================================================================
  // Marine (10)
  // ===========================================================================
  /** Colors/marine/50 */
  marine50: '#F5F9FD',
  /** Colors/marine/100 */
  marine100: '#E9F3FB',
  /** Colors/marine/200 */
  marine200: '#C3E3FB',
  /** Colors/marine/300 */
  marine300: '#95D1FC',
  /** Colors/marine/400 */
  marine400: '#45B9FF',
  /** Colors/marine/500 */
  marine500: '#0095DA',
  /** Colors/marine/600 */
  marine600: '#0285C4',
  /** Colors/marine/700 */
  marine700: '#046A9B',
  /** Colors/marine/800 */
  marine800: '#005078',
  /** Colors/marine/900 */
  marine900: '#003460',

  // ===========================================================================
  // Gray (14)
  // ===========================================================================
  /** Colors/gray/50 */
  gray50: '#F8F8F8',
  /** Colors/gray/100 */
  gray100: '#F2F2F2',
  /** Colors/gray/200 */
  gray200: '#DDDEDE',
  /** Colors/gray/300 */
  gray300: '#C8C9CA',
  /** Colors/gray/400 */
  gray400: '#ADAFB1',
  /** Colors/gray/500 */
  gray500: '#939598',
  /** Colors/gray/600 */
  gray600: '#7B7D7F',
  /** Colors/gray/700 */
  gray700: '#616365',
  /** Colors/gray/800 */
  gray800: '#494A4C',
  /** Colors/gray/900 */
  gray900: '#323334',
  /** Colors/gray/A200 */
  grayA200: '#EEEEEE',
  /** Colors/gray/A400 */
  grayA400: '#BDBDBD',
  /** Colors/gray/A700 */
  grayA700: '#616161',

  // ===========================================================================
  // Blue (13)
  // ===========================================================================
  /** Colors/blue/50 */
  blue50: '#E8F3FB',
  /** Colors/blue/100 */
  blue100: '#CEE6F8',
  /** Colors/blue/200 */
  blue200: '#ADD6F5',
  /** Colors/blue/300 */
  blue300: '#89C5F4',
  /** Colors/blue/400 */
  blue400: '#61B3F4',
  /** Colors/blue/500 */
  blue500: '#37A0F6',
  /** Colors/blue/600 */
  blue600: '#0B8CFA',
  /** Colors/blue/700 */
  blue700: '#006FCF',
  /** Colors/blue/800 */
  blue800: '#0056A1',
  /** Colors/blue/900 */
  blue900: '#004581',
  /** Colors/blue/A200 */
  blueA200: '#002A4E',
  /** Colors/blue/A400 */
  blueA400: '#001F3A',
  /** Colors/blue/A700 */
  blueA700: '#001426',

  // ===========================================================================
  // Backward-compatible aliases (neutral = gray, amber = yellow)
  //
  // The Figma Foundation collection uses "gray" and "yellow" as palette names.
  // Earlier versions of this file used "neutral" and "amber" respectively.
  // These aliases ensure downstream consumers (semantic.ts, component-tokens.ts,
  // colors.ts) continue to compile without changes.
  // ===========================================================================

  /** @alias gray50 -- backward-compatible neutral name */
  neutral50: '#F8F8F8',
  /** @alias gray100 */
  neutral100: '#F2F2F2',
  /** @alias gray200 */
  neutral200: '#DDDEDE',
  /** @alias gray300 */
  neutral300: '#C8C9CA',
  /** @alias gray400 */
  neutral400: '#ADAFB1',
  /** @alias gray500 */
  neutral500: '#939598',
  /** @alias gray600 */
  neutral600: '#7B7D7F',
  /** @alias gray700 */
  neutral700: '#616365',
  /** @alias gray800 */
  neutral800: '#494A4C',
  /** @alias gray900 */
  neutral900: '#323334',
  /** @alias -- no Figma equivalent, kept for existing consumers */
  neutral1000: '#121212',

  /** @alias yellow50 -- backward-compatible amber name */
  amber50: '#FDF8F1',
  /** @alias yellow500 */
  amber500: '#C68700',
  /** @alias yellow700 */
  amber700: '#885604',
  /** @alias yellow800 -- note: this was previously orange800, corrected to yellow800 */
  amber800: '#674101',

  // ===========================================================================
  // Legacy accent aliases (previously sparse, now covered by full palettes)
  // ===========================================================================

  /** @alias magenta50 -- was "rose50" */
  rose50: '#FCF6FC',
  /** @alias magenta500 -- was "rose500" */
  rose500: '#FF00FF',

  /** @alias purple50 -- was "port50" */
  port50: '#FAF7FC',
  /** @alias purple500 -- was "port500" */
  port500: '#B056FF',

  /** @deprecated Use brandSecondaryLight instead; kept for existing consumers */
  brandSecondaryDark: '#3F4C58',

  // ===========================================================================
  // Data Visualization (18 series colors)
  //
  // Not part of the 247 Foundation color variables, but used by chart and
  // graph components. Values derived from the CDS palette.
  // ===========================================================================
  dataSeries1: '#4B3FFF',
  dataSeries2: '#006FCF',
  dataSeries3: '#16A7BF',
  dataSeries4: '#08A847',
  dataSeries5: '#69AB0B',
  dataSeries6: '#E69E04',
  dataSeries7: '#F86A0B',
  dataSeries8: '#F95728',
  dataSeries9: '#FF00FF',
  dataSeries10: '#B056FF',
  dataSeries11: '#7F00DE',
  dataSeries12: '#2270EE',
  dataSeries13: '#0E6F7F',
  dataSeries14: '#79C410',
  dataSeries15: '#FFB636',
  dataSeries16: '#DF461B',
  dataSeries17: '#546574',
  dataSeries18: '#758CA0',

  // ===========================================================================
  // Typography
  // ===========================================================================
  fontFamily: 'DM Sans',
  fontFamilyMono: 'DM Mono',

  // ===========================================================================
  // Spacing base unit (8px grid -- per Figma unit tokens)
  // ===========================================================================
  spacingUnit: 8,

  // ===========================================================================
  // Border radius base (CDS 37: small=4, medium=8, large=12, xlarge=16)
  // ===========================================================================
  radiusBase: 4,

  // ===========================================================================
  // State layer opacities (MUI-compatible, from Figma action tokens)
  // ===========================================================================
  stateHoverOpacity: 0.04,
  stateFocusOpacity: 0.12,
  stateSelectedOpacity: 0.08,
  stateDisabledOpacity: 0.38,
  stateOutlinedBorderOpacity: 0.5,
}

/**
 * Widened type allowing any string for color/font overrides in white-labeling.
 *
 * String-valued keys are widened to `string` so that `createBrandConfig` can
 * accept arbitrary hex values. Numeric keys retain their literal number type
 * to preserve type safety for opacity/spacing/radius values.
 */
export type PrimitiveTokens = {
  [K in keyof typeof primitive]: (typeof primitive)[K] extends string
    ? string
    : (typeof primitive)[K]
}
