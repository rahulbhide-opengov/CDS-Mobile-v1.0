import { primitive } from './primitive'

/**
 * FLAT COLOR MAP -- Backwards-compatible re-export
 *
 * This file is retained for backwards compatibility with existing component
 * code that imports `colors.primary`, `colors.neutral300`, etc.
 *
 * Internally, every value now derives from the primitive token layer.
 * New code should prefer importing from `primitive`, `semantic`, or
 * `componentTokens` directly.
 *
 * @deprecated Prefer `primitive` for raw palette values or `semantic` for
 * purpose-based colors. This flat map will be removed in a future major version.
 */
export const colors = {
  // Base
  transparent: 'transparent',
  white: primitive.white,
  black: primitive.black,

  // Brand - OG Purple (Primary)
  primary: primitive.brandPrimary,
  primaryLight: primitive.brandPrimaryLight,
  primaryDark: primitive.brandPrimaryDark,

  // OG Blue scale
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

  // Red scale (Error/Destructive)
  red50: primitive.red50,
  red100: primitive.red100,
  red300: primitive.red300,
  red400: primitive.red400,
  red500: primitive.red500,
  red600: primitive.red600,
  red700: primitive.red700,
  red800: primitive.red800,
  red900: primitive.red900,

  // Neutral / Gray scale
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

  // Teal
  teal50: primitive.teal50,
  teal500: primitive.teal500,
  teal700: primitive.teal700,

  // Jade / Green (Success)
  jade50: primitive.green50,
  jade500: primitive.green500,
  jade700: primitive.green700,

  // Amber / Yellow (Warning)
  amber50: primitive.amber50,
  amber500: primitive.amber500,
  amber700: primitive.amber700,

  // Rose
  rose50: primitive.rose50,
  rose500: primitive.rose500,

  // Pear
  pear50: primitive.pear50,
  pear500: primitive.pear500,

  // Port
  port50: primitive.port50,
  port500: primitive.port500,

  // Data Visualization Series
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
