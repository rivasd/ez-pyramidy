import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'jspsych/css/jspsych.css'
import "@mantine/core/styles.css"
import './index.css'
import Root from './Root.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
