import type { ThemeId } from './state'

export const DEFAULT_THEME_ID: ThemeId = 'green'

export interface ThemePalette {
  id: ThemeId
  label: string
  background: string
  text: string
  border: string
  buttonBackground: string
  buttonText: string
  timer: string
}

export const themes: ThemePalette[] = [
  {
    id: 'yellow',
    label: 'Miel & noisette',
    background: '#F6C445',
    text: '#4A2E1B',
    border: '#7A4B1E',
    buttonBackground: '#4A2E1B',
    buttonText: '#FFE9A8',
    timer: '#C1440E',
  },
  {
    id: 'green',
    label: 'Forêt & crème',
    background: '#14532D',
    text: '#F5F0D7',
    border: '#9BCF53',
    buttonBackground: '#9BCF53',
    buttonText: '#143D22',
    timer: '#FF8A5B',
  },
  {
    id: 'blue',
    label: 'Ardoise & or',
    background: '#1B2A41',
    text: '#F3E2B8',
    border: '#D9A441',
    buttonBackground: '#D9A441',
    buttonText: '#17233A',
    timer: '#E86A5C',
  },
  {
    id: 'red',
    label: 'Sang-de-bœuf',
    background: '#8E2B2B',
    text: '#FFFFFF',
    border: '#F7E4E0',
    buttonBackground: '#FFFFFF',
    buttonText: '#6B1F1F',
    timer: '#D9A45F',
  },
]

export const getTheme = (id: ThemeId): ThemePalette =>
  themes.find((theme) => theme.id === id) ?? themes.find((theme) => theme.id === DEFAULT_THEME_ID)!

export const themeCssVariables = (palette: ThemePalette): Record<string, string> => ({
  '--pyramidy-bg': palette.background,
  '--pyramidy-text': palette.text,
  '--pyramidy-border': palette.border,
  '--pyramidy-button-bg': palette.buttonBackground,
  '--pyramidy-button-text': palette.buttonText,
  '--pyramidy-timer': palette.timer,
})
