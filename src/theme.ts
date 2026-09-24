import { colorsTuple, createTheme, type CSSVariablesResolver } from '@mantine/core';
import{ rem } from '@mantine/core';
import type { Game } from './models';

export const theme = createTheme({
  primaryColor: 'blue',
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
    gameBodyColor: colorsTuple("#098b4a")
  },
  fontFamily: 'FredokaOne, serif',
  defaultRadius: 'md',
  autoContrast: true,
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(22),
  },
  scale: 1.05,
});

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},
  light: {
    '--mantine-color-body': theme.colors.gameBodyColor[6],
  },
  dark: {
    '--mantine-color-body': theme.colors.gameBodyColor[8],
  },
});

// Builds a theme overriding the primary/body colors with ones read from the loaded game definition, if any.
export const buildGameTheme = (gameDef?: Game) => {
  if (!gameDef?.gameThemePrimaryColor && !gameDef?.gameThemeBodyColor) {
    return theme;
  }
  return createTheme({
    ...theme,
    colors: {
      ...theme.colors,
      ...(gameDef.gameThemePrimaryColor && { [theme.primaryColor as string]: colorsTuple(gameDef.gameThemePrimaryColor) }),
      ...(gameDef.gameThemeBodyColor && { gameBodyColor: colorsTuple(gameDef.gameThemeBodyColor) }),
    },
  });
};
