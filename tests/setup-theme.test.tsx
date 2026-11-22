import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { MemoryRouter } from 'react-router-dom'
import SetupPage from '../src/pages/SetupPage'
import ThemeStyles from '../src/ThemeStyles'
import { useGameStore } from '../src/state'

describe('theme selection during setup', () => {
  afterEach(() => {
    act(() => useGameStore.setState({ themeId: 'green', gameDef: undefined }))
    document.documentElement.style.cssText = ''
    document.body.style.backgroundColor = ''
  })

  it('applies the theme chosen on the setup page', () => {
    render(
      <MantineProvider>
        <MemoryRouter>
          <ThemeStyles />
          <SetupPage />
        </MemoryRouter>
      </MantineProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /ardoise & or/i }))

    expect(document.documentElement.style.getPropertyValue('--pyramidy-bg')).toBe('#1B2A41')
  })
})
