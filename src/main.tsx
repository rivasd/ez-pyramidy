import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import "@mantine/core/styles.css"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <main>
        <header>
            <h3>EZ-Pyramidy</h3>
            <h4>Le système de jeu Pyramide FACILE à utiliser</h4>
        </header>
        <section>
            <App />
        </section>
    </main>
    </MantineProvider>
  </StrictMode>,
)
