import { useMemo } from 'react'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { buildGameTheme, cssVariablesResolver } from './theme'
import { useGameStore } from './state'

const Root = () => {
  const gameDef = useGameStore((state) => state.gameDef);
  const theme = useMemo(() => buildGameTheme(gameDef), [gameDef]);

  return (
    <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </MantineProvider>
  );
};

export default Root;
