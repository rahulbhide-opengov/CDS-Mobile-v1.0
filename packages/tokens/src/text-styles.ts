/**
 * TEXT STYLES -- Complete CDS 37 Typography System
 *
 * All values extracted from Figma CDS 37 Semantic (Display) collection.
 * Three responsive modes: Desktop (1440), Tablet (768), Mobile (390).
 *
 * For React Native, we use the MOBILE column as the base and provide
 * tablet/desktop overrides via media queries.
 *
 * Categories:
 *   Base Styles:  Display 1-5, h1-h6, body1-3, subtitle1-2, caption, overline, help
 *   Button:       Large, Medium, Small
 *   Inputs:       Label (sm/md/lg), Value (sm/md/lg), Helper, Description
 *   Chip:         Large, Medium, Small
 *   Avatars:      Initials (lg/md/sm)
 *   Table:        Header, Cell, Footer
 *   Tooltip:      Small
 *   Alert:        Title, Description
 *   Bottom Nav:   Active Label, Default Label
 */

export interface TextStyleDef {
  fontSize: number
  fontWeight: 300 | 400 | 500 | 600 | 700
  lineHeight: number
  letterSpacing: number
  paragraphSpacing?: number
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
}

export interface ResponsiveTextStyle {
  mobile: TextStyleDef
  tablet: TextStyleDef
  desktop: TextStyleDef
}

// ---------------------------------------------------------------------------
// BASE STYLES
// ---------------------------------------------------------------------------

