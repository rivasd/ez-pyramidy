import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { useGameStore } from '../src/state'

describe('theme selection', () => {
  afterEach(() => {
    act(() => useGameStore.setState({ themeId: 'green' }))
  })

  it('starts with the green theme selected', () => {
    expect(useGameStore.getState().themeId).toBe('green')
  })

  it('changes the selected theme', () => {
    useGameStore.getState().setTheme('red')

    expect(useGameStore.getState().themeId).toBe('red')
  })
})
