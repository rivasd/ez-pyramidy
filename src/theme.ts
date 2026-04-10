import { colorsTuple, createTheme, type CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'pyramidYellow',
  colors: {
    pyramidBlue: [
      '#e7f2ff',
      '#cfe3ff',
      '#9fc7ff',
      '#6faaee',
      '#478fdf',
      '#2e7ecf',
      '#177cff',
      '#0666e0',
      '#0059c8',
      '#004caf',
    ],
    pyramidYellow: [
      '#ffffe0',
      '#ffffba',
      '#ffff89',
      '#ffff5b',
      '#f8ff3f',
      '#f0ff34',
      '#fcff33',
      '#dbe000',
      '#c2c700',
      '#a8ad00',
    ],
    lxGreen: colorsTuple("#098b4a")
  },
  fontFamily: 'FredokaOne, serif',
  defaultRadius: 'md',
  autoContrast: true,
});

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-body': theme.colors.lxGreen[6],
  },
  dark: {
    '--mantine-color-body': theme.colors.lxGreen[8],
  },
});
