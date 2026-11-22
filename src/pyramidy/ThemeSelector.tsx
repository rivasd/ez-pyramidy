import { useGameStore } from '../state'
import { themes } from '../themes'

const ThemeSelector = () => {
  const themeId = useGameStore((state) => state.themeId)
  const setTheme = useGameStore((state) => state.setTheme)

  return (
    <div className="pyramidy-theme-selector">
      <p className="pyramidy-theme-selector-title">Choisissez un thème</p>
      <div className="pyramidy-theme-cards">
        {themes.map((theme) => {
          const selected = theme.id === themeId
          return (
            <button
              key={theme.id}
              type="button"
              className={`pyramidy-theme-card${selected ? ' selected' : ''}`}
              aria-pressed={selected}
              onClick={() => setTheme(theme.id)}
              style={{ backgroundColor: theme.background }}
            >
              <span
                className="pyramidy-theme-preview"
                style={{ color: theme.text, borderColor: theme.text }}
              >
                Catégorie
              </span>
              <span className="pyramidy-theme-label" style={{ color: theme.text }}>
                {theme.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ThemeSelector
