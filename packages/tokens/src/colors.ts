import { primitive } from './primitive'

/**
 * FLAT COLOR MAP -- Backwards-compatible re-export of every primitive color.
 *
 * All values derive from the CDS 37 Figma primitive layer.
 * New code should prefer `primitive` or `semantic` imports.
 *
 * Includes:
 *   - Full 50-900 + A200/A400/A700 scales for all 19 palettes
 *   - Blurmuda main/light/dark
 *   - Brand & backwards-compat aliases
 *   - Data visualization series
 */
export const colors = {
  // ---------------------------------------------------------------------------
  // Base
  // ---------------------------------------------------------------------------
  transparent: 'transparent',
  white: primitive.white,
  black: primitive.black,

  // ---------------------------------------------------------------------------
  // Brand aliases
  // ---------------------------------------------------------------------------
  primary: primitive.blurple700,
  primaryLight: primitive.blurple500,
  primaryDark: primitive.blurple900,
  primaryContrastText: primitive.brandPrimaryContrastText,
  secondary: primitive.slate900,
  secondaryLight: primitive.slate700,
  secondaryDark: primitive.slate800,

  // ---------------------------------------------------------------------------
  // Blurple (13)
  // ---------------------------------------------------------------------------
  blurple50: primitive.blurple50,
  blurple100: primitive.blurple100,
  blurple200: primitive.blurple200,
  blurple300: primitive.blurple300,
  blurple400: primitive.blurple400,
  blurple500: primitive.blurple500,
  blurple600: primitive.blurple600,
  blurple700: primitive.blurple700,
  blurple800: primitive.blurple800,
  blurple900: primitive.blurple900,
  blurpleA200: primitive.blurpleA200,
  blurpleA400: primitive.blurpleA400,
  blurpleA700: primitive.blurpleA700,

  // ---------------------------------------------------------------------------
  // Slate (13)
  // ---------------------------------------------------------------------------
  slate50: primitive.slate50,
  slate100: primitive.slate100,
  slate200: primitive.slate200,
  slate300: primitive.slate300,
  slate400: primitive.slate400,
  slate500: primitive.slate500,
  slate600: primitive.slate600,
  slate700: primitive.slate700,
  slate800: primitive.slate800,
  slate900: primitive.slate900,
  slateA200: primitive.slateA200,
  slateA400: primitive.slateA400,
  slateA700: primitive.slateA700,

  // ---------------------------------------------------------------------------
  // Turquoise (13)
  // ---------------------------------------------------------------------------
  turquoise50: primitive.turquoise50,
  turquoise100: primitive.turquoise100,
  turquoise200: primitive.turquoise200,
  turquoise300: primitive.turquoise300,
  turquoise400: primitive.turquoise400,
  turquoise500: primitive.turquoise500,
  turquoise600: primitive.turquoise600,
  turquoise700: primitive.turquoise700,
  turquoise800: primitive.turquoise800,
  turquoise900: primitive.turquoise900,
  turquoiseA200: primitive.turquoiseA200,
  turquoiseA400: primitive.turquoiseA400,
  turquoiseA700: primitive.turquoiseA700,

  // ---------------------------------------------------------------------------
  // Terracotta (13)
  // ---------------------------------------------------------------------------
  terracotta50: primitive.terracotta50,
  terracotta100: primitive.terracotta100,
  terracotta200: primitive.terracotta200,
  terracotta300: primitive.terracotta300,
  terracotta400: primitive.terracotta400,
  terracotta500: primitive.terracotta500,
  terracotta600: primitive.terracotta600,
  terracotta700: primitive.terracotta700,
  terracotta800: primitive.terracotta800,
  terracotta900: primitive.terracotta900,
  terracottaA200: primitive.terracottaA200,
  terracottaA400: primitive.terracottaA400,
  terracottaA700: primitive.terracottaA700,

  // ---------------------------------------------------------------------------
  // Violet (13)
  // ---------------------------------------------------------------------------
  violet50: primitive.violet50,
  violet100: primitive.violet100,
  violet200: primitive.violet200,
  violet300: primitive.violet300,
  violet400: primitive.violet400,
  violet500: primitive.violet500,
  violet600: primitive.violet600,
  violet700: primitive.violet700,
  violet800: primitive.violet800,
  violet900: primitive.violet900,
  violetA200: primitive.violetA200,
  violetA400: primitive.violetA400,
  violetA700: primitive.violetA700,

  // ---------------------------------------------------------------------------
  // Green (13)
  // ---------------------------------------------------------------------------
  green50: primitive.green50,
  green100: primitive.green100,
  green200: primitive.green200,
  green300: primitive.green300,
  green400: primitive.green400,
  green500: primitive.green500,
  green600: primitive.green600,
  green700: primitive.green700,
  green800: primitive.green800,
  green900: primitive.green900,
  greenA200: primitive.greenA200,
  greenA400: primitive.greenA400,
  greenA700: primitive.greenA700,

  // ---------------------------------------------------------------------------
  // Cerulean (13)
  // ---------------------------------------------------------------------------
  cerulean50: primitive.cerulean50,
  cerulean100: primitive.cerulean100,
  cerulean200: primitive.cerulean200,
  cerulean300: primitive.cerulean300,
  cerulean400: primitive.cerulean400,
  cerulean500: primitive.cerulean500,
  cerulean600: primitive.cerulean600,
  cerulean700: primitive.cerulean700,
  cerulean800: primitive.cerulean800,
  cerulean900: primitive.cerulean900,
  ceruleanA200: primitive.ceruleanA200,
  ceruleanA400: primitive.ceruleanA400,
  ceruleanA700: primitive.ceruleanA700,

  // ---------------------------------------------------------------------------
  // Jade (13)
  // ---------------------------------------------------------------------------
  jade50: primitive.jade50,
  jade100: primitive.jade100,
  jade200: primitive.jade200,
  jade300: primitive.jade300,
  jade400: primitive.jade400,
  jade500: primitive.jade500,
  jade600: primitive.jade600,
  jade700: primitive.jade700,
  jade800: primitive.jade800,
  jade900: primitive.jade900,
  jadeA200: primitive.jadeA200,
  jadeA400: primitive.jadeA400,
  jadeA700: primitive.jadeA700,

  // ---------------------------------------------------------------------------
  // Pear (13)
  // ---------------------------------------------------------------------------
  pear50: primitive.pear50,
  pear100: primitive.pear100,
  pear200: primitive.pear200,
  pear300: primitive.pear300,
  pear400: primitive.pear400,
  pear500: primitive.pear500,
  pear600: primitive.pear600,
  pear700: primitive.pear700,
  pear800: primitive.pear800,
  pear900: primitive.pear900,
  pearA200: primitive.pearA200,
  pearA400: primitive.pearA400,
  pearA700: primitive.pearA700,

  // ---------------------------------------------------------------------------
  // Orange (13)
  // ---------------------------------------------------------------------------
  orange50: primitive.orange50,
  orange100: primitive.orange100,
  orange200: primitive.orange200,
  orange300: primitive.orange300,
  orange400: primitive.orange400,
  orange500: primitive.orange500,
  orange600: primitive.orange600,
  orange700: primitive.orange700,
  orange800: primitive.orange800,
  orange900: primitive.orange900,
  orangeA200: primitive.orangeA200,
  orangeA400: primitive.orangeA400,
  orangeA700: primitive.orangeA700,

  // ---------------------------------------------------------------------------
  // Magenta (13)
  // ---------------------------------------------------------------------------
  magenta50: primitive.magenta50,
  magenta100: primitive.magenta100,
  magenta200: primitive.magenta200,
  magenta300: primitive.magenta300,
  magenta400: primitive.magenta400,
  magenta500: primitive.magenta500,
  magenta600: primitive.magenta600,
  magenta700: primitive.magenta700,
  magenta800: primitive.magenta800,
  magenta900: primitive.magenta900,
  magentaA200: primitive.magentaA200,
  magentaA400: primitive.magentaA400,
  magentaA700: primitive.magentaA700,

  // ---------------------------------------------------------------------------
  // Purple (13)
  // ---------------------------------------------------------------------------
  purple50: primitive.purple50,
  purple100: primitive.purple100,
  purple200: primitive.purple200,
  purple300: primitive.purple300,
  purple400: primitive.purple400,
  purple500: primitive.purple500,
  purple600: primitive.purple600,
  purple700: primitive.purple700,
  purple800: primitive.purple800,
  purple900: primitive.purple900,
  purpleA200: primitive.purpleA200,
  purpleA400: primitive.purpleA400,
  purpleA700: primitive.purpleA700,

  // ---------------------------------------------------------------------------
  // Red (13)
  // ---------------------------------------------------------------------------
  red50: primitive.red50,
  red100: primitive.red100,
  red200: primitive.red200,
  red300: primitive.red300,
  red400: primitive.red400,
  red500: primitive.red500,
  red600: primitive.red600,
  red700: primitive.red700,
  red800: primitive.red800,
  red900: primitive.red900,
  redA200: primitive.redA200,
  redA400: primitive.redA400,
  redA700: primitive.redA700,

  // ---------------------------------------------------------------------------
  // Teal (13)
  // ---------------------------------------------------------------------------
  teal50: primitive.teal50,
  teal100: primitive.teal100,
  teal200: primitive.teal200,
  teal300: primitive.teal300,
  teal400: primitive.teal400,
  teal500: primitive.teal500,
  teal600: primitive.teal600,
  teal700: primitive.teal700,
  teal800: primitive.teal800,
  teal900: primitive.teal900,
  tealA200: primitive.tealA200,
  tealA400: primitive.tealA400,
  tealA700: primitive.tealA700,

  // ---------------------------------------------------------------------------
  // Yellow (13)
  // ---------------------------------------------------------------------------
  yellow50: primitive.yellow50,
  yellow100: primitive.yellow100,
  yellow200: primitive.yellow200,
  yellow300: primitive.yellow300,
  yellow400: primitive.yellow400,
  yellow500: primitive.yellow500,
  yellow600: primitive.yellow600,
  yellow700: primitive.yellow700,
  yellow800: primitive.yellow800,
  yellow900: primitive.yellow900,
  yellowA200: primitive.yellowA200,
  yellowA400: primitive.yellowA400,
  yellowA700: primitive.yellowA700,

  // ---------------------------------------------------------------------------
  // Periwinkle (13)
  // ---------------------------------------------------------------------------
  periwinkle50: primitive.periwinkle50,
  periwinkle100: primitive.periwinkle100,
  periwinkle200: primitive.periwinkle200,
  periwinkle300: primitive.periwinkle300,
  periwinkle400: primitive.periwinkle400,
  periwinkle500: primitive.periwinkle500,
  periwinkle600: primitive.periwinkle600,
  periwinkle700: primitive.periwinkle700,
  periwinkle800: primitive.periwinkle800,
  periwinkle900: primitive.periwinkle900,
  periwinkleA200: primitive.periwinkleA200,
  periwinkleA400: primitive.periwinkleA400,
  periwinkleA700: primitive.periwinkleA700,

  // ---------------------------------------------------------------------------
  // Marine (10)
  // ---------------------------------------------------------------------------
  marine50: primitive.marine50,
  marine100: primitive.marine100,
  marine200: primitive.marine200,
  marine300: primitive.marine300,
  marine400: primitive.marine400,
  marine500: primitive.marine500,
  marine600: primitive.marine600,
  marine700: primitive.marine700,
  marine800: primitive.marine800,
  marine900: primitive.marine900,

  // ---------------------------------------------------------------------------
  // Gray (13)
  // ---------------------------------------------------------------------------
  gray50: primitive.gray50,
  gray100: primitive.gray100,
  gray200: primitive.gray200,
  gray300: primitive.gray300,
  gray400: primitive.gray400,
  gray500: primitive.gray500,
  gray600: primitive.gray600,
  gray700: primitive.gray700,
  gray800: primitive.gray800,
  gray900: primitive.gray900,
  grayA200: primitive.grayA200,
  grayA400: primitive.grayA400,
  grayA700: primitive.grayA700,

  // ---------------------------------------------------------------------------
  // Blue (13)
  // ---------------------------------------------------------------------------
  blue50: primitive.blue50,
  blue100: primitive.blue100,
  blue200: primitive.blue200,
  blue300: primitive.blue300,
  blue400: primitive.blue400,
  blue500: primitive.blue500,
  blue600: primitive.blue600,
  blue700: primitive.blue700,
  blue800: primitive.blue800,
  blue900: primitive.blue900,
  blueA200: primitive.blueA200,
  blueA400: primitive.blueA400,
  blueA700: primitive.blueA700,

  // ---------------------------------------------------------------------------
  // Blurmuda (3)
  // ---------------------------------------------------------------------------
  blurmudaMain: primitive.blurmudaMain,
  blurmudaLight: primitive.blurmudaLight,
  blurmudaDark: primitive.blurmudaDark,

  // ---------------------------------------------------------------------------
  // Backwards-compat aliases: neutral (= gray), amber (= yellow)
  // ---------------------------------------------------------------------------
  neutral50: primitive.neutral50,
  neutral100: primitive.neutral100,
  neutral200: primitive.neutral200,
  neutral300: primitive.neutral300,
  neutral400: primitive.neutral400,
  neutral500: primitive.neutral500,
  neutral600: primitive.neutral600,
  neutral700: primitive.neutral700,
  neutral800: primitive.neutral800,
  neutral900: primitive.neutral900,
  neutral1000: primitive.neutral1000,

  amber50: primitive.amber50,
  amber500: primitive.amber500,
  amber700: primitive.amber700,
  amber800: primitive.amber800,

  // ---------------------------------------------------------------------------
  // Backwards-compat aliases: legacy accent names
  // ---------------------------------------------------------------------------
  rose50: primitive.rose50,
  rose500: primitive.rose500,
  port50: primitive.port50,
  port500: primitive.port500,

  /** @deprecated ogBlue* aliases -- use blue* instead */
  ogBlue50: primitive.blue50,
  ogBlue100: primitive.blue100,
  ogBlue200: primitive.blue200,
  ogBlue300: primitive.blue300,
  ogBlue400: primitive.blue400,
  ogBlue500: primitive.blue500,
  ogBlue600: primitive.blue600,
  ogBlue700: primitive.blue700,
  ogBlue800: primitive.blue800,
  ogBlue900: primitive.blue900,

  // ---------------------------------------------------------------------------
  // Data Visualization (18 series)
  // ---------------------------------------------------------------------------
  dataSeries1: primitive.dataSeries1,
  dataSeries2: primitive.dataSeries2,
  dataSeries3: primitive.dataSeries3,
  dataSeries4: primitive.dataSeries4,
  dataSeries5: primitive.dataSeries5,
  dataSeries6: primitive.dataSeries6,
  dataSeries7: primitive.dataSeries7,
  dataSeries8: primitive.dataSeries8,
  dataSeries9: primitive.dataSeries9,
  dataSeries10: primitive.dataSeries10,
  dataSeries11: primitive.dataSeries11,
  dataSeries12: primitive.dataSeries12,
  dataSeries13: primitive.dataSeries13,
  dataSeries14: primitive.dataSeries14,
  dataSeries15: primitive.dataSeries15,
  dataSeries16: primitive.dataSeries16,
  dataSeries17: primitive.dataSeries17,
  dataSeries18: primitive.dataSeries18,
} as const

export type ColorToken = keyof typeof colors
