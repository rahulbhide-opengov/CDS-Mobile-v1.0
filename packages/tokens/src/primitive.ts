/**
 * PRIMITIVE TOKENS -- The White-Label Layer
 *
 * These are the raw palette values that form the foundation of the entire
 * design system. Every semantic token and every component token ultimately
 * derives from a value defined here.
 *
 * ALL VALUES SOURCED FROM CDS 37 FIGMA (April 2026):
 *   File: MxdeZ8e13qSmlenBVMmzzI
 *   Collections: Foundation, Semantic Theme, Semantic Display
 *
 * To white-label the design system, override this single layer using
 * `createBrandConfig` from `./brand.ts`. All downstream tokens will
 * recalculate automatically.
 */
export const primitive = {
  // ---------------------------------------------------------------------------
  // Brand — Blurple (Primary)
  // ---------------------------------------------------------------------------
  brandPrimary: '#4B3FFF',       // blurple/700
  brandPrimaryDark: '#19009B',   // blurple/900
  brandPrimaryLight: '#7589FF',  // blurple/500
  brandPrimaryContrastText: '#FFFFFF',

  // Full Blurple scale
  blurple50: '#F7F8FD',
  blurple100: '#EEF1FC',
  blurple200: '#D4DDFB',
  blurple300: '#B8C6FB',
  blurple400: '#94A8FF',
  blurple500: '#7589FF',
  blurple600: '#5A65FF',
  blurple700: '#4B3FFF',
  blurple800: '#2C01D6',
  blurple900: '#19009B',

  // ---------------------------------------------------------------------------
  // Secondary — Slate
  // ---------------------------------------------------------------------------
  brandSecondary: '#2B343D',     // slate/900
  brandSecondaryDark: '#3F4C58', // slate/800
  brandSecondaryLight: '#546574', // slate/700 (used for tertiary text, input borders)

  // Full Slate scale
  slate50: '#F7F9FA',
  slate100: '#F0F2F4',
  slate200: '#D8DFE5',
  slate300: '#BECBD6',
  slate400: '#9CB1C3',
  slate500: '#8099AE',
  slate600: '#758CA0',
  slate700: '#546574',
  slate800: '#3F4C58',
  slate900: '#2B343D',

  // ---------------------------------------------------------------------------
  // Red (Error / Destructive)
  // ---------------------------------------------------------------------------
  red50: '#FCF7F7',
  red100: '#FBEFED',
  red200: '#F7D5D0',
  red300: '#F6B7AE',
  red400: '#F68C7D',
  red500: '#F35C49',
  red600: '#D33423',
  red700: '#B12525',
  red800: '#881A1C',
  red900: '#610F11',

  // ---------------------------------------------------------------------------
  // Green (Success)
  // ---------------------------------------------------------------------------
  green50: '#EFFDF1',
  green100: '#DCFCE0',
  green500: '#08A847',
  green700: '#037730',
  green800: '#015A2D',

  // ---------------------------------------------------------------------------
  // Yellow / Orange (Warning)
  // ---------------------------------------------------------------------------
  yellow300: '#FFB636',
  yellow400: '#E69E04',
  amber50: '#FDF7F4',
  amber500: '#E69E04',
  amber700: '#885604',
  amber800: '#7D2E04',

  // ---------------------------------------------------------------------------
  // Cerulean (Info)
  // ---------------------------------------------------------------------------
  cerulean300: '#4CDEFA',
  cerulean500: '#16A7BF',
  cerulean700: '#0E6F7F',
  cerulean800: '#085461',
  teal50: '#F1FAFC',
  teal500: '#16A7BF',
  teal700: '#0E6F7F',

  // ---------------------------------------------------------------------------
  // Gray (Neutral) — CDS 37 specific gray scale
  // ---------------------------------------------------------------------------
  white: '#FFFFFF',
  neutral50: '#F8F8F8',
  neutral100: '#F2F2F2',
  neutral200: '#DDDEDE',
  neutral300: '#C8C9CA',
  neutral400: '#ADAFB1',
  neutral500: '#939598',
  neutral600: '#7B7D7F',
  neutral700: '#616365',
  neutral800: '#494A4C',
  neutral900: '#323334',
  neutral1000: '#121212',
  black: '#000000',

  // ---------------------------------------------------------------------------
  // Accent palettes (from Figma Foundation collection)
  // ---------------------------------------------------------------------------
  // Rose
  rose50: '#FFF0F3',
  rose500: '#E91E63',

  // Pear
  pear50: '#F9FBE7',
  pear500: '#CDDC39',

  // Port / Purple
  port50: '#F3E5F5',
  port500: '#9C27B0',

  // Blue (OG Blue — separate from Blurple)
  blue50: '#EBF0FF',
  blue100: '#C2D1FF',
  blue200: '#99B2FF',
  blue300: '#7093FF',
  blue400: '#4774FF',
  blue500: '#1E55FF',
  blue600: '#1844CC',
  blue700: '#123399',
  blue800: '#0C2266',
  blue900: '#061133',

  // ---------------------------------------------------------------------------
  // State layer opacities (MUI-compatible, from Figma action tokens)
  // ---------------------------------------------------------------------------
  stateHoverOpacity: 0.04,
  stateFocusOpacity: 0.12,
  stateSelectedOpacity: 0.08,
  stateDisabledOpacity: 0.38,
  stateOutlinedBorderOpacity: 0.5,

  // ---------------------------------------------------------------------------
  // Typography — DM Sans
  // ---------------------------------------------------------------------------
  fontFamily: 'DM Sans',
  fontFamilyMono: 'DM Mono',

  // ---------------------------------------------------------------------------
  // Spacing base unit (8px — per Figma unit tokens)
  // ---------------------------------------------------------------------------
  spacingUnit: 8,

  // ---------------------------------------------------------------------------
  // Border radius (CDS 37: small=4, medium=8, large=12, xlarge=16)
  // ---------------------------------------------------------------------------
  radiusBase: 4,

  // ---------------------------------------------------------------------------
  // Data Visualization (18 series colors)
  // ---------------------------------------------------------------------------
  dataSeries1: '#4B3FFF',
  dataSeries2: '#1E55FF',
  dataSeries3: '#16A7BF',
  dataSeries4: '#08A847',
  dataSeries5: '#CDDC39',
  dataSeries6: '#E69E04',
  dataSeries7: '#FF9800',
  dataSeries8: '#FF5722',
  dataSeries9: '#E91E63',
  dataSeries10: '#9C27B0',
  dataSeries11: '#673AB7',
  dataSeries12: '#3F51B5',
  dataSeries13: '#16A7BF',
  dataSeries14: '#8BC34A',
  dataSeries15: '#FFEB3B',
  dataSeries16: '#FF5722',
  dataSeries17: '#795548',
  dataSeries18: '#607D8B',
}

/** Widened type allowing any string for color/font overrides in white-labeling */
export type PrimitiveTokens = {
  [K in keyof typeof primitive]: typeof primitive[K] extends string ? string : typeof primitive[K]
}
