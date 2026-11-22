import '@mantine/core/styles.css'
import '../src/App.css'
import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button, MantineProvider, Text } from '@mantine/core'
import ThemeStyles from '../src/ThemeStyles'
import { useGameStore } from '../src/state'
import { cssVariablesResolver, theme } from '../src/theme'

const renderWithTheme = () => render(
  <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
    <ThemeStyles />
    <Text data-testid="sample">Bonjour</Text>
    <Button data-testid="action">Démarrer</Button>
  </MantineProvider>
)

describe('Mantine components follow the selected theme', () => {
  afterEach(() => {
    act(() => useGameStore.setState({ themeId: 'green' }))
    document.documentElement.style.cssText = ''
    document.body.style.backgroundColor = ''
  })

  it('uses the theme text color on the red theme', () => {
    act(() => useGameStore.setState({ themeId: 'red' }))

    renderWithTheme()

    expect(getComputedStyle(screen.getByTestId('sample')).color).toBe('rgb(255, 255, 255)')
  })

  it('uses the theme button colors on the red theme', () => {
    act(() => useGameStore.setState({ themeId: 'red' }))

    renderWithTheme()

    const button = screen.getByTestId('action')
    expect(getComputedStyle(button).backgroundColor).toBe('rgb(255, 255, 255)')
    expect(getComputedStyle(button).color).toBe('rgb(107, 31, 31)')
  })
})
