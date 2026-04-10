import { styled, Text as TamaguiText } from '@tamagui/core'

export const Text = styled(TamaguiText, {
  name: 'CdsText',
  fontFamily: '$body',
  fontSize: '$md',
  lineHeight: '$md',
  color: '$color',

  variants: {
    variant: {
      display1: { fontSize: '$7xl', lineHeight: '$7xl', fontWeight: '$bold', fontFamily: '$heading' },
      display2: { fontSize: '$6xl', lineHeight: '$6xl', fontWeight: '$bold', fontFamily: '$heading' },
      display3: { fontSize: '$5xl', lineHeight: '$5xl', fontWeight: '$bold', fontFamily: '$heading' },
      display4: { fontSize: '$4xl', lineHeight: '$4xl', fontWeight: '$bold', fontFamily: '$heading' },
      h1: { fontSize: '$3xl', lineHeight: '$3xl', fontWeight: '$bold', fontFamily: '$heading' },
      h2: { fontSize: '$2xl', lineHeight: '$2xl', fontWeight: '$bold', fontFamily: '$heading' },
      h3: { fontSize: '$xl', lineHeight: '$xl', fontWeight: '$semibold', fontFamily: '$heading' },
      h4: { fontSize: '$lg', lineHeight: '$lg', fontWeight: '$semibold', fontFamily: '$heading' },
      h5: { fontSize: '$md', lineHeight: '$md', fontWeight: '$semibold', fontFamily: '$heading' },
      h6: { fontSize: '$sm', lineHeight: '$sm', fontWeight: '$semibold', fontFamily: '$heading' },
      body1: { fontSize: '$lg', lineHeight: '$lg', fontWeight: '$regular' },
      body2: { fontSize: '$md', lineHeight: '$md', fontWeight: '$regular' },
      body3: { fontSize: '$sm', lineHeight: '$sm', fontWeight: '$regular' },
      caption: { fontSize: '$xs', lineHeight: '$xs', fontWeight: '$regular', color: '$colorSecondary' },
      overline: { fontSize: '$xs', lineHeight: '$xs', fontWeight: '$medium', textTransform: 'uppercase', letterSpacing: '$widest' },
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
