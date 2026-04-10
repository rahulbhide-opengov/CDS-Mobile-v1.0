import { colors, primitive } from '@opengov/cds-tokens'

// ---------------------------------------------------------------------------
// Button sub-themes
// ---------------------------------------------------------------------------

export const lightButtonPrimary = {
  background: colors.primary,
  backgroundHover: colors.primaryDark,
  backgroundPress: primitive.brandPrimaryDark,
  backgroundDisabled: colors.neutral200,
  color: colors.white,
  colorDisabled: colors.neutral400,
} as const

export const lightButtonSecondary = {
  background: colors.white,
  backgroundHover: colors.neutral50,
  backgroundPress: colors.neutral100,
  backgroundDisabled: colors.neutral100,
  color: colors.primary,
  colorDisabled: colors.neutral400,
  borderColor: colors.neutral300,
  borderColorDisabled: colors.neutral200,
} as const

export const lightButtonSecondaryAlt = {
  background: colors.transparent,
  backgroundHover: colors.neutral50,
  backgroundPress: colors.neutral100,
  backgroundDisabled: colors.transparent,
  color: colors.neutral1000,
  colorDisabled: colors.neutral400,
  borderColor: colors.neutral300,
  borderColorDisabled: colors.neutral200,
} as const

export const lightButtonTertiary = {
  background: colors.transparent,
  backgroundHover: colors.neutral50,
  backgroundPress: colors.neutral100,
  backgroundDisabled: colors.transparent,
  color: colors.primary,
  colorDisabled: colors.neutral400,
} as const

export const lightButtonTertiaryAlt = {
  background: colors.transparent,
  backgroundHover: colors.neutral50,
  backgroundPress: colors.neutral100,
  backgroundDisabled: colors.transparent,
  color: colors.neutral1000,
  colorDisabled: colors.neutral400,
} as const

export const lightButtonDestructive = {
  background: colors.red600,
  backgroundHover: colors.red700,
  backgroundPress: colors.red800,
  backgroundDisabled: colors.neutral200,
  color: colors.white,
  colorDisabled: colors.neutral400,
} as const

export const lightButtonDestructiveAlt = {
  background: colors.transparent,
  backgroundHover: colors.red50,
  backgroundPress: colors.red100,
  backgroundDisabled: colors.transparent,
  color: colors.red600,
  colorDisabled: colors.neutral400,
  borderColor: colors.red600,
  borderColorDisabled: colors.neutral200,
} as const

// ---------------------------------------------------------------------------
// Chip sub-themes
// ---------------------------------------------------------------------------

export const lightChipNeutral = {
  background: colors.neutral100,
  color: colors.neutral700,
  iconColor: colors.neutral500,
} as const

export const lightChipPositive = {
  background: colors.jade50,
  color: colors.jade700,
  iconColor: colors.jade500,
} as const

export const lightChipNegative = {
  background: colors.red50,
  color: colors.red700,
  iconColor: colors.red500,
} as const

export const lightChipWarning = {
  background: colors.amber50,
  color: colors.amber700,
  iconColor: colors.amber500,
} as const

export const lightChipStrong = {
  background: colors.primary,
  color: colors.white,
  iconColor: colors.white,
} as const

// ---------------------------------------------------------------------------
// TextField sub-themes
// ---------------------------------------------------------------------------

export const lightTextField = {
  background: colors.white,
  backgroundFocus: colors.white,
  backgroundDisabled: colors.neutral100,
  color: colors.neutral1000,
  colorDisabled: colors.neutral400,
  borderColor: colors.neutral300,
  borderColorFocus: colors.primary,
  borderColorError: colors.red500,
  borderColorDisabled: colors.neutral200,
  placeholderColor: colors.neutral400,
  helperColor: colors.neutral500,
  errorColor: colors.red700,
  labelColor: colors.neutral700,
} as const