export const baseStyles = {
  display1: {
    mobile:  { fontSize: 64, fontWeight: 700, lineHeight: 76, letterSpacing: -0.4 },
    tablet:  { fontSize: 72, fontWeight: 700, lineHeight: 86, letterSpacing: -0.4 },
    desktop: { fontSize: 80, fontWeight: 700, lineHeight: 96, letterSpacing: -0.4 },
  },
  display2: {
    mobile:  { fontSize: 48, fontWeight: 700, lineHeight: 56, letterSpacing: -0.4 },
    tablet:  { fontSize: 64, fontWeight: 700, lineHeight: 76, letterSpacing: -0.4 },
    desktop: { fontSize: 72, fontWeight: 700, lineHeight: 86, letterSpacing: -0.4 },
  },
  display3: {
    mobile:  { fontSize: 44, fontWeight: 700, lineHeight: 48, letterSpacing: -0.4 },
    tablet:  { fontSize: 48, fontWeight: 700, lineHeight: 56, letterSpacing: -0.4 },
    desktop: { fontSize: 64, fontWeight: 700, lineHeight: 76, letterSpacing: -0.4 },
  },
  display4: {
    mobile:  { fontSize: 40, fontWeight: 700, lineHeight: 38, letterSpacing: -0.4 },
    tablet:  { fontSize: 44, fontWeight: 700, lineHeight: 48, letterSpacing: -0.4 },
    desktop: { fontSize: 48, fontWeight: 700, lineHeight: 56, letterSpacing: -0.4 },
  },
  display5: {
    mobile:  { fontSize: 32, fontWeight: 700, lineHeight: 38, letterSpacing: -0.4 },
    tablet:  { fontSize: 36, fontWeight: 700, lineHeight: 38, letterSpacing: -0.4 },
    desktop: { fontSize: 40, fontWeight: 700, lineHeight: 48, letterSpacing: -0.4 },
  },
  h1: {
    mobile:  { fontSize: 28, fontWeight: 600, lineHeight: 32, letterSpacing: -0.4 },
    tablet:  { fontSize: 28, fontWeight: 600, lineHeight: 38, letterSpacing: -0.25 },
    desktop: { fontSize: 32, fontWeight: 600, lineHeight: 38, letterSpacing: -0.25 },
  },
  h2: {
    mobile:  { fontSize: 22, fontWeight: 600, lineHeight: 32, letterSpacing: -0.25 },
    tablet:  { fontSize: 22, fontWeight: 600, lineHeight: 28, letterSpacing: -0.25 },
    desktop: { fontSize: 24, fontWeight: 600, lineHeight: 32, letterSpacing: -0.25 },
  },
  h3: {
    mobile:  { fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
    tablet:  { fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: -0.2 },
    desktop: { fontSize: 20, fontWeight: 600, lineHeight: 24, letterSpacing: -0.2 },
  },
  h4: {
    mobile:  { fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: 0 },
    tablet:  { fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: -0.2 },
    desktop: { fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: -0.2 },
  },
  h5: {
    mobile:  { fontSize: 14, fontWeight: 600, lineHeight: 16, letterSpacing: 0 },
    tablet:  { fontSize: 14, fontWeight: 600, lineHeight: 18, letterSpacing: 0 },
    desktop: { fontSize: 14, fontWeight: 600, lineHeight: 18, letterSpacing: 0 },
  },
  h6: {
    mobile:  { fontSize: 13, fontWeight: 600, lineHeight: 16, letterSpacing: 0 },
    tablet:  { fontSize: 12, fontWeight: 600, lineHeight: 16, letterSpacing: 0 },
    desktop: { fontSize: 12, fontWeight: 600, lineHeight: 16, letterSpacing: 0 },
  },
  body1: {
    mobile:  { fontSize: 16, fontWeight: 400, lineHeight: 20, letterSpacing: 0 },
    tablet:  { fontSize: 16, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
    desktop: { fontSize: 16, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
  },
  body2: {
    mobile:  { fontSize: 14, fontWeight: 400, lineHeight: 18, letterSpacing: 0.17 },
    tablet:  { fontSize: 14, fontWeight: 400, lineHeight: 18, letterSpacing: 0.17 },
    desktop: { fontSize: 14, fontWeight: 400, lineHeight: 18, letterSpacing: 0.17 },
  },
  body3: {
    mobile:  { fontSize: 13, fontWeight: 400, lineHeight: 16, letterSpacing: 0.17 },
    tablet:  { fontSize: 13, fontWeight: 400, lineHeight: 16, letterSpacing: 0.17 },
    desktop: { fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0.17 },
  },
  subtitle1: {
    mobile:  { fontSize: 16, fontWeight: 400, lineHeight: 24, letterSpacing: 0.15 },
    tablet:  { fontSize: 16, fontWeight: 400, lineHeight: 24, letterSpacing: 0.15 },
    desktop: { fontSize: 16, fontWeight: 400, lineHeight: 24, letterSpacing: 0.15 },
  },
  subtitle2: {
    mobile:  { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
    tablet:  { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
    desktop: { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
  },
  caption: {
    mobile:  { fontSize: 12, fontWeight: 400, lineHeight: 20, letterSpacing: 0 },
    tablet:  { fontSize: 12, fontWeight: 400, lineHeight: 20, letterSpacing: 0 },
    desktop: { fontSize: 12, fontWeight: 400, lineHeight: 20, letterSpacing: 0 },
  },
  overline: {
    mobile:  { fontSize: 12, fontWeight: 500, lineHeight: 26, letterSpacing: 1, textTransform: 'uppercase' as const },
    tablet:  { fontSize: 12, fontWeight: 500, lineHeight: 26, letterSpacing: 1, textTransform: 'uppercase' as const },
    desktop: { fontSize: 12, fontWeight: 500, lineHeight: 26, letterSpacing: 1, textTransform: 'uppercase' as const },
  },
  help: {
    mobile:  { fontSize: 10, fontWeight: 600, lineHeight: 14, letterSpacing: 0.4 },
    tablet:  { fontSize: 10, fontWeight: 600, lineHeight: 14, letterSpacing: 0.4 },
    desktop: { fontSize: 10, fontWeight: 600, lineHeight: 14, letterSpacing: 0.4 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// BUTTON TYPOGRAPHY
// ---------------------------------------------------------------------------

export const buttonStyles = {
  large: {
    mobile:  { fontSize: 16, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
    tablet:  { fontSize: 16, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
    desktop: { fontSize: 16, fontWeight: 600, lineHeight: 24, letterSpacing: 0 },
  },
  medium: {
    mobile:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0 },
    tablet:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0 },
    desktop: { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0 },
  },
  small: {
    mobile:  { fontSize: 13, fontWeight: 500, lineHeight: 18, letterSpacing: 0 },
    tablet:  { fontSize: 12, fontWeight: 500, lineHeight: 18, letterSpacing: 0 },
    desktop: { fontSize: 12, fontWeight: 500, lineHeight: 18, letterSpacing: 0 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// INPUT TYPOGRAPHY
// ---------------------------------------------------------------------------

export const inputStyles = {
  labelSm: {
    mobile:  { fontSize: 13, fontWeight: 400, lineHeight: 16, letterSpacing: 0.15 },
    tablet:  { fontSize: 13, fontWeight: 400, lineHeight: 16, letterSpacing: 0.15 },
    desktop: { fontSize: 12, fontWeight: 400, lineHeight: 14, letterSpacing: 0.15 },
  },
  labelMd: {
    mobile:  { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
    tablet:  { fontSize: 14, fontWeight: 400, lineHeight: 18, letterSpacing: 0.15 },
    desktop: { fontSize: 14, fontWeight: 400, lineHeight: 16, letterSpacing: 0.15 },
  },
  labelLg: {
    mobile:  { fontSize: 16, fontWeight: 400, lineHeight: 24, letterSpacing: 0.15 },
    tablet:  { fontSize: 16, fontWeight: 400, lineHeight: 22, letterSpacing: 0.15 },
    desktop: { fontSize: 16, fontWeight: 400, lineHeight: 20, letterSpacing: 0.15 },
  },
  valueSm: {
    mobile:  { fontSize: 13, fontWeight: 500, lineHeight: 18, letterSpacing: 0 },
    tablet:  { fontSize: 13, fontWeight: 500, lineHeight: 20, letterSpacing: 0.25 },
    desktop: { fontSize: 12, fontWeight: 500, lineHeight: 18, letterSpacing: 0.25 },
  },
  valueMd: {
    mobile:  { fontSize: 14, fontWeight: 500, lineHeight: 22, letterSpacing: 0 },
    tablet:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.25 },
    desktop: { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.25 },
  },
  valueLg: {
    mobile:  { fontSize: 16, fontWeight: 500, lineHeight: 26, letterSpacing: 0 },
    tablet:  { fontSize: 16, fontWeight: 500, lineHeight: 26, letterSpacing: 0.25 },
    desktop: { fontSize: 16, fontWeight: 500, lineHeight: 24, letterSpacing: 0.25 },
  },
  helper: {
    mobile:  { fontSize: 12, fontWeight: 500, lineHeight: 20, letterSpacing: 0 },
    tablet:  { fontSize: 12, fontWeight: 500, lineHeight: 20, letterSpacing: 0.4 },
    desktop: { fontSize: 12, fontWeight: 500, lineHeight: 20, letterSpacing: 0.4 },
  },
  description: {
    mobile:  { fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0.15 },
    tablet:  { fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0.15 },
    desktop: { fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0.15 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// CHIP TYPOGRAPHY
// ---------------------------------------------------------------------------

export const chipStyles = {
  large: {
    mobile:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.16 },
    tablet:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.16 },
    desktop: { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.16 },
  },
  medium: {
    mobile:  { fontSize: 13, fontWeight: 500, lineHeight: 18, letterSpacing: 0.16 },
    tablet:  { fontSize: 13, fontWeight: 500, lineHeight: 18, letterSpacing: 0.16 },
    desktop: { fontSize: 13, fontWeight: 500, lineHeight: 18, letterSpacing: 0.16 },
  },
  small: {
    mobile:  { fontSize: 12, fontWeight: 500, lineHeight: 18, letterSpacing: 0.16 },
    tablet:  { fontSize: 12, fontWeight: 500, lineHeight: 18, letterSpacing: 0.16 },
    desktop: { fontSize: 12, fontWeight: 500, lineHeight: 18, letterSpacing: 0.16 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// AVATAR INITIALS TYPOGRAPHY
// ---------------------------------------------------------------------------

export const avatarStyles = {
  large: {
    mobile:  { fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: 0.16 },
    tablet:  { fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: 0.16 },
    desktop: { fontSize: 16, fontWeight: 600, lineHeight: 20, letterSpacing: 0.16 },
  },
  medium: {
    mobile:  { fontSize: 12, fontWeight: 600, lineHeight: 18, letterSpacing: 0.16 },
    tablet:  { fontSize: 12, fontWeight: 600, lineHeight: 14, letterSpacing: 0.16 },
    desktop: { fontSize: 12, fontWeight: 600, lineHeight: 14, letterSpacing: 0.16 },
  },
  small: {
    mobile:  { fontSize: 10, fontWeight: 400, lineHeight: 18, letterSpacing: 0.16 },
    tablet:  { fontSize: 10, fontWeight: 400, lineHeight: 12, letterSpacing: 0.16 },
    desktop: { fontSize: 10, fontWeight: 400, lineHeight: 12, letterSpacing: 0.16 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// TABLE TYPOGRAPHY
// ---------------------------------------------------------------------------

export const tableStyles = {
  header: {
    mobile:  { fontSize: 16, fontWeight: 500, lineHeight: 24, letterSpacing: 0.16 },
    tablet:  { fontSize: 16, fontWeight: 500, lineHeight: 24, letterSpacing: 0.16 },
    desktop: { fontSize: 16, fontWeight: 500, lineHeight: 24, letterSpacing: 0.16 },
  },
  cell: {
    mobile:  { fontSize: 15, fontWeight: 400, lineHeight: 20, letterSpacing: 0.16 },
    tablet:  { fontSize: 15, fontWeight: 400, lineHeight: 20, letterSpacing: 0.16 },
    desktop: { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0.16 },
  },
  footer: {
    mobile:  { fontSize: 15, fontWeight: 400, lineHeight: 20, letterSpacing: 0.16 },
    tablet:  { fontSize: 15, fontWeight: 400, lineHeight: 20, letterSpacing: 0.16 },
    desktop: { fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0.16 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// MISC COMPONENT TYPOGRAPHY
// ---------------------------------------------------------------------------

export const tooltipStyles = {
  small: {
    mobile:  { fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0 },
    tablet:  { fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0 },
    desktop: { fontSize: 10, fontWeight: 500, lineHeight: 14, letterSpacing: 0 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

export const alertStyles = {
  title: {
    mobile:  { fontSize: 13, fontWeight: 700, lineHeight: 18, letterSpacing: 0.15 },
    tablet:  { fontSize: 13, fontWeight: 700, lineHeight: 18, letterSpacing: 0.15 },
    desktop: { fontSize: 12, fontWeight: 700, lineHeight: 18, letterSpacing: 0.15 },
  },
  description: {
    mobile:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.16 },
    tablet:  { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.15 },
    desktop: { fontSize: 14, fontWeight: 500, lineHeight: 20, letterSpacing: 0.15 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

export const bottomNavStyles = {
  activeLabel: {
    mobile:  { fontSize: 14, fontWeight: 500, lineHeight: 18, letterSpacing: 0.15 },
    tablet:  { fontSize: 14, fontWeight: 500, lineHeight: 18, letterSpacing: 0.15 },
    desktop: { fontSize: 14, fontWeight: 500, lineHeight: 18, letterSpacing: 0.15 },
  },
  defaultLabel: {
    mobile:  { fontSize: 12, fontWeight: 400, lineHeight: 18, letterSpacing: 0.15 },
    tablet:  { fontSize: 12, fontWeight: 400, lineHeight: 18, letterSpacing: 0.15 },
    desktop: { fontSize: 12, fontWeight: 400, lineHeight: 18, letterSpacing: 0.15 },
  },
} as const satisfies Record<string, ResponsiveTextStyle>

// ---------------------------------------------------------------------------
// ALL STYLES (flat export for iteration)
// ---------------------------------------------------------------------------

export const allTextStyles = {
  ...baseStyles,
  'button/large': buttonStyles.large,
  'button/medium': buttonStyles.medium,
  'button/small': buttonStyles.small,
  'input/labelSm': inputStyles.labelSm,
  'input/labelMd': inputStyles.labelMd,
  'input/labelLg': inputStyles.labelLg,
  'input/valueSm': inputStyles.valueSm,
  'input/valueMd': inputStyles.valueMd,
  'input/valueLg': inputStyles.valueLg,
  'input/helper': inputStyles.helper,
  'input/description': inputStyles.description,
  'chip/large': chipStyles.large,
  'chip/medium': chipStyles.medium,
  'chip/small': chipStyles.small,
  'avatar/large': avatarStyles.large,
  'avatar/medium': avatarStyles.medium,
  'avatar/small': avatarStyles.small,
  'table/header': tableStyles.header,
  'table/cell': tableStyles.cell,
  'table/footer': tableStyles.footer,
  'tooltip/small': tooltipStyles.small,
  'alert/title': alertStyles.title,
  'alert/description': alertStyles.description,
  'bottomNav/activeLabel': bottomNavStyles.activeLabel,
  'bottomNav/defaultLabel': bottomNavStyles.defaultLabel,
} as const

export type TextStyleName = keyof typeof allTextStyles
