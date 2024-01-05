import { extendTheme } from '@chakra-ui/react';

const fonts = { inter: `'Inter', roboto` };

const breakpoints = {
  base: '0px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '1xl': '1350px',
  '2xl': '1440px',
  '1/2xl': '1600px',
  '3xl': '1920px',
  '4xl': '2560px'
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#0A0D14'
      }
    },
    radius: {
      button: '12px'
    }
  },
  colors: {
    light: {
      50: '#E1E6EF',
      100: '#F8F9FC',
      200: '#F1F3F9',
      300: '#E1E6EF',
      400: '#BDBDBD'
    },
    dark: {
      50: '#858DA0',
      100: '#23272F',
      200: '#1B1F27',
      300: '#0A0D14'
    },
    primary: {
      20: '#E6F2FB80',
      50: '#E6F2FB',
      100: '#80C5F9',
      200: '#33A1F4',
      300: '#0078D1',
      400: '#1A1946',
      500: '#252539'
    },
    secondary: {
      50: '#E6F8F9',
      100: '#99E2E4',
      200: '#5CD1D4',
      300: '#00B6BB'
    },
    success: {
      50: '#EDFDF8',
      100: '#08875D',
      200: '#04724D',
      300: '#066042'
    },
    warning: {
      50: '#FFF8EB',
      100: '#B25E09',
      200: '#96530F',
      300: '#80460D'
    },
    danger: {
      50: '#FEF1F2',
      100: '#E02D3C',
      200: '#BA2532',
      300: '#981B25'
    }
  },
  fonts,
  breakpoints
});

export default theme;
