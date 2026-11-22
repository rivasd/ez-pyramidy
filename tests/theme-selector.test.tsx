import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ThemeSelector from '../src/pyramidy/ThemeSelector'
import { useGameStore } from '../src/state'

describe('theme selector', () => {
  afterEach(() => {
    act(() => useGameStore.setState({ themeId: 'green' }))
  })

  it('offers the four color themes', () => {
    render(<ThemeSelector />)

    expect(screen.getAllByRole('button')).toHaveLength(4)
  })

  it('selects a theme when its card is clicked', () => {
    render(<ThemeSelector />)

    fireEvent.click(screen.getByRole('button', { name: /sang-de-bœuf/i }))

    expect(useGameStore.getState().themeId).toBe('red')
  })

  it('marks the current theme as selected', () => {
    render(<ThemeSelector />)

    expect(screen.getByRole('button', { name: /forêt & crème/i }).getAttribute('aria-pressed')).toBe('true')
  })
})
