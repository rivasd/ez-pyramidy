import { useEffect } from 'react'
import { useGameStore } from './state'
import { getTheme, themeCssVariables } from './themes'

const ThemeStyles = () => {
  const themeId = useGameStore((state) => state.themeId)

  useEffect(() => {
    const variables = themeCssVariables(getTheme(themeId))
    Object.entries(variables).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value)
    })
    document.body.style.backgroundColor = variables['--pyramidy-bg']
  }, [themeId])

  return null
}

export default ThemeStyles
