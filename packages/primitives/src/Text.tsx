import { styled, Text as TamaguiText } from '@tamagui/core'

/**
 * CDS 37 Text component — maps all Figma mobile text styles.
 *
 * Typography scale from CDS 37 Figma (mobile column):
 *   Display 1-5, h1-h6, body1-3, subtitle1-2, caption, overline, help
 *
 * Font: DM Sans (loaded via CdsProvider)
 * Heading weight: SemiBold (600) per Figma spec
 * Body weight: Regular (400) per Figma spec
 */
export const Text = styled(TamaguiText, {
  name: 'CdsText',
  fontFamily: '$body',
  fontSize: '$md',
  lineHeight: '$md',
  color: '$color',

  variants: {
    variant: {
      // Display styles — Bold, heading font
      display1: { fontSize: '$7xl', lineHeight: '$7xl', fontWeight: '$bold', fontFamily: '$heading' },
      display2: { fontSize: '$6xl', lineHeight: '$6xl', fontWeight: '$bold', fontFamily: '$heading' },
      display3: { fontSize: '$5xl', lineHeight: '$5xl', fontWeight: '$bold', fontFamily: '$heading' },
      display4: { fontSize: '$4xl', lineHeight: '$4xl', fontWeight: '$bold', fontFamily: '$heading' },
      display5: { fontSize: '$3xl', lineHeight: '$3xl', fontWeight: '$bold', fontFamily: '$heading' },

      // Heading styles — SemiBold (600), heading font (per Figma)
      h1: { fontSize: '$2xl', lineHeight: '$2xl', fontWeight: '$semibold', fontFamily: '$heading' },
      h2: { fontSize: '$xl', lineHeight: '$xl', fontWeight: '$semibold', fontFamily: '$heading' },
      h3: { fontSize: '$lg', lineHeight: '$lg', fontWeight: '$semibold', fontFamily: '$heading' },
      h4: { fontSize: '$md', lineHeight: '$md', fontWeight: '$semibold', fontFamily: '$heading' },
      h5: { fontSize: '$sm', lineHeight: '$sm', fontWeight: '$semibold', fontFamily: '$heading' },
      h6: { fontSize: '$xs', lineHeight: '$xs', fontWeight: '$semibold', fontFamily: '$heading' },

      // Body styles — Regular (400), body font
      body1: { fontSize: '$md', lineHeight: '$md', fontWeight: '$regular' },
      body2: { fontSize: '$sm', lineHeight: '$sm', fontWeight: '$regular' },
      body3: { fontSize: '$xs', lineHeight: '$xs', fontWeight: '$regular' },

      // Subtitle styles — Regular, body font
      subtitle1: { fontSize: '$md', lineHeight: '$md', fontWeight: '$regular' },
      subtitle2: { fontSize: '$sm', lineHeight: '$sm', fontWeight: '$regular' },

      // Caption — small, secondary color
      caption: { fontSize: '$xs', lineHeight: '$xs', fontWeight: '$regular', color: '$colorSecondary' },

      // Overline — uppercase, medium weight, wide tracking
      overline: { fontSize: '$xs', lineHeight: '$xs', fontWeight: '$medium', textTransform: 'uppercase', letterSpacing: '$widest' },

      // Help — smallest readable text (Figma: 10px, SemiBold)
      help: { fontSize: '$xxs', lineHeight: '$xxs', fontWeight: '$semibold' },
    },

    weight: {
      light: { fontWeight: '$light' },
      regular: { fontWeight: '$regular' },
      medium: { fontWeight: '$medium' },
      semibold: { fontWeight: '$semibold' },
      bold: { fontWeight: '$bold' },
    },

    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },

    secondary: {
      true: { color: '$colorSecondary' },
    },

    disabled: {
      true: { color: '$colorDisabled' },
    },
  } as const,
})
