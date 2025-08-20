// src/theme.ts
import { extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';


const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50:  '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',    // primary accent
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
  },
  semanticTokens: {
    colors: {
      'bg.canvas':    { default: '#fafbfc' },
      'bg.surface':   { default: '#ffffff' },
      'fg.default':   { default: 'gray.800' },
      'fg.muted':     { default: 'gray.600' },
      'border.muted': { default: 'gray.200' },
    },
  },
  styles: {
    global: {
      'html, body, #root': { height: '100%' },
      body: {
        bg: 'bg.canvas',
        color: 'fg.default',
      },
      'h1, h2, h3, h4, h5, h6': {
        color: 'fg.default',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: { color: 'fg.default' },
    },
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.600' },
          _active: { bg: 'brand.700' },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.600',
          _hover: { bg: 'brand.50' },
        },
      },
    },
    Tag: {
      baseStyle: { container: { bg: 'gray.100', color: 'gray.800' } },
    },
  },
});

export default theme;
