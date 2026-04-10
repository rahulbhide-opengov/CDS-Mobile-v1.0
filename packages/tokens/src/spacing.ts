export const space = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  30: 120,
} as const

// Negative spacing for margins
export const negativeSpace = Object.fromEntries(
  Object.entries(space)
    .filter(([key]) => key !== '0' && key !== 'px')
    .map(([key, value]) => [`-${key}`, -value])
) as { [K in `-${Exclude<keyof typeof space, 0 | 'px'>}`]: number }

export type SpaceToken = keyof typeof space
