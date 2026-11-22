import '@mantine/core/styles.css'
import '../src/App.css'
import '../src/index.css'
import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider, TextInput } from '@mantine/core'
import ThemeStyles from '../src/ThemeStyles'
import { useGameStore } from '../src/state'
import { cssVariablesResolver, theme } from '../src/theme'

describe('team name input', () => {
  afterEach(() => {
    act(() => useGameStore.setState({ themeId: 'green' }))
    document.documentElement.style.cssText = ''
    document.body.style.backgroundColor = ''
  })

  it('keeps visible text on the red theme', () => {
    act(() => useGameStore.setState({ themeId: 'red' }))

    render(
      <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
        <ThemeStyles />
        <TextInput data-testid="team" defaultValue="Équipe 1" />
      </MantineProvider>
    )

    const input = screen.getByTestId('team')
    expect(getComputedStyle(input).color).toBe('rgb(255, 255, 255)')
    expect(getComputedStyle(input).backgroundColor).toBe('rgb(142, 43, 43)')
  })
})
