export const animations = {
  fast: 150,
  normal: 250,
  slow: 350,
  spring: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  easeInOut: {
    type: 'timing' as const,
    duration: 250,
  },
} as const
