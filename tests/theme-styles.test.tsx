import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import ThemeStyles from '../src/ThemeStyles'
import { useGameStore } from '../src/state'

describe('theme styles', () => {
  afterEach(() => {
    act(() => useGameStore.setState({ themeId: 'green' }))
    document.documentElement.style.cssText = ''
    document.body.style.backgroundColor = ''
  })

  it('applies the selected palette to the document', () => {
    act(() => useGameStore.setState({ themeId: 'red' }))

    render(<ThemeStyles />)

    expect(document.documentElement.style.getPropertyValue('--pyramidy-bg')).toBe('#8E2B2B')
    expect(document.documentElement.style.getPropertyValue('--pyramidy-text')).toBe('#FFFFFF')
    expect(document.body.style.backgroundColor).toBe('rgb(142, 43, 43)')
  })

  it('updates the document when another theme is chosen', () => {
    render(<ThemeStyles />)

    act(() => useGameStore.setState({ themeId: 'blue' }))

    expect(document.documentElement.style.getPropertyValue('--pyramidy-border')).toBe('#D9A441')
    expect(document.body.style.backgroundColor).toBe('rgb(27, 42, 65)')
  })
})
