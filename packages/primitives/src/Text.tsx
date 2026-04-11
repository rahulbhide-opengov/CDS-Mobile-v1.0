import { styled, Text as TamaguiText } from '@tamagui/core'
import { baseStyles } from '@opengov/cds-tokens'

/**
 * CDS 37 Text component — all Figma text style variants.
 *
 * Font: DM Sans (loaded via CdsProvider)
 * Source: CDS 37 Figma Semantic (Display) collection, Mobile (390) column
 *
 * Usage:
 *   <Text variant="h1">Heading 1</Text>
 *   <Text variant="body2">Body text</Text>
 *   <Text variant="caption">Small label</Text>
 */
export const Text = styled(TamaguiText, {
  name: 'CdsText',
  fontFamily: '$body',
  fontSize: 14,
  lineHeight: 18,
  color: '$color',

  variants: {
    variant: {
      // -----------------------------------------------------------------------
      // Display styles — Bold (700)
      // -----------------------------------------------------------------------
      display1: {
        fontSize: baseStyles.display1.mobile.fontSize,
        lineHeight: baseStyles.display1.mobile.lineHeight,
        fontWeight: '700',
        letterSpacing: baseStyles.display1.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      display2: {
        fontSize: baseStyles.display2.mobile.fontSize,
        lineHeight: baseStyles.display2.mobile.lineHeight,
        fontWeight: '700',
        letterSpacing: baseStyles.display2.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      display3: {
        fontSize: baseStyles.display3.mobile.fontSize,
        lineHeight: baseStyles.display3.mobile.lineHeight,
        fontWeight: '700',
        letterSpacing: baseStyles.display3.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      display4: {
        fontSize: baseStyles.display4.mobile.fontSize,
        lineHeight: baseStyles.display4.mobile.lineHeight,
        fontWeight: '700',
        letterSpacing: baseStyles.display4.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      display5: {
        fontSize: baseStyles.display5.mobile.fontSize,
        lineHeight: baseStyles.display5.mobile.lineHeight,
        fontWeight: '700',
        letterSpacing: baseStyles.display5.mobile.letterSpacing,
        fontFamily: '$heading',
      },

      // -----------------------------------------------------------------------
      // Heading styles — SemiBold (600)
      // -----------------------------------------------------------------------
      h1: {
        fontSize: baseStyles.h1.mobile.fontSize,
        lineHeight: baseStyles.h1.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.h1.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      h2: {
        fontSize: baseStyles.h2.mobile.fontSize,
        lineHeight: baseStyles.h2.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.h2.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      h3: {
        fontSize: baseStyles.h3.mobile.fontSize,
        lineHeight: baseStyles.h3.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.h3.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      h4: {
        fontSize: baseStyles.h4.mobile.fontSize,
        lineHeight: baseStyles.h4.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.h4.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      h5: {
        fontSize: baseStyles.h5.mobile.fontSize,
        lineHeight: baseStyles.h5.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.h5.mobile.letterSpacing,
        fontFamily: '$heading',
      },
      h6: {
        fontSize: baseStyles.h6.mobile.fontSize,
        lineHeight: baseStyles.h6.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.h6.mobile.letterSpacing,
        fontFamily: '$heading',
      },

      // -----------------------------------------------------------------------
      // Body styles — Regular (400)
      // -----------------------------------------------------------------------
      body1: {
        fontSize: baseStyles.body1.mobile.fontSize,
        lineHeight: baseStyles.body1.mobile.lineHeight,
        fontWeight: '400',
        letterSpacing: baseStyles.body1.mobile.letterSpacing,
      },
      body2: {
        fontSize: baseStyles.body2.mobile.fontSize,
        lineHeight: baseStyles.body2.mobile.lineHeight,
        fontWeight: '400',
        letterSpacing: baseStyles.body2.mobile.letterSpacing,
      },
      body3: {
        fontSize: baseStyles.body3.mobile.fontSize,
        lineHeight: baseStyles.body3.mobile.lineHeight,
        fontWeight: '400',
        letterSpacing: baseStyles.body3.mobile.letterSpacing,
      },

      // -----------------------------------------------------------------------
      // Subtitle styles — Regular (400)
      // -----------------------------------------------------------------------
      subtitle1: {
        fontSize: baseStyles.subtitle1.mobile.fontSize,
        lineHeight: baseStyles.subtitle1.mobile.lineHeight,
        fontWeight: '400',
        letterSpacing: baseStyles.subtitle1.mobile.letterSpacing,
      },
      subtitle2: {
        fontSize: baseStyles.subtitle2.mobile.fontSize,
        lineHeight: baseStyles.subtitle2.mobile.lineHeight,
        fontWeight: '400',
        letterSpacing: baseStyles.subtitle2.mobile.letterSpacing,
      },

      // -----------------------------------------------------------------------
      // Caption — Regular (400), secondary color
      // -----------------------------------------------------------------------
      caption: {
        fontSize: baseStyles.caption.mobile.fontSize,
        lineHeight: baseStyles.caption.mobile.lineHeight,
        fontWeight: '400',
        letterSpacing: baseStyles.caption.mobile.letterSpacing,
        color: '$colorSecondary',
      },

      // -----------------------------------------------------------------------
      // Overline — Medium (500), uppercase
      // -----------------------------------------------------------------------
      overline: {
        fontSize: baseStyles.overline.mobile.fontSize,
        lineHeight: baseStyles.overline.mobile.lineHeight,
        fontWeight: '500',
        letterSpacing: baseStyles.overline.mobile.letterSpacing,
        textTransform: 'uppercase',
      },

      // -----------------------------------------------------------------------
      // Help — SemiBold (600), smallest readable
      // -----------------------------------------------------------------------
      help: {
        fontSize: baseStyles.help.mobile.fontSize,
        lineHeight: baseStyles.help.mobile.lineHeight,
        fontWeight: '600',
        letterSpacing: baseStyles.help.mobile.letterSpacing,
      },
    },

    weight: {
      light: { fontWeight: '300' },
      regular: { fontWeight: '400' },
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
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
