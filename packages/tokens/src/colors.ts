export const colors = {
  // Transparent
  transparent: 'transparent',

  // Base
  white: '#FFFFFF',
  black: '#000000',

  // Brand - OG Purple (Primary)
  primary: '#4B3FFF',
  primaryLight: '#6E64FF',
  primaryDark: '#3329CC',

  // OG Blue scale
  ogBlue50: '#EBF0FF',
  ogBlue100: '#C2D1FF',
  ogBlue200: '#99B2FF',
  ogBlue300: '#7093FF',
  ogBlue400: '#4774FF',
  ogBlue500: '#1E55FF',
  ogBlue600: '#1844CC',
  ogBlue700: '#123399',
  ogBlue800: '#0C2266',
  ogBlue900: '#061133',

  // Red scale (Error/Destructive)
  red50: '#FFF0F0',
  red100: '#FFD6D6',
  red300: '#FF8585',
  red400: '#FF5C5C',
  red500: '#FF3333',
  red600: '#CC2929',
  red700: '#991F1F',
  red800: '#661414',
  red900: '#330A0A',

  // Neutral / Gray scale
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#EEEEEE',
  neutral300: '#E0E0E0',
  neutral400: '#BDBDBD',
  neutral500: '#9E9E9E',
  neutral700: '#616161',
  neutral1000: '#212121',

  // Teal
  teal50: '#E0F7FA',
  teal500: '#009688',
  teal700: '#00796B',

  // Jade / Green (Success)
  jade50: '#E8F5E9',
  jade500: '#4CAF50',
  jade700: '#388E3C',

  // Amber / Yellow (Warning)
  amber50: '#FFF8E1',
  amber500: '#FFC107',
  amber700: '#FFA000',

  // Rose
  rose50: '#FFF0F3',
  rose500: '#E91E63',

  // Pear
  pear50: '#F9FBE7',
  pear500: '#CDDC39',

  // Port
  port50: '#F3E5F5',
  port500: '#9C27B0',

  // Data Visualization Series
  dataSeries1: '#4B3FFF',
  dataSeries2: '#1E55FF',
  dataSeries3: '#009688',
  dataSeries4: '#4CAF50',
  dataSeries5: '#CDDC39',
  dataSeries6: '#FFC107',
  dataSeries7: '#FF9800',
  dataSeries8: '#FF5722',
  dataSeries9: '#E91E63',
  dataSeries10: '#9C27B0',
  dataSeries11: '#673AB7',
  dataSeries12: '#3F51B5',
  dataSeries13: '#00BCD4',
  dataSeries14: '#8BC34A',
  dataSeries15: '#FFEB3B',
  dataSeries16: '#FF5722',
  dataSeries17: '#795548',
  dataSeries18: '#607D8B',
} as const

export type ColorToken = keyof typeof colors
