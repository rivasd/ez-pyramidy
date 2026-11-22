import { act } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import Pyramid from '../src/pyramidy/Pyramid'
import { useGameStore } from '../src/state'

describe('pyramid grid layout', () => {
  afterEach(() => {
    act(() => useGameStore.setState({
      gameDef: { max_time: 60, categories: [{ displayName: 'C', fullName: 'C', words: [] }] },
      currentTeam: undefined,
    }))
  })

  it('keeps equal columns for a centered top tile when a style prop is supplied', () => {
    const categories = Array.from({ length: 15 }, (_, i) => ({
      displayName: `C${i}`,
      fullName: `Categorie ${i}`,
      words: [],
    }))
    act(() => useGameStore.setState({ gameDef: { max_time: 60, categories }, currentTeam: 0 }))

    const { container } = render(
      <MantineProvider>
        <Pyramid style={{ flex: 1 }} />
      </MantineProvider>
    )

    const grid = container.querySelector('.pyramidy-main') as HTMLElement
    const columns = grid.style.gridTemplateColumns.trim().split(/\s+/)
    expect(columns).toHaveLength(10)
    expect(columns.every((column) => column === '10%')).toBe(true)
    const rows = grid.style.gridTemplateRows.trim().split(/\s+/)
    expect(rows).toHaveLength(5)
    expect(rows.every((row) => row === '20%')).toBe(true)
    expect(grid.style.flex).toBe('1 1 0%')

    const topTile = container.querySelector('#pyramidy-categorie-0') as HTMLElement
    expect(topTile.style.gridColumnStart).toBe('5')
    expect(topTile.style.gridColumnEnd).toBe('span 2')
  })

  it('lets the play area span the whole pyramid grid', () => {
    const categories = Array.from({ length: 15 }, (_, i) => ({
      displayName: `C${i}`,
      fullName: `Categorie ${i}`,
      words: [],
    }))
    act(() => useGameStore.setState({ gameDef: { max_time: 60, categories }, currentTeam: 0 }))

    const { container } = render(
      <MantineProvider>
        <Pyramid style={{ flex: 1 }} />
      </MantineProvider>
    )
    fireEvent.click(screen.getByText('C0'))

    const playArea = container.querySelector('.pyramidy-main > div') as HTMLElement
    expect(playArea.style.gridColumn).toBe('1 / -1')
    expect(playArea.style.gridRow).toBe('1 / -1')
  })
})
